import {
  Badge,
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  message,
  Modal,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
const GroupItemsInsert = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCheck, setIsModalVisibleCheck] = useState(false);
  const [itemState01, setItemState01] = useState([]);
  const [falseValue, setFalseValue] = useState(false);
  const [titleState, setTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [itemsCheck, setItemsCheck] = useState([]);
  const [onChangePriceD, setOnChangePriceD] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formSave] = Form.useForm();
  useEffect(() => {
    getItems();
  }, []);
  const showModalCheck = () => {
    if(itemsCheck.length == 0){
      console.log("hooson");
      message.error("Select item!");
    }else{ 
    console.log("showModalChekck", itemsCheck);
    setOnChangePriceD([]);
    var sumUser = 0;
    itemsCheck.forEach((element) => {
      sumUser += element.cnt * element.price;

      var obj = {
        itemCnt: element.cnt,
        itemPkId: element.pkId,
        itemPriceD: element.price,
        img: element.img,
      };
      setOnChangePriceD((onChangePriceD) => [...onChangePriceD, obj]);
    });
    console.log("sumUser: ", sumUser);
    setTotalPrice(sumUser);
    setIsModalVisibleCheck(true);
  }
  };

  const handleOkCheck = () => {
    console.log("total: ", itemsCheck);
    var groupDetail = [];
    onChangePriceD.forEach((element) => {
      groupDetail.push(element);
    });
    console.log("group details: ", totalPrice);
    const body2 = {
      func: "newGroupItems",
      title: titleState,
      cnt: "1",
      itemPriceTotal: totalPrice,
      others: "sucess",
      description: descriptionState,
      status: "0",
      groupDetail: groupDetail,
    };
    // axios.post("/api/post/Gate", body2).then(
    //   (result) => {
    //     message.success("Amjilttai");
    //     props.getGroupItems();
    //     setIsModalVisibleCheck(false);
    //   },(error) => {message.error("Error")}
    // );
  };

  const handleCancelCheck = () => {
    setItemsCheck([]);
    setOnChangePriceD([]);
    formSave.resetFields(); 
    setIsModalVisibleCheck(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setFalseValue(false);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setItemsCheck([]);
    setIsModalVisible(false);
    setFalseValue(false);
  };
  const getItems = () => {
    const body = {
      func: "getItems",
      status: "0,1",
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        console.log("item status: 0&1 +> res data:", res.data.getItems.list);
        setItemState01(res.data.getItems.list);
      })
      .catch((err) => {
        message.error(err);
      }); 
  };
  const onChange = (checkedValues) => {
    setItemsCheck(checkedValues);
    console.log("onechangevalue: ", checkedValues);
  };
  const declineFunc = (e, i) => {
    if (itemsCheck[i].cnt > 1) {
      itemsCheck[i].cnt = itemsCheck[i].cnt - 1;
      onChangePriceD[i].itemCnt = onChangePriceD[i].itemCnt - 1;
    }
    setOnChangePriceD([...onChangePriceD]);
    setItemsCheck([...itemsCheck]);
    var sumUser = 0;
    onChangePriceD.forEach((element) => {
      sumUser += element.itemCnt * element.itemPriceD;
      setTotalPrice(sumUser);
    });
  };
  const plusFunc = (e, i) => {
    itemsCheck[i].cnt = itemsCheck[i].cnt + 1;
    onChangePriceD[i].itemCnt = onChangePriceD[i].itemCnt + 1;
    setOnChangePriceD([...onChangePriceD]);
    setItemsCheck([...itemsCheck]);
    var sumUser = 0;
    onChangePriceD.forEach((element) => {
      sumUser += element.itemCnt * element.itemPriceD;
      setTotalPrice(sumUser);
    });
  }; 
  const priceFunction = (e, itemPkId) => {
    console.log("e: ", itemPkId);
    // itemsCheck.forEach((aa,i) => {
    //   if(itemPkId === aa.pkId){
    //       console.log("temtsvv");
    //       aa.price[i].push(2);
    //   }
    //   // aa[i].price.push(2);
    // });
    const obj = {
      itemPkId: itemPkId + "",
      itemPriceD: parseInt(e.target.value),
    };
    let arr = onChangePriceD;
    if (arr.length === 0) {
      arr.push(obj);
    } else {
      var isArrived = false;
      for (var i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (
          temp.itemPkId === obj.itemPkId ||
          itemsCheck[i].pkId === obj.itemPkId
        ) {
          arr[i].itemPriceD = obj.itemPriceD;
          arr[i].itemCnt = itemsCheck[i].cnt;
          isArrived = true;
          console.log("ffff");
          var sumUser = 0;
          onChangePriceD.forEach((element) => {
            sumUser += element.itemCnt * element.itemPriceD;
            setTotalPrice(sumUser);
          });
        }
      }
      if (!isArrived) {
        arr.push(obj);
        console.log("sdd");
      }
    }
    setOnChangePriceD(arr);
  };
  const  onFinishSave= (values) =>{ 
    console.log("values: ", values); 
  
    var groupDetail = [];
    onChangePriceD.forEach((element) => {
      groupDetail.push(element);
    }); 
    const body2 = {
      func: "newGroupItems",
      title: values.title,
      cnt: "1",
      itemPriceTotal: totalPrice,
      others: "sucess",
      description: values.descrip,
      status: "0",
      groupDetail: groupDetail,
    };
    axios.post("/api/post/Gate", body2).then(
      (result) => {
        message.success("Amjilttai");
        props.getGroupItems();
        formSave.resetFields(); 
         setIsModalVisibleCheck(false);
         
      },(error) => {message.error("Error")}
    );
  }
  const onFinishFailedSave = (errInfo)=>{
    console.log("errInfo: ", errInfo);
    // formAddItem.resetFields(); 
  }
  // const onFucucFunc =(a)=>{
  //   a.target.value=""; 
  // }
  return (
    <div>
      <Button type="primary" onClick={showModal}> Group Insert </Button>
      <Modal title="Item choose" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} >
        <div>
          <div>
            <Button
              onClick={showModalCheck} style={{ background: "#e6f2ff", color: "#1877f2", borderColor: "#e6f2ff"}}>
              + Package
            </Button> 
            <Modal title="Check box" open={isModalVisibleCheck} onOk={handleOkCheck} onCancel={handleCancelCheck} >
              <div style={{fontSize: "15px"}}>  
                <Form form={formSave} name="normal_login" className={css.LoginForm}
                        labelCol={{span: 6,}} wrapperCol={{span: 16,}}
                        initialValues={{remember: true, }}
                        onFinish={onFinishSave} onFinishFailed={onFinishFailedSave}>
                          
                         <Form.Item label={"Title"} name="title" rules={[{required: true,message: "Please input your Title!"}]}>
                          <Input placeholder={"Title"} allowClear/>
                        </Form.Item>
                        <Form.Item label={"Description"} name="descrip"
                          rules={[{required: true,message: "Please input your description!",},]}>
                          <TextArea placeholder={"Description"} allowClear showCount/>
                        </Form.Item>  
                        <div className={css.ItemScroll}>
                          {itemsCheck.map((e, i) => (
                            <div key={i}>
                              <div className={css.BasketItem}>
                                <div className={css.Zurag}>
                                  <Image alt="Obertech" preview={false}src={"data:image/png;base64," + e.img}/>
                                </div>
                                <div className={css.Descrip}>
                                  <div className={css.Title}>
                                    <div className={css.ItemTitle}>{e.title}</div>
                                    <div>
                                      {e.status == 1 ? (
                                        <><Tooltip title={e.others}><Badge status="success" /></Tooltip></>
                                      ) : e.status == 2 ? (<Tooltip title={e.others}><Badge status="error" /></Tooltip>
                                      ) : e.status == 0 ? (<Tooltip title={e.others}><Badge status="processing" /></Tooltip>
                                      ) : ("")}
                                    </div>
                                  </div>
                                  <div className={css.Price}>
                                    <div> Description: {e.description}</div>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <div>Price: </div>
                                    <Input style={{ marginLeft: "10px", width: "200px" }}  
                                      defaultValue={e.price} placeholder="Item itemPrice" checked={false} onChange={(value) => priceFunction(value, e.pkId)}/>
                                    
                                  </div>
                                  <div>
                                    <Button type="default" shape="circle" size="small" onClick={() => declineFunc(e, i)}> - </Button> {e.cnt}
                                    <Button type="default" shape="circle" size="small" onClick={() => plusFunc(e, i)}>+</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className={css.TotalPriceCss}><Form.Item ><Button style={{marginTop: "25px", fontSize: "15px", fontWeight: "500"}} size="small" type="dashed" htmlType="submit">Save</Button></Form.Item>Total price: {totalPrice}$ </div>
                         
                      </Form>  
              </div>
            </Modal>
          </div>
          <div className={css.ItemScroll}>

            <Checkbox.Group style={{ width: "100%", }} onChange={onChange}>
              <>
                {itemState01.map((e, i) => (
                  <div key={i}>
                    <Checkbox value={e} checked={falseValue} autoFocus={false} style={{ display: "flex", alignItems: "center" }}>
                      <div className={css.BasketItem}>
                        <div className={css.Zurag}>
                          <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img}/>
                        </div>
                        <div className={css.Descrip}>
                          <div className={css.Title}>
                            <div className={css.ItemTitle}>{e.title}</div>
                            <div>
                              {e.status == 1 ? (<><Tooltip title={e.others}><Badge status="success" /></Tooltip></>
                              ) : e.status == 2 ? (<Tooltip title={e.others}><Badge status="error" /></Tooltip>
                              ) : e.status == 0 ? (<Tooltip title={e.others}><Badge status="processing" /></Tooltip>
                              ) : ("")}
                            </div>
                          </div>
                          <div className={css.Price}>
                            <div> Qty: {e.cnt}</div> 
                            <div> {e.price}$</div>
                          </div>
                        </div>
                      </div>
                    </Checkbox>
                  </div>
                ))}
              </>
            </Checkbox.Group>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default GroupItemsInsert;
