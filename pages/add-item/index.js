import {Button,Drawer,Input,message,Modal,Space,Tabs,Spin,Select,Badge,Tooltip,Upload,Image,Empty,Form,InputNumber, Popconfirm, Typography, Switch, notification, Radio } from "antd";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout"; 
import css from "./style.module.css";
import {EditOutlined,AppstoreAddOutlined,GroupOutlined,ClockCircleOutlined,CaretRightOutlined,DeleteOutlined} from "@ant-design/icons";
import axios from "axios";
import { useTranslation } from "next-i18next";
import StatusChangeModal from "../../components/StatusChangeModal";
import GroupItemEdit from "../../components/GroupItemEdit";
import DisableGroupInsert from "../../components/DisableGroupInsert";
import GroupItemsInsert from "../../components/GroupItemsInsert";
import GroupItemDelete from "../../components/GroupItemDelete";
import TextArea from "antd/lib/input/TextArea";
import GroupDetails from "../../components/GroupDetail";
import Item from "../../components/ItemComp/Item";
import GroupItem from "../../components/ItemComp/GroupItem";
const { Option } = Select;
const { Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const AddBasket = (props) => {
const { t } = useTranslation("add-item");
const [price, setPrice] = useState();
const [qty, setQty] = useState();
const [title, setTitle] = useState();
const [description, setDescription] = useState();
const [itemData, setItemData] = useState([]);
const [editItemTitle, setEditItemTitle] = useState();
const [editItemDescription, setEditItemDescription] = useState();
const [editItemPrice, setEditItemPrice] = useState();
const [editItemQuantity, setEditItemQuantity] = useState();
const [editStatus, setEditStatus] = useState();
const [spinState, setState] = useState(false);
const [imgNullText, setImgNullText] = useState("");
const [isModalVisible, setIsModalVisible] = useState(false);
const [visible, setVisible] = useState(false);
const [placement, setPlacement] = useState("right");
const [getGroupItemsState, setGetGroupItemsState] = useState([]);
const [getGroupItemsSpin, setGetGroupItemsSpin] = useState(true);
const [groupTotalPrice, setGroupTotalPrice] = useState([{ amraa: "aa" }]);
const [fileList, setFileList] = useState([]);
const [fileListUpdate, setFileListUpdate] = useState([]);
const [vType, setVType] = useState(1);
const [gItemDetails, setGitemDetails] = useState([]);
const [itemScrollCss, setItemScrollCss] = useState();
const [groupItemBtn, setGroupItemBtn] = useState(false);
const [idPk, setIdpk] = useState("");
const [formAddItem] = Form.useForm();
const [formEdit] = Form.useForm();
const [ellipsis, setEllipsis] = useState(true);
const [groupIndex, setGroupIndex] = useState();
const [cssGroup, setCssGroup] = useState("");
const [too, setToo] = useState(0);
useEffect(() => {
getItems();
getGroupItems();
}, []); 
const getGroupItems = () => {
setGetGroupItemsSpin(false);
const body = {func: "getGroups"}; 
axios.post("/api/post/Gate", body).then(
  (res) => { 
    setGetGroupItemsState(res.data.data.list);  
  }).catch((err)=>{console.log("err")});   
};
const showDrawer = (data) => {
setToo(1);
console.log("drawer pkId: ", data.pkId);
console.log("drawer title: ", data.title);

setImgNullText("");
setIdpk(data.pkId);
setEditItemTitle(data.title);
setEditItemDescription(data.description);
setEditItemPrice(data.price);
setEditItemQuantity(data.quantity);
setEditStatus(data.status);
setFileListUpdate([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    thumbUrl: "data:image/png;base64," + data.img,
  }, 
]);

setVisible(true);
};

const onClose = () => {

setToo(0);
// formEdit.resetFields();

console.log("close"); 
setVisible(false);
};
const onSave = async (id) => {
let src;
if (fileListUpdate[0]) {
  if (fileListUpdate[0].url) {
    var bbb = fileListUpdate[0].url;
  } else if (fileListUpdate[0].thumbUrl) {
    if (fileListUpdate[0].uid == "-1") {
      src = fileListUpdate[0].thumbUrl;
    } else if (fileListUpdate[0].hasOwnProperty("originFileObj")) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileListUpdate[0].originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    } else {
    }
  }
  let aaa;
  if (src) {
    aaa = src.split("base64,")[1];
  } else {
    // console.log("aaa bhq", aaa);
  }
  let bbbSplit;
  if (bbb) {
    // console.log("bbb: ", bbb);
    bbbSplit = bbb.split("base64,")[1];
    // console.log("bbbSplit", bbbSplit);
  } else {
    // console.log("bbb bhq", bbb);
  }
  console.log("item pkId: ", id);
  console.log("title: ", editItemTitle);
  console.log("descr: ", editItemDescription);
  console.log("editItemQuantity: ", editItemQuantity);
  console.log("editItemPrice: ", editItemPrice);
  console.log("Img: ", aaa);
  console.log("bbbSplit: ", bbbSplit);
  const update = {
    pkId: id,
    title: editItemTitle,
    description: editItemDescription,
    // quantity: editItemQuantity,
    price: editItemPrice,
    cnt: 1,
    img: aaa === undefined ? bbbSplit : aaa,
  };
  // axios
  //   .post("/api/post/item/updateItem", update)
  //   .then((res) => {
  //     message.success(res.data);
  //     setVisible(false);
  //     getItems();
  //   })
  //   .catch((err) => {
  //     message.error(err);
  //   });
} else {
  message.success("talbariig buglnu vv hooson bn ");
}
};

const showModal = () => {
setIsModalVisible(true);
};

// get item
const getItems = () => {
const body = {
  func: "getItems",
  status: -1,
};
axios.post("/api/post/Gate", body).then((res) => {
  console.log("item get");
    setState(true); 
    setItemData(res.data.getItems.list);
  }).catch((err) => {message.error(err)}); 

  const itemLevel = {
    func: "getTypes",
  }
  axios.post("/api/post/Gate", itemLevel).then((res)=>{
    console.log("level: ", res.data);
  })
};
const handleOk = async () => { 
// setIsModalVisible(false);
}; 
const handleCancel = () => {
formAddItem.resetFields();
setFileList([]);
setIsModalVisible(false);
};
const onChangeImage = ({ fileList: newFileList }) => {
console.log("newFile: ",newFileList );
setFileList(newFileList);
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
const onPreviewUpdate = async (file) => {
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
imgWindow.document.write(image.outerHTML);
};

const groupItemsDetials = (itemData, i) => {
setGroupItemBtn(!groupItemBtn);
setItemScrollCss(i);
const body = {
  func: "getGroups", 
  pkId: itemData.pkId};
axios.post("/api/post/Gate", body).then((res) => { 
    const itemI = {itemI: i};
    if (res.data.data.itemList == undefined) {console.log("hoosn push")} 
    else { 
      res.data.data.itemList.push(itemI); 
        console.log("res: ", res.data.data);
      setGitemDetails(res.data.data.itemList);}
  }).catch((err) => {console.log("err", err)});
};
const  onFinishAddItem = (values) =>{ 
let baseImg = values.img.file.thumbUrl.split("base64,")[1]; 
const data = {
  func: "newItem", title: values.itemName, description: values.descrip, 
  quantity: 0, price: values.price, cnt: 1, img: baseImg, others: "-", status: 0, type_: values.type
};
axios.post("/api/post/Gate", data).then((res) => {
    formAddItem.resetFields();  
    setIsModalVisible(false);
    message.success("Success");  
    getItems();
  }).catch((err) => {console.log("err", err)});

}
const onFinishFailedAddItem = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}

const  onFinishEdit= (values) =>{ 
console.log("values: ", values);
// console.log("state: ", fileListUpdate);
// console.log("editStatus: ", editStatus);
// console.log("idPk: ", idPk);
if(fileListUpdate[0]){ 
  let baseImg = fileListUpdate[0].thumbUrl.split("base64,")[1]; 
  setImgNullText("");

const body ={
    func: "editItem",
    pkId: idPk,
    title: values.title,
    description: values.descrip,
    price: values.price,
    img: baseImg, 
}
  axios.post("/api/post/Gate", body).then((res) => {
    formEdit.resetFields();  
    setVisible(false);
    console.log("err: ", res.data);
    if(res.data.error){
      notification.error({
        message: res.data.error,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    }else{
      message.success("Success");
    }
    
      
    getItems();
  }).catch((err) => {console.log("err", err)}); 


}else{
  message.error("Please input your Image!");
  setImgNullText("Please input your Image!");
}  

// const data = {
//   func: "newItem", title: values.itemName, description: values.descrip, 
//   quantity: 0, price: values.price, cnt: 1, img: baseImg, others: "-", status: editStatus,
// };
// axios.post("/api/post/Gate", data).then((res) => {
//     formAddItem.resetFields();  
//     setIsModalVisible(false);
//     message.success("Success");  
//     getItems();
//   }).catch((err) => {console.log("err", err)}); 
}
const onFinishFailedEdit = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
const confirm = (e) => { 
const body = {
  func: "delItem",
  pkId: e.pkId,
};
axios.post("/api/post/Gate", body).then((res) => {  
  console.log("resdelete: ", res.data);
  if(res.data.error){
    notification.error({
      message: res.data.error,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }else{
    message.success(e.title + ' item deleted');
    getItems();
  }
   
  }).catch((err) => {console.log("err", err)});
}; 
const cancel = (e) => {
console.log(e);
message.error('Click on No');
};
const moreText = (i) =>{ 
  if(cssGroup === i){
    setCssGroup("a");  
  }else {
    setCssGroup(i);  
  } 
}
const onChangeType = (e) =>{
  setVType(e.target.value);
}
const onchangeTab = (a) =>{
  console.log("itemTab",a);
  a === 0 ? getItems() : ""
}
const textFunc = () =>{
  console.log("texFunc");
}
return (
<BaseLayout pageName="add-item">
  <div style={{ fontWeight: "500", textTransform: "uppercase" }}>

<Tabs   onChange={onchangeTab} defaultActiveKey="4" items={["a","a"].map((Icon, i) => {  
return {
  label: i=== 0 ? "Item List" : "Group list", key: i, children: i === 0? 
  <div>
      <Item />
  </div> 
  :   
  <div>  
    <GroupItem />
  </div>,
};
})}
/>



    <Tabs defaultActiveKey="1">
      <TabPane tab={<span className="flex items-center text-base	"><AppstoreAddOutlined style={{ fontSize: "16px", color: "#1f2937" }}/>Item List</span>} key="1">
        <div> 

          <div className={css.BaraaNemeh}>
            <Button type="dashed" shape="round" onClick={showModal}>+ {t("addItem")}</Button>
            <Modal title={t("addItem")} footer={null} open={isModalVisible} onOk={handleOk} cancelText={t("addItemModalCancelBtn")} okText={t("addItemModalOkBtn")} onCancel={handleCancel}>
              <div>
              <Form form={formAddItem} name="normal_login" className={css.LoginForm} labelCol={{span: 6}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinishAddItem} onFinishFailed={onFinishFailedAddItem}>
                <Form.Item label={t("itemName")} name="itemName" rules={[{required: true,message: "Please input your First name!"}]}><Input placeholder={t("itemName")}/></Form.Item>
                <Form.Item label={t("itemDescription")} name="descrip" rules={[{required: true, message: "Please input your description!"}]}><TextArea placeholder={t("itemDescription")}/></Form.Item> 
                    <Form.Item label={t("itemPrice")} name="price" rules={[{  type: 'number', required: true, message: "Please input your price!"}]}><InputNumber  placeholder={t("itemPrice")}/></Form.Item>
                    <Form.Item label="Image" name="img" rules={[{required: true,message: "Please input your Image!"}]}>
                      <Upload onPreview={onPreview} listType="picture-card" fileList={fileList} onChange={onChangeImage} >{fileList.length < 1 && "+ Image"}</Upload>
                    </Form.Item> 
                    <Form.Item label={"type: "} name="type" rules={[{  type: 'number', required: true, message: "Please input your type!"}]}>
                    <Radio.Group onChange={onChangeType} value={vType}>
                      <Radio value={1}>Subscribtion</Radio>
                      <Radio value={2}>Device 6</Radio>
                      <Radio value={3}>Device 12</Radio>
                      <Radio value={4}>Items</Radio>
                    </Radio.Group>
                    </Form.Item>
                    <Form.Item><div className={css.Ok}><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div></Form.Item>
                </Form>   
              </div>
            </Modal>
          </div> 

          <div>
            <Drawer title={t("editItem")} placement={placement} width={500} onClose={onClose} open={visible}>
                  <Form form={formEdit} name="normal_login" className={css.LoginForm}  
                    labelCol={{span: 6,}} wrapperCol={{span: 16,}} 
                    initialValues={{ 
                      title: editItemTitle,
                      descrip: editItemDescription,
                      price: editItemPrice,
                      img: fileListUpdate,
                    }} 
                    onFinish={onFinishEdit} onFinishFailed={onFinishFailedEdit}>
                      <Form.Item label={t("itemName")} name={"title"}   rules={[{required: true,message: "Please input your First name!"}]}>
                      <Input placeholder={t("itemName")} allowClear/>
                    </Form.Item>
                    <Form.Item label={t("itemDescription")} name={"descrip"}
                      rules={[{required: true,message: "Please input your description!"}]}>
                      <TextArea placeholder={t("itemDescription")} allowClear showCount/>
                    </Form.Item> 
                    <Form.Item label={t("itemPrice")} name="price"
                      rules={[{  type: 'number', required: true, message: "Please input your price!",}]}>
                      <InputNumber style={{width: "100px"}} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')} placeholder={t("itemPrice")}/>
                    </Form.Item> 
                    <Form.Item label="Image" name="img"
                      rules={[{required: true,message: "Please input your Image!"}]}> 
                          <Upload fileList={fileListUpdate} onPreview={onPreview} listType="picture-card" onChange={onChangeImageUpdate} >
                          {fileListUpdate.length < 1 && "+ Image"}</Upload> <span className={css.ImgErr}>{imgNullText}</span>
                    </Form.Item>  
                    <div> 
                      <Button onClick={()=> formEdit.resetFields()}>Reset</Button></div>
                    <Form.Item>
                      <div ><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div>
                    </Form.Item> 
                  </Form> 
            </Drawer>
          </div> 

          {spinState === false ? (<div><Spin className={css.SpinCss} tip="" size="large"></Spin></div>) : ("")}
          {itemData === undefined ? <Empty /> : (
            <div className={css.GroupLayoutCss}>
              <div className={css.BaraaHuwaalt}>
                {itemData.map((iData, index) => (
                  <div className={iData.status == 2 ? css.BaraaDiv2 : css.BaraaDiv} key={index}>
                    <div className={css.Edit}>
                      <div>
                        {iData.status == 1 ? (
                          <><Tooltip title={iData.others} zIndex={100}><Badge status="success" count={<ClockCircleOutlined style={{color: "#f5222d"}}/>}/></Tooltip></>
                        ) : iData.status == 2 ? (<Tooltip title={iData.others}><Badge status="error" /></Tooltip>
                        ) : iData.status == 0 ? (<Tooltip title={iData.others}><Badge status="default" /></Tooltip>
                        ) : ("")}
                      </div> 
                      <div className={css.EditHover}>
                        <StatusChangeModal addItemStatus={iData} addItemGetItems={getItems}/>
                        <Popconfirm title="Are you sure to delete this item?" onConfirm={()=>confirm(iData)} onCancel={cancel} okText="Yes" cancelText="No">
                            <Button danger type="primary" shape="circle" size="small" icon={<DeleteOutlined />} style={{marginRight: "3px"}}></Button>
                        </Popconfirm> 
                        <Button type="primary" shape="circle" size="small" onClick={() => showDrawer(iData)} icon={<EditOutlined />} style={{marginRight: "3px"}}></Button>
                      </div>
                    </div> 
                    <div className={css.Ihdr}>
                      <Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64," + iData.img} />
                    </div>
                    <div className={css.LastDiv}>
                      <div className={css.TitleBaraa}>{iData.title}</div>
                      <div className={css.TitleBaraa2}>{iData.description}</div>
                      <div className={css.Total}><div>{iData.price}$</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabPane>
{/* + Group items ====================================================================================================================> */}         
      <TabPane tab={
          <span className="flex items-center text-base	"><GroupOutlined style={{ fontSize: "16px", color: "#1f2937" }} />Group List</span>
        }key="2">
        <div>
            {/* + Group insert items ============================================================================> */}   
          <GroupItemsInsert getItems={itemData} getGroupItems={getGroupItems}/> 
          <div>
            {getGroupItemsSpin === false ? (
              <>
                {getGroupItemsState[0] === null ? (<Empty />) : (
                  <div className={css.GroupLayoutCss}>
                    <div className={css.DislayFlex}>
                      {getGroupItemsState.map((e, i) => (
                        <div key={i} className={e.status === 2 ? css.ItemLayoutDisable : css.ItemLayout}>
                          <div className={css.Gtitle}>{e.title} </div>
                          <div> 
                          <div className={cssGroup === i ? css.Gdescrip2 : css.Gdescrip}> 
                              {e.description} 
                          </div> {e.description.length <= 30 ? "" :<span className={cssGroup === i ? css.MoreText2 : css.MoreText}><Button onClick={()=>moreText(i)} size="small" type="link" danger>{cssGroup === i ? "hide" : "more"}</Button></span>}
                          </div>
                          <div>
                            {e.status === 1 ? (<Tooltip title={e.others}><Badge status="success" text="Enable" /></Tooltip>
                            ) : e.status === 2 ? (<Tooltip title={e.others}><Badge status="error" text="Disable" /></Tooltip>
                            ) : e.status === 0 ? (<Tooltip title={e.others}><Badge color="gray" status="processing" text="Invisible"/></Tooltip>
                            ) : ("")}
                          </div>
                          <div className={css.HoverEditCss}>
                            {e.status === 2 ? ("") : (
                              <><div><StatusChangeModal pkId={e} getGroupItems={getGroupItems}/></div>
                                <div><GroupItemEdit pkId={e} getGroupItems={getGroupItems}/></div>
                                <div><GroupItemDelete pkId={e} getGroupItems={getGroupItems}/></div></>
                            )}
                            {e.status === 2 ? (<div><DisableGroupInsert disbaleInster={e} getGroupItems={getGroupItems}/></div>) : ("")}
                          </div> 
                            <div className={css.CollapseCss}> 
                              <div className={css.OrgIDCss}>
                                <Button className={css.BtnDG}
                                  onClick={() => groupItemsDetials(e, i)}>
                                    {groupItemBtn === true ? (itemScrollCss === i ? (<CaretRightOutlined rotate={90} />) 
                                    : (<CaretRightOutlined />)) 
                                    : (<CaretRightOutlined />)}
                                  Group items
                                </Button>
                              </div>
                              <div className={css.ItemScroll}><div>
                                  <GroupDetails items={e.pkId}/> 
                                </div>
                              </div> 
                            </div> 
                            <div className={css.GroupPrice}>Price: {parseInt(e.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$ </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Spin className={css.SpinCss}tip=""size="large"></Spin>)}
          </div>
        </div>
      </TabPane>
    </Tabs>

  </div>
</BaseLayout>
);
};
export default AddBasket;
