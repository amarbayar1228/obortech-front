import { Button, Input, message, Modal, Radio, Space } from "antd";
import React, { useState } from "react";
import axios from "axios";

import { CaretDownOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const StatusChangeModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [othersState, setOthersState] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const showModal = () => {
    if (props.pkId == undefined) {
      setValue(props.addItemStatus.status);
    } else {
      setValue(props.pkId.status);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (props.pkId == undefined) {
      console.log("item state", props);
      console.log("value: ", value);
      console.log("others: ", othersState);
      const body = {
        func: "setItemStatus",
        pkId: props.addItemStatus.pkId,
        status: value,
        others: othersState,
      };
      // axios.post("/api/post/item/updateStateItem", body).then(
      //   (res) => {
      //     message.success("Success");
      //     props.addItemGetItems();
      //     setIsModalVisible(false);
      //   },
      //   (error) => {
      //     message.error("Error");
      //   }
      // );
    } else {
      console.log("group items state: ", props.pkId.pkId);
      console.log("state others: ", othersState);
      const body = {
        func: "setGroupStatus",
        pkId: props.pkId.pkId,
        status: value,
        others: othersState,
      };
      axios
        .post("/api/post/Gate", body)
        .then((res) => {
          console.log(res.data);
          props.getGroupItems();
          setIsModalVisible(false);
        })
        .catch((err) => {
          console.log(err);
        });
      // axios.post("/api/post/item/uploadStatusGroupItems", body).then(
      //   (res) => {
      //     message.success("Success");
      //     props.getGroupItems();
      //     setIsModalVisible(false);
      //   },
      //   (error) => {
      //     message.error("Error");
      //   }
      // );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div style={{ marginRight: "3px" }}>
      <Button
        type="default"
        shape="circle"
        size="small"
        onClick={showModal}
        icon={<CaretDownOutlined />}
      ></Button>
      <Modal
        title="Status modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>
                Enable
                {value === 1 ? (
                  <TextArea
                    style={{ marginTop: "5px" }}
                    onChange={(e) => setOthersState(e.target.value)}
                  />
                ) : null}
              </Radio>
              <Radio value={0}>
                Invisible
                {value === 0 ? (
                  <TextArea
                    style={{ marginTop: "5px" }}
                    onChange={(e) => setOthersState(e.target.value)}
                  />
                ) : null}
              </Radio>
              <Radio value={2}>
                Disable
                {value === 2 ? (
                  <TextArea
                    style={{ marginTop: "5px" }}
                    onChange={(e) => setOthersState(e.target.value)}
                  />
                ) : null}
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
};
export default StatusChangeModal;
