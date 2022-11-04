import { Badge, Button, message, Modal, Tooltip } from "antd";
import React from "react";
import {ExclamationCircleOutlined,InsertRowAboveOutlined} from "@ant-design/icons";
import axios from "axios";
import css from "./style.module.css"
const GroupDisInsert = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: "Are you sure Insert Group ?",
      icon: <ExclamationCircleOutlined />,
      content: <div className={css.Layout}>
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
    console.log("[props]", props);
    console.log("props.disbaleInster.pkId: ", props.groupData.pkId);
    const body = {
      func: "reCreateGroup",
      pkId: props.groupData.pkId,
    };
    axios.post("/api/post/Gate", body).then((res) => {
        message.success("Success");
        props.getGroupItems();
      },(error) => {message.error("Error");}
    );
  };
  return (
    <div>
      <Button type="primary" shape="circle" size="small" onClick={confirm} icon={<InsertRowAboveOutlined />}></Button>
    </div>
  );
};
export default GroupDisInsert;
