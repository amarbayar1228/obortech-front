 
import { Button, DatePicker, Form, InputNumber, message } from "antd";
import css from "./style.module.css"
import moment from 'moment';
import { useContext } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import axios from "axios";
const monthFormat = 'YYYY/MM';
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

const CreditOrDebitCard = (props) =>{
const basketContext = useContext(BasketContext); 
const onFinished = (values) =>{
    console.log("value: ", values); 
    console.log("orgIdRadio: ",props.orgIdRadio );
    console.log("basketState: ",props.basketState );
    console.log("price: ", props.totalPriceState);
    const arr = props.basketState ;
    // img tei bol Item, imggui bol Group
    arr.forEach((element, i) => {
    if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
    });  

    // newtersen hereglegch bwl Axiosru shidne
    if (localStorage.getItem("token")) {
      const body = arr;
      const body2 = {
        func: "neworder",
        item: body,
        orgId: props.orgIdRadio,
        totalPrice: props.totalPriceState, 
        pkId: localStorage.getItem("pkId"), 
      };
      console.log("bodyId:2  ===>> ", body2);
      var basketLocal = [];
      axios.post("/api/post/Gate", body2).then((result) => {
        //   basketContext.removeBasketStorage();   
        message.success("Success");
        props.payInInstallmentsValue === 2 ? basketContext.removeBasketStorage() : props.PayInInstallmentsForeign(), props.BackFunc()
     
        },(error) => {console.log(error)}); 
      } else {
    // newtreeq hereglegch bwl Axiosru shidne
      const bodyNoId = {
        func: "neworder",
        orgId: props.orgIdRadio,
        totalPrice: props.totalPriceState,
        item: arr, 
      };
      console.log("bodyNoId: ", bodyNoId);
      axios.post("/api/post/Gate", bodyNoId).then((result) => {
        message.success("Success");
        props.payInInstallmentsValue === 2 ? basketContext.removeBasketStorage() : props.PayInInstallmentsForeign(), props.BackFunc()
        //   basketContext.removeBasketStorage();  
        },(error) => {console.log(error)});
      }
}
const onFinishFailed = () =>{
    console.log("error");
}
    return <div>

        <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
            onFinish={onFinished} onFinishFailed={onFinishFailed}>
            <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
                <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
            <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
            </Form.Item>  
            <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
                <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
            </Form.Item>  
            <div className={css.Price}> <div>Total Payment</div> <div>{props.totalPriceState * 0.6}$</div></div>
            <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
        </Form>

    </div>
}
export default CreditOrDebitCard;