import {message,Tabs,Select,Form,Typography, Spin, Empty } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";  
import axios from "axios";
import { useTranslation } from "next-i18next"; 
import Item from "../../components/ItemComp/Item";
import GroupItem from "../../components/ItemComp/GroupItem"; 
import BasketContext from "../../context/basketContext/BasketContext";
import css from "./style.module.css"
const AddBasket = (props) => {
const { t } = useTranslation("add-item"); 
const basketContext = useContext(BasketContext);
const [loggedLoad, setLoggedLoad]= useState(true);
useEffect(() => { 
 
  // basketContext.getUserProfileFunction();
  setTimeout(()=>{
    setLoggedLoad(false); 
  },800);
}, []);
 
const onchangeTab = (a) =>{
  // console.log("itemTab",a); 
}
 
return (
<BaseLayout pageName="add-item"> 
  {loggedLoad ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px"}}/>  : <> 
  {basketContext.userInfoProfile ?  
  <>
  {basketContext.userInfoProfile.isSuperAdmin === 1 || basketContext.userInfoProfile.isSuperAdmin === 2 ?
  <div style={{ fontWeight: "500", textTransform: "uppercase", marginLeft: "30px" }}>
<Tabs  onChange={onchangeTab} defaultActiveKey="4" items={["a","b", "c"].map((Icon, i) => {  
return {label: i=== 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Item list </div> : i === 1 ?
  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Group package </div> :  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}> Coupon</div>, 
  key: i, children: i === 0? <div><Item /></div> 
                  : i === 1 ? <div><GroupItem/></div> : i === 2 ? <div className={css.GroupItemCss}> 

                    <div className={css.Container}> 
                        <p className={css.Text}> Coming soon...</p>
                    </div>


                  </div> : null,
};
})}
/> 
  </div>
  : <Empty /> }
  </>
  : <Empty />}
  </>}
</BaseLayout>
);
};
export default AddBasket;
