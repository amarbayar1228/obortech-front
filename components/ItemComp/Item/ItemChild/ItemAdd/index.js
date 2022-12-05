import { Button, Form, Input, InputNumber, message, Modal, Radio, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import css from "./style.module.css"
const ItemAdd = (props) =>{
const [fileList, setFileList] = useState([]);
const [formAddItem] = Form.useForm(); 
const [isModalVisible, setIsModalVisible]= useState(false);
const [vType, setVType] = useState(1);
useEffect(()=>{
    console.log("props: ", props);
},[])
const showModal = () =>{
    console.log("object", props);
    setIsModalVisible(true);
}
const  onFinishAddItem = (values) =>{ 
// setIsModalVisible(false);
// let baseImg = values.img.file.thumbUrl.split("base64,")[1]; 

if(fileList[0]){
let baseImg2 = fileList[0].thumbUrl.split("base64,")[1];

const data = {
func: "newItem", title: values.itemName, description: values.descrip2, 
quantity: 0, price: values.price, cnt: 1, img: baseImg2, others: "-", status: 0, type_: values.type
};
axios.post("/api/post/Gate", data).then((res) => {
setFileList([]);
formAddItem.resetFields();  
setIsModalVisible(false);
message.success("Success");  
props.getItems();
}).catch((err) => {console.log("err", err)}); 


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
const onChangeType = (e) =>{
setVType(e.target.value);
}
const handleCancel = ()=>{
    setFileList([]);
    setIsModalVisible(false);
    formAddItem.resetFields();
}
return <div>
    <Button type="dashed" shape="round" onClick={showModal}>+ add item</Button>
    <Modal title="Add item" footer={null} open={isModalVisible} cancelText="cancel" okText="OK"  onCancel={handleCancel}>
    <div>
    <Form form={formAddItem} name="normal_login" className={css.LoginForm} labelCol={{span: 7}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinishAddItem} onFinishFailed={onFinishFailedAddItem}>
   
    <Form.Item label={"Item name"} name="itemName" rules={[{required: true,message: "Please input your First name!"}]}><Input placeholder={"Item name"}/></Form.Item>
    <Form.Item label={"Description"} name="descrip2" rules={[{required: true, message: "Please input your description!"}]}><TextArea placeholder={"Item description"}/></Form.Item>  
    <Form.Item label={"Price"} name="price" rules={[{type: 'number', required: true, message: "Please input your price!"}]}><InputNumber  placeholder={"Item price"}/></Form.Item>
    <Form.Item label="Image" name="img" rules={[{required: true,message: "Please input your Image!"}]}>
    <Upload onPreview={onPreview} listType="picture-card" fileList={fileList} onChange={onChangeImage} >{fileList.length < 1 && "+ Image"}</Upload>
    </Form.Item> 
    <Form.Item label={"type: "} name="type" rules={[{  type: 'number', required: true, message: "Please input your type!"}]}>
    <Radio.Group>
        {props.typeLevel === null ? "" : <>{props.typeLevel.typeName.map((e,i)=>(
            <Radio value={i+1} key={i}>{e}</Radio>
        ))}</>}
    </Radio.Group>
    </Form.Item>
  
    <Form.Item><div className={css.Ok}><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div></Form.Item>
    </Form>   
    </div>
    </Modal>
</div>
}
export default ItemAdd;