import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import css from "./style.module.css"
import axios from 'axios';
const TokenPercentage = () =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const [cash, setCash] = useState(0);
const [getData, setData] = useState([]);

const showModal = () => {
    setIsModalOpen(true);
};
const handleOk = () => {
    console.log("cash", cash);
    const body = {
        func: "setDefMaximFi",
        USD: 100-cash,
        Coin: cash,
        adminPk: localStorage.getItem("pkId"),
    }
    axios.post("/api/post/Gate", body).then((res)=>{
        console.log("res", res.data);
       
        getDefMaximFi();
    }).catch((err)=>{
        console.log("err");
    })
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};
useEffect(()=>{
    getDefMaximFi();
},[]);

const getDefMaximFi = () =>{
    console.log("object");
    const body = {
        func: "getDefMaximFi",
    }
    axios.post("api/post/Gate", body).then((res)=>{
        console.log("rs", res.data);
        setData(res.data.data);
    }).catch((err)=>{
        console.log("err");
    })
}
 
return <div>
    <Button type="primary" onClick={showModal} style={{marginBottom: "10px"}}>+ Add</Button>

      <Modal title="Add" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  > 
      Coin 
      <InputNumber  min={0} max={100} formatter={(value) => `${value}%`} parser={(value) => value.replace('%', '')} style={{width: "100%"}} onChange={(e)=> setCash(e)}  />
      Cash 
      <InputNumber  min={0} max={100} formatter={(value) => `${value}%`} parser={(value) => value.replace('%', '')} style={{width: "100%"}}  value={100-cash} />
      </Modal>

      <div className={css.Coincss}>
        <div className={css.Coinper}>
            Obot percentage
        </div>
        <div className={css.getCoin} style={{borderBottom: "none"}}>{getData.Coin}%</div>
      </div>
      <div className={css.Coincss}>
        <div className={css.Coinper}  style={{borderBottom: "1px solid #ccc"}}>
            Cash percentage
        </div>
        <div className={css.getCoin} >{getData.USD}%</div>
      </div>
</div>
}
export default TokenPercentage;