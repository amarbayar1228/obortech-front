import { Button, Divider, Input, message, Modal, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import css from "./style.module.css"
import { Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
import TokenPercentage from "../../components/Setting comp/tokenPercentage";
import sha256 from "sha256";

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
const GlobalSettings = () =>{
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
},[])
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
    title: 'Default incentive percentage',
    dataIndex: 'incentive',
    width: '25%',
    editable: true,
    render: (a) =><div>{a} %</div>
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
    return<BaseLayout pageName="global-settings">
      {showInc === false ?
      <div>
        <div>
        <Divider orientation="left" >
        You must log in
        </Divider>
        </div>
      <Form form={formLogin} name="horizontal_login" layout="inline" onFinish={onFinish2}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
      : 
        <Tabs defaultActiveKey="4" items={["a","b"].map((Icon, i) => {  
        
        return {label: i === 0 ?  <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Incentive Percentage</div> :
                      i === 1 ? <div style={{fontWeight: "600", fontSize: "14px", color: "#4d5057"}}>Token Percentage</div> : null,
          
          key: i, children: i === 0? 
          <div className={css.PaymentCss}> 
               {/* <Button type="primary" onClick={showModal}>
                   + Update
                </Button> */}
                <Modal title="Incentive" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                     <div>
                       <div style={{marginBottom: "5px", fontSize: "16px"}}>  Default incentive percentage: </div>
                        <Input placeholder="Please enter your incentive percentage?" onChange={(e)=>setIncentive(e.target.value)}/>
                     </div>
                </Modal>
            
                <div> 
                <Form form={form} component={false}>
                    <Table components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{onChange: cancel,}}/>
                </Form>
                </div>
         
          </div> 
          : i === 1 ? <div className={css.PaymentCss}> 
              <div>
                <TokenPercentage />
              </div>
                 
          </div> : null,
        };
        })}/> 
      }

    </BaseLayout>
}
export default GlobalSettings;