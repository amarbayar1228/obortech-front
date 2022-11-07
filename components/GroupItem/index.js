import {Badge,Button,Collapse,Form,Image,Input,message,Modal,Tooltip,Transfer} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";

const { Panel } = Collapse;
const GroupItem = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [itemPkIdState, setItemPkIdState] = useState();
  const [itemState01, setItemState01] = useState([]);
  const [titleState, setTitleState] = useState();
  const [descriptionState, setDescription] = useState();
  useEffect(() => {
    // getGroupItems();
    // getItems();
  }, []);
  const getItems = () => {
    axios
      .post("/api/post/item/getItemState01")
      .then((res) => {
        setItemState01(res.data);
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const declineFunc = (e, i) => {
    if (itemState01[i].cnt > 1) {
      itemState01[i].cnt = itemState01[i].cnt - 1;
    }

    setItemState01(itemState01);
  };
  const plusFunc = (e, i) => {
    itemState01[i].cnt = itemState01[i].cnt + 1;
    setItemState01(itemState01);
  };
  const mockData = itemState01.map((e, i) => ({
    key: e.pkId,
    title: (
      <>
        {e.status === 2 ? (
          <div style={{ display: "none" }}>sss </div>
        ) : (
          <div className={css.BasketItem}>
            <div className={css.Zurag}>
              <Image
                alt="Obertech"
                preview={false}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
              />
            </div>
            <div className={css.Descrip}>
              <div className={css.Title}>
                <div className={css.ItemTitle}>{e.title}</div>
                <div>
                  {e.status == 1 ? (
                    <>
                      <Tooltip title={e.others}>
                        <Badge status="success" />
                      </Tooltip>
                    </>
                  ) : e.status == 2 ? (
                    <Tooltip title={e.others}>
                      <Badge status="error" />
                    </Tooltip>
                  ) : e.status == 0 ? (
                    <Tooltip title={e.others}>
                      <Badge status="processing" />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={css.Price}>
                <div> Qty: {e.quantity}</div>

                <div> {e.price}$</div>
              </div>
              <div>
                <Button
                  type="default"
                  shape="circle"
                  size="small"
                  onClick={() => declineFunc(e, i)}
                >
                  -
                </Button>
                {e.cnt}
                <Button
                  type="default"
                  shape="circle"
                  size="small"
                  onClick={() => plusFunc(e, i)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    ),

    description: <div>aass</div>,
  }));

  const initialTargetKeys = mockData
    .filter((item) => Number(item.key) < 100)
    .map((item) => item.key);
  let value = 0;

  const getGroupItems = () => {
    setGetGroupItemsSpin(false);
    axios.post("/api/get/item/getGroupItems").then(
      (res) => {
        console.log("===> items", res.data);
        setGetGroupItemsState(res.data);

        let array = [];
        res.data.forEach((element1) => {
          element1.gbm.forEach((element, i) => {
            value += element.itemCnt * element.itemPriceD;
          });
          array.push(value);
          setGroupTotalPrice(array);
        });
        setGetGroupItemsSpin(true);
      },
      (error) => {
        message.error("Error");
      }
    );
  };

  var jsonItem = [];
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    nextTargetKeys.forEach((e, i) => {
      jsonItem.push({
        itemPkId: e,
        itemCnt:
          itemState01[i].pkId == e ? itemState01[i].cnt : itemState01[i].cnt,
      });
    });
    setItemPkIdState(jsonItem);
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const onScroll = (direction, e) => {};
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onFinishEditForm = (values) => {
    if (itemPkIdState == undefined) {
      message.error("Select Item!");
    } else {
      var itemPkIdData = [];
      itemPkIdState.forEach((element, i) => {
        itemPkIdData.push(element);
      });
      const body2 = {
        title: values.title,
        description: values.description,
        groupDetail: itemPkIdData,
      };

      // axios.post("/api/post/item/saveGroupItems", body2).then(
      //   (result) => {
      //     console.log("===>>>> result", result.data);
      //     message.success("Amjilttai");
      //     getGroupItems();
      //     setTargetKeys();
      //     setItemPkIdState(null);
      //     itemPkIdData.push(null);
      //     setIsModalVisible(false);
      //   },
      //   (error) => {
      //     message.error(error);
      //     console.log("===>>>> result", error);
      //   }
      // );
    }
  };
  const onFinishFailedEdit = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors);
    // errorInfo.errorFields.forEach((element) => {
    //   console.log("elemetn===> ", element.errors);
    // });
  };
  const handleCancel = () => {
    setTitleState("sss");
    setDescription("ssssss");
    setTargetKeys();
    setIsModalVisible(false);
  };

  return (
    <div>
      <div>
        <Button type="primary" onClick={showModal}>
          Group Item
        </Button>
        <Modal
          title="Group Item"
          open={isModalVisible}
          footer={false}
          onOk={onFinishEditForm}
          onCancel={handleCancel}
          width={800}
        >
          <div className={css.GroupItemCss}>
            <Transfer
              showSearch
              dataSource={mockData}
              titles={["Source", "Target"]}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={onChange}
              onSelectChange={onSelectChange}
              onScroll={onScroll}
              render={(item) => item.title}
              oneWay
              listStyle={{
                height: 500,
                width: 315,
              }}
              pagination
            />
          </div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              title: titleState,
              description: descriptionState,
            }}
            onFinish={onFinishEditForm}
            onFinishFailed={onFinishFailedEdit}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your Title!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default GroupItem;
