import { Badge, Button, DatePicker, Image, Input, message, Select, Space, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {SearchOutlined ,CheckOutlined, ExclamationCircleOutlined, RedoOutlined, ClearOutlined, StarOutlined,SolutionOutlined, FundViewOutlined,DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import css from "./style.module.css"
import StatusChangeModal from "../../StatusChangeModal";
import ItemEdit from "./ItemChild/ItemEdit";
import ItemDel from "./ItemChild/ItemDel";
import ItemAdd from "./ItemChild/ItemAdd";
import moment from "moment"; 
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const Item = (props) =>{
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

const [date, setDate] = useState(null); 
const [status, setStatus] = useState(-1);
useEffect(()=>{ 
    getItems();
},[]);

const getItems = () => { 
    setDate(null)
    setSpinner(true);
    const body = {
    func: "getItems",
    status: "0,1"
    };
    axios.post("/api/post/Gate", body).then((res) => { 
        // const date = res.data.getItems.list;  
        //   date.sort((a, b) => {
        //     return new Date(b.date_) - new Date(a.date_); // descending
        //   }) 
       

    setSpinner(false); 
    setItemData(res.data.getItems.list);
    }).catch((err) => {message.error(err)}); 

const itemLevel = {
func: "getTypes",
parid:0,
type_:2,
}
axios.post("/api/post/Gate", itemLevel).then((res)=>{ 
setType(res.data.data);
}).catch((err)=>{
    console.log("err",err);
})
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
// setSpinner(true); 
setTableParams({
    pagination,
    filters,
    ...sorter,
    });
// setPagiValue2(page);
// setPagiValue3(1);
// setSpinState(true);
// console.log("page: ", pagination.current +" pageSize: "+pagination.pageSize);
const resultPage = 0;   
if(pagination.current == 1){
    resultPage = 0; 
}else {
    resultPage = pagination.current - 1; 
} 
resultPage = resultPage * pagination.pageSize;    
setFilteredInfo(filters);
setSortedInfo(sorter);
};
const data = itemData ? itemData.map((r, i)=>(
    {
      key: i,
      date: r.date_,
      img: r.img,
      title: r.title.toLowerCase(),
      description: r.description.toLowerCase(),
      price: r.price,
      others: r.others.toLowerCase(),
      cnt: r.cnt,
      state: r, 
      action: r
    } 
)) : [{
    key: 1,
    date: "",
    img: "",
    title: "",
    description: "",
    price: "",
    others: "",
    cnt: "",
    state: "", 
    action: ""
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
    title:<div className={css.TableTitle}>Image</div>,  
    dataIndex: 'img',
    key: 'img', 
    fixed: "left",
    width: 70,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div> 
            <Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{display: "flex", width: "30px", margin:"0px auto"}}/>
    </div>, 
    ellipsis: true,
    }, 
    {
    title: <div className={css.TableTitle}>Item name</div>,
    dataIndex: 'title',
    key: 'title', 
    // width: 120,
    ...getColumnSearchProps('title'), 
    filteredValue: filteredInfo.title || null,
    onFilter: (value, record) => record.title.includes(value),
    // sorter: (a, b) => a.lastname.length - b.lastname.length,
    sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: <div className={css.TableTitle}>Desription</div>,
    dataIndex: 'description',
    key: 'description', 
    // width: 120,
    ...getColumnSearchProps('description'), 
    filteredValue: filteredInfo.description || null,
    onFilter: (value, record) => record.description.includes(value),
    // sorter: (a, b) => a.lastname.length - b.lastname.length,
    sortOrder: sortedInfo.columnKey === 'description' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {
    title: <div className={css.TableTitle}>Price</div>, 
    dataIndex: 'price',
    key: 'price', 
    // width: 120,
    // ...getColumnSearchProps('description'), 
    filteredValue: filteredInfo.price || null,
    onFilter: (value, record) => record.price.includes(value),
    sorter: (a, b) => a.price - b.price,
    sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
    ellipsis: true,
    render: (a) =><div>{a} $</div>
    },
    {
        title: <div className={css.TableTitle}>Others</div>,
        dataIndex: 'others',
        key: 'others', 
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
    dataIndex: 'state',
    key: 'state', 
    fixed: "right",
    width: 90,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div>

        {a.status == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#349f3c"}}/></Tooltip>) : 
        a.status == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d"}}/></Tooltip> : 
        a.status == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red"}}/></Tooltip>  : ""
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
         <StatusChangeModal addItemStatus={b.state} addItemGetItems={searchDate} />
         <ItemEdit addItemStatus={b.state}  searchDate={searchDate} typeLevel={typeLevel}/>
         <ItemDel addItemStatus={b.state} addItemGetItems={searchDate}/> 
        </div>   
    </div>,
    },
];
const dateOnchange = (a,b) =>{
    console.log("onchange", b);

const date1 = [];
b.forEach(element => { 
    date1.push(element); 
});
setDate(date1);  

} 
const selectStatus = (value) =>{
setStatus(value);
}
const selectLevelF = (value) =>{
    setSelectLevel(value);
}
const searchDate = () =>{
    console.log("search");
setSpinner(true); 
 if(date){


const body = {
    func: "getItems",
    d1: date[0],
    d2: date[1],
    status: status,
    type_: selectLevel,
}
axios.post("/api/post/Gate", body).then((res)=>{  
    setSpinner(false); 
    if(res.data.getItems.error){
        console.log("aldaa");

        setItemData([]);
    }else{
     setItemData(res.data.getItems.list);
    }

   
}).catch((err)=>{console.log("err: ", err)}) 

}else {
    getItems();
}
}
 
  const dateEmpty = (a) => {
    console.log("delete", a);
  }
return<div className={css.ItemLayout}>
       <div className={css.StateCss}>
        <ItemAdd getItems={getItems} typeLevel={typeLevel}/> <div className={css.ClearTable}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Table sort clear</Button></div>
       </div>
       <div style={{marginBottom: "5px"}}>
        <Button onClick={getItems}><RedoOutlined rotate={280} /></Button>
        <RangePicker showToday  format={dateFormat} onChange={dateOnchange}  value={date ? [moment(date[0], dateFormat), moment(date[1], dateFormat)] : null}/>
        <Select value={status} style={{width: 120}} onChange={selectStatus} 
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
            {value: 4,label: <div>Items </div>,}]}/>
        <Button onClick={searchDate}  type="primary"><SearchOutlined shape="#000" /></Button>
       </div>
         <Table bordered size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={spinner}  scroll={{x:  1000, y: 600 }} pagination={tableParams.pagination} />
</div>
}
export default Item;