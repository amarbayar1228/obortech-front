import React, { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { CaretRightOutlined,CaretDownOutlined } from "@ant-design/icons";
import {Button, Collapse, Divider, Empty, Image, Modal, Spin, Space, DatePicker, Table, Tag, Input} from "antd";
import css from "./style.module.css";
import { UserOutlined,SearchOutlined  } from "@ant-design/icons";
import axios from "axios";
import BasketContext from "../../context/basketContext/BasketContext";
import moment from "moment"; 
import Highlighter from 'react-highlight-words';
import Invoice from "../../components/OrderHistory/Invoice";
const { Panel } = Collapse;
const OrderHistory = () => { 
  const basketContext = useContext(BasketContext);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [loading, setLoading]= useState(false);
  const [loadingPage, setLoadingPage]= useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [orderHdr, setOrderHdr]= useState([{key: 1,orderid: 0,date: 0,organization: 0,status: 0,price: 0, invoice: 0,paymethod: 0
  },{key: 2,orderid: 0,date: 0,organization: 0,status: 0,price: 0, invoice: 0,paymethod: 0
  }]);
  const [modalOrderItem, setModalOrderItem] = useState([]);
  // const [dateState, setDateState] = useState("2022-09-01");
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iDIndex, setIdIndex] = useState();
  const [gItemDetails, setGitemDetails] = useState([]);
  const [todayDateState,setTodayDateState] = useState("2022-09-12");
  const [orderNull, setOrderNull] = useState(0);
  const [orderHdrInfo, setOrderHdrInfo] = useState("");
  useEffect(() => {  
    getOders();  
  }, []); 
  const showModal = (a) => {
    console.log("show item dialog");

    console.log("Item: ", a );
    setOrderHdrInfo(a);
    const body = {
      func:"getOrderItems", 
      orderid: a.orderid,
    }
    axios.post("/api/post/Gate", body).then((res)=>{
      // console.log("item order: ", res.data.data);
      setModalOrderItem(res.data.data);
    }).catch((err)=>{
      console.log("err: ", err);
    })
    setIsModalOpen(true);
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
      const body = {
        func: "getUserInfo",
        pkId: localStorage.getItem("pkId"),
      };
      axios
        .post("/api/post/Gate", body)
        .then((res) => {  
          setTodayDateState("2022-10-10");
            console.log("res: ", res.data.data);
            if(res.data.data.isSuperAdmin == 1 || res.data.data.isSuperAdmin == 2 ){
              const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12",];
              var date = new Date();
              var d1 =  date.getFullYear() + "-" + mounths[date.getMonth()] + "-" + date.getDate() + "";   
              setTodayDateState(d1);
              console.log("d1", d1);
             const body2 = { 
                func:"getOrders", 
                d1: d1,
                d2: d1, 
              } 
              axios.post("/api/post/Gate", body2).then((res)=>{
                setOrderNull(1); 
                setLoadingPage(false)
                setLoading(false); 
                setOrderHdr(res.data.data);
              }).catch((err)=>{
                console.log("err: ", err);
              })
              }else if(res.data.data.isSuperAdmin == 0){
                const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12",];
                var date = new Date();
                var d1 =  date.getFullYear() + "-" + mounths[date.getMonth()] + "-" + date.getDate() + "";  
                setTodayDateState(d1);
                const bodyUser = {
                      func:"getOrderUserID",
                      d1: d1,
                      d2: d1,
                      pkId: localStorage.getItem("pkId")
                    }
                    axios.post("/api/post/Gate", bodyUser).then((res)=>{
                      setOrderNull(1); 
                      setLoadingPage(false)
                      setLoading(false); 

                      setOrderHdr(res.data.data);
                    }).catch((err)=>{
                      console.log("err: ", err);
                    })  
              } 
        })
        .catch((err) => {
          console.log(err);
        });
    } else {  
      setOrderNull(0);
      setLoadingPage(false)
      setLoading(false); 
    }
    // console.log("profile", basketContext.userInfoProfile);
  //   if(basketContext.userInfoProfile.isSuperAdmin === 0){
  //     body = {
  //     func:"getOrderUserID",
  //     d1: basketContext.todayDateState,
  //     d2: basketContext.todayDateState,
  //     pkId: localStorage.getItem("pkId")
  //   }
  // }else {
    // body = {
    //   func:"getOrders",
    //   // d1: basketContext.todayDateState,
    //   // d2: basketContext.todayDateState, 
    //   d1: "2022-09-13",
    //   d2: "2022-10-12", 
    // }
  // } 

    // axios.post("/api/post/Gate", body).then((res)=>{
    //   setLoading(false); 
    //   setOrderHdr(res.data.data);
    // }).catch((err)=>{
    //   console.log("err: ", err);
    // }) 
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
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
   
const dateOnchange = (a,b) =>{
  console.log("date 1: ",b[0]);
  console.log("date 2: ",b[1]);
  setDate1(b[0]);
  setDate2(b[1]);
}
const searchDate = () =>{
  setLoading(true);
  console.log("date1: ",date1);
  console.log("date2: ",date2); 
 const body = {}
 if(basketContext.userInfoProfile.isSuperAdmin === 0){
    body = {
    func:"getOrderUserID",
    d1: date1,
    d2: date2,
    pkId: localStorage.getItem("pkId")
  }
}else {
  body = {
    func:"getOrders",
    d1: date1,
    d2: date2,
  }
}  
  axios.post("/api/post/Gate", body).then((res)=>{ 
    console.log("res date change: ", res.data.data);
    if(res.data.data[0]){
        setLoading(false)
        setOrderHdr(res.data.data);
      }else {
        console.log("hooson");
        setLoading(false)
        setOrderHdr(res.data.data);
      }
   
  }).catch((err)=>{
    console.log("err: ", err);
  })
}
  
const columns = [
  {
    title: <span>Order id</span>,
    dataIndex: 'orderid',
    key: 'orderid',
    render: (text) => <a>{text}</a>,
    ...getColumnSearchProps('orderid'),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date', 
  },
  {
    title: 'Organization id',
    dataIndex: 'organization',
    key: 'organization',
    render: (text) => <a>{text}</a>,
    ...getColumnSearchProps('organization'),
  },
  {
    title: 'Total price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Items',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={()=>showModal (record)} size={"small"} type="dashed" shape="round">Show item</Button> 
    
      </Space>
    ),
  },
  {
    title: 'Invoice', 
    key: 'invoice',
    render: (_, record) => (
      <Space size="middle">
        <Invoice orderId={record} />
        {/* <Button type="dashed" size="small" onClick={()=>detailsItem(record.orderid)}>Invoice</Button>  */}
      </Space>
    ),
  },
  {
    title: 'Paymethod',
    dataIndex: 'paymethod',
    key: 'paymethod',
  },
  {
    title: 'Status', 
    key: 'status',
    render: (_, tag) => (
      <Tag color="blue" key={tag}>
          {tag.status === 0 ? "Pending" : "1"}
        </Tag>
    ),
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
      paymethod: "1"
    } 
));
const groupDeitalsFunc = (data, index) =>{
  console.log("data: ", data.pkId);
  console.log("index: ", index);
  const body = {
    func: "getGroups",
    pkId: data.pkId,
  };
  axios
    .post("/api/post/Gate", body)
    .then((res) => {
      console.log("res details:  ", res.data.data.itemList); 
      if (res.data.data.itemList == undefined) {
        console.log("hoosn");
      } else { 
        setGitemDetails(res.data.data.itemList); 
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
  setIdIndex(index);
}
  return (
    <BaseLayout pageName="order-history"> 
      {orderNull === 1 ?
      <div>
       
        <div className={css.OrderTitle}>
          <Divider orientation="left"> Order history</Divider>
        </div>
        <Modal title="Items info" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
          <div>
            <div className={css.OrderHdrLaCss}>
              <div className={css.DateCss}>
                <div className={css.OrderIdCss}> Order ID: #{orderHdrInfo.orderid}</div>
                <div>  {orderHdrInfo.date}</div>
              </div>
              {/* <div>  
               <div className={css.ItemDetailCss}><CaretRightOutlined /> Item details</div>
              </div> */}

            </div>
            <div className={css.ItemInfoScroll}> 
              {modalOrderItem.map((e, i)=>(
                <div key={i} className={css.OrderItem}>
                  <div className={css.orderImg}>
                    {e.img === "" ? <div className={css.GroupItemcs}>G</div> : 
                    <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img }/>
                    }
                  </div>
                  <div className={css.orderDetailcss}>
                    <div className={css.Titlecss}>
                      {/* {e.img === ""? <div style={{height: "50px"}}>a </div> : ""} */}
                      <div className={css.OrderCnt}>
                        <div>{e.title}</div>
                        <div className={css.CntCss}>{e.cnt}</div>
                      </div>
                      <div className={css.DescriptionCss}>{e.description}</div>
                    </div>
                    <div className={css.TotalPricecc}> 
                    {e.state === 2 ? "" : 
                      <div>
                        <Button onClick={()=>groupDeitalsFunc(e, i)} size="small" shape="round" type="dashed" style={{fontWeight: "500", color: "rgb(6 78 59)"}}>Group details: </Button> 
                      </div>}
                    
                      <div className={css.Pricecss}>{e.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
                    </div>
                    {/* <div className={css.DetailAbsolute}> Details items: </div> */}
                    {iDIndex === i ?
                      <div className={css.OrderDetailsHide}> 
                      
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
                      </div>
                    : ""} 
                  </div>
                </div>
              ))}
            </div>

            <div className={css.TotalPriceInfo}>Total price: {orderHdrInfo.price}$ </div>
          </div>
        </Modal>
            {/* ------------------------------end--------------------------------------------------------------------- */}
      
        {/* ------------------------------end--------------------------------------------------------------------- */}
          <div style={{marginBottom: "10px"}}>
            <RangePicker showToday
                  defaultValue={[
                    moment(todayDateState, dateFormat),
                    moment(todayDateState, dateFormat),
                  ]}
                format={dateFormat}
                onChange={dateOnchange}/>
                <Button onClick={searchDate}>search</Button>
          </div>
         
          {orderHdr === null? <Empty style={{display: "flex", justifyContent: "center" }}  description="null"/> :
            <div style={{fontSize: "15px"}}>
            <Table columns={columns} dataSource={data} loading={loading}/>
            </div> 
          } 
      </div>
        : loadingPage ? <Spin className={css.SpinCss}/> : <Empty />} 
    </BaseLayout>
  );
};
export default OrderHistory;
