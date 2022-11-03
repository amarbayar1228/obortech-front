import { Badge, Button, Input, message, Modal, Radio, Space, Tooltip } from "antd";
import React, { useState } from "react";
import axios from "axios";
import css from "./style.module.css"

import { CaretDownOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const StatusChangeModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [othersState, setOthersState] = useState("");
  const [itemInfo, setItemInfo] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const showModal = () => {
    console.log("pkId", props);
 
    if (props.groupData == undefined) {
      setValue(props.addItemStatus.status);
      setItemInfo(props.addItemStatus)
      setOthersState(props.addItemStatus.others);
    } else {
      setValue(props.groupData.status);
      setItemInfo(props.groupData)
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    //item state
    if (props.groupData == undefined) {
      // console.log("item state", props);
      console.log("value: ", value);
      // console.log("addItemStatus: ", props.addItemStatus);
      console.log("others: ", othersState);
      if(othersState == ""){
        message.error("hooson baina")
      }else{
        const body = {
          func: "setItemStatus",
          pkId: props.addItemStatus.pkId,
          status: value,
          others: othersState,
        }; 
        axios.post("/api/post/Gate", body).then((res) => { 
            message.success("Success");
            props.addItemGetItems();
            setIsModalVisible(false);
          }).catch((err) => {console.log(err)});
      } 
    } else {
      //Group state
      // console.log("group items state: ", props.pkId.pkId);
      // console.log("state others: ", othersState);
      if(othersState == ""){
        message.error("hooson baina")
      }else{
        const body = {
          func: "setGroupStatus",
          pkId: props.groupData.pkId,
          status: value,
          others: othersState,
        };
        axios.post("/api/post/Gate", body).then((res) => {
            message.success("Success");
            // console.log(res.data);
            props.getGroupItems();
            setIsModalVisible(false);
          }).catch((err) => {console.log(err)}); 
      }
  
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ marginRight: "3px" }}>
      <Button type="default" shape="default" size="small" onClick={showModal} icon={<CaretDownOutlined />}></Button>
      <Modal title="Status modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
        <div className={css.CompNameCss}>
            <div className={css.CompFlex}><div className={css.CompTitle}>Title:</div><div className={css.CompNameF}>{itemInfo.title}</div></div>
            <div className={css.StatusCss}>
            {itemInfo.status == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#52c41a",fontWeight: "600"}}/></Tooltip>) : 
                itemInfo.status == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
                itemInfo.status == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
                }
            </div>
        </div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical" >
              <Radio value={1}>Enable{value === 1 ? (<TextArea value={othersState} style={{ marginTop: "5px", width: "95%" }} showCount allowClear onChange={(e) => setOthersState(e.target.value)}/>) : null}</Radio>
              <Radio value={0}> Invisible {value === 0 ? (<TextArea value={othersState} style={{ marginTop: "5px", width: "95%" }} showCount allowClear onChange={(e) => setOthersState(e.target.value)}/>) : null}</Radio>
              <Radio value={2}> Disable {value === 2 ? ( <TextArea value={othersState} style={{ marginTop: "5px",width: "95%" }} showCount allowClear onChange={(e) => setOthersState(e.target.value)}/>) : null}</Radio>
            </Space>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
};
export default StatusChangeModal;
