import React, { useContext, useEffect, useState } from "react";
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
import BasketContext from "../../context/basketContext/BasketContext";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { confirm } = Modal;
const { Option } = Select; 
const Affiliate = () => {
  
const [value, setValue] = useState(2);
const [isModalVisibleIncentive, setIsModalVisibleIncentive] = useState(false);
const [incPercents, setIncPercentS] = useState("");

const [segmentValue, setSegmentValue] = useState("newUserRequest");
const [segmentValueUser, setSegmentValueUser] = useState("acceptUser");
const [compLength, setCompanyLength] = useState(0);
const [userLength, setUserLength] = useState(0);
const [loggedLoad, setLoggedLoad]= useState(true);
const basketContext = useContext(BasketContext);
useEffect(()=>{
  setTimeout(()=>{
    setLoggedLoad(false); 
  },800);
  segmentFuncUser();
  segmentFunc();
},[])

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
    // const body = {
    //   func: "setInsentive",
    //   insentive: incPercents,
    //   orgId: e.orgId,
    //   userId: e.userPkId,
    //   type_: value,
    //   operatorID: localStorage.getItem("pkId"),
    // };
    // axios
    //   .post("/api/post/Gate", body)
    //   .then((res) => {
    //     message.success("Success");
    //     setIsModalVisibleIncentive(false); 
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            // getUsers();  
            // setIsModalVisible2(false);
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
  
  
const segmentFunc = (a) => {  
  const body = {
    func: "getOperator",
    state: 1,
    };
    axios.post("/api/post/Gate", body).then((res) => {
 
    //   segmentFuncUser(); 
    console.log("new user: ", res.data.data);
    setUserLength(res.data.data.length);
   
    })
    .catch((err) => {console.log(err)}); 
  console.log("company", a);
  setSegmentValue(a);
  if(a == "accept"){
    console.log("accept company"); 
  }else if(a == "newCompany"){  
    console.log("newCompany company"); 
  }else if(a == "adminAccept"){ 
    console.log("adminAccept company"); 
  }else{
    setSegmentValue("newCompany")
  }
};
const segmentFuncUser = (a) => { 
  console.log("change: ", a);
  if(a == undefined){
    setSegmentValueUser("newUserRequest");
  }else { 
    setSegmentValueUser(a);
  } 
 
    const body = {
      func: "getCompany",
      state: 1,
      start: 0,
      count: 10,
  };
  axios.post("/api/post/Gate", body).then((res) => {
  console.log("new res.data: ", res.data.data.length); 
  setCompanyLength(res.data.data.length);
  }).catch((err) => {console.log(err)}); 

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
  
  
  return (
    <BaseLayout pageName="affiliate">
       {loggedLoad ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px"}}/> :
      <div className={css.Split}>
         {basketContext.userInfoProfile ?
        <div style={{background: "#fff",width: "97%",marginLeft: "20px"}}>
        <Tabs defaultActiveKey="4" 
          items={["a","a"].map((Icon, i) => {  
            return {
              label: i=== 0 ? "Users" : "Organizations",
              key: i,
              children: i === 0? <div>
                {/* ------------------------------user segment ----------------------------------- */}
              <Segmented size="middle" block  onChange={segmentFuncUser}
                options={[
                  {label: <div style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}><div style={{background: "red", borderRadius: "50%", fontSize: "11px", color: "#fff", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px"}}>{userLength}</div> New Requests  </div>, value: "newUserRequest"},
                  {label: "Accepted Users", value: "acceptUser"},
                       // {label: <Badge count={5} size="small" offset={[8, 1]}> New user request2 </Badge>,value: "newUserRequest"},
                          
                  {label: "All Users", value: "adminAcceptUser"}]}/>
                  {segmentValueUser === "acceptUser" ? <div><UserAcceptAdmin /></div> 
                  : segmentValueUser === "newUserRequest" ? <div className={css.SplitSize}><div><NewUserRequest/> </div></div> 
                  : segmentValueUser === "adminAcceptUser" ?<div className={css.SplitSize}> <AdminAcceptUser /> </div>: ""}
              </div> 
              :   
              <div> 
                      {/* ------------------------------Company segment ----------------------------------- */}
              <Segmented size="middle" block onChange={segmentFunc}
                options={[
                          {label: <div style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}><div style={{background: "red", borderRadius: "50%", fontSize: "11px", color: "#fff", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "5px"}}>{compLength}</div> New Requests  </div>,value: "newCompany"},
                          {label: "Accepted Organizations", value: "accept"},
                          
                          {label: "All Organizations", value: "adminAccept"}]}/>
                  {segmentValue == "accept" ?   
                  <div className={css.SplitSize}> <AcceptCompanys /></div>  
                  :  
                   <> 
                    {segmentValue === "newCompany" ?  
                      <div className={css.SplitSize}> <NewCompanyRequest /></div>  
                    : 
                      <div className={css.SplitSize}><AdminAcceptCompany /></div>
                      }
                    </>
                   } 
                </div>,
            };
          })}
        />
 
        </div>
        : <Empty style={{margin: "30px auto"}}/> }
      </div> 
      }
    </BaseLayout>
  );
};
export default Affiliate;
