import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import css from "./style.module.css"
import axios from "axios";
import { useContext } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import moment from 'moment';
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
const Coin = (props) =>{
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
if(props.payInInstallmentsValue === 1){
    basketContext.removeBasketStorage();
    props.sucessOrder();
}else {
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
    props.payInInstallmentsValue === 1 ? (basketContext.removeBasketStorage(),  props.sucessOrder()) : props.PayInInstallmentsCoin(), props.BackFunc();
    
    
        
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
    props.payInInstallmentsValue === 1 ? (basketContext.removeBasketStorage(),  props.sucessOrder()) : props.PayInInstallmentsCoin(), props.BackFunc();
    //   basketContext.removeBasketStorage();  
    },(error) => {console.log(error)});
    }
}

}
const onFinishFailed = () =>{
    console.log("error");
}
return <div className={css.DisplayCss}>
    <div style={{marginBottom: "10px", fontSize: "18px", fontWeight: "600"}}>Obortech Coin</div>
    <div> 
        <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages}  
            onFinish={onFinished} onFinishFailed={onFinishFailed}>
            <div style={{textAlign: "left"}}>Obortech address</div>
            <Form.Item name="email" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input Your current Obortech address!</div>)}]}>
                {/* <div style={{textAlign: "left"}}>Obortech address</div> */}
                <Input  maxLength={16} size="middle" placeholder={"Your current Obortech address is"} style={{width: "100%"}}/>
            </Form.Item>
                                                                                                                                                    
             
            <div className={css.Price}> <div>Total Payment</div> <div>{props.totalPriceState * 0.4}$</div></div>
            <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
        </Form>
    </div>
</div>
}
export default Coin;