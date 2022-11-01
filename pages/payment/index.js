import {Input,Button,message,Empty,Steps,Modal,Image,InputNumber,Row,Col,Radio,Form,Spin} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import Link from "next/link";
import { WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BasketContext from "../../context/basketContext/BasketContext";
import axios from "axios";
import {CaretRightOutlined,ShoppingCartOutlined,BankOutlined,CaretUpOutlined,CaretDownOutlined} from "@ant-design/icons";
// import jsPDF from "jspdf"; 
import { Tabs } from "antd"; 
import SuccessOrder from "../../components/PaymentCom/SuccessOrder";
const { TabPane } = Tabs;
const { Step } = Steps;
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
  const [orgIdRadio, setOrgIdRadio] = useState("");
  const [formOrgId] = Form.useForm();
  const [checkFalse, setCheckFalse] = useState(false);
  const [itemHdr, setItemHdr] = useState();
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
  setOrgIdRadio(e.target.value);
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
  var sss = 0;
  const steps = [
    {title: "My basket",content: (
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
                                <Button type="default" shape="circle" size="small" onClick={() =>basketContext.basketItemDelete(i,totalPriceFunction)}>X</Button>
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
                  <div className={css.TotalStyle}>
                    <div className={css.OrderCss}> 
                    </div>
                    <div className={css.TotalPayment}>
                      <WalletOutlined className={css.TotalIcon} /> TOTAL PAYMENT: {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
                    </div>
                  </div>
                </div>
                <div className={css.Reminder}>Reminder</div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Payment",
      content: (
        <div style={{ background: "#fff", padding: "15px",fontSize: "15px",}}>
        <div className={css.HanshRate}>
          <div className={css.HanshLayout}>
            {/* <div className={css.RateHdr}>
              <div className={css.RateTitle}> Rate</div>
              <div className={css.RateLine}> </div>
            </div> */}
            {basketContext.hanshnuud.map((e, i) => (
              <div key={i} className={css.HanshCss}>
                {/* <div> {e.code_}</div> */}
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
          </div>
          <div className={css.Section2}>
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
              {/* <div className={css.RateCont}>
                <div className={css.RateLayout}>
                  <span className={css.CoinTitle}>Coin: </span>
                  <InputNumber style={{ width: "150px" }} defaultValue={0}
                    formatter={(value) =>`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")} onChange={CoinFunc}/>
                  <span className={css.RateLayoutTitle}>{coinState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}Coin</span>
                </div>
                <div className={css.RateLayout}>
                  <span className={css.CoinTitle}>USD: </span>
                  <InputNumber allowClear style={{ width: "150px" }}defaultValue={0}
                    formatter={(value) =>`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")} onChange={UsdFunc}/>
                  <span className={css.RateLayoutTitle}>
                    {usdState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
                  </span>
                </div>
                <div className={css.RateLayout}>
                  <span className={css.CoinTitle}>Tugrug: </span>
                  <InputNumber style={{ width: "150px" }} defaultValue={0}
                    formatter={(value) =>`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")} onChange={TugrugFunc}/>
                  <span className={css.RateLayoutTitle}>
                    {tugrugState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}Төгрөг
                  </span>
                </div>
              </div>

              <div className={css.Balance}>Price: <span>$</span>
                {usdStateTarget + coinStateTarget + tugrugStateTarget >
                totalPriceState ? (
                  <span>
                    {(sss = usdStateTarget + coinStateTarget + tugrugStateTarget).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    {message.error("The price is too high!!!")}
                  </span>
                ) : (
                  usdStateTarget + coinStateTarget + tugrugStateTarget
                )}
              </div> */}


            </div>
          </div>
        </div> 
      </div>),
    },
    {
      title: "Invoice",
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
          {basketContext.basketState.length === 0 ? (
            <div><Empty description="Basket is empty"></Empty>
            <SuccessOrder totalPriceState={totalPriceState}/>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <Steps current={current}>
                {steps.map((item) => (<Step key={item.title} title={item.title} />))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
              <div className="steps-action">{current < steps.length - 1 && (<Button type="primary" onClick={() => next()}>Continue</Button>)}
                {current === steps.length - 1 && (
                  <>
                    <Button icon={<ShoppingCartOutlined />} type="primary" onClick={orderOrgId2}>Done</Button>
                    <Modal title="OrgID" open={isModalVisibleOrgId2} onOk={handleOkOrgId2} onCancel={handleCancelOrgId2} > 
                      {/* <Input onChange={(e) => setOrgIdInput2(e.target.value)}placeholder="OrgId"/> */}
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
                {current > 0 && (<Button style={{margin: "0 8px",}}onClick={() => prev()}>Back</Button>)}
              </div>
            </div>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};
export default Payment;
