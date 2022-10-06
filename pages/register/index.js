import react, { useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { Form, Input, Button, message, Image } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import sha256 from "sha256";

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
  const router = useRouter();
  const onFinish = (values) => {
    console.log("Received values of form: ", values.email);
    if (values.password1 == values.password2) {
      var passwordHash = sha256(values.password2);
      console.log("register password sha256: ", values.password2);
      const register = {
        func: "signUp",
        email: values.email,
        password: passwordHash,
        username: values.username,
      };
      axios
        .post("/api/post/Gate", register)
        .then((res) => {
          console.log("res", res);
          message.success("Successfully Registered");
          router.push("/login");
        })
        .catch((err) => {
          message.error(err);
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
 
  return (
    <BaseLayout pageName="register">
      <div className={css.Cont1}>
        <div className={css.Cont2}>
          <div className={css.LoginTitle}><Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg"width={250}/></div>
          <div>
            <Form
              {...layout} name="normal_login" className="login-form" initialValues={{ remember: true,}} 
              onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}
            >
              <Form.Item name="email" label={<div className={css.Title}>Email</div>}
                rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>),}]}>
                <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
              </Form.Item>
              <Form.Item name="username" label={<div className={css.Title}>Username</div>} 
                rules={[{required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Username!</div>),},]}>
                <Input size="middle" prefix={<UserOutlined className={css.Title} />} placeholder={"username"}/>
              </Form.Item>
              <Form.Item name="password1" label={<div className={css.Title}>Create Password </div>}
                rules={[{required: true,
                    message: (<div style={{ fontWeight: 500 }}>Please input your Password 1!</div>),},]}>
                <Input.Password size="middle" prefix={<LockOutlined className={css.Title} />} type="password" placeholder={"Enter your password"}/>
              </Form.Item>
              <Form.Item name="password2" label={<div className={css.Title}>Password confirmation</div>}
                rules={[{required: true,
                    message: (<div style={{ fontWeight: 500 }}>Please input your Password 2!</div>),},]}>
                <Input.Password size="middle" prefix={<LockOutlined className={css.Title} />} type="password" placeholder="Confirm your password"/>
              </Form.Item>
              <Form.Item><div className={css.Login}><Button type="primary" htmlType="submit" className="login-form-button">Sign up</Button></div></Form.Item>
            </Form> 
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
export default Register;
