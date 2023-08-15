import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, message } from "antd";
import { useRouter } from "next/router";
const GolomtBank = (props) =>{
    const router = useRouter();
    // item bolon golomt bankruu invoice ilgeej bga function
    const sendItem = async () =>{ 
            const body = [];
            const arr = props.item;
            // img tei bol Item, imggui bol Group 
            arr.forEach((element, i) => {
            if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
            }); 
            if (localStorage.getItem("pkId")) {   
                body = {
                    func: "neworder",
                    item: arr,
                    orgId: props.orgIdRadio,
                    totalPrice: props.price, 
                    pkId: localStorage.getItem("pkId"), 
                };
            } else { 
                body = {
                    func: "neworder",
                    orgId: props.orgIdRadio,
                    totalPrice: props.price,
                    item: arr, 
                }; 
            } 
               await axios.post("/api/post/Gate", body).then((result) => {
                    const data = {
                        transactionId: result.data.orderid,
                        amount: props.mntUsdPrice[0].mnt + "",
                        returnType: "POST",
                        callback: `${"http://127.0.0.1:3000/payment?orderid=" + result.data.orderid}`
                    }
                    const encrypt =  hmac256(data); 
                        const body = {
                            amount: data.amount,
                            callback: data.callback,
                            checksum: encrypt,
                            genToken: "Y",
                            returnType: data.returnType,
                            transactionId: data.transactionId
                        } 
                            axios.post("/api/golomt/post/invoice", body).then((res)=>{
                                res.data ? router.push("https://ecommerce.golomtbank.com/payment/mn/" + res.data.invoice) : message.error("Амжилтгүй хүсэлт")
                            }).catch((err)=>{
                                console.log("err: ", err);
                            }) 
                },(error) => {console.log(error)});
       
    }

    const hmac256 = (message) => {
        var crypto = require("crypto"); 
        const msgEncypt = message.transactionId + message.amount + message.returnType + message.callback;
        let hash = crypto.createHmac("sha256", 'g2Q)COW6k5MpF4$u').update(msgEncypt);
        return hash.digest("hex");
    } 
     
    return<div>
        <Alert message="Golomt bank" description="This is a warning notice about copywriting." type="warning" showIcon closable/>
        <Button onClick={sendItem} type="primary">check out</Button>
    </div>
}
export default GolomtBank;