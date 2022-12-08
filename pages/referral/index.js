import {Badge,Button,Collapse,Descriptions,Divider,Empty,Form,Image,Input,InputNumber,message,Modal,Pagination,Result,Select,Spin,Table,Tooltip} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import {CaretRightOutlined,ArrowLeftOutlined,InfoCircleOutlined,CheckCircleOutlined,ExclamationCircleOutlined,} from "@ant-design/icons";
import axios from "axios";
import css from "./style.module.css";
import BasketContext from "../../context/basketContext/BasketContext";
import { Router, useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";
import Company from "../../components/Referral comp/Company";
import QuestionDetails from "../../components/Referral comp/QuestionDetails";
const { Panel } = Collapse; 
const { Option } = Select;
const Referral = () => {
  const basketContext = useContext(BasketContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [question, setQuestion] = useState(0);
  const [questionData, setQuestionData] = useState(0);
  const [questionArray, setQuestionArray] = useState([]);
  const [ques1, setQues1] = useState(0); 
  const [quesValue1, setQuesValue1] = useState(0); 
  // const [isModalVisibleCorporation, setIsModalVisibleCorporation] =useState(false);
  // const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const router = useRouter(); 
  // const [phoneState, setPhoneState] = useState();
  // const [addressState, setAddressState] = useState();
  const [spin, setSpin] = useState(false);
  // user Medeeleliig haruulj bga State
  // const [lusername, setlUsername] = useState();
  // const [llastname, setllastname] = useState();
  // const [lphone, setlphone] = useState();
  // const [lfirstname, setlfirstname] = useState();
  // const [lstate, setlstate] = useState();
  // const [lemail, setlemail] = useState();
  // const [laddress, setladdress] = useState();
  // const [introductionText, setIntroductionText] = useState(0);

  //  Company medeelel haruulj bga state
  // const [companyName, setCompanyName] = useState();
  // const [register, setRegister] = useState();
  // const [areasOfActivity, setAreasOfActivity] = useState();
  // const [telephone, setTelephone] = useState();
  // const [address, setAddress] = useState();
  // const [dateCompany, setDateCompany] = useState();

  // const [companyUserGet, setCompanyUserGet] = useState([]);
  // const [userInfoGet, setUserInfoGet] = useState([]);
  // const [CompanyListState, setCompanyListState] = useState([]);

  // //CompanyEdit Modal Input value
  // const [companyNameInput, setCompanyNameInput] = useState("");
  // const [additionalInformationInput, setAdditionalInformationInput] =
  //   useState("");
  // const [websiteInput, setWebSite] = useState("");
  // const [countryInput, setCountryInput] = useState("");
  // const [employeesInput, setEmployeesInput] = useState("");
  // const [totalAnnualRevenueInput, setTotalAnnualRevenue] = useState("");

  // const [companyPkIdInput, setCompanyPkIdInput] = useState();
  // const [insentive, setInsentive] = useState([]);
  // const [incentiveTotalPrice, setIncentiveTotalPrice] = useState(0);

  const [formUser] = Form.useForm();
  const [form] = Form.useForm();
  // const [spinState, setSpinState] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => { 
    userCompany();
  }, []);
  // const CorporationShowModal = () => {
  //   setIsModalVisibleCorporation(true);
  // };
  // const EditShowModal = (e) => {
  //   console.log("edit modal: ", e);

  //   setCompanyPkIdInput(e.PkId);

  //   setAdditionalInformationInput(e.additionalInformation);
  //   setCompanyNameInput(e.companyName);
  //   setCountryInput(e.country);
  //   setEmployeesInput(e.employees);
  //   setTotalAnnualRevenue(e.totalAnnualRevenue);
  //   setWebSite(e.website);

  //   setIsModalVisibleEdit(true);
  // };
  // const onFinishEdit = () => {
  //   setIsModalVisibleEdit(false);
  // };
  // const handleCancelEdit = () => {
  //   formUser.resetFields();
  //   setIsModalVisibleEdit(false);
  // };
const userCompany = () => {
//userPkId gaar awchirj bgn

// const body = {
//   func: "getCompany",
//   userPkId: localStorage.getItem("pkId"),
// };
// axios.post("/api/post/Gate", body).then((res) => {
//     setCompanyUserGet(res.data.data);
//   }).catch((err) => {console.log(err)});

  if (localStorage.getItem("pkId")) {
    const body = {
      func: "getUserInfo",
      pkId: localStorage.getItem("pkId"),
    };
    axios.post("/api/post/Gate", body).then((res) => { 
      console.log("user: ", res.data.data);
      setUserInfo(res.data.data);
      }).catch((err) => {console.log(err)});

  } else {
    console.log("null");
  } 

const question = {
  func:"getTypes",  
  parid:0,
  type_:3
}
axios.post("/api/post/Gate", question).then((res)=>{
  console.log("Header", res.data.data); 
  setQuestionData(res.data.data)
}).catch((err)=>{console.log("err", err)})
questions();

};
const questions = () =>{
// question 1
  const question1 = {
    func:"getTypes",  
    parid:32,
    type_:3
  }
  axios.post("/api/post/Gate", question1).then((res)=>{
    console.log("Header", res.data.data); 
    setQues1(res.data.data)
  }).catch((err)=>{console.log("err", err)})
}


  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log("cancel");
    formUser.resetFields();
    setIsModalVisible(false);
  };
  const genExtra = () => (
    <div className={css.StateCss}>
      <div className={css.StateIconCss}>
        {(lstate == 0) | (lstate == 1) ? (
          <ExclamationCircleOutlined style={{ color: "blue" }} />
        ) : lstate == 2 ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <ExclamationCircleOutlined style={{ color: "red" }} />
        )}
      </div>
      <div>
        {" "}
        State:{" "}
        {(lstate == 0) | (lstate == 1)
          ? "Pending.."
          : lstate == 2
          ? "Active"
          : "Canceled"}
      </div>{" "}
    </div>
  );

  const genExtraCompanyGet = (e) => (
    <div className={css.StateCss}>
      <div className={css.StateIconCss}>
        {e.state == 2 ? (
          <Badge status="warning" text="accept request" />
        ) : e.state == 3 ? (
          // medeelelee zas
          <Badge status="processing" text="Rejected your request.." />
        ) : e.state == 4 ? (
          // tuhain baiguulga baina
          <Badge status="error" text="Rejected your request" />
        ) : e.state == 5 ? (
          // others shaltgaana
          <Tooltip title={e.others}>
            <Badge status="error" text="Rejected your request" />
          </Tooltip>
        ) : e.state == 6 ? (
          <Badge status="processing" text="Invitation Send..." />
        ) : e.state == 7 ? (
          <Badge status="success" text="Organization Onboarded..." />
        ) : e.state == 8 ? (
          <Badge status="error" text="Canceled" />
        ) : e.state == 1 ? (
          <Badge status="processing" text="Request pending.." />
        ) : (
          ""
        )}
      </div>
      {/* <div>
        {" "}
        State:{" "}
        {(e.state == 0) | (e.state == 1)
          ? "Pending.."
          : e.state == 2
          ? "Active"
          : "Canceled"}
      </div>{" "} */}
    </div>
  );

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[
        {
          required: true,
          message: "Please select your  +976!",
        },
      ]}
    >
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+976">+86</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );
  const paginationFunc = (a, b) => {
    console.log("pagination", a, b);
  };
  const onFinish = (values) => {
    console.log("company: ", values);
    //company ilgeeh
    const body = {
      func: "companySend",
      userPkId: localStorage.getItem("pkId"), 
      totalAnnualRevenue: values.totalAnnualRevenue,
      companyName: values.companyName,
      country: values.country, 
      employees: values.employees,
      additionalInformation: values.additionalInformation,
      website: values.before + values.website + values.after,
      state: 1,
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Succes");
        userCompany();
        setIsModalVisibleCorporation(false);
      })
      .catch((err) => {
        message.error("Error");
      }); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors); 
  };

  const onFinishEditForm = (values) => {
    console.log("edit values: ", values);

    console.log("com ID: ", companyPkIdInput);

    const body = {
      func: "editCompany",
      pkId: companyPkIdInput, 
      additionalInformation: values.additionalInformationEdit,
      companyName: values.companyNameEdit,
      employees: values.employeesEdit,

      totalAnnualRevenue: values.totalAnnualRevenueEdit,
      website: values.websiteEdit,
      country: values.countryEdit,

      state: 6,
    };

    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Success");
        setIsModalVisibleEdit(false);
        userCompany();
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
    // axios
    //   .post("/api/post/company/companyUpdateUserEdit", body)
    //   .then((res) => {
    //     message.success("Succes");
    //     setIsModalVisibleEdit(false);
    //     userCompany();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error("Error");
    //   });
  };

  const onFinishFailedEdit = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors);
    // errorInfo.errorFields.forEach((element) => {
    //   console.log("elemetn===> ", element.errors);
    // });
  };
 
  const onFinishQuestion = (values) =>{
    console.log("values: ", values);
  }
const onFinishFailedQuestion = (err) =>{
    console.log("value", err);
}
  const onFinishUserSend = (values) => {
    // console.log("Received values of form: ", values);
    setSpin(true);
    const body = {
      func: "inviteUserUpd",
      pkId: localStorage.getItem("pkId"),
      firstname: values.firstname,
      jobtitle: values.jobtitle,
      lastname: values.lastname,
      phone: values.phone,
      state: 1,
    };
    axios.post("/api/post/Gate", body).then((res) => { 
        basketContext.getUserProfileFunction(); 
          setSpin(false);
          message.success("Success");
          userCompany();
          setIsModalVisible(false);   
        // setIntroductionText(1);
        // localStorage.setItem("introductionText", 1);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  const onFinishFailedUserSend = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const cancelCompany = () => {
    form.resetFields();
    setIsModalVisibleCorporation(false);
  };
 
  const selectBefore = (
    <Form.Item name="before" noStyle rules={[{required: true, message: "Please select your protal!"}]}>
    <Select className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
    </Form.Item>
  );
  const selectAfter = (
    <Form.Item name="after" noStyle rules={[{required: true, message: "Please select your dot!"}]}> 
    <Select className="select-after">
      <Option value=".com">.com</Option>
      <Option value=".mn">.mn</Option>
      <Option value=".io">.io</Option>
      <Option value=".org">.org</Option>
    </Select>
    </Form.Item>
  );
  const data = [
    {
      key: 1, 
      img: basketContext.userInfoProfile ?  basketContext.userInfoProfile.img : "",
      firstname: basketContext.userInfoProfile ?  basketContext.userInfoProfile.firstname : "",
      lastname: basketContext.userInfoProfile ?  basketContext.userInfoProfile.lastname : "",
      state: basketContext.userInfoProfile ?  basketContext.userInfoProfile.state : "",
      action: basketContext.userInfoProfile ?  basketContext.userInfoProfile.state : "",
    }];
const columns = [
    {
    title:<div className={css.TableTitle}>Image</div>,  
    dataIndex: 'img',
    key: 'img', 
    fixed: "left",
    width: 70,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div> 
            <Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{display: "flex", width: "30px", margin:"0px auto"}}/>
    </div>, 
    ellipsis: true,
    }, 
    {
    title: <div className={css.TableTitle}>First name</div>,
    dataIndex: 'firstname',
    key: 'firstname',  
    ellipsis: true,
    },
    {
    title: <div className={css.TableTitle}>Last name</div>,
    dataIndex: 'lastname',
    key: 'lastname',  
    // sorter: (a, b) => a.lastname.length - b.lastname.length, 
    ellipsis: true,
    }, 
    
    {
    title: <div className={css.TableTitle}>Status</div>,
    dataIndex: 'state',
    key: 'state', 
    fixed: "right",
    width: 90, 
    render: (a) => <div>
        {console.log("a", a)}
        {a == 1 ? (<Tooltip title="Request pending"><Badge status="processing" text="Request pending" style={{color: "rgb(24 144 255)", fontWeight: "600"}}/></Tooltip>) : 
        a == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
        a == 3 ? <Tooltip title="Rejected">  <Badge status="error" text="Rejected" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
        }
    </div>,   
    ellipsis: true,
    }, 

    {title: <div className={css.TableTitle}>Action</div>,   key: 'action', fixed: 'right', width: 140,
    render: (b) => <div className={css.ActionCss}>
         <div style={{display: "flex"}}> 
          {b.state == 3 ? <Button>Edit</Button> : ""}
         {/* <StatusChangeModal addItemStatus={b.state} addItemGetItems={getItems} />
         <ItemEdit addItemStatus={b.state} addItemGetItems={getItems} typeLevel={typeLevel}/>
         <ItemDel addItemStatus={b.state} addItemGetItems={getItems}/>  */}
        </div>   
    </div>,
    },
];
const onBlueFun = (e, b, c) =>{
  console.log("blur", e);
  console.log("b", b);
  console.log("c", c);
}
return (
<BaseLayout pageName="referral">
  <div className={css.LayoutRef}>
    <div className={css.DisplayLayout}>
 
{basketContext.userInfoProfile ? (
<>
{userInfo.state == 2 ? (
  // <div style={{ marginTop: "-30px" }}>
  //   <Result icon={ <Image style={{ marginBottom: "-24px" }}alt="Obertech" preview={false} src="/img/succcess.png" width={100}/>} 
  //     title="The user has been authenticated successfully" subTitle="You are now able to invite companies."/>
  // </div>
  ""
) : (
  <div className={css.Layout}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Divider orientation="left">User information</Divider> <Divider type="vertical" />
      <Tooltip title="More information on user invitations"><InfoCircleOutlined style={{ fontSize: "18px" }} /></Tooltip>
    </div>
    <div>

    {spin === true ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center"}}/> : ""}
      {userInfo.state === 1 ? (
        <div style={{ marginTop: "-30px" }}>
        <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/send4.png" width={100}/>} subTitle="Admin will check your request and reply soon." title="Your request has been sent to an administrator."/>

        <Table bordered size="small" columns={columns} dataSource={data}/>
        </div>
      ) : (
        <>
        <Button type="dashed" shape="round" onClick={showModal}>+ Information</Button>
        <div style={{ marginTop: "-30px" }}>
          {userInfo.state === 0 ? 
          <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/info.png" width={100}/>} subTitle="Then you will be able to invite company. " title="Fill in your details."/> :
          
          <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/info.png" width={100}/>} subTitle="Medeelelee zasnu. " title="Your request has been rejected"/>
          }
          

        </div>
        </>
      )}
<Modal title="Form for Affiliate" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={700}>
          <div> 
            {question === 0 ? 
            <div style={{padding: "0px 20px"}}>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Email: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.email}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Web site: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.website}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Country: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.countryregion}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>City: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.city}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Address: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.address}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Phone number: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.phone}</div>
              </div>
              <div className={css.FormAffiliate} style={{marginBottom: "10px"}}>
                <div className={css.FormTitle}>Job title: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.jobtitle}</div>
              </div>
              {basketContext.userInfoProfile.firstname === "-" ? 
              <div><Button onClick={()=> router.push("profile")}>Update</Button> </div>
              : <div>
                  <div> If you are a Standard member and wish to apply for the Affiliate Program, you will be requested to fill in the following forms.
                    <Button onClick={()=> setQuestion(1)} >Here</Button> </div> 
                  </div>
              } 
            </div> 
            : <div>  
                <div className={css.BackCss}> 
                  <Button onClick={()=> setQuestion(0)} size="small" type="link"> <ArrowLeftOutlined /></Button> 
                  <div className={css.Title}> Please fill in the questions below correctly?</div>
                </div>
                  <QuestionDetails />
              </div>}
          </div>
  {/* <Form form={formUser} name="normal_login" className={css.LoginForm} labelCol={{span: 6,}} wrapperCol={{span: 16,}}
    initialValues={{ 
      firstname: basketContext.userInfoProfile.firstname === "-" ? "" : basketContext.userInfoProfile.firstname,
      lastname: basketContext.userInfoProfile.lastname === "-" ? "" : basketContext.userInfoProfile.lastname,
      jobtitle: basketContext.userInfoProfile.lastname === "-" ? "" : basketContext.userInfoProfile.jobtitle,
      phone: basketContext.userInfoProfile.lastname === "-" ? "" : basketContext.userInfoProfile.phone,
    
    }} onFinish={onFinishUserSend} onFinishFailed={onFinishFailedUserSend}>

    <Form.Item label="First name" name="firstname" rules={[{required: true,message: "Please input your First name!",},]}>
      <Input placeholder={"First name:"}/>
    </Form.Item>
    <Form.Item label="Last name" name="lastname" rules={[{required: true,message: "Please input your Last name!",},]}>
      <Input placeholder={"Last name:"}/>
    </Form.Item> 
    <Form.Item label="Job title" name="jobtitle" rules={[{required: true,message: "Please input your Job title!",},]}>
      <Input placeholder={"Job title:"}/>
    </Form.Item> 
    <Form.Item label="Phone number"name="phone" rules={[{required: true,message: "Please input your Phone!",},]}>
      <Input placeholder={"Phone:"}/></Form.Item>
    <Form.Item><div className={css.Ok}><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div></Form.Item>
  </Form>  */}
</Modal>
    </div>
  </div>
)} 

{/* ----------------------------------------------- Company ------------------------------------------------------------------------------------------ */}

{userInfo.state == "2" ? (
<div className={css.Layout}>
<div style={{background: "#fff"}}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <Divider orientation="left">Organization list</Divider> <Divider type="vertical" />
    <Tooltip title="More information on company invitations"> <InfoCircleOutlined style={{ fontSize: "18px" }} /></Tooltip>
  </div>
  {/* {lstate == 2 ? ( */}
<div className={css.Corporation}>
  <Company />
{/* <Button type="dashed" shape="round" onClick={CorporationShowModal}>+ Corporation</Button> */}
{/* <Modal title="Corporation" closable={false} open={isModalVisibleCorporation}footer={null} >
<div>
  <Form form={form} name="basic" labelCol={{span: 9}}wrapperCol={{span: 16}} initialValues={{totalAnnualRevenue: 10000, before: "http://",after: ".com"}} onFinish={onFinish} onFinishFailed={onFinishFailed}autoComplete="off">
    <div><Button size="small" onClick={() => {form.resetFields();}}>Clear</Button></div>
    
    <Form.Item label="Company name" name="companyName" rules={[{required: true,message: "Please input your Web site!"}]}><Input /></Form.Item>

    <Form.Item label="Web site" name="website" rules={[{required: true,message: "Please input your Web site!"}]}>
      <Input addonBefore={selectBefore} addonAfter={selectAfter} placeholder="" />
    </Form.Item> 
    <Form.Item label="Country" name="country" rules={[{required: true, message: "Please input your Country!"}]}><Input /></Form.Item>

    <Form.Item label="How many employees" name="employees" rules={[{required: true,message: "Please input your employees!"}]}>
    <InputNumber addonBefore={<TeamOutlined />} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
    </Form.Item>

    <Form.Item label="Total annual revenue" name="totalAnnualRevenue" rules={[{ required: true, message:"Please input your Total annual revenue!",}]}>
      <InputNumber formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} 
      style={{width: "100%"}}
      /> 
    </Form.Item>

    <Form.Item label="Additional information" name="additionalInformation" rules={[{required: true,message:"Please input your Additional information!",},]}>
      <TextArea showCount allowClear/>
    </Form.Item>

    <Form.Item wrapperCol={{offset: 15,span: 16,}}>
      <Button style={{ marginRight: "10px" }}onClick={cancelCompany}>Cancel</Button>
      <Button type="primary" htmlType="submit">Send</Button></Form.Item>
  </Form>
</div>
</Modal> */}
</div>
<div className={css.ContainerCss}> 
  {/* <div>
  {companyUserGet.map((e, i) => (
  <div key={i}>
  <Collapse key={i} style={{ background: "#fff" }} bordered={true} expandIcon={({ isActive }) => ( <CaretRightOutlined rotate={isActive ? 90 : 0}/>)}>
  <Panel key={i} header={<div style={{fontWeight: "500",textTransform: "capitalize",}}>{e.companyName}</div>}extra={genExtraCompanyGet(e)}>
  <div className={css.Cont1}>
    <Descriptions key={i} title="Company Info" layout="vertical"bordered>
      <Descriptions.Item label="Company name:">{e.companyName}</Descriptions.Item>
      <Descriptions.Item label="Website:">{e.website}</Descriptions.Item>
      <Descriptions.Item label="Country">{e.country}</Descriptions.Item>
      <Descriptions.Item label="How many employees">{e.employees}</Descriptions.Item>
      <Descriptions.Item label="Total annual revenue">{e.totalAnnualRevenue}</Descriptions.Item>
      <Descriptions.Item label="Additional information">{e.additionalInformation}</Descriptions.Item>
      <Descriptions.Item label="Organization Id">{e.orgId}</Descriptions.Item>
      {e.others === null || e.others === "" ? ("") : ( <Descriptions.Item label="Others">{e.others}</Descriptions.Item>)}
    </Descriptions>

  <div>
  {e.state === 3 || e.state === 4 || e.state === 5 ? (
  <Button onClick={() => EditShowModal(e)}>Edit</Button>) : ("")}
  <Modal title="Edit" open={isModalVisibleEdit}footer={false}onOk={onFinishEdit}onCancel={handleCancelEdit}>
  <Form form={formUser} name="basic" labelCol={{span: 8}} wrapperCol={{span: 16,}}
  defaultValue={{
    companyNameEdit: companyNameInput,
    additionalInformationEdit:additionalInformationInput,
    countryEdit: countryInput,
    employeesEdit: employeesInput,
    totalAnnualRevenueEdit:totalAnnualRevenueInput,
    websiteEdit: websiteInput,
  }} onFinish={onFinishEditForm} onFinishFailed={onFinishFailedEdit} autoComplete="off"
  >
  <Form.Item label="Company name"name="companyNameEdit" rules={[{required: true,message:"Please input your Company name!"}]}><Input /></Form.Item>

  <Form.Item label="Web site" name="websiteEdit"
    rules={[{required: true,message:"Please input your Web site!",},]}><Input />
  </Form.Item>

  <Form.Item label="Country" name="countryEdit"
    rules={[ { required: true, message:"Please input your Country!",},]}><Input />
  </Form.Item>
  <Form.Item label="How many employees" name="employeesEdit"
    rules={[{required: true,message:"Please input your How many employees!",},]}>
    <Input addonBefore={prefixSelector} style={{width: "100%",}}/>
  </Form.Item>
  <Form.Item label="Total annual revenue" name="totalAnnualRevenueEdit"
    rules={[{required: true,message:"Please input your Total annual revenue!",}]}>
    <Input />
  </Form.Item>
  <Form.Item label="Additional information" name="additionalInformationEdit" rules={[{ required: true, message:"Please input your Additional information!",}]}>
      <Input />
  </Form.Item>

  <Form.Item wrapperCol={{offset: 8,span: 16,}}>
    <Button style={{ marginRight: "10px" }} onClick={() =>setIsModalVisibleEdit(false)}>Cancel</Button>
    <Button type="primary"htmlType="submit">Submit</Button>
  </Form.Item>
  </Form>
  </Modal>
  </div>
  </div>
    </Panel>
  </Collapse>
  </div>
  ))}
  </div> */}

{/* --------------------------------------------------Incentive============================================================= */}
{/* {spinState == true ? (<div><Spin /></div>) : ("")}
{insentive[0] ? (
<div className={css.InsentiveCon}>
  <div>
    <Divider orientation="left">
      <div style={{ display: "flex", alignItems: "center",}}>
        <Image alt="Obertech" preview={false} src="/img/incentive.png"style={{width: "45px",marginRight: "7px",background: "#fff",borderRadius: "20px",}}/>
        <div className={css.IncentiveText}>INCENTIVE</div>
      </div>
    </Divider>
  </div>
  <div className={css.InsentiveScroll}>
    {insentive.map((e, i) => (
      <div key={i} className={css.ContainerInvs}>
        <div className={css.DateCss}>{e.date} </div>
        <div className={css.FeeLayout}>
          <div className={css.ImgCss}><Image alt="Obertech" preview={false}src="/img/usdIcon.png.crdownload"/></div>
          <div className={css.FeeCompleted}>
            <div className={css.CoinCss}>$ {e.fee}</div>
            <div className={css.CompletedCss}>Completed</div>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className={css.TotalPriceCss}>Total price: {incentiveTotalPrice}$</div>
</div>
) : (
""
)} */}
</div>
</div>
</div>
) : (
  ""
)}
</>
) : (
""
)}

</div>
{/* <div className={css.Note}>
<Result
title="More information on company invitations"
extra={
  <Button type="primary" key="console">
    Go Console
  </Button>
}
/>
</div> */}
</div>
</BaseLayout>
  );
};
export default Referral;
