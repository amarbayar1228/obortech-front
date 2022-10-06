import {Avatar,Badge,Button,Collapse,Descriptions,Divider,Empty,Form,Input,message,Modal,Radio,Segmented,Table} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import {AndroidOutlined,AppleOutlined,LockOutlined,UserOutlined} from "@ant-design/icons";
const { Panel } = Collapse;
import { Tabs } from "antd";
import sha256 from "sha256";
const AddAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [dialogState, setDialogState] = useState("a");
  const [incentivePercentInput, setIncentivePercentInput] = useState(0);
  const [incentivePercentState, setIncentivePercentState] = useState([]);
  const [incentPkId, setIncentPkId] = useState("");
  const [formAddadmin] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    // getIncentivePercent();
    getAdmins();
  }, []);
 
  const handleCancel = () => {
    formAddadmin.resetFields();
    setIsModalVisible(false);
  };
  const getAdmins = () => {
    const body = {
      func: "getOperator",
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        setAdminList(res.data.data);
        console.log("operator: ", res.data);
      })
      .catch((err) => {
        message.error(err);
      });
  }; 
 const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // console.log("shaa: ", sha256(password));
    var passwordHash = sha256(values.password);
    console.log("sha256: ", passwordHash);
    const body = {
      func: "newOperator",
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: passwordHash,
      isSuperAdmin: 2,
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        console.log("res", res);
        message.success("Successfully Registered");
        formAddadmin.resetFields();
        getAdmins();
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <BaseLayout pageName="add-admin"> 
        <div className={css.Layout}>

        <Tabs defaultActiveKey="2"
          items={["a","a"].map((Icon, i) => { 
            const labelName = "";
            i === 0 ? labelName = "Add operator" : labelName="Incentive add"
            const content = "";
            if(i == 0){
              content = <div>
                  <div>
                    <Button type="dashed" shape="round" onClick={() => showModal("add")} style={{fontSize: "15px", fontWeight: "500", marginBottom: "10px"}}>+ Add admin</Button>
                    <Modal title="Add operator" open={isModalVisible} onCancel={handleCancel} footer={null}>
                    <div>
                    {dialogState === "add" ? (
                      <div>
                        <Form form={formAddadmin} name="normal_login" className={css.LoginForm} initialValues={{remember: true, }} labelCol={{span: 6,}} wrapperCol={{span: 16,}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                          <Form.Item label="User name" name="username" rules={[{ required: true, message: "Please input your Username!"}]}>
                            <Input prefix={<UserOutlined className={css.IconCss} />} placeholder={"Username:"}/>
                          </Form.Item>
                          <Form.Item label="Password" name="password" rules={[{required: true,message: "Please input your Password!"}]}>
                            <Input prefix={<LockOutlined className={css.IconCss} />} placeholder={"Password:"}/>
                          </Form.Item>
                          <Form.Item label="Last name" name="lastname" rules={[{required: true,message: "Please input your Last name!"}]}>
                            <Input placeholder={"Last name:"} />
                          </Form.Item>
                          <Form.Item label="First name" name="firstname" rules={[ {required: true,message: "Please input your First name!"}]}>
                            <Input placeholder={"First name:"} />
                          </Form.Item>
                          <Form.Item label="Email" name="email" rules={[ { required: true, message: "Please input your Email!",type: "email"}]}>
                            <Input placeholder={"Email:"} />
                          </Form.Item>
                          <Form.Item>
                            <div className={css.Ok}><Button type="primary" htmlType="submit" className="login-form-button">Ok</Button></div>
                          </Form.Item>
                        </Form> 
                      </div>
                    ) : ""}
                  </div>
                </Modal>
              </div>
              <div className={css.AdminScroll}>
                {adminList[0] ? (
                  <div>
                    <Collapse>
                      {adminList.map((e, i) => (
                        <Panel header={<div style={{fontSize: "14px", fontWeight: "500", textTransform: "uppercase"}}> {e.firstname}</div>}key={i}>
                           <Descriptions title="Operator Info" layout="vertical" bordered   extra={<Button type="primary">Edit</Button>}  size="middle">
                            <Descriptions.Item label="First name">{e.firstname}</Descriptions.Item>
                            <Descriptions.Item label="Last name">{e.lastname}</Descriptions.Item>
                            <Descriptions.Item label="Status">
                              <Badge status="processing" text="Running" />
                            </Descriptions.Item> 
                            <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
                            <Descriptions.Item label="Email" span={2}>
                              {e.email}
                            </Descriptions.Item> 
                          </Descriptions>
                        </Panel>
                      ))}
                    </Collapse>
                  </div>) : (<Empty />)}
              </div>
              </div>
            }else if(i == 1){
              content = <div> Null </div>
            }
            return {
              label: (
                <span> <Icon /> {labelName} </span> 
              ),
              key: i,
              children: content,
            } 
          })}
        />
 
        </div> 
    </BaseLayout>
  );
};
export default AddAdmin;
