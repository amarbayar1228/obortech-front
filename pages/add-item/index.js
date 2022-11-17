import {message,Tabs,Select,Form,Typography } from "antd";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";  
import axios from "axios";
import { useTranslation } from "next-i18next"; 
import Item from "../../components/ItemComp/Item";
import GroupItem from "../../components/ItemComp/GroupItem"; 
const AddBasket = (props) => {
const { t } = useTranslation("add-item"); 
useEffect(() => { 
}, []);
 
const onchangeTab = (a) =>{
  console.log("itemTab",a); 
}
 
return (
<BaseLayout pageName="add-item">
  <div style={{ fontWeight: "500", textTransform: "uppercase", marginLeft: "30px" }}>
<Tabs  onChange={onchangeTab} defaultActiveKey="4" items={["a","b", "c"].map((Icon, i) => {  
return {label: i=== 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Item list </div> : i === 1 ?
  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Group package </div> :  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}> Coupon</div>, 
  key: i, children: i === 0? <div><Item /></div> 
                  : i === 1 ? <div><GroupItem/></div> : i === 2 ? <div> Coupon</div> : null,
};
})}
/> 
  </div>
</BaseLayout>
);
};
export default AddBasket;
