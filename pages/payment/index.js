import {Input,Button,message,Empty,Steps,Modal,Image,InputNumber,Row,Col,Radio,Form,Spin, Tooltip, Alert, Typography, notification, DatePicker} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import Link from "next/link";
import { WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BasketContext from "../../context/basketContext/BasketContext";
import axios from "axios";
import {CaretRightOutlined,ShoppingCartOutlined,MailOutlined ,SmileFilled,DeleteOutlined, PhoneOutlined, CheckCircleOutlined} from "@ant-design/icons";
// import jsPDF from "jspdf"; 
import { Tabs } from "antd"; 
import SuccessOrder from "../../components/PaymentCom/SuccessOrder"; 
import KhanBank from "../../components/PaymentCom/khanBank";
import moment from 'moment';
import CreditOrDebitCard from "../../components/PaymentCom/CreditOrDebitCard";
import Coin from "../../components/PaymentCom/Coin";
const { TabPane } = Tabs;
const { Step } = Steps;
const { Paragraph } = Typography;

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
  useEffect(() => {
    totalPriceFunction();
    dateFunction();
    // totalPriceFunction();
  }, []);


  const dateFunction = () => {
    console.log("date time: ");
    
    const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    var date = new Date();
    setDateState(date.getFullYear() + "/" + mounths[date.getMonth()] + "/" + date.getDate()); 
    var datePlus = new Date();
    datePlus.setDate(datePlus.getDate() + 30);
    setDatePlusState(datePlus.getFullYear() +"/" +mounths[datePlus.getMonth()] +"/" +datePlus.getDate()); 
  };  
  const totalPriceFunction = () => {
    console.log("total");
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
    setTotalPriceState(itemPrice);
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
  const CoinFunc = (e) => {
    console.log("coin input: ", e);
    setCoinTargetState(e);
    const result = 0;
    result = e / basketContext.hanshnuud[2].rate;
    console.log("coin: ", result);
    setCoinState(result);

    console.log("coinstate");
  };
  const UsdFunc = (e) => {
    console.log("Usd input: ", e);
    setUsdTargetState(e);
    const result = 0;
    if (e === null) {
      setUsdState(0);
    } else {
      result = e;
      setUsdState(result);
    }
  };
  const TugrugFunc = (e) => {
    setTugrugTargetState(e);
    const result = 0;
    result = e * basketContext.hanshnuud[1].rate;
    setTugrugState(result);
  };
  const TotalPriceFunc = () => {
    console.log("coinState: ", coinStateTarget);
    console.log("usdState: ", usdStateTarget);
    console.log("tugrugState: ", tugrugStateTarget);
  };
const orgIdChoose = (e) =>{ 
  console.log("e.target: ", e.target.value); 
  // setOrgOnChange()
  setOrgIdRadio(e.target.value);
   
  if(localStorage.getItem("pkId")){
    setShowMethod(true);
  }
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
}
const onFinishUserInfo = (values) =>{
  setShowMethod(true);
  console.log("user", values);
}
const onFinishFailedUserInfo = (values) =>{ 
  console.log("user", values);
}

const bankOnChange = (e) =>{
  console.log("bank", e.target.value);
  setBankValue(e.target.value);

}
const placeOrder = () =>{
  console.log("place order: ", bankValue );
  if(bankValue === undefined){
    notification["warning"]({
      message: 'Error',
      description:
        'Do you select a Method!!!',
    });
  }
 
  setBankPay(bankValue);
}
const BackFunc = () =>{
  setBankPay(undefined);
  setBankValue(undefined);
}
const foreignOnChange = (value) =>{

  setForeignValue(value.target.value);
}
const PayInInstallmentsForeign = () =>{
setPayInInstallments(1);
localStorage.setItem("Bank", 1);
}
const PayInInstallmentsCoin = () =>{
setPayInInstallments(2);
localStorage.setItem("Bank", 2);
}
  var sss = 0;
const steps = [
{title: "Shopping Cart",content: (
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
                      <div>
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
          <div className={css.TotalLenght}><div>Total(4)</div> <div className={css.TotalLPrice}> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
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
          <div className={css.PlsName}>Please select the name of your organization?</div>
          <div className={css.RadioCont}> 
              <Radio.Group onChange={orgIdChoose} style={{width: "100%"}} value={orgIdRadio}> 
                <Radio  className={css.OrgRadio} value={basketContext.orgId}>{basketContext.orgId}</Radio> 
              </Radio.Group>  
          </div>
        </div>

        <div className={css.InfoDetails}>
          {orgIdRadio === 0  || showMethod || localStorage.getItem("pkId") ?  null : 
            <div className={css.AlertDesk}>
              <div className={css.AlertText}>
                <Alert message="Informational Notes"
                  description="Additional description and information about copywriting."
                  type="warning"
                  showIcon
                />
              </div>
             <div className={css.AlertInput}> 
                <div className={css.AlertName}>Та өөрийнхөө мэдээлэлийг бөглөнө үү!</div>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 6,}} wrapperCol={{span: 22}}
                  onFinish={onFinishUserInfo} onFinishFailed={onFinishFailedUserInfo}>
                  <Form.Item name="email" label="Email" rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>)}]}>
                    <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
                  </Form.Item>
                  <Form.Item name="phone" label="Phone" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
                    <InputNumber size="middle" prefix={<PhoneOutlined className={css.Title} rotate={90} />} placeholder={"Phone number"} style={{width: "100%"}}/>
                  </Form.Item>   
                  <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Save</Button></div></Form.Item>
                </Form>  
             </div>
            </div>
          }

        {showMethod ? <div className={css.PayMethod}> 
            <div className={css.PayMethTitle}>Payment Methods</div>
            <div className={css.Methodchild}>
            {payInInstallmentsValue === 1 || payInInstallmentsValue === 2 ? 
               <Typography.Text onClick={()=> BankTypo("Coin")}> 
               <div className={bankChoose === "Coin" ? css.BankCssActive  : css.BankCss}>
                   60% USD / 40% Coin
               </div>
               </Typography.Text>
              :
                <> 
                 <Typography.Text onClick={()=> BankTypo("Mongol")}> 
                 <div className={bankChoose === "Mongol" ? css.BankCssActive : css.BankCss}>
                   <div>Mongolian banks</div>
                   <div className={css.BankImg}>  
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/boderkhan.png" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderGolomt.png" width={25} style={{borderRadius: "5px"}}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderHas.png" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderTdb.png" width={26}/>
                     </div>
                   </div>
                 </div>
                 </Typography.Text>

                 <Typography.Text onClick={()=> BankTypo("Usd")}> 
                 <div className={bankChoose === "Usd" ? css.BankCssActive : css.BankCss}>
                   <div>Foreign banks</div>
                   <div className={css.BankImg}>  
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderPayPal2.jpg" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderMastercard.webp" width={25} style={{borderRadius: "5px"}}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderGooglePay.png" width={25}/>
                     </div>
                      
                   </div>
                 </div>
                 </Typography.Text>

                <Typography.Text onClick={()=> BankTypo("Coin")}> 
                <div className={bankChoose === "Coin" ? css.BankCssActive  : css.BankCss}>
                    60% USD / 40% Coin
                </div>
                </Typography.Text>
                </>
                } 
            </div>
        </div>
        : null}
        </div>
      </div>
      <div className={css.Reminder}>
      {bankChoose === "Mongol" ? 
        <div className={css.BankGroup}>  
          <div className={css.BankTitle}>Do you select a Method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
              <Radio  className={css.BankRadio} value={"khan"}><Image alt="Obertech" preview={false} src="img/khanbank.png" width={100}/></Radio> 
              <Radio  className={css.BankRadio} value={"Monpay"}><Image alt="Obertech" preview={false} src="img/monpay.png" width={100}/></Radio> 
              <Radio  className={css.BankRadio} value={"Golomt"}><Image alt="Obertech" preview={false} src="img/golomt.png" width={90}/></Radio> 
              <Radio  className={css.BankRadio} value={"Tdb"}><Image alt="Obertech" preview={false} src="img/tdbline.png" width={60}/></Radio> 
          </Radio.Group>   
        </div>
        : null}
         {bankChoose === "Usd" ? 
        <div className={css.BankGroup}> 
          <div className={css.BankTitle}>Do you select a Method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
              <Radio  className={css.BankRadio} value={"Paypal"}><Image alt="Obertech" preview={false} src="img/paypalLine.png" width={60}/></Radio> 
              <Radio  className={css.BankRadio} value={"Master"}><Image alt="Obertech" preview={false} src="img/masterCardLine.png" width={60}/></Radio>  
          </Radio.Group>  
        </div> : null}

        {bankChoose === "Coin" ? 
        <div className={css.BankGroup}> 
          <div className={css.BankTitle}>Do you select a Method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
               
              <Radio disabled={payInInstallmentsValue === 1 ? true : false} className={payInInstallmentsValue === 1 ? css.BankRadioInActive : css.BankRadio} value={"Foreign"}> 
                {payInInstallmentsValue === 1 ? 
                <Tooltip title="Tips" placement="topLeft">
                  <div className={css.PaySuccess}></div>
                </Tooltip> : null}

              {payInInstallmentsValue === 1 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "210px"}}> 
                  <div className={css.CoinFlex1}> 
                    <div><div style={{marginLeft: "5px"}}>Foreign banks</div> <Image alt="Obertech" preview={false} src="img/cardnuud.png" width={100} style={{marginLeft: "5px"}}/></div> 
                    <div>60%</div>
                  </div>
                </div>  
              </Radio> 

              <Radio  disabled={payInInstallmentsValue === 2 ? true : false} className={payInInstallmentsValue === 2 ? css.BankRadioInActive : css.BankRadio} value={"Coin"} style={{width: "100%"}}>
              {payInInstallmentsValue === 2 ? 
                <Tooltip title="Tips">
                  <div className={css.PaySuccess}></div>
                </Tooltip> : null}
              {payInInstallmentsValue === 2 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "210px"}}> 
                  <div className={css.CoinFlex1}> 
                    <div className={css.CoinFlex2}><Image alt="Obertech" preview={false} src="img/coinLogo.png" width={20}/> <div style={{marginLeft: "5px"}}>Coin</div></div> 
                    <div>40%</div>
                  </div>
                </div>
              </Radio> 
          
          </Radio.Group>  
        </div> : null}
        <div className={css.OrderSummary}>Total</div>
        {bankChoose === "Coin" ? <> 
        <div className={css.SubTotal}><div>Usd</div><div className={payInInstallmentsValue === 1 ? css.SubTotalSuccess : null}>  {totalPriceState * 0.6}$</div></div>
        <div className={css.SubTotal}><div>Coin</div><div className={payInInstallmentsValue === 2 ? css.SubTotalSuccess : null}> {totalPriceState * 0.4}$</div></div>
        </>
        : null }

        <div className={css.SubTotal}><div>Subtotal</div> <div> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
        <div className={css.TotalLenght}><div>Total({basketContext.basketState.length})</div> <div className={css.TotalLPrice}> 
                
        {payInInstallmentsValue === 1 ? totalPriceState * 0.4 : payInInstallmentsValue === 2 ? totalPriceState * 0.6 : totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
        <div className={css.ProceedTo}><Button className={css.CheckoutBtn} size="large" onClick={placeOrder}>Place order</Button></div>
      </div>

    {/* <div className={css.HanshRate}> */}
      {/* <div className={css.HanshLayout}> 
        {basketContext.hanshnuud.map((e, i) => (
          <div key={i} className={css.HanshCss}> 
            <div style={{paddingRight: "10px"}}> 
              {e.code_ === "USD" ?  <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}}
                src="/img/united-kingdom.png"/> 
              : e.code_ === "TUG" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px", height: "20px",objectFit: "inherit"}} src="/img/mongolia.png"/> 
              : e.code_ === "COIN" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/HeaderLogo.png"/> : "" } 
          </div>
            <div>{e.paymentName} </div>
            <div style={{paddingLeft: "4px"}}> - {e.rate}{e.code_ === "USD" ? "$" : e.code_ === "TUG" ? "₮" : e.code_ === "COIN" ? "OBOT" : ""}</div>
          </div>
        ))}
      </div> */}
      {/* <div className={css.Section2}>
        <div className={css.RateHdr}>
          <div className={css.RateTitle}>Total price:{totalPriceState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
          </div>
          <div className={css.RateLine}> </div>
        </div>
        <div className={css.RateL}>
          <div className={css.PayLayout}>
            <div> 
              <div>MNT</div>
              <div>100% MNT</div>
            </div>
          </div>

            <div className={css.PayLayout}>
              <div> 
                <div>USD</div>
                <div>100% MNT</div>
              </div>
            </div>
            <div className={css.PayLayout}>
            <div> 
              <div>USD/TOKEN</div>
              <div>60% USD/40% token</div>
            </div>
          </div> 
        </div>
      </div> */}
    {/* </div>  */}
    </div>
    : <div className={css.PayBanks}> 
        <Button onClick={BackFunc} className={css.BackCss}>Back</Button>
        {bankValue === "khan" || bankValue === "golomt" || bankValue === "Tdb" || bankValue === "Monpay"? 
        <div> 
        <Tabs defaultActiveKey="4" items={["a","b", "c"].map((Icon, i) => {  
        
        return {label: i === 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Cart {console.log("key", i)}</div> :
                      i === 1 ? <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>QPay</div> : 
                      i === 2 ? <div  style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Шилжүүлэг</div> : null,
          
          key: i, children: i === 0? 
          <div className={css.PaymentCss}>
            {bankValue === "khan" ? 
            <KhanBank totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState}/> 
            : null}
            {bankValue === "Golomt" ? <div>Golomt </div> : null}
            {bankValue === "Tdb" ? <div>Tdb </div> : null}
            {bankValue === "Monpay" ? <div>Monpay </div> : null}

          </div> 
          : i === 1 ? <div className={css.PaymentCss}>
           
              <div className={css.Qpay}> 
                <div className={css.QpaySize}>
                <Image alt="Obertech" preview={false} src="img/qr.png" width={150}/>
                </div>
                <div className={css.QpayTitle}>Төлөх дүн </div>
                <div className={css.QpayPrice}>{totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
              </div>

          </div> : 
            i === 2 ? <div className={css.PaymentCss}>

              <div className={css.ShiljvvlegCont}> 
                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Дансны дугаар </div>
                  <div className={css.ShilTitle2}> 5220042965</div>
                  <div className={css.Copy}> <Paragraph copyable={{ text: "5220042965",  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph></div>
                </div>
                
                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Хүлээн авагч </div>
                  <div className={css.ShilTitle2}> Obortech XXK</div>
                  <div className={css.Copy}>  <Paragraph copyable={{ text: "Obortech XXK",  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph></div>
                </div>

                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Төлөх дүн </div>
                  <div className={css.ShilTitle2}> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
                  <div className={css.Copy}> 
                    <Paragraph copyable={{ text: totalPriceState,  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph>
                  </div>
                </div>

                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Гүйлгээний утга </div>
                  <div className={css.ShilTitle2}> 5220042965</div>
                  <div className={css.Copy}> <Paragraph copyable={{ text: "5220042965",  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph></div>
                </div> 
              
              </div>

            </div> : null,
        };
        })}/>   
        </div> 
        : null }

        {bankValue === "Coin" ? 
          <div> 
            <Coin totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsCoin={PayInInstallmentsCoin}
             payInInstallmentsValue={payInInstallmentsValue}/>  
          </div>
          : null}

        {bankValue === "Foreign" ? <div>
          <div className={css.ForgeinSideBar}> 
          <div className={css.ForgeinSideContent1}> 
            <Radio.Group onChange={foreignOnChange} style={{width: "100%"}} value={foreignValue}> 
                  <Radio  className={css.BankRadio} value={1}><Image alt="Obertech" preview={false} src="img/paypalLine.png" width={60}/></Radio> 
                  <Radio  className={css.BankRadio} value={2}>
                    <div> Credit or Debit Card</div>
                    <Image alt="Obertech" preview={false} src="img/cardnuud.png" width={130}/></Radio>  
              </Radio.Group>   
            </div>

            {foreignValue === 1 ?
            <div className={css.ForgeinSideContent2}>PayPal</div> 
            : null }

            {foreignValue === 2 ? <div className={css.ForgeinSideContent2}> 
            <div className={css.CreditTitle}>Credit or Debit Card </div>
            <div className={css.PayForm}> 
              <CreditOrDebitCard totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsForeign={PayInInstallmentsForeign} payInInstallmentsValue={payInInstallmentsValue}/> 
            </div>
            
            </div> : null}

          </div>
           </div> : null}
      </div>}

      </div>),
},
{
  title: "Completed",
  content: (
    <div>
    <div className={css.InvoiceBorder} id="content2">
      <div className={css.Header}>
        <div className={css.InvoiceLogo}>
          <Image
            alt="Obertech"
            preview={false}
            style={{
              position: "relative",
              width: "120px",
              height: "100px",
              objectFit: "inherit",
            }}
            src="/img/OBORTECH_logo_H_clean.svg"
          />
        </div>
        <div> Invoice number - 0037038387</div>
      </div>
      <div className={css.InvoiceTable}>
        <div className={css.Contract1}>
          <div className={css.InvoiceDate}>
            {dateState} - Tulburiin nehemjlel
          </div>
          <div className={css.InvoiceLayout}>
            <div> Hereglegch ner: </div>
            <div> 9011826614 BEC</div>
          </div>

          <div className={css.InvoiceLayout}>
            <div>Gereenii dugaar: </div>
            <div> 9011826614</div>
          </div>

          <div className={css.InvoiceLayout}>
            <div>Hamragdah hugatsaa: </div>
            <div>
              {" "}
              {dateState} - {datePlusState}
            </div>
          </div>
        </div>
        <div className={css.Contract2}>
          <div className={css.ContractLayout}>
            <div className={css.PayState}>Төлбөр төлөх сувгууд</div>
            <div className={css.Sector}>
              <div className={css.SectorText}>
                <div className={css.IconCaretRight}>
                  <CaretRightOutlined />
                </div>
                <div>Үйлчилгээний салбар</div>
              </div>
              <div className={css.SectorText}>
                <div className={css.IconCaretRight}>
                  <CaretRightOutlined />
                </div>
                <div> Банкны данс</div>
              </div>
            </div>
          </div>
          <div className={css.ContractLayout}>
            <div className={css.PayState}>Нэмэлт хэрэглээ</div>

            <div>
              {basketContext.basketState.map((e, i) => (
                <div className={css.ItemLayout} key={i}>
                  <div className={css.ContractItemText}>{e.title}</div>
                  <div
                    style={{
                      width: "20%",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Qty: {e.quantity}
                  </div>
                  <div className={css.ContractItemTotalBorder}>
                    {e.price}
                  </div>
                </div>
              ))}
            </div>

            <div className={css.ItemLayout}>
              <div className={css.ContractItemTotalT}>Total Price: </div>
              <div className={css.ContractItemTotalBorder}>4,555,00 </div>
            </div>
          </div>
          <div className={css.ContractLayout}> 
            <div className={css.PayState}> Нэхэмлэх дүн</div>
            <div className={css.ItemLayout}>
              <div className={css.ContractItemText}>
                Татвар тооцоогүй дүн:{" "}
              </div>
              <div className={css.ContractItemTotalBorder}>4,555,00 </div>
            </div>
            <div className={css.ItemLayout}>
              <div className={css.ContractItemText}>Нөат 10%:</div>
              <div className={css.ContractItemTotalBorder}>4,555,00 </div>
            </div>
            <div className={css.ItemLayout}>
              <div className={css.ContractItemText}>
                Нийт төлбөл зохих дүн:{" "}
              </div>
              <div className={css.ContractItemTotalBorder}>4,555,00 </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
  ),
},
];

  return (
    <div>
      <BaseLayout pageName="payment">
        <div style={{ fontSize: "14px", fontWeight: "500" }}>
          {basketContext.basketState.length === 0 || basketContext.orgId === undefined ? (
            <div><Empty description="Basket is empty"></Empty>
            <SuccessOrder totalPriceState={totalPriceState}/>
            </div>
          ) : (
            <div className={css.ContentCss}>
              <Steps current={current}>
                {steps.map((item) => (<Step key={item.title} title={item.title} />))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
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
                {/* {current > 0 && (<Button style={{margin: "0 8px",}}onClick={() => prev()}>Back</Button>)} */}
              </div>
            </div>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};
export default Payment;
