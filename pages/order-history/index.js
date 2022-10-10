import React, { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { CaretRightOutlined } from "@ant-design/icons";
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
  const [orderItem, setOrderItem] = useState({});
  const [orderItemDate, setOrderItemDate] = useState([]);
  const [orderItemAll, setOrderItemAll] = useState({
    cnt: 4,
    date: "2022-08-25",
    description: "itemssss",
    gbm: null,
    insentStatus: 0,
    itemId: null,
    orderId: "220825160150774292",
    orgId: "obertech123",
    paymentMethod: 0,
    pkId: "220825160150785810",
    price: 5555,
    quantity: 6666,
    state: null,
    title: "items",
    userPkid: "220718193632596123",
  });

  const [orderItemDateAll, setOrderItemDateAll] = useState([]);
  const [spinState, setSpinState] = useState(true);
  const [localStorageAdmin, setLocalStorageAdmin] = useState();
  const [localStoragePkId, setLocalStoragePkId] = useState();
  const [totalPriceState, setTotalPriceState] = useState([]);
  const [totalPriceStateUser, setTotalPriceStateUser] = useState([]);
  const [insentive, setInsentive] = useState([]);
  const [orderSpin, setOrderSpin] = useState(true);
  const basketContext = useContext(BasketContext);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [loading, setLoading]= useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [orderHdr, setOrderHdr]= useState([{
    key: 1,
    orderid: 0,
    date: 0,
    organization: 0,
    status: 0,
    price: 0, 
    invoice: 0,
    paymethod: 0
  },{
    key: 2,
    orderid: 0,
    date: 0,
    organization: 0,
    status: 0,
    price: 0, 
    invoice: 0,
    paymethod: 0
  }]);
  const [modalOrderItem, setModalOrderItem] = useState([]);
  // const [dateState, setDateState] = useState("2022-09-01");
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iDIndex, setIdIndex] = useState();
  const [gItemDetails, setGitemDetails] = useState([]);
  useEffect(() => {
    basketContext.basketStateFunc();
    basketContext.MenuKey();
    setOrderItem({ amraa: "aaa", bataa: "bbb" });
    localStorageFunction();
    
    console.log("today",basketContext.todayDateState);
    getOders();
    // orderHistoryItem();
    // orderHistoryAll();
    // getPayInsentive();
    
  }, []);
  const showModal = (a) => {
    console.log("Item: ",a );
    const body = {
      func:"getOrderItems", 
      orderid: a,
    }
    axios.post("/api/post/Gate", body).then((res)=>{
      console.log("item order: ", res.data.data);
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
    const body = {}
    console.log("profile", basketContext.userInfoProfile);
    if(basketContext.userInfoProfile.isSuperAdmin === 0){
      body = {
      func:"getOrderUserID",
      d1: basketContext.todayDateState,
      d2: basketContext.todayDateState,
      pkId: localStorage.getItem("pkId")
    }
  }else {
    body = {
      func:"getOrders",
      d1: basketContext.todayDateState,
      d2: basketContext.todayDateState, 
    }
  } 

    axios.post("/api/post/Gate", body).then((res)=>{
      setLoading(false);
      console.log("res: ", res);
      setOrderHdr(res.data.data);
    }).catch((err)=>{
      console.log("err: ", err);
    })
  }
  // user orderHistory
  const orderHistoryItem = () => {
    setSpinState(true);
    const body = {
      userPkid: localStorage.getItem("pkId"),
    };
    axios
      .post("/api/post/orderHistory/getUserTokenOrder", body)
      .then((res) => {
        setSpinState(false);
        setTotalPriceStateUser([]);
        for (var key in res.data) {
          let listSumUser = [];
          res.data[key].forEach((element) => {
            // console.log("element ==> ", element);
            let sumUser = 0;
            element.forEach((aaa, i) => {
              // console.log("====> admin element:  ", aaa.price);
              // console.log("====> admin cnt:  ", aaa.cnt);
              sumUser += aaa.cnt * aaa.price;
            });
            // console.log("Niit vne: ", sum);
            listSumUser.push(sumUser);
          });
          setTotalPriceStateUser((totalPriceStateUser) => [
            ...totalPriceStateUser,
            { sumUser: listSumUser },
          ]);
          setOrderItemDate((orderItemDate) => [...orderItemDate, key]);
        }
        setOrderItem(res.data);
        setOrderSpin(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const localStorageFunction = () => {
    setLocalStorageAdmin(localStorage.getItem("isSuperAdmin"));
    setLocalStoragePkId(localStorage.getItem("pkId"));
  };
  // admin orderHistory
  const orderHistoryAll = () => {
    setSpinState(true);
    if (
      localStorage.getItem("isSuperAdmin") === "1" ||
      localStorage.getItem("isSuperAdmin") === "2"
    ) {
      axios
        .post("/api/post/orderHistory/getOrder")
        .then((res) => {
          setSpinState(false);
          setTotalPriceState([]);
          for (var key in res.data) {
            let listSum = [];
            res.data[key].forEach((element) => {
              let sum = 0;
              element.forEach((aaa, i) => {
                sum += aaa.cnt * aaa.price;
              });
              listSum.push(sum);
            });
            setTotalPriceState((totalPriceState) => [
              ...totalPriceState,
              { sum: listSum },
            ]);
            setOrderItemDateAll((orderItemDateAll) => [
              ...orderItemDateAll,
              key,
            ]);
            setOrderItemAll(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("null admin");
    }
  };
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
  const info = (items) => {
    Modal.info({
      title: "This is group items",
      content: (
        <div className={css.ItemScroll}>
          {items.map((e, index) => (
            <div className={css.BasketItem2} key={index}>
              <div className={css.Zurag2}>
                <Image
                  alt="Obertech"
                  preview={false}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
                />
              </div>
              <div className={css.Descrip2}>
                <div className={css.Title2}>
                  <div className={css.ItemTitle2}>{e.itemTitle}</div>
                </div>
                <div className={css.Price2}>
                  <div> Qty: {e.itemCnt}</div>
                  <div> {e.itemPriceD}$</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),

      onOk() {},
    });
  };
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
 
const detailsItem = (a) =>{
  console.log("object",a);
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
        <Button onClick={()=>showModal (record.orderid)} size={"small"} type="dashed" shape="round">Show item</Button> 
    
      </Space>
    ),
  },
  {
    title: 'Invoice', 
    key: 'invoice',
    render: (_, record) => (
      <Space size="middle">
        <Invoice orderId={record.orderid}/>
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
      <div>
        <div className={css.OrderTitle}>
          <Divider orientation="left"> Order history</Divider>
        </div>
        <Modal title="Items info" visible={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
          <div>
            {modalOrderItem.map((e, i)=>(
              <div key={i} className={css.OrderItem}>
                <div className={css.orderImg}>
                  {e.img === "" ? <div className={css.GroupItemcs}>Group item</div> : 
                  <Image
                        alt="Obertech"
                        preview={false} 
                        src={"data:image/png;base64," + e.img }
                    />
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
                      <Button onClick={()=>groupDeitalsFunc(e, i)} size="small" shape="round" type="dashed" style={{fontWeight: "500", color: "rgb(6 78 59)"}}>group details: </Button> 
                    </div>}
                   
                    <div className={css.Pricecss}>{e.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
                  </div>
                  {iDIndex === i ?
                    <div className={css.OrderDetailsHide}> 
                      {gItemDetails.map((item, index)=>(
                        <div key={index} className={css.OrderItem}>
                          <div className={css.orderImg2}> 
                            <Image
                                  alt="Obertech"
                                  preview={false} 
                                  src={"data:image/png;base64," + item.img }
                              /> 
                          </div>
                          <div className={css.orderDetailcss}>
                          <div className={css.Titlecss}> 
                            <div className={css.OrderCnt}>
                              <div>{item.title}</div>
                              <div className={css.CntCss}>{item.itemCnt}</div>
                            </div>
                            <div className={css.DescriptionCss}>desc: {item.description}</div>
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
        </Modal>
            {/* ------------------------------end--------------------------------------------------------------------- */}
        {spinState === false ? (
          <div>
            <Spin className={css.SpinCss} tip="Loading..." size="large"></Spin>
          </div>
        ) : (
          <div className={css.OrderScroll}>
            <Collapse
              bordered={false}
              // defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              {localStorageAdmin === "1" || localStorageAdmin === "2" ? (
                <>
                  {/* admin show userHistory */}
                  {orderItemDateAll[0] ? (
                    <>
                      {orderItemDateAll.map((e, k) => (
                        <Panel
                          header={e}
                          className="site-collapse-custom-panel"
                          key={k}
                        >
                          <div className={css.ScrollHistory}>
                            {orderSpin === true && orderItemAll.length < 1 ? (
                              "hoosn"
                            ) : (
                              <>
                                {orderItemAll[e]?.map((dd, i) => (
                                  <div className={css.BasketItem} key={i}>
                                    <div className={css.BasketId}>
                                      <div className={css.OrgIdCss}>
                                        {" "}
                                        Organization Id: {dd[0].orgId}{" "}
                                      </div>
                                      <div>
                                        {/* {console.log("userPkid------------> ", dd[i])} */}
                                      </div>
                                    </div>
                                    {dd.map((e, i) => (
                                      <div key={i}>
                                        <div className={css.ItemCont}>
                                          {/* <div> Order ID: {e.orderId}</div> */}
                                          <div className={css.Zurag}>
                                            <Image
                                              alt="Obertech"
                                              preview={false}
                                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
                                            />
                                          </div>
                                          <div className={css.Descrip}>
                                            <div className={css.Title}>
                                              <div>{e.title}</div>
                                              <div style={{ display: "flex" }}>
                                                {" "}
                                                {e.userPkid === null ? (
                                                  ""
                                                ) : (
                                                  <UserOutlined
                                                    style={{
                                                      color: "red",
                                                      fontSize: "16px",
                                                    }}
                                                  />
                                                )}
                                              </div>
                                            </div>
                                            <div className={css.Price}>
                                              <div> Qty: {e.cnt}</div>
                                              {e.gbm === null ? (
                                                ""
                                              ) : (
                                                <Button
                                                  type="dashed"
                                                  shape="round"
                                                  size="small"
                                                  onClick={() => info(e.gbm)}
                                                >
                                                  Items
                                                </Button>
                                              )}
                                              <div>
                                                {" "}
                                                {e.price === 0
                                                  ? ""
                                                  : e.price
                                                      .toFixed(1)
                                                      .replace(
                                                        /\d(?=(\d{3})+\.)/g,
                                                        "$&,"
                                                      )}{" "}
                                                {e.groupTotalPrice}$
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    <div className={css.TotalPriceCss}>
                                      Total price:{" "}
                                      <span style={{ fontWeight: "bold" }}>
                                        {" "}
                                        {totalPriceState.length > 0
                                          ? totalPriceState[k]["sum"]
                                            ? totalPriceState[k].sum[i]
                                                .toFixed(1)
                                                .replace(
                                                  /\d(?=(\d{3})+\.)/g,
                                                  "$&,"
                                                )
                                            : null
                                          : null}
                                        $
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </Panel>
                      ))}
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <Empty />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* user history */}
                  {localStoragePkId ? (
                    <>
                      {orderItemDate[0] ? (
                        <>
                          {orderItemDate?.map((e, k) => (
                            <Panel
                              header={e}
                              className="site-collapse-custom-panel"
                              key={k}
                            >
                              <div className={css.ScrollHistory}>
                                {orderItem[e]?.map((dd, i) => (
                                  <div className={css.BasketItem} key={i}>
                                    <div className={css.BasketId}>
                                      <div className={css.OrgIdCss}>
                                        {" "}
                                        Organization Id: {dd[0].orgId}{" "}
                                      </div>
                                    </div>
                                    {dd.map((e, i) => (
                                      <div key={i} className={css.ItemCont}>
                                        <div className={css.Zurag}>
                                          <Image
                                            alt="Obertech"
                                            preview={false}
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
                                          />
                                        </div>
                                        <div className={css.Descrip}>
                                          <div className={css.Title}>
                                            <div>{e.title}</div>
                                            <div></div>
                                          </div>
                                          <div className={css.Price}>
                                            <div> Qty: {e.cnt}</div>
                                            <div>
                                              {e.gbm === null ? (
                                                ""
                                              ) : (
                                                <Button
                                                  type="dashed"
                                                  shape="round"
                                                  size="small"
                                                  onClick={() => info(e.gbm)}
                                                >
                                                  Items
                                                </Button>
                                              )}
                                            </div>
                                            <div>
                                              {e.price === 0 ? "" : e.price}
                                              {e.groupTotalPrice}$
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    <div className={css.TotalPriceCss}>
                                      Total price:
                                      <span style={{ fontWeight: "bold" }}>
                                        {totalPriceStateUser.length > 0
                                          ? totalPriceStateUser[k]["sumUser"]
                                            ? totalPriceStateUser[k].sumUser[i]
                                                .toFixed(1)
                                                .replace(
                                                  /\d(?=(\d{3})+\.)/g,
                                                  "$&,"
                                                )
                                            : null
                                          : null}
                                        $
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Panel>
                          ))}
                        </>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                     ""
                    </div>
                  )}</>
              )}
            </Collapse>
          </div>
        )}
        {/* ------------------------------end--------------------------------------------------------------------- */}
          <div style={{marginBottom: "10px"}}>
            <RangePicker 
                  showToday
                  defaultValue={[
                    moment(basketContext.todayDateState, dateFormat),
                    moment(basketContext.todayDateState, dateFormat),
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
    </BaseLayout>
  );
};
export default OrderHistory;
