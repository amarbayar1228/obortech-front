import { Badge, Button, Image, Input, message, Space, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {SearchOutlined ,CheckOutlined, ExclamationCircleOutlined, FormOutlined, ClearOutlined, StarOutlined,SolutionOutlined, FundViewOutlined,DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import css from "./style.module.css"
import StatusChangeModal from "../../StatusChangeModal";
import GroupDelete from "./GroupChild/GroupDelete";
import GroupEdit from "./GroupChild/GroupEdit";
 const GroupItem = () =>{
const [group, setGroup] = useState([]);
const [spinner, setSpinner] = useState(false);
const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  }); 
const [filteredInfo, setFilteredInfo] = useState({});
const [sortedInfo, setSortedInfo] = useState({});
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');   
const [typeLevel, setType] = useState(null);
const searchInput = useRef(null); 
useEffect(()=>{
    console.log("group item component");
    groupItems();
},[]);

const groupItems = () => {
    setSpinner(true);
    const body = {func: "getGroups"}; 
    axios.post("/api/post/Gate", body).then((res) => { 
        setSpinner(false);
        console.log("group: ", res.data.data);
        setGroup(res.data.data.list);
       
    }).catch((err)=>{console.log("group item err", err)});   
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
console.log('Various pagination: ', pagination);
setTableParams({
    pagination,
    filters,
    ...sorter,
    });
// setPagiValue2(page);
// setPagiValue3(1);
// setSpinState(true);
console.log("page: ", pagination.current +" pageSize: "+pagination.pageSize);
const resultPage = 0;   
if(pagination.current == 1){
    resultPage = 0;
    console.log("tentsv");
}else {
    resultPage = pagination.current - 1; 
} 
resultPage = resultPage * pagination.pageSize;   
// const body = {
//     func: "getCompany",
//     state: 1,
//     start: resultPage,
//     count: pagination.pageSize,
// };
// axios.post("/api/post/Gate", body).then((res) => {
// console.log("res.data: ", res.data.data);
// setCompanyData(res.data.data);
    
//     setCompanyData(res.data.data)
//     setSpinner(false); 

// }).catch((err) => {console.log(err)});

console.log("result page: ", resultPage);
setFilteredInfo(filters);
setSortedInfo(sorter);
};
const data = group.map((r, i)=>(
    {
      key: i,
      date: i+"",
      img: r.img,
      title: r.title.toLowerCase(),
      description: r.description.toLowerCase(),
      price: r.price,
      others: r.others.toLowerCase(),
      cnt: r.cnt,
      state: r, 
      action: r
    } 
));
const columns = [
    {
    title: 'Date',
    dataIndex: 'date',
    key: 'date', 
    width: 100,
    fixed: 'left', 
    ...getColumnSearchProps('date'), 
    filteredValue: filteredInfo.date || null,
    onFilter: (value, record) => record.date.includes(value),
    // sorter: (a, b) => a.date.length - b.date.length,
    sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
    ellipsis: true,
    },
 
    {
    title: 'Title',
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
    title: 'Desription',
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
    title: 'Price',
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
        title: 'Others',
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
    title: 'Status',
    dataIndex: 'state',
    key: 'state', 
    fixed: "right",
    width: 90,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div>
        {a.status == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#349f3c",fontWeight: "600"}}/></Tooltip>) : 
        a.status == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
        a.status == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
        }
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state.status - b.state.status, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    }, 

    {title: 'Action', key: 'action', fixed: 'right', width: 140,
    render: (b) => <div className={css.ActionCss}>
         <div style={{display: "flex"}}>  
         <StatusChangeModal groupData={b.state} getGroupItems={groupItems}/>    
         <GroupDelete groupData={b.state} getGroupItems={groupItems}/>
         <GroupEdit pkId={b.state} getGroupItems={groupItems}/>
         {/* <StatusChangeModal addItemStatus={b.state} addItemGetItems={getItems} />
         <ItemEdit addItemStatus={b.state} addItemGetItems={getItems} typeLevel={typeLevel}/>
         <ItemDel addItemStatus={b.state} addItemGetItems={getItems}/>  */}
        </div>   
    </div>,
    },
];
return<div>
      <div className={css.ClearTable}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Table sort clear</Button></div>
     <Table bordered size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={spinner}  scroll={{x:  1000 }} pagination={tableParams.pagination}/>
</div>
 }

 export default GroupItem;