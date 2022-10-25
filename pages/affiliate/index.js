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
 
  const [value, setValue] = useState(2);
  const [isModalVisibleIncentive, setIsModalVisibleIncentive] = useState(false);
  const [incPercents, setIncPercentS] = useState("");
 
  const [segmentValue, setSegmentValue] = useState("accept");
  const [segmentValueUser, setSegmentValueUser] = useState("acceptUser");
 
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
      })
      .catch((err) => {
        console.log(err);
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
  setSegmentValue(a);
  if(a == "accept"){
    console.log("accept company"); 
  }else if(a == "newCompany"){  
    console.log("newCompany company"); 
  }else if(a == "adminAccept"){ 
    console.log("adminAccept company"); 
  }
};
const segmentFuncUser = (a) => { 
  console.log("change: ", a);
  if(a == undefined){
    setSegmentValueUser("acceptUser");
  }else { 
    setSegmentValueUser(a);
  } 
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
      <div className={css.Split}>
        <div style={{background: "#fff",width: "90%",margin: "0px  auto ",}}>
        <Tabs
          defaultActiveKey="4" 
          items={["a","a"].map((Icon, i) => {  
            return {
              label: i=== 0 ? "User" : "Company",
              key: i,
              children: i === 0? <div>
                {/* ------------------------------user segment ----------------------------------- */}
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
                      {/* ------------------------------Company segment ----------------------------------- */}
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
