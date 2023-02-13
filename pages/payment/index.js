import {Input,Button,message,Empty,Steps,Modal,Image,Radio,Form,Spin, Tooltip, Alert, Typography, notification, Select} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import Link from "next/link";
import { WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BasketContext from "../../context/basketContext/BasketContext";
import axios from "axios";
import {ShoppingCartOutlined,MailOutlined ,DeleteOutlined,  CheckCircleOutlined, SmileOutlined, SmileFilled } from "@ant-design/icons";
// import jsPDF from "jspdf"; 
import { Tabs } from "antd"; 
import SuccessOrder from "../../components/PaymentCom/SuccessOrder"; 
import KhanBank from "../../components/PaymentCom/khanBank";
import Coin from "../../components/PaymentCom/Coin";
import Paypal from "../../components/PaymentCom/Paypal";
import TdbBank from "../../components/PaymentCom/TdbBank";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import Hansh from "../../components/PaymentCom/Hansh";
import ItemDetails from "../../components/PaymentCom/ItemDetails";
import ForeignObot from "../../components/PaymentCom/ForeignObot";
import MongolianObot from "../../components/PaymentCom/MongolianObot";
import Invoice from "../../components/PaymentCom/Invoice";
import ReCAPTCHA from "react-google-recaptcha";
import TextArea from "antd/lib/input/TextArea";
const { TabPane } = Tabs;
const { Step } = Steps;
const { Paragraph } = Typography;
const { Option } = Select;
const monthFormat = 'YYYY/MM';
const Payment = () => {
  const basketContext = useContext(BasketContext); 
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [dateState, setDateState] = useState();
  const [datePlusState, setDatePlusState] = useState();
  const [totalPriceState, setTotalPriceState] = useState(0);   
  const [isModalVisibleOrgId2, setIsModalVisibleOrgId2] = useState(false); 
  const [orgIdInput2, setOrgIdInput2] = useState(""); 
  const [dollarResult, setDollarResult] = useState(0); 
  const [coinState, setCoinState] = useState(0);
  const [usdState, setUsdState] = useState(0);
  const [tugrugState, setTugrugState] = useState(0);

  const [coinStateTarget, setCoinTargetState] = useState(0);
  const [usdStateTarget, setUsdTargetState] = useState(0);
  const [tugrugStateTarget, setTugrugTargetState] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSpin, setItemSpin] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);
  const [orgIdRadio, setOrgIdRadio] = useState(0);
  const [formOrgId] = Form.useForm();
  const [checkFalse, setCheckFalse] = useState(false);
  const [itemHdr, setItemHdr] = useState();
  const [showMethod, setShowMethod] = useState(false);
  const [bankChoose, setBankChoose] = useState(undefined);
  const [bankValue, setBankValue] = useState(undefined);
  const [bankPay, setBankPay] = useState(undefined);
  const [foreignValue, setForeignValue] = useState(1);
  const [payInInstallmentsValue, setPayInInstallments] = useState(undefined);
  const [orgOnChange, setOrgOnChange] = useState(0);
  const [successOrderValue, setSuccessOrderValue] = useState(0);
  const [successOrderPrice, setSuccessOrderPrice] = useState(0); 
  const [countryCode, setCountryCode] = useState("");
  const [tulsunMnUsd, setTulsunMnUsd] = useState(0);
  const [orderIdLocal, setOrderId]= useState(0);
  const [propsItem, setPropsItems] =useState([]);
  const [defaultMaxFi, setDefaultMaxFi] = useState();
  const [mntUsdPrice, setMntUsdPrice] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [orderIdLocal2, setOrderIdLocal] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const [invoiceBoolean, setInvoiceBoolean] = useState(false);
  const [userFormCapt, setUserFormCapt] = useState(true);
  const [showBank, setShowBank] = useState(false);
  const [invoiceSuccess, setInvoiceSuccess] = useState(0);
  const [mntPrice, setMntPrice] = useState(0);
  const [sourceData, setSourceDate] = useState();
  const [orderIdSt, setOrderIdSt] = useState(0);
  //const { amaraa } = router.query;
  useEffect(() => {
    console.log("payment");
    if(localStorage.getItem("orderId")){
      // console.log("order id: ", localStorage.getItem("orderId"));
  
      const order = localStorage.getItem("orderId");
      setOrderIdSt(order); 
     
     
     
    }else{
      console.log("bhq");
    } 

    
    totalPriceFunction();
 
    dateFunction(); 
    // console.log("url",window.location.href); 
    getDefMaximFi(); 
    setOrderId(localStorage.getItem("or"));
    getSource();
    const queryString = window.location.search;
    if(localStorage.getItem("oAiD") === undefined){
     
      setOrderIdLocal(0);
    }else {
      setOrderIdLocal(localStorage.getItem("oAiD"))
      console.log("object", localStorage.getItem("oAiD"));
    } 
    // var url_string = "http://192.168.1.14:3000/payment?parameter1=amaraa&parameter2=000&body=asdjflajsdlkfjaklsjfklhadbd2626251dsf3as5df1as53df1as5df1as3fd51as3df153sadfas&fbclid=IwAR24B-dJ611MB46g-9X2v0rK3P8_7NgWmDtCnZxPTY1ZVraFwFfzM4pd760";  
    // // console.log('amaraa', router.query); 
    window.onpopstate = (event) =>{ 
      history.go(1)
      console.log("event", event); 
    }
  }, [basketContext]); 
  useEffect(()=>{
    if(localStorage.getItem("orderId")){
      const order = localStorage.getItem("orderId");
      router.push("/payment/?orderid=" + order);
    }
   
  },[])
  const totalPriceFunction = () => { 
    let itemPrice = 0;
    let result = 0; 
     basketContext.basketState.forEach((element) => {
      if (element.itemPriceTotal == undefined) { 
        result = element.price;
      } else {
        result = element.itemPriceTotal;
      }
      itemPrice += element.cnt * result; 
    })
    setSuccessOrderPrice(itemPrice);
    setTotalPriceState(itemPrice);
  };
  const recaptchaRef = useRef();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
      introduction: "${label} in not a valid intrucduction",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const invoiceSuccessFunc = () =>{
    // invoice amjilttai boloh ved haruulah form
    setInvoiceSuccess(1)
  }
  const showModalItem = (item) => {
    setItemSpin(true);
    setItemHdr(item);
    console.log("item: ", item);
    const body = {
      func: "getGroups", 
      pkId: item.pkId
   };
      axios.post("/api/post/Gate", body).then((res) => {  
      if (res.data.data.itemList == undefined) 
          {console.log("")} 
      else {  
        setIsModalOpen(true);
        setItemSpin(false);
        setGroupDetails(res.data.data.itemList); }
      }).catch((err) => {console.log("err", err)});
   
  }; 
  const handleOkItem = () => {
    setIsModalOpen(false);
  }; 
  const handleCancelItem = () => {
    setIsModalOpen(false);
  }; 
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const getSource = () =>{ 
    const body = {
      func: "getSource"
    }
    axios.post("/api/post/Gate", body).then((res)=>{
      console.log("get Sourse ==> ", res.data.data);
      setSourceDate(res.data.data);
    }).catch((err)=>{console.log("err", err)})
  }
  // const sentTdb = ()  =>{
  //   var url_string = "http://192.168.1.14:3000/payment?parameter1=amaraa&parameter2=000&body=asdjflajsdlkfjaklsjfklhadbd2626251dsf3as5df1as53df1as5df1as3fd51as3df153sadfas&fbclid=IwAR24B-dJ611MB46g-9X2v0rK3P8_7NgWmDtCnZxPTY1ZVraFwFfzM4pd760";
  //   const urlParams = new URLSearchParams(url_string);
  //   console.log("query: "); 
  //   console.log("url param: ", urlParams);
  // }

  const dateFunction = () => {
   
    console.log("date time: ");
    
    const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    var date = new Date();
    setDateState(date.getFullYear() + "/" + mounths[date.getMonth()] + "/" + date.getDate()); 
    var datePlus = new Date();
    datePlus.setDate(datePlus.getDate() + 30);
    setDatePlusState(datePlus.getFullYear() +"/" +mounths[datePlus.getMonth()] +"/" +datePlus.getDate()); 
  };  

  const orderOrgId2 = () => {
    const rs = usdStateTarget + coinStateTarget + tugrugStateTarget;
     
    setDollarResult(rs);
    setIsModalVisibleOrgId2(true);
  }; 
const handleOkOrgId2 = () => {
// console.log("orgIdInput2: ", orgIdInput2);
// console.log("dollarResult: ", dollarResult);
// console.log("basketContext.basketState: ", basketContext.basketState);
console.log("tugrugState: ", tugrugState);
console.log("coinState: ", coinState);
console.log("usd: ", usdState);
console.log("orgID: ", orgIdRadio);

if(orgIdRadio == ""){
message.error("Organization ID choose ? ")
}else{
const tugrugResult = 0;
if (tugrugState == 0) {
console.log("tugrugState: Hooson", tugrugState);
} else {
tugrugResult = tugrugState;
}
const payment = [];
if (usdState == 0) {
console.log("usd null:");
} else {
payment.push({ paymentMethod: 0, paymentPrice: usdState });
} 
if (tugrugState == 0) {
console.log("");
} else {
payment.push({ paymentMethod: 1, paymentPrice: tugrugState });
} 
if (coinState == 0) {
console.log("coin null");
} else {
payment.push({ paymentMethod: 2, paymentPrice: coinState });
} 

const arr = basketContext.basketState;
console.log("ORGiD", payment);
arr.forEach((element, i) => {
if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
});  

if (localStorage.getItem("token")) {
const body = arr;
const body2 = {
  func: "neworder",
  item: body,
  orgId: orgIdRadio,
  totalPrice: totalPriceState,
  // payment: payment,
  pkId: localStorage.getItem("pkId"),
  // orgId: orgIdInput2,
  // paymentMethod: 0,
  // product: body,
};
console.log("bodyId:2  ===>> ", body2);
var basketLocal = [];
axios.post("/api/post/Gate", body2).then((result) => {
  // message.success(<div className={css.SucessOrderCss}> Amraa</div>,100000);
    basketContext.removeBasketStorage();   
    // router.push("/order-history");
  },(error) => {console.log(error)}); 
} else {
const bodyNoId = {
  func: "neworder",
  orgId: orgIdRadio,
  totalPrice: totalPriceState,
  item: arr,
  // payment: payment,
};
console.log("bodyNoId: ", bodyNoId);
axios.post("/api/post/Gate", bodyNoId).then((result) => {
    message.success("Success");
    basketContext.removeBasketStorage(); 
    // router.push("/order-history");
  },(error) => {console.log(error)});
}

  }
};
 
  const handleCancelOrgId2 = () => {
    setOrgIdRadio("");
    console.log("cancel: ", checkFalse);
    formOrgId.resetFields();
    setCheckFalse(false); 
    setIsModalVisibleOrgId2(false);
  }; 

const orgIdChoose = (e) =>{ 
  console.log("e.target: ", e.target.value); 
  setOrgIdRadio(e.target.value);
   
  // if(localStorage.getItem("pkId")){
    setShowMethod(true);
  // }
} 
const  onFinishOrgId= (values) =>{ 
  console.log("values: ", values);
 
  // const data = {
  //   func: "newItem", title: values.itemName, description: values.descrip, 
  //   quantity: 0, price: values.price, cnt: 1, img: baseImg, others: "-", status: editStatus,
  // };
  // axios.post("/api/post/Gate", data).then((res) => {
  //     formAddItem.resetFields();  
  //     setIsModalVisible(false);
  //     message.success("Success");  
  //     getItems();
  //   }).catch((err) => {console.log("err", err)}); 
}
const onFinishFailedOrgId = (errInfo)=>{
  console.log("errInfo: ", errInfo);
  // formAddItem.resetFields(); 
}

const BankTypo = (value) =>{ 
  setBankValue(undefined);
  setBankChoose(value);

  // Hansh bodoh
  // console.log("def", defaultMaxFi);

  

  const usd = 0;
  usd = totalPriceState  * defaultMaxFi.USD / 100;

  const obot = 0;
  const convert = defaultMaxFi.Coin / 100;
  // console.log("default",defaultMaxFi.Coin );
  // console.log('convert: ', convert);
  obot = totalPriceState * convert * basketContext.hanshnuud[1].obot.hansh;

  const mnt = 0;
  const convert2 = defaultMaxFi.USD / 100;
  mnt = totalPriceState * convert2 * basketContext.hanshnuud[0].mnt.hansh2;
  //  console.log("mnt: ", mnt);
  // console.log("xansh", basketContext.hanshnuud);
  setMntUsdPrice([{ usd: usd.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"), obot: obot.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"), mnt: mnt.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,") }]);
  
  const mntr = 0;
  mntr = totalPriceState* basketContext.hanshnuud[0].mnt.hansh2;
  setMntPrice(mntr.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")) 
}
const onFinishUserInfo = (values) =>{
  console.log("values: ", values);
  if(values.email){
    if(countryCode.length >= 7){ 
      // setShowMethod(true);
      setShowBank(true);
      setUserInfo(values);
      setUserFormCapt(true);
      console.log("user", values);
    }else{
      message.error("Please input your phone number!");
    }
  }else{
      setShowBank(true);
      setUserInfo(values);
      setUserFormCapt(true);
  }
  
 
}
const onChangeCaptcha = (a) =>{ 
  console.log("captcha change: ", a);
  a == null ? setUserFormCapt(true) : setUserFormCapt(false);

}
const errorCapt = (err) =>{
  console.log("err", err);
}
const onFinishFailedUserInfo = (values) =>{ 
  console.log("user", values);
}

const bankOnChange = (e) =>{
  console.log("bank", e.target.value);
  setBankValue(e.target.value);

}
const onSearch = (value) => {
  console.log('search:', value);
};
const getOrderId = () =>{
  if(localStorage.getItem("oAiD") === undefined){
     
    setOrderIdLocal(0);
  }else {
    setOrderIdLocal(localStorage.getItem("oAiD"))
    console.log("object", localStorage.getItem("oAiD"));
  }
}
const placeOrder = () =>{
  
  console.log("place order: ", bankValue );
  if(bankValue === undefined){
    notification["warning"]({
      message: 'Error',
      description:
        'Do you select a Method!!!',
    });
  }else if(bankValue === "Tdb"){ 
    router.push("/payment?parameter1=amaraa&parameter2=000&body=asdjflajsdlkfjaklsjfklhadbd2626251dsf3as5df1as53df1as5df1as3fd51as3df153sadfas&fbclid=IwAR24B-dJ611MB46g-9X2v0rK3P8_7NgWmDtCnZxPTY1ZVraFwFfzM4pd760");
  }

  setPropsItems(basketContext.basketState);
  setBankPay(bankValue);

  if(bankValue === "Foreign"){
    // <KhanBank totalPriceState={totalPriceState} orgIdRadio={basketContext.orgNames[0].orgIdstate} basketState={basketContext.basketState} sucessOrder={sucessOrder}/>  
    // const arr = basketContext.basketState;
    console.log('foreign');
  }
}
const BackFunc = () =>{
   
  setBankPay(undefined);
  setBankValue(undefined);
}
const BackFuncVnd = () =>{
  setBankValue(undefined);
  prev();
}
// const foreignOnChange = (value) =>{

//   setForeignValue(value.target.value);
// }
const PayInInstallmentsForeign = () =>{
setPayInInstallments(1);
localStorage.setItem("Bank", 1);
}
const PayInInstallmentsCoin = () =>{
setPayInInstallments(2);
localStorage.setItem("Bank", 2);
}
const sucessOrder = () =>{ 

  setSuccessOrderValue(2); 
}
const removeBask = () =>{ 
  setSuccessOrderValue(4);
} 
const invoBack = () =>{
  setInvoiceBoolean(false)
  console.log("object");
}
const getDefMaximFi = () =>{ 
  const body = {
    func: "getDefMaximFi",
}
axios.post("/api/post/Gate", body).then((res)=>{
    console.log("rs", res.data);
    setDefaultMaxFi(res.data.data);
}).catch((err)=>{
    console.log("err");
})
}
const mnBack = (a) =>{
  console.log("mnBank", a );
  setDisableBtn(true);
}
  var sss = 0;
const steps = [
{title: "Cart",content: (
<div>
  <div className={css.orderItem}>
    {basketContext.basketState.length === 0 ? (<Empty description="Empty"></Empty>) : (
      <div className={css.ItemDivide}>  
        <div className={css.ItemTotal}> 
          <div className={css.ItemSize}>
            {basketContext.basketState.map((e, i) => (
              <div className={e.img === undefined ? css.Items2 : css.Items} key={i} >
                <div className={css.ItemsSolo}>
                  <div className={e.img === undefined ? css.grpBackColor : css.ItemZurag}>
                    {e.img ? <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img}/> : <div className={css.PgrCss}>P</div>} </div>
                  <div className={css.ItemsInfo}>
                    <div className={css.ItemsTitle}> <div className={css.TitleOver}>{e.title}</div>
                      <div style={{display: "flex", alignItems: "center", color: "rgb(102, 102, 102)"}}>
                        <div className={css.HoverDetails}>
                        <ItemDetails data={e}/>
                        </div>
                        <Tooltip title={<div style={{color: "rgb(100 100 100)", fontSize: "12px"}}> Delete</div>} color="white" ><Button type="link" shape="circle" size="small" onClick={() =>basketContext.basketItemDelete(i,totalPriceFunction)} icon={<DeleteOutlined  style={{color: "#666", fontSize: "15px"}}/>}></Button></Tooltip>
                      </div>
                    </div>
                    <div className={css.DescripOver}>{e.description} </div>
                    <div className={css.Descrip}>
                      <div className={css.QtyBtn}>
                        <Button type="dashed" size="small" onClick={() =>basketContext.decline(i, totalPriceFunction)}>-</Button>
                        <div className={css.QtyName}>{e.cnt}</div>
                        <Button type="dashed" size="small" onClick={() =>basketContext.increase(i,totalPriceFunction)}>+</Button>
                      </div>
                      <div>{e.price} {e.itemPriceTotal}$</div>
                    </div>
                    {e.img === undefined ? <div><Button style={{width: "100%", marginTop: "5px"}} size="middle" type="primary" shape="round" 
                    onClick={()=>showModalItem(e)}> Items </Button>
                      <Modal title="Package items" open={isModalOpen} onOk={handleOkItem} onCancel={handleCancelItem} footer={null}  >
                    {itemHdr ?
                    <div className={css.ModalBackground}>
                      <div className={css.titleH}>{itemHdr.title}</div>
                      <div className={css.ItemDesc}>{itemHdr.description}</div>
                      <div className={css.PackageHdr}> Packege items:</div>
                      <div className={css.DetailsScroll}> 
                          {groupDetails.map((e, i)=>( 
                          <div className={css.BasketItem} key={i}>
                            <div className={css.Zurag2}>
                              <Image alt="Obertech"preview={false}src={"data:image/png;base64," + e.img}/>
                            </div>
                            <div className={css.Descrip2}>
                              <div className={css.Title2}><div className={css.ItemTitle2}>{e.title}</div></div>
                         
                              <div>{e.description}</div>
                              <div className={css.Price2}>
                                <div> Qty: {e.itemCnt}</div>
                                <div style={{fontWeight: "600"}}> {e.itemPriceD}$</div>
                              </div>
                            </div>
                          </div> 
                          ))}
                      </div>
                      <div className={css.TotalPriceCss}>Total price: {itemHdr.price}$</div>
                      </div> 
                      : <Empty /> }
                  </Modal>
                      </div> : ""}
                  </div>
                  
                </div> 
              </div>
            ))}
            {itemSpin ?  <div className={css.Spinner}> <Spin  size="large"/> </div>: ""} 
          </div> 
        </div>
        <div className={css.Reminder}>
          <div className={css.OrderSummary}>Order summary</div>
          <div className={css.SubTotal}><div>Subtotal</div> <div> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
          <div className={css.TotalLenght}><div>Total 
          {/* ({basketContext.basketState.length}) */}
          </div> <div className={css.TotalLPrice}>  {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
          <div className={css.ProceedTo}><Button className={css.CheckoutBtn} size="large" onClick={() => next()}>Proceed to Checkout</Button></div>
        </div>
      </div>
    )}
  </div>
</div>
),
},
{
  title: "Pay",
  content: ( <div> 
    {bankPay === undefined ?
    <div className={css.PayContent}>

      <div className={css.PayConfirm}> 
        <div>
          <div className={css.PlsName}>Please select your organization name to confirm!</div>
          <div className={css.RadioCont}> 
              <Radio.Group onChange={orgIdChoose} style={{width: "100%"}} value={orgIdRadio}> 
                <Radio  className={css.OrgRadio} value={basketContext.orgId}>
                  <div className={css.OrgConfirm}> 
                  <div> 
                    <div>{basketContext.orgId} </div>
                    {/* <div>Байгууллагын нэр: Обортек</div> */}
                  </div>
                  <div className={css.OrgDesc}> 
                    <div><span>Organization name:</span> <span style={{marginLeft: "10px"}}>{basketContext.orgId}</span></div>
                    <div><span>Organization ID:</span> <span style={{marginLeft: "26px"}}>{basketContext.orgNames[0] ? basketContext.orgNames[0].orgIdstate : "xxxx"} </span></div>
                    {/* <div><span>Байгууллагын нэр: </span> <span style={{marginLeft: "9px"}}>Обортек</span></div>
                    <div><span>Байгууллагын ID: </span> <span style={{marginLeft: "19px"}}>Obogti760</span></div> */}
                  </div>
                  </div>
                  </Radio> 

              </Radio.Group>  
          </div>
        </div>   
        <div className={css.InfoDetails}>
          {/* {orgIdRadio === 0  || showMethod || localStorage.getItem("pkId") ?  null : 
            <div className={css.AlertDesk}>
              <div className={css.AlertText}>
                <Alert message="Informational Notes"
                  description="Additional description and information about copywriting."
                  type="warning"
                  showIcon
                />
              </div>
              
             <div className={css.AlertInput}> 
                <div className={css.AlertName}>Please fill in your information!</div>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 22}}
                  onFinish={onFinishUserInfo} onFinishFailed={onFinishFailedUserInfo}>
                  <Form.Item name="email" label="Email" rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>)}]}>
                    <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
                  </Form.Item> 
                  <Form.Item name="countryCode" label="Phone Number" rules={[{required: true, message: 'Please input your phone number!'}]}>
                      <PhoneInput   enableSearch={true} country={'us'} value={countryCode} onChange={(e) => setCountryCode(e)} style={{width: "100%"}}/>
                  </Form.Item>
                  <div style={{width: "100%", marginBottom: "20px"}}> 
                <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                </div>  
                  <Form.Item status="error" wrapperCol={{span: 24}}> <div className={css.Login}><Button disabled={userFormCapt} style={{width: "100%",background: "rgb(244, 63, 94)", border: "none" }} type="primary" htmlType="submit" className="login-form-button">Continue</Button></div></Form.Item>
                </Form>  
                
                
             </div>
            </div>
          } */}

        {showMethod ? <div className={css.PayMethod}> 
            <div className={css.PayMethTitle}>Payment Methods</div>
            <div className={css.Methodchild}>
            {payInInstallmentsValue === 1 || payInInstallmentsValue === 2 ? 
               <Typography.Text onClick={()=> BankTypo("Coin")}> 
               <div className={bankChoose === "Coin" ? css.BankCssActive  : css.BankCss}>
            {defaultMaxFi.USD} % USD-MNT / {defaultMaxFi.Coin}% Coin
               </div>
               </Typography.Text>
              :
                <> 
                 <Typography.Text onClick={()=> BankTypo("Mongol")}> 
                 <div className={bankChoose === "Mongol" ? css.BankCssActive : css.BankCss}>
                   <div>Mongolian banks</div>
                   <div className={css.BankImg}>  
                    
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={25} style={{borderRadius: "5px"}}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/borderHas.png" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={26}/>
                     </div>

                   </div>
                 </div>
                 </Typography.Text>

                 <Typography.Text onClick={()=> BankTypo("Usd")}> 
                 <div className={bankChoose === "Usd" ? css.BankCssActive : css.BankCss}>
                   <div>Foreign banks</div>
                   <div className={css.BankImg}>  
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/borderPayPal2.jpg" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/borderMastercard.webp" width={25} style={{borderRadius: "5px"}}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="/img/borderGooglePay.png" width={25}/>
                     </div>
                      
                   </div>
                 </div>
                 </Typography.Text>

                <Typography.Text onClick={()=> BankTypo("Coin")}> 
                <div className={bankChoose === "Coin" ? css.BankCssActive  : css.BankCss}>
                    {defaultMaxFi.USD}% USD/MNT 
                    <b style={{fontWeight: "600"}}> <span>  {defaultMaxFi.Coin}% </span>  <Image alt="Obertech" preview={false} src="/img/logoCirc.svg" width={20} /> OBOT</b>
                </div>
                </Typography.Text>

                
                </>
                } 
               
            </div>
            <div>
          
        
                <Hansh bankChoose={bankChoose} totalPriceState={totalPriceState} />
            
            </div>
        </div>
        : null}
        </div>
      </div>

      <div className={css.Reminder}>
      {bankChoose === "Mongol" ? 
        <div className={css.BankGroup}>  
          <div className={css.BankTitle}>Select your payment method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
              <Radio  className={css.BankRadio} value={"Qpay"}><Image alt="Obertech" preview={false} src="/img/qpay.png" width={50}/></Radio> 
              <Radio  className={css.BankRadio} value={"SocialPay"}><Image alt="Obertech" preview={false} src="/img/socialPay.png" width={80}/></Radio> 
              <Radio  className={css.BankRadio} value={"Monpay"}><Image alt="Obertech" preview={false} src="/img/monpay.png" width={100}/></Radio> 
              
              <Radio  className={css.BankRadio} value={"Tdb"}><Image alt="Obertech" preview={false} src="/img/tdbline.png" width={60}/></Radio> 
              <Radio  className={css.BankRadio} value={"Golomt"}><Image alt="Obertech" preview={false} src="/img/golomt.png" width={90}/></Radio> 
              <Radio  className={css.BankRadio} value={"khan"}><Image alt="Obertech" preview={false} src="/img/khanbank.png" width={100}/></Radio>  
            
          </Radio.Group>   
        </div>
        : null}
         {bankChoose === "Usd" ? 
        <div className={css.BankGroup}> 
          <div className={css.BankTitle}>Select your payment method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
              <Radio  className={css.BankRadio} value={"Paypal"}><Image alt="Obertech" preview={false} src="/img/paypalLine.png" width={60}/></Radio> 
              <Radio  className={css.BankRadio} value={"Master"}><Image alt="Obertech" preview={false} src="/img/masterCardLine.png" width={60}/></Radio>  
          </Radio.Group>  
        </div> : null}

        {bankChoose === "Coin" ? 
        <div className={css.BankGroup}> 
          <div className={css.BankTitle}>Select your payment method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%" }}> 
               <div style={{boxShadow:" 1px 1px 2px 1px #ebebeb", borderRadius: "10px"}}>  
              <Radio disabled={payInInstallmentsValue === 1 ? true : false} className={payInInstallmentsValue === 1 ? css.BankRadioInActive : css.BankRadio} value={"Foreign"}> 
                {payInInstallmentsValue === 1 ? 
                <Tooltip title="Tips" placement="topLeft">
                  <div className={css.PaySuccess}></div>
                </Tooltip> : null}

              {payInInstallmentsValue === 1 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "210px"}}> 
                  <div className={css.CoinFlex1}> 
                    <div>
                      <div style={{marginLeft: "5px"}}>Foreign banks</div> <Image alt="Obertech" preview={false} src="/img/cardnuud.png" width={100} style={{marginLeft: "5px"}}/>
                      
                    </div> 
                    
                    {/* <div className={css.HuwiCss}>{defaultMaxFi.USD}%</div> */}
                  </div>
                </div>  
              </Radio>  
              <Radio  disabled={payInInstallmentsValue === 3 ? true : false} className={payInInstallmentsValue === 3 ? css.BankRadioInActive : css.BankRadio} value={"Mongol"} style={{width: "100%"}}>
              {payInInstallmentsValue === 3? 
                <Tooltip title="Tips">
                  <div className={css.PaySuccess}></div>
                </Tooltip> : null}
              {payInInstallmentsValue === 3 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "210px"}}> 
                  <div className={css.CoinFlex1}>  
                    <div>
                      <div style={{marginLeft: "5px" }}>Mongolian banks</div> 
                        <div style={{display: "flex"}}> 
                            <div className={css.BankImgSize2}> 
                            <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={15}/>
                            </div>
                            <div className={css.BankImgSize2}> 
                              <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={15} style={{borderRadius: "5px"}}/>
                            </div>
                            <div className={css.BankImgSize2}> 
                              <Image alt="Obertech" preview={false} src="/img/borderHas.png" width={15}/>
                            </div>
                            <div className={css.BankImgSize2}> 
                              <Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={16}/>
                            </div>
                        </div>
                    </div>
                    <div   style={{position: "absolute", display: "flex",fontSize: "12px",  borderLeft: "1px solid #e7e7e7", alignItems: "center",justifyContent: "center", background: "#fff", height: "121px", right: "0px", marginTop: "-70px", justifyContent: "center", width: "79px", }}>
                      <span style={{padding: "10px", background: "#4d5052", color: "#fff", borderRadius: "5px"}}>{defaultMaxFi.USD}%</span> 
                      
                    </div>
                  </div>
                </div>
              </Radio> 
              </div>
              <div  disabled={payInInstallmentsValue === 2 ? true : false} className={payInInstallmentsValue === 2 ? css.BankRadioInActive : css.BankRadio} value={"Coin"} style={{width: "100%", boxShadow: "1px 1px 2px 1px #ebebeb"}}>
          
              {payInInstallmentsValue === 2 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "234px"}}> 
                  <div className={css.CoinFlex1}> 
                    <div className={css.CoinFlex2}><Image alt="Obertech" preview={false} src="/img/logoCirc.svg" width={20}/> <div style={{marginLeft: "5px"}}>OBOT</div></div> 
                    <div className={css.HuwiCss}>{defaultMaxFi.Coin}%</div>
                  </div>
                </div>
              </div> 
          
          </Radio.Group>  
        </div> : null}

        <div className={css.OrderSummary}>Total</div>
        {bankChoose === "Coin" ? <>
        {bankValue === "Foreign" ?  
        <> 
        <div className={css.SubTotal}> 
          <div> 
            <span style={{display: "flex"}}><div className={css.Tugrug}> $ </div> Usd</span>
          </div>
          <div className={payInInstallmentsValue === 1 ? css.SubTotalSuccess : null}>  
              {mntUsdPrice[0].usd}$ 
            <span style={{fontSize: "11px", color: "#F43F5E", fontWeight: "600"}}> / {defaultMaxFi.USD}%</span>
            
          </div>
        </div>

        <div className={css.SubTotal}><div><Image alt="Obertech" preview={false} src="/img/logoCirc.svg" width={20}/><span style={{marginLeft: "2px"}}>OBOT</span></div><div className={payInInstallmentsValue === 2 ? css.SubTotalSuccess : null}> 
          {mntUsdPrice[0].obot}
          <span style={{fontSize: "10px", fontWeight: "600"}}> Obot</span><span style={{fontSize: "11px", color: "#F43F5E", fontWeight: "600"}}> / {defaultMaxFi.Coin}%</span></div>
        </div>
        </>
        : bankValue === "Mongol" ?
        <>

        <div className={css.SubTotal}><div>  <span style={{display: "flex"}}><div className={css.Tugrug}> ₮ </div> MNT</span></div>
          <div className={payInInstallmentsValue === 1 ? css.SubTotalSuccess : null}>   {mntUsdPrice[0].mnt}₮
            <span style={{fontSize: "11px", color: "#F43F5E", fontWeight: "600"}}> / {defaultMaxFi.USD}%</span>
          </div>
        </div>
        <div className={css.SubTotal}><div><Image alt="Obertech" preview={false} src="/img/logoCirc.svg" width={20} style={{borderRadius: "16px"}}/><span style={{marginLeft: "7px"}}>OBOT</span></div><div className={payInInstallmentsValue === 2 ? css.SubTotalSuccess : null}>  {mntUsdPrice[0].obot}<span style={{fontSize: "10px", fontWeight: "600"}}> Obot</span><span style={{fontSize: "11px", color: "#F43F5E", fontWeight: "600"}}> / {defaultMaxFi.Coin}%</span></div>
        </div>
        </>
        : ""
        }


        </>
        : null }

        <div className={css.SubTotal}><div>Subtotal</div> <div> {totalPriceState}$</div></div>
        <div className={css.TotalLenght}><div>Total </div> 
        <div className={css.TotalLPrice}>  
        {/* {mntPrice} */}
        {bankChoose === "Mongol" ? mntPrice  : totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} 
          {bankChoose === "Mongol" ? <span style={{fontWeight: "500" }}>₮</span> : "$"}
         </div>
        </div>
        <div className={css.ProceedTo}><Button disabled={bankValue === undefined ? true : false} className={css.CheckoutBtn} size="large" onClick={placeOrder}>Place order</Button>
          {/* {console.log("paymethod banks: ", bankChoose)} */}
        </div>
      </div>

  
    </div>

    : <div className={css.PayBanks}>  
        {/* <Button onClick={BackFunc} className={css.BackCss}>Back</Button> */}
        {bankValue === "khan" || bankValue === "Golomt" || bankValue === "Tdb" || bankValue === "Monpay"? 
    <div> 

{!showBank ? 
<div className={css.AlertDesk}>
  <div className={css.AlertText}>
    <Alert message="Informational Notes"
      description="Additional description and information about copywriting."
      type="warning"
      showIcon
    />
  </div>
  
  <div className={css.AlertInput}> 
  <div className={css.AlertName}>Please fill in your information!</div>
    <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 22}} onFinish={onFinishUserInfo} onFinishFailed={onFinishFailedUserInfo}>
      {!localStorage.getItem("pkId") ? <> 
      <Form.Item name="email" label="Email" rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>)}]}>
        <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
      </Form.Item> 
      <Form.Item name="countryCode" label="Phone Number" rules={[{required: true, message: 'Please input your phone number!'}]}>
          <PhoneInput   enableSearch={true} country={'us'} value={countryCode} onChange={(e) => setCountryCode(e)} style={{width: "100%"}}/>
      </Form.Item></>
      : null }
      <Form.Item name="description"  tooltip="This is a required field" label="Description" rules={[{   required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Description!</div>)}]}>
        <TextArea size="middle"  placeholder={"Description"}/>
      </Form.Item> 
      <div style={{width: "100%", marginBottom: "20px", display: "flex", justifyContent: "right"}}> 
    <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
    </div>  
      <Form.Item status="error" wrapperCol={{span: 24}}> <div className={css.Login}><Button disabled={userFormCapt} style={{width: "100%",background: "rgb(244, 63, 94)", border: "none" }} type="primary" htmlType="submit" className="login-form-button" size="large">Continue</Button></div></Form.Item>
    </Form>   
  </div>
</div>
: null }

{showBank ? 
<Tabs defaultActiveKey="4" items={["a","b", "c"].map((Icon, i) => {  

return {label: i === 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Cart</div> :
            i === 1 ? <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>QPay</div> : 
            i === 2 ? <div  style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Invoice</div> : null,

key: i, children: i === 0? 
<div className={css.PaymentCss}>
  {bankValue === "khan" ? 
  <KhanBank userInfo={userInfo} mntPrice={mntPrice} sourceData={sourceData} totalPriceState={totalPriceState} orgIdRadio={basketContext.orgNames[0].orgIdstate} basketState={basketContext.basketState} sucessOrder={sucessOrder}/> 
  : null}
  
  {bankValue === "Golomt" ? <div>Golomt </div> : null}
  {bankValue === "Tdb" ? <div>
    dssdsdsd
      <TdbBank />
      </div> : null}
  {bankValue === "Monpay" ? <div>Monpay2 </div> : null}

</div> 
: i === 1 ? <div className={css.PaymentCss}>
  
    <div className={css.Qpay}> 
      <div className={css.QpaySize}>
        <Image alt="Obertech" preview={false} src="/img/qr.png" width={150}/>
      </div>
      <div className={css.QpayTitle}>Төлөх дүн </div>
      <div className={css.QpayPrice}>{mntPrice}₮</div>
    </div>

</div> : 
  i === 2 ? <div className={css.PaymentCss}>
    {!invoiceBoolean ?
      <> 
      <div className={css.ShiljvvlegCont}> 
        <div className={css.Shiljvvleg}>
          <div className={css.ShilTitle}>Account number </div>
          <div className={css.ShilTitle2}> 5220042965</div>
          <div className={css.Copy}> 
            <Paragraph copyable={{text: "5220042965"}}></Paragraph> 
          </div>
        </div>
        
        <div className={css.Shiljvvleg}>
          <div className={css.ShilTitle}>Receiver</div>
          <div className={css.ShilTitle2}> Obortech XXK</div>
          <div className={css.Copy}>  
          <Paragraph copyable={{text: "Obortech XXK"}}></Paragraph>
          </div> 
        </div>

        <div className={css.Shiljvvleg}>
          <div className={css.ShilTitle}>Amount to be paid </div>
          <div className={css.ShilTitle2}> {mntPrice}₮</div>
          <div className={css.Copy}>  
            <Paragraph copyable={{text: totalPriceState}}></Paragraph>
          </div>
        </div>

        <div className={css.Shiljvvleg}>
          <div className={css.ShilTitle}>transaction value</div>
          <div className={css.ShilTitle2}> 5220042965</div>
          <div className={css.Copy}> 
          <Paragraph copyable={{text: '5220042965'}}></Paragraph>
          </div>
        </div>  
      </div>
      <div> 
        <Button size="large" type="primary" style={{width: "150px"}} onClick={()=>setInvoiceBoolean(true)}>Invoice</Button>
      </div>
    </>
    : <div>
        {/* <div style={{display: "flex", alignItems: "center", fontWeight: "600", fontSize: "20px", marginBottom: "10px"}}> 
          <div style={{marginRight: "5px", display: "flex", alignItems: "center"}}><Button size="small" type="link" onClick={()=>setInvoiceBoolean(false)} icon={<ArrowLeftOutlined />}></Button> </div>
          <div>Invoice </div>
        </div> */}

        <div>
          <Invoice invoiceSuccessFunc={invoiceSuccessFunc} items={basketContext.basketState} totalPrice={totalPriceState} mntPrice={mntUsdPrice} invoBack={invoBack} sucessOrder={sucessOrder}/>  
        </div>
      </div>
    }
  </div> : null,
};
})}/>   
: null }

        </div> 
        : 
          bankValue === "Paypal" ? <div> 
            <Paypal sucessOrder={sucessOrder} bankValue={bankValue} totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsForeign={PayInInstallmentsForeign} payInInstallmentsValue={payInInstallmentsValue}/>
          </div> : null 
        }

        {bankValue === "Coin" ? 
          <div> 
            <Coin sucessOrder={sucessOrder} totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsCoin={PayInInstallmentsCoin}
             payInInstallmentsValue={payInInstallmentsValue}/>  
          </div>
          : null}


        {/* Mongol gadaad banknuuud */}
        {bankValue === "Foreign" ? 
        <div> <ForeignObot sucessOrder={sucessOrder} mntUsdPrice={mntUsdPrice} defaultMaxFi={defaultMaxFi} item={basketContext.basketState} price={totalPriceState}/> </div> : null} 

        {bankValue === "Mongol" ? 
        <div> 
  {!showBank ? 
<div className={css.AlertDesk}>
  <div className={css.AlertText}>
    <Alert message="Informational Notes"
      description="Additional description and information about copywriting."
      type="warning"
      showIcon
    />
  </div>
  
  <div className={css.AlertInput}> 
  <div className={css.AlertName}>Please fill in your information!</div>
    <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 22}} onFinish={onFinishUserInfo} onFinishFailed={onFinishFailedUserInfo}>
      {!localStorage.getItem("pkId") ? <> 
      <Form.Item name="email" label="Email" rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>)}]}>
        <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
      </Form.Item> 
      <Form.Item name="countryCode" label="Phone Number" rules={[{required: true, message: 'Please input your phone number!'}]}>
          <PhoneInput   enableSearch={true} country={'us'} value={countryCode} onChange={(e) => setCountryCode(e)} style={{width: "100%"}}/>
      </Form.Item></>
      : null }
      <Form.Item name="description"  tooltip="This is a required field" label="Description" rules={[{   required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Description!</div>)}]}>
        <TextArea size="middle"  placeholder={"Description"}/>
      </Form.Item> 
      <div style={{width: "100%", marginBottom: "20px", display: "flex", justifyContent: "right"}}> 
    <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
    </div>  
      <Form.Item status="error" wrapperCol={{span: 24}}> <div className={css.Login}><Button disabled={userFormCapt} style={{width: "100%",background: "rgb(244, 63, 94)", border: "none" }} type="primary" htmlType="submit" className="login-form-button" size="large">Continue</Button></div></Form.Item>
    </Form>   
  </div>
</div>
: null }
         {showBank ?
          <MongolianObot userInfo={userInfo}  mnBack={mnBack} sucessOrder={sucessOrder} sourceData={sourceData} mntUsdPrice={mntUsdPrice} defaultMaxFi={defaultMaxFi} 
          orgIdRadio={basketContext.orgNames[0].orgIdstate} 
          item={basketContext.basketState}  price={totalPriceState}/>
        : null }
        </div> : null}

      </div>}

      </div>),
},
{
  title: "Completed",
  content: (
    <div>
      <div className={css.AbsoClear}> 
      <Tooltip title="Clear">
        <Button onClick={removeBask} type="primary" shape="circle" style={{marginTop: "10px"}}>X</Button>
      </Tooltip>
      </div>
      <SuccessOrder totalPriceState={successOrderPrice} items={propsItem} invoiceSuccess={invoiceSuccess} mnPrice={mntUsdPrice}/>
     
     
  </div>
  ),
},
];

  return (
    <div style={{fontFamily: "Roboto Condensed, sans-serif"}}>
      <BaseLayout pageName="payment">
        <div style={{ fontSize: "14px", fontWeight: "500" }}> 
        {/*  */}
          {basketContext.basketState.length === 0 || basketContext.orgId === undefined ? (

            <div style={successOrderValue === 2 ? {display: "none"} : {fontSize: "15px", marginTop: "50px"}}>
                {orderIdSt.length > 2 ? <div> {orderIdSt}Baraa bn </div>:  
              <Empty description="Cart is empty"></Empty> 
          }

            </div>
          ) : (
            <div className={css.ContentCss}>
              <Steps current={successOrderValue === 2 ? 2 : current}>
                {steps.map((item) => (<Step key={item.title} title={item.title} />))}
              </Steps>
              <div className="steps-content">{steps[successOrderValue === 2 ? 2 : current].content}</div>
              <div className="steps-action">
                {/* {current < steps.length - 1 && (<Button type="primary" onClick={() => next()}>Continue</Button>)} */}
                {current === steps.length - 1 && (
                  <>
                    <Button icon={<ShoppingCartOutlined />} type="primary" onClick={orderOrgId2}>Done</Button>
                    <Modal title="OrgID" open={isModalVisibleOrgId2} onOk={handleOkOrgId2} onCancel={handleCancelOrgId2} > 
                    
                      <div>Org ID choose: </div> 
                      {/* <Radio.Group onChange={orgIdChoose} > 
                        <Radio checked={checkFalse === false}value={basketContext.orgId}>{basketContext.orgId}</Radio> 
                      </Radio.Group>  */}
                      <Form form={formOrgId} name="normal_login" className={css.LoginForm} labelCol={{span: 6,}} wrapperCol={{span: 16,}} initialValues={{remember: true}}
                        onFinish={onFinishOrgId} onFinishFailed={onFinishFailedOrgId}>
                         <Form.Item label={"orgId"} name="orgId" rules={[{required: true,message: "Please input your Select radio!"}]}>
                          <Radio.Group onChange={orgIdChoose} > 
                            <Radio value={basketContext.orgId}>{basketContext.orgId}</Radio> 
                          </Radio.Group>
                        </Form.Item> 
                        {/* <Form.Item   wrapperCol={{offset: 20, span: 12,}} style={{marginBottom: "-5px"}}>
                          <div><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div>
                        </Form.Item> */}
                      </Form> 
                    </Modal>
                  </>
                )} 
                {bankPay === undefined ? current > 0 && (<Button style={{margin: "0 8px",}}onClick={BackFuncVnd}>Back1</Button>) :  <Button onClick={BackFunc} disabled={disableBtn}>Back</Button>}
              </div>
            </div>
          )}

          <div>
            {successOrderValue === 2 ? 
               <div className={css.ContentCss}>
               <Steps current={successOrderValue === 2 ? 2 : current}>
                 {steps.map((item) => (<Step key={item.title} title={item.title} />))}
               </Steps>
               <div className="steps-content">{steps[successOrderValue === 2 ? 2 : current].content}</div>
               <div className="steps-action">
               
                 {/* {bankPay === undefined ? current > 0 && (<Button style={{margin: "0 8px",}}onClick={() => prev()}>Back</Button>) :  <Button onClick={BackFunc}>Back</Button>} */}
               </div>
             </div>
            : null}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};
export default Payment;
