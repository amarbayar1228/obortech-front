import { Button, Checkbox, Empty, Form, Image, Input, message, notification, Spin } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout"; import css from "./style.module.css";
import { UserOutlined, LockOutlined, ArrowLeftOutlined  } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useRouter } from "next/router";
import BasketContext from "../../context/basketContext/BasketContext";
import sha256 from "sha256";
import Head from "next/head";
import ForgetPassword from "../../components/ForgetPassword";
import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
  const router = useRouter();
  const { t } = useTranslation("login");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const basketContext = useContext(BasketContext);
  const [toggle, setToggle] = useState(1); 
  const [btnDis, setBtnDis]= useState(true);
  const [spinCapt, setSpinCapt] = useState(0);
  const [codePage, setCodePage] = useState(0);
  const [showCode, setShowCode] = useState(false);
const [cd,setCd] = useState(0);
const [cdBoolean, setCdBoolean] = useState(false);
const [email, setEmail] = useState("");
const [code, setCode] = useState("");
const [btnLogin, setBtnLogin] = useState(false);
const [resentDis, setResentDis] = useState(false);
const [verifyOTPLoad, setVerifyOTPLoad] = useState(false);
const inputRef = useRef(null);
const recaptchaRef = useRef();
const [logged, setLogged]= useState(false);
const [loggedLoad, setLoggedLoad]= useState(true);

  useEffect(()=>{
    
    basketContext.getUserProfileFunction();
    setTimeout(()=>{
      setLoggedLoad(false);
      console.log('2 login');
      basketContext.getUserProfileFunction();
      setSpinCapt(1);
    },800);
  
  },[]);
  const countDown = () => { 
    console.log("countDown");
      // setResentDis(true);
    // clearInterval(timer); 
   
    setCdBoolean(true);
    let secondsToGo = 10; 
    let too = 5;
    // setCd(0);
    const timer = setInterval(() => {
      secondsToGo -= 1; 
   
      // setCdBoolean(false); 
       
      setCd(secondsToGo); 
    }, 1000); 

    

    // clearInterval(timer); 
    if(cdBoolean){
      setTimeout(() => {
        clearInterval(timer); 
        setCdBoolean(false); 
      },100);  
    }else{ 
      setTimeout(() => {  
        focusInput();
      }, secondsToGo * 100); 
      setTimeout(() => {
        clearInterval(timer); 
        setCdBoolean(false); 
     
      }, secondsToGo * 1000); 
    }
   

  };
const focusInput = () =>{
  inputRef.current.focus({
    cursor: 'start',
    });
}
  const onFinish = (values) => { 
    setBtnLogin(true);
    var passwordHash = sha256(password);  
    const body = {func: "signIn",username: username,password: passwordHash,};  
    axios.post("/api/post/Gate", body).then((res) => {
        // console.log("res.data: ", res.data.data);

        if (res.data.data.username) {
          setEmail(res.data.data.email);
          message.success(t("WE have sent OTP to your email. Please check your email!")); 
        
          setCodePage(1);
          
          setBtnLogin(false); 
          countDown();
          // router.push("/");
         
        } else {
          recaptchaRef.current.props.grecaptcha.reset();
          notification["error"]({ message: 'Submit Error',description:'These credentials do not match our records.'}); 
          setBtnLogin(false);
          setBtnDis(true);
        }

      }).catch((err) => {
        console.log("Username and password are incorrect!!", err); 
    }); 
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const registerBtn = () => {
    router.push("register");
  };
  const forgotPassword = (a) => {
    if (a === "1") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  };
  const onChangeCaptcha = (a) =>{  
    a == null ? setBtnDis(true) : setBtnDis(false)
  }
  const errorCapt = (err) =>{
    console.log("err", err);
  }
  const loadFun = (a) =>{
    console.log("load: ", a);
  }
 
  const VerifyOTP = () =>{
   
    setVerifyOTPLoad(true);
    var passwordHash = sha256(password);  
    const body ={
      func: "checkCode",
      email: email,
      code: code,
    }
    axios.post("/api/post/Gate", body).then((res)=>{
      console.log("Verify: ", res.data);
      if(res.data.data.status === "Okay"){
        const body = {func: "signIn",username: username,password: passwordHash,};  
        axios.post("/api/post/Gate", body).then((res) => {
          message.success("success");
          setVerifyOTPLoad(false);
          router.push("/");
          localStorage.setItem("pkId", res.data.data.pkId);
          localStorage.setItem("token", res.data.data.token);
          console.log("hansh: ", passwordHash); 
          localStorage.setItem("pz2r3t5", passwordHash); 
          localStorage.setItem("state", res.data.data.state); 
          basketContext.getUserProfileFunction();
        }).catch((err)=>{
          console.log("err");
        })
         
      }else{
        setVerifyOTPLoad(false);
        message.error("Error");
      }
    }).catch((err)=>{
      console.log("err");
    })
  }
 const countDown2 = () =>{
  setResentDis(true);
  console.log("2222"); 
  const body2 = {
      func: "resendCode",
      email: email,
    }
    axios.post("/api/post/Gate", body2).then((res)=>{
      console.log("resendCode: ", res.data);
      setResentDis(false);
    }).catch((err)=>{
      console.log("err", err);
    }) 
 }
 const onPressEnterF = (e) =>{
   
  VerifyOTP();
 }
  return (
    <div> <Head><title>{basketContext.t('obortech', { ns: 'login' })}</title><meta name="description" content="Generated by create next app" /> <link rel="icon" href="/img/HeaderLogo.png" /></Head>
      <BaseLayout pageName="login">  
      {loggedLoad ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px"}}/>  : <> 
        {basketContext.userInfoProfile ? <Empty /> : 
        <div className={css.Cont}  >
          <div className={css.Cont2}> 
            {codePage === 0 ?
            <>
             <div className={css.LoginTitle}> <Image alt="Obertech" preview={false} src="/img/HeaderLogo.png" width={80}  style={{borderRadius: "5px"}}/></div>
            <div className={css.HdrTitle}>
              <div  >{basketContext.t('sign in to your account', { ns: 'login' })}</div>
              <div className={css.OrCss}>Or <Button className={css.RegisterHover} onClick={registerBtn}type="link">{t("Create An Account")}</Button></div>
            </div>
           
            <div className={css.FromCss}>
              {toggle === 1 ? (
                <Form disabled={btnLogin} name="normal_login" className={css.LoginForm} initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                  <Form.Item name="username" rules={[{ required: true, message: t("Please input your Username!")}]}>
                    <Input size="large" onChange={(e) => setUsername(e.target.value)} prefix={<UserOutlined className={css.IconCss} />} placeholder={t("User name")}/>
                    </Form.Item>
                  <Form.Item name="password" rules={[ { required: true, message: t("Please input your Password!")}]}>
                    <Input.Password size="large" onChange={(e) => setPassword(e.target.value)} prefix={<LockOutlined className={css.IconCss} />} type="password" placeholder={t("password")}/>
                  </Form.Item>
                  <Form.Item style={{height: "25px"}}>
                    <Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>{t("Remember me")}</Checkbox></Form.Item>
                    <Form.Item><Button type="link" className={css.Forget} onClick={forgotPassword}>{t("Forgot password")}</Button></Form.Item>
                  </Form.Item>
                   {/* obortech: 6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t ============================================================*/} 
                  {/* my ip:  6LfnfrUiAAAAAJ-K132PVlBOqV-fr1F1sBOJcGpR ===============================================================*/}
                  <div className={css.CaptchaCss}> {spinCapt  == 0 ? <Spin /> : <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef} sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/> }</div>
                 
                  <Form.Item>
                    <div className={css.Login}>
                      <Button  loading={btnLogin} size="large" disabled={btnDis} type="primary" htmlType="submit" className="login-form-button">{t("Log in")}</Button>
                      {/* <div className={css.OrRegister}>{t("New here")}?<Button className={css.RegisterHover} onClick={registerBtn}type="link">{t("Create An Account")}</Button></div> */}
                    </div>
                  </Form.Item>
                </Form>
              ) : (<div className={css.ForgetPasswordCss}><ForgetPassword forgotPassword={forgotPassword} /></div>)}
            </div>
            </>
            : 
            <div className={css.VerifyForm}> 
            <div className={css.Back}>
              <div><Button icon={<ArrowLeftOutlined />} type="link" onClick={()=>setCodePage(0)}></Button></div>
              <div>OTP Verification</div>
            </div>
            <div style={{margin: "0px 32px"}}>
               
              <div className={css.VerifyText}>We've sent a verification code to your email - {email === "" ? "null" : email}</div>
              <div>
                
                <Input ref={inputRef} onPressEnter={onPressEnterF} onChange={(e)=>setCode(e.target.value)}  suffix={<div style={{fontSize: "11px", fontWeight: "600", color: "#4d5057"}}> Sent [{cd}] sec </div>} placeholder="Enter verification code" /></div>
    
              <div style={{marginTop: "10px",marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button type="primary" size="small" onClick={VerifyOTP} disabled={code === "" ? true : false} loading={verifyOTPLoad}>Verify OTP</Button>
                {cd === 0 ? <Button loading={resentDis} type="link" size="small"  onClick={countDown} onClickCapture={countDown2}>Resent</Button> : ""}
                </div>
            </div>
        </div>
            }
           
          </div>
        </div>
        }</>
} 
      </BaseLayout>
    </div>
  );
}
