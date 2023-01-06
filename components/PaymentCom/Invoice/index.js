import { Button, Form, Image, Input, message, Modal } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import {CaretRightOutlined,ShoppingCartOutlined,MailOutlined ,ArrowLeftOutlined,DeleteOutlined, PhoneOutlined, CheckCircleOutlined} from "@ant-design/icons";

import css from "./style.module.css"
import ReCAPTCHA from "react-google-recaptcha"; 
import InvoiceHtml from "../InvoiceHtml";
const { TextArea } = Input;

const Home = {
    position: "relative",
    width: "650px",
    margin: "0px auto",
    border: "1px solid #ccc",
    padding: "40px",
    color: "#000"
}
const Header =  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "570px"
} 
const HdrTitle = {
    textAlign: "right",
    width: "285px"
} 
const HdrSite = {
    marginTop: "15px"
} 
const ImgLogo = {
    width: "180px",
    marginLeft: "-8px"
} 
const BillTo = {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    borderTop: "1px solid #ccc",
    paddingTop: "5px",
} 
const BillRight = {
    marginTop: "10px",
    textAlign: "right",
    fontWeight: "600",
    lineHeight: "30px",
    width: "300px",
} 
const BillLeft = {
    textAlign: "left",
    width: "300px"
} 
const InvoiceNumber  = {
    display: "flex",
    justifyContent: "space-between"
} 
const Product = {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
    fontWeight: "600",
    marginTop: "10px"
} 
const ProductTitle = {
    width: "400px",
    lineBreak: "anywhere"
} 
const ProductQuantity = {
    width: "100px",
    textAlign: "right"
} 
const ProductPrice =  {
    width: "100px",
    textAlign: "right"
} 
const ProductAmount = {
    textAlign: "right",
    width: "100px"
} 
const Total = {
    display: "flex",
    borderTop: "1px solid #000",
    marginTop: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "right",
    fontWeight: "600",
    justifyContent: "flex-end"
} 
const AmountDue = {
    borderTop: "1px solid #000",
    display: "flex",
    width: "50%",
    justifyContent: "space-between",
    fontWeight: "600",
    marginLeft: "50%",
} 
const Banks = {
    display: "flex",
    justifyContent:"space-between",
    textAlign: "left",
    margin: "10px 0px",
} 
const Notes = {
    textAlign: "left"
} 
const BoldText = {
    fontWeight: "600"
}
const Invoice = (props) =>{
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const [htmlTag, setHtmlTag] = useState();
    const basketContext = useContext(BasketContext); 
    const [invoDate, setInvoDate] = useState();
    const [invoNumber, setInvoNumber] = useState("XXXXXXXXX");
    const [price, setPrice] = useState(0);
    const [loadingSt, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const recaptchaRef = useRef();
  useEffect(()=>{
    console.log("object", props);
    console.log("hansh: ", basketContext.hanshnuud[1].rate);
    const price = props.totalPrice * basketContext.hanshnuud[1].rate;
    console.log("price: ", price);
    setPrice(price);
    setItems(props.items);

},[]);
const inNumber = "XXXXXXXXXXX";
  const handleOk = () => { 
    //lkhagvatsend.99@gmail.com
    //blr8391@gmail.com
    //togosorea@gmail.com
    //bulganb28@gmail.com
    //amarbayarbatbayar2@gmail.com

    // const sentInvo = {
    // func: "sendMail",
    // email: userInfo.mail,
    // body: invoHtml.innerHTML,
    // title_: "In444"
    // }
    // axios.post("/api/post/Gate", sentInvo).then((res)=>{
    // console.log("sentInvo: ", res.data);
    // }).catch((err)=>console.log("err", err)); 
  };
const handleCancel = () => {
setIsModalOpen(false);
};
 
const onFinish = (values) => {
    // props.invoiceSuccessFunc();
setLoading(true);
console.log('Success:', values);
localStorage.setItem("invoF", JSON.stringify(values));

const mounths = ["Jan","Feb","Mar","Apr","May","jun","jul","Aug","Sep","Oct","Nov","Dec",];
var datePlus = new Date();

const date1 =  mounths[datePlus.getMonth()] + " " + datePlus.getDate()+ ", " + datePlus.getFullYear()
datePlus.setDate(datePlus.getDate() + 14); 
const date2 = mounths[datePlus.getMonth()] + " " + datePlus.getDate()+ ", " + datePlus.getFullYear();
setInvoDate([{date1: date1}, {date2: date2}]);

localStorage.setItem("d1",  JSON.stringify([{date1: date1}, {date2: date2}]));
setUserInfo(values);

setTimeout(() => {  
console.log("userInfo: ", userInfo.mail);
    const invoHtml = document.getElementById("invoice");
    console.log("html: ",invoHtml.innerHTML);  
const arr = props.items; 
arr.forEach((element, i) => {
if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
});     
 const body = [];
if(localStorage.getItem("token")){
    if(localStorage.getItem("token").length >6){
        body = {
            func: "neworder",
            item: arr,
            orgId: basketContext.orgNames[0].orgIdstate,
            totalPrice: props.totalPrice, 
            pkId: localStorage.getItem("pkId"), 
            }; 
    }else{console.log("token urt baga bn");} 
}else{
    console.log("false");
    body = {
    func: "neworder",
    orgId: basketContext.orgNames[0].orgIdstate,
    totalPrice: props.totalPrice,
    item: arr, 
    };  
} 
console.log("body: ", body); 
axios.post("/api/post/Gate", body).then((result) => {
console.log("res orderId: ", result.data.orderid);   
const orderId = result.data.orderid; 
props.invoiceSuccessFunc();
const number = 9 - orderId.toString().length; 
var result = "";
for(const i = 0; i<number; i++){ 
    result += "0";
} 

console.log("Invoice Number: ", 'In-'+result+orderId);
inNumber = "Invoice Number: ", 'In-'+result+orderId;
setInvoNumber("In-"+result+orderId);
 
const sentInvo = {
    func: "sendMail",
    email: values.mail,
    body: invoHtml.innerHTML,
    title_: "Invoice"
    }
    axios.post("/api/post/Gate", sentInvo).then((res)=>{
    setLoading(false);
    message.success("mail sending..");
    props.sucessOrder();
    basketContext.removeBasketStorage(); 
    console.log("sentInvo: ", res.data);
    }).catch((err)=>console.log("err", err));

  
const bodySmart = {
    func: "orderSend",
    orderid: orderId,
    }
    axios.post("/api/post/Gate", bodySmart).then((res)=>{
    console.log("smartHubSent: ", res.data);
    // message.success("success");
    setIsModalOpen(false);
    }).catch((err)=>{
    console.log("object", err);
    });

},(error) => {console.log(error)});  

}, 1000); 
 
};
const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};
const onChangeCaptcha = (a) =>{ 
    console.log("captcha change: ", a);
    a == null ? setDisable(true) : setDisable(false);
  }
  const errorCapt = (err) =>{
    console.log("err", err);
  }
    return<div>
        <div style={{display: "flex", alignItems: "center", fontWeight: "600", fontSize: "20px", marginBottom: "10px"}}> 
            <div style={{marginRight: "5px", display: "flex", alignItems: "center"}}>
                <Button size="small" type="link" onClick={props.invoBack} icon={<ArrowLeftOutlined />}></Button> 
            </div>
            <div>Invoice </div>
        </div>

        <div style={{marginLeft: "27px"}}>
<Form   layout="vertical" name="basic" labelCol={{ span: 8, }} wrapperCol={{span: 16,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
<Form.Item label="Company name" name="companyName" tooltip={"here"} rules={[{required: true,message: 'Please input your Company name!',},]}><Input /></Form.Item> 

<Form.Item label="Surename" name="surename" tooltip={"here"} rules={[{required: true,message: 'Please input your Surename!',},]}><Input /></Form.Item> 
<Form.Item label="Last name" name="lastname" tooltip={"here"} rules={[{required: true,message: 'Please input your Lastname!',},]}><Input /></Form.Item>
<Form.Item label="Mail" name="mail" tooltip={"here"} rules={[{type: "email",required: true,message: 'Please input your Mail!',},]}><Input /></Form.Item>
<Form.Item label="Company address" name="companyAddress" tooltip={"here"} rules={[{required: true,message: 'Company address!',},]}><TextArea /></Form.Item>
<div style={{marginBottom: "20px"}}> 
<ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef} sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
</div>
<Form.Item wrapperCol={{span: 1}}><Button type="primary" htmlType="submit" disabled={disable} loading={loadingSt}>Generate</Button></Form.Item>
</Form>


 
{/* <Modal title="Invoice- XXXXXX" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={750}>
<div className={css.Modal}> 

</div>
</Modal>  */}
<div style={{display: "none"}}> 
<div id="invoice">  
    <div style={Home} >
        <div  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>  
            <div style={{width: "285px"}}> 
                <img src="https://scontent.fuln1-2.fna.fbcdn.net/v/t39.30808-6/267946776_4702286443188593_9002145977596374642_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=KC5BsR7b7VwAX_c5gG8&_nc_ht=scontent.fuln1-2.fna&oh=00_AfD8VzSabDO3RRttP31rTOYxRW3PGPh-PZg-ltD4J9HlKw&oe=63B8199A"  style={{width: "180px", marginLeft: "-8px" }}/>
                </div>
            <div style={{textAlign: "right", width: "100%"}}>
                <div style={{fontSize: "20px", fontWeight: "600"}}>INVOICE</div>
                <div style={{fontWeight: "600"}}>Reg.No: 6371159</div>
                <div>#902, 9th floor, New Horizon Building</div>
                <div>Olympic Street 4, Ulaanbaatar,</div>
                <div>Mongolia.</div>

                <a href="www.obortech.io" style={{marginTop: "15px"}}>www.obortech.io</a>
            </div>
        </div>    
            <div style={{position: "relative", width: "100%", display: "flex",   marginTop: "15px", borderTop: "1px solid #ccc", paddingTop: "5px"}} >
                <div style={{width: "270px", textAlign: "left"}}>
                    <div style={{color: "#ccc", fontWeight: "600"}}>BILL TO</div>
                    <div>{userInfo.companyName} LLC</div>
                    <div>{userInfo.surename} {userInfo.lastname} </div>
                    <div>{userInfo.companyAddress}</div>
                    <div style={{marginTop: "30px", marginBottom: "10px"}}>{userInfo.mail}</div>
                </div>
                <div style={{marginTop: "10px", textAlign: "right", fontWeight: "600", lineHeight: "30px", width: "329px", marginLeft: "50px"}} >
                    <div style={{display: "flex"}}>  
                        <div style={{width: "160px", textAlign: "left"}}>Invoice Number:  </div>
                        <div style={{width: "50%", textAlign: "right"}}>{invoNumber}</div>
                    </div>
                    <div style={{display: "flex" }}> 
                        <div style={{width: "160px", textAlign: "left"}}>Invoice Date:</div>
                        <div style={{width: "50%", textAlign: "right"}}>{invoDate ? invoDate[0].date1: ""}</div>
                    </div>
                    <div style={{display: "flex" }}> 
                        <div style={{width: "160px", textAlign: "left"}}>Payment Due:</div>
                        <div style={{width: "50%", textAlign: "right"}}> {invoDate ? invoDate[1].date2: ""}</div>
                    </div>
                    <div style={{display: "flex" }}> 
                        <div style={{width: "160px", textAlign: "left"}}>Amount Due(MNT):</div>
                        <div style={{width: "50%", textAlign: "right"}}>{price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮</div>
                    </div>
                    
                </div>
            </div>
            <div  style={Product}>
                <div style={ProductTitle}>Product</div>
                <div style={ProductQuantity}>Quantity</div>
                <div style={ProductPrice}>Price</div>
                <div style={ProductAmount}>Amount</div>
            </div>
            {items.map((e, i)=>(
            <div style={Product} key={i}>
                <div style={ProductTitle}>{e.title}</div>
                <div style={ProductQuantity}>{e.cnt}</div>
                <div style={ProductPrice}>{e.price}$</div>
                <div style={ProductAmount}>{e.price * e.cnt}$</div>
            </div>
            ))}
            <div style={Total} > 
            <div>Total: </div>
            <div>{props.totalPrice}$</div>
            </div>
            <div style={AmountDue}>
            <div>Amount Due(MNT):</div>
            <div>{price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮</div>
            </div> 
            <div style={Notes}> 
                <div style={BoldText}>Notes / Terms</div>
                <div style={{color: "red"}}>Нэхэмжлэлийн дугаарыг гүйлгээн дээрээ заавал бичнэ үү!</div>
            </div> 
            <div style={{display: "flex", textAlign: "left", margin: "10px 0px"}} > 
                <div style={{width: "50%"}}>
                    <div style={BoldText}>Trade Development Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
                </div>
                <div style={{marginLeft: "10px", width: "50%"}}>
                    <div style={BoldText}>State Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
                </div>
            </div>
            <div style={{display: "flex", textAlign: "left", margin: "10px 0px"}}> 
            <div style={{width: "50%"}}>
                    <div style={BoldText}>Golomt Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
            </div>
            <div style={{marginLeft: "10px", width: "50%"}}>
                <div style={BoldText} >Khaan Bank</div>
                <div>A/C Name: Обортек Монголиа ХХК</div>
                <div>A/C Number: 555555555555555555</div>
            </div>
            </div> 
    </div>
</div>
 
</div>
        </div>
          
    </div>
   
}
export default Invoice;