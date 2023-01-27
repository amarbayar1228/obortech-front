import { Button, Divider, Empty, Form, Input, message, Modal, Upload, Select, Image } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import BasketContext from "../../context/basketContext/BasketContext";
import { Router, useRouter } from "next/router"; 
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import ReCAPTCHA from "react-google-recaptcha";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const basketContext = useContext(BasketContext);
  const [fileList, setFileList] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [countryCode, setCountryCode] = useState("mongolian");
  const [userFormCapt, setUserFormCapt] = useState(true);
  const recaptchaRef = useRef();
  const router = useRouter();
  const [country, setCountry] = useState("-");
  const [region, setRegion] = useState("-");
 

  const selectCountry = (a) =>{ 
    setCountry(a)
  }
  const selectRegion = (a) =>{ 
    setRegion(a)
  }
  useEffect(() => {
    getProfile(); 
  }, []);
  const getProfile = () =>{ 
    const body = {
      func:"getIndustry"
    }
    axios.post("/api/post/Gate", body).then((res)=>{ 
      setIndustryData(res.data.data)
    }).catch((err)=>console.log("err"));
// question
    const question = {
      func:"getTypes",  
      parid:0,
      type_:3
    }
    axios.post("/api/post/Gate", question).then((res)=>{ 
      setUserQuestion(res.data.data)
      // setQuestionData(res.data.data)
    }).catch((err)=>{console.log("err", err)})

// question answered
    const answered = {
      func:"getQuest", 
      pkId: localStorage.getItem("pkId")
    } 
    axios.post("/api/post/Gate", answered).then((res)=>{ 
      if(res.data.data === ""){
        console.log("null");
      }else{
        const array = JSON.parse(res.data.data);
        setUserAnswer(array);  
      }
     
    }).catch((err)=>console.log("err", err))
  }
  const showModal = () => {
    setCountry(basketContext.userInfoProfile.countryregion);
    setRegion(basketContext.userInfoProfile.city);  
    if(basketContext.userInfoProfile.img === "-"){
      setFileList([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: "/img/user.png",
        }, 
        ]);
    }else{
      setFileList([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            thumbUrl: "data:image/png;base64," + basketContext.userInfoProfile.img,
        }, 
        ]);
    }
   
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeCaptcha = (a) =>{  
    a == null ? setUserFormCapt(true) : setUserFormCapt(false);
  }
  const errorCapt = (err) =>{
    // console.log("err", err);
  }
  
  const selectHandle = (value) => {
    // console.log(`selected ${value}`);
  };
  const onFinishEditForm = (values) => {  
    if(countryCode.length < 5 || country === "-" || region === "-"){
      message.error("null")
    }else{
      if(values.img[0]){
        // message.error("image null");
          if(values.img[0].thumbUrl){ 
                 
      let baseImg2 = values.img[0].thumbUrl.split("base64,")[1];  
      const body = {
        func: "uploadProfile",
        pkId: basketContext.userInfoProfile.pkId, 
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        jobtitle: values.jobtitle,
        phone: countryCode,
        address: values.address, 
        img: baseImg2,
        city: region,
        countryregion: country,
        industry: values.industry,
        website: values.website
      };
      axios.post("/api/post/Gate", body).then((res) => {
          basketContext.getUserProfileFunction();
          setIsModalVisible(false);
          message.success("Success");
        }).catch((err) => {});
   
          }
      }else{ 
          if(values.img.file.status === "done"){ 
            let baseImg2 = values.img.file.thumbUrl.split("base64,")[1];  
          const body = {
        func: "uploadProfile",
        pkId: basketContext.userInfoProfile.pkId,
  
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        jobtitle: values.jobtitle,
        phone: countryCode,
        address: values.address, 
        img: baseImg2,
        city: region,
        countryregion: country,
        industry: values.industry,
        website: values.website
      };
      axios.post("/api/post/Gate", body).then((res) => {
          basketContext.getUserProfileFunction();
          setIsModalVisible(false);
          message.success("Success");
        }).catch((err) => {});
  
        }else{
          message.error("Image null");
        }
      }
    }

   

    
    // if(fileList[0]){
    //   let baseImg2 = fileList[0].thumbUrl.split("base64,")[1]; 
       
      // const body = {
      //   func: "uploadProfile",
      //   pkId: basketContext.userInfoProfile.pkId,

      //   firstname: values.firstname,
      //   lastname: values.lastname,
      //   email: values.email,
      //   jobtitle: values.jobtitle,
      //   phone: countryCode,
      //   address: values.address, 
      //   img: baseImg2,
      //   city: region,
      //   countryregion: country,
      //   industry: values.industry,
      //   website: values.website
      // };
      // axios.post("/api/post/Gate", body).then((res) => {
      //     basketContext.getUserProfileFunction();
      //     setIsModalVisible(false);
      //     message.success("Success");
      //   }).catch((err) => {});
      // }else{
      //     message.error("Image null");
      // }
 
  }; 
  const onFinishFailedEdit = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        // reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
    };
    const onChangeImage = ({ fileList: newFileList }) => {
    console.log("newFile: ",newFileList );
    setFileList(newFileList);
    };
  return (
    <div>
      <BaseLayout pageName="profile">
        <div>
          <Divider> Profile</Divider>
{basketContext.userInfoProfile === undefined ? (<Empty />) : 
<div className={css.Layout}>
  <div className={css.Cont1}>
    <Image alt="Obertech" preview={true} className={css.Zurag} src={basketContext.userInfoProfile.img === "-" ?  "/img/user.png" : "data:image/png;base64," + basketContext.userInfoProfile.img } style={{display: "flex", width: "120px", borderRadius: "50%", margin:"0px auto"}}/>
    <div className={css.Name}> 
    {basketContext.userInfoProfile.firstname} {basketContext.userInfoProfile.lastname}
    </div>
    <div className={css.Job}> 
    {basketContext.userInfoProfile.jobtitle}
    </div>
  </div>
  <div className={css.Cont2}> 
    <div className={css.Text}>
      <div className={css.descr1}>Full name: </div>
      <div className={css.descr2}>  {basketContext.userInfoProfile.firstname} {basketContext.userInfoProfile.lastname}</div>
      <div className={css.Editcss}><Button type="dashed" shape="circle" onClick={showModal}><EditOutlined /></Button>
      <Modal footer={false} title="Edit Profile" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={600}>
        <div className={css.Modalcss}>
          <Form name="basic" labelCol={{span: 8,}}wrapperCol={{span: 23,}}
            layout="vertical"
            initialValues={{
              lastname: basketContext.userInfoProfile.lastname,
              firstname: basketContext.userInfoProfile.firstname,
              email: basketContext.userInfoProfile.email,
              phone: basketContext.userInfoProfile.phone,
              address: basketContext.userInfoProfile.address,
              jobtitle: basketContext.userInfoProfile.jobtitle,
              industry: basketContext.userInfoProfile.industry,
              website:  basketContext.userInfoProfile.website,
              countryregion:  basketContext.userInfoProfile.countryregion,
              city:  basketContext.userInfoProfile.city,
              img:  fileList,
            }}
            onFinish={onFinishEditForm} onFinishFailed={onFinishFailedEdit} autoComplete="off">
             <Form.Item label="Image" name="img" rules={[{required: true,message: "Please input your Image!"}]}>
              <Upload onPreview={onPreview} listType="picture-card" fileList={fileList} onChange={onChangeImage} >{fileList.length < 1 && "+ Image"}</Upload>
            </Form.Item>
            <Form.Item label="Last name" name="lastname" rules={[{required: true,message: "Please input your Last name!"}]}><Input allowClear /></Form.Item>
            <Form.Item label="First name" name="firstname" rules={[{required: true,message: "Please input your First name!"}]}><Input allowClear /></Form.Item> 
            <Form.Item label="Email" name="email" rules={[{ type: "email", required: true, message: "Please input your Email!"}]}><Input allowClear /></Form.Item> 
            
            <Form.Item label="Industry" name="industry" rules={[{required: true,message: "Please input your Industry!"}]}>
            <Select  style={{width: "100%"}} onChange={selectHandle} options={industryData.map((e, i)=>({label: e.nameeng, value:  e.index_,}))}/>
            </Form.Item>  
            
            <Form.Item label="Web site" name="website" rules={[{ required: true,message: "Please input your Web site!"}]}><Input allowClear /></Form.Item>
            {/* <Form.Item label="Country region" name="countryregion" rules={[{ required: true,message: "Please input your Country region!"}]}><Input allowClear /></Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true,message: "Please input your City!"}]}><Input allowClear /></Form.Item> */}
            <div className={css.CountryCss}> 
              <div style={{display: "flex", alignItems: "center"}}> <span style={{color: "red", fontSize: "15px", paddingTop: "8px", paddingRight: "5px"}}>*</span> Country</div>
              <CountryDropdown value={country} onChange={selectCountry}/>
              <div style={{display: "flex", alignItems: "center"}}> <span style={{color: "red", fontSize: "15px", paddingTop: "8px", paddingRight: "5px"}}>* </span>City</div>
              <RegionDropdown country={country} value={region} onChange={selectRegion} />
            </div>
            <Form.Item label="Job title" name="jobtitle" rules={[{ required: true,message: "Please input your Job title!"}]}><Input allowClear /></Form.Item>
            {/* <Form.Item label="Phone number" name="phone" rules={[{required: true,message: "Please input your Phone number!",},]}><Input type="number" /></Form.Item> */}
            <Form.Item name="phone" label="Phone Number" rules={[{required: true, message: 'Please input your phone number!'}]}>
                <PhoneInput   enableSearch={true} country={"mongolia"} value={countryCode} onChange={(e) => setCountryCode(e)} style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{required: true, message: "Please input your Address!",},]}><TextArea showCount allowClear maxLength={100} style={{height: 50,}}/></Form.Item>
            <div style={{marginBottom: "20px", marginTop: "-15px", display: "flex", justifyContent: "center"}}> 
            <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
            </div>
            <Form.Item wrapperCol={{offset: 0,span: 24,}}><Button size="large" disabled={userFormCapt} type="primary" htmlType="submit" style={{width: "100%"}}>Update</Button></Form.Item>
          </Form>
        </div>
      </Modal> </div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>Email: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.email}</div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>Phone number: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.phone}</div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>Country region: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.countryregion}</div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>City: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.city}</div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>Address: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.address}</div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>Industry: </div>
      <div className={css.descr2}> 
      {industryData.map((e,i)=>(
        <div key={i}>{e.index_ == basketContext.userInfoProfile.industry ? router.locale === "mn" ? e.namemn : e.nameeng : null}</div>
      ))}
      </div>
    </div>
    <div className={css.Text} style={{borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"}}>
      <div className={css.descr1}>Job title: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.jobtitle}</div>
    </div>
  </div> 
</div> 
}
  <div>
{/* {userAnswer === "" ? null :
<>
{userQuestion.map((e, index)=>(
  <div key={index} style={{fontWeight: "600", color: "#4d5052"}}> 
    <div>{e.nameeng} </div>  
    <div>
      {userAnswer.map((e, i)=>(
        <div key={i} style={{marginLeft: "15px", fontWeight: "500"}}>
        {index === i ?
        <div>{e}</div> : ""
      }
        </div>
      ))} 
    </div>
  </div>

))}
</>
} */}
    
  </div>
        </div>
      </BaseLayout>
    </div>
  );
};
export default Profile;
