import { Button,Empty,Image } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BasketContext from "../../context/basketContext/BasketContext";
import css from "./style.module.css"

const GroupDetails = (props)=>{
const [gItemDetails, setGitemDetails] = useState([]);
const [proPkid,setProPkid] = useState();
const basketContext = useContext(BasketContext);
useEffect(()=>{
    // setTimeout nemsen
    // console.log("item Details ====>>>>>>>>>>>>>>>>>>>>>", props.items);
    // setProPkid(props.items);
    // setTimeout(()=>{
    //     getGroupDetailsFunc(); 
    // },[800])
      
     

},[])
 
const getGroupDetailsFunc = () =>{  

const body = {
func: "getGroups", 
pkId: proPkid};
axios.post("/api/post/Gate", body).then((res) => {  
if (res.data.data.itemList == undefined) 
    {console.log("")} 
else {   
setGitemDetails(res.data.data.itemList);}
}).catch((err) => {console.log("err", err)});
}

    return <div>
        Group Details
       {/* {gItemDetails === undefined ? <Empty /> : (
            <>
            {gItemDetails.map((aa, i) => ( 
                    <div key={i} className={css.BasketItem}>
                    <div className={css.Zurag2}><Image alt="Obertech" preview={false} src={"data:image/png;base64," + aa.img}/></div>
                    <div className={css.Descrip}> 
                        <div className={css.Title}><div className={css.ItemTitle}>{aa.title}</div></div>
                        <div className={css.Price}>
                            <div>Qty: {aa.itemCnt}</div>
                            <div>{aa.itemPriceD}$</div>
                        </div>
                        </div>
                    </div>
                ))}
                </>
            )} */}
    </div>
}
export default GroupDetails;