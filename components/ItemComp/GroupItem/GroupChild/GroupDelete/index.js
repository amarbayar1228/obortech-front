import { Badge, Button, Image, message, Modal, notification, Tooltip } from "antd";
import React from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import css from "./style.module.css"
const GroupDelete = (props) => {
  const confirm = () => {
    Modal.confirm({ title: "Are you sure delete this group ?", icon: <ExclamationCircleOutlined />,
      content:<div className={css.Layout}>
      <div className={css.GroupText}> G </div>
      <div className={css.Details}>
          <div className={css.Title}>
              <div className={css.TextOver}>{props.groupData.title}</div>
          <div>{props.groupData.status == 1 ? (<Tooltip title="Active"><Badge status="success"   style={{color: "#52c41a",fontWeight: "600"}}/></Tooltip>) : 
              props.groupData.status == 0 ? <Tooltip title="Invisible">  <Badge status="default"  style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
              props.groupData.status == 2 ? <Tooltip title="Disable">  <Badge status="error"   style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
              } </div>
          </div>
          <div className={css.Title}>
              <div className={css.Descr}>{props.groupData.description}</div>
              <div>{props.groupData.price}$</div>
          </div>
      </div>
    </div>,
      okText: "Yes",
      onOk: okButtonProps,
      cancelText: "No",
    });
  };
  const okButtonProps = () => {
    console.log("props", props);
    const body = {
      func: "delGroups",
      pkId: props.groupData.pkId,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        console.log("res delete: ", res.data);
        if(res.data.error){
            notification.error({
              message: res.data.error,
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
            props.getGroupItems();
          }else{
            message.success(props.groupData.title + ' item deleted');
            props.getGroupItems();
          }  
      }).catch((err) => {console.log("err: ", err)});
  };

  return (
    <div>
      <Button style={{ marginLeft: "3px", marginRight: "3px" }} danger type="primary"   size="small"onClick={confirm}icon={<DeleteOutlined />}></Button>
    </div>
  );
};

export default GroupDelete;
