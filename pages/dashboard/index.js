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
    // message.success("Back hiih gj bn ")
  }
}, []);
 

  return (
    <BaseLayout pageName="dashboard">
      <Divider orientation="left">

        <div className={css.Title}> {t("title")}</div>
      </Divider>
 
      
      <div style={{width: "98%"}}>
      
        <div className={css.DashFlex}>
          <div className={css.Box}>
            <div className={css.Col1}>
              <div> 
                <div className={css.DPrice}>132,000.0₮</div>
                <div className={css.DMethod}>MNT</div>
              </div>
              <div className={css.DIcon}>
               ₮
              </div>
            </div>
            <div className={css.Col2}> 
              <div>Show</div>
              <div><Button type="primary" size="middle">Withdraw</Button></div>
            </div>
          </div> 
          <div className={css.Box}>
            <div className={css.Col1}>
              <div> 
                <div className={css.DPrice}>$26,000</div>
                <div className={css.DMethod}>USD</div>
              </div>
              <div className={css.DIcon}>
               $
              </div>
            </div>
            <div className={css.Col2}> 
              <div>Show</div>
              <div><Button type="primary" size="middle">Withdraw</Button></div>
            </div>
          </div> 
          <div className={css.Box}>
            <div className={css.Col1}>
              <div> 
                <div className={css.DPrice}>2600 Obot</div>
                <div className={css.DMethod}>COIN</div>
              </div>
              <div className={css.DIcon}>
               C
              </div>
            </div>
            <div className={css.Col2}> 
              <div>Show</div>
              <div><Button type="primary" size="middle">Withdraw</Button></div>
            </div>
          </div> 
        </div>

      </div>
    </BaseLayout>
  );
};
export default Dashboard;
