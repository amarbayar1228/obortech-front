import { Button, DatePicker, Form, Image, Radio, Space, InputNumber, message, Input   } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import css from "./style.module.css"
import moment from 'moment';
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

const MongolianObot = (props) =>{
const [bankValue, setBankValue] = useState(1);
const [pMethod, setPmethod] = useState(0);
const [payNum, setPayNum] = useState(0);
const basketContext = useContext(BasketContext); 
const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
const [item, setItem] = useState(null);
useEffect(()=>{
    window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches( e.matches ));
    console.log("props", props);
    setItem(props.item);
},[])
const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setBankValue(e.target.value);
};
const onFinished = (values) =>{
    console.log("value: ", values); 
    setPayNum(1);
    setBankValue(2);
    props.mnBack("isOk"); 
    console.log("object"); 
if(payNum === 1 || payNum === 2 ){
    console.log("object");
    message.success("Success");

const arr = item;
// img tei bol Item, imggui bol Group

arr.forEach((element, i) => {
if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
});       
console.log("item: ", arr);
console.log("orgId", basketContext.orgNames[0].orgIdstate);   
console.log("price: ", props.price);

// newtersen hereglegch bwl Axiosru shidne
if (localStorage.getItem("token")) {
const body = arr;
const body2 = {
func: "neworder",
item: body,
orgId: basketContext.orgNames[0].orgIdstate,
totalPrice: props.price, 
pkId: localStorage.getItem("pkId"), 
};

axios.post("/api/post/Gate", body2).then((result) => {
console.log("res orderId: ", result.data.orderid); 
props.sucessOrder();  
basketContext.removeBasketStorage();   

const bodySmart = {
    func: "orderSend",
    orderid: result.data.orderid
    }
    axios.post("/api/post/Gate", bodySmart).then((res)=>{
    console.log("res: ", res.data);
    }).catch((err)=>{
    console.log("object", err);
    });

},(error) => {console.log(error)}); 
} else { 
const bodyNoId = {
func: "neworder",
orgId: basketContext.orgNames[0].orgIdstate,
totalPrice: props.price,
item: arr, 
}; 

axios.post("/api/post/Gate", bodyNoId).then((result) => {
console.log("res orderId: ", result.data.orderid);  
props.sucessOrder();  
basketContext.removeBasketStorage();  
const bodySmart = {
    func: "orderSend",
    orderid: result.data.orderid
    }
    axios.post("/api/post/Gate", bodySmart).then((res)=>{
    console.log("res: ", res.data);
    }).catch((err)=>{
    console.log("object", err);
    });

},(error) => {console.log(error)});

}

}
}
const onFinishFailed = () =>{
    console.log("error");
}
const obotFunc = () =>{

    setPayNum(2);
    setBankValue(1); 
if(payNum === 1 || payNum === 2 ){

message.success("Success");
const arr = item;
// img tei bol Item, imggui bol Group

arr.forEach((element, i) => {
if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
});       
console.log("item: ", arr);
console.log("orgId", basketContext.orgNames[0].orgIdstate);   
console.log("price: ", props.price);

// newtersen hereglegch bwl Axiosru shidne
if (localStorage.getItem("token")) {
const body = arr;
const body2 = {
func: "neworder",
item: body,
orgId: basketContext.orgNames[0].orgIdstate,
totalPrice: props.price, 
pkId: localStorage.getItem("pkId"), 
};

axios.post("/api/post/Gate", body2).then((result) => {
console.log("res orderId: ", result.data.orderid); 
props.sucessOrder();  
basketContext.removeBasketStorage();   

const bodySmart = {
    func: "orderSend",
    orderid: result.data.orderid
    }
    axios.post("/api/post/Gate", bodySmart).then((res)=>{
    console.log("res: ", res.data);
    }).catch((err)=>{
    console.log("object", err);
    });

},(error) => {console.log(error)}); 
} else { 
const bodyNoId = {
func: "neworder",
orgId: basketContext.orgNames[0].orgIdstate,
totalPrice: props.price,
item: arr, 
}; 

axios.post("/api/post/Gate", bodyNoId).then((result) => {
console.log("res orderId: ", result.data.orderid);  
props.sucessOrder();  
basketContext.removeBasketStorage();  
const bodySmart = {
    func: "orderSend",
    orderid: result.data.orderid
    }
    axios.post("/api/post/Gate", bodySmart).then((res)=>{
    console.log("res: ", res.data);
    }).catch((err)=>{
    console.log("object", err);
    });

},(error) => {console.log(error)});

}

}
}
return <div className={css.Flex}>
<div className={css.Cont1}>
<Radio.Group onChange={onChange} value={bankValue} >
    <Radio  className={payNum === 1 ? css.BankRadio2 : css.BankRadio} value={1} disabled={payNum === 1 ? true : false}> 
    <div style={{marginLeft: "5px", marginTop: "9px", color: "#4d5057"}}>Mongolian banks</div> 
        <div style={{display: "flex"}}> 
            <div className={css.BankImgSize2}> 
            <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={15}/>
            </div>
            <div className={css.BankImgSize2}> 
                <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={15} style={{borderRadius: "5px"}}/>
            </div>
            <div className={css.BankImgSize2}> 
                <Image alt="Obertech" preview={false} src="/img/borderHas.png" width={15}/>
            </div>
            <div className={css.BankImgSize2}> 
                <Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={16}/>
            </div>
        </div>
        <div className={css.Huwi} style={{top: "25px"}}>{props.defaultMaxFi.USD}%</div>
    </Radio>
    <Radio  className={payNum === 2 ? css.BankRadio2 : css.BankRadio} value={2} disabled={payNum === 2 ? true : false}>
        <div style={{display: "flex", alignItems: "center", marginLeft: "5px"}}> <Image alt="Obertech" preview={false} src="/img/HeaderLogo.png" width={20}  />
        <div style={{marginLeft: "5px", color: "#4d5057"}}>Obot</div></div> 
        <div className={css.Huwi}>{props.defaultMaxFi.Coin}%</div>
    </Radio> 
</Radio.Group>

<div className={css.ValitCss}>
    {/* <div style={{textAlign: "center", padding: "5px", fontWeight: "600", color: "#4d5057"}}>Valid</div>
    <div>
        <div style={{display: "flex", borderBottom: "1px solid #ccc", justifyContent: "space-between", padding: "5px", fontWeight: "600", color: "#4d5057"}}>
            <div>MNT</div>
            <div>2335$</div>
        </div>
        <div style={{display: "flex", borderBottom: "1px solid #ccc", justifyContent: "space-between", padding: "5px", fontWeight: "600", color: "#4d5057"}}>
            <div>Obot</div>
            <div>2335obot</div>
        </div>
    </div> */}
    <div className={css.Basket}> 
        <div>Cart</div>
        <div style={{display: "flex", textAlign: "left", fontWeight: "600", color: "#4d5057"}}>
            <div style={{width: "50px"}}>Zurag</div>
            <div style={{width: "100px"}}>Item name</div>
            <div style={{width: "40px"}}>Cnt</div>
            <div style={{width: "53px"}}>Price</div>
        </div>
        {item === null ? ""
        :  <>
            {item.map((e, i)=>(
                <div style={{display: "flex", borderBottom: "1px solid #ccc", textAlign: "left", color: "#4d5057", padding: "5px"}} key={i}>
                <div style={{width: "50px"}}>
                     {e.img ? 
                    <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img} width={25}/>
                    : <div className={css.Group}> G </div>}
                </div> 
                <div className={css.ItemTitle}>{e.title}</div>
                <div style={{width: "40px" }}>{e.cnt}</div>
                <div style={{width: "53px" }}>{e.price}$</div>
                </div>
            ))}
            <div style={{marginTop: "7px", textAlign: "left", fontWeight: "600"}}>Price: {props.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
        </>
        }
        
        
    </div>
</div>
</div>
{bankValue === 1 ?
<div className={css.Cont2}> 
    <div className={css.Content}> 
    {pMethod === 0 ?
    <> 
        <div style={{textAlign: "left", fontWeight: "600", fontSize: "18px", color: "#4d5057"}}>Select your payment method?</div>
        <div style={{display: "flex", marginTop: "10px"}}> 
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(1)}> 
                    <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={30}/> 
                    <div>Khan bank</div>
                </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(2)}>
                    <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={30}/> 
                    <div>Golomt bank</div>
                 </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(3)}>
                    <Image alt="Obertech" preview={false} src="/img/borderHas.png" width={30}/> 
                    <div>Xac bank</div>
                 </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(4)}>
                    <Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={30}/> 
                    <div>Trade and</div>
                    <div>Development Bank</div>
                 </Button> 
            </div> 
        </div>
        <div style={{display: "flex", marginTop: "10px"}}> 
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(5)}> 
                    <Image alt="Obertech" preview={false} src="/img/monpay-brand-logo.png" width={30}/> 
                    <div>Monpay</div>
                </Button> 
            </div>
            <div>
                <Button className={css.BankCss} onClick={()=> setPmethod(6)}>
                    <Image alt="Obertech" preview={false} src="/img/qpay.png" width={60}/> 
                    {/* <div>Qpay</div> */}
                 </Button> 
            </div>
           
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
        <Image alt="Obertech" preview={false} src="/img/khanbankH.png" width={180} style={{marginBottom: "10px"}}/>
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
            <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
            <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
        </Form>
        </div>
        </div>
    </div>
    : pMethod === 2 ? 
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/golomt.png" width={180} style={{marginBottom: "10px"}}/>
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
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 3 ?
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/xacbank.png" width={180} style={{marginBottom: "10px"}}/>
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
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 4 ?
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/tdbline.png" width={180} style={{marginBottom: "10px"}}/>
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
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 5 ?
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/monpay.png" width={210} style={{marginBottom: "20px"}}/>
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
        <div className={css.Price}> <div>Total Payment</div> <div> {props.mntUsdPrice[0].mnt}₮</div></div>
        <Form.Item  wrapperCol={{span: 24}}> <div className={css.Login}><Button style={{width: "100%"}} type="primary" htmlType="submit" className="login-form-button">Pay now</Button></div></Form.Item>
    </Form>
    </div>
    </div>
    </div>
    : pMethod === 6 ?     
    <div> 
    <div className={css.Paypal}> 
        <Button onClick={()=>setPmethod(0)}>Back</Button>
        <div> </div>
    </div> 
    <div style={{display:"flex", justifyContent: "center"}}> 
    <div style={{ width: "430px"}}>
    <Image alt="Obertech" preview={false} src="/img/qpay.png" width={180} style={{marginBottom: "10px"}}/>
    <Image alt="Obertech" preview={false} src="/img/qr.png" width={180} style={{marginBottom: "10px"}}/>
    </div>
    </div>
    </div>
    : ""          
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
export default MongolianObot;