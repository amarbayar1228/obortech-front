import { Button, Divider, Empty, Form, Input, message, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";

import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import BasketContext from "../../context/basketContext/BasketContext";
const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputFirstname, setInputFirstname] = useState();
  const [inputLastname, setInputLastname] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPhone, setInputPhone] = useState();
  const [inputJobtitle, setInputJobtitle] = useState("-");
  const [inputAddress, setInputAddress] = useState();
  const basketContext = useContext(BasketContext);

  useEffect(() => {
    console.log("user info: ", basketContext.userInfoProfile);
    if(basketContext.userInfoProfile){
      setInputLastname(basketContext.userInfoProfile.lastname);
    setInputFirstname(basketContext.userInfoProfile.firstname);
    setInputEmail(basketContext.userInfoProfile.email);
    setInputAddress(basketContext.userInfoProfile.address);
    setInputPhone(basketContext.userInfoProfile.phone);
    // setInputJobtitle(basketContext.userInfoProfile.jobtitle);
    }else {

    }
    
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinishEditForm = (values) => {
    console.log("values: ", values);
    const body = {
      pkId: basketContext.userInfoProfile.pkId,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };
    // axios
    //   .post("/api/post/Gate/uploadProfile", body)
    //   .then((res) => {
    //     basketContext.getUserProfileFunction();
    //     setIsModalVisible(false);
    //     message.success("Success");
    //   })
    //   .catch((err) => {});
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
  return (
    <div>
      <BaseLayout pageName="profile">
        <div>
          <Divider> Profile</Divider>
          <div className={css.Cont}>
            <div className={css.EditCss}>
              {basketContext.userInfoProfile.state === 2 || basketContext.userInfoProfile.isSuperAdmin === 1 || basketContext.userInfoProfile.isSuperAdmin === 2  ? 
              <Button type="dashed" shape="circle" onClick={showModal}>
                <EditOutlined />
              </Button>
              : ""}
              <Modal footer={false} title="Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                  <Form name="basic" labelCol={{span: 8,}}wrapperCol={{span: 16,}}
                    initialValues={{
                      lastname: inputLastname,
                      firstname: inputFirstname,
                      email: inputEmail,
                      phone: inputPhone,
                      address: inputAddress,
                      jobtitle: inputJobtitle,
                    }}
                    onFinish={onFinishEditForm}
                    onFinishFailed={onFinishFailedEdit}
                    autoComplete="off"
                  >
                    <Form.Item label="Last name" name="lastname"
                      rules={[{required: true,message: "Please input your Last name!",},]}>
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label="First name" name="firstname"
                      rules={[{required: true,message: "Please input your First name!",},]}><Input allowClear />
                    </Form.Item>

                    <Form.Item label="Email" name="email"
                      rules={[{ type: "email", required: true, message: "Please input your Email!",},]}>
                      <Input allowClear />
                    </Form.Item> 
                    <Form.Item label="Job title" name="jobtitle"
                      rules={[{ required: true,message: "Please input your Job title!"}]}>
                      <Input allowClear />
                    </Form.Item>
                    <Form.Item label="Phone number" name="phone" rules={[{required: true,message: "Please input your Phone number!",},]}><Input type="number" />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{required: true, message: "Please input your Address!",},]}>
                      <TextArea showCount allowClear maxLength={100} style={{height: 50,}}/></Form.Item>
                    <Form.Item wrapperCol={{offset: 8,span: 16,}}><Button type="primary" htmlType="submit">Save</Button></Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
            <>
              <>
                {basketContext.userInfoProfile === undefined ? (
                  <Empty />
                ) : (
                  <>
                    <div className={css.Cont2}>
                      <div className={css.ImageCss}></div>
                      <div className={css.Username}>
                        {basketContext.userInfoProfile.lastname}{" "}
                        {basketContext.userInfoProfile.firstname}
                      </div>
                    </div>
                    <div className={css.desc}>
                      <div className={css.Title}> Information</div>
                      <div className={css.Descrip}>
                        <div className={css.TitleSize}>
                          Name:
                          <span className={css.TitleChild}>
                            {basketContext.userInfoProfile.lastname}{" "}
                            {basketContext.userInfoProfile.firstname}
                          </span>
                        </div>
                      </div>
                      <div className={css.Descrip}>
                        <div className={css.TitleSize}>
                          Email{" "}
                          <span className={css.TitleChild}>
                            {basketContext.userInfoProfile.email}
                          </span>
                        </div>
                        <div className={css.TitleSize}>
                          Phone
                          <span className={css.TitleChild}>
                            +
                            {basketContext.userInfoProfile.phone === null
                              ? "Null"
                              : basketContext.userInfoProfile.phone}
                          </span>
                        </div>
                      </div> 
                      <div className={css.Descrip}>
                        <div className={css.TitleSize}> Address:
                          <span className={css.TitleChild}>
                            {basketContext.userInfoProfile.address === null ? "Null" : basketContext.userInfoProfile.address}
                          </span>
                        </div>
                        <div className={css.TitleSize}> Jobtitle
                          <span className={css.TitleChild}>
                            + {basketContext.userInfoProfile.phone === null ? "Null" : basketContext.userInfoProfile.phone}
                          </span>
                        </div>
                      </div>  
                    </div>
                  </>
                )}
              </>
            </>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};
export default Profile;