import React, { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { SolutionOutlined,ExclamationCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import {Button, Collapse, Divider, Empty, Image, Modal, Spin, Space, DatePicker, Table, Tag, Input} from "antd";
import css from "./style.module.css";
import { UserOutlined,SearchOutlined  } from "@ant-design/icons";
import axios from "axios";
import BasketContext from "../../context/basketContext/BasketContext";
import moment from "moment"; 
import Highlighter from 'react-highlight-words';
import Invoice from "../../components/OrderHistory/Invoice";
const { Panel } = Collapse;
const { confirm } = Modal;
const OrderHistory = () => { 
  const basketContext = useContext(BasketContext);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [loading, setLoading]= useState(false);
  const [loadingPage, setLoadingPage]= useState(true);
  const [isModalUserInfo, setIsModalUserInfo] = useState(false);
  const [userSpin, setUserSpin] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [userInfoS, setUserInfoS] = useState([]);
  const [detailsSpin, setDetailsSpin] = useState(false);
  const [orderHdr, setOrderHdr]= useState([{key: 1,orderid: 0,date: 0,organization: 0,status: 0,price: 0, invoice: 0,paymethod: 0
  },{key: 2,orderid: 0,date: 0,organization: 0,status: 0,price: 0, invoice: 0,paymethod: 0
  }]);
  const [modalOrderItem, setModalOrderItem] = useState([]);
  const [orderSpin, setOrderSpin] = useState(false);
  // const [dateState, setDateState] = useState("2022-09-01");
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iDIndex, setIdIndex] = useState();
  const [gItemDetails, setGitemDetails] = useState([]);
  const [todayDateState,setTodayDateState] = useState("2022-09-12");
  const [orderNull, setOrderNull] = useState(0);
  const [orderHdrInfo, setOrderHdrInfo] = useState("");
  const [showItem, setShowItem] = useState(0);
  const [itemHdrData, setItemHdrData] = useState();
  const [loggedLoad,setLoggedLoad ] = useState(true); 
  useEffect(() => {  
    // console.log("basketContext: ", basketContext);
    setTimeout(()=>{
        setLoggedLoad(false); 
      },800);
    getOders();  
  }, []); 
 
  const showModal = (a) => {
    setOrderSpin(true) 
    setIsModalOpen(true);
    console.log("Item: ", a );
    setOrderHdrInfo(a);
    const body = {
      func:"getOrderItems", 
      orderid: a.orderid,
    }
    axios.post("/api/post/Gate", body).then((res)=>{
    
      // console.log("item order: ", res.data.data);
      setModalOrderItem(res.data.data);
      setOrderSpin(false)
    }).catch((err)=>{
      console.log("err: ", err);
    })
  
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIdIndex("");
  };
const getOders = () =>{
  setLoading(true);
  setLoadingPage(true);
  const body = {}
if (localStorage.getItem("pkId")) {
const body = {func: "getUserInfo", pkId: localStorage.getItem("pkId")};
  axios.post("/api/post/Gate", body).then((res) => {
  setTodayDateState("2022-10-10");
  console.log("res: ", res.data.data);
// admin bolon operator all order historys
if(res.data.data.isSuperAdmin == 1 || res.data.data.isSuperAdmin == 2 ){
  const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12",]; var date = new Date(); var d1 =  date.getFullYear() + "-" + mounths[date.getMonth()] + "-" + date.getDate() + "";   
  setTodayDateState(d1); 
  const body2 = {func:"getOrders", d1: d1, d2: d1, } 
  axios.post("/api/post/Gate", body2).then((res)=>{
    console.log("admin and operator data: ", res.data.data); setOrderNull(1);  setLoadingPage(false); setLoading(false);  setOrderHdr(res.data.data);
  }).catch((err)=>{console.log("err: ", err)})
  // User all order historys
  }else if(res.data.data.isSuperAdmin == 0){
    const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12",]; var date = new Date(); var d1 =  date.getFullYear() + "-" + mounths[date.getMonth()] + "-" + date.getDate() + "";  
    setTodayDateState(d1);
    const bodyUser = {
    func:"getOrderUserID", d1: d1, d2: d1,pkId: localStorage.getItem("pkId")}
    axios.post("/api/post/Gate", bodyUser).then((res)=>{
      console.log("user data: ", res.data.data); setOrderNull(1);  setLoadingPage(false); setLoading(false); setOrderHdr(res.data.data);
    }).catch((err)=>{console.log("err: ", err)})  
  } 
}).catch((err) => {console.log(err)});
} else {setOrderNull(0); setLoadingPage(false); setLoading(false);} 
}
 
  // admin orderHistory
 
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{padding: 8,}}>
        <Input ref={searchInput} placeholder={`Search ${dataIndex}`} value={selectedKeys[0]} onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{marginBottom: 8,display: 'block',}}/>
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{width: 90}}>Search</Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{width: 90,}}>Reset</Button>
          <Button type="link" size="small" onClick={() => {confirm({closeDropdown: false,});setSearchText(selectedKeys[0]);setSearchedColumn(dataIndex);}}>Filter</Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => ( <SearchOutlined style={{color: filtered ? '#1890ff' : undefined,}}/>),
    onFilter: (value, record) =>record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {setTimeout(() => searchInput.current?.select(), 100)}
    },
    render: (text) =>searchedColumn === dataIndex ? (
        <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0}} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''}/>) : (text),
  });
   
const dateOnchange = (a,b) =>{
  console.log("date 1: ",b[0]);
  console.log("date 2: ",b[1]);
  setDate1(b[0]);
  setDate2(b[1]);
}
const searchDate = () =>{
  setLoading(true); 
 const body = {}
 if(basketContext.userInfoProfile.isSuperAdmin === 0){
    body = {func:"getOrderUserID", d1: date1, d2: date2, pkId: localStorage.getItem("pkId")}
}else {
  body = {func:"getOrders", d1: date1, d2: date2,}
}  
  axios.post("/api/post/Gate", body).then((res)=>{ 
    console.log("res date change: ", res.data.data);
    if(res.data.data[0]){setLoading(false); setOrderHdr(res.data.data);
    }else {setLoading(false); setOrderHdr(res.data.data);}
  }).catch((err)=>{console.log("err: ", err)})
}
 
const orderSend = (a) => {
  confirm({title: 'Do you Want to smarthub items send?', icon: <ExclamationCircleOutlined />,
    content: <div>Order ID: {a.orderid}</div>,
    onOk() {
      console.log('OK');  
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const userInfo = (a)=>{
// console.log("user: ", a);
setIsModalUserInfo(true);
setUserSpin(true);
const body = {func: "getUserInfo", pkId: a.all.userPkId, }; 
  axios.post("/api/post/Gate", body).then((res)=>{
    console.log("user info: ", res.data.data);
    setUserInfoS(res.data.data);
    setUserSpin(false);
  }).catch((err)=>{console.log("err");}) 
}
const handleCancelUser = () =>{
  setIsModalUserInfo(false);
}
const columns = [
  {
    title: <span>{basketContext.t('orderId', { ns: 'order-history' })}</span>,
    dataIndex: 'orderid',
    key: 'orderid', 
    fixed: "left",
    width: 80,
    responsive: ['md'],
    ellipsis: true,
    render: (text) => <a>{text}</a>,
    ...getColumnSearchProps('orderid'),
  },
  {
    title: basketContext.t('date', { ns: 'order-history' }),
    dataIndex: 'date',
    key: 'date', 
    ellipsis: true,
    width: 80,
  },
  {
    title: basketContext.t('orgName', { ns: 'order-history' }),
    dataIndex: 'organization',
    key: 'organization',
    width: 120,
    render: (text) => <a>{text}</a>,
    ...getColumnSearchProps('organization'),
    responsive: ['md'],
    ellipsis: true,
  },
  
  {
    title: basketContext.t('totalPrice', { ns: 'order-history' }),
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
    width: 80,
  },

  {
    title: basketContext.t('invoice', { ns: 'order-history' }), 
    key: 'invoice',
    ellipsis: true,
    width: 90,
    render: (_, record) => (
      <Space size="middle">
        <Invoice orderId={record} />
        {/* <Button type="dashed" size="small" onClick={()=>detailsItem(record.orderid)}>Invoice</Button>  */}
      </Space>
    ),
    responsive: ['md'],
  },
  {
    title: basketContext.t('payMethod', { ns: 'order-history' }),
    dataIndex: 'paymethod',
    key: 'paymethod',
    width: 50,
    ellipsis: true,
  },
  {
    title: basketContext.t('status', { ns: 'order-history' }), 
    dataIndex: 'status',
    key: 'status',
    ellipsis: true, 
    render: (_, tag) => (
      <Tag color="blue" key={tag}>
          {tag.status === 0 ? "Pending" : "1"}
        </Tag>
    ), 
    width: 90,
  },
  {
    title: basketContext.t('items', { ns: 'order-history' }),
    width: 80,
    key: 'action',
    fixed: "right",
    ellipsis: true,
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={()=>showModal (record)} size="small" type="dashed" shape="round">{basketContext.t('show', { ns: 'order-history' })}</Button> 
    
      </Space>
    ),
  },
  {
    title: basketContext.t('action', { ns: 'order-history' }), 
    key: 'action',
    width: 80,
    render: (_, record) => (
      <Space size="middle"> 
      {record.all.userPkId === "-" || record.all.userPkId === localStorage.getItem("pkId") ? null : <Button onClick={()=>userInfo(record)} icon={<SolutionOutlined />} ></Button>}
      </Space>
    ),
    responsive: ['md'],
  },
]; 
const data = orderHdr.map((r, i)=>(
    {
      key: i,
      orderid: r.orderid,
      date: r.date_,
      organization:r.orgId,
      status: r.status,
      price: r.totalPrice, 
      invoice: "invoice", 
      paymethod: "1",
      all: r
    } 
));
const groupDeitalsFunc = (data, index) =>{
  setShowItem(1);
  setItemHdrData(data);
  setDetailsSpin(true);
  console.log("elemnt", data);
  console.log("data: ", data.pkId);
  console.log("index: ", index);

  const body = {
    func: "getGroups",
    pkId: data.pkId,
  };
  axios.post("/api/post/Gate", body).then((res) => {
      console.log("res details:  ", res.data.data.itemList); 
      if (res.data.data.itemList == undefined) {console.log("hoosn");
      } else { setGitemDetails(res.data.data.itemList); setDetailsSpin(false);}
    }).catch((err) => {console.log("err", err)});
  setIdIndex(index);
}
  return (
<BaseLayout pageName="order-history"> 

{loggedLoad ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "100px"}}/> : 
<> 
{basketContext.userInfoProfile ?
<> 
{orderNull === 1 ?
<div> 
<div className={css.OrderTitle}>
  <Divider orientation="left">{basketContext.t('title', { ns: 'order-history' })}</Divider>
</div>
{/* ================================================= item info modal ===================================================================== */}
<Modal title={basketContext.t('itemsInfo', { ns: 'order-history' })} open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
  <div>
  {orderSpin ? <Spin className={css.SpinCss}/> : 
    <>  
    <div className={css.OrderHdrLaCss}>
      <div className={css.DateCss}>
        <div className={css.OrderIdCss}>{basketContext.t('orderId', { ns: 'order-history' })} : #{orderHdrInfo.orderid}</div>
        <div>  {orderHdrInfo.date}</div>
      </div>
    </div>
    <div className={css.ItemInfoScroll}>  
      {showItem === 0 ? 
      <>
      {modalOrderItem.map((e, i)=>(
        <div key={i} className={css.OrderItem}>
          <div className={css.orderImg}>
            {e.img === "" ? <div className={css.GroupItemcs}>G</div> : <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img }/>}
          </div>
          <div className={css.orderDetailcss}>
            <div className={css.Titlecss}>
              <div className={css.OrderCnt}> <div>{e.title}</div> <div className={css.CntCss}>{e.cnt}</div></div>
              <div className={css.DescriptionCss}>{e.description}</div>
            </div>
            <div className={css.TotalPricecc}> 
            {e.state === 2 ? "" : 
              <div><Button onClick={()=>groupDeitalsFunc(e, i)} size="small" shape="round" type="dashed" style={{fontWeight: "500", color: "rgb(6 78 59)"}}>{basketContext.t('groupDetails', { ns: 'order-history' })}: </Button> </div>}
              <div className={css.Pricecss}>{e.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
            </div> 
            
          </div>
        </div>
      ))}
      </>
      : 
      <div>
        <div className={css.BackTitle}> 
          <Button type="link" onClick={()=> setShowItem(0)} size="small"><ArrowLeftOutlined /></Button> 
          <div>{basketContext.t('groupItems', { ns: 'order-history' })}</div>
        </div>
          <div className={css.Titledecs}>{itemHdrData.title} </div> 
          <div className={css.Detailsdecs}>{itemHdrData.description}</div>
        
          
              <div className={css.OrderDetailsHide}> 
                {detailsSpin ? <Spin size="large" className={css.SpinCss}/> :
                <> 
                {gItemDetails.map((item, index)=>(
                  <div key={index} className={css.OrderItem}>
                    <div className={css.orderImg2}> <Image alt="Obertech"preview={false} src={"data:image/png;base64," + item.img }/> </div>
                    <div className={css.orderDetailcss}>
                    <div className={css.Titlecss}> 
                      <div className={css.OrderCnt}>
                        <div>{item.title}</div>
                        <div className={css.CntCss}>{item.itemCnt}</div>
                      </div>
                      <div className={css.DescriptionCss}>{item.description}</div>
                    </div>
                    <div className={css.TotalPricecc2}>  
                      <div className={css.Pricecss}>{item.itemPriceD}$</div>
                    </div>
                    </div>
                  </div>
                ))}
                </> 
                }
              </div>
      </div>
      }
    </div>

    <div className={css.TotalPriceInfo}>{basketContext.t('totalPrice', { ns: 'order-history' })}:   {showItem === 0 ? orderHdrInfo.price : itemHdrData.price} $ </div>
    </> } 
  </div>
</Modal>

{/* ================================================= User info modal ===================================================================== */}
<Modal title={basketContext.t('userInfo', { ns: 'order-history' })} open={isModalUserInfo} footer={null} onCancel={handleCancelUser}>
  <div>
      {userSpin ? <Spin size="large" className={css.SpinUser}/> : 
      <div>  
    <div className={css.imgL}>
        <div className={css.ImageCss}> 
          <Image preview={false} alt="Obertech" src={userInfoS.img === "-" ? "/img/user.png" : "data:image/png;base64," + userInfoS.img } className={css.Img}/></div>
        <div className={css.Info}> 
        <div className={css.TitleInfo}>
            <div className={css.TitleChild}>{basketContext.t('fullName', { ns: 'order-history' })} : </div>
            <div className={css.TitleChild}>{basketContext.t('email', { ns: 'order-history' })} : </div>
            <div className={css.TitleChild}>{basketContext.t('jobTitle', { ns: 'order-history' })} : </div>
            <div className={css.TitleChild}>{basketContext.t('phone', { ns: 'order-history' })} : </div>
            <div className={css.TitleChild}>{basketContext.t('address', { ns: 'order-history' })} : </div>
        </div>
        <div className={css.Description}>
            <div className={css.TitleChild2}>{userInfoS.lastname}  {userInfo.userInfoS}</div>
            <div className={css.TitleChild2}>{userInfoS.email} </div>
            <div className={css.TitleChild2}>{userInfoS.jobtitle}</div>
            <div className={css.TitleChild2}>{userInfoS.phone}</div>
            <div className={css.TitleChild2}>{userInfoS.address} </div>
        </div>
        </div>
    </div> 
      </div>
      }
  </div>
</Modal>

{/* ------------------------------end--------------------------------------------------------------------- */}
<div style={{marginBottom: "10px"}}>
  <RangePicker size="small" showToday defaultValue={[ moment(todayDateState, dateFormat), moment(todayDateState, dateFormat)]} format={dateFormat} onChange={dateOnchange}/>
  <Button onClick={searchDate} size="small" icon={<SearchOutlined/>}></Button>
</div>

{orderHdr === null? <Empty style={{display: "flex", justifyContent: "center" }}  description="null"/> :
  <div className={css.TableScroll}><Table size="small" columns={columns} dataSource={data} loading={loading} scroll={{x:  400, y: 600 }} /></div> 
} 
</div>: loadingPage ? <Spin className={css.SpinCss}/> : <Empty />} 
</>
: <Empty />}
</>
}
</BaseLayout>
);
};
export default OrderHistory;
