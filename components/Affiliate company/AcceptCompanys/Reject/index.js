import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";

const Reject = (props) =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const [data,setData] = useState();
useEffect(()=>{
    console.log("reject useEffect: ", props);
 
    
}, [])
const showModal = () => {
    setIsModalOpen(true);
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};


    return <>
        {/* {props.data === undefined ? "hooson" : props.data.e.PkId} */}
         <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
      </Modal>
    </>
}
export default Reject;