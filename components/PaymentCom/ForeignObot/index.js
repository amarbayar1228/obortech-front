import { Button, DatePicker, Form, Image, Radio, Space, InputNumber, message, Input   } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import css from "./style.module.css"
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

const ForeignObot = (props) =>{
const [bankValue, setBankValue] = useState(1);
const [pMethod, setPmethod] = useState(0);
const [payNum, setPayNum] = useState(0);
const basketContext = useContext(BasketContext); 
const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
useEffect(()=>{
    window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches( e.matches ));
    // console.log("props", props);
},[])
const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setBankValue(e.target.value);
};
const onFinished = (values) =>{
    console.log("value: ", values); 
    setPayNum(1);
    setBankValue(2);
    if(payNum === 1 || payNum === 2 ){
        console.log("object");
        message.success("bolsn");
    }
}
const onFinishFailed = () =>{
    console.log("error");
}
const obotFunc = () =>{
    setPayNum(2);
    setBankValue(1);
    console.log("object");
    if(payNum === 1 || payNum === 2 ){
        console.log("object");
        message.success("bolsn");
    }
}
return <div className={css.Flex}>
<div className={css.Cont1}>
<Radio.Group onChange={onChange} value={bankValue} >
    <Radio  className={css.BankRadio} value={1} disabled={payNum === 1 ? true : false}> 
    <div style={{marginLeft: "5px", marginTop: "9px", color: "#4d5057"}}>Foreign banks</div> 
    <Image alt="Obertech" preview={false} src="/img/cardnuud.png" width={100} style={{marginLeft: "5px"}}/>
        <div className={css.Huwi} style={{top: "25px"}}>{props.defaultMaxFi.USD}%</div>
    </Radio>
    <Radio  className={css.BankRadio} value={2} disabled={payNum === 2 ? true : false}>
        <div style={{display: "flex", alignItems: "center", marginLeft: "5px"}}> <Image alt="Obertech" preview={false} src="/img/HeaderLogo.png" width={20}  />
        <div style={{marginLeft: "5px", color: "#4d5057"}}>Obot</div></div> 
        <div className={css.Huwi}>{props.defaultMaxFi.Coin}%</div>
    </Radio> 
    </Radio.Group>

</div>
{bankValue === 1 ?
<div className={css.Cont2}> 
    <div className={css.Content}> 
    {pMethod === 0 ?
    <> 
        <div style={{textAlign: "left", fontWeight: "600", fontSize: "18px", color: "#4d5057"}}>Payment Methods</div>
        <div style={{display: "flex", marginTop: "10px"}}> 
            <div><Button className={css.BankCss} onClick={()=> setPmethod(1)}>  <Image alt="Obertech" preview={false} src="/img/borderPayPal.png" width={70}/> </Button> </div>
            <div><Button className={css.BankCss} onClick={()=> setPmethod(2)}> Credit Card </Button> </div>
 
        </div>
    </> : null }

    {pMethod === 1 ?
    <div> 
        <div className={css.Paypal}> 
            <Button onClick={()=>setPmethod(0)}>Back</Button>
            <div> </div>
        </div> 
        <div style={{display:"flex", justifyContent: "center"}}> 
        <div style={{ width: "430px"}}>
        <Image alt="Obertech" preview={false} src="/img/paypalLine.png" width={120}/>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true}} validateMessages={validateMessages} labelAlign="left" labelCol={{span: 8,}} wrapperCol={{span: 12}}
            onFinish={onFinished} onFinishFailed={onFinishFailed}>
            <Form.Item name="email" label="Card Number" rules={[{ type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Card number!</div>)}]}>
                <InputNumber  maxLength={16} size="middle" placeholder={"0000 0000 0000 0000"} style={{width: "100%"}}/>
                  {/* {matches && (<h1>Big Screen</h1>)}
                                {!matches && (<h3>Small Screen</h3>)} */}
            </Form.Item>
            <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Expiration Date!</div>)}]}>
            <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" style={{width: "110px", display: "flex"}} />
            </Form.Item>  
            <Form.Item name="secrurityCode" label="Security Code" rules={[{type: "number", required: true, message: (<div style={{ fontWeight: "500" }}>Please input your Phone number!</div>)}]}>
                <InputNumber maxLength={3} size="middle" placeholder={"000"}  style={{width: "70px", display: "flex"}}/>
            </Form.Item>  
            <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].usd}$</div></div>
            <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
        </Form>
        </div>
        </div>
    </div>
    : pMethod === 2 ?

    <div> 
        <div className={css.Paypal}> 
            <Button onClick={()=>setPmethod(0)}>Back</Button>
            <div></div>
        </div> 
            <div> Credit </div>
    </div> : null
}
    </div> 
</div>
: <div className={css.Cont2}> 
    <div className={css.Content2}>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{marginBottom: "10px"}}><Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg" width={160}/></div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{color: "#4d5057", fontSize: "16px", fontWeight: "600"}}>Obortech address:  </div>
                    <div><Input  maxLength={16} size="middle" placeholder={"Your current Obortech address is"} style={{marginLeft: "9px",width: "300px"}}/></div>
                </div>
            <div style={{width: "73%", marginTop: "20px"}}>
                <div style={{color: "#4d5057", fontSize: "16px", fontWeight: "600", marginBottom: "5px"}}>Total price: {props.mntUsdPrice[0].obot} Obot</div>
                <Button style={{width: "100%"}} type="primary" onClick={obotFunc}>Pay now</Button>
            </div>
        </div>
    </div> 
</div>}
</div>
}
export default ForeignObot;