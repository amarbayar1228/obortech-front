import { Badge, Collapse, Descriptions, Empty, Select, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { Tabs } from "antd";
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const UserAcceptAdmin = () => {
  const [userData, setUserData] = useState([]);
  const [cancelData, setCancelDate] = useState([]);
  const [changeValue, setChangeValue] = useState("all");
  const [spinState2, setSpinState2] = useState(true);
  useEffect(() => {
    console.log("user accept");
    if (changeValue == "all") {
      confirmUserList();
    }
  }, []);
  const confirmUserList = () => {
    setSpinState2(true);

    const body = {
      func: "acceptUsers",
      userToken: localStorage.getItem("pkId"),
    };
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinState2(false);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // message.error(err);
      }); 
  };
  const handleChange = (value) => {
    setChangeValue(value);
    if (value == "cancel") {
      getUserCancel();
    } else if (value == "all") {
      confirmUserList();
    }
  };
  const getUserCancel = () => {
    setSpinState2(true);
    const body = {
      pkId: localStorage.getItem("pkId"),
    };
    // axios
    //   .post("/api/post/user/confirmUserReqCancel", body)
    //   .then((res) => {
    //     setSpinState2(false);
    //     setCancelDate(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // message.error(err);
    //   });
  };
  return (
    <div className={css.DivideCss}>
      <div>
        <Select defaultValue="all" style={{ width: 120, marginLeft: "10px"}} onChange={handleChange}>
          <Option value="all">All</Option>
          <Option value="cancel">Cancel</Option>
        </Select>
      </div>
      <div className={css.ScrollCss}>
        {changeValue == "all" ? (
          <>
            {spinState2 === true ? (
              <div><Spin className={css.SpinCss} size="large"></Spin></div>) : ("")}
            {userData[0] ? (
              <div>
                <Collapse>
                  {userData.map((e, i) => (
                    <Panel header={ <div style={{ fontWeight: "500",textTransform: "capitalize"}}>{e.firstname}</div>
                      }key={i}
                      extra={
                        <div className={css.StateCss}>
                          <div className={css.StateIconCss}>{e.state == 3 ? (<Badge status="error" text="Reject" />) : (<Badge status="success" text="Request accepted" />)}</div>
                        </div>
                      }>
                      <div className={css.Cont1}>
                        <Descriptions title="User Info" layout="vertical" bordered size="small">
                          <Descriptions.Item label="Last Name">{e.lastname}</Descriptions.Item>
                          <Descriptions.Item label="First Name">{e.firstname}</Descriptions.Item>
                          <Descriptions.Item label="Email">{e.email}</Descriptions.Item>
                          <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
                          <Descriptions.Item label="Address" span={2}>{e.address}</Descriptions.Item>
                        </Descriptions>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            ) : spinState2 === true ? ("") : (<Empty />)}
          </>
        ) : (
          ""
          // <>
          //   {cancelData[0] ? (
          //     <div>
          //       {spinState2 === true ? (<div><Spin className={css.SpinCss}tip=""size="large"></Spin></div>) : ("")}
          //       <Collapse>
          //         {cancelData.map((e, i) => (
          //           <Panel header={<div style={{fontWeight: "500",textTransform: "capitalize",}}>{e.firstname}</div>}key={i}
          //             extra={
          //               <div className={css.StateCss}>
          //                 <div className={css.StateIconCss}>{e.state == 3 ? (<Badge status="error" text="Reject" />) : (<Badge status="success" text="Request Accepted" />)}</div>
          //               </div>
          //             }>
          //             <div className={css.Cont1}>
          //               <Descriptions title="User Info" layout="vertical" bordered>
          //                 <Descriptions.Item label="Last Name">{e.lastname}</Descriptions.Item>
          //                 <Descriptions.Item label="First Name">{e.firstname}</Descriptions.Item>
          //                 <Descriptions.Item label="Email">{e.email}</Descriptions.Item>
          //                 <Descriptions.Item label="Phone">{e.phone}</Descriptions.Item>
          //                 <Descriptions.Item label="Address" span={2}>{e.address}</Descriptions.Item>
          //               </Descriptions>
          //             </div>
          //           </Panel>
          //         ))}
          //       </Collapse>
          //     </div>
          //   ) : spinState2 == true ? ("") : (<Empty />)}
          // </>
        )}
      </div>
    </div>
  );
};
export default UserAcceptAdmin;
