import { Button, Empty, Input, InputNumber, message, Spin } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout"
import css from "./style.module.css"
import {KeyOutlined} from "@ant-design/icons";
import axios from "axios";
import sha256 from "sha256";
import ReCAPTCHA from "react-google-recaptcha";
import BasketContext from "../../context/basketContext/BasketContext";
import AccountManagement from "../../components/Security comp/AccountManagement";
const Security = () =>{
const [toogle, setToogle] = useState(false);
const [current, setCurrent] = useState(""); 
const [newP, setNewP] = useState("");
const [reType, setReType] = useState(""); 
const recaptchaRef = useRef();
const [userFormCapt, setUserFormCapt] = useState(true);
const [loggedLoad,setLoggedLoad ] = useState(true);
const basketContext = useContext(BasketContext);
useEffect(()=>{
  
    setTimeout(()=>{
        setLoggedLoad(false); 
      },800);
},[])

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
                message.success(basketContext.t('passChangedSuccess', { ns: 'security' }));
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
            message.error(basketContext.t('passwordIsIncorrect', { ns: 'security' }));
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
      {loggedLoad ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px"}}/>  : <> 
      {basketContext.userInfoProfile ? <div className={css.Scroll}>
            <div className={css.Title}>{basketContext.t('securityAndLogin', { ns: 'security' })}</div>
            <div className={css.Layout}> 
                <div className={css.Password}>
                    <div className={css.Hdr}>
                        <div className={css.Icons}><KeyOutlined rotate={180} className={css.KeyOutlined}/></div>
                        <div className={css.Descrip}>
                            <div className={css.Text1}>{basketContext.t('changePass', { ns: 'security' })}</div>
                            <div className={css.Text2}>{basketContext.t('passDescription', { ns: 'security' })} </div>
                        </div>
                    </div>
                    <div><Button onClick={toogleFunc}>{toogle ? basketContext.t('close', { ns: 'security' }) : basketContext.t('edit', { ns: 'security' })}</Button></div>  
                </div>
                {toogle ? <div className={css.Details}>
                        <div className={css.DetailsChild}><div className={css.DetailsTitle}>{basketContext.t('current', { ns: 'security' })}</div> 
                        <div><Input.Password placeholder={basketContext.t('current', { ns: 'security' })} value={current} onChange={(e)=> setCurrent(e.target.value)}/></div></div>
                        <div className={css.DetailsChild}><div className={css.DetailsTitle}>{basketContext.t('newPass1', { ns: 'security' })}: </div> <div><Input.Password placeholder={basketContext.t('newPass1', { ns: 'security' })} type="password" value={newP} onChange={(e)=> setNewP(e.target.value)}/></div></div>
                        <div className={css.DetailsChild}><div className={css.DetailsTitle}>{basketContext.t('newPass2', { ns: 'security' })}: </div> <div><Input.Password placeholder={basketContext.t('newPass2', { ns: 'security' })} value={reType} onChange={(e)=> setReType(e.target.value)}/></div></div>
                        
                        <div style={{marginBottom: "15px", marginTop: "15px"}}>
                            <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                        </div>
                        <div className={css.TopLine}><Button disabled={userFormCapt} type="primary" onClick={saveBtn}>{basketContext.t('save', { ns: 'security' })}</Button></div>
        
                </div> : ""}  
               
            </div> 
            <div>
                 <AccountManagement />
            </div>
        </div>  :
        <Empty />
      }
      
       </>}


</BaseLayout>
}
export default Security;