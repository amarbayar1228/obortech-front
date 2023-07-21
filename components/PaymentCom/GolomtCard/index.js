import { useEffect, useState } from "react";
import axios from "axios";
import { Button, message } from "antd";
import { useRouter } from "next/router";

const data = {transactionId: "2307194724",
            amount: "1000",
            returnType: "POST",
            callback: "http://127.0.0.1:3000/payment?orderid=23071947211"
        }

const GolomtBank = (props) =>{
    const [invoice, setInvoice] = useState(); 
    const router = useRouter();
    useEffect(()=>{ 
        setInvoice(data);  
    },[]);

    const hmac256 = (message) => {
        var crypto = require("crypto"); 
        const msgEncypt = message.transactionId + message.amount + message.returnType + message.callback;
        let hash = crypto.createHmac("sha256", 'g2Q)COW6k5MpF4$u').update(msgEncypt);
        return hash.digest("hex");
    } 
    
    const getGolomt = () => { 
        const encrypt = hmac256(invoice);
        const body = {
            amount: invoice.amount,
            callback: invoice.callback,
            checksum: encrypt,
            genToken: "Y",
            returnType: invoice.returnType,
            transactionId: invoice.transactionId
        }

        axios.post("/api/golomt/post/invoice", body).then((res)=>{
          res.data ? router.push("https://ecommerce.golomtbank.com/payment/mn/" + res.data.invoice) : message.error("Амжилтгүй хүсэлт")
        }).catch((err)=>{
          console.log("err: ", err);
        }) 
    }
    return<div>
        Golomt bank 
        {props.data ? props.data : "hooson"} 
        <Button onClick={getGolomt} type="primary">TULUH</Button>
    </div>
}
export default GolomtBank;