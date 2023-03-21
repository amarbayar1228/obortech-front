import { Button, DatePicker, Form, Image, Radio, Space, InputNumber, message, Input, Modal, Result, Spin   } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import css from "./style.module.css"
import moment from 'moment';
import axios from "axios";
import WithdrawalRequest from "./WithdrawalRequest";
import Qpay from "../Qpay";
import { Router, useRouter } from "next/router"; 
const monthFormat = 'YYYY/MM';
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

const MongolianObot = (props) =>{
const [bankValue, setBankValue] = useState(1);
const [pMethod, setPmethod] = useState(0);
const [payNum, setPayNum] = useState(0);
const basketContext = useContext(BasketContext); 
const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
const [item, setItem] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [successPay, setSuccesPay] = useState([]);
const [payOrderId, setPayOrderId] = useState(0);
const [obotLoad, setObotLoad] = useState(false);
const [totalPrice, setTotalPrice] = useState();
const router = useRouter();
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};
useEffect(()=>{
    window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches( e.matches ));
    console.log("Mongol Obot props ===> ", props);
    
    setItem(props.item);
},[props])

const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setBankValue(e.target.value);
};


const sendAxios = (a) =>{ 
   
const body = [];
const arr = item;
const axiosOrderId = [];
// img tei bol Item, imggui bol Group 
// arr.forEach((element, i) => {
// if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
// }); 
// if (localStorage.getItem("pkId")) {   
// body = {
//     func: "neworder",
//     item: arr,
//     orgId: basketContext.orgNames[0].orgIdstate,
//     totalPrice: props.price, 
//     pkId: localStorage.getItem("pkId"), 
// }; 
// } else { 
// body = {
//     func: "neworder",
//     orgId: basketContext.orgNames[0].orgIdstate,
//     totalPrice: props.price,
//     item: arr, 
// }; 
// } 

// const isOk2 = false;
if(payOrderId === 0){ 
// item insert
// axios.post("/api/post/Gate", body).then((result) => {
//     console.log("res orderId: ", result.data.orderid); 
//    isOk2 = true;
    axiosOrderId = props.newOrderId; 
    setPayOrderId(props.newOrderId);
// },(error) => {console.log(error)});

}



setTimeout(()=>{ 
console.log("payOrderState: ", payOrderId);
console.log("axiosOrderID: ", axiosOrderId);
    const payOrders = [];
    if(localStorage.getItem("pkId")){
        payOrders ={
            func: "payOrders",
            orgID: props.orgIdRadio,
            orderID: payOrderId === 0 ? axiosOrderId : payOrderId, 
            amount: a === "mongol" || a === "mongolPay" ? props.mntUsdPrice[0].mnt : props.mntUsdPrice[0].obot,
            totalPrice: props.price,
            method: a === "mongol" || a === "mongolPay" ? 3 : 1, //khanBank
            paymentMethod: a === "mongol" || a === "mongolPay" ? 1 : 8,  
            coin: a === "mongol" || a === "mongolPay" ? 0 : props.mntUsdPrice[0].obot, 
            description: props.userInfo.description, 
            sourceDesc: a === "mongol" || a === "mongolPay" ? props.sourceData[0].nameeng  :  props.sourceData[7].nameeng,
            source: a === "mongol" || a === "mongolPay" ? props.sourceData[0].index_ : props.sourceData[7].index_, 
            userPkId: localStorage.getItem("pkId"),
        }
    }else {
        payOrders ={
            func: "payOrders",
            orgID: props.orgIdRadio,
            orderID: payOrderId === 0 ? axiosOrderId : payOrderId, 
            amount: a === "mongol" || a === "mongolPay" ? props.mntUsdPrice[0].mnt : props.mntUsdPrice[0].obot,
            totalPrice: props.price,
            method: a === "mongol" || a === "mongolPay" ? 3 : 1, //khanBank
            paymentMethod:a === "mongol" || a === "mongolPay" ? 1 : 8,  
            coin: a === "mongol" || a === "mongolPay" ? 0 : props.mntUsdPrice[0].obot, 
            description: props.userInfo.description, 
            sourceDesc: a === "mongol" || a === "mongolPay" ? props.sourceData[0].nameeng  :  props.sourceData[7].nameeng,
            source: a === "mongol" || a === "mongolPay" ? props.sourceData[0].index_ : props.sourceData[7].index_, 
        }
    } 
    //tulbur tuluh instert
    axios.post("/api/post/Gate", payOrders).then((res)=>{
    console.log("payOrders", res.data);  
    const getPayment = {
        func: "getPayment",
        orderID: payOrderId === 0 ? axiosOrderId : payOrderId,
    }
    // amjilttai tulult hariu
    axios.post("/api/post/Gate", getPayment).then((res)=>{
    console.log("payGet: ", res.data);
    setSuccesPay(res.data.data[0]);
    setIsModalOpen(true)
    if(a === "mongolPay" || a === "obotPay"){
        props.sucessOrder();  
        basketContext.removeBasketStorage(); 
    }
        const bodySmart = {
            func: "orderSend",
            orderid: payOrderId === 0 ? axiosOrderId : payOrderId,
            description: props.userInfo.description,
        }
        axios.post("/api/post/Gate", bodySmart).then((res)=>{
            console.log("SMH: ", res.data);
        }).catch((err)=>{
            console.log("object", err);
        });
    
    })
    
    }).catch((err)=>{
    console.log("err". err);
    })
},800)

}


const onFinished = (values) =>{ 
localStorage.setItem("orderid", props.newOrderId);
localStorage.setItem("orderIdIndex", 0);
payNum === 1 || payNum === 2 ? sendAxios("mongolPay") : sendAxios("mongol") 
props.mnBack("isOk"); 
if(payNum === 1 || payNum === 2 ){
    message.success("Success"); 
} 
if(payNum === 2){
  console.log("2");
}else{
    setPayNum(1);
    setBankValue(2); 
}
    

}

const onFinishFailed = () =>{
    console.log("error");
}
const obotFunc = () =>{   
localStorage.setItem("orderid", props.newOrderId);
localStorage.setItem("orderIdIndex", 0);

payNum === 1 || payNum === 2 ? sendAxios("obotPay") : sendAxios("obot")
    if(payNum === 1){
        console.log("1");
    }else{
        setPayNum(2);
        setBankValue(1); 
    }
   
 
}

const newObotSend = () =>{
  console.log("props: ", props);
  const amountCounUsd = props.price * props.defaultMaxFi.Coin / 100;
  console.log("coinii 20huwiin huwid Dollar n: ", amountCounUsd);
  console.log("coin: ", props.mntUsdPrice[0].obot + "OBOT");
  setObotLoad(true);
    const payOrders = [];
    if(localStorage.getItem("pkId")){
        payOrders ={
            func: "payOrders",
            orgID: props.orgIdRadio,
            orderID: props.newOrderId, 
            amount: amountCounUsd,
            totalPrice: props.price,
            method: 1, //khanBank
            paymentMethod: 8,  
            coin: props.mntUsdPrice[0].obot, 
            description: props.userInfo.description, 
            sourceDesc: props.sourceData[7].nameeng,
            source: props.sourceData[7].index_, 
            userPkId: localStorage.getItem("pkId"),
        }
    }else {
        payOrders ={
            func: "payOrders",
            orgID: props.orgIdRadio,
            orderID: props.newOrderId, 
            amount: amountCounUsd,
            totalPrice: props.price,
            method:  1, //khanBank
            paymentMethod: 8,  
            coin:  props.mntUsdPrice[0].obot, 
            description: props.userInfo.description, 
            sourceDesc: props.sourceData[7].nameeng,
            source: props.sourceData[7].index_, 
        }
    } 
    console.log("asdf: ", payOrders);
    axios.post("/api/post/Gate", payOrders).then((res)=>{
        console.log("res: ", res.data);
        if(res.data.data === "success"){
            
            
            setTimeout(()=>{
                localStorage.removeItem("basket");
                setObotLoad(false);
                router.push("http://3.144.78.34:3000/dashboard?orderId=" + props.newOrderId );
            },800)
            
        } else {
            message.error("Error");
        }
        
        
        
    }).catch((err)=>{
        console.log("err");
    })
}
return <div className={css.Flex}>
<div className={css.Cont1}>
<Radio.Group onChange={onChange} value={bankValue} >
    <Radio  className={payNum === 1 ? css.BankRadio2 : css.BankRadio} value={1} disabled={payNum === 1 ? true : false}> 
    <div style={{marginLeft: "5px", marginTop: "9px", color: "#4d5057"}}>Mongolian banks</div> 
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
        <div className={css.Huwi} style={{top: "25px"}}>{props.defaultMaxFi.USD}%</div>
    </Radio>
    <Radio  className={payNum === 2 ? css.BankRadio2 : css.BankRadio} value={2} disabled={payNum === 2 ? true : false}>
        <div style={{display: "flex", alignItems: "center", marginLeft: "5px"}}> <Image alt="Obertech" preview={false} src="/img/HeaderLogo.png" width={20}  />
        <div style={{marginLeft: "5px", color: "#4d5057"}}>Obot</div></div> 
        <div className={css.Huwi}>{props.defaultMaxFi.Coin}%</div>
    </Radio> 
</Radio.Group>

<div className={css.ValitCss}>
    {/* <div style={{textAlign: "center", padding: "5px", fontWeight: "600", color: "#4d5057"}}>Valid</div>
    <div>
        <div style={{display: "flex", borderBottom: "1px solid #ccc", justifyContent: "space-between", padding: "5px", fontWeight: "600", color: "#4d5057"}}>
            <div>MNT</div>
            <div>2335$</div>
        </div>
        <div style={{display: "flex", borderBottom: "1px solid #ccc", justifyContent: "space-between", padding: "5px", fontWeight: "600", color: "#4d5057"}}>
            <div>Obot</div>
            <div>2335obot</div>
        </div>
    </div> */}
    <div className={css.Basket}> 
        <div>Cart</div>
        <div style={{display: "flex", textAlign: "left", fontWeight: "600", color: "#4d5057"}}>
            <div style={{width: "50px"}}>Image</div>
            <div style={{width: "100px"}}>Item name</div>
            <div style={{width: "40px"}}>Cnt</div>
            <div style={{width: "53px"}}>Price</div>
        </div>
        {item === null ? ""
        :  <>
            {item.map((e, i)=>(
                <div style={{display: "flex", borderBottom: "1px solid #ccc", textAlign: "left", color: "#4d5057", padding: "5px"}} key={i}>
                <div style={{width: "50px"}}>
                     {e.img ? 
                    <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img} width={25}/>
                    : <div className={css.Group}> G </div>}
                </div> 
                <div className={css.ItemTitle}>{e.title}</div>
                <div style={{width: "40px" }}>{e.cnt}</div>
                <div style={{width: "53px" }}>{e.price}$</div>
                </div>
            ))}
            <div style={{marginTop: "7px", textAlign: "left", fontWeight: "600"}}>Price: {props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
        </>
        }
        
        
    </div>
    <Modal title="Success pay" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
        {successPay ?
        <div> 
            <Result status="success" title="Successfully Purchased Items!"
                subTitle={"Order number: " + successPay.orderID + "."}/>
            <div className={css.successPayCss}>
                <div className={css.Sp1}>Date: </div>
                <div>{successPay.date_}</div>
            </div>
            <div  className={css.successPayCss}>
                <div className={css.Sp1}>Order ID: </div>
                <div> {successPay.orderID}</div>
            </div>
            <div className={css.successPayCss}>
                <div className={css.Sp1}>Organzation ID: </div>
                <div>{successPay.orgID}</div>
            </div>
            <div className={css.successPayCss}>
                <div className={css.Sp1}>source: </div>
                <div> {successPay.source}</div>
            </div>
          
            <div className={css.successPayCss}>
                <div className={css.Sp1}>Total price: </div>
                <div>{successPay.totalprice}$</div>
            </div>
            <div className={css.successPayCss}>
                <div className={css.Sp1}>Amount: </div>
                <div>{successPay.amount}{successPay.method === 3 ? "₮" : successPay.method === 1 ? "OBOT" : "$"} </div>
            </div> 
            <div className={css.successPayCss}>
                <div className={css.Sp1}>status: </div>
                <div>{successPay.status} Success</div>
            </div>
        </div>
            : null}
      </Modal>
</div>
</div>
{bankValue === 1 ?
<div className={css.Cont2}> 
  
    <div className={css.Content}> 
    {pMethod === 0 ?
    <> 
        <div style={{textAlign: "left", fontWeight: "600", fontSize: "18px", color: "#4d5057"}}>Select your payment method?</div>
        <div style={{display: "flex", marginTop: "10px"}}> 
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(1)}> 
                    <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={30}/> 
                    <div>Khan bank</div>
                </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(2)}>
                    <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={30}/> 
                    <div>Golomt bank</div>
                 </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(3)}>
                    <Image alt="Obertech" preview={false} src="/img/borderHas.png" width={30}/> 
                    <div>Xac bank</div>
                 </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(4)}>
                    <Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={30}/> 
                    <div>Trade and</div>
                    <div>Development Bank</div>
                 </Button> 
            </div> 
        </div>
        <div style={{display: "flex", marginTop: "10px"}}> 
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(5)}> 
                    <Image alt="Obertech" preview={false} src="/img/monpay-brand-logo.png" width={30}/> 
                    <div>Monpay</div>
                </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(6)}>
                    <Image alt="Obertech" preview={false} src="/img/qpay.png" width={60}/> 
                    {/* <div>Qpay</div> */}
                 </Button> 
              
            </div>
           
        </div>
    </> : null }

    {pMethod === 1 ?
    <div> 
        <div className={css.Paypal}> 
            <Button onClick={()=>setPmethod(0)}>Back</Button>
            <div> </div>
        </div> 
        <div style={{display:"flex", justifyContent: "center"}}> 
        <div style={{ width: "430px"}}>
        <Image alt="Obertech" preview={false} src="/img/khanbankH.png" width={180} style={{marginBottom: "10px"}}/>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
            onFinish={onFinished} onFinishFailed={onFinishFailed}>
            <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
                <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
                  {/* {matches && (<h1>Big Screen</h1>)}
                                {!matches && (<h3>Small Screen</h3>)} */}
            </Form.Item>
            <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
            <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
            </Form.Item>  
            <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
                <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
            </Form.Item>  
            <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮</div></div>
            <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
        </Form>
        {payNum === 2 ? <div style={{marginTop: "30px"}}><Button>Submit a withdrawal request</Button> </div> : null}
        </div>
        </div>
    </div>
    : pMethod === 2 ? 
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/golomt.png" width={180} style={{marginBottom: "10px"}}/>
    <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
        onFinish={onFinished} onFinishFailed={onFinishFailed}>
        <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
            <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
              {/* {matches && (<h1>Big Screen</h1>)}
                            {!matches && (<h3>Small Screen</h3>)} */}
        </Form.Item>
        <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
        <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
        </Form.Item>  
        <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
            <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
        </Form.Item>  
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 3 ?
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/xacbank.png" width={180} style={{marginBottom: "10px"}}/>
    <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
        onFinish={onFinished} onFinishFailed={onFinishFailed}>
        <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
            <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
              {/* {matches && (<h1>Big Screen</h1>)}
                            {!matches && (<h3>Small Screen</h3>)} */}
        </Form.Item>
        <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
        <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
        </Form.Item>  
        <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
            <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
        </Form.Item>  
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 4 ?
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/tdbline.png" width={180} style={{marginBottom: "10px"}}/>
    <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
        onFinish={onFinished} onFinishFailed={onFinishFailed}>
        <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
            <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
              {/* {matches && (<h1>Big Screen</h1>)}
                            {!matches && (<h3>Small Screen</h3>)} */}
        </Form.Item>
        <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
        <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
        </Form.Item>  
        <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
            <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
        </Form.Item>  
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 5 ?
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/monpay.png" width={210} style={{marginBottom: "20px"}}/>
    <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
        onFinish={onFinished} onFinishFailed={onFinishFailed}>
        <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
            <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
              {/* {matches && (<h1>Big Screen</h1>)}
                            {!matches && (<h3>Small Screen</h3>)} */}
        </Form.Item>
        <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
        <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
        </Form.Item>  
        <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
            <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
        </Form.Item>  
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 6 ?     
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
        <Qpay mongolObot={"mongolObot"} userInfo={props.userInfo} mntUsdPrice={props.mntUsdPrice} orderId={props.newOrderId} totalPrice={props.price}/>
    </div>
    </div>
    : ""          
}
    </div> 
</div>
// OBOT pay now
: <div className={css.Cont2}> 
 
    <div className={css.Content2}>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{marginBottom: "10px"}}><Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg" width={160}/></div>
                {/* <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{color: "#4d5057", fontSize: "16px", fontWeight: "600"}}>Obortech address2:  </div>
                    <div><Input  maxLength={16} size="middle" placeholder={"Your current Obortech address is"} style={{marginLeft: "9px",width: "300px"}}/></div>
                </div> */}
            <div style={{width: "73%", marginTop: "20px"}}>
                <div style={{color: "#4d5057", fontSize: "16px", fontWeight: "600", marginBottom: "5px"}}>Total price: {props.mntUsdPrice[0].obot.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,")} Obot</div>
                <Button style={{width: "100%"}} type="primary"
                //  onClick={obotFunc}
                onClick={newObotSend}
                loading={obotLoad}
                disabled={obotLoad}
                 >Pay now</Button> 
            </div>
            {payNum === 1 ? <div style={{marginTop: "30px"}}>
                 <WithdrawalRequest />
            </div> : null}
        </div>
    </div> 
</div>}

</div>
}
export default MongolianObot;