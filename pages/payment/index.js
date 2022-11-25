import {Input,Button,message,Empty,Steps,Modal,Image,InputNumber,Row,Col,Radio,Form,Spin, Tooltip, Alert, Typography, notification, DatePicker, Select} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import Link from "next/link";
import { WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BasketContext from "../../context/basketContext/BasketContext";
import axios from "axios";
import {CaretRightOutlined,ShoppingCartOutlined,MailOutlined ,SmileFilled,DeleteOutlined, PhoneOutlined, CheckCircleOutlined} from "@ant-design/icons";
// import jsPDF from "jspdf"; 
import { Tabs } from "antd"; 
import SuccessOrder from "../../components/PaymentCom/SuccessOrder"; 
import KhanBank from "../../components/PaymentCom/khanBank";
import moment from 'moment';
import CreditOrDebitCard from "../../components/PaymentCom/CreditOrDebitCard";
import Coin from "../../components/PaymentCom/Coin";
import Paypal from "../../components/PaymentCom/Paypal";
import TdbBank from "../../components/PaymentCom/TdbBank";
 
const { TabPane } = Tabs;
const { Step } = Steps;
const { Paragraph } = Typography;
const { Option } = Select;
const monthFormat = 'YYYY/MM';
const Payment = () => {
  const basketContext = useContext(BasketContext); 
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [dateState, setDateState] = useState();
  const [datePlusState, setDatePlusState] = useState();
  const [totalPriceState, setTotalPriceState] = useState(0);   
  const [isModalVisibleOrgId2, setIsModalVisibleOrgId2] = useState(false); 
  const [orgIdInput2, setOrgIdInput2] = useState(""); 
  const [dollarResult, setDollarResult] = useState(0); 
  const [coinState, setCoinState] = useState(0);
  const [usdState, setUsdState] = useState(0);
  const [tugrugState, setTugrugState] = useState(0);

  const [coinStateTarget, setCoinTargetState] = useState(0);
  const [usdStateTarget, setUsdTargetState] = useState(0);
  const [tugrugStateTarget, setTugrugTargetState] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSpin, setItemSpin] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);
  const [orgIdRadio, setOrgIdRadio] = useState(0);
  const [formOrgId] = Form.useForm();
  const [checkFalse, setCheckFalse] = useState(false);
  const [itemHdr, setItemHdr] = useState();
  const [showMethod, setShowMethod] = useState(false);
  const [bankChoose, setBankChoose] = useState(undefined);
  const [bankValue, setBankValue] = useState(undefined);
  const [bankPay, setBankPay] = useState(undefined);
  const [foreignValue, setForeignValue] = useState(1);
  const [payInInstallmentsValue, setPayInInstallments] = useState(undefined);
  const [orgOnChange, setOrgOnChange] = useState(0);
  const [successOrderValue, setSuccessOrderValue] = useState(0);
  const [successOrderPrice, setSuccessOrderPrice] = useState(0); 
  //const { amaraa } = router.query;
 
  
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
      introduction: "${label} in not a valid intrucduction",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const showModalItem = (item) => {
    setItemSpin(true);
    setItemHdr(item);
    console.log("item: ", item);
    const body = {
      func: "getGroups", 
      pkId: item.pkId
   };
      axios.post("/api/post/Gate", body).then((res) => {  
      if (res.data.data.itemList == undefined) 
          {console.log("")} 
      else {  
        setIsModalOpen(true);
        setItemSpin(false);
        setGroupDetails(res.data.data.itemList); }
      }).catch((err) => {console.log("err", err)});
   
  }; 
  const handleOkItem = () => {
    setIsModalOpen(false);
  }; 
  const handleCancelItem = () => {
    setIsModalOpen(false);
  }; 
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    totalPriceFunction();
    dateFunction(); 
    // console.log("url",window.location.href); 
    
    const queryString = window.location.search;
  


    var url_string = "http://192.168.1.14:3000/payment?parameter1=amaraa&parameter2=000&body=asdjflajsdlkfjaklsjfklhadbd2626251dsf3as5df1as53df1as5df1as3fd51as3df153sadfas&fbclid=IwAR24B-dJ611MB46g-9X2v0rK3P8_7NgWmDtCnZxPTY1ZVraFwFfzM4pd760"; 
    
    
    console.log('amaraa', router.query);
  

    window.onpopstate = (event) =>{
      
      history.go(1)
      console.log("event", event); 
    }
    // totalPriceFunction();
  }, []);

  const sentTdb = ()  =>{
    var url_string = "http://192.168.1.14:3000/payment?parameter1=amaraa&parameter2=000&body=asdjflajsdlkfjaklsjfklhadbd2626251dsf3as5df1as53df1as5df1as3fd51as3df153sadfas&fbclid=IwAR24B-dJ611MB46g-9X2v0rK3P8_7NgWmDtCnZxPTY1ZVraFwFfzM4pd760";
    const urlParams = new URLSearchParams(url_string);
    console.log("query: "); 
    console.log("url param: ", urlParams);
  }

  const dateFunction = () => {
    console.log("date time: ");
    
    const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    var date = new Date();
    setDateState(date.getFullYear() + "/" + mounths[date.getMonth()] + "/" + date.getDate()); 
    var datePlus = new Date();
    datePlus.setDate(datePlus.getDate() + 30);
    setDatePlusState(datePlus.getFullYear() +"/" +mounths[datePlus.getMonth()] +"/" +datePlus.getDate()); 
  };  
  const totalPriceFunction = () => {
  
    let itemPrice = 0;
    let result = 0; 
     basketContext.basketState.forEach((element) => {
      if (element.itemPriceTotal == undefined) { 
        result = element.price;
      } else {
        result = element.itemPriceTotal;
      }
      itemPrice += element.cnt * result; 
    })
    setSuccessOrderPrice(itemPrice);
    setTotalPriceState(itemPrice);
  };
  const orderOrgId2 = () => {
    const rs = usdStateTarget + coinStateTarget + tugrugStateTarget;
     
    setDollarResult(rs);
    setIsModalVisibleOrgId2(true);
  }; 
const handleOkOrgId2 = () => {
// console.log("orgIdInput2: ", orgIdInput2);
// console.log("dollarResult: ", dollarResult);
// console.log("basketContext.basketState: ", basketContext.basketState);
console.log("tugrugState: ", tugrugState);
console.log("coinState: ", coinState);
console.log("usd: ", usdState);
console.log("orgID: ", orgIdRadio);

if(orgIdRadio == ""){
message.error("Organization ID choose ? ")
}else{
const tugrugResult = 0;
if (tugrugState == 0) {
console.log("tugrugState: Hooson", tugrugState);
} else {
tugrugResult = tugrugState;
}
const payment = [];
if (usdState == 0) {
console.log("usd null:");
} else {
payment.push({ paymentMethod: 0, paymentPrice: usdState });
} 
if (tugrugState == 0) {
console.log("");
} else {
payment.push({ paymentMethod: 1, paymentPrice: tugrugState });
} 
if (coinState == 0) {
console.log("coin null");
} else {
payment.push({ paymentMethod: 2, paymentPrice: coinState });
} 

const arr = basketContext.basketState;
console.log("ORGiD", payment);
arr.forEach((element, i) => {
if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
});  

if (localStorage.getItem("token")) {
const body = arr;
const body2 = {
  func: "neworder",
  item: body,
  orgId: orgIdRadio,
  totalPrice: totalPriceState,
  // payment: payment,
  pkId: localStorage.getItem("pkId"),
  // orgId: orgIdInput2,
  // paymentMethod: 0,
  // product: body,
};
console.log("bodyId:2  ===>> ", body2);
var basketLocal = [];
axios.post("/api/post/Gate", body2).then((result) => {
  // message.success(<div className={css.SucessOrderCss}> Amraa</div>,100000);
    basketContext.removeBasketStorage();   
    // router.push("/order-history");
  },(error) => {console.log(error)}); 
} else {
const bodyNoId = {
  func: "neworder",
  orgId: orgIdRadio,
  totalPrice: totalPriceState,
  item: arr,
  // payment: payment,
};
console.log("bodyNoId: ", bodyNoId);
axios.post("/api/post/Gate", bodyNoId).then((result) => {
    message.success("Success");
    basketContext.removeBasketStorage(); 
    // router.push("/order-history");
  },(error) => {console.log(error)});
}

  }
};
 
  const handleCancelOrgId2 = () => {
    setOrgIdRadio("");
    console.log("cancel: ", checkFalse);
    formOrgId.resetFields();
    setCheckFalse(false); 
    setIsModalVisibleOrgId2(false);
  }; 
  const CoinFunc = (e) => {
    console.log("coin input: ", e);
    setCoinTargetState(e);
    const result = 0;
    result = e / basketContext.hanshnuud[2].rate;
    console.log("coin: ", result);
    setCoinState(result);

    console.log("coinstate");
  };
  const UsdFunc = (e) => {
    console.log("Usd input: ", e);
    setUsdTargetState(e);
    const result = 0;
    if (e === null) {
      setUsdState(0);
    } else {
      result = e;
      setUsdState(result);
    }
  };
  const TugrugFunc = (e) => {
    setTugrugTargetState(e);
    const result = 0;
    result = e * basketContext.hanshnuud[1].rate;
    setTugrugState(result);
  };
  const TotalPriceFunc = () => {
    console.log("coinState: ", coinStateTarget);
    console.log("usdState: ", usdStateTarget);
    console.log("tugrugState: ", tugrugStateTarget);
  };
const orgIdChoose = (e) =>{ 
  console.log("e.target: ", e.target.value); 
  // setOrgOnChange()
  setOrgIdRadio(e.target.value);
   
  if(localStorage.getItem("pkId")){
    setShowMethod(true);
  }
} 
const  onFinishOrgId= (values) =>{ 
  console.log("values: ", values);
 
  // const data = {
  //   func: "newItem", title: values.itemName, description: values.descrip, 
  //   quantity: 0, price: values.price, cnt: 1, img: baseImg, others: "-", status: editStatus,
  // };
  // axios.post("/api/post/Gate", data).then((res) => {
  //     formAddItem.resetFields();  
  //     setIsModalVisible(false);
  //     message.success("Success");  
  //     getItems();
  //   }).catch((err) => {console.log("err", err)}); 
}
const onFinishFailedOrgId = (errInfo)=>{
  console.log("errInfo: ", errInfo);
  // formAddItem.resetFields(); 
}

const BankTypo = (value) =>{ 
  setBankValue(undefined);
  setBankChoose(value);
}
const onFinishUserInfo = (values) =>{
  setShowMethod(true);
  console.log("user", values);
}
const onFinishFailedUserInfo = (values) =>{ 
  console.log("user", values);
}

const bankOnChange = (e) =>{
  console.log("bank", e.target.value);
  setBankValue(e.target.value);

}
const onSearch = (value) => {
  console.log('search:', value);
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
    style={{width: "150px"}}
        showSearch
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }

      options={
        [
          {
          label: "Afghanistan",
          value: "+93",
          "code": "AF"
          },
          {
          label: "Aland Islands",
          value: "+358",
          "code": "AX"
          },
          {
          label: "Albania",
          value: "+355",
          "code": "AL"
          },
          {
          label: "Algeria",
          value: "+213",
          "code": "DZ"
          },
          {
          label: "AmericanSamoa",
          value: "+1684",
          "code": "AS"
          },
          {
          label: "Andorra",
          value: "+376",
          "code": "AD"
          },
          {
          label: "Angola",
          value: "+244",
          "code": "AO"
          },
          {
          label: "Anguilla",
          value: "+1264",
          "code": "AI"
          },
          {
          label: "Antarctica",
          value: "+672",
          "code": "AQ"
          },
          {
          label: "Antigua and Barbuda",
          value: "+1268",
          "code": "AG"
          },
          {
          label: "Argentina",
          value: "+54",
          "code": "AR"
          },
          {
          label: "Armenia",
          value: "+374",
          "code": "AM"
          },
          {
          label: "Aruba",
          value: "+297",
          "code": "AW"
          },
          {
          label: "Australia",
          value: "+61",
          "code": "AU"
          },
          {
          label: "Austria",
          value: "+43",
          "code": "AT"
          },
          {
          label: "Azerbaijan",
          value: "+994",
          "code": "AZ"
          },
          {
          label: "Bahamas",
          value: "+1242",
          "code": "BS"
          },
          {
          label: "Bahrain",
          value: "+973",
          "code": "BH"
          },
          {
          label: "Bangladesh",
          value: "+880",
          "code": "BD"
          },
          {
          label: "Barbados",
          value: "+1246",
          "code": "BB"
          },
          {
          label: "Belarus",
          value: "+375",
          "code": "BY"
          },
          {
          label: "Belgium",
          value: "+32",
          "code": "BE"
          },
          {
          label: "Belize",
          value: "+501",
          "code": "BZ"
          },
          {
          label: "Benin",
          value: "+229",
          "code": "BJ"
          },
          {
          label: "Bermuda",
          value: "+1441",
          "code": "BM"
          },
          {
          label: "Bhutan",
          value: "+975",
          "code": "BT"
          },
          {
          label: "Bolivia, Plurinational State of",
          value: "+591",
          "code": "BO"
          },
          {
          label: "Bosnia and Herzegovina",
          value: "+387",
          "code": "BA"
          },
          {
          label: "Botswana",
          value: "+267",
          "code": "BW"
          },
          {
          label: "Brazil",
          value: "+55",
          "code": "BR"
          },
          {
          label: "British Indian Ocean Territory",
          value: "+246",
          "code": "IO"
          },
          {
          label: "Brunei Darussalam",
          value: "+673",
          "code": "BN"
          },
          {
          label: "Bulgaria",
          value: "+359",
          "code": "BG"
          },
          {
          label: "Burkina Faso",
          value: "+226",
          "code": "BF"
          },
          {
          label: "Burundi",
          value: "+257",
          "code": "BI"
          },
          {
          label: "Cambodia",
          value: "+855",
          "code": "KH"
          },
          {
          label: "Cameroon",
          value: "+237",
          "code": "CM"
          },
          {
          label: "Canada",
          value: "+1",
          "code": "CA"
          },
          {
          label: "Cape Verde",
          value: "+238",
          "code": "CV"
          },
          {
          label: "Cayman Islands",
          value: "+ 345",
          "code": "KY"
          },
          {
          label: "Central African Republic",
          value: "+236",
          "code": "CF"
          },
          {
          label: "Chad",
          value: "+235",
          "code": "TD"
          },
          {
          label: "Chile",
          value: "+56",
          "code": "CL"
          },
          {
          label: "China",
          value: "+86",
          "code": "CN"
          },
          {
          label: "Christmas Island",
          value: "+61",
          "code": "CX"
          },
          {
          label: "Cocos (Keeling) Islands",
          value: "+61",
          "code": "CC"
          },
          {
          label: "Colombia",
          value: "+57",
          "code": "CO"
          },
          {
          label: "Comoros",
          value: "+269",
          "code": "KM"
          },
          {
          label: "Congo",
          value: "+242",
          "code": "CG"
          },
          {
          label: "Congo, The Democratic Republic of the Congo",
          value: "+243",
          "code": "CD"
          },
          {
          label: "Cook Islands",
          value: "+682",
          "code": "CK"
          },
          {
          label: "Costa Rica",
          value: "+506",
          "code": "CR"
          },
          {
          label: "Cote d'Ivoire",
          value: "+225",
          "code": "CI"
          },
          {
          label: "Croatia",
          value: "+385",
          "code": "HR"
          },
          {
          label: "Cuba",
          value: "+53",
          "code": "CU"
          },
          {
          label: "Cyprus",
          value: "+357",
          "code": "CY"
          },
          {
          label: "Czech Republic",
          value: "+420",
          "code": "CZ"
          },
          {
          label: "Denmark",
          value: "+45",
          "code": "DK"
          },
          {
          label: "Djibouti",
          value: "+253",
          "code": "DJ"
          },
          {
          label: "Dominica",
          value: "+1767",
          "code": "DM"
          },
          {
          label: "Dominican Republic",
          value: "+1849",
          "code": "DO"
          },
          {
          label: "Ecuador",
          value: "+593",
          "code": "EC"
          },
          {
          label: "Egypt",
          value: "+20",
          "code": "EG"
          },
          {
          label: "El Salvador",
          value: "+503",
          "code": "SV"
          },
          {
          label: "Equatorial Guinea",
          value: "+240",
          "code": "GQ"
          },
          {
          label: "Eritrea",
          value: "+291",
          "code": "ER"
          },
          {
          label: "Estonia",
          value: "+372",
          "code": "EE"
          },
          {
          label: "Ethiopia",
          value: "+251",
          "code": "ET"
          },
          {
          label: "Falkland Islands (Malvinas)",
          value: "+500",
          "code": "FK"
          },
          {
          label: "Faroe Islands",
          value: "+298",
          "code": "FO"
          },
          {
          label: "Fiji",
          value: "+679",
          "code": "FJ"
          },
          {
          label: "Finland",
          value: "+358",
          "code": "FI"
          },
          {
          label: "France",
          value: "+33",
          "code": "FR"
          },
          {
          label: "French Guiana",
          value: "+594",
          "code": "GF"
          },
          {
          label: "French Polynesia",
          value: "+689",
          "code": "PF"
          },
          {
          label: "Gabon",
          value: "+241",
          "code": "GA"
          },
          {
          label: "Gambia",
          value: "+220",
          "code": "GM"
          },
          {
          label: "Georgia",
          value: "+995",
          "code": "GE"
          },
          {
          label: "Germany",
          value: "+49",
          "code": "DE"
          },
          {
          label: "Ghana",
          value: "+233",
          "code": "GH"
          },
          {
          label: "Gibraltar",
          value: "+350",
          "code": "GI"
          },
          {
          label: "Greece",
          value: "+30",
          "code": "GR"
          },
          {
          label: "Greenland",
          value: "+299",
          "code": "GL"
          },
          {
          label: "Grenada",
          value: "+1473",
          "code": "GD"
          },
          {
          label: "Guadeloupe",
          value: "+590",
          "code": "GP"
          },
          {
          label: "Guam",
          value: "+1671",
          "code": "GU"
          },
          {
          label: "Guatemala",
          value: "+502",
          "code": "GT"
          },
          {
          label: "Guernsey",
          value: "+44",
          "code": "GG"
          },
          {
          label: "Guinea",
          value: "+224",
          "code": "GN"
          },
          {
          label: "Guinea-Bissau",
          value: "+245",
          "code": "GW"
          },
          {
          label: "Guyana",
          value: "+595",
          "code": "GY"
          },
          {
          label: "Haiti",
          value: "+509",
          "code": "HT"
          },
          {
          label: "Holy See (Vatican City State)",
          value: "+379",
          "code": "VA"
          },
          {
          label: "Honduras",
          value: "+504",
          "code": "HN"
          },
          {
          label: "Hong Kong",
          value: "+852",
          "code": "HK"
          },
          {
          label: "Hungary",
          value: "+36",
          "code": "HU"
          },
          {
          label: "Iceland",
          value: "+354",
          "code": "IS"
          },
          {
          label: "India",
          value: "+91",
          "code": "IN"
          },
          {
          label: "Indonesia",
          value: "+62",
          "code": "ID"
          },
          {
          label: "Iran, Islamic Republic of Persian Gulf",
          value: "+98",
          "code": "IR"
          },
          {
          label: "Iraq",
          value: "+964",
          "code": "IQ"
          },
          {
          label: "Ireland",
          value: "+353",
          "code": "IE"
          },
          {
          label: "Isle of Man",
          value: "+44",
          "code": "IM"
          },
          {
          label: "Israel",
          value: "+972",
          "code": "IL"
          },
          {
          label: "Italy",
          value: "+39",
          "code": "IT"
          },
          {
          label: "Jamaica",
          value: "+1876",
          "code": "JM"
          },
          {
          label: "Japan",
          value: "+81",
          "code": "JP"
          },
          {
          label: "Jersey",
          value: "+44",
          "code": "JE"
          },
          {
          label: "Jordan",
          value: "+962",
          "code": "JO"
          },
          {
          label: "Kazakhstan",
          value: "+77",
          "code": "KZ"
          },
          {
          label: "Kenya",
          value: "+254",
          "code": "KE"
          },
          {
          label: "Kiribati",
          value: "+686",
          "code": "KI"
          },
          {
          label: "Korea, Democratic People's Republic of Korea",
          value: "+850",
          "code": "KP"
          },
          {
          label: "Korea, Republic of South Korea",
          value: "+82",
          "code": "KR"
          },
          {
          label: "Kuwait",
          value: "+965",
          "code": "KW"
          },
          {
          label: "Kyrgyzstan",
          value: "+996",
          "code": "KG"
          },
          {
          label: "Laos",
          value: "+856",
          "code": "LA"
          },
          {
          label: "Latvia",
          value: "+371",
          "code": "LV"
          },
          {
          label: "Lebanon",
          value: "+961",
          "code": "LB"
          },
          {
          label: "Lesotho",
          value: "+266",
          "code": "LS"
          },
          {
          label: "Liberia",
          value: "+231",
          "code": "LR"
          },
          {
          label: "Libyan Arab Jamahiriya",
          value: "+218",
          "code": "LY"
          },
          {
          label: "Liechtenstein",
          value: "+423",
          "code": "LI"
          },
          {
          label: "Lithuania",
          value: "+370",
          "code": "LT"
          },
          {
          label: "Luxembourg",
          value: "+352",
          "code": "LU"
          },
          {
          label: "Macao",
          value: "+853",
          "code": "MO"
          },
          {
          label: "Macedonia",
          value: "+389",
          "code": "MK"
          },
          {
          label: "Madagascar",
          value: "+261",
          "code": "MG"
          },
          {
          label: "Malawi",
          value: "+265",
          "code": "MW"
          },
          {
          label: "Malaysia",
          value: "+60",
          "code": "MY"
          },
          {
          label: "Maldives",
          value: "+960",
          "code": "MV"
          },
          {
          label: "Mali",
          value: "+223",
          "code": "ML"
          },
          {
          label: "Malta",
          value: "+356",
          "code": "MT"
          },
          {
          label: "Marshall Islands",
          value: "+692",
          "code": "MH"
          },
          {
          label: "Martinique",
          value: "+596",
          "code": "MQ"
          },
          {
          label: "Mauritania",
          value: "+222",
          "code": "MR"
          },
          {
          label: "Mauritius",
          value: "+230",
          "code": "MU"
          },
          {
          label: "Mayotte",
          value: "+262",
          "code": "YT"
          },
          {
          label: "Mexico",
          value: "+52",
          "code": "MX"
          },
          {
          label: "Micronesia, Federated States of Micronesia",
          value: "+691",
          "code": "FM"
          },
          {
          label: "Moldova",
          value: "+373",
          "code": "MD"
          },
          {
          label: "Monaco",
          value: "+377",
          "code": "MC"
          },
          {
          label: "Mongolia",
          value: "+976",
          "code": "MN"
          },
          {
          label: "Montenegro",
          value: "+382",
          "code": "ME"
          },
          {
          label: "Montserrat",
          value: "+1664",
          "code": "MS"
          },
          {
          label: "Morocco",
          value: "+212",
          "code": "MA"
          },
          {
          label: "Mozambique",
          value: "+258",
          "code": "MZ"
          },
          {
          label: "Myanmar",
          value: "+95",
          "code": "MM"
          },
          {
          label: "Namibia",
          value: "+264",
          "code": "NA"
          },
          {
          label: "Nauru",
          value: "+674",
          "code": "NR"
          },
          {
          label: "Nepal",
          value: "+977",
          "code": "NP"
          },
          {
          label: "Netherlands",
          value: "+31",
          "code": "NL"
          },
          {
          label: "Netherlands Antilles",
          value: "+599",
          "code": "AN"
          },
          {
          label: "New Caledonia",
          value: "+687",
          "code": "NC"
          },
          {
          label: "New Zealand",
          value: "+64",
          "code": "NZ"
          },
          {
          label: "Nicaragua",
          value: "+505",
          "code": "NI"
          },
          {
          label: "Niger",
          value: "+227",
          "code": "NE"
          },
          {
          label: "Nigeria",
          value: "+234",
          "code": "NG"
          },
          {
          label: "Niue",
          value: "+683",
          "code": "NU"
          },
          {
          label: "Norfolk Island",
          value: "+672",
          "code": "NF"
          },
          {
          label: "Northern Mariana Islands",
          value: "+1670",
          "code": "MP"
          },
          {
          label: "Norway",
          value: "+47",
          "code": "NO"
          },
          {
          label: "Oman",
          value: "+968",
          "code": "OM"
          },
          {
          label: "Pakistan",
          value: "+92",
          "code": "PK"
          },
          {
          label: "Palau",
          value: "+680",
          "code": "PW"
          },
          {
          label: "Palestinian Territory, Occupied",
          value: "+970",
          "code": "PS"
          },
          {
          label: "Panama",
          value: "+507",
          "code": "PA"
          },
          {
          label: "Papua New Guinea",
          value: "+675",
          "code": "PG"
          },
          {
          label: "Paraguay",
          value: "+595",
          "code": "PY"
          },
          {
          label: "Peru",
          value: "+51",
          "code": "PE"
          },
          {
          label: "Philippines",
          value: "+63",
          "code": "PH"
          },
          {
          label: "Pitcairn",
          value: "+872",
          "code": "PN"
          },
          {
          label: "Poland",
          value: "+48",
          "code": "PL"
          },
          {
          label: "Portugal",
          value: "+351",
          "code": "PT"
          },
          {
          label: "Puerto Rico",
          value: "+1939",
          "code": "PR"
          },
          {
          label: "Qatar",
          value: "+974",
          "code": "QA"
          },
          {
          label: "Romania",
          value: "+40",
          "code": "RO"
          },
          {
          label: "Russia",
          value: "+7",
          "code": "RU"
          },
          {
          label: "Rwanda",
          value: "+250",
          "code": "RW"
          },
          {
          label: "Reunion",
          value: "+262",
          "code": "RE"
          },
          {
          label: "Saint Barthelemy",
          value: "+590",
          "code": "BL"
          },
          {
          label: "Saint Helena, Ascension and Tristan Da Cunha",
          value: "+290",
          "code": "SH"
          },
          {
          label: "Saint Kitts and Nevis",
          value: "+1869",
          "code": "KN"
          },
          {
          label: "Saint Lucia",
          value: "+1758",
          "code": "LC"
          },
          {
          label: "Saint Martin",
          value: "+590",
          "code": "MF"
          },
          {
          label: "Saint Pierre and Miquelon",
          value: "+508",
          "code": "PM"
          },
          {
          label: "Saint Vincent and the Grenadines",
          value: "+1784",
          "code": "VC"
          },
          {
          label: "Samoa",
          value: "+685",
          "code": "WS"
          },
          {
          label: "San Marino",
          value: "+378",
          "code": "SM"
          },
          {
          label: "Sao Tome and Principe",
          value: "+239",
          "code": "ST"
          },
          {
          label: "Saudi Arabia",
          value: "+966",
          "code": "SA"
          },
          {
          label: "Senegal",
          value: "+221",
          "code": "SN"
          },
          {
          label: "Serbia",
          value: "+381",
          "code": "RS"
          },
          {
          label: "Seychelles",
          value: "+248",
          "code": "SC"
          },
          {
          label: "Sierra Leone",
          value: "+232",
          "code": "SL"
          },
          {
          label: "Singapore",
          value: "+65",
          "code": "SG"
          },
          {
          label: "Slovakia",
          value: "+421",
          "code": "SK"
          },
          {
          label: "Slovenia",
          value: "+386",
          "code": "SI"
          },
          {
          label: "Solomon Islands",
          value: "+677",
          "code": "SB"
          },
          {
          label: "Somalia",
          value: "+252",
          "code": "SO"
          },
          {
          label: "South Africa",
          value: "+27",
          "code": "ZA"
          },
          {
          label: "South Sudan",
          value: "+211",
          "code": "SS"
          },
          {
          label: "South Georgia and the South Sandwich Islands",
          value: "+500",
          "code": "GS"
          },
          {
          label: "Spain",
          value: "+34",
          "code": "ES"
          },
          {
          label: "Sri Lanka",
          value: "+94",
          "code": "LK"
          },
          {
          label: "Sudan",
          value: "+249",
          "code": "SD"
          },
          {
          label: "Surilabel",
          value: "+597",
          "code": "SR"
          },
          {
          label: "Svalbard and Jan Mayen",
          value: "+47",
          "code": "SJ"
          },
          {
          label: "Swaziland",
          value: "+268",
          "code": "SZ"
          },
          {
          label: "Sweden",
          value: "+46",
          "code": "SE"
          },
          {
          label: "Switzerland",
          value: "+41",
          "code": "CH"
          },
          {
          label: "Syrian Arab Republic",
          value: "+963",
          "code": "SY"
          },
          {
          label: "Taiwan",
          value: "+886",
          "code": "TW"
          },
          {
          label: "Tajikistan",
          value: "+992",
          "code": "TJ"
          },
          {
          label: "Tanzania, United Republic of Tanzania",
          value: "+255",
          "code": "TZ"
          },
          {
          label: "Thailand",
          value: "+66",
          "code": "TH"
          },
          {
          label: "Timor-Leste",
          value: "+670",
          "code": "TL"
          },
          {
          label: "Togo",
          value: "+228",
          "code": "TG"
          },
          {
          label: "Tokelau",
          value: "+690",
          "code": "TK"
          },
          {
          label: "Tonga",
          value: "+676",
          "code": "TO"
          },
          {
          label: "Trinidad and Tobago",
          value: "+1868",
          "code": "TT"
          },
          {
          label: "Tunisia",
          value: "+216",
          "code": "TN"
          },
          {
          label: "Turkey",
          value: "+90",
          "code": "TR"
          },
          {
          label: "Turkmenistan",
          value: "+993",
          "code": "TM"
          },
          {
          label: "Turks and Caicos Islands",
          value: "+1649",
          "code": "TC"
          },
          {
          label: "Tuvalu",
          value: "+688",
          "code": "TV"
          },
          {
          label: "Uganda",
          value: "+256",
          "code": "UG"
          },
          {
          label: "Ukraine",
          value: "+380",
          "code": "UA"
          },
          {
          label: "United Arab Emirates",
          value: "+971",
          "code": "AE"
          },
          {
          label: "United Kingdom",
          value: "+44",
          "code": "GB"
          },
          {
          label: "United States",
          value: "+1",
          "code": "US"
          },
          {
          label: "Uruguay",
          value: "+598",
          "code": "UY"
          },
          {
          label: "Uzbekistan",
          value: "+998",
          "code": "UZ"
          },
          {
          label: "Vanuatu",
          value: "+678",
          "code": "VU"
          },
          {
          label: "Venezuela, Bolivarian Republic of Venezuela",
          value: "+58",
          "code": "VE"
          },
          {
          label: "Vietnam",
          value: "+84",
          "code": "VN"
          },
          {
          label: "Virgin Islands, British",
          value: "+1284",
          "code": "VG"
          },
          {
          label: "Virgin Islands, U.S.",
          value: "+1340",
          "code": "VI"
          },
          {
          label: "Wallis and Futuna",
          value: "+681",
          "code": "WF"
          },
          {
          label: "Yemen",
          value: "+967",
          "code": "YE"
          },
          {
          label: "Zambia",
          value: "+260",
          "code": "ZM"
          },
          {
          label: "Zimbabwe",
          value: "+263",
          "code": "ZW"
          }
          ]
      }
    >
       
    </Select>
  </Form.Item>
);
const placeOrder = () =>{
  console.log("place order: ", bankValue );
  if(bankValue === undefined){
    notification["warning"]({
      message: 'Error',
      description:
        'Do you select a Method!!!',
    });
  }else if(bankValue === "Tdb"){ 
    router.push("/payment?parameter1=amaraa&parameter2=000&body=asdjflajsdlkfjaklsjfklhadbd2626251dsf3as5df1as53df1as5df1as3fd51as3df153sadfas&fbclid=IwAR24B-dJ611MB46g-9X2v0rK3P8_7NgWmDtCnZxPTY1ZVraFwFfzM4pd760");
  }
 
  setBankPay(bankValue);
}
const BackFunc = () =>{
  setBankPay(undefined);
  setBankValue(undefined);
}
const foreignOnChange = (value) =>{

  setForeignValue(value.target.value);
}
const PayInInstallmentsForeign = () =>{
setPayInInstallments(1);
localStorage.setItem("Bank", 1);
}
const PayInInstallmentsCoin = () =>{
setPayInInstallments(2);
localStorage.setItem("Bank", 2);
}
const sucessOrder = () =>{ 

  setSuccessOrderValue(2); 
}
const removeBask = () =>{ 
  setSuccessOrderValue(4);
}
  var sss = 0;
const steps = [
{title: "Cart",content: (
<div>
  <div className={css.orderItem}>
    {basketContext.basketState.length === 0 ? (<Empty description="Empty"></Empty>) : (
      <div className={css.ItemDivide}>  
        <div className={css.ItemTotal}> 
          <div className={css.ItemSize}>
            {basketContext.basketState.map((e, i) => (
              <div className={e.img === undefined ? css.Items2 : css.Items} key={i} >
                <div className={css.ItemsSolo}>
                  <div className={e.img === undefined ? css.grpBackColor : css.ItemZurag}>
                    {e.img ? <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img}/> : <div className={css.PgrCss}>P</div>} </div>
                  <div className={css.ItemsInfo}>
                    <div className={css.ItemsTitle}> <div className={css.TitleOver}>{e.title}</div>
                      <div>
                        <Tooltip title={<div style={{color: "rgb(100 100 100)", fontSize: "12px"}}> Delete</div>} color="white" ><Button type="link" shape="circle" size="small" onClick={() =>basketContext.basketItemDelete(i,totalPriceFunction)} icon={<DeleteOutlined  style={{color: "#666", fontSize: "15px"}}/>}></Button></Tooltip>
                      </div>
                    </div>
                    <div className={css.DescripOver}>{e.description} </div>
                    <div className={css.Descrip}>
                      <div className={css.QtyBtn}>
                        <Button type="dashed" size="small" onClick={() =>basketContext.decline(i, totalPriceFunction)}>-</Button>
                        <div className={css.QtyName}>{e.cnt}</div>
                        <Button type="dashed" size="small" onClick={() =>basketContext.increase(i,totalPriceFunction)}>+</Button>
                      </div>
                      <div>{e.price} {e.itemPriceTotal}$</div>
                    </div>
                    {e.img === undefined ? <div><Button style={{width: "100%", marginTop: "5px"}} size="middle" type="primary" shape="round" 
                    onClick={()=>showModalItem(e)}> Items </Button>
                      <Modal title="Package items" open={isModalOpen} onOk={handleOkItem} onCancel={handleCancelItem} footer={null}  >
                    {itemHdr ?
                    <div className={css.ModalBackground}>
                      <div className={css.titleH}>{itemHdr.title}</div>
                      <div className={css.ItemDesc}>{itemHdr.description}</div>
                      <div className={css.PackageHdr}> Packege items:</div>
                      <div className={css.DetailsScroll}> 
                          {groupDetails.map((e, i)=>( 
                          <div className={css.BasketItem} key={i}>
                            <div className={css.Zurag2}>
                              <Image alt="Obertech"preview={false}src={"data:image/png;base64," + e.img}/>
                            </div>
                            <div className={css.Descrip2}>
                              <div className={css.Title2}><div className={css.ItemTitle2}>{e.title}</div></div>
                              <div className={css.Price2}>
                                <div> Qty: {e.itemCnt}</div>
                                <div style={{fontWeight: "600"}}> {e.itemPriceD}$</div>
                              </div>
                            </div>
                          </div> 
                          ))}
                      </div>
                      <div className={css.TotalPriceCss}>Total price: {itemHdr.price}$</div>
                      </div> 
                      : <Empty /> }
                  </Modal>
                      </div> : ""}
                  </div>
                  
                </div> 
              </div>
            ))}
            {itemSpin ?  <div className={css.Spinner}> <Spin  size="large"/> </div>: ""} 
          </div> 
        </div>
        <div className={css.Reminder}>
          <div className={css.OrderSummary}>Order summary</div>
          <div className={css.SubTotal}><div>Subtotal</div> <div> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
          <div className={css.TotalLenght}><div>Total(4)</div> <div className={css.TotalLPrice}> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
          <div className={css.ProceedTo}><Button className={css.CheckoutBtn} size="large" onClick={() => next()}>Proceed to Checkout</Button></div>
        </div>
      </div>
    )}
  </div>
</div>
),
},
{
  title: "Pay",
  content: ( <div> 
    {bankPay === undefined ?
    <div className={css.PayContent}>

      <div className={css.PayConfirm}>
    
        <div>
          <div className={css.PlsName}>Please select your organization name to confirm!</div>
          <div className={css.RadioCont}> 
              <Radio.Group onChange={orgIdChoose} style={{width: "100%"}} value={orgIdRadio}> 
                <Radio  className={css.OrgRadio} value={basketContext.orgId}>
                  <div className={css.OrgConfirm}> 
                  <div> 
                    <div>{basketContext.orgId} </div>
                    {/* <div>Байгууллагын нэр: Обортек</div> */}
                  </div>
                  <div className={css.OrgDesc}> 
                    <div><span>Organizatin name:</span> <span style={{marginLeft: "10px"}}>{basketContext.orgId}</span></div>
                    <div><span>Organization ID:</span> <span style={{marginLeft: "26px"}}>Obogti760 </span></div>
                    <div><span>Байгууллагын нэр: </span> <span style={{marginLeft: "9px"}}>Обортек</span></div>
                    <div><span>Байгууллагын ID: </span> <span style={{marginLeft: "19px"}}>Obogti760</span></div>
                  </div>
                  </div>
                  </Radio> 

              </Radio.Group>  
          </div>
        </div>  

        <div className={css.InfoDetails}>
          {orgIdRadio === 0  || showMethod || localStorage.getItem("pkId") ?  null : 
            <div className={css.AlertDesk}>
              <div className={css.AlertText}>
                <Alert message="Informational Notes"
                  description="Additional description and information about copywriting."
                  type="warning"
                  showIcon
                />
              </div>
              
             <div className={css.AlertInput}> 
                <div className={css.AlertName}>Please fill in your information!</div>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 6,}} wrapperCol={{span: 22}}
                  onFinish={onFinishUserInfo} onFinishFailed={onFinishFailedUserInfo}>
                  <Form.Item name="email" label="Email" rules={[{ type: "email", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Email!</div>)}]}>
                    <Input size="middle" prefix={<MailOutlined className={css.Title} />} placeholder={"Email"}/>
                  </Form.Item>
                  <Form.Item name="phone" label="Phone" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
                    <InputNumber size="middle" prefix={<PhoneOutlined className={css.Title} rotate={90} />} placeholder={"Phone number"} style={{width: "100%"}}/>
                  </Form.Item>   
                  <Form.Item
                    name="countryCode"
                    label="Phone Number"
                    rules={[{required: true, message: 'Please input your phone number!'}]}>
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                  </Form.Item>
                  <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%",background: "rgb(244, 63, 94)", border: "none" }} type="primary" htmlType="submit" className="login-form-button">Continue</Button></div></Form.Item>
                </Form>  
             </div>
            </div>
          }

        {showMethod ? <div className={css.PayMethod}> 
            <div className={css.PayMethTitle}>Payment Methods</div>
            <div className={css.Methodchild}>
            {payInInstallmentsValue === 1 || payInInstallmentsValue === 2 ? 
               <Typography.Text onClick={()=> BankTypo("Coin")}> 
               <div className={bankChoose === "Coin" ? css.BankCssActive  : css.BankCss}>
                   60% USD / 40% Coin
               </div>
               </Typography.Text>
              :
                <> 
                 <Typography.Text onClick={()=> BankTypo("Mongol")}> 
                 <div className={bankChoose === "Mongol" ? css.BankCssActive : css.BankCss}>
                   <div>Mongolian banks</div>
                   <div className={css.BankImg}>  
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/boderkhan.png" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderGolomt.png" width={25} style={{borderRadius: "5px"}}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderHas.png" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderTdb.png" width={26}/>
                     </div>
                   </div>
                 </div>
                 </Typography.Text>

                 <Typography.Text onClick={()=> BankTypo("Usd")}> 
                 <div className={bankChoose === "Usd" ? css.BankCssActive : css.BankCss}>
                   <div>Foreign banks</div>
                   <div className={css.BankImg}>  
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderPayPal2.jpg" width={25}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderMastercard.webp" width={25} style={{borderRadius: "5px"}}/>
                     </div>
                     <div className={css.BankImgSize}> 
                       <Image alt="Obertech" preview={false} src="img/borderGooglePay.png" width={25}/>
                     </div>
                      
                   </div>
                 </div>
                 </Typography.Text>

                <Typography.Text onClick={()=> BankTypo("Coin")}> 
                <div className={bankChoose === "Coin" ? css.BankCssActive  : css.BankCss}>
                    60% USD / 40% Coin
                </div>
                </Typography.Text>
                </>
                } 
            </div>
        </div>
        : null}
        </div>
      </div>
      <div className={css.Reminder}>
      {bankChoose === "Mongol" ? 
        <div className={css.BankGroup}>  
          <div className={css.BankTitle}>Select your payment method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
              <Radio  className={css.BankRadio} value={"khan"}><Image alt="Obertech" preview={false} src="img/khanbank.png" width={100}/></Radio> 
              <Radio  className={css.BankRadio} value={"Monpay"}><Image alt="Obertech" preview={false} src="img/monpay.png" width={100}/></Radio> 
              <Radio  className={css.BankRadio} value={"Golomt"}><Image alt="Obertech" preview={false} src="img/golomt.png" width={90}/></Radio> 
              <Radio  className={css.BankRadio} value={"Tdb"}><Image alt="Obertech" preview={false} src="img/tdbline.png" width={60}/></Radio> 
          </Radio.Group>   
        </div>
        : null}
         {bankChoose === "Usd" ? 
        <div className={css.BankGroup}> 
          <div className={css.BankTitle}>Select your payment method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
              <Radio  className={css.BankRadio} value={"Paypal"}><Image alt="Obertech" preview={false} src="img/paypalLine.png" width={60}/></Radio> 
              <Radio  className={css.BankRadio} value={"Master"}><Image alt="Obertech" preview={false} src="img/masterCardLine.png" width={60}/></Radio>  
          </Radio.Group>  
        </div> : null}

        {bankChoose === "Coin" ? 
        <div className={css.BankGroup}> 
          <div className={css.BankTitle}>Select your payment method?</div> 
          <Radio.Group onChange={bankOnChange} style={{width: "100%"}}> 
               
              <Radio disabled={payInInstallmentsValue === 1 ? true : false} className={payInInstallmentsValue === 1 ? css.BankRadioInActive : css.BankRadio} value={"Foreign"}> 
                {payInInstallmentsValue === 1 ? 
                <Tooltip title="Tips" placement="topLeft">
                  <div className={css.PaySuccess}></div>
                </Tooltip> : null}

              {payInInstallmentsValue === 1 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "210px"}}> 
                  <div className={css.CoinFlex1}> 
                    <div><div style={{marginLeft: "5px"}}>Foreign banks</div> <Image alt="Obertech" preview={false} src="img/cardnuud.png" width={100} style={{marginLeft: "5px"}}/></div> 
                    <div>60%</div>
                  </div>
                </div>  
              </Radio> 

              <Radio  disabled={payInInstallmentsValue === 2 ? true : false} className={payInInstallmentsValue === 2 ? css.BankRadioInActive : css.BankRadio} value={"Coin"} style={{width: "100%"}}>
              {payInInstallmentsValue === 2 ? 
                <Tooltip title="Tips">
                  <div className={css.PaySuccess}></div>
                </Tooltip> : null}
              {payInInstallmentsValue === 2 ? <div className={css.CheckOut}><CheckCircleOutlined /></div> : null}
                <div style={{width: "210px"}}> 
                  <div className={css.CoinFlex1}> 
                    <div className={css.CoinFlex2}><Image alt="Obertech" preview={false} src="img/coinLogo.png" width={20}/> <div style={{marginLeft: "5px"}}>Coin</div></div> 
                    <div>40%</div>
                  </div>
                </div>
              </Radio> 
              
          
          </Radio.Group>  
        </div> : null}
        <div className={css.OrderSummary}>Total</div>
        {bankChoose === "Coin" ? <> 
        <div className={css.SubTotal}><div>Usd</div><div className={payInInstallmentsValue === 1 ? css.SubTotalSuccess : null}>  {totalPriceState * 0.6}$</div></div>
        <div className={css.SubTotal}><div>Coin</div><div className={payInInstallmentsValue === 2 ? css.SubTotalSuccess : null}> {totalPriceState * 0.4}$</div></div>
        </>
        : null }

        <div className={css.SubTotal}><div>Subtotal</div> <div> {totalPriceState}$</div></div>
        <div className={css.TotalLenght}><div>Total({basketContext.basketState.length})</div> <div className={css.TotalLPrice}> 
                
        {payInInstallmentsValue === 1 ? totalPriceState * 0.4 : payInInstallmentsValue === 2 ? totalPriceState * 0.6 : totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div></div>
        <div className={css.ProceedTo}><Button disabled={bankValue === undefined ? true : false} className={css.CheckoutBtn} size="large" onClick={placeOrder}>Place order</Button></div>
      </div>

    {/* <div className={css.HanshRate}> */}
      {/* <div className={css.HanshLayout}> 
        {basketContext.hanshnuud.map((e, i) => (
          <div key={i} className={css.HanshCss}> 
            <div style={{paddingRight: "10px"}}> 
              {e.code_ === "USD" ?  <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}}
                src="/img/united-kingdom.png"/> 
              : e.code_ === "TUG" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px", height: "20px",objectFit: "inherit"}} src="/img/mongolia.png"/> 
              : e.code_ === "COIN" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/HeaderLogo.png"/> : "" } 
          </div>
            <div>{e.paymentName} </div>
            <div style={{paddingLeft: "4px"}}> - {e.rate}{e.code_ === "USD" ? "$" : e.code_ === "TUG" ? "₮" : e.code_ === "COIN" ? "OBOT" : ""}</div>
          </div>
        ))}
      </div> */}
      {/* <div className={css.Section2}>
        <div className={css.RateHdr}>
          <div className={css.RateTitle}>Total price:{totalPriceState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
          </div>
          <div className={css.RateLine}> </div>
        </div>
        <div className={css.RateL}>
          <div className={css.PayLayout}>
            <div> 
              <div>MNT</div>
              <div>100% MNT</div>
            </div>
          </div>

            <div className={css.PayLayout}>
              <div> 
                <div>USD</div>
                <div>100% MNT</div>
              </div>
            </div>
            <div className={css.PayLayout}>
            <div> 
              <div>USD/TOKEN</div>
              <div>60% USD/40% token</div>
            </div>
          </div> 
        </div>
      </div> */}
    {/* </div>  */}
    </div>
    : <div className={css.PayBanks}> 
        {/* <Button onClick={BackFunc} className={css.BackCss}>Back</Button> */}
        {bankValue === "khan" || bankValue === "golomt" || bankValue === "Tdb" || bankValue === "Monpay"? 
        <div> 
        <Tabs defaultActiveKey="4" items={["a","b", "c"].map((Icon, i) => {  
        
        return {label: i === 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Cart {console.log("key", i)}</div> :
                      i === 1 ? <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>QPay</div> : 
                      i === 2 ? <div  style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Шилжүүлэг</div> : null,
          
          key: i, children: i === 0? 
          <div className={css.PaymentCss}>
            {bankValue === "khan" ? 
            <KhanBank totalPriceState={totalPriceState} orgIdRadio={basketContext.orgNames[0].orgIdstate} basketState={basketContext.basketState} sucessOrder={sucessOrder}/> 
            : null}
            {bankValue === "Golomt" ? <div>Golomt </div> : null}
            {bankValue === "Tdb" ? <div>
                <TdbBank />
               </div> : null}
            {bankValue === "Monpay" ? <div>Monpay </div> : null}

          </div> 
          : i === 1 ? <div className={css.PaymentCss}>
           
              <div className={css.Qpay}> 
                <div className={css.QpaySize}>
                  <Image alt="Obertech" preview={false} src="img/qr.png" width={150}/>
                </div>
                <div className={css.QpayTitle}>Төлөх дүн </div>
                <div className={css.QpayPrice}>{totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
              </div>

          </div> : 
            i === 2 ? <div className={css.PaymentCss}>

              <div className={css.ShiljvvlegCont}> 
                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Дансны дугаар </div>
                  <div className={css.ShilTitle2}> 5220042965</div>
                  <div className={css.Copy}> <Paragraph copyable={{ text: "5220042965",  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph></div>
                </div>
                
                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Хүлээн авагч </div>
                  <div className={css.ShilTitle2}> Obortech XXK</div>
                  <div className={css.Copy}>  <Paragraph copyable={{ text: "Obortech XXK",  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph></div>
                </div>

                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Төлөх дүн </div>
                  <div className={css.ShilTitle2}> {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
                  <div className={css.Copy}> 
                    <Paragraph copyable={{ text: totalPriceState,  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph>
                  </div>
                </div>

                <div className={css.Shiljvvleg}>
                  <div className={css.ShilTitle}>Гүйлгээний утга </div>
                  <div className={css.ShilTitle2}> 5220042965</div>
                  <div className={css.Copy}> <Paragraph copyable={{ text: "5220042965",  icon: ["Хуулах", "Хуулагдсан"],   tooltips: ['Хуулах', 'Хуулагдсан']}} ></Paragraph></div>
                </div> 
              
              </div>

            </div> : null,
        };
        })}/>   
        </div> 
        : 
          bankValue === "Paypal" ? <div> 
            <Paypal sucessOrder={sucessOrder} bankValue={bankValue} totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsForeign={PayInInstallmentsForeign} payInInstallmentsValue={payInInstallmentsValue}/>
          </div> : null 
        }

        {bankValue === "Coin" ? 
          <div> 
            <Coin sucessOrder={sucessOrder} totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsCoin={PayInInstallmentsCoin}
             payInInstallmentsValue={payInInstallmentsValue}/>  
          </div>
          : null}

        {bankValue === "Foreign" ? <div>
          <div className={css.ForgeinSideBar}> 
          <div className={css.ForgeinSideContent1}> 
            <Radio.Group onChange={foreignOnChange} style={{width: "100%"}} value={foreignValue}> 
                  <Radio  className={css.BankRadio} value={1}><Image alt="Obertech" preview={false} src="img/paypalLine.png" width={60}/></Radio> 
                  <Radio  className={css.BankRadio} value={2}>
                    <div> Credit or Debit Card</div>
                    <Image alt="Obertech" preview={false} src="img/cardnuud.png" width={130}/></Radio>  
              </Radio.Group>   
            </div>

            {foreignValue === 1 ?
            <div className={css.ForgeinSideContent2}>
              
              <Paypal sucessOrder={sucessOrder} totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsForeign={PayInInstallmentsForeign} payInInstallmentsValue={payInInstallmentsValue}/>
            </div> 
            : null }

            {foreignValue === 2 ? <div className={css.ForgeinSideContent2}> 
            <div className={css.CreditTitle}>Credit or Debit Card </div>
            <div className={css.PayForm}> 
              <CreditOrDebitCard sucessOrder={sucessOrder} totalPriceState={totalPriceState} orgIdRadio={orgIdRadio} basketState={basketContext.basketState} BackFunc={BackFunc} PayInInstallmentsForeign={PayInInstallmentsForeign} payInInstallmentsValue={payInInstallmentsValue}/> 
            </div>
            
            </div> : null}

          </div>
           </div> : null}
      </div>}

      </div>),
},
{
  title: "Completed",
  content: (
    <div> 
     
      <SuccessOrder totalPriceState={successOrderPrice}/>
      <Button onClick={removeBask} shape="circle"> X</Button>
     
  </div>
  ),
},
];

  return (
    <div>
      <BaseLayout pageName="payment">
        <div style={{ fontSize: "14px", fontWeight: "500" }}>
       
        {/*  */}
          {basketContext.basketState.length === 0 || basketContext.orgId === undefined ? (
            <div style={successOrderValue === 2 ? {display: "none"} : {fontSize: "15px", marginTop: "50px"}}><Empty description="Basket is empty"></Empty>
            {/* <SuccessOrder totalPriceState={totalPriceState}/> */}
            </div>
          ) : (
            <div className={css.ContentCss}>
              <Steps current={successOrderValue === 2 ? 2 : current}>
                {steps.map((item) => (<Step key={item.title} title={item.title} />))}
              </Steps>
              <div className="steps-content">{steps[successOrderValue === 2 ? 2 : current].content}</div>
              <div className="steps-action">
                {/* {current < steps.length - 1 && (<Button type="primary" onClick={() => next()}>Continue</Button>)} */}
                {current === steps.length - 1 && (
                  <>
                    <Button icon={<ShoppingCartOutlined />} type="primary" onClick={orderOrgId2}>Done</Button>
                    <Modal title="OrgID" open={isModalVisibleOrgId2} onOk={handleOkOrgId2} onCancel={handleCancelOrgId2} > 
                    
                      <div>Org ID choose: </div> 
                      {/* <Radio.Group onChange={orgIdChoose} > 
                        <Radio checked={checkFalse === false}value={basketContext.orgId}>{basketContext.orgId}</Radio> 
                      </Radio.Group>  */}
                      <Form form={formOrgId} name="normal_login" className={css.LoginForm} labelCol={{span: 6,}} wrapperCol={{span: 16,}} initialValues={{remember: true}}
                        onFinish={onFinishOrgId} onFinishFailed={onFinishFailedOrgId}>
                         <Form.Item label={"orgId"} name="orgId" rules={[{required: true,message: "Please input your Select radio!"}]}>
                          <Radio.Group onChange={orgIdChoose} > 
                            <Radio value={basketContext.orgId}>{basketContext.orgId}</Radio> 
                          </Radio.Group>
                        </Form.Item> 
                        {/* <Form.Item   wrapperCol={{offset: 20, span: 12,}} style={{marginBottom: "-5px"}}>
                          <div><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div>
                        </Form.Item> */}
                      </Form> 
                    </Modal>
                  </>
                )} 
                {bankPay === undefined ? current > 0 && (<Button style={{margin: "0 8px",}}onClick={() => prev()}>Back</Button>) :  <Button onClick={BackFunc}>Back</Button>}
              </div>
            </div>
          )}

          <div>
            {successOrderValue === 2 ? 
               <div className={css.ContentCss}>
               <Steps current={successOrderValue === 2 ? 2 : current}>
                 {steps.map((item) => (<Step key={item.title} title={item.title} />))}
               </Steps>
               <div className="steps-content">{steps[successOrderValue === 2 ? 2 : current].content}</div>
               <div className="steps-action">
               
                 {/* {bankPay === undefined ? current > 0 && (<Button style={{margin: "0 8px",}}onClick={() => prev()}>Back</Button>) :  <Button onClick={BackFunc}>Back</Button>} */}
               </div>
             </div>
            : null}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};
export default Payment;
