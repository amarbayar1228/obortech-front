 
import BaseLayout from "../../components/Layout/BaseLayout"
import { Badge, Button, DatePicker, Image, Input, message, Select, Space, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {SearchOutlined ,CheckOutlined, ExclamationCircleOutlined, RedoOutlined, ClearOutlined, StarOutlined,SolutionOutlined, FundViewOutlined,DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import css from "./style.module.css" 
import moment from "moment"; 
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const QpayList = () =>{
const [itemData, setItemData] = useState([]);
const [loading, setLoading] = useState(false);
const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
const [spinner, setSpinner] = useState(false) 
const [filteredInfo, setFilteredInfo] = useState({});
const [sortedInfo, setSortedInfo] = useState({});
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');   
const [typeLevel, setType] = useState(null);
const [selectLevel, setSelectLevel] = useState(-1); 
const searchInput = useRef(null); 
const [paymentListData, setPaymentListData] = useState([]);
const [date, setDate] = useState(null); 
const [status, setStatus] = useState(-1);


useEffect(()=>{
    setLoading(true)
    if(localStorage.getItem("QpZfhg")){
        const headers = { 
            'Authorization': "Bearer " + localStorage.getItem("QpZfhg"),
        };  
        const body = {
            object_type:"INVOICE",
            object_id:"SMARTHUB_ECOSYS_INVOICE",
            start_date: "2023-01-01 00:00:01",
            end_date: "2029-05-06 23:59:59",
                offset : {
                page_number: 1,
                page_limit : 10
            }
        }
        axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
            console.log("payment list:", res.data );
            setTableParams({
                ...tableParams,
                pagination: {
                  ...tableParams.pagination,
                  total: 80,
                  // 200 is mock data, you should read it from server
                  // total: data.totalCount,
                },
              });
            setPaymentListData(res.data.rows);
            setLoading(false);
        }).catch((err)=>{
            console.log("err");
        })
    }else {
        // Qpay tulult
        const body = {
            login: "login"
        }
        axios.post("/api/qpay/post/token", body).then((res)=>{
        console.log("login Token: ", res.data);
        localStorage.setItem("QpZfhg", res.data.access_token)
        // setCheckToken(res.data.access_token);
            const headers = { 
                'Authorization': "Bearer " + res.data.access_token,
            };  
            const body = {
                object_type:"INVOICE",
                object_id:"SMARTHUB_ECOSYS_INVOICE",
                start_date: "2023-01-01 00:00:01",
                end_date: "2029-05-06 23:59:59",
                    offset : {
                    page_number: 1,
                    page_limit : 1000
                }
            }
            axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
                console.log("payment list:", res.data );
            }).catch((err)=>{
                console.log("err");
            })
        }).catch((err)=>{
        console.log("err", err);
        });
    }


},[]);
const getItems = () => { 
    setDate(null)
    setLoading(true)
    if(localStorage.getItem("QpZfhg")){
        const headers = { 
            'Authorization': "Bearer " + localStorage.getItem("QpZfhg"),
        };  
        const body = {
            object_type:"INVOICE",
            object_id:"SMARTHUB_ECOSYS_INVOICE",
            start_date: "2023-01-01 00:00:01",
            end_date: "2029-05-06 23:59:59",
                offset : {
                page_number: 1,
                page_limit : 10,
            }
        }
        axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
            console.log("payment list:", res.data );
            setTableParams({
                ...tableParams,
                pagination: {
                  pagination: {
                    current: 1,
                    pageSize: 10
                  },
                  total: 80,
                },
              });
            setPaymentListData(res.data.rows);
            setLoading(false);
        }).catch((err)=>{
            console.log("err");
        })
    }else {
        // Qpay tulult
        const body = {
            login: "login"
        }
        axios.post("/api/qpay/post/token", body).then((res)=>{
        console.log("login Token: ", res.data);
        localStorage.setItem("QpZfhg", res.data.access_token)
        // setCheckToken(res.data.access_token);
            const headers = { 
                'Authorization': "Bearer " + res.data.access_token,
            };  
            const body = {
                object_type:"INVOICE",
                object_id:"SMARTHUB_ECOSYS_INVOICE",
                start_date: "2023-01-01 00:00:01",
                end_date: "2029-05-06 23:59:59",
                    offset : {
                    page_number: pagination.current,
                    page_limit : 1000
                }
            }
            axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
                console.log("payment list:", res.data );
                setTableParams({
                    ...tableParams,
                    pagination: {
                      pagination: {
                        current: pagination.current,
                        pageSize: 10
                      },
                      total: 50, 
                    },
                  });
                setPaymentListData(res.data.rows);
                setLoading(false);
            }).catch((err)=>{
                console.log("err");
            })
        }).catch((err)=>{
        console.log("err", err);
        });
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
    <div style={{padding: 5,}}>
    <Input ref={searchInput}placeholder={`Search ${dataIndex}`} value={selectedKeys[0]} 
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{marginBottom: 8,display: 'block' }}/>
    <Space>
        <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{width: 90,}}>Search</Button>
        <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{width: 90,}}>Reset</Button>
        {/* <Button type="link" size="small"  onClick={() => {confirm({ closeDropdown: false, }); setSearchText(selectedKeys[0]); setSearchedColumn(dataIndex);}}>Filter</Button> */}
    </Space>
    </div>
),
filterIcon: (filtered) => (<SearchOutlined style={{color: filtered ? '#1890ff' : undefined,}}/>),
onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
onFilterDropdownOpenChange: (visible) => {
    if (visible) {
    setTimeout(() => searchInput.current?.select(), 100);
    }
},
render: (text) =>
    searchedColumn === dataIndex ? (
    <Highlighter highlightStyle={{backgroundColor: '#ffc069',padding: 0,}} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''}
    />
    ) : (text),
});
const clearAll = () => {
    setSearchText('');
    setFilteredInfo({});
    setSortedInfo({});
  };

const handleChangeTable = (pagination, filters, sorter) => {
    // console.log("current", pagination );
    // console.log("filters", filters );
    // console.log("sorter", sorter );
    setTableParams({
        pagination,
        filters,
        ...sorter,
        });
    setLoading(true)
// setSpinner(true);  

    if(localStorage.getItem("QpZfhg")){
        const headers = { 
            'Authorization': "Bearer " + localStorage.getItem("QpZfhg"),
        };  
        const body = {
            object_type:"INVOICE",
            object_id:"SMARTHUB_ECOSYS_INVOICE",
            start_date: date ? "2023-01-01 00:00:01" : date[0] + " 00:00:01",
            end_date: date ? "2029-05-06 23:59:59" : date[1] + " 23:59:59",
                offset : {
                page_number: pagination.current,
                page_limit : pagination.pageSize
            }
        }
        axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
            console.log("payment list:", res.data );
            setTableParams({
                ...tableParams,
                pagination: {
                  pagination: {
                    current: pagination.current,
                    pageSize: pagination.pageSize
                  },
                  total: 80,
                },
              });
            setPaymentListData(res.data.rows);
            setLoading(false);
        }).catch((err)=>{
            console.log("err");
        })
    }else {
        // Qpay tulult
        const body = {
            login: "login"
        }
        axios.post("/api/qpay/post/token", body).then((res)=>{
        console.log("login Token: ", res.data);
        localStorage.setItem("QpZfhg", res.data.access_token)
        // setCheckToken(res.data.access_token);
            const headers = { 
                'Authorization': "Bearer " + res.data.access_token,
            };  
            const body = {
                object_type:"INVOICE",
                object_id:"SMARTHUB_ECOSYS_INVOICE",
                start_date: "2023-01-01 00:00:01",
                end_date: "2029-05-06 23:59:59",
                    offset : {
                    page_number: pagination.current,
                    page_limit : 1000
                }
            }
            axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
                console.log("payment list:", res.data );
                setTableParams({
                    ...tableParams,
                    pagination: {
                      pagination: {
                        current: pagination.current,
                        pageSize: 10
                      },
                      total: 50, 
                    },
                  });
                setPaymentListData(res.data.rows);
                setLoading(false);
            }).catch((err)=>{
                console.log("err");
            })
        }).catch((err)=>{
        console.log("err", err);
        });
    }
 
setFilteredInfo(filters);
setSortedInfo(sorter);
};
const data = paymentListData ? paymentListData.map((r, i)=>(
    {
      key: i,
      date: r.payment_date,
      paymentId: r.payment_id,
      paymentFee: r.payment_fee,
      paymentAmount: r.payment_amount,
      paymentStatus: r.payment_status,
      state: r, 
      action: r
    } 
)) : [{
    key: 1,
    date: "",
    paymentId: "",
    paymentFee: "",
    description: "",
    paymentStatus:"",
    state: r, 
    action: r
}];
const columns = [
    {
    title: <div className={css.TableTitle}>Date</div>,   
    dataIndex: 'date',
    key: 'date', 
    width: 120,
    fixed: 'left', 
    // ...getColumnSearchProps('date'), 
    // filteredValue: filteredInfo.date || null,
    // onFilter: (value, record) => record.date.includes(value),
    sorter: (a, b) =>  new Date(a.date) - new Date(b.date),
    // sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null, 
    ellipsis: true,
    }, 
   
    {
    title: <div className={css.TableTitle}>Payment Id</div>,
    dataIndex: 'paymentId',
    key: 'paymentId', 
    // width: 120,
    ...getColumnSearchProps('description'), 
    filteredValue: filteredInfo.description || null,
    onFilter: (value, record) => record.description.includes(value),
    // sorter: (a, b) => a.lastname.length - b.lastname.length,
    sortOrder: sortedInfo.columnKey === 'description' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {
    title: <div className={css.TableTitle}>Amount</div>, 
    dataIndex: 'paymentAmount',
    key: 'paymentAmount', 
    // width: 120,
    // ...getColumnSearchProps('description'), 
    filteredValue: filteredInfo.price || null,
    onFilter: (value, record) => record.price.includes(value),
    sorter: (a, b) => a.price - b.price,
    sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
    ellipsis: true,
    render: (a) =><div>{a} ₮</div>
    },
    {
        title: <div className={css.TableTitle}>Fee</div>,
        dataIndex: 'paymentFee',
        key: 'paymentFee', 
        // width: 120,
        ...getColumnSearchProps('others'), 
        filteredValue: filteredInfo.others || null,
        onFilter: (value, record) => record.others.includes(value),
        sorter: (a, b) => a.others.length - b.others.length,
        sortOrder: sortedInfo.columnKey === 'others' ? sortedInfo.order : null,
        ellipsis: true,
    }, 
    {
    title: <div className={css.TableTitle}>Status</div>,
    dataIndex: 'paymentStatus',
    key: 'paymentStatus', 
    fixed: "right",
    width: 90,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div>
        {a === "PAID" ? (<Tooltip title="Active"><Badge status="success" text="PAID" style={{color: "#349f3c"}}/></Tooltip>) :
        (<Tooltip title="Active"><Badge status="error" text="Error" style={{color: "#349f3c"}}/></Tooltip>)
        }
        
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state.status - b.state.status, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    }, 

    {title: <div className={css.TableTitle}>Action</div>,   key: 'action', fixed: 'right', width: 140,
    render: (b) => <div className={css.ActionCss}>
         <div style={{display: "flex"}}>   
          show item
        </div>   
    </div>,
    },
];
const dateOnchange = (a,b) =>{
    console.log("onchange", a);
     
if(a === null){
setDate(null);
}else {
    const date1 = [];
b.forEach(element => { 
    date1.push(element); 
});
setDate(date1);  
}


} 
const searchDate = () =>{
    console.log("search");
setLoading(true); 
 if(date){
    if(localStorage.getItem("QpZfhg")){
        const headers = { 
            'Authorization': "Bearer " + localStorage.getItem("QpZfhg"),
        };  
        const body = {
            object_type:"INVOICE",
            object_id:"SMARTHUB_ECOSYS_INVOICE",
            start_date: date[0] + " 00:00:01",
            end_date: date[1]+ " 23:59:59",
                offset : {
                page_number: 1,
                page_limit : 10,
            }
        }
        axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
            console.log("payment list:", res.data );
            setTableParams({
                ...tableParams,
                pagination: {
                  pagination: {
                    current: 1,
                    pageSize: 10
                  },
                  total: 80,
                },
              });
            setPaymentListData(res.data.rows);
            setLoading(false);
        }).catch((err)=>{
            console.log("err");
        })
    }else {
        // Qpay tulult
        const body = {
            login: "login"
        }
        axios.post("/api/qpay/post/token", body).then((res)=>{
        console.log("login Token: ", res.data);
        localStorage.setItem("QpZfhg", res.data.access_token)
        // setCheckToken(res.data.access_token);
            const headers = { 
                'Authorization': "Bearer " + res.data.access_token,
            };  
            const body = {
                object_type:"INVOICE",
                object_id:"SMARTHUB_ECOSYS_INVOICE",
                start_date: "2023-01-01 00:00:01",
                end_date: "2029-05-06 23:59:59",
                    offset : {
                    page_number: pagination.current,
                    page_limit : 1000
                }
            }
            axios.post("/api/qpay/paymentList/list", body, {headers: headers}).then((res)=>{
                console.log("payment list:", res.data );
                setTableParams({
                    ...tableParams,
                    pagination: {
                      pagination: {
                        current: pagination.current,
                        pageSize: 10
                      },
                      total: 50, 
                    },
                  });
                setPaymentListData(res.data.rows);
                setLoading(false);
            }).catch((err)=>{
                console.log("err");
            })
        }).catch((err)=>{
        console.log("err", err);
        });
    }

}else {
    getItems();
}
}
 
  const dateEmpty = (a) => {
    console.log("delete", a);
  }
    return<BaseLayout pageName="qpay-list">
        <div>
            <div className={css.StateCss}> <div className={css.ClearTable}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Table sort clear</Button></div>
        </div>
        <div style={{marginBottom: "5px"}}>
        <Button onClick={getItems}><RedoOutlined rotate={280} /></Button>
        <RangePicker showToday  format={dateFormat} onChange={dateOnchange}  value={date ? [moment(date[0], dateFormat), moment(date[1], dateFormat)] : null}/>
        {/* <Select value={status} style={{width: 120}} onChange={selectStatus} 
            options={[
            {value: -1, label: <div>All</div>},
            {value: 1, label: <div style={{color: "green"}}>Active </div>},
            {value: 0, label: 'Invisible'}, 
            {value: 2,label: <div style={{color: "red"}}>Disable </div>,}]}/>
        <Select value={selectLevel} style={{width: 120}} onChange={selectLevelF} 
            options={[
            {value: -1, label: <div>All</div>},
            {value: 1, label: <div>Subscribtion</div>},
            {value: 2, label: <div>Device 6</div>},
            {value: 3, label: 'Device 12'}, 
            {value: 4,label: <div>Items </div>,}]}/> */}
        <Button onClick={searchDate}  type="primary"><SearchOutlined shape="#000" /></Button>
        </div>
            <Table bordered size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={loading}  scroll={{x:  1000, y: 600 }} pagination={tableParams.pagination} />
        </div>
    </BaseLayout>
}
export default QpayList;