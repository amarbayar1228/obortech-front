import axios from "axios";
import { Button, DatePicker, Form, Image, Radio, Space, InputNumber, message, Input, Modal, Result, Spin, Empty, Skeleton   } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import css from "./style.module.css"
import moment from 'moment'; 
import WithdrawalRequest from "../MongolianObot/WithdrawalRequest";
import { useRouter } from "next/router"; 
import Qpay from "../Qpay";
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

export const CheckPay  = () =>{
const [showCheckPay, setShowCheckPay] = useState(false);
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
const [getPaymentList, setGetPaymentList] = useState([]);
const [hanshnuud, setHanshnuud] = useState();
const [loadingPage, setLoadingPage] = useState(false);
const [mntPrice, setMntPrice] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);
const [orderId, setOrderId] = useState(0);
const [sourceData, setSourceDate] = useState();
const [orgId, setOrgId] = useState();
const [successOrder, setSuccessOrder] = useState(false);
const [amount, setAmount] = useState(0);
const [golomtBank, setGolomBank] = useState(false);
const router = useRouter();
useEffect(()=>{ 
    setLoadingPage(true);
    
const sourceBody = {
    func: "getSource"
}
axios.post("/api/post/Gate", sourceBody).then((res)=>{
    console.log("get Sourse ==> ", res.data.data);
    setSourceDate(res.data.data);
}).catch((err)=>{console.log("err", err)})
   
    const body = {func: "getRate"};
    const rate  = {
        func: "getUSDrate"
        }
axios.post("/api/post/Gate", body).then((res) => { 
        console.log("OBOT: ", res.data.data);
    const obotRate = res.data.data.map.data.map.obotValueCG
    
    axios.post("/api/post/Gate",rate ).then((res)=>{
        console.log("Rate: ", res.data.data.myArrayList[0].map);
        // setHanshnuud(res.data.data);
        const mntRate = res.data.data.myArrayList[0].map.rate_float;
        setHanshnuud([
            {mnt:{hansh1:  res.data.data.myArrayList[0].map.rate, 
            hansh2: res.data.data.myArrayList[0].map.rate_float}},
            {obot:{hansh: obotRate}}]);

        // getOrderId
        const urlId = window.location.href; 
        // local const orderIdUrl = urlId.split("http://127.0.0.1:3000/payment?orderid=");
        // server const orderIdUrl = urlId.split("http://127.0.0.1:3000/payment?orderid=");
        // const orderIdUrl = urlId.split("https://pay.obortech.io/payment?orderid=");
        console.log("orderID: ", router.query.orderid);
        if(router.query.orderid){ 
            const body  = {
                func: "getPayment",
                orderID:  router.query.orderid,
            }
        axios.post("/api/post/Gate", body).then((res)=>{ 
            console.log("getPayment: ", res.data.data);
            const getData = res.data.data; 
            const done = 0;
            
            setLoadingPage(false);
            // source 111 buyu golomtbank bhin bol shalgna
            // if(getData[0].source === "111"){
                const check =  golomtTransactionCheck(router.query.orderid);
                console.log("check: ", check);
            // }
            // 1 tei tentsvv ved
            if(res.data.data.length === 1){ 
                console.log("urt 1: ");
                if(res.data.data[0].status === 0){
                    console.log("status: ", 0);
                    setShowCheckPay(false);
                } else {
                    console.log("tentsehq");
                    const doneTwo = 0;
                    getData.forEach(element => {
                        // doorh true Successfully order iin datanuudiig haruulna[price, orgID, amount. status]
                        setSuccesPay(element);
                        doneTwo += element.amount
                    }); 
                    // total price ih buyu tentsvv ved gants tulsun bank - busad ved 2r tulultiin ali neg n dutuu
                    if(getData[0].totalprice  <= doneTwo){  
                        console.log("doneTwo: ", getData[0].totalprice);
                        // doorh true Successfully show hiine
                        setSuccessOrder(true) 
                    }else {
                        res.data.data.forEach(element => { 
                            setGetPaymentList(element);
                            setAmount(element.totalprice - element.amount);
                            // OBOT
                            if(element.method === 1){
                                console.log("MNT rate: ",  mntRate);
                                // Mongol bank vniin dvn
                                console.log("total price: ", element.totalprice);
                                setOrgId(element.orgID);
                                setTotalPrice(element.totalprice);
                                console.log("Amount: ", element.amount);
                                let totalSum = element.totalprice - element.amount;
                                let totalPriceMn = totalSum * mntRate;
                                console.log("totalPri: ", totalSum);
                                setOrderId(element.orderID)
                                setMntPrice([{ usd: totalSum, mnt: totalPriceMn.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}]);

                                setShowCheckPay(true);
                                setPayNum(2)
                                setBankValue(1)
                                //Mongol bank
                            }else if(element.method === 3){ 
                                console.log("OBOT rate: ", obotRate);
                                let totalSum = element.totalprice - element.amount+0.001;
                                console.log("obot price dollar: ", totalSum + "$");
                                const totalObotHuwi = 0;
                                if(totalSum >= 1){ 
                                  totalObotHuwi = 1;
                                }else if(totalSum <= 0.9){
                                    const str = totalSum.toString();
                                    const str2 = str.slice(2,3);  
                                    if(parseInt(str2) >= 1){
                                    // console.log("100 vrj");
                                      totalObotHuwi = 100;
                                    }else {
                                      //console.log("1000vrj");
                                      totalObotHuwi = 1000;
                                    } 
                                }
                                console.log("vrjih huwi: ",totalObotHuwi );
                                const ObotPrice = totalSum * obotRate/ totalObotHuwi;
                                console.log("obotPrice: ", ObotPrice);

                                setOrgId(element.orgID);
                                setTotalPrice(element.totalprice);
                                setOrderId(element.orderID)
                                setMntPrice([{ usd: ObotPrice.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,"), mnt: 123}]);
                                
                                setShowCheckPay(true);
                                setPayNum(1);
                                setBankValue(2)


                            }  
                        });
                    } 
                }
            // 2oos deesh ved 2r tulult 
            }else if(res.data.data.length >= 2){
                console.log("urt 2: ");
                const status = false;
                getData.forEach(element => {
                    setSuccesPay(element);
                    element.status === 0 ? status = true : null
                    //setSuccessOrder(true) 
                    done += element.amount
                }); 
                if(status){
                    console.log("done", done);
                    console.log("object, ", res.data.data[1]);
               
                        setGetPaymentList(res.data.data[0]);
                        setAmount(res.data.data[0].totalprice - res.data.data[0].amount);
                        // OBOT
                        if(res.data.data[1].method === 1){
                            console.log("OBOT rate: ", obotRate);
                            let totalSum = res.data.data[0].totalprice - res.data.data[0].amount+0.001;
                            console.log("obot price dollar: ", totalSum + "$");
                            const totalObotHuwi = 0;
                            if(totalSum >= 1){ 
                              totalObotHuwi = 1;
                            }else if(totalSum <= 0.9){
                                const str = totalSum.toString();
                                const str2 = str.slice(2,3);  
                                if(parseInt(str2) >= 1){
                                // console.log("100 vrj");
                                  totalObotHuwi = 100;
                                }else {
                                  //console.log("1000vrj");
                                  totalObotHuwi = 1000;
                                } 
                            }
                            console.log("vrjih huwi: ",totalObotHuwi );
                            const ObotPrice = totalSum * obotRate/ totalObotHuwi;
                            console.log("obotPrice: ", ObotPrice);

                            setOrgId(res.data.data[1].orgID);
                            setTotalPrice(res.data.data[1].totalprice);
                            setOrderId(res.data.data[1].orderID)
                            setMntPrice([{ usd: ObotPrice.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,"), mnt: 123}]);

                            setShowCheckPay(true);
                            setPayNum(1)
                            setBankValue(2)
                            //Mongol bank
                        }else if(res.data.data[1].method === 3){  

                            console.log("MNT rate: ",  mntRate);
                            // Mongol bank vniin dvn
                            console.log("total price: ", res.data.data[1].totalprice);
                            setOrgId(res.data.data[1].orgID);
                            setTotalPrice(res.data.data[1].totalprice);
                            console.log("Amount: ", res.data.data[1].amount);
                            let totalSum = res.data.data[1].totalprice - res.data.data[1].amount;
                            let totalPriceMn = totalSum * mntRate;
                            console.log("totalPri: ", totalSum);
                            setOrderId(res.data.data[1].orderID)
                            setMntPrice([{ usd: totalSum, mnt: totalPriceMn.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}]);


                            setShowCheckPay(true);
                            setPayNum(2);
                            setBankValue(1)


                        }  
                   
                    // if(getData[0].totalprice  <= done){
                    //     console.log("tentsvv");
                    //     setSuccessOrder(true) 
                    // }else {
                    //     message.error("vne dutuu")
                    // }
                }else {
                    console.log("status: 1");
                    setSuccessOrder(true) 
                }
               
            } else {
                console.log("urt 3: ");
                setShowCheckPay(false)
            }
           
            
            
        }).catch((err)=>{
            console.log("err:", err);
        })
          
        }else{ 
            console.log("undef, ", router.query.orderid);
            setShowCheckPay(false);
        }

    }).catch((err)=>{
        console.log("err",err);
    })
        
}).catch((err) => {
    console.log("err: ", err);
});

},[])
const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setBankValue(e.target.value);
};
const onFinished = (values) =>{ 
    console.log("onFinished value: ", values);
// localStorage.setItem("orderid", props.newOrderId);
// localStorage.setItem("orderIdIndex", 0);
// payNum === 1 || payNum === 2 ? sendAxios("mongolPay") : sendAxios("mongol") 
// props.mnBack("isOk"); 
// if(payNum === 1 || payNum === 2 ){
//     message.success("Success"); 
// } 
// if(payNum === 2){
//   console.log("2");
// }else{
//     setPayNum(1);
//     setBankValue(2); 
// }
    

} 
const onFinishFailed = () =>{
    console.log("error");
}

const newObotSend = () =>{
  console.log("orderId: ", orderId);   
  console.log("Total Price: ", totalPrice);
  console.log("orgID: ", orgId);
  console.log("OBOT price: ", mntPrice[0].usd + "OBOT");
  console.log("amount $: ", amount); 
  setObotLoad(true);
    const payOrders = [];
    if(localStorage.getItem("pkId")){
        payOrders ={
            func: "payOrders",
            orgID: orgId,
            orderID: orderId, 
            amount: amount,
            totalPrice: totalPrice,
            method: 1, //OBOT
            paymentMethod: 8,  
            coin: mntPrice[0].usd, 
            description: getPaymentList.description, 
            sourceDesc: sourceData[7].nameeng,
            source: sourceData[7].index_, 
            userPkId: localStorage.getItem("pkId"),
        }
    }else {
        payOrders ={
            func: "payOrders",
            orgID: orgId,
            orderID: orderId, 
            amount: amount,
            totalPrice: totalPrice,
            method: 1, //COIN
            paymentMethod: 8, // OBOT  
            coin: mntPrice[0].usd, 
            description: getPaymentList.description,
            sourceDesc: sourceData[7].nameeng,
            source: sourceData[7].index_, 
        }
    } 
    console.log("payOrders: ", payOrders);
    axios.post("/api/post/Gate", payOrders).then((res)=>{
        console.log("res: ", res.data);
        if(res.data.data === "success"){ 
            setTimeout(()=>{
                // localStorage.removeItem("basket");
                setObotLoad(false);
                router.push("http://3.144.78.34:3000/dashboard?orderId=" + orderId );
            },800)
            
        } else {
            message.error("Error");
        } 
    }).catch((err)=>{
        console.log("err");
    })
}

//HMAC golomt checksum encryptleh function
const hmac256 = (message) => {
    var crypto = require("crypto"); 
    const msgEncypt = message + message;
    let hash = crypto.createHmac("sha256", 'g2Q)COW6k5MpF4$u').update(msgEncypt);
    return hash.digest("hex");
}  
const golomtTransactionCheck = (orderid) =>{
    const encrypt = hmac256(orderid);
    const body = {
        checksum: encrypt,
        transactionId: orderid
    } 
    console.log("body: ", body);

    axios.post("/api/golomt/post/inquiry", body).then((res)=>{ 
        if(res.data.message){
            // ogt vvseeq nehemjlel bn
            setGolomBank(false);
            return false;
        }else{
            // vvssen nehemjlel
            setGolomBank(res.data);
            return true;
        }
      }).catch((err)=>{
        console.log("err: ", err);
      })

    return false;
}
return<div> 
{loadingPage ?
<Skeleton active />
: 
<> 
{showCheckPay ?
<div className={css.Flex}>
<div className={css.Cont1}>
{/* {console.log("data: ", getPaymentList)} 
{console.log("data: ", hanshnuud)}  */}
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
        <div className={css.Huwi} style={{top: "25px"}}>
            {/* {props.defaultMaxFi.USD} */}
             </div>
    </Radio>
    <Radio  className={payNum === 2 ? css.BankRadio2 : css.BankRadio} value={2} disabled={payNum === 2 ? true : false}>
        <div style={{display: "flex", alignItems: "center", marginLeft: "5px"}}> <Image alt="Obertech" preview={false} src="/img/HeaderLogo.png" width={20}  />
        <div style={{marginLeft: "5px", color: "#4d5057"}}>Obot</div></div> 
        <div className={css.Huwi}>
            
            {/* {props.defaultMaxFi.Coin} */}
             </div>
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

    <div style={{fontWeight: "600"}}>{getPaymentList.method === 1 ? "OBOT" : "Mongolian banks"}</div>
    <div style={{border: "1px solid green", padding: "5px 5px", borderRadius: "5px"}}> 
        <div>Date: {getPaymentList.date_} </div>
        <div>Organzation ID: {getPaymentList.orgID}</div>
        <div>Method: {getPaymentList.paymentMethod === 5 ? sourceData[4].nameeng : "OBOT"}</div>
       
        <div>Price: {getPaymentList.amount}$</div>
        <div>Status: {getPaymentList.status === 0 ? <span style={{color: "red"}}>Unsuccessful</span> :  <span style={{color: "Green"}}>Success</span>}</div>
    </div>

    <div style={{fontWeight: "600", marginTop: "5px"}}>{getPaymentList.method === 1 ? "Mongolian banks" : "OBOT"}</div>
    <div style={{border: "1px solid #ccc", padding: "5px 5px", borderRadius: "5px", marginTop: "5px"}}> 
        <div>Status: <span style={{color: "red"}}>Unsuccessful</span></div>
        <div>Amount to be paid: {amount.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$ </div>
     
    </div>
        
    <div style={{border: "1px solid #ccc", padding: "5px 5px", borderRadius: "5px", marginTop: "5px"}}>  
        <div>Total Price: {getPaymentList.totalprice}$</div>
    </div>
        
        
    </div>
    
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
            <div className={css.Price}> <div>Total Payment</div> <div> 
                MNT Price: ***** ₮
                {/* {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮ */}
                </div></div>
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
        <div className={css.Price}> <div>Total Payment</div> <div>
                MNT Price: ***** ₮
               
                {/* {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮ */}
             
             </div></div>
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
        <div className={css.Price}> <div>Total Payment</div> <div> 
            
        MNT Price: ***** ₮ 
                {/* {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮ */}
        </div></div>
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
        <div className={css.Price}> <div>Total Payment</div> <div> 
        MNT Price: ***** ₮
                {/* {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮ */}
          </div></div>
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
        <div className={css.Price}> <div>Total Payment</div> <div> 
        MNT Price: ***** ₮
                {/* {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮ */}

         </div></div>
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
  
        <Qpay mongolObot={"mongolObotCheck"} userInfo={getPaymentList.description} mntUsdPrice={mntPrice} orderId={orderId} totalPrice={totalPrice} sourceData={sourceData} orgId={orgId}/>
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
                <div style={{color: "#4d5057", fontSize: "16px", fontWeight: "600", marginBottom: "5px"}}>Total price:  
                {/* {props.mntUsdPrice[0].obot.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,")} */}
                {mntPrice[0].usd} OBOT </div>
                <Button style={{width: "100%"}} type="primary" size="large"
                //  onClick={obotFunc}
                onClick={newObotSend}
                loading={obotLoad}
                disabled={obotLoad}
                 >Pay now</Button> 
            </div>
            {payNum === 1 ? <div style={{marginTop: "30px"}}>
                 <WithdrawalRequest />
            </div> :  null
            }
        </div>
    </div> 
</div>}

</div>
:  successOrder ? <div>
     <Result
    status="success"
    title="Successfully!"
    subTitle={"Order number: " + successPay.orderID}
    extra={[
      <Button type="primary" key="console" onClick={()=>router.push("/")}>
        Go Home 
      </Button> 
    ]}
  />
</div> : golomtBank ? <div>
    vne: {golomtBank.amount}₮
    orderID: {golomtBank.transactionId}
    aldaa: {golomtBank.errorDesc ? golomtBank.errorDesc : "aldaa bhq"}
</div> : 

<Empty /> 


}
</>
}
    </div>
}
