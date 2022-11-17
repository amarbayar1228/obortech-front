import { Button, Input, Modal, Tabs } from "antd";
import React, { useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css"
const GlobalSettings = () =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = () => {
    setIsModalOpen(true);
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};
    return<BaseLayout pageName="global-settings">
        <Tabs defaultActiveKey="4" items={["a","b"].map((Icon, i) => {  
        
        return {label: i === 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Default incentive percentage</div> :
                      i === 1 ? <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Default Maximum</div> : null,
          
          key: i, children: i === 0? 
          <div className={css.PaymentCss}> 
               <Button type="primary" onClick={showModal}>
                   + Incentive
                </Button>
                <Modal title="Incentive" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                     <div>
                       <div style={{marginBottom: "5px", fontSize: "16px"}}>  Default incentive percentage: </div>
                        <Input placeholder="Please enter your incentive percentage?"/>
                     </div>
                </Modal>
          </div> 
          : i === 1 ? <div className={css.PaymentCss}> 
             <Button type="primary" onClick={showModal}>+ Default Maximum</Button>
                <Modal title="Default Maximum" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                     <div>
                       <div style={{marginBottom: "5px", fontSize: "16px"}}> Default Maximum: </div>
                        <Input placeholder="Please enter your maximum?"/>
                     </div>
                </Modal>
          </div> : null,
        };
        })}/> 
    </BaseLayout>
}
export default GlobalSettings;