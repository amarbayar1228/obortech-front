import { Alert, Button, Image, Modal, notification, Spin } from "antd";
import axios from "axios";
import css from "./style.module.css"
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
const { confirm } = Modal;
const Qpay = (props) =>{
    const [imgQr, setImgQr] = useState();
    const [objectId, setObjectId] = useState();
    const basketContext = useContext(BasketContext); 
    const [item, setItem] = useState(null);
    const [toogle, setToogle] = useState(false);
    const [itemOrderId, setItemOrderId] = useState();
    const [loadingQR, setLoadingQR] = useState(false);
    const [checkToken, setCheckToken] = useState("");
useEffect(()=>{
  console.log("Qpay props: ", props);
  setItem(props.item)
},[props])
const checkPay = () =>{
    confirm({
        title: 'Do you want to make a qpay payment?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() { 
            setToogle(true);
            setLoadingQR(true)
            const body = [];
            const arr = item;
            // img tei bol Item, imggui bol Group 
            arr.forEach((element, i) => {
            if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
            }); 
            if (localStorage.getItem("pkId")) {   
            body = {
                func: "neworder",
                item: arr,
                orgId: basketContext.orgNames[0].orgIdstate,
                totalPrice: props.price, 
                pkId: localStorage.getItem("pkId"), 
            }; 
            } else { 
            body = {
                func: "neworder",
                orgId: basketContext.orgNames[0].orgIdstate,
                totalPrice: props.price,
                item: arr, 
            }; 
            } 
                axios.post("/api/post/Gate", body).then((result) => {
                    console.log("items orderId: ", result.data.orderid); 
                        setItemOrderId(result.data.orderid)
                        qpayPay(result.data.orderid);

                },(error) => {console.log(error)});

        },
        onCancel() {
          console.log('Cancel');
        },
      }); 

}
const qpayPay = (orderid) =>{
    console.log("a: ", orderid);

    // Qpay tulult
    const body = {
        login: "login"
    }
    axios.post("/api/qpay/post/token", body).then((res)=>{
    console.log("login Token: ", res.data);
    setCheckToken(res.data.access_token);
    const headers = { 
        'Authorization': "Bearer " + res.data.access_token,
    };  
        const invo ={ 
            invoice_code: "SMARTHUB_ECOSYS_INVOICE",
            sender_invoice_no: "1234567",
            invoice_receiver_code: orderid,
            invoice_description: props.userInfo.description,
            sender_branch_code:"SALBAR1",
            amount: props.mntUsdPrice[0].mnt,
            callback_url:"https://pay.obortech.io/payment"
        }
        axios.post("/api/qpay/invoicePost/invoice", invo, {headers: headers}).then((res)=>{ 
            console.log("invoice: ", res.data);
          
            setObjectId(res.data.invoice_id);
            setImgQr(res.data.qr_image)
            setLoadingQR(false);
        }).catch((err)=>{
            console.log("err", err);
        }) 
    }).catch((err)=>{
    console.log("err", err);
    });
}


 const payCheckFunc = () =>{
    console.log("objectId: ", objectId);
    
    const headers = { 
        'Authorization': "Bearer " + checkToken,
    };  
    const body = {
        object_type: "INVOICE",
        object_id: objectId,
        offset: {
            page_number: 1,
            page_limit: 100
        }
    }
    axios.post("/api/qpay/check/check", body, {headers: headers}).then((res)=>{
        console.log("res: ", res.data);
        
        if(res.data.count === 0){
            notification["error"]({
                message: 'The bill has not yet been paid',
                description:
                  'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
              }); 
        }else {
            notification["success"]({
                message: 'Payment has been made successfully',
                description:
                  'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
              }); 
              backSuccessOrder();
        }

    })
 }
 const backSuccessOrder = () =>{
    const payOrders = [];
    if(localStorage.getItem("pkId")){
        payOrders ={
            func: "payOrders",
            orgID: props.orgIdRadio,
            orderID: itemOrderId, 
            amount: props.mntUsdPrice[0].mnt,
            totalPrice: props.price,
            method:  3, // MNT
            paymentMethod: 5,  // Qpay
            coin: 0, 
            description: props.userInfo.description, 
            sourceDesc: props.sourceData[4].nameeng,
            source: props.sourceData[4].index_, 
            userPkId: localStorage.getItem("pkId"),
        }
    }else {
        payOrders ={
            func: "payOrders",
            orgID: props.orgIdRadio,
            orderID: itemOrderId, 
            amount: props.mntUsdPrice[0].mnt,
            totalPrice: props.price,
            method:  3, // MNT
            paymentMethod: 5,  // Qpay
            coin: 0, 
            description: props.userInfo.description, 
            sourceDesc: props.sourceData[4].nameeng,
            source: props.sourceData[4].index_,  
        }
    } 
    //tulbur tuluh instert
    axios.post("/api/post/Gate", payOrders).then((res)=>{
    console.log("payOrders", res.data);  
    const getPayment = {
        func: "getPayment",
        orderID: itemOrderId,
    }
    // amjilttai tulult hariu
    axios.post("/api/post/Gate", getPayment).then((res)=>{
    console.log("payGet: ", res.data);
    // setSuccesPay(res.data.data[0]);      // ene bol tululiin hariultuud
    
        props.sucessOrder();  
        basketContext.removeBasketStorage(); 
        const bodySmart = {
            func: "orderSend",
            orderid: itemOrderId,
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
 }
    return<div style={{textAlign: "left"}}>
        <Alert message="Warning" description="This is a warning notice about copywriting." type="warning" showIcon closable/>

        {!toogle ? <div style={{marginTop: "30px"}}><Button onClick={checkPay}>Checkout</Button></div>
        : null }
        {toogle ? <> 
        {loadingQR ? <Spin  style={{margin: "30px auto", width: "100%"}}/> :
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>  
            <div>
                <div style={{color: "#4d5052", fontSize: "22px", fontWeight: "600", textAlign: "center"}}> Price: {props.mntUsdPrice[0].mnt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮</div>
                <Image src={"data:image/png;base64," + imgQr} preview={true} alt="obortech" width={200}/>
                
            </div>
            <div style={{marginTop: "10px"}}> <Button type="primary" onClick={payCheckFunc}>Check pay</Button></div>
        </div>
        }
        </>
        : null }
    </div>
}
export default Qpay;