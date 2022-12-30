import { Button, Form, Image, Input, Modal } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import css from "./style.module.css"
const { TextArea } = Input;

const Home = {
    width: "650px",
    margin: "0px auto",
    border: "1px solid #ccc",
    padding: "40px"
}
const Header =  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
} 
const HdrTitle = {
    textAlign: "right"
}

const HdrSite = {
    marginTop: "15px"
}

const ImgLogo = {
    width: "180px",
    marginLeft: "-8px"
}

const BillTo = {
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
 
  useEffect(()=>{
    console.log("object", props);
    setItems(props.items);
},[]);
  const handleOk = () => {
    // console.log("isOK", userInfo);
    // str = res.data.data[0].date1,
    // strSplit = str.split(" ")[0] + " " + str.split(" ")[1] + " "+ str.split(" ")[2];
    // setDateState(strSplit);


const node = document.getElementById("invoice");
  
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

const number = 9 - orderId.toString().length; 
var result = "";
for(const i = 0; i<number; i++){ 
    result += "0";
} 
console.log("html: ", node); 
console.log("Invoice Number: ", 'In-'+result+orderId);

basketContext.removeBasketStorage();   
const bodySmart = {
    func: "orderSend",
    orderid: orderId,
    }
    axios.post("/api/post/Gate", bodySmart).then((res)=>{
    console.log("smartHubSent: ", res.data);
    }).catch((err)=>{
    console.log("object", err);
    });

},(error) => {console.log(error)});  
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
const onFinish = (values) => {
console.log('Success:', values);
const mounths = ["Jan","Feb","Mar","Apr","May","jun","jul","Aug","Sep","Oct","Nov","Dec",];
var datePlus = new Date();

const date1 =  mounths[datePlus.getMonth()] + " " + datePlus.getDate()+ ", " + datePlus.getFullYear()
datePlus.setDate(datePlus.getDate() + 14); 
const date2 = mounths[datePlus.getMonth()] + " " + datePlus.getDate()+ ", " + datePlus.getFullYear();
setInvoDate([{date1: date1}, {date2: date2}]);

setUserInfo(values)
setIsModalOpen(true);
};
const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};

    return<div>
        <div style={{marginLeft: "27px"}}>
<Form  layout="vertical" name="basic" labelCol={{ span: 8, }} wrapperCol={{span: 16,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
<Form.Item label="Company name" name="companyName" tooltip={"here"} rules={[{required: true,message: 'Please input your Company name!',},]}><Input /></Form.Item> 
<Form.Item label="Surename" name="surename" tooltip={"here"} rules={[{required: true,message: 'Please input your Surename!',},]}><Input /></Form.Item> 
<Form.Item label="Last name" name="lastname" tooltip={"here"} rules={[{required: true,message: 'Please input your Lastname!',},]}><Input /></Form.Item>
<Form.Item label="Company address" name="companyAddress" tooltip={"here"} rules={[{required: true,message: 'Company address!',},]}><TextArea /></Form.Item>
<Form.Item label="Mail" name="mail" tooltip={"here"} rules={[{type: "email",required: true,message: 'Please input your Mail!',},]}><Input /></Form.Item>
<Form.Item wrapperCol={{span: 1}}>
<Button type="primary" htmlType="submit">Sent</Button>
</Form.Item>
</Form>
        <Modal title="Invoice" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={750}>
<div className={css.Modal}> 
    <div style={Home} id="invoice">
        <div style={Header}> 
            <div><Image style={ImgLogo}  alt="Obertech" preview={false} src="/img/OBORTECH_logo_V_clean.svg"/></div>
            <div style={HdrTitle}>
                <div style={{fontSize: "20px", fontWeight: "600"}}>INVOICE</div>
                <div style={{fontWeight: "600"}}>Reg.No: 6371159</div>
                <div>#902, 9th floor, New Horizon Building</div>
                <div>Olympic Street 4, Ulaanbaatar,</div>
                <div>Mongolia.</div>

                <div style={HdrSite}>www.obortech.io</div>
            </div>
        </div>    
            <div style={BillTo}  >
                <div style={BillLeft}>
                    <div style={{color: "#ccc", fontWeight: "600"}}>BILL TO</div>
                    <div>{userInfo.companyName} LLC</div>
                    <div>{userInfo.surename} {userInfo.lastname} </div>
                    <div>{userInfo.companyAddress}</div>
                    <div style={{marginTop: "30px", marginBottom: "10px"}}>{userInfo.mail}</div>
                </div>
                <div style={BillRight} >
                    <div  style={InvoiceNumber}>  
                        <div>Invoice Number: {console.log("date", invoDate)}</div>
                        <div>XXX XXX XXX</div>
                    </div>
                    <div style={InvoiceNumber}> 
                        <div>Invoice Date:</div>
                        <div>{invoDate ? invoDate[0].date1: ""}</div>
                    </div>
                    <div style={InvoiceNumber}> 
                        <div>Payment Due:</div>
                        <div> {invoDate ? invoDate[1].date2: ""}</div>
                    </div>
                    <div style={InvoiceNumber}> 
                        <div>Amount Due(USD):</div>
                        <div>23.000$</div>
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
                <div style={ProductAmount}>{e.price}$</div>
            </div>
            ))}
            <div style={Total} > 
            <div>Total: </div>
            <div>{props.totalPrice}$</div>
            </div>
            <div style={AmountDue}>
            <div>Amount Due(USD):</div>
            <div>{props.totalPrice}$</div>
            </div> 
            <div style={Notes}> 
                <div style={BoldText}>Notes / Terms</div>
                <div style={{color: "red"}}>Нэхэмжлэлийн дугаарыг гүйлгээн дээрээ заавал бичнэ үү!</div>
            </div> 
            <div style={Banks} > 
            <div>
                    <div style={BoldText}>Trade Development Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
                </div>
                <div>
                    <div style={BoldText}>State Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
                </div>
            </div>
            <div className={css.Banks}> 
            <div>
                    <div style={BoldText}>Golomt Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
            </div>
            <div>
                <div style={BoldText} >Khaan Bank</div>
                <div>A/C Name: Обортек Монголиа ХХК</div>
                <div>A/C Number: 555555555555555555</div>
            </div>
            </div> 
    </div>
</div>
      </Modal> 
        </div>
          
    </div>
   
}
export default Invoice;