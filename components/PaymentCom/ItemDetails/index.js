import { Button } from "antd";
import React, { useEffect } from "react";

const ItemDetails = (props) =>{
    useEffect(()=>{
        console.log("props: ", props.item);
    })
    return <div><Button style={{width: "100%", marginTop: "5px"}} size="middle" type="primary" shape="round"> Items</Button></div>
}
export default ItemDetails;