import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import axios from "axios";
import {Badge,Button,Descriptions,Divider,Empty,Input,message,Modal,Select,Popconfirm,Radio,Space,Spin,Tooltip,Alert,DatePicker,Segmented, Pagination,} from "antd";
import { Collapse } from "antd";
import css from "./style.module.css";
import { AppstoreOutlined,BarsOutlined,ExclamationCircleOutlined,} from "@ant-design/icons";
import { Tabs } from "antd";
import CompanyAcceptAdmin from "../../components/CompanyAcceptAdmin";
import UserAcceptAdmin from "../../components/UserAcceptAdmin";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { confirm } = Modal;
const { Option } = Select;
const Affiliate = () => {
  const [data, setData] = useState([]);
  const [getCompany, setGetCompany] = useState([]);
  const [isModalVisibleOrgId, setIsModalVisibleOrgId] = useState(false);
  const [orgId, setOrgId] = useState();
  const [spinState, setSpinState] = useState(true);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [value2, setValue2] = useState(1);
  const [getUserAcceptAllState, setGetUserAcceptAll] = useState([]);
  const [spinStateUserAccept, setSpinStateUserAccept] = useState(true);
  const [getCompanyAcceptAllState, setGetCompanyAcceptAll] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [spinStateCompanyAccept, setSpinStateCompanyAccept] = useState(true);
  const [spinStateComList, setSpinStateComList] = useState(true);
  const [othersState, setOthersState] = useState("-");
  const [isSuperAdmin, setIsSuperAdmin] = useState("");
  const [valuePercentage, setValuePercentage] = useState(1);
  const [value, setValue] = useState(2);
  const [isModalVisibleIncentive, setIsModalVisibleIncentive] = useState(false);
  const [incPercents, setIncPercentS] = useState("");
  const [incentivePercentState, setIncentivePercentState] = useState([]);
  const [dateState, setDateState] = useState("");
  const [spinReq, setReqSpin] = useState();
  const [segmentValue, setSegmentValue] = useState("accept");
  const [segmentValueUser, setSegmentValueUser] = useState("accept");
  const [pagiValue, setPagiValue]= useState(1);
  const [pagiValue2, setPagiValue2]= useState(1);
  const [pagiValue3, setPagiValue3]= useState(1);
  const showModalIncentive = () => {
    getIncentivePercent();
    setIsModalVisibleIncentive(true);
  };

  const handleOkIncentive = (e) => {
    console.log("value incentive %: ", value) + "huwi-aar";
    console.log("insentive input: ", incPercents);
    console.log("incentive: ", e);
    console.log("orgID: ", e.orgId);
    console.log("userPkId: ", e.userPkId);
    const body = {
      func: "setInsentive",
      insentive: incPercents,
      orgId: e.orgId,
      userId: e.userPkId,
      type_: value,
      operatorID: localStorage.getItem("pkId"),
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Success");
        setIsModalVisibleIncentive(false);
        getUsers();
        getCompanyUser();
        getUserAcceptAll();
        getCompanyAcceptAll();
        confirmCompanyList();
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("/api/post/company/companySentIncentive", body)
    //   .then((res) => {
    //     message.success("Success");
    //     getUsers();
    //     getCompanyUser();
    //     getUserAcceptAll();
    //     getCompanyAcceptAll();

    //     confirmCompanyList();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }; 
  const handleCancelIncentive = () => {
    setIsModalVisibleIncentive(false);
  };
  useEffect(() => {
    setIsSuperAdmin(localStorage.getItem("isSuperAdmin"));
    getUsers(); 
    // getCompanyUser();
    getUserAcceptAll();
    // getCompanyAcceptAll();
    confirmCompanyList();
  }, []);
  const modalOrganization = () => {
    setIsModalVisibleOrgId(true);
  };
  const onChange2 = (e) => {
    setValue2(e.target.value);
    setOthersState("-");
  };
  const handleChange2 = (value) => {};
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const onChange = (e) => {
    console.log("onchange insentive radio: ", e.target.value);
    setValue(e.target.value);
  };

  const handleOk2 = (e) => { 
    const body = {
      func: "setCompany",
      pkId: e.PkId,
      adminPkId: localStorage.getItem("pkId"),
      others: othersState,
      state: value2,
      orgId: "-", 
    };
    axios.post("/api/post/Gate", body).then((res) => {
      message.success("Success");
      // getUsers();
      getCompanyUser();
      // getUserAcceptAll();
      // getCompanyAcceptAll();
      // confirmCompanyList();
      setIsModalVisible2(false);
    }); 
  };

  const invitationBtn = (e) => {
    const body = {
      func: "setCompany",
      pkId: e.PkId,
      adminPkId: localStorage.getItem("pkId"),
      state: 6,
      others: "-",
      orgId: "-",
      // pkId: e.pkId,
      // adminToken: localStorage.getItem("pkId"),
      // others: othersState,
      // state: 6,
      //shine:
      // userToken: e.userToken
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Success");
        getUsers();
        getCompanyUser();
        getUserAcceptAll();
        getCompanyAcceptAll();

        confirmCompanyList();
        setIsModalVisible2(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post("/api/post/company/companyUpdateReq", body)
    //   .then((res) => {
    //     message.success("Success");
    //     getUsers();
    //     getCompanyUser();
    //     getUserAcceptAll();
    //     getCompanyAcceptAll();

    //     confirmCompanyList();
    //     setIsModalVisible2(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancelOrgId = () => {
    setIsModalVisibleOrgId(false);
  };

  const handleOkOrgId = (id) => {
    const body = {
      func: "setCompany",
      pkId: id.PkId,
      adminPkId: localStorage.getItem("pkId"),
      orgId: orgId,
      state: 7,
      others: "-",
      // userToken: id.userToken,
      // orgUserList: [{ insentive: value }],
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Success");
        getUsers();
        getCompanyUser();
        getCompanyAcceptAll();
        confirmCompanyList();
        setIsModalVisibleOrgId(false);
      })
      .catch((err) => {
        console.log(err);
        // message.error(err);
      });
    // axios
    //   .post("/api/post/company/companyUpdateOrgId", body)
    //   .then((res) => {
    //     message.success("Success");
    //     getUsers();
    //     getCompanyUser();
    //     getCompanyAcceptAll();
    //     confirmCompanyList();
    //     setIsModalVisibleOrgId(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // message.error(err);
    //   });
  };
  // hereglegchvvdin shineer ilgeesen batalgaajuulah hereglegchiin list
  const getUsers = () => {
    const body = {
      func: "getOperator",
      state: 1,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        console.log("get new req user: ", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {console.log(err)}); 
  };
 
  // Operatoruudiin batalgaajuulsan hereglegchvvd
  const getUserAcceptAll = () => {
    const body = {
      func: "acceptUsers",
      userToken: "all",
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        setSpinStateUserAccept(false);
        setGetUserAcceptAll(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // message.error(err);
      });
  };
  const userAcceptFunc = (id) => {
    console.log("id: ", id);
    const body = {
      func: "userAccept",
      pkId: id.pkId,
      userToken: localStorage.getItem("pkId"),
      state: 2,
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Success");
        getUsers();
      })
      .catch((err) => {
        console.log(err);
        // message.error(err);
      });
    // axios
    //   .post("/api/post/user/updateUserAdmin", body)
    //   .then((res) => {
    //     message.success("Success");
    //     getUsers();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // message.error(err);
    //   });
  };
  const userCanceledFunc = (id) => {
    const body = {
      pkId: id.pkId,
      userToken: localStorage.getItem("token"),
      state: 3,
    };
    // axios
    //   .post("/api/post/user/updateUserAdmin", body)
    //   .then((res) => {
    //     message.success("Success");
    //     getUsers();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // message.error(err);
    //   });
  };
  //===============================================================================
  // Operatoriin batalgaajuulsan company list / Accept companys
  const confirmCompanyList = () => { 
    setSpinStateComList(true);
    const body = {
      func: "getCompany",
      adminPkId: localStorage.getItem("pkId"),
      start: "0",
      count: "10",
    };
    axios.post("/api/post/Gate", body).then((res) => { 
        setSpinStateComList(false);
        setCompanyData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });  
  };
  // shineer urisan company-uud //new company request
  const getCompanyUser = () => {
    setSpinState(true);
    const body = {
      func: "getCompany",
      state: 1,
      start: 0,
      count: 10,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinState(false);
        setGetCompany(res.data.data);
        confirmCompanyList();
      }).catch((err) => {console.log(err)});
  };
 // Operatoriin batalgaajuuulsan company-uud // Admin's accept company
 const getCompanyAcceptAll = () => {
  setSpinStateCompanyAccept(true)
  const body = {
    func: "getCompany",
    state: "2,3,4,5,6,7,8,9",
    start: 0,
    count: 10,
  };
  axios.post("/api/post/Gate", body).then((res) => {
      setSpinStateCompanyAccept(false);
      setGetCompanyAcceptAll(res.data.data);
    }).catch((err) => {console.log(err)});
};
//==================================================================================
const showConfirm = (e) => { 
  confirm({ title: "Do you Want to accept these company?", icon: <ExclamationCircleOutlined />, content: "Some descriptions", 
    onOk() {
      const body = {
        func: "setCompany", pkId: e.PkId, adminPkId: localStorage.getItem("pkId"), orgId: "-", others: othersState, state: 2,
      };
      axios.post("/api/post/Gate", body).then((res) => {
        message.success("Success"); 
        getCompanyUser();  
      }); 
    }, 
    onCancel() {console.log("Cancel")},
  });
};
const segmentFunc = (a) => {
  console.log("ajilj bn ");
  setPagiValue(1);
  setPagiValue2(1);
  setSegmentValue(a);
  if(a == "accept"){
    setSpinStateComList(true);
    const body = {
      func: "getCompany", adminPkId: localStorage.getItem("pkId"), start: "0",count: "10",
    };
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinStateComList(false);
        setCompanyData(res.data.data);
      }).catch((err) => {console.log(err)});   
  }else if(a == "newCompany"){ 

    setSpinState(true);
    const body = { 
      func: "getCompany", state: 1, start: 0, count: 10,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinState(false);
        setGetCompany(res.data.data);
        // confirmCompanyList();
      }).catch((err) => {console.log(err)}); 
  }else if(a == "adminAccept"){
    setSpinStateCompanyAccept(true)
    const body = {
      func: "getCompany", state: "2,3,4,5,6,7,8,9", start: 0, count: 10,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinStateCompanyAccept(false);
        setGetCompanyAcceptAll(res.data.data);
      }).catch((err) => {console.log(err)});
  }
};
const segmentFuncUser = (a) => {
  console.log("ajilj bn ");
  setSegmentValueUser(a);
  // setPagiValue(1);
  // setPagiValue2(1);
  // setSegmentValue(a);
  // if(a == "accept"){
  //   setSpinStateComList(true);
  //   const body = {
  //     func: "getCompany", adminPkId: localStorage.getItem("pkId"), start: "0",count: "10",
  //   };
  //   axios.post("/api/post/Gate", body).then((res) => {
  //       setSpinStateComList(false);
  //       setCompanyData(res.data.data);
  //     }).catch((err) => {console.log(err)});   
  // }else if(a == "newCompany"){ 

  //   setSpinState(true);
  //   const body = { 
  //     func: "getCompany", state: 1, start: 0, count: 10,
  //   };
  //   axios.post("/api/post/Gate", body).then((res) => {
  //       setSpinState(false);
  //       setGetCompany(res.data.data);
  //       // confirmCompanyList();
  //     }).catch((err) => {console.log(err)}); 
  // }else if(a == "adminAccept"){
  //   setSpinStateCompanyAccept(true)
  //   const body = {
  //     func: "getCompany", state: "2,3,4,5,6,7,8,9", start: 0, count: 10,
  //   };
  //   axios.post("/api/post/Gate", body).then((res) => {
  //       setSpinStateCompanyAccept(false);
  //       setGetCompanyAcceptAll(res.data.data);
  //     }).catch((err) => {console.log(err)});
  // }
};
  const onChangeInsPercentage = (e) => {
    setValuePercentage(e.target.vaue);
  };
  const onChangeDate = (date, dateString) => {
    console.log("date", dateString);
    setDateState(dateString);
  };

  const getIncentivePercent = () => {
    // axios
    //   .post("/api/post/company/getIncentivePercent")
    //   .then((res) => {
    //     setIncentivePercentState(res.data);
    //     console.log("incent resdata: ", res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // message.error(err);
    //   });
  };
  const incentivePercentInput = (e) => {
    setIncPercentS(e.target.value);

  };

  // New Company request 2
  const paginationNewreqCom  = (page, count) =>{
    setPagiValue2(page);
    setPagiValue3(1);
    setSpinState(true);
    console.log("page: ", page +" count: "+count);
    const resultPage = 0;   
    if(page == 1){
      resultPage = 0;
      console.log("tentsv");
    }else {
      resultPage = page - 1; 
    } 
    resultPage = resultPage * count;  

   const body = {
    func: "getCompany",
    state: 1,
    start: resultPage,
    count: count,
  };
  axios
    .post("/api/post/Gate", body)
    .then((res) => {
      setSpinState(false);
      setGetCompany(res.data.data);
      confirmCompanyList();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  // Accept Companys
  const paginationAccComp  = (page, count) =>{
    setPagiValue(page);
    setPagiValue3(1);
    setSpinStateComList(true); 
    const resultPage = 0;   
    if(page == 1){
      resultPage = 0;
      console.log("tentsv");
    }else {
      resultPage = page - 1; 
    } 
    resultPage = resultPage * count;   
  const body = {
    func: "getCompany",
    adminPkId: localStorage.getItem("pkId"),
    start: resultPage,
    count: count,
  };
  axios.post("/api/post/Gate", body).then((res) => { 
      setSpinStateComList(false);
      setCompanyData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });  
  }
  const pagiAdminCom  = (page, count) =>{
    setPagiValue3(page);
    setSpinStateCompanyAccept(true) 
    console.log("page: ", page +" count: "+count);
    const resultPage = 0;   
    if(page == 1){
      resultPage = 0;
      console.log("tentsv");
    }else {
      resultPage = page - 1; 
    } 
    resultPage = resultPage * count; 

    const body = {
      func: "getCompany",
      state: "2,3,4,5,6,7,8,9",
      start: resultPage,
      count: count,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinStateCompanyAccept(false);
        setGetCompanyAcceptAll(res.data.data);
      }).catch((err) => {console.log(err)}); 
  }
  return (
    <BaseLayout pageName="affiliate">
      <div className={css.Split}>
        <div
          style={{background: "#fff",width: "800px",margin: "0px  auto ",}}>
          <Tabs defaultActiveKey="1">
            {/* User ============================================================================================================= */}
            <TabPane
              tab={<span style={{display: "flex",alignItems: "center",fontSize: "17px", fontWeight: "500"}}>User</span>}key="1">
                 <Segmented size="middle" block 
                    onChange={segmentFuncUser}
                    options={[
                      {label: "Accept user", value: "acceptUser"},
                      {label: "New user request",value: "newUserRequest"},
                      {label: "Admin's accept user", value: "adminAcceptUser"}]}/>

                    {segmentValueUser === "acceptUser" ? <div><UserAcceptAdmin /></div> 
                    : segmentValueUser === "newUserRequest" ?  
                    <div className={css.SplitSize}>
                    {data[0] ? (
                      <div>
                        <Collapse>
                          {data.map((e, i) => (
                            <Panel header={<div style={{fontWeight: "500",textTransform: "capitalize",}}>{e.lastname}</div>} key={i}
                              extra={
                                <div className={css.StateCss}>
                                  <div className={css.StateIconCss}>
                                    {e.state == 1 ? (<Badge status="processing" text="Request" />) : (<Badge status="success" text="Success" />)}
                                  </div> 
                                </div>
                              }>
                              <Descriptions title="User Info" layout="vertical" bordered size="small">
                                <Descriptions.Item label="Last Name">{e.lastname}</Descriptions.Item>
                                <Descriptions.Item label="First Name">{e.firstname}</Descriptions.Item>
                                <Descriptions.Item label="Email">{e.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
                                <Descriptions.Item label="Address" span={2}>{e.address}</Descriptions.Item>
                              </Descriptions>
                              <div style={{marginTop: "10px"}}><Button type="dashed" onClick={() => userAcceptFunc(e)}>Accept</Button>
                                <Button onClick={() => userCanceledFunc(e)} type="primary" danger style={{marginLeft: "10px"}}>Cancel</Button></div>
                            </Panel>
                          ))}
                        </Collapse>
                      </div>
                    ) : (<Empty />)}
                  </div>
                    : segmentValueUser === "adminAcceptUser" ? 
                    <div className={css.SplitSize}> 
                    {spinStateUserAccept === true ? (<div><Spin className={css.SpinCss} tip="Loading..." size="large"></Spin></div>) : ("")}
                    {getUserAcceptAllState[0] ? (
                      <div>
                        <Collapse>
                          {getUserAcceptAllState.map((e, i) => (
                            <Panel header={ <div style={{fontWeight: "500",textTransform: "capitalize", }}>{e.lastname}</div>}
                              key={i}
                              extra={
                                <div className={css.StateCss}>
                                  <div className={css.StateIconCss}>
                                    {e.state == 2 ? (<Badge status="success" text="Request accepted"/>
                                    ) : e.state == 3 ? (<Badge status="error" text="Reject" />) : ("")}
                                  </div> 
                                </div>
                              }>
                              <Descriptions title="User Info" layout="vertical" bordered size="small">
                                <Descriptions.Item label="Last Name">{e.lastname}</Descriptions.Item>
                                <Descriptions.Item label="First Name">{e.firstname}</Descriptions.Item>
                                <Descriptions.Item label="Email">{e.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
                                <Descriptions.Item label="Address" span={2}>{e.address}</Descriptions.Item>
                              </Descriptions>
                            </Panel>
                          ))}
                        </Collapse>
                      </div>
                    ) : (<Empty />)}
                  </div>
                    : ""}

              {/* <Tabs defaultActiveKey="3">   */}
                {/* <TabPane tab={<span>Accept user</span>} key="4">
                  <UserAcceptAdmin />
                </TabPane>  */}
                {/* <TabPane tab={<span>New User request</span>} key="5">
                  <div className={css.SplitSize}> 
                    {data[0] ? (
                      <div>
                        <Collapse>
                          {data.map((e, i) => (
                            <Panel header={<div style={{fontWeight: "500",textTransform: "capitalize",}}>{e.lastname}</div>} key={i}
                              extra={
                                <div className={css.StateCss}>
                                  <div className={css.StateIconCss}>
                                    {e.state == 1 ? (<Badge status="processing" text="Request" />) : (<Badge status="success" text="Success" />)}
                                  </div> 
                                </div>
                              }
                            >
                              <Descriptions title="User Info" layout="vertical" bordered>
                                <Descriptions.Item label="Last Name">{e.lastname}</Descriptions.Item>
                                <Descriptions.Item label="First Name">{e.firstname}</Descriptions.Item>
                                <Descriptions.Item label="Email">{e.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
                                <Descriptions.Item label="Address" span={2}>{e.address}</Descriptions.Item>
                              </Descriptions>
                              <div><Button type="dashed" onClick={() => userAcceptFunc(e)}>Accept</Button>
                                <Button onClick={() => userCanceledFunc(e)} type="primary" danger>Cancel</Button></div>
                            </Panel>
                          ))}
                        </Collapse>
                      </div>
                    ) : (<Empty />)}
                  </div>
                </TabPane> */}
                {/* <TabPane tab={<span>Admins accept user</span>} key="6">
                  <div className={css.SplitSize}> 
                    {spinStateUserAccept === true ? (
                      <div><Spin className={css.SpinCss} tip="Loading..." size="large"></Spin></div>
                    ) : ("")}
                    {getUserAcceptAllState[0] ? (
                      <div>
                        <Collapse>
                          {getUserAcceptAllState.map((e, i) => (
                            <Panel header={ <div style={{fontWeight: "500",textTransform: "capitalize", }}>{e.lastname}</div>}
                              key={i}
                              extra={
                                <div className={css.StateCss}>
                                  <div className={css.StateIconCss}>
                                    {e.state == 2 ? (<Badge status="success" text="Request accepted"/>
                                    ) : e.state == 3 ? (<Badge status="error" text="Reject" />) : ("")}
                                  </div> 
                                </div>
                              }>
                              <Descriptions title="User Info" layout="vertical" bordered>
                                <Descriptions.Item label="Last Name">{e.lastname}</Descriptions.Item>
                                <Descriptions.Item label="First Name">{e.firstname}</Descriptions.Item>
                                <Descriptions.Item label="Email">{e.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
                                <Descriptions.Item label="Address" span={2}>{e.address}</Descriptions.Item>
                              </Descriptions>
                            </Panel>
                          ))}
                        </Collapse>
                      </div>
                    ) : (<Empty />)}
                  </div>
                </TabPane> */}
              {/* </Tabs> */}
              
            </TabPane>
            {/* Company ================================================================================================= */}
            <TabPane
              tab={<span style={{display: "flex",alignItems: "center",fontSize: "17px", fontWeight: "500" }}>Company</span>}key="2"> 
              <div> 
              <Segmented size="middle" block 
                onChange={segmentFunc}
                options={[
                  {label: "Accept companys", value: "accept"},
                  {label: "New company request",value: "newCompany"},
                  {label: "Admin's accept company", value: "adminAccept"}]}/>
                  {segmentValue == "accept" ? 
                  <>
                  <div className={css.SplitSize}>
                          <div className={css.ScrollCss}>
                            {spinStateComList === true ? (
                              <div><Spin className={css.SpinCss} size="large"></Spin></div>) : ("")}
                            {companyData[0] ? (
                              <div>
                                <Collapse style={{ background: "#fff" }}>
                                  {companyData.map((e, i) => (
                                    <Panel header={<div style={{fontWeight: "500",textTransform: "capitalize",fontWeight: "500"}}>{e.companyName}</div>}
                                  key={i}
                                  extra={
                                    <div className={css.StateCss}>
                                      <div className={css.StateIconCss}>
                                        {e.state == 2 ? (<Badge status="warning" text="Request accepted"/>
                                        ) : e.state == 3 ? (<Badge status="processing" text="Info edit.."/>
                                        ) : e.state == 4 ? (<Badge status="error" text="Rejected"/>
                                        ) : e.state == 5 ? (<Tooltip title={e.others}><Badge status="processing" text="Request pending.."/></Tooltip>
                                        ) : e.state == 6 ? (<Badge color="purple" status="processing" text="Invitation Send..."/>
                                        ) : e.state == 7 ? (<Badge color="cyan"  status="processing" text="Organization Onboarded..."/>
                                        ) : e.state == 8 ? (<Badge status="error" text="Canceled"/>
                                        ) : (<Badge status="default" text="..." />)}
                                      </div>
                                    </div>
                                  }
                                >
                                <div className={css.Cont1}>
                                  <Descriptions title="" layout="vertical" bordered className={css.InfoComp} size="small">
                                    <Descriptions.Item label="Company name:"><div className={css.CpName}>{e.companyName}</div></Descriptions.Item>
                                    <Descriptions.Item label="Web site:">{e.website}</Descriptions.Item>
                                    <Descriptions.Item label="Country">{e.country}</Descriptions.Item>
                                    <Descriptions.Item label="How many employees">{e.employees}</Descriptions.Item>
                                    <Descriptions.Item label="Total annual revenue">{e.totalAnnualRevenue}</Descriptions.Item>
                                    <Descriptions.Item label="Additional information">{e.additionalInformation}</Descriptions.Item>
                                    {e.orgId === "-" ? "" : <Descriptions.Item label="Organization Id"><div style={{color: "red", background: "rgb(56 189 248)", color: "rgb(224 242 254)", padding: "7px 20px"}}>{e.orgId}</div></Descriptions.Item> } 
                                  </Descriptions>
                                  {e.others === null ||
                                  e.others === "-" ||
                                  e.state === 6 ? ("") : (
                                    <div style={{width: "96%",margin: "15px auto"}}>
                                      <Alert message="Informational Notes" description={e.others} type="info" showIcon className={css.AlertInfo}/>
                                    </div>
                                  )}
                                  {e.orgId === "-" ? (
                                    <div style={{ marginTop: "5px" }}>
                                      <Modal title="Organization" visible={isModalVisibleOrgId} onOk={() => handleOkOrgId(e)} onCancel={handleCancelOrgId}>
                                        <div>
                                          <Input onChange={(e) =>setOrgId(e.target.value)} placeholder="Org ID insert"/>
                                        </div>
                                      </Modal>
                                      {e.state === 6 ? ( <Button type="primary" style={{fontWeight: "500"}} onClick={modalOrganization}>OrgId insert</Button>
                                      ) : (<Button  className={css.InvinationCss} onClick={() => invitationBtn(e)}>Invintation send</Button>
                                      )}
                                      <Button type="primary" className={css.RejectBtn} onClick={showModal2}>Reject</Button>
                                      <Modal title="Reject" visible={isModalVisible2} onOk={() => handleOk2(e)} onCancel={handleCancel2}>
                                        <div>
                                          <Radio.Group onChange={onChange2} value={value2}>
                                            <Space direction="vertical">
                                              <Radio value={3}>Medeelel zas</Radio>
                                              <Radio value={4}>Rejected</Radio> 
                                              <Radio value={5}> More... {value2 === 5 ? ( <Input onChange={(e) =>setOthersState(e.target.value)} style={{width: 100,marginLeft: 10,}}/>) : null}
                                              </Radio>
                                            </Space>
                                          </Radio.Group>
                                        </div>
                                      </Modal>
                                    </div>
                                  ) : (
                                    <div>
                                      <Button onClick={showModalIncentive}>Incentive</Button>
                                      <Modal title="Incentive" visible={isModalVisibleIncentive} onOk={() => handleOkIncentive(e)} onCancel={handleCancelIncentive}>
                                        <div>
                                          <span>Incentive choose: </span>
                                          <div>
                                            <Radio.Group onChange={onChange} value={value}>
                                              <Space direction="vertical">
                                                <Radio value={1}>huwi</Radio>
                                                <Radio value={2}>Dollar</Radio>
                                                <Radio value={3}>Coin</Radio></Space>
                                            </Radio.Group>
                                            <Input placeholder="incenitve percent" onChange={incentivePercentInput}/>
                                          </div>
                                        </div>
                                      </Modal>
                                    </div>
                                  )}
                                </div>
                              </Panel>
                            ))}
                          </Collapse>
                        </div>
                      ) : spinStateComList === true ? (
                        ""
                      ) : (
                        <Empty />
                      )}
                    </div>
                  </div>
                  <div>
                    <Pagination  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Company`} current={pagiValue} total={60} onChange={paginationAccComp} />
                  </div>
                 </>
                  : 
                  //  new company request =========================================================================================================================================
                   <> 
                    {segmentValue === "newCompany" ? 
                    <> 
                      <div className={css.SplitSize}>
                    {spinState === true ? (
                      <div><Spin className={css.SpinCss} size="large"></Spin></div>) : (<>
                        {getCompany[0] ? (
                          <div>
                            <Collapse style={{ background: "#fff" }}>
                              {getCompany.map((e, i) => (
                                <Panel header={<div style={{fontWeight: "500",textTransform: "capitalize",}}>{e.companyName}</div>}key={i}
                                  extra={
                                    <div className={css.StateCss}><div className={css.StateIconCss}>{e.state == 1 ? (<Badge status="processing" text="New request"/>) : (<Badge status="success"text="Success"/>)}</div></div>}>
                                  <div className={css.Cont1}>
                                    <Descriptions title="" layout="vertical" bordered size="small">
                                      <Descriptions.Item label="Company name:">{e.companyName}</Descriptions.Item>
                                      <Descriptions.Item label="Website:">{e.website}</Descriptions.Item>
                                      <Descriptions.Item label="Country">{e.country}</Descriptions.Item>
                                      <Descriptions.Item label="How many employees">{e.employees}</Descriptions.Item>
                                      <Descriptions.Item label="Total annual revenue">{e.totalAnnualRevenue}</Descriptions.Item>
                                      <Descriptions.Item label="Additional information">{e.additionalInformation}</Descriptions.Item>
                                      {e.orgId === "-" ? "" : <Descriptions.Item label="Organization Id"><div style={{color: "red", background: "rgb(56 189 248)", color: "rgb(224 242 254)", padding: "7px 20px"}}>{e.orgId}</div></Descriptions.Item> }
                                    </Descriptions>
                                      <div style={{ marginTop: "5px" }}>
                                        <Button type="primary" onClick={() => showConfirm(e)}>Accept Request </Button>
                                        <Button type="primary" danger style={{ marginLeft: "10px" }} onClick={showModal2}>Reject</Button>
                                      <Modal title="Reject" visible={isModalVisible2} onOk={() => handleOk2(e)} onCancel={handleCancel2}>
                                        <div>
                                          <Radio.Group onChange={onChange2}value={value2}>
                                            <Space direction="vertical">
                                              <Radio value={3}>Medeelel zas</Radio>
                                              <Radio value={4}>Reject </Radio> 
                                              <Radio value={5}>
                                                More... {value2 === 5 ? (<Input onChange={(e) =>setOthersState(e.target.value)}style={{width: 100,marginLeft: 10,}}/>) : null}
                                              </Radio>
                                            </Space>
                                          </Radio.Group>
                                        </div>
                                      </Modal>
                                    </div>
                                  </div>
                                </Panel>
                              ))}
                            </Collapse>
                          </div>
                        ) : (<Empty />)} </>
                    )}
                      </div>
                      <div>
                          <Pagination showTitle={true} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Company`}  current={pagiValue2} total={60} onChange={paginationNewreqCom} />
                      </div>
                    </> 
                    :
                    <> 
                          {/* Admin's accept company ==========================================================================================================================*/}
                          <div className={css.SplitSize}>
                          {spinStateCompanyAccept === true ? (
                            <div> <Spin className={css.SpinCss} size="large"></Spin></div>) : ("")}
                          {getCompanyAcceptAllState[0] ? (
                            <div>
                              <Collapse style={{ background: "#fff" }}>
                                {getCompanyAcceptAllState.map((e, i) => (
                                  <Panel header={
                                          <div style={{fontWeight: "500",textTransform: "capitalize",}}>{e.companyName}</div>
                                          }key={i} extra={
                                      <div className={css.StateCss}>
                                        <div className={css.StateIconCss}>
                                          {e.state == 2 ? (<Badge status="warning" text="Request accepted"/>
                                          ) : e.state == 3 ? (<Badge status="processing"text="Rejected.."/>
                                          ) : e.state == 4 ? (<Badge status="error"text="Rejected"/>
                                          ) : e.state == 5 ? (<Tooltip title={e.others}><Badge status="processing"text="Others"/></Tooltip>
                                          ) : e.state == 6 ? (<Badge status="processing" text="Invitation Send..."/>
                                          ) : e.state == 7 ? (<Badge color="cyan" text="Organization Onboarded..."/>
                                          ) : e.state == 8 ? (<Badge status="error" text="Canceled" />) : (<Badge status="default" text="..." />)}
                                        </div> 
                                      </div>}>
                                    <div className={css.Cont1}>
                                      <Descriptions title="" layout="vertical"bordered size="small">
                                        <Descriptions.Item label="Company name:">{e.companyName}</Descriptions.Item>
                                        <Descriptions.Item label="Website:">{e.website}</Descriptions.Item>
                                        <Descriptions.Item label="Country">{e.country}</Descriptions.Item>
                                        <Descriptions.Item label="How many employees">{e.employees}</Descriptions.Item>
                                        <Descriptions.Item label="Total annual revenue">{e.totalAnnualRevenue}</Descriptions.Item>
                                        <Descriptions.Item label="Additional information">{e.additionalInformation}</Descriptions.Item>
                                        {e.orgId === "-" ? "" : <Descriptions.Item label="Organization Id"><div style={{color: "red", background: "rgb(56 189 248)", color: "rgb(224 242 254)", padding: "7px 20px"}}>{e.orgId}</div></Descriptions.Item> }
                                      </Descriptions>
                                      {e.others === "-" ? "" : <Alert message="Informational Notes" description={e.others} type="info" showIcon className={css.AlertInfo}/> } 
                                    </div>
                                  </Panel>
                                ))}
                              </Collapse>
                            </div>
                          ) : (
                            <Empty />
                          )}
                          </div>
                          <div>
                          <Pagination showTitle={true} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} Company`}  current={pagiValue3} total={60} onChange={pagiAdminCom} />
                      </div>
                          </>
                          }
                    </>
                   } 
              </div>   
            </TabPane> 
          </Tabs> 
        </div>
      </div>
    </BaseLayout>
  );
};
export default Affiliate;
