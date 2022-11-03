import { Badge, Button, Form, Input, InputNumber, message, Modal, notification, Radio, Tooltip, Upload } from "antd";
import React, { useState } from "react";
import css from "./style.module.css"
import {SearchOutlined ,CheckOutlined, ExclamationCircleOutlined, FormOutlined, ClearOutlined, StarOutlined,SolutionOutlined, FundViewOutlined,DeleteOutlined, EditOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
const ItemEdit = (props) =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const [formEdit] = Form.useForm();
const [itemInfo, setItemInfo] = useState("");
const [fileListUpdate, setFileListUpdate] = useState([]);
const [imgNullText, setImgNullText] = useState("");
const showModal = () => {
console.log("edit modal", props);
setItemInfo(props.addItemStatus);
setImgNullText("");
setFileListUpdate([
{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    thumbUrl: "data:image/png;base64," + props.addItemStatus.img,
}, 
]);
setIsModalOpen(true);
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    formEdit.resetFields();
    setIsModalOpen(false);
};
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
const onChangeImageUpdate = ({ fileList: newFileList }) => {
console.log("newFileList: ", newFileList);
setImgNullText("");
setFileListUpdate(newFileList);
};
const  onFinishEdit= (values) =>{ 
console.log("values: ", values);
console.log("pkId", itemInfo.pkId);
console.log("zyrag: ", fileListUpdate);
// console.log("state: ", fileListUpdate);
// console.log("editStatus: ", editStatus);
// console.log("idPk: ", idPk);

if(fileListUpdate[0]){ 
    let baseImg = fileListUpdate[0].thumbUrl.split("base64,")[1]; 
    setImgNullText(""); 
const body ={
    func: "editItem",
    pkId: itemInfo.pkId,
    title: values.title,
    description: values.descrip,
    price: values.price,
    img: baseImg, 
    type_: 1,
}
    axios.post("/api/post/Gate", body).then((res) => { 
    if(res.data.error){
        notification.error({
        message: res.data.error,
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
        setIsModalOpen(false); 
        props.addItemGetItems();
    }else{
        message.success("Success");
        setIsModalOpen(false); 
        props.addItemGetItems();
    } 
  
    }).catch((err) => {console.log("err", err)});  
}else{
    message.error("Please input your Image!");
    setImgNullText("Please input your Image!");
}  
}
const onFinishFailedEdit = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
return <div>
<Tooltip title="Edit"><Button size="small" className={css.BtnReject}  icon={<EditOutlined />} onClick={showModal} style={{margin: "0px 5px", color: "#4b4c00", background: "#acf5b5"}}></Button> </Tooltip>

<Modal title="Edit item" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
<Form form={formEdit} name="EditForm" className={css.LoginForm}  
labelCol={{span: 5,}} wrapperCol={{span: 30,}} 
initialValues={{ 
    title: itemInfo.title,
    descrip: itemInfo.description,
    price: itemInfo.price,
    // img: fileListUpdate,
    type: 3,
}} onFinish={onFinishEdit} onFinishFailed={onFinishFailedEdit}> 
<div className={css.CompNameCss}>
<div className={css.CompFlex}><div className={css.CompTitle}>Title:</div><div className={css.CompNameF}>{itemInfo.title}</div></div>
<div className={css.StatusCss}>
{/* {itemInfo.status == 0 ? (<Tooltip title="New request"><Badge status="warning" text="New request" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>) :  ""}  */}
{itemInfo.status == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#52c41a",fontWeight: "600"}}/></Tooltip>) : 
    itemInfo.status == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
    itemInfo.status == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
    }
</div>
</div>
<Form.Item label={"Title"} name="title"   rules={[{required: true,message: "Please input your First name!"}]}><Input placeholder={"itemName"} allowClear/></Form.Item>
<Form.Item label={"Description"} name="descrip" rules={[{required: true,message: "Please input your description!"}]}><TextArea placeholder={"itemDescription"} allowClear showCount/></Form.Item> 
<Form.Item label={"Price"} name="price" rules={[{  type: 'number', required: true, message: "Please input your price!"}]}>
    <InputNumber style={{width: "100px"}} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} placeholder={"itemPrice"}/>
</Form.Item>
<Form.Item label="Image"  rules={[{required: true,message: "Please input your Image!"}]}>  
        <Upload fileList={fileListUpdate} onPreview={onPreview} listType="picture-card" onChange={onChangeImageUpdate} >
        {fileListUpdate.length < 1 && "+ Image"}</Upload> <span className={css.ImgErr}>{imgNullText}</span>
</Form.Item>  
<Form.Item label={"type: "} name="type" rules={[{  type: 'number', required: true, message: "Please input your type!"}]}>
    <Radio.Group> 
         {props.typeLevel === null ? "" : <>{props.typeLevel.typeName.map((e,i)=>(
            <Radio value={i+1} key={i}>{e}</Radio>
        ))}</>}
        {/* <Radio value={1}>Subscribtion</Radio>
        <Radio value={2}>Device 6</Radio>
        <Radio value={3}>Device 12</Radio>
        <Radio value={4}>Items</Radio> */}
    </Radio.Group>
    </Form.Item>
{/* <div><Button onClick={()=> formEdit.resetFields()}>Reset</Button></div> */}
<Form.Item><div style={{marginBottom: "-35px"}}><Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}>Send</Button></div></Form.Item> 
</Form> 
</Modal>
</div>
}
export default ItemEdit;