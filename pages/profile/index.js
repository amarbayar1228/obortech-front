import { Button, Divider, Empty, Form, Input, message, Modal, Upload, Select, Image } from "antd";
import React, { useContext, useEffect, useState } from "react";

import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import BasketContext from "../../context/basketContext/BasketContext";
const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const basketContext = useContext(BasketContext);
  const [fileList, setFileList] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  useEffect(() => {
    getProfile(); 
  }, []);
  const getProfile = () =>{ 
    const body = {
      func:"getIndustry"
    }
    axios.post("/api/post/Gate", body).then((res)=>{
      console.log("getIndustry:", res.data);
      setIndustryData(res.data.data)
    }).catch((err)=>console.log("err"))


    // if(basketContext.userInfoProfile){
    //   setInputLastname(basketContext.userInfoProfile.lastname);
    //   setInputFirstname(basketContext.userInfoProfile.firstname);
    //   setInputEmail(basketContext.userInfoProfile.email);
    //   setInputAddress(basketContext.userInfoProfile.address);
    //   setInputPhone(basketContext.userInfoProfile.phone);
    //   // setInputJobtitle(basketContext.userInfoProfile.jobtitle);
    //   }else {
  
    //   }
    // if (localStorage.getItem("pkId")) {
    //   const body = {
    //     func: "getUserInfo",
    //     pkId: localStorage.getItem("pkId"),
    //   };
    //   axios.post("/api/post/Gate", body).then((res) => { 
    //       setUserInfoProfile(res.data.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   console.log("null");
    // }
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const selectHandle = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinishEditForm = (values) => {
    console.log("values: ", values);

    if(fileList[0]){
      let baseImg2 = fileList[0].thumbUrl.split("base64,")[1];
      // console.log("zurag: ", baseImg2);
      const body = {
        func: "uploadProfile",
        pkId: basketContext.userInfoProfile.pkId,

        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        jobtitle: values.jobtitle,
        phone: values.phone,
        address: values.address, 
        img: baseImg2,
        city: values.city,
        countryregion: values.countryregion,
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
 
  };
  //   axios
  //     .post("/api/post/user/uploadProfile", body)
  //     .then((res) => {
  //       basketContext.getUserProfileFunction();
  //       setIsModalVisible(false);
  //       message.success("Success");
  //     })
  //     .catch((err) => {});
  // };
  const onFinishFailedEdit = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors);
  };
  const onPreview = async (file) => {
    let src = file.url;
    
    if (!src) {
        src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
    
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
    <Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64,"+ basketContext.userInfoProfile.img} style={{display: "flex", width: "120px", margin:"0px auto"}}/>
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
      <Modal footer={false} title="Edit" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className={css.Modalcss}>
          <Form name="basic" labelCol={{span: 8,}}wrapperCol={{span: 16,}}
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
              city:  basketContext.userInfoProfile.city
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
            <Form.Item label="Country region" name="countryregion" rules={[{ required: true,message: "Please input your Country region!"}]}><Input allowClear /></Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true,message: "Please input your City!"}]}><Input allowClear /></Form.Item>
            <Form.Item label="Job title" name="jobtitle" rules={[{ required: true,message: "Please input your Job title!"}]}><Input allowClear /></Form.Item>
            <Form.Item label="Phone number" name="phone" rules={[{required: true,message: "Please input your Phone number!",},]}><Input type="number" /></Form.Item>
            <Form.Item label="Address" name="address" rules={[{required: true, message: "Please input your Address!",},]}><TextArea showCount allowClear maxLength={100} style={{height: 50,}}/></Form.Item>
            <Form.Item wrapperCol={{offset: 8,span: 16,}}><Button type="primary" htmlType="submit" style={{width: "100%"}}>Save</Button></Form.Item>
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
        <div key={i}>{e.index_ == basketContext.userInfoProfile.industry ? e.nameeng : null}</div>
      ))}
      </div>
    </div>
    <div className={css.Text}>
      <div className={css.descr1}>Job title: </div>
      <div className={css.descr2}>{basketContext.userInfoProfile.jobtitle}</div>
    </div>
  </div>
</div>
}
        </div>
      </BaseLayout>
    </div>
  );
};
export default Profile;
