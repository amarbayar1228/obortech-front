import { Button, Input, InputNumber, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout"
import css from "./style.module.css"
import {KeyOutlined} from "@ant-design/icons";
import axios from "axios";
import sha256 from "sha256";
import ReCAPTCHA from "react-google-recaptcha";
const Security = () =>{
const [toogle, setToogle] = useState(false);
const [current, setCurrent] = useState(""); 
const [newP, setNewP] = useState("");
const [reType, setReType] = useState(""); 
const recaptchaRef = useRef();
const [userFormCapt, setUserFormCapt] = useState(true);

const saveBtn = () =>{
 
    
    if(newP == reType){ 
       
        if(localStorage.getItem("pz2r3t5") == sha256(current)){
            console.log('newp: ', newP);
            const body ={ 
                func: "changePass",
                pkId:  localStorage.getItem("pkId"),
                password: sha256(newP)
            }
            axios.post("/api/post/Gate", body).then((res)=>{
                message.success("Password changed successfully");
                setToogle(false);
                setCurrent("");
                setReType("");
                setNewP("");
                localStorage.setItem("pz2r3t5", sha256(newP));
                console.log("res: ", res.data); 
            }).catch((err)=>{
                console.log("err", err);
            }) 
        }else{
            message.error("Password is incorrect");
        }
    } else{
        message.error("passwords do not match.");
    }
}
const toogleFunc = () =>{
    toogle ? null : setCurrent(""), setNewP(""), setReType("");
    setToogle(!toogle); 
}
const onChangeCaptcha = (a) =>{ 
    console.log("captcha change: ", a);
    a == null ? setUserFormCapt(true) : setUserFormCapt(false);
  }
  const errorCapt = (err) =>{
    console.log("err", err);
  }
  
return<BaseLayout pageName="security">
<div style={{padding: "10px"}}>
    <div className={css.Title}>Security and login</div>
    <div className={css.Layout}> 
        <div className={css.Password}>
            <div className={css.Hdr}>
                <div className={css.Icons}><KeyOutlined rotate={180} className={css.KeyOutlined}/></div>
                <div className={css.Descrip}>
                    <div className={css.Text1}>Change password</div>
                    <div className={css.Text2}>It's a good idea to use a strong password that you're not using elsewhere</div>
                </div>
            </div>
            <div><Button onClick={toogleFunc}>{toogle ? "Close" : "Edit"}</Button></div>  
        </div>
        {toogle ? <div className={css.Details}>
                <div className={css.DetailsChild}><div className={css.DetailsTitle}>Current: </div> <div><Input.Password placeholder="Current" value={current} onChange={(e)=> setCurrent(e.target.value)}/></div></div>
                <div className={css.DetailsChild}><div className={css.DetailsTitle}>New: </div> <div><Input.Password placeholder="New" type="password" value={newP} onChange={(e)=> setNewP(e.target.value)}/></div></div>
                <div className={css.DetailsChild}><div className={css.DetailsTitle}>Re-type new: </div> <div><Input.Password placeholder="Re-type new" value={reType} onChange={(e)=> setReType(e.target.value)}/></div></div>
                
 <div style={{marginBottom: "15px", marginTop: "15px"}}>
                    <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                    </div>
                <div className={css.TopLine}><Button disabled={userFormCapt} type="primary" onClick={saveBtn}>Save changes</Button></div>

        </div> : ""} 
    </div>
</div>
</BaseLayout>
}
export default Security;