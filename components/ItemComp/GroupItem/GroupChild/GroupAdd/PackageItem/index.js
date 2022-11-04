
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
const PackageItem = (props) =>{
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

useEffect(()=>{
    props.packageItem.forEach(element => {
        console.log("el", element);
    });
},[])
 data = props.packageItem.map((r, i)=>(
    {
      key: i,
      date: r.date,
      img: r.img,
      title: r.title.toLowerCase(),
      description: r.description.toLowerCase(),
      price: r.price,
      others: r.others.toLowerCase(),
      cnt: r.cnt,
    } 
));

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
    // console.log("new: ",newData);
    var ff = [];
    newData.forEach(element => {
        console.log("element", element); 
        ff.push(element)
    });
    console.log("ff", ff);
    setData(ff);
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
    {title: 'Date', dataIndex: 'date', width: 50, editable: false},  
{
title: 'Image', dataIndex: 'img', width: "20px", editable: false,
render: (a) => <div><Image alt="Obertech" title="vzeh" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{display: "flex", width: "30px", margin:"0px auto"}}/></div>, 
},
{title: 'Title', dataIndex: 'title', width: 120, editable: false},  
{title: 'Price', dataIndex: 'price', width: 50, editable: true, render: (a) =><div>{a} $</div>},
{ title: 'Cnt', dataIndex: 'cnt', width: 30, key: "itemCnt", editable: true},
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
    // useEffect(()=>{
    //     console.log("props: ", props);
    // },[])

return<div>
    data {props.packageItem[0] ? <div>
            {props.packageItem.map((e, i)=>(
                <div key={i}>{e.title}</div>
            ))}

<Form form={form} component={false}>
<Table size="small" components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{onChange: cancel, }} loading={spinner}/>
</Form>
             </div> : "hooson"}


    </div>
}
export default PackageItem;