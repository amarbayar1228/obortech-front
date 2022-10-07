import { Button, Empty, Input, message, Modal } from "antd";
import React, { useContext, useState } from "react";
import css from "./style.module.css";
import {EditOutlined,AppleOutlined,CaretRightOutlined} from "@ant-design/icons";
import axios from "axios";
import { withSuccess } from "antd/lib/modal/confirm";
import BasketContext from "../../context/basketContext/BasketContext";
const GroupItemEdit = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getGroupItemsState, setGetGroupItemsState] = useState([]);
  const [getGroupItemsGbm, setGroupItemsGbm] = useState([]);
  const [onChangePriceD, setOnChangePriceD] = useState([]);
  const [titleEdit, setTitleEdit] = useState();
  const [descriptionEdit, setDescriptionEdit] = useState();
  const [groupItemDetails, setGroupItemDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const basketContext = useContext(BasketContext);
  const showModal = () => {
    setTitleEdit(props.pkId.title);
    setDescriptionEdit(props.pkId.description);
    setGetGroupItemsState(props.pkId);
    setGroupItemsGbm(props.pkId.gbm);
    setTotalPrice(props.pkId.price);
    setIsModalVisible(true);
    setOnChangePriceD([]); 
    const body = {
      func: "getGroups",
      pkId: props.pkId.pkId,
    };
    axios.post("/api/post/Gate", body).then(
      (res) => {  
        setGroupItemDetails(res.data.data.itemList);
        if (res.data.data.itemList == undefined) {
          console.log("Hoosn");
        } else {
          res.data.data.itemList.forEach((element) => {
            console.log("onPirceD");
            var obj = {
              itemCnt: element.itemCnt,
              itemPkId: element.itemPkId,
              itemPriceD: element.itemPriceD,
              img: element.img,
            };
            setOnChangePriceD((onChangePriceD) => [...onChangePriceD, obj]);
          });
        }
        props.getGroupItems();
      },(error) => {message.error("Error");}
    ); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const priceFunction = (e, itemPkId) => {
    console.log("itemPkId: ", itemPkId);

    const obj = {
      groupItemHeaderPkId: getGroupItemsState.pkId,
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
          groupItemDetails[i].pkId === obj.itemPkId
        ) {
          arr[i].itemPriceD = obj.itemPriceD;
          arr[i].itemCnt = groupItemDetails[i].itemCnt;
          isArrived = true;
          var sumUser = 0;
          onChangePriceD.forEach((element) => {
            sumUser += element.itemCnt * element.itemPriceD;
            setTotalPrice(sumUser);
          });
        }
      }
      if (!isArrived) {
        arr.push(obj);
      }
    }

    setOnChangePriceD(arr);
  };
  const titleFunction = (e, itemPkId) => {
    const obj = {
      title: e.target.value,
      itemPkId: itemPkId + "",
    };
    let arr = onChangePriceD;
    if (arr.length === 0) {
      arr.push(obj);
    } else {
      var isArrived = false;
      for (var i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (temp.itemPkId === obj.itemPkId) {
          arr[i].title = obj.title;
          isArrived = true;
        }
      }
      if (!isArrived) {
        arr.push(obj);
      }
    }

    setOnChangePriceD(arr);
  };

  const handleOk = () => {
    var groupDetail = [];
    onChangePriceD.forEach((element) => {
      groupDetail.push(element);
    });
    console.log("totalPrice: ", totalPrice);
    const body = {
      func: "editGroupItems",
      pkId: getGroupItemsState.pkId,
      title: titleEdit,
      description: descriptionEdit,
      status: getGroupItemsState.status,
      groupDetail: groupDetail,
      itemPriceTotal: totalPrice,
      others: "ab",
      cnt: 1,
    };
    console.log("title: ", titleEdit);
    console.log("descriptionEdit: ", descriptionEdit);
    console.log("handle onChangePriceD", onChangePriceD);
    console.log("price: ", totalPrice); 
    axios
      .post("/api/post/Gate", body)
      .then((res) => { 
        message.success("sucess");
        props.getGroupItems();
        console.log("context",basketContext.groupDetailFuncContext);
        setIsModalVisible(false);
    
      })
      .catch((err) => {
        console.log("err: ", err);
      }); 
  };

  const ItemCntPlus = (e, i) => {
    groupItemDetails[i].itemCnt = groupItemDetails[i].itemCnt + 1;
    onChangePriceD[i].itemCnt = onChangePriceD[i].itemCnt + 1;
    setOnChangePriceD([...onChangePriceD]);
    setGroupItemDetails([...groupItemDetails]);

    var sumUser = 0;
    onChangePriceD.forEach((element) => {
      sumUser += element.itemCnt * element.itemPriceD;
      setTotalPrice(sumUser);
    });
  };

  const ItemCntDec = (e, i) => {
    if (groupItemDetails[i].itemCnt > 1) {
      groupItemDetails[i].itemCnt = groupItemDetails[i].itemCnt - 1;
      onChangePriceD[i].itemCnt = onChangePriceD[i].itemCnt - 1;
    }
    setOnChangePriceD([...onChangePriceD]);
    setGroupItemDetails([...groupItemDetails]);
    var sumUser = 0;
    onChangePriceD.forEach((element) => {
      sumUser += element.itemCnt * element.itemPriceD;
      setTotalPrice(sumUser);
    });
  };

  return (
    <div>
      <Button type="primary" shape="circle" onClick={showModal}size="small" icon={<EditOutlined />}></Button>
      <Modal title="Group Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
        <div className={css.Title}> Title:
          <Input style={{ marginLeft: "57px" }} defaultValue={titleEdit} placeholder="Title" onChange={(e) => setTitleEdit(e.target.value)}/>
        </div>
        <div className={css.Title}>Description:
          <Input style={{ marginLeft: "10px" }} defaultValue={descriptionEdit} placeholder="Description" onChange={(e) => setDescriptionEdit(e.target.value)} />
        </div>
        <div className={css.GroupItemCarCss}> <CaretRightOutlined /> Group Items:</div>
        <div className={css.GroupDetailsCss}>
          {groupItemDetails === undefined ? (
            <Empty />
          ) : (
            <>
              {groupItemDetails.map((e, i) => (
                <div className={css.ItemDesc} key={i}>
                  <div className={css.Title}> Title:
                    <Input style={{ marginLeft: "24px" }} defaultValue={e.title} placeholder="Title" onChange={(v) => titleFunction(v, e.itemPkId)}/>
                  </div> 
                  <div className={css.Title}> Price:
                    <Input style={{ marginLeft: "20px" }} defaultValue={e.itemPriceD} placeholder="Item itemPrice" onChange={(value) => priceFunction(value, e.itemPkId)}/>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <Button type="dashed" size="small" shape="circle" onClick={() => ItemCntDec(e, i)}>-</Button>
                    <span className={css.ItemCntCss}>{e.itemCnt}</span>
                    <Button type="dashed" size="small"shape="circle" onClick={() => ItemCntPlus(e, i)}>+</Button>
                  </div>
                
                </div>
              ))}
                <div> Total price: {totalPrice}</div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default GroupItemEdit;
