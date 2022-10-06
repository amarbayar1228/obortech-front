import React, { useEffect, useState } from "react";
import { Badge, Collapse, Descriptions, Empty, Select, Spin } from "antd";
import axios from "axios";
import css from "./style.module.css";
const { Option } = Select;
const { Panel } = Collapse;
const CompanyAcceptAdmin = () => {
  const [companyData, setCompanyData] = useState([]);
  const [spinState, setSpinState] = useState(true);
  const [spinState2, setSpinState2] = useState(true);
  useEffect(() => {
    confirmCompanyList();
  }, []);
  const confirmCompanyList = () => {
    setSpinState2(true);
    const body = {
      pkId: localStorage.getItem("pkId"),
    };
    axios
      .post("/api/post/company/confirmCompanyAdminList", body)
      .then((res) => {
        setSpinState2(false);
        setCompanyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange2 = (value) => {
    // console.log("seleced ====>>>", value);
  };
  return (
    <div>
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
    </div>
  );
};
export default CompanyAcceptAdmin;
