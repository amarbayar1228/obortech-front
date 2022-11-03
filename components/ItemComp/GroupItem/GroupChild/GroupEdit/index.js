import { Button, Empty, Input, message, Modal, Table, Typography, Popconfirm, InputNumber, Form, Image} from "antd"; 
import React, { useContext, useEffect, useState } from "react";
import css from "./style.module.css";
import {EditOutlined,AppleOutlined,CaretRightOutlined} from "@ant-design/icons";
import axios from "axios"; 
// const originData = [];
// for (let i = 0; i < 10; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber style={{width: "70px"}}/> : <Input  style={{width: "120px"}}/>;
  return (
    <td {...restProps}>
      {editing ? ( <Form.Item name={dataIndex} style={{margin: 0,}} rules={[{required: true,message: `Please Input ${title}!`,},]}>{inputNode}</Form.Item>) : (children)}
    </td>
  );
};
const GroupEdit = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getGroupItemsState, setGetGroupItemsState] = useState([]);
  const [getGroupItemsGbm, setGroupItemsGbm] = useState([]);
  const [onChangePriceD, setOnChangePriceD] = useState([]);
  const [titleEdit, setTitleEdit] = useState();
  const [descriptionEdit, setDescriptionEdit] = useState();
  const [groupItemDetails, setGroupItemDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [priceTotal, setPriceTotal] = useState(0);
  const [form] = Form.useForm();
  const [data, setData] = useState("");
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
 

  const edit = (record) => {
    console.log("record", record);
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => { 
    console.log('key: ', key);
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log("data: ", newData);
        var total = 0;
        newData.forEach(element => {
            console.log("element", element.itemPriceD);
            total += element.itemCnt * element.itemPriceD; 
        });
        setPriceTotal(parseInt(total));
        setData(newData);
        setEditingKey('');
      } else {
        console.log("data2: ", newData);
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
        title: 'Image',
        dataIndex: 'img',
        width: 40,
        editable: false,
        render: (a) => <div>
          <Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{width: "50px"}}/>
    </div>, 
      },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 120,
      editable: true,
    },  
    {
        title: 'Price',
        dataIndex: 'itemPriceD',
        width: 50,
        editable: true,
      },
      {
        title: 'Cnt',
        dataIndex: 'itemCnt',
        width: 30,
        key: "itemCnt",
        editable: true,
      },
    {
      title: 'A',
      dataIndex: 'operation', 
      width: 50,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8,}}>Save</Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}><a>Cancel</a></Popconfirm>
          </span>
        ) : (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'itemPriceD' || col.dataIndex === 'itemCnt' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
        console.log("group item details: ", res.data.data.itemList);
        const originData = [];
        var total = 0;
        res.data.data.itemList.forEach((element, i) => { 
            console.log(parseInt(element.itemPriceD));
            total += element.itemCnt * element.itemPriceD; 
            originData.push({ 
                key: i,
                itemPkId: element.itemPkId,
                title: element.title,
                itemPriceD: parseInt(element.itemPriceD),
                itemCnt: element.itemCnt,
                img: element.img,
            });
            setData(originData);
        });
        console.log("total price: ", total);
        setPriceTotal(parseInt(total));

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
    setGroupItemDetails([...groupItemDetails]);
    console.log("target: ", e.target.value);
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
        if (temp.itemPkId === obj.itemPkId || groupItemDetails[i].pkId === obj.itemPkId) 
        {
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
    console.log("data: ", data);

    var groupDetail = [];
    onChangePriceD.forEach((element) => {
      groupDetail.push(element);
    });
    console.log("ene bol real: ", groupDetail);
    // console.log("totalPrice: ", totalPrice);
    // const body = {
    //   func: "editGroupItems",
    //   pkId: getGroupItemsState.pkId,
    //   title: titleEdit,
    //   description: descriptionEdit,
    //   status: getGroupItemsState.status,
    //   groupDetail: groupDetail,
    //   itemPriceTotal: totalPrice,
    //   others: "ab",
    //   cnt: 1,
    // };
    // console.log("title: ", titleEdit);
    // console.log("descriptionEdit: ", descriptionEdit);
    // console.log("handle onChangePriceD", onChangePriceD);
    // console.log("price: ", totalPrice); 

    // axios.post("/api/post/Gate", body).then((res) => { 
    //     message.success("sucess");
    //     props.getGroupItems(); 
    //     setIsModalVisible(false);
    
    //   }).catch((err) => {console.log("err: ", err)}); 
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
      <Modal title="Group Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={620}> 
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
             <div>
             <Form form={form} component={false}>
                <Table components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{onChange: cancel, }}/>
                </Form>
             </div>
            </>
          )}
       
        </div>
        <div className={css.TotalPriceCss}> Total price: {priceTotal}</div>
      </Modal>
    </div>
  );
};
export default GroupEdit;
