import { Button, Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {CaretRightOutlined,ShoppingCartOutlined,MailOutlined ,InfoCircleOutlined,DeleteOutlined, PhoneOutlined, CheckCircleOutlined} from "@ant-design/icons";
import css from "./style.module.css"
const ItemDetails = (props) =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        console.log("props: ", props);
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

   

    return <div>  <Button size="small"  type="link"  onClick={showModal}><InfoCircleOutlined /></Button>
            <Modal title="Item details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                <div className={css.Flex}> 
                    {props.data.img? <Image alt="Obertech" preview={false} src={"data:image/png;base64," + props.data.img} width={120}/> : 
                        <div className={css.Group}>Group </div>
                    }
                    <div style={{padding: "0px 10px", color: "#4d5057"}}>
                        <div className={css.Title}>{props.data.title}</div>
                        <div className={css.Description}>{props.data.description}</div>
                        <div className={css.Cnt}>Qty: {props.data.cnt}</div>
                        <div className={css.Price}>Price: {props.data.price}$</div>
                    </div> 
                </div>
      </Modal>
</div>
}
export default ItemDetails;