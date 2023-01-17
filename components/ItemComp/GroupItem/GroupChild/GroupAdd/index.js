 
import { Badge, Button, Image, message, Modal, Space, Table, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import css from "./style.module.css"
import {SearchOutlined ,CheckOutlined, ExclamationCircleOutlined, RollbackOutlined, ClearOutlined, StarOutlined,SolutionOutlined, FundViewOutlined,DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Input from 'rc-input';
import PackageItem from './PackageItem';
const GroupAdd  = (props) =>{
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemData, setItemData] = useState([])  
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
    const searchInput = useRef(null); 
    const [packageItem, setPackageItem] = useState([]);
    const [showTable, setShowTable] = useState(false);
useEffect(()=>{
    
    // getItems();
},[]);
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
setSelectedRowKeys([]);
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
const getItems = () =>{
    console.log("props add: ", props);
    setSpinner(true);
    const body = {
    func: "getItems",
    status: "0,1",
    };
    axios.post("/api/post/Gate", body).then((res) => { 
        // console.log("item state: ", res.data.getItems.list);
        // setItemData(res.data.getItems.list);
        setSpinner(false);
        if(res.data.getItems.error){
            console.log("aldaa");
            setItemData([]);
        }else{
         setItemData(res.data.getItems.list);
        }
    }).catch((err) => {
        message.error(err);
    }); 
}
const showModal = () => {
    getItems();
    setIsModalOpen(true);
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setShowTable(false);
    setSelectedRowKeys([]);
    setIsModalOpen(false);
}; 
const data = itemData.map((r, i)=>(
    {
        key: r.pkId,
        date: r.date_,
        img: r.img,
        title: r.title.toLowerCase(),
        description: r.description.toLowerCase(),
        price: r.price,
        others: r.others.toLowerCase(),
        state: r.status,
        cnt: r.cnt,
    } 
)); 
const columns = [
    // { title: 'Date', dataIndex: 'date', key: 'date',  width: 72, fixed: 'left', 
    // ...getColumnSearchProps('date'), 
    // filteredValue: filteredInfo.date || null,
    // onFilter: (value, record) => record.date.includes(value),
    // // sorter: (a, b) => a.date.length - b.date.length,
    // sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
    // ellipsis: true,
    // },
    {
    title: 'Image',
    dataIndex: 'img',
    key: 'img', 
    fixed: "left",
    width: 70, 
    render: (a) => <div> 
        <Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64," + a} style={{width: "50px"}}/>
    </div>,  
    ellipsis: true,
    }, 
    {
    title: 'Item name',
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
    // {
    //     title: 'Others',
    //     dataIndex: 'others',
    //     key: 'others', 
    //     // width: 120,
    //     ...getColumnSearchProps('others'), 
    //     filteredValue: filteredInfo.others || null,
    //     onFilter: (value, record) => record.others.includes(value),
    //     sorter: (a, b) => a.others.length - b.others.length,
    //     sortOrder: sortedInfo.columnKey === 'others' ? sortedInfo.order : null,
    //     ellipsis: true,
    //     }, 
    {
    title: 'Status',
    dataIndex: 'state',
    key: 'state', 
    fixed: "right",
    width: 90,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div>
            {a == 1 ? (<Tooltip title="Active"><Badge status="success" text="active" style={{color: "#349f3c",fontWeight: "600"}}/></Tooltip>) : 
            a == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
            a == 2 ? <Tooltip title="Disable">  <Badge status="error" text="Disable" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
        }
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state - b.state, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    },  
];
const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
    setSelectedRowKeys([]);
    setShowTable(true);
    setLoading(false);
    }, 1000);
};
const onSelectChange = (newSelectedRowKeys, data) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    console.log("data: ", data);
    setPackageItem(data);
    setSelectedRowKeys(newSelectedRowKeys);
};
const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
};
const hasSelected = selectedRowKeys.length > 0;

const backF = () =>{
    setShowTable(false);
}
const modalShow = () =>{
    setIsModalOpen(true);
}
const modalHide = () =>{
    setIsModalOpen(false);
}
 
return<div>
    <Button type="primary" onClick={showModal}> + Item package</Button>
    <Modal title="Package group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={700}>
        <div>  
        {showTable ? <Button type="primary" onClick={backF} icon={<RollbackOutlined />}>Back</Button> : <div className={css.ClearTable}>  
        {/* <Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Clear</Button> */}
        </div>} 
            <div style={{marginBottom: 16,}}> 
            
            </div>
            {showTable === false ? 
            <div className={showTable === false ? css.PackageItem : ""}> 
                <Table  bordered size="small" rowSelection={rowSelection} onChange={handleChangeTable} loading={spinner} columns={columns} dataSource={data} scroll={{y: 400,}} pagination={tableParams.pagination} />
                <div style={{borderTop: "1px solid #ccc", paddingTop:"5px"}}> 
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>Item Package</Button>     <span >{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                </div>
            </div>
            : null}
            <PackageItem packageItem={packageItem} showTable={showTable}   groupItems={props.groupItems} modalShow={modalShow} modalHide={modalHide}/>
        </div>
    </Modal>
    

</div>
}
export default GroupAdd;