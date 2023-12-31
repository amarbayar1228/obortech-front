import { Badge, Button, Form, Input, InputNumber, message, Modal, notification, Radio, Skeleton, Space, Spin, Tooltip, Upload } from "antd";
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
const [typeLevelValue, setTypeLevelValue] = useState(14);
const [typeLevelSub, setTypeLevelSub] = useState(14);
const [typeSubValue, setTypeSubValue] = useState(0);
const [levelSpin, setLevelSping] = useState(false);
const [disableBtn, setDisableBtn] = useState(false);
const [typeDetails, setTypeDetails] = useState(0);
const showModal = () => { 
setDisableBtn(false);
console.log("14", typeLevelValue);
console.log("propsasd: ", props.addItemStatus.type_);
 
setLevelSping(true);
const body = {
    func:'getTypes',
    type_:'2',
    index_: props.addItemStatus.type_
}
axios.post("/api/post/Gate", body).then((res)=>{
    console.log("type hdr: ", res.data.data);
    setTypeLevelValue(res.data.data[0].parid); 
    const typeDetailsBody = {
        func: "getTypes",
        type_:2,
        parid: res.data.data[0].parid
    }
    axios.post("/api/post/Gate", typeDetailsBody).then((res)=>{
        console.log("res details: ", res.data.data);    
        setLevelSping(false);
        setTypeSubValue(res.data.data);
        setTypeDetails(props.addItemStatus.type_);
    }).catch((err)=>{
        console.log("err");
    })
  
}).catch((err)=>{
    console.log("err");
})

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
    console.log("typeDetails: ", typeDetails);
setDisableBtn(true)
 
// console.log("state: ", fileListUpdate);
// console.log("editStatus: ", editStatus);
// console.log("idPk: ", idPk);

if(fileListUpdate[0]){ 
    if(typeDetails === 0){
        message.error("Type level choose!")
        setDisableBtn(false);
    }else{
    let baseImg = fileListUpdate[0].thumbUrl.split("base64,")[1]; 
    setImgNullText(""); 
const body ={
    func: "editItem",
    pkId: itemInfo.pkId,
    title: values.title,
    description: values.descrip,
    price: values.price,
    img: baseImg, 
    type_: typeDetails,
}
    axios.post("/api/post/Gate", body).then((res) => { 
    if(res.data.error){
        notification.error({
        message: res.data.error,
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
        setDisableBtn(false);
        setIsModalOpen(false); 
        props.searchDate();
    }else{
        setDisableBtn(false);
        message.success("Success");
        setIsModalOpen(false); 
        props.searchDate();
    } 
  
    }).catch((err) => {console.log("err", err)});  
    }
}else{
    message.error("Please input your Image!");
    setImgNullText("Please input your Image!");
}  
}
const onFinishFailedEdit = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
const onChangeType = (e) =>{ 
    setTypeLevelValue(e.target.value)
    console.log("value: ", e.target.value);
    setDisableBtn(true);
    setLevelSping(true);
    const body = {
        func:"getTypes",  
        parid:e.target.value,
        type_: 2
    }
    axios.post("/api/post/Gate", body).then((res)=>{
        console.log("res", res.data);
        setLevelSping(false); 
       
        setTypeSubValue(res.data.data); 
        setTypeDetails(0)
    }).catch((err)=>console.log("err"));
}
const onChangeTypeSub = (e) =>{
    console.log("subs: ", e.target.value);
    // setTypeLevelSub(e.target.value); 
    setTypeDetails(e.target.value)
    setDisableBtn(false)
}
return <div>
<Tooltip title="Edit">
    <Button size="small" className={css.BtnReject}  icon={<EditOutlined />} onClick={showModal} style={{margin: "0px 5px"}}></Button>
</Tooltip>

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
<div className={css.CompFlex}><div className={css.CompTitle}>Item name:</div><div className={css.CompNameF}>{itemInfo.title}</div></div>
<div className={css.StatusCss}>
{/* {itemInfo.status == 0 ? (<Tooltip title="New request"><Badge status="warning" text="New request" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>) :  ""}  */}
{itemInfo.status == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#52c41a",fontWeight: "600"}}/></Tooltip>) : 
    itemInfo.status == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
    itemInfo.status == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
}
</div>
</div>
<Form.Item label={"Item name"} name="title"   rules={[{required: true,message: "Please input your First name!"}]}><Input placeholder={"itemName"} allowClear/></Form.Item>
<Form.Item label={"Description"} name="descrip" rules={[{required: true,message: "Please input your description!"}]}><TextArea placeholder={"itemDescription"} allowClear showCount/></Form.Item> 
<Form.Item label={"Price"} name="price" rules={[{  type: 'number', required: true, message: "Please input your price!"}]}>
    <InputNumber style={{width: "100px"}} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} placeholder={"itemPrice"}/>
</Form.Item>
<Form.Item label="Image"  rules={[{required: true,message: "Please input your Image!"}]}>  
        <Upload fileList={fileListUpdate} onPreview={onPreview} listType="picture-card" onChange={onChangeImageUpdate} >
        {fileListUpdate.length < 1 && "+ Image"}</Upload> <span className={css.ImgErr}>{imgNullText}</span>
</Form.Item>  
<> 
 {levelSpin ?  <Spin style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}/> :
<div>
    <div className={css.TypeCss}>  
    <span style={{color: "#4d5057",   marginRight: "10px"}}>Type:</span>   
        <Radio.Group size="small" onChange={onChangeType} value={typeLevelValue} style={{display: "flex"}}> 
                {props.typeLevel === null ? "" : 
                    <>
                    {props.typeLevel.map((e,i)=>(
                    <div key={i}>
                        <Radio.Button value={e.index_} key={i}>{e.nameeng} </Radio.Button>
                    </div>
                ))}</>
                } 
        </Radio.Group>  
    </div>
    <div>
    <div style={{margin: "10px 47px"}}>   
<Radio.Group size="small" onChange={onChangeTypeSub} value={typeDetails}> 
{typeSubValue === 0 ? "" : <>{typeSubValue.map((e,i)=>(
    <div key={i}> 
        <Radio value={e.index_} key={i}>{e.nameeng}</Radio> 
    
    </div>
))}</>
} 
</Radio.Group>  
</div> 
    </div>
</div> }
</>
 <> 

</>

{/* <div><Button onClick={()=> formEdit.resetFields()}>Reset</Button></div> */}
<Form.Item><div style={{marginBottom: "-35px"}}><Button type="primary" htmlType="submit" className="login-form-button" size="large" style={{width: "100%"}} disabled={disableBtn}>Update</Button></div></Form.Item> 
</Form> 
</Modal>
</div>
}
export default ItemEdit;