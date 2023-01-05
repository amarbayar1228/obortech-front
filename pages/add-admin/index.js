import {Avatar,Badge,Button,Collapse,Descriptions,Divider,Empty,Form,Input,message,Modal,Radio,Segmented,Table, Tooltip} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import {AndroidOutlined,EditOutlined,LockOutlined,UserOutlined} from "@ant-design/icons";
const { Panel } = Collapse;
import { Tabs } from "antd";
import sha256 from "sha256";
import ReCAPTCHA from "react-google-recaptcha";
const AddAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const [adminList, setAdminList] = useState([]);
  const [dialogState, setDialogState] = useState("a"); 
  const [incentPkId, setIncentPkId] = useState("");
  const [userFormCapt, setUserFormCapt] = useState(true); 
  const recaptchaRef = useRef();
  const [formAddadmin] = Form.useForm();
  const [formLogin] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [showInc, setShowInc] = useState(false); 
  const showModal = (a) => {
    console.log("neeesen: ", a);
    setDialogState(a);
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
        setUserFormCapt(true);
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

  const data = adminList.map((r, i)=>(
    {
      key: i,
      firstname: r.firstname,
      lastname: r.lastname,
      email: r.email, 
      phone: r.phone,
      status: r, 
    } 
));
const columns = [
    // {
    // title: 'Date',
    // dataIndex: 'date',
    // key: 'date', 
    // width: 100,
    // fixed: 'left', 
    // ...getColumnSearchProps('date'), 
    // filteredValue: filteredInfo.date || null,
    // onFilter: (value, record) => record.date.includes(value),
    // // sorter: (a, b) => a.date.length - b.date.length,
    // sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
    // ellipsis: true,
    // },
    {
    title: 'First name',
    dataIndex: 'firstname',
    key: 'firstname',  
    ellipsis: true,
    },
    {
    title: 'Last name',
    dataIndex: 'lastname',
    key: 'lastname', 
    ellipsis: true,
    },
    {
    title: 'Email',
    dataIndex: 'email',
    key: 'email', 
    ellipsis: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone', 
      ellipsis: true,
    },     
    {title: 'Status', key: 'status', fixed: 'right', width: 75,
    render: (b) => <div className={css.ActionCss}>
         <div style={{display: "flex"}}>   
           Operator
        </div>   
    </div>,
    },
    {title: 'Action', key: 'action', fixed: 'right', width: 70,
    render: (b) => <div className={css.ActionCss}>
         <div style={{display: "flex"}}>   
            <Tooltip title="Edit"><Button size="small" className={css.BtnRight}   icon={<EditOutlined />}></Button> </Tooltip>
        </div>   
    </div>,
    },
];
const onFinish2 = (v) => {
  console.log('Finish:', v);
  
   const pass = sha256(v.password);
   if(localStorage.getItem("pz2r3t5") === pass){
    console.log("bolsn");
    setShowInc(true);
    setUserFormCapt(true);
    message.success("Success");
   }else{
    message.error("Error")
   }
  // sha256
};
const onChangeCaptcha = (a) =>{ 
  console.log("captcha change: ", a);
  a == null ? setUserFormCapt(true) : setUserFormCapt(false);
}
const errorCapt = (err) =>{
  console.log("err", err);
}

  return (
    <BaseLayout pageName="add-admin"> 
  <div className={css.Layout}>
  {showInc === false ?
      <div>
        <div> <Divider orientation="left" > You must log in </Divider></div>
      <Form form={formLogin} name="horizontal_login" layout="inline" onFinish={onFinish2}>
        <Form.Item name="username" rules={[{required: true, message: 'Please input your username!'}]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: 'Please input your password!'}]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
        </Form.Item>
       
        <Form.Item shouldUpdate>{() => (<Button type="primary" htmlType="submit" disabled={userFormCapt}>Log in</Button>)}
        </Form.Item>
      </Form>
      <div style={{marginBottom: "20px", marginTop: "20px"}}>
            <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef} sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
        </div>
    </div>
    : 
<Tabs   defaultActiveKey="4" items={["a"].map((Icon, i) => {  
return {label: i=== 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Add Operator </div> : i === 1 ?
  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Incenitve </div> :  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}> Coupon</div>, 
  key: i, children: i === 0? 
     <div>
        <div>
              <Button type="dashed" shape="round" onClick={() => showModal("add")} style={{fontSize: "14px", fontWeight: "500", marginBottom: "10px"}}>+ Add admin</Button>
              <Modal title="Add operator" open={isModalVisible} onCancel={handleCancel} footer={null}>
              <div>
              {dialogState === "add" ? (
                <div>
                  <Form layout="vertical" form={formAddadmin} name="normal_login" className={css.LoginForm} initialValues={{remember: true, }} labelCol={{span: 22,}} wrapperCol={{span: 24,}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    <div style={{marginBottom: "20px"}}>
                    <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                    </div>
                    <Form.Item>
                      <div className={css.Ok}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button" disabled={userFormCapt}>Add</Button></div>
                    </Form.Item>
                  </Form> 
                </div>
              ) : ""}
            </div>
          </Modal>
        </div>
        <div> <Table size="small" columns={columns} dataSource={data}   scroll={{y: 600 }} /></div>
      </div> 
      : i === 1 ? <div>Inccc</div> : i === 2 ? <div> null</div> : null,
};
})}/> 
}
    </div> 
    </BaseLayout>
  );
};
export default AddAdmin;
