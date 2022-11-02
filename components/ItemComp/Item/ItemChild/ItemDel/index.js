import { Badge, Button, message, Modal, notification, Tooltip } from "antd";
import React, { useState } from "react";
import css from "./style.module.css"
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import axios from "axios";
const { confirm } = Modal;
const ItemDel = (props) =>{
  
const showDeleteConfirm = () => {
    confirm({
      title: <div>Are you sure disable this <span style={{color: "red"}}>{props.addItemStatus.title} ?</span></div>,
      icon: <ExclamationCircleOutlined />,
    //   content: 'Some descriptions',
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
              message.success(e.title + ' item deleted');
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