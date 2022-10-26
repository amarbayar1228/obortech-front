import BaseLayout from "../components/Layout/BaseLayout";
import { Badge, Button, Col, Divider, Input, Modal, Radio, Row, Select, Spin } from "antd";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import css from "./style.module.css";
import BasketContext from "../context/basketContext/BasketContext";
import { Footer } from "antd/lib/layout/layout";
import randomToken from "random-token";
import {ArrowRightOutlined,CheckOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { Router, useRouter } from "next/router";
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
export default function Home(props) {
  const { t } = useTranslation("organization");
  const [addItemStyle, setAddItemStyle] = useState([css.addItemStyle]);
  const basketContext = useContext(BasketContext);
  const [orgIdState, setOrgIdState] = useState("");
  const [orgError, setOrgError] = useState("");
  const [spin, setSpin] = useState(false);
  const [radioS,setRadioS] = useState("");
  const [value, setValue] = useState("");
  const router = useRouter(); 
  useEffect(() => { 
    tokenFunc(); 
  }, []);
  const tokenFunc = () =>{
    if(sessionStorage.getItem("item_key")){ 
  }else{ 
    var token = randomToken(16); 
    sessionStorage.setItem("item_key", token);
  } 
  }
  const onSearch = (value) => {
    setRadioS("");
    setSpin(true);
    setOrgError(""); 
    var tokenId = sessionStorage.getItem("item_key");
    const  body = {
      func: "findOrg",
      orgid: value,
      // userToken: tokenId,
    }
    if(value == ""){
      setSpin(false); 
      setOrgIdState("");
    }else {
      setSpin(true);
      axios.post("/api/post/Gate", body).then((res)=>{  
        if(res.data.data){
          // sessionStorage.setItem("orgId", res.data.data.map.name)
          console.log("search: ", res.data);
          setOrgIdState(res.data.data.map.name);
          // localStorage.setItem("orgId", res.data.data.map.name);
          setOrgError(""); 
          // basketContext.orgIdLocal(res.data.data.map.name);
          setSpin(false);
        }else { 
           setOrgIdState("");
           setOrgError(t("There is no organization id!!"));
          //  localStorage.setItem("orgId", "0");
           basketContext.orgIdLocal();
          setSpin(false);
        } 
      }).catch((err)=>{
        console.log("err", err);
      })
    }
   
  };
  const showConfirm = () => {
    confirm({
      title: 'Your chosen organization id?', icon: <ExclamationCircleOutlined />,
      content: <div style={{display: "flex", alignItems: "center"}}>Organization ID: <div style={{fontWeight: "700", paddingLeft: "5px"}}>{value} </div></div>,
  
      onOk() { 
        basketContext.orgIdLocal(value);
        router.push("/items")
      },
  
      onCancel() {
        setOrgError("");
        setOrgIdState(""); 
      },
    });
  };
  const handleChange = (value) => {
    console.log(value);
    if(value == 0){
      showConfirm();
    }

  };

  const onChangeRadio = (e) =>{ 
    setRadioS("a");
    setValue(e.target.value)
    
  }
  return (
    <div>
      <Head>
        <title>OBORTECH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="img/HeaderLogo.png" />
      </Head>
      <BaseLayout pageName="home" addItemStyle={addItemStyle}>
        <div className={css.SearchCss}>
          <div className={css.SearchInput}>
            <Divider style={{fontSize: "18px", color: "#000"}}>{t("Search of organizations")}</Divider>
            <Search placeholder={t("Enter your organization ID")} allowClear  size="large" onSearch={onSearch} enterButton />

              {orgIdState === "" ? spin ? <Spin className={css.SpinCss}/> : orgError === "" ? "" :  <div className={css.OrgError}>{orgError}</div> : 
              <>{spin ? <Spin className={css.SpinCss}/> : 
              <div className={css.OrgIdCss}>
                {/* {t("Organization name")} : <span className={css.SpanCss}>
              <Select defaultValue={orgIdState} style={{marginLeft: "10px",width: 150, fontSize: "17px"}}onChange={handleChange}>
                <Option value="0">{orgIdState}</Option> 
              </Select></span> */}

                <div className={css.Popcss}>  
                  <div className={css.TitleFlex}>
                    <Radio.Group onChange={onChangeRadio}> 
                      <Radio value={orgIdState}>
                        <div className={css.RadioFrame}>  {orgIdState}</div>
                      </Radio>  
                    </Radio.Group> 
                  </div>   
                </div> 
                {radioS === "a" ? <div className={css.BtnPop}> 
                    <Button  style={{ fontWeight: "500", color: "red", width: "100%"}} size="large" type="dashed" onClick={()=> showConfirm()}>Continue <ArrowRightOutlined /> </Button></div> : ""} 
              </div>}</>}  
 
          </div> 
        </div> 
      </BaseLayout>
    </div>
  );
}
