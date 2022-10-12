import { Badge, Collapse, Descriptions, Empty, Select, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { Tabs } from "antd";
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const ConfirmationList = () => {
  const [companyData, setCompanyData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [cancelData, setCancelDate] = useState([]);
  const [changeValue, setChangeValue] = useState("all");
  const [spinState, setSpinState] = useState(true);
  const [spinState2, setSpinState2] = useState(true);
  useEffect(() => {
    // confirmCompanyList();
    // if (changeValue == "all") {
    //   confirmUserList();
    // }
  }, []);
  // const confirmCompanyList = () => {
  //   setSpinState2(true);
  //   const body = {
  //     pkId: localStorage.getItem("pkId"),
  //   };
  //   axios
  //     .post("/api/post/company/confirmCompanyAdminList", body)
  //     .then((res) => {
  //       setSpinState2(false);
  //       setCompanyData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log("object");
  // };
  // const confirmUserList = () => {
  //   setSpinState(true);
  //   const body = {
  //     pkId: localStorage.getItem("pkId"),
  //   };
  //   axios
  //     .post("/api/post/user/confirmUserAdminList", body)
  //     .then((res) => {
  //       setSpinState(false);
  //       setUserData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleChange = (value) => {
    setChangeValue(value);
    if (value == "cancel") {
      getUserCancel();
    } else if (value == "all") {
      confirmUserList();
    }
  };
  const handleChange2 = (value) => {};
  const getUserCancel = () => {
    setSpinState(true);
    const body = {
      pkId: localStorage.getItem("pkId"),
    };
    axios
      .post("/api/post/user/confirmUserReqCancel", body)
      .then((res) => {
        setSpinState(false);
        setCancelDate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <BaseLayout pageName="confirmation-list">
      <div className={css.LayoutCss}>
        <div className={css.Split}>
          <div
            style={{
              background: "#fff",
              width: "800px",
              margin: "0px  auto ",
            }}
          >
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    User
                  </span>
                }
                key="1"
              >
                <div className={css.DivideCss}>
                  <div>
                    <Select
                      defaultValue="all"
                      style={{
                        width: 120,
                        marginLeft: "10px",
                      }}
                      onChange={handleChange}
                    >
                      <Option value="all">All</Option>
                      <Option value="cancel">Cancel</Option>
                    </Select>
                  </div>
                  <div className={css.ScrollCss}>
                    {changeValue == "all" ? (
                      <>
                        {spinState2 === true ? (
                          <div>
                            <Spin
                              className={css.SpinCss}
                              tip="Loading..."
                              size="large"
                            ></Spin>
                          </div>
                        ) : (
                          ""
                        )}
                        {userData[0] ? (
                          <div>
                            <Collapse>
                              {userData.map((e, i) => (
                                <Panel
                                  header={
                                    <div
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {e.firstname}
                                    </div>
                                  }
                                  key={i}
                                  extra={
                                    <div className={css.StateCss}>
                                      <div className={css.StateIconCss}>
                                        {e.state == 3 ? (
                                          <Badge status="error" text="Error" />
                                        ) : (
                                          <Badge
                                            status="success"
                                            text="Success"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  }
                                >
                                  <div className={css.Cont1}>
                                    <Descriptions
                                      title="User Info"
                                      layout="vertical"
                                      bordered
                                    >
                                      <Descriptions.Item label="Last Name">
                                        {e.lastname}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="First Name">
                                        {e.firstname}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Email">
                                        {e.email}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Phone">
                                        {e.phone}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label="Address"
                                        span={2}
                                      >
                                        {e.address}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </div>
                                </Panel>
                              ))}
                            </Collapse>
                          </div>
                        ) : spinState2 === true ? (
                          ""
                        ) : (
                          <Empty />
                        )}
                      </>
                    ) : (
                      <>
                        {cancelData[0] ? (
                          <div>
                            {spinState2 === true ? (
                              <div>
                                <Spin
                                  className={css.SpinCss}
                                  tip="Loading..."
                                  size="large"
                                ></Spin>
                              </div>
                            ) : (
                              ""
                            )}
                            <Collapse>
                              {cancelData.map((e, i) => (
                                <Panel
                                  header={
                                    <div
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {e.firstname}
                                    </div>
                                  }
                                  key={i}
                                  extra={
                                    <div className={css.StateCss}>
                                      <div className={css.StateIconCss}>
                                        {e.state == 3 ? (
                                          <Badge status="error" text="Error" />
                                        ) : (
                                          <Badge
                                            status="error"
                                            text="Success"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  }
                                >
                                  <div className={css.Cont1}>
                                    <Descriptions
                                      title="User Info"
                                      layout="vertical"
                                      bordered
                                    >
                                      <Descriptions.Item label="Last Name">
                                        {e.lastname}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="First Name">
                                        {e.firstname}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Email">
                                        {e.email}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="Phone">
                                        {e.phone}
                                      </Descriptions.Item>
                                      <Descriptions.Item
                                        label="Address"
                                        span={2}
                                      >
                                        {e.address}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </div>
                                </Panel>
                              ))}
                            </Collapse>
                          </div>
                        ) : spinState2 == true ? (
                          ""
                        ) : (
                          <Empty />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    Company
                  </span>
                }
                key="2"
              >
                <div className={css.DivideCss}>
                  <div>
                    <Select
                      value="all"
                      style={{
                        width: 120,
                        marginLeft: "10px",
                      }}
                      onChange={handleChange2}
                    >
                      <Option value="all">All</Option>
                      <Option value="jack">Jack</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </div>
                  <div className={css.ScrollCss}>
                    {spinState === true ? (
                      <div>
                        <Spin
                          className={css.SpinCss}
                          tip="Loading..."
                          size="large"
                        ></Spin>
                      </div>
                    ) : (
                      ""
                    )}
                    {companyData[0] ? (
                      <div>
                        <Collapse>
                          {companyData.map((e, i) => (
                            <Panel
                              header={
                                <div
                                  style={{
                                    fontWeight: "500",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {e.companyName}
                                </div>
                              }
                              key={i}
                              extra={
                                <div className={css.StateCss}>
                                  <div className={css.StateIconCss}>
                                    {e.state == 3 ? (
                                      <Badge status="error" text="Error" />
                                    ) : (
                                      <Badge status="success" text="Success" />
                                    )}
                                  </div>
                                </div>
                              }
                            >
                              <div className={css.Cont1}>
                                <Descriptions
                                  title="Company Info"
                                  layout="vertical"
                                  bordered
                                >
                                  <Descriptions.Item label="Company name:">
                                    {e.companyName}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Register:">
                                    {e.register}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Areas Of Activity">
                                    {e.areasOfActivity}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Telephone">
                                    {e.telephone}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Date Company">
                                    {e.dateCompany}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Organization Id">
                                    {e.orgId}
                                  </Descriptions.Item>
                                </Descriptions>
                              </div>
                            </Panel>
                          ))}
                        </Collapse>
                      </div>
                    ) : spinState === true ? (
                      ""
                    ) : (
                      <Empty />
                    )}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
export default ConfirmationList;
