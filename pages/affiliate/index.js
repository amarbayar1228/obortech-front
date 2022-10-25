import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import axios from "axios";
import {Badge,Button,Descriptions,Divider,Empty,Input,message,Modal,Select,Popconfirm,Radio,Space,Spin,Tooltip,Alert,DatePicker,Segmented, Pagination,} from "antd";
import { Collapse } from "antd";
import css from "./style.module.css";
import { AppstoreOutlined,BarsOutlined,ExclamationCircleOutlined,} from "@ant-design/icons";
import { Tabs } from "antd";
import CompanyAcceptAdmin from "../../components/CompanyAcceptAdmin";
import UserAcceptAdmin from "../../components/Affiliate comp/UserAcceptAdmin";
import NewUserRequest from "../../components/Affiliate comp/NewUserRequest";
import AdminAcceptUser from "../../components/Affiliate comp/AdminAcceptUser";
import AcceptCompanys from "../../components/Affiliate company/AcceptCompanys";
import NewCompanyRequest from "../../components/Affiliate company/NewCompanyRequest";
import AdminAcceptCompany from "../../components/Affiliate company/AdminAcceptCompany";
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
  const [segmentValueUser, setSegmentValueUser] = useState("acceptUser");
  const [pagiValue, setPagiValue]= useState(1);
  const [pagiValue2, setPagiValue2]= useState(1);
  const [pagiValue3, setPagiValue3]= useState(1);
  var tabname = "User";
  var contentName = "con";
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
    console.log("Reject model: ", e);
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
    confirm({
      title: 'Do you want to Invintation send?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
  
      onOk() {
        console.log('OK');
        const body = {
          func: "setCompany",
          pkId: e.PkId,
          adminPkId: localStorage.getItem("pkId"),
          state: 6,
          others: "-",
          orgId: "-", 
        };
        axios.post("/api/post/Gate", body).then((res) => {
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
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
    
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
  };
  // hereglegchvvdin shineer ilgeesen batalgaajuulah hereglegchiin list
  const getUsers = () => {
    const body = {
      func: "getOperator",
      state: 1,
    };
    axios.post("/api/post/Gate", body).then((res) => {
      segmentFuncUser(); 
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
    // axios
    //   .post("/api/post/Gate", body)
    //   .then((res) => {
    //     message.success("Success"); 
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // message.error(err);
    //   }); 
  };
  const userCanceledFunc = (id) => { 
    const body = {
      func: "userAccept",
      pkId: id.pkId,
      userToken: localStorage.getItem("pkId"),
      state: 3,
    };
     axios.post("/api/post/Gate", body).then((res) => {
        message.success("Success"); 
        // getUsers();
      })
      .catch((err) => {
        console.log(err);
        // message.error(err);
      }); 
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
  console.log("change: ", a);
  if(a == undefined){
    setSegmentValueUser("acceptUser");
  }else { 
    setSegmentValueUser(a);
  }
  
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
        <div style={{background: "#fff",width: "90%",margin: "0px  auto ",}}>
        <Tabs
          defaultActiveKey="4" 
          items={["a","a"].map((Icon, i) => {  
            return {
              label: i=== 0 ? "User" : "Company",
              key: i,
              children: i === 0? <div>
              <Segmented size="middle" block 
                onChange={segmentFuncUser}
                options={[{label: "Accept user", value: "acceptUser"},
                          {label: "New user request",value: "newUserRequest"},
                          {label: "Admin's accept user", value: "adminAcceptUser"}]}/>
                  {segmentValueUser === "acceptUser" ? <div><UserAcceptAdmin /></div> 
                  : segmentValueUser === "newUserRequest" ? <div className={css.SplitSize}>
                      <div><NewUserRequest/> </div>
                  </div> 
                  : segmentValueUser === "adminAcceptUser" ?  
                  <div className={css.SplitSize}> 
                    <AdminAcceptUser /> </div>
                : ""}
              </div> 
              :   
              <div> 
              <Segmented size="middle" block onChange={segmentFunc}
                options={[
                          {label: "Accept companys", value: "accept"},
                          {label: "New company request",value: "newCompany"},
                          {label: "Admin's accept company", value: "adminAccept"}]}/>
                  {segmentValue == "accept" ?   
                  <div className={css.SplitSize}> <AcceptCompanys /></div>  
                  : 
                  //  new company request ======================================================================================================
                   <> 
                    {segmentValue === "newCompany" ?  
                      <div className={css.SplitSize}> 
                        <NewCompanyRequest />
                      </div>  
                    : 
                      <div className={css.SplitSize}>
                        <AdminAcceptCompany />
                      </div>
                      }
                    </>
                   } 
                </div>,
            };
          })}
        />
 
        </div>
      </div>
    </BaseLayout>
  );
};
export default Affiliate;
