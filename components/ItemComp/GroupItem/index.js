import React, { useEffect } from "react";
 const GroupItem = () =>{
    useEffect(()=>{
        console.log("group item component");
    },[])
    return<div>
        Group item 2
    </div>
 }

 export default GroupItem;