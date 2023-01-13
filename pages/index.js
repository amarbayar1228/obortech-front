import BaseLayout from "../components/Layout/BaseLayout";
import { Alert, Badge, Button, Col, Divider, Input, Modal, Radio, Result, Row, Select, Spin } from "antd";
import Head from "next/head";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import BasketContext from "../context/basketContext/BasketContext";
import { Footer } from "antd/lib/layout/layout";
import randomToken from "random-token";
import {ArrowRightOutlined,CheckOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { Router, useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha"; 
import Spinner from "../components/Spinner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import "antd/dist/antd.css";
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}


export default function Home(props) {
  const { t } = useTranslation("organization");
  const [addItemStyle, setAddItemStyle] = useState([css.addItemStyle]);
  const basketContext = useContext(BasketContext);
  const [orgIdState, setOrgIdState] = useState("");
  const [orgError, setOrgError] = useState("");
  const [spin, setSpin] = useState(false);
  const [radioS,setRadioS] = useState("");
  const [value, setValue] = useState("");
  const [btnDis, setBtnDis]= useState(true);
  const [valueError, setValueError] = useState(0);
  const [orgId, setOrgId] = useState(undefined);
  const [searchStatus, setSearchStatus] = useState("");
  const inputRef = useRef(null);
  const [orgNameMnEn, setOrgNameMnEn] = useState([]);
  // const [massive, setMassive] = useState([]);
  const sharedProps = {
    // style: {
    //   width: '100%',
    // },
    // defaultValue: 'Ant Design love you!',
    ref: inputRef,
  };

  const router = useRouter(); 
  useEffect(() => { 
    tokenFunc(); 
    // setMassive(massive =>({...massive, amraa: "bataa"}));
    // setMassive(massive =>({...massive, amraa: "boldoo"}));
    // setMassive([...massive, {bataa: "3"}]);
    // setMassive([...massive, {bataa: "4"}]);
    console.log("url",window.location.href);
  }, []);
 

  const tokenFunc = () =>{
    if(sessionStorage.getItem("item_key")){ 
  }else{ 
    var token = randomToken(16); 
    sessionStorage.setItem("item_key", token);
  } 
  }
  const onSearch = (value, b, c) => {  
    console.log("value: ", c);
    setBtnDis(true);
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
      inputRef.current.focus({
        cursor: 'start',
      });
      console.log("hooson bn ");
      setSearchStatus("error");
      setValueError(1);
      setSpin(false);
      setOrgIdState("");
    }else {
      setSearchStatus("");
      setOrgId(value);
      setValueError(0);
      setSpin(true);
      axios.post("/api/post/Gate", body).then((res)=>{  
        if(res.data.data){
          console.log("search: ", res.data);
          setOrgIdState(router.locale === "mn" ? res.data.data.map.local_name : res.data.data.map.name);
          setOrgError(""); 
          setSpin(false);
        }else { 
           setOrgIdState("");
           setOrgError(t("There is no organization id!!"));
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
    title: 'Your chosen organization name?', icon: <ExclamationCircleOutlined />,
    content: <div style={{display: "flex", alignItems: "center"}}>Organization name: <div style={{fontWeight: "700", paddingLeft: "5px"}}>{value} </div></div>,
    onOk() { 
      {console.log("orgID: ", basketContext.orgId)}
      basketContext.orgId === undefined ? null : basketContext.clearBasket()

      basketContext.orgIdLocal(value, orgId);


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
  const onChangeCaptcha = (a) =>{ 
    a == null ? (setBtnDis(true),  setValue(""), setRadioS("")) : setBtnDis(false)
  }
  const searchChangeFunc = () =>{
    // console.log("end");
    setSearchStatus("")
  }
  const printPDF = () => { 
    const domElement = document.getElementById("printable").innerHTML;
    html2canvas(domElement).then((canvas) => {
      const doc = new jsPDF();
      doc.text("Hello world!", 10, 10);
      doc.save(`attachment.pdf`);
    });
  };
  const downloadPdf = () =>{
    console.log("object");
    const input = document.getElementById("invoice");
    const input2 = document.getElementById("invoiceMnPdf");
    
    html2canvas(input2).then((canvas) =>{
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
  
        pdf.addImage(imgData, "JPEG", 10, 10);
        pdf.save("Invoice.pdf");   
        pdf.output("datauristring");
        console.log("data",  pdf.output("datauristring"));
        // const nPdf = pdf.output("datauristring"); 
        // const splitPDF = nPdf.split("base64,")[1]; 
     
// const invoHtml = document.getElementById("hello");

// console.log("html: ",invoHtml.innerHTML);  
// const config = {
//   api: {
//       bodyParser: {
//           sizeLimit: '4mb' // Set desired value here
//       }
//   }
// }
      // const body = {
      //   func: "base64topdf",
      //   base64: splitPDF,
      // } 
      //   axios.post("/api/post/Gate", body).then((res)=>{
      //     console.log("res", res.data.fileName);
      //     const data1 = res.data.fileName;
      //     const invoice = {
      //       func: "sendInvoice",
      //       email: "amarbayarbatbayar2@gmail.com",
      //       body: invoHtml.innerHTML,
      //       title_: "Invoice",
      //       attachments: data1,
      //     }
      //     axios.post("/api/post/Gate", invoice).then((res)=>{
      //       console.log("invoice: ", res.data);
      //     }).catch((err)=>{
      //       console.log("err", err);
      //     });
        


      //   }).catch((err)=>{
      //     console.log("err", err);
      //   }) 

    });
}
const inputFile = (a) =>{
  console.log("file", a);
  var x = document.getElementById("mf").files[0];
  console.log(x)
}
return (
<div>
<Head> <title>OBORTECH</title> <meta name="description" content="Generated by create next app" /><link rel="icon" href="img/HeaderLogo.png" /></Head>
<BaseLayout pageName="home" addItemStyle={addItemStyle}>
  <div className={css.SearchCss}> 
    <div className={css.SearchInput}>
      <Divider style={{fontSize: "18px", color: "#000"}}>{t("Search of organizations")}</Divider>
 
      {/* <input id="mf" name="userfile" type="file" accept="application/pdf, application/vnd.ms-excel"  onChange={inputFile}/>  */}
      <Search placeholder={t("Enter your organization ID")} allowClear  size="large" onSearch={onSearch} enterButton status={searchStatus} ref={inputRef} onChange={searchChangeFunc} />
       
        {orgIdState === "" ? spin ?  <div className={css.SpinCss}> <Spinner /> </div> : orgError === "" ? "" :  
        <div className={css.OrgError}><Result status="warning" title={orgError} style={{fontWeight: "600"}}/></div> : 
        <>{spin ? <div className={css.SpinCss}> <Spinner /> </div> : 
        <div className={css.OrgIdCss}> 
        <div className={css.CaptchaCss}><ReCAPTCHA sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/></div>
          {btnDis === false ? 
          <div className={css.RadioCss}> 
            <div className={css.OrgSelectCSs}>Choose a name for your organization?</div>
            <div className={css.Popcss}>  
              <div className={css.TitleFlex}><Radio.Group onChange={onChangeRadio}> <Radio value={orgIdState}><div className={css.RadioFrame}>{orgIdState}</div></Radio>
              </Radio.Group></div>   
            </div>
          </div> 
          : null}
          {radioS === "a" ? <div className={css.BtnPop}>   
        <Button disabled={btnDis} style={{ fontWeight: "500",  width: "100%"}} size="large" type="primary" onClick={()=> showConfirm()}>Continue <ArrowRightOutlined /> </Button></div> : ""} </div>}</>}  

    </div> 






  </div> 
 
</BaseLayout>
</div>
);
}
