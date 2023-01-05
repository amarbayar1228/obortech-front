import { useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { Form, Input, Button, message, Image, Spin, Statistic } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import sha256 from "sha256";
import ReCAPTCHA from "react-google-recaptcha";
 
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
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
const Register = () => { 
const [spinCapt, setSpinCapt] = useState(0);
const recaptchaRef = useRef();
const [btnDis, setBtnDis]= useState(true);
const [showCode, setShowCode] = useState(false);
const [cd,setCd] = useState(0);
const [cdBoolean, setCdBoolean] = useState(false);
const [email, setEmail] = useState("");
const [code, setCode] = useState("");
const [signUpLoad, setSignUpLoad] = useState(false);
const [verifyOTPDis, setVerifyOTPDis] = useState(true);
const [loadingOTP, setLoadingOTP] = useState(false);
useEffect(()=>{
  setTimeout(()=>{ 
    
    setSpinCapt(1);
  },800)
},[])
  const router = useRouter();

  const countDown = () => { 
    // clearInterval(timer); 
    setCdBoolean(true);
    let secondsToGo = 10; 
    let too = 5;
    // setCd(0);
    const timer = setInterval(() => {
      secondsToGo -= 1; 
   
      // setCdBoolean(false); 
      console.log("aa", timer);
      setCd(secondsToGo); 
    }, 1000); 

    console.log("too: ", secondsToGo);

    // clearInterval(timer); 
    if(cdBoolean){
      setTimeout(() => {
        clearInterval(timer); 
        setCdBoolean(false);
        console.log("blsn timer1");
      },100); 
      console.log("true");
    }else{
      console.log("ene shvvv ");
      const body2 = {
        func: "resendCode",
        email: email,
      }
      axios.post("/api/post/Gate", body2).then((res)=>{
        console.log("res", res.data);
      }).catch((err)=>{
        console.log("err");
      })
      setTimeout(() => {
        clearInterval(timer); 
        setCdBoolean(false);
        console.log("blsn timer2");
      }, secondsToGo * 1000); 
    }
   

  };
  const countDown2 = () =>{
    console.log("2222"); 
    const body2 = {
        func: "resendCode",
        email: email,
      }
      axios.post("/api/post/Gate", body2).then((res)=>{
        console.log("res", res.data);
      }).catch((err)=>{
        console.log("err", err);
      }) 
   }
  const onFinish = (values) => {
    console.log("Received values of form: ", values.email);
    setSignUpLoad(true)
    if (values.password1 == values.password2) {
      setEmail(values.email);
      var passwordHash = sha256(values.password2); 
      const register = {
        func: "signUp",
        email: values.email,
        password: passwordHash,
        username: values.username,
      };
      axios.post("/api/post/Gate", register).then((res) => { 
          message.success("Successfully Registered");

          countDown();
          setShowCode(true);
          setSignUpLoad(false)
          // router.push("/login");
        }).catch((err) => {
          recaptchaRef.current.props.grecaptcha.reset(); 
          setBtnDis(true);
        });
      console.log("tentsvv");
    } else {
      message.error(
        <div className={css.Title}>The password does not match!!</div>
      );
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeCaptcha = (a) =>{ 
    console.log("captcha change: ", a);
    a == null ? setBtnDis(true) : setBtnDis(false)
  }
  const errorCapt = (err) =>{
    console.log("err", err);
  }
  const VerifyOTP = () =>{
    console.log("VerifyOTP");
    console.log("code: ", code);
    setLoadingOTP(true);
    const body ={
      func: "checkCode",
      email: email,
      code: code,
    }
    axios.post("/api/post/Gate", body).then((res)=>{
      // setLoadingOTP(false);
      console.log("Verify: ", res.data);
      if(res.data.data.status === "Okay"){
         router.push("/login");
      }else{
        message.error("Error");
      }
    }).catch((err)=>{
      console.log("err", err);
      setLoadingOTP(false);
    })
  }
 const onChangeCode = (e) =>{
  
  if(e.target.value.length === 6){
    console.log("object");
    setVerifyOTPDis(false);
    setCode(e.target.value);
  }else{
    console.log("urt obso");
    setVerifyOTPDis(true);
  }
  
 }
  return (
    <BaseLayout pageName="register">
      <div className={css.Cont1}>
        {showCode === false ? 
        <div className={css.Cont2}>
         <div className={css.LoginTitle}><Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg"width={250}/></div>
       
          <div style={{width: "76%", margin: "0px auto"}}>
            <Form layout="vertical" labelCol={{span: 20}} wrapperCol={{span: 30,}} name="normal_login" className="login-form" initialValues={{ remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
              <Form.Item name="email" tooltip="This is a required field" label={<div className={css.Title}>Email</div>} rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>)}]}>
                <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
              </Form.Item>
              <Form.Item name="username" tooltip="This is a required field" label={<div className={css.Title}>Username</div>} rules={[{required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Username!</div>),},]}>
                <Input size="middle" prefix={<UserOutlined className={css.Title} />} placeholder={"username"}/>
              </Form.Item>
              <Form.Item name="password1" tooltip="This is a required field" label={<div className={css.Title}>Create Password </div>} rules={[{required: true, message: (<div style={{ fontWeight: 500 }}>Please input your Password 1!</div>)}]}>
                <Input.Password size="middle" prefix={<LockOutlined className={css.Title} />} type="password" placeholder={"Enter your password"}/>
              </Form.Item>
              <Form.Item name="password2" tooltip="This is a required field" label={<div className={css.Title}>Password confirmation</div>} rules={[{required: true, message: (<div style={{ fontWeight: 500 }}>Please input your Password 2!</div>)}]}>
                <Input.Password size="middle" prefix={<LockOutlined className={css.Title} />} type="password" placeholder="Confirm your password"/>
              </Form.Item>
              <div className={css.CaptchaCss}> {spinCapt  == 0 ? <Spin /> : <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef} sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/> }</div>
              <Form.Item><div className={css.Login}><Button size="large" disabled={btnDis} style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button" loading={signUpLoad}>Sign up</Button></div></Form.Item>
            </Form> 
          </div>
          
        </div>
        : <div className={css.VerifyForm}> 
        <div className={css.Back}>
          <div><Button icon={<ArrowLeftOutlined />} type="link" onClick={()=>setShowCode(false)}></Button></div>
          <div>OTP Verification</div>
        </div>
        <div style={{margin: "0px 32px"}}> 
          <div className={css.VerifyText}>We've sent a verification code to your email - <span style={{fontWeight: "600"}}>{email === "" ? "null" : email}</span></div>
          <div><Input onChange={onChangeCode}  suffix={<div style={{fontSize: "11px", fontWeight: "600", color: "#4d5057"}}> Sent [{cd}] sec </div>} placeholder="Enter verification code" /></div>

          <div style={{marginTop: "10px",marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Button type="primary" size="small" onClick={VerifyOTP} disabled={verifyOTPDis} loading={loadingOTP}>Verify OTP</Button>
            {cd === 0 ? <Button type="link" size="small"  onClick={countDown}>Resent</Button> : ""}
            </div>
        </div>
    </div> }
      </div>
    </BaseLayout>
  );
};
export default Register;
