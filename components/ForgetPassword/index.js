import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import css from "./style.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const ForgetPassword = (props) => {
  console.log("[props]", props);
  const [username, setUsername] = useState();
  const [backState, setBackState] = useState();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log("shaa: ", sha256(password));
    var passwordHash = sha256(password);

    const body = {
      func: "signIn",
      username: username,
      password: passwordHash,
    };
    // axios
    //   .post("/api/post/Gate", body)
    //   .then((res) => {
    //     if (res.data.data.username) {
    //       message.success(t("Success"));

    //       router.push("/login");
    //     } else {
    //       message.error("password");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err");
    //   });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const funcS = () => {
    props.forgotPassword("1");
  };
  return (
    <div>
      <div className={css.Back}>
        <div>
          <Button size="middle" onClick={funcS}>
            Back
          </Button>
        </div>
        <div className={css.Title}>Password change</div>
      </div>
      <div>
        <Form
          name="normal_login"
          className={css.LoginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username & Email!",
              },
            ]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              prefix={<UserOutlined className={css.IconCss} />}
              placeholder={"Email & Username:"}
            />
          </Form.Item>

          <Form.Item>
            <div className={css.Ok}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Ok
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
