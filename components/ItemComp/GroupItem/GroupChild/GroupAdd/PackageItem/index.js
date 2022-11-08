
import { Button, Empty, Input, message, Modal, Table, Typography, Popconfirm, InputNumber, Form, Image, Tooltip, Badge,} from "antd"; 
import React, { useContext, useEffect, useState } from "react";
import css from "./style.module.css";
import {EditOutlined,CheckSquareOutlined,CaretRightOutlined} from "@ant-design/icons";
import axios from "axios"; 
import TextArea from "antd/lib/input/TextArea";
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps
  }) => {const inputNode = inputType === 'number' ? <InputNumber style={{width: "53px"}}/> : <Input  style={{width: "80px"}}/>;
    return (<td {...restProps}>{editing ? ( <Form.Item name={dataIndex} style={{margin: 0,}} rules={[{required: true,message: `Please Input ${title}!`,},]}>{inputNode}</Form.Item>) : (children)}</td>
    );
  };
const PackageItem = (props) =>{
// const [isModalVisible, setIsModalVisible] = useState(false);
// const [getGroupItemsState, setGetGroupItemsState] = useState([]);
// const [getGroupItemsGbm, setGroupItemsGbm] = useState([]);
// const [onChangePriceD, setOnChangePriceD] = useState([]);
// const [titleEdit, setTitleEdit] = useState();
// const [descriptionEdit, setDescriptionEdit] = useState();
// const [others, setOthers] = useState("");
// const [groupItemDetails, setGroupItemDetails] = useState([]);
// const [itemInfo, setItemInfo] = useState("");
const [spinner, setSpinner] = useState(false);
const [description, setDescription] = useState("");
const [title, setTitle] = useState("");
//   const [totalPrice, setTotalPrice] = useState();
const [priceTotal, setPriceTotal] = useState(0);
const [form] = Form.useForm();
const [data, setData] = useState("");
const [editingKey, setEditingKey] = useState(''); 
const isEditing = (record) => record.key === editingKey;
useEffect(()=>{ 
    const originData = [];
    const total = 0;
    props.showTable ? "" : setTitle(""), setDescription("")
    props.packageItem.forEach((r, i) => {  
            total += r.cnt * r.price;   
        originData.push({  
            key: i,
            pkId: r.key,
            date: r.date,
            img: r.img,
            title: r.title.toLowerCase(),
            description: r.description.toLowerCase(),
            price: r.price,
            others: r.others.toLowerCase(),
            cnt: r.cnt,
        });
        setPriceTotal(total);
        setData(originData);
    });
},[props]);
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
    var ff = [];
    var total = 0;
    newData.forEach(element => { 
        total += element.cnt * element.price; 
        ff.push(element)
    });
    setPriceTotal(parseInt(total)); 
    setData(ff);
    setEditingKey('');
    } else {
    newData.push(row);
    setData(newData);
    setEditingKey('');
    }
} catch (errInfo) {
    console.log('Validate Failed:', errInfo);
}
};
const columns = [
{title: 'Date', dataIndex: 'date', width: 50, editable: false, ellipsis: true,},  
{title: 'Image', dataIndex: 'img', width: "50px", editable: false, ellipsis: true,
render: (a) => <div><Image alt="Obertech" title="vzeh" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{display: "flex", width: "30px", margin:"0px auto"}}/></div>, 
},
{title: 'Title', dataIndex: 'title', width: 70, editable: false, ellipsis: true,},  
{title: 'Price', dataIndex: 'price', width: 50, editable: true,ellipsis: true, render: (a) =><div>{a} $</div>},
{ title: 'Cnt', dataIndex: 'cnt', width: 50, key: "itemCnt", editable: true, ellipsis: true,},
{ title: 'Action', dataIndex: 'operation',  width: 50, fixed: "right",
    render: (_, record) => {
    const editable = isEditing(record);
    return editable ? (
        <span style={{display: "flex", flexDirection: "column"}}>
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
    inputType: col.dataIndex === 'price' || col.dataIndex === 'cnt' ? 'number' : 'text',
    dataIndex: col.dataIndex,
    title: col.title,
    editing: isEditing(record),
    }),
};
});


const saveBtn = () =>{
    var groupDetail = [];
    data.forEach((element) => {
        delete element.key;
       var  obj = {
            itemCnt: element.cnt,
            itemPkId: element.pkId,
            itemPriceD: element.price,
            img: element.img,
          };
      groupDetail.push(obj);
    }); 

    const body2 = {
      func: "newGroupItems",
      title: title,
      cnt: "1",
      itemPriceTotal: priceTotal,
      others: "-",
      description: description,
      status: "0",
      groupDetail: groupDetail,
    };
    console.log("groupDeital: ", groupDetail);
    axios.post("/api/post/Gate", body2).then(
      (result) => {
        message.success("Amjilttai"); 
        props.groupItems();
        setTitle("");
        setDescription("");
        props.modalHide();
      },(error) => {message.error("Error")}
    );
}
return<div> 
{props.packageItem[0] ? <div className={props.showTable ? css.PackageItem : ""}>  
<Form form={form} component={false}> {props.showTable ? <>  
    <div> 
        <Input value={title} placeholder="Title" style={{marginBottom: "5px"}} allowClear onChange={(e)=>setTitle(e.target.value)}/>
        <TextArea value={description} placeholder="Description" style={{marginBottom: "5px"}} allowClear showCount onChange={(e)=>setDescription(e.target.value)}/>
    </div>
<Table size="small" components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{onChange: cancel, }} loading={spinner}  scroll={{y: 300,}}/>
    <div className={css.Total}>
        Total price: {priceTotal}$
    </div>
<div className={css.SaveCss}> 
    <Button onClick={saveBtn} type="primary">Save</Button>
</div>
</> : null}

</Form>
</div> : null}


    </div>
}
export default PackageItem;