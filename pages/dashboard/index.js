import { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { Button, Divider, Input, message, Typography  } from "antd";
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
  const [password, setPassword ] = useState("");
  const [stateToo, setStateToo] = useState("");
useEffect(() => {
  window.onpopstate = (event) =>{
   
    history.go(1)
    console.log("event", event);
    message.success("Back hiih gj bn ")
  }
}, []);
const func1 = () =>{
 
  const too = ["0","1","2"]; 
  const temdegt = ["#","!","%","."];
  console.log("pass: ", password);

   
  for(var i=0; i<=too.length; i++){ 
      for(var k=0; k<=password.length; k++){
          if(password[k] === too[i]){
            var aa = 256;  
          }else{ 
            if(aa === 256){ 
              // setStateToo("Too bn");
              var toobn = "toobn"; 
            }else{
              // setStateToo("ta zaawal too oruulna uu!!")
            } 
        }
      } 
  }

 
  if(toobn === undefined){
    console.log("temdegt bhq");
    setPassword("temdegt bhq bn")
  }else{
    console.log("temdegt bn");
    for(var z=0; z<=temdegt.length; z++){
      for(var t=0; t<=password.length; t++){
        if(password[t] ===  temdegt[z]){
            setPassword(...password, "temdegt bn");
        }else{
          setPassword("temdegt bhq");
        }
      }
    }
  }

}

  return (
    <BaseLayout pageName="dashboard">
      <Divider orientation="left">

        <div className={css.Title}> {t("title")}</div>
      </Divider>

 {/* <div style={{margin: "100px"}}> <Spinner /></div> */}

      <div>
        <Input placeholder="password"  onChange={(e)=> setPassword(e.target.value)}/>
        <Button onClick={func1} >Login</Button>
        {stateToo}
      </div>
      <div style={{width: "98%"}}>
        <div>
          
        </div>
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
