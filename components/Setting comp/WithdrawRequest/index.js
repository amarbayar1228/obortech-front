import { Alert, Button, Input, Modal, Select, Table } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import { InvoiceRequest } from "./InvoiceReqeust";
import css from "./style.module.css"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
const { TextArea } = Input;
export const WithdrawRequest = () =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const [sourceData, setSourceData] = useState([]);
const router = useRouter(); 
const recaptchaRef = useRef();
const [userFormCapt, setUserFormCapt] = useState(true);


const onChangeCaptcha = (a) =>{  
a == null ? setUserFormCapt(true) : setUserFormCapt(false);
}
const errorCapt = (err) =>{
console.log("err", err);
}
useEffect(()=>{
    getSource();
},[]);
const getSource = () =>{
const body ={
    func:'getSource',
}
axios.post("/api/post/Gate", body).then((res)=>{
    console.log("res: ", res.data.data);
    setSourceData(res.data.data)
}).catch((err)=>{console.log("err", err)})
}
const showModal = (a) => {
    console.log("data: ", a);
setIsModalOpen(true);
};
const handleOk = () => {
setIsModalOpen(false);
};
const handleCancel = () => {
setIsModalOpen(false);
};
const { Search } = Input;
const onSearch = (value) => console.log(value);
const columns = [
    {
        title: 'Date',
        width: 100,
        dataIndex: 'date',
        key: 'date', 
        fixed: 'left',
        sorter: true,
        },  
    {
        title: 'Order id',
        width: 100,
        dataIndex: 'orderId',
        key: 'orderId', 
        fixed: 'left',
        sorter: true,
        },  
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: 100,
    },
    {
        title: 'Organzination name',
        dataIndex: 'orgName',
        key: 'orgName',
    },
    {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    },
    {
        title: 'Paymethod',
        dataIndex: 'paymethod',
        key: 'paymethod',
    },  
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 100,
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (a) => <div>
        <Button onClick={()=>showModal(a)}>Confirm</Button>
        </div>,
    },
];
const data = [
{
    key: '1', 
    date: "2022-10-12",
    orderId: 4556161,
    price: "3220$",
    description: 'Description',
    orgName: "Obortech",
    status: 1,
    action: 1, 
}, 
{
key: '2', 
date: "2022-10-13",
orderId: 45561441,
price: "6220$",
description: 'Description 2',
orgName: "Obortech2",
status: 2,
action: 2, 
paymethod: 1,

}, 
];
const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };
return<div className={css.DFlex}>
    <div className={css.Layout1}>
        <div style={{fontWeight: "560", fontSize: "16px", color: "#4d5052", marginBottom: "10px"}}>Submit a Withdrawal Request</div>
        <Search placeholder="input search text" onSearch={onSearch} style={{width:300, marginBottom: "10px"}}/>
        <div>
            <Table bordered columns={columns} dataSource={data} scroll={{x: 1000,}}/>
            
            <Modal title="Withdrawal request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={css.InfoFlex}>
                    <div className={css.Title}>Date: </div>
                    <div className={css.TitleChild}>2022-10-12</div>
                </div>
                <div className={css.InfoFlex}>
                    <div className={css.Title}>Order id: </div>
                    <div className={css.TitleChild}>20221012</div>
                </div>
                <div className={css.InfoFlex}>
                    <div className={css.Title}>Organization name: </div>
                    <div className={css.TitleChild}>Obortech</div>
                </div>
                <div className={css.InfoFlex}>
                    <div className={css.Title}>Description: </div>
                    <div className={css.TitleChild}>Description Description</div>
                </div>
                <div className={css.InfoFlex}>
                    <div className={css.Title}>Price: </div>
                    <div className={css.TitleChild}>456.2$</div>
                </div>
                <div className={css.InfoFlex}>
                    <div className={css.Title}>Status: </div>
                    <div className={css.TitleChild}>1</div>
                </div>
                <Alert description="Additional description and information about copywriting." message="Warning" type="warning" showIcon closable style={{marginTop: "20px"}}/>
                <Select  placeholder="Choose source" style={{width: 250, marginTop: "20px", marginBottom: "10px"}} onChange={handleChange}
                        // router.locale === "mn" ? e.namemn : e.nameeng
                    options={sourceData.map((e,i)=>({value: e.index_, label:  e.nameeng}))}
                />
                <TextArea showCount maxLength={100} style={{height: 120,marginBottom: 24,}} onChange={onChange} placeholder="Description"/>
                <div style={{display: "flex", justifyContent: "center",marginBottom: "20px"}}>
                    <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                </div>
            </Modal>
        </div>
    </div>
    <div className={css.Layout2}> 
        <InvoiceRequest />
    </div>
</div>
} 