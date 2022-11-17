import { Button, Empty, Input, message, Modal, Table, Typography, Popconfirm, InputNumber, Form, Image, Tooltip, Badge,} from "antd"; 
import React, { useContext, useEffect, useState } from "react";
import css from "./style.module.css";
import {EditOutlined,CheckSquareOutlined,CaretRightOutlined} from "@ant-design/icons";
import axios from "axios"; 
import TextArea from "antd/lib/input/TextArea";
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
  const [others, setOthers] = useState("");
  const [groupItemDetails, setGroupItemDetails] = useState([]);
  const [itemInfo, setItemInfo] = useState("");
  const [spinner, setSpinner] = useState(false);
//   const [totalPrice, setTotalPrice] = useState();
  const [priceTotal, setPriceTotal] = useState(0);
  const [form] = Form.useForm();
  const [data, setData] = useState("");
  const [editingKey, setEditingKey] = useState(''); 
  const isEditing = (record) => record.key === editingKey;
 

  const edit = (record) => { 
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
        var total = 0;
        newData.forEach(element => { 
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
        title: 'Date',
        dataIndex: 'date', 
        width: 65,
        fixed: 'left', 
        ellipsis: true,
        },
    {
        title: 'Image', dataIndex: 'img', width: 50, editable: false,
        render: (a) => <div><Image alt="Obertech" title="vzeh" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{display: "flex", width: "30px", margin:"0px auto"}}/></div>, 
      },
    {title: 'Title', dataIndex: 'title', width: 120, editable: false,  ellipsis: true,},  
    {title: 'Price', dataIndex: 'itemPriceD', width: 50, editable: true, render: (a) =><div>{a} $</div>},
    { title: 'Cnt', dataIndex: 'itemCnt', width: 30, key: "itemCnt", editable: true},
    { title: 'Action', dataIndex: 'operation',  width: 50, fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8,}}>save</Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}><a>Cancel</a></Popconfirm>
          </span>
        ) : (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Typography.Link>);
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
    setSpinner(true);
    setTitleEdit(props.pkId.title);
    setItemInfo(props.pkId);
    console.log("props: ", props.pkId);
    setOthers(props.pkId.others);
    setDescriptionEdit(props.pkId.description);
    setGetGroupItemsState(props.pkId);
    setGroupItemsGbm(props.pkId.gbm);
    // setTotalPrice(props.pkId.price);
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
            total += element.itemCnt * element.itemPriceD; 
            originData.push({ 
                key: i,
                date: element.date_,
                itemPkId: element.itemPkId,
                title: element.title,
                itemPriceD: parseInt(element.itemPriceD),
                itemCnt: element.itemCnt,
                img: element.img,
            });
            setData(originData);
            setSpinner(false);
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
        // props.getGroupItems();
      },(error) => {message.error("Error");}
    ); 
  };

  const handleCancel = () => {
    setEditingKey('');
    setIsModalVisible(false);
    
  }; 
  const handleOk = () => { 
    console.log("dateL ", data);
    var dd = [];
    data.forEach(element => { 
            delete element.title; 
            delete element.key;     
            delete element.date
            dd.push(element);
    });    

    const body = {
      func: "editGroupItems",
      pkId: getGroupItemsState.pkId,
      title: titleEdit,
      description: descriptionEdit,
      status: getGroupItemsState.status,
      groupDetail: dd,
      itemPriceTotal: priceTotal,
      others: others,
      cnt: 1,
    }; 
    if(others === "" || titleEdit == "" || descriptionEdit == "" ){
        message.error("Input hooson bn");
    }else{ 
        axios.post("/api/post/Gate", body).then((res) => { 
        message.success("Edit");
        props.getGroupItems();  
        setIsModalVisible(false);
        }).catch((err) => {console.log("err: ", err)}); 
    }   
  }; 

  return (
    <div>
      <Button type="primary" shape="circle" onClick={showModal}size="small" icon={<EditOutlined />}></Button>
      <Modal title="Group Edit" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={620} okText="Update"> 
      {itemInfo === "" ? null : 
      <div className={css.CompNameCss}>
            <div className={css.CompFlex}><div></div><div className={css.CompNameF}>{itemInfo.date_}</div></div>
            <div className={css.StatusCss}>
            {itemInfo.status == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#52c41a",fontWeight: "600"}}/></Tooltip>) : 
                itemInfo.status == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
                itemInfo.status == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
                }
            </div>
        </div>
            }
        <div className={css.Title}>Title: <Input allowClear style={{ marginLeft: "77px" }} value={titleEdit} placeholder="Title" onChange={(e) => setTitleEdit(e.target.value)}/></div>
        <div className={css.Title}>Description: <TextArea allowClear style={{ marginLeft: "23px" }} value={descriptionEdit} placeholder="Description" onChange={(e) => setDescriptionEdit(e.target.value)} /></div>
        <div className={css.Title}>Others: <TextArea allowClear style={{ marginLeft: "59px" }} value={others} placeholder="Others" onChange={(e) => setOthers(e.target.value)} />
        </div>
        <div className={css.GroupItemCarCss}> <CaretRightOutlined /> Group Items:</div>
        <div className={css.GroupDetailsCss}>
          {groupItemDetails === undefined ? (
            <Empty />
          ) : (
            <> 
             <div>
             <Form form={form} component={false}>
                <Table size="small" components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{onChange: cancel, }} loading={spinner}/>
             </Form>
             </div>
            </>
          )}
       
        </div>
        <div className={css.TotalPriceCss}> Total price: {priceTotal}$</div>
      </Modal>
    </div>
  );
};
export default GroupEdit;
