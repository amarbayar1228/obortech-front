import { Badge, Button, Image, message, Modal, notification, Tooltip } from "antd";
import React, { useState } from "react";
import css from "./style.module.css"
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import axios from "axios";
const { confirm } = Modal;
const ItemDel = (props) =>{
  
const showDeleteConfirm = () => {
    confirm({
      title: <div>Are you sure delete this item ?</div>,
      icon: <ExclamationCircleOutlined />,
      content: <div className={css.Layout}>
        <div><Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64," + props.addItemStatus.img} style={{width: "50px"}}/></div>
        <div className={css.Details}>
            <div className={css.Title}>
                <div className={css.TextOver}>{props.addItemStatus.title}</div>
            <div>{props.addItemStatus.status == 1 ? (<Tooltip title="Active"><Badge status="success"   style={{color: "#52c41a",fontWeight: "600"}}/></Tooltip>) : 
                props.addItemStatus.status == 0 ? <Tooltip title="Invisible">  <Badge status="default"  style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
                props.addItemStatus.status == 2 ? <Tooltip title="Disable">  <Badge status="error"   style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
                } </div>
            </div>
            <div className={css.Title}>
                <div className={css.Descr}>{props.addItemStatus.description}</div>
                <div>{props.addItemStatus.price}$</div>
            </div>
        </div>
      </div>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const body = {
            func: "delItem",
            pkId: props.addItemStatus.pkId,
          };
          axios.post("/api/post/Gate", body).then((res) => {    
            if(res.data.error){
              notification.error({
                message: res.data.error,
                description:
                  'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
              });
              props.addItemGetItems();
            }else{
              message.success(props.addItemStatus.title + ' item deleted');
              props.addItemGetItems();
            } 
            }).catch((err) => {console.log("err", err)});
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

return <div>
<Tooltip title="Delete"><Button danger size="small" className={css.BtnReject}  icon={<DeleteOutlined />} onClick={showDeleteConfirm}></Button></Tooltip>
 
</div>
}
export default ItemDel;