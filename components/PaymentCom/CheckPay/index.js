import axios from "axios";
import { useEffect } from "react"


export const CheckPay  = () =>{
    useEffect(()=>{
        console.log("checkPay page, url: ",window.location.href);
        const urlId = window.location.href; 
        const aaa = urlId.split("http://127.0.0.1:3000/payment?orderid=");
        console.log("array: ", aaa[1]);
        const body  = {
            func: "getPayment",
            orderID:  aaa[1],
        }
        axios.post("/api/post/Gate", body).then((res)=>{
            console.log("getPayment: ", res.data);
        }).catch((err)=>{
            console.log("err:", err);
        })
    },[])
    return<div> CheckPay</div>
}