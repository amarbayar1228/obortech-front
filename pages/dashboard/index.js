import { useContext, useEffect } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { Button, Divider, message  } from "antd";
import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { PageHeader, Tag, Descriptions } from "antd";
import css from "./style.module.css";
import BasketContext from "../../context/basketContext/BasketContext";
import { useTranslation } from "next-i18next";
import Spinner from "../../components/Spinner";
const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const basketContext = useContext(BasketContext);
useEffect(() => {
  window.onpopstate = (event) =>{
   
    history.go(1)
    console.log("event", event);
    message.success("Back hiih gj bn ")
  }
}, []);

  return (
    <BaseLayout pageName="dashboard">
      <Divider orientation="left">

        <div className={css.Title}> {t("title")}</div>
      </Divider>

 {/* <div style={{margin: "100px"}}> <Spinner /></div> */}


      <div style={{width: "98%"}}>
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>

        <div>
          <br />
          <PageHeader
            onBack={() => window.history.back()}
            title="Title"
            tags={<Tag color="blue">Running</Tag>}
            subTitle="This is a subtitle"
            extra={[
              <Button key="3">Operation</Button>,
              <Button key="2">Operation</Button>,
              <Button key="1" type="primary">
                Primary
              </Button>,
            ]}
          >
            <Row>
              <Statistic title="Status" value="Pending" />
              <Statistic
                title="Price"
                prefix="$"
                value={568.08}
                style={{
                  margin: "0 32px",
                }}
              />
              <Statistic title="Balance" prefix="$" value={3345.08} />
            </Row>
          </PageHeader>
        </div>
      </div>
    </BaseLayout>
  );
};
export default Dashboard;
