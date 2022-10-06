import { Button, message, Modal } from "antd";
import React from "react";
import {
  ExclamationCircleOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons";
import axios from "axios";
const DisableGroupInsert = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: "Insert Group",
      icon: <ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "Yes",
      onOk: okButtonProps,
      cancelText: "No",
    });
  };
  const okButtonProps = () => {
    console.log("[props]", props);
    console.log("props.disbaleInster.pkId: ", props.disbaleInster.pkId);
    const body = {
      func: "reCreateGroup",
      pkId: props.disbaleInster.pkId,
    };
    axios.post("/api/post/Gate", body).then(
      (res) => {
        message.success("Success");
        props.getGroupItems();
      },
      (error) => {
        message.error("Error");
      }
    );
  };
  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        size="small"
        onClick={confirm}
        icon={<InsertRowAboveOutlined />}
      ></Button>
    </div>
  );
};
export default DisableGroupInsert;
