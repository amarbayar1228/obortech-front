import { Button, Divider, Input, message, Modal, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react"; 
import { LockOutlined, UserOutlined } from '@ant-design/icons';
 
import { Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
 

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
  const inputNode = inputType === 'number' ? <InputNumber  min={0}
  max={100} formatter={(value) => `${value}%`}
  parser={(value) => value.replace('%', '')}/> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{margin: 0}}
          rules={[
            { required: true, message: `Please Input ${title}!`,}]}>
            {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
 
const InvoiceDate = () =>{
  

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [incentive, setIncentive] = useState(0);
    const [showIncentive, setShowIncentive] = useState([]);
    
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [formLogin] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [showInc, setShowInc] = useState(false);
useEffect(()=>{
    getPercentage();
    forceUpdate({});
},[]);
const getPercentage = () =>{
    const body = {
        func: "getPercentage"
    }
    axios.post("/api/post/Gate", body).then((res)=>{
        console.log("ress", res.data);
        setShowIncentive(res.data.data);
        const originData = []; 
            originData.push({
                key: 1,
                incentive: res.data.data[0].percentage,
            });
            setData(originData);
    }).catch((err)=>{
        console.log("err");
    })
}
const showModal = () => {
    setIsModalOpen(true);
};
const handleOk = () => {
    const body ={
        func: "setPercentage",
        percentage: incentive,
        adminPkId: localStorage.getItem("pkId"),
    }
    axios.post("/api/post/Gate", body).then((res)=>{
        message.success("Success");
        getPercentage();
        console.log("res", res.data);
    
    }).catch((err)=>{
        console.log("err");
    })
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
}; 
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
      setData(newData);
      console.log("new: ", newData[0].incentive);
      const body ={
        func: "setPercentage",
        percentage: newData[0].incentive,
        adminPkId: localStorage.getItem("pkId"),
        }
        axios.post("/api/post/Gate", body).then((res)=>{
            message.success("Success");
            // getPercentage();
            console.log("res", res.data);
        
        }).catch((err)=>{
            console.log("err");
        })
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
  {
    title: 'Invoice active date',
    dataIndex: 'incentive',
    width: '25%',
    editable: true,
    render: (a) =><div>{a} Days</div>
  }, 
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8,}}>Save</Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}><a>Cancel</a></Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Typography.Link>
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
      inputType: col.dataIndex === 'incentive' ? 'number' : 'text',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  };
});
const onFinish2 = (v) => {
  console.log('Finish:', v);
   const pass = sha256(v.password);
   if(localStorage.getItem("pz2r3t5") === pass){
    console.log("bolsn");
    setShowInc(true);
    message.success("Success");
   }else{
    message.error("Error")
   }
  // sha256
};
return<div> 
<Divider orientation="left" >Invoice Date</Divider>

<Form form={form} component={false}>
<Table components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{onChange: cancel,}}/>
                </Form>

</div>
}
export default InvoiceDate;