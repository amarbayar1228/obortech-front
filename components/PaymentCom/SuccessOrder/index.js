import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import css from "./style.module.css"
import {CheckOutlined} from "@ant-design/icons";
const SuccessOrder = (props) =>{ 
    const [price,setPrice]= useState(0);
    const [toggle, setToggle] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(()=>{
        console.log("items: ", props.items);
    if(props.totalPriceState > 0 ){
        setPrice(props.totalPriceState);
        setItems(props.items);
        setToggle(true);
    }
        // setTitle(props.totalPriceState);

    },[])
const cancelF = () =>{
    setPrice(0);
    setToggle(false);
}
return <div>    
    {toggle ?
    <div className={css.Absolute}>
    Logo 
    </div>
    : ""}
</div> 
}
export default SuccessOrder;