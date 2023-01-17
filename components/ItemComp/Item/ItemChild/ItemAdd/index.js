import { Button, Form, Input, InputNumber, message, Modal, Radio, Spin, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css"
const ItemAdd = (props) =>{
const [fileList, setFileList] = useState([]);
const [formAddItem] = Form.useForm(); 
const [isModalVisible, setIsModalVisible]= useState(false);
const [vType, setVType] = useState(1);
const [typeLevelValue, setTypeLevelValue] = useState(14);
const [typeLevelSub, setTypeLevelSub] = useState(14);
const [typeSubValue, setTypeSubValue] = useState(0);
const [levelSpin, setLevelSping] = useState(false);
useEffect(()=>{
    console.log("props: ", props);
},[])
const showModal = () =>{
    console.log("props: ", props);
    setIsModalVisible(true);
}
const  onFinishAddItem = (values) =>{ 
// setIsModalVisible(false);
// let baseImg = values.img.file.thumbUrl.split("base64,")[1]; 

if(fileList[0]){
let baseImg2 = fileList[0].thumbUrl.split("base64,")[1];

if(typeSubValue === 0 || typeLevelSub === 14){
    message.error("error");
 
}else{ 
        const data = {
            func: "newItem", title: values.itemName, description: values.descrip2, 
            quantity: 0, price: values.price, cnt: 1, img: baseImg2, others: "-", status: 0, 
            type_: typeLevelSub,
            };
            axios.post("/api/post/Gate", data).then((res) => {
            setTypeSubValue(0);
            setTypeLevelSub(14);
            setFileList([]);
            formAddItem.resetFields();  
            setIsModalVisible(false);
            message.success("Success");  
            props.getItems();
            }).catch((err) => {console.log("err", err)}); 
 
    
}




}else{
    message.error("bhq");
}
}

const onFinishFailedAddItem = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
const onPreview = async (file) => {
let src = file.url;

if (!src) {
    src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);

    reader.onload = () => resolve(reader.result);
    });
}

const image = new Image();
image.src = src;
const imgWindow = window.open(src);
imgWindow?.document.write(image.outerHTML);
};

const onChangeImage = ({ fileList: newFileList }) => {
console.log("newFile: ",newFileList );
setFileList(newFileList);
};
 
const handleCancel = ()=>{
    setFileList([]);
    setIsModalVisible(false);
    formAddItem.resetFields();
}
const onChangeType = (e) =>{
    setTypeLevelValue(e.target.value)
    console.log("value: ", e.target.value);
    setLevelSping(true);
    const body = {
        func:"getTypes",  
        parid:e.target.value,
        type_:2
    }
    axios.post("api/post/Gate", body).then((res)=>{
        console.log("res", res.data);
        setLevelSping(false);
        setTypeSubValue(res.data.data);
        
    }).catch((err)=>console.log("err"));
}
const onChangeTypeSub = (e) =>{
    console.log("subs: ", e.target.value);
    setTypeLevelSub(e.target.value); 
}
return <div>
    <Button type="primary"  onClick={showModal}>+ add item</Button>
    <Modal title="Add item" footer={null} open={isModalVisible} cancelText="cancel" okText="OK"  onCancel={handleCancel}>
    <div>
    <Form form={formAddItem} layout="vertical" name="normal_login" className={css.LoginForm} labelCol={{span: 7}} wrapperCol={{span: 25}} initialValues={{remember: true}} onFinish={onFinishAddItem} onFinishFailed={onFinishFailedAddItem}>
   
    <Form.Item label={"Item name"} name="itemName" rules={[{required: true,message: "Please input your First name!"}]}><Input placeholder={"Item name"}/></Form.Item>
    <Form.Item label={"Description"} name="descrip2" rules={[{required: true, message: "Please input your description!"}]}><TextArea placeholder={"Item description"}/></Form.Item>  
    <Form.Item label={"Price"} name="price" rules={[{type: 'number', required: true, message: "Please input your price!"}]}><InputNumber  placeholder={"Item price"}/></Form.Item>
    <Form.Item label="Image" name="img" rules={[{required: true,message: "Please input your Image!"}]}>
    <Upload onPreview={onPreview} listType="picture-card" fileList={fileList} onChange={onChangeImage} >{fileList.length < 1 && "+ Image"}</Upload>
    </Form.Item> 
<div style={{ width: "100%", marginBottom: "30px"}}> 
<div style={{display: "flex"}}> 
<span style={{marginRight: "10px"}}>Type:</span> 
<Radio.Group size="small" onChange={onChangeType} value={typeLevelValue} style={{display: "flex"}}> 
    {props.typeLevel === null ? "" : <>{props.typeLevel.map((e,i)=>(
    <div key={i}>
    <Radio.Button value={e.index_} key={i}>{e.nameeng}</Radio.Button>  
    </div>
))}</>} 
</Radio.Group>
</div>

<div > 
{typeLevelValue == 14 || typeLevelValue == 15  || typeLevelValue == 16 || typeLevelValue == 17 ? 
<div style={{margin: "10px 47px"}}> 
{levelSpin ? <Spin /> : 
<Radio.Group size="small" onChange={onChangeTypeSub} value={typeLevelSub}> 
{typeSubValue === 0 ? "" : <>{typeSubValue.map((e,i)=>(
    <div key={i}> 
    <Radio value={e.index_} key={i}>{e.nameeng}</Radio> 
    </div>
))}</>} 
</Radio.Group>
} 
</div>: null}
</div>
</div>
    <Form.Item><div className={css.Ok}><Button style={{width: "100%"}} size="large" type="primary" htmlType="submit" className="login-form-button">+ Add</Button></div></Form.Item>
    </Form>   
    </div>
    </Modal>
</div>
}
export default ItemAdd;