import { Badge, Button, Input, Modal, Space, Spin, Table, Tooltip, Image } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import Highlighter from "react-highlight-words";
import {SearchOutlined ,InsertRowAboveOutlined,ExclamationCircleOutlined, QrcodeOutlined, FormOutlined, SendOutlined, StarOutlined,SolutionOutlined } from "@ant-design/icons";
const NewCompanyRequest = () =>{
const [spinner, setSpinner] = useState(false)
const [companyData, setCompanyData] = useState([]);
const [filteredInfo, setFilteredInfo] = useState({});
const [sortedInfo, setSortedInfo] = useState({});
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState(''); 
const [userInfo, setUserInfo]= useState();
const [userSpin, setUserSpin]= useState(false);
const [isModalOpenUser, setIsModalOpenUser] = useState(false);
const [companyInfo, setCompanyInfo] = useState();
const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
const searchInput = useRef(null); 
useEffect(()=>{
console.log("NEWCompanyRequest");
getNewComp();
},[])
const getNewComp = () => {
setSpinner(true);
const body = {
    func: "getCompany",
    state: 1,
    start: 0,
    count: 10,
};
axios.post("/api/post/Gate", body).then((res) => {
console.log("res.data: ", res.data.data);
setCompanyData(res.data.data);
    setSpinner(false);
    setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 60, 
        },
      });
// setGetCompany(res.data.data);
// confirmCompanyList();
}).catch((err) => {console.log(err)});
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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{marginBottom: 8,display: 'block',}}/>
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />}
            size="small" style={{width: 90,}}>Search</Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{width: 90,}}>Reset</Button>
          <Button type="link" size="small"
            onClick={() => {confirm({ closeDropdown: false, }); setSearchText(selectedKeys[0]); setSearchedColumn(dataIndex);}}>Filter</Button>
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
  const handleChangeTable = (pagination, filters, sorter) => {
    setSpinner(true);
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
    //     adminPkId: localStorage.getItem("pkId"),
    //     start: resultPage,
    //     count: pagination.pageSize,
    // };
    // axios.post("/api/post/Gate", body).then((res) => { 
       
    //     setCompanyData(res.data.data); 
    //     console.log("resdata: ", res.data.data); 
    //       setLoading(false);
    //       setSpinner(false);
    //     }) 
    //     .catch((err) => {
    //     console.log(err);
    //     });  
    const body = {
        func: "getCompany",
        state: 1,
        start: resultPage,
        count: pagination.pageSize,
    };
    axios.post("/api/post/Gate", body).then((res) => {
    console.log("res.data: ", res.data.data);
    setCompanyData(res.data.data);
        
        setCompanyData(res.data.data)
        setSpinner(false); 

    }).catch((err) => {console.log(err)});

    console.log("result page: ", resultPage);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
const showModalReject = (a)=>{
console.log("a", a);
}
const handleOkUser = () => {
setIsModalOpenUser(false);
};
const handleCancelUser = () => {
setIsModalOpenUser(false);
};
const showUserInfo = (b) =>{
console.log("b: ", b.action);
console.log("userInfo: ",b.action.userPkId);  
setCompanyInfo(b.action)
setIsModalOpenUser(true);
setUserSpin(true);
const body = {
    func: "getUserInfo",
    pkId: b.action.userPkId + "",
    };
axios.post("/api/post/Gate", body).then((res) => {  
    console.log("userInfo: ", res);
    setUserInfo(res.data.data);
    setUserSpin(false);
}).catch((err) => {console.log(err)}); 
}
const data = companyData.map((r, i)=>(
    {
      key: i,
      date: i,
      companyName: r.companyName,
      country: r.country, 
      additionalInformation: r.additionalInformation,
      employees: r.employees,
      totalAnnualRevenue: r.totalAnnualRevenue,
      website: r.website,
      others: r.others,
      insentive: r.insentive,
      state: r,
      orgId: r.orgId,
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
    title: 'Company name',
    dataIndex: 'companyName',
    key: 'companyName', 
    // width: 120,
    ...getColumnSearchProps('companyName'), 
    filteredValue: filteredInfo.companyName || null,
    onFilter: (value, record) => record.companyName.includes(value),
    // sorter: (a, b) => a.lastname.length - b.lastname.length,
    sortOrder: sortedInfo.columnKey === 'companyName' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: 'Country',
    dataIndex: 'country',
    key: 'country', 
    // width: 120,
    ...getColumnSearchProps('country'), 
    filteredValue: filteredInfo.country || null,
    onFilter: (value, record) => record.country.includes(value),
    sorter: (a, b) => a.country.length - b.country.length,
    sortOrder: sortedInfo.columnKey === 'country' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: 'Additional information',
    dataIndex: 'additionalInformation',
    key: 'additionalInformation', 
    // width: 120,
    ...getColumnSearchProps('additionalInformation'), 
    filteredValue: filteredInfo.additionalInformation || null,
    onFilter: (value, record) => record.additionalInformation.includes(value),
    sorter: (a, b) => a.additionalInformation.length - b.additionalInformation.length,
    sortOrder: sortedInfo.columnKey === 'additionalInformation' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
        title: 'Employees',
        dataIndex: 'employees',
        key: 'employees', 
        // width: 120,
        // ...getColumnSearchProps('employees'), 
        filteredValue: filteredInfo.employees || null,
        // onFilter: (value, record) => record.employees.includes(value),
        sorter: (a, b) => a.employees - b.employees,
        sortOrder: sortedInfo.columnKey === 'employees' ? sortedInfo.order : null,
        ellipsis: true,
    },
    {
    title: 'Total Annual Revenue',
    dataIndex: 'totalAnnualRevenue',
    key: 'totalAnnualRevenue', 
    // width: 120,
    ...getColumnSearchProps('totalAnnualRevenue'), 
    filteredValue: filteredInfo.totalAnnualRevenue || null,
    onFilter: (value, record) => record.totalAnnualRevenue.includes(value),
    // sorter: (a, b) => a.email.length - b.email.length,
    sortOrder: sortedInfo.columnKey === 'totalAnnualRevenue' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: 'Web site',
    dataIndex: 'website',
    key: 'website', 
    // width: 120,
    ...getColumnSearchProps('website'), 
    filteredValue: filteredInfo.website || null,
    // onFilter: (value, record) => record.website.includes(value),
    // sorter: (a, b) => a.address.length - b.address.length,
    sortOrder: sortedInfo.columnKey === 'website' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: 'Others',
    dataIndex: 'others',
    key: 'others', 
    // width: 120,
    ...getColumnSearchProps('others'), 
    filteredValue: filteredInfo.others || null,
    // onFilter: (value, record) => record.website.includes(value),
    // sorter: (a, b) => a.address.length - b.address.length,
    sortOrder: sortedInfo.columnKey === 'others' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: 'Incentive',
    dataIndex: 'insentive',
    key: 'insentive', 
    // width: 120,
    ...getColumnSearchProps('insentive'), 
    filteredValue: filteredInfo.others || null,
    // onFilter: (value, record) => record.website.includes(value),
    sorter: (a, b) => a.insentive.length - b.insentive.length,
    sortOrder: sortedInfo.columnKey === 'insentive' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {
    title: 'Organzation ID',
    dataIndex: 'orgId',
    key: 'orgId', 
    // width: 120,
    ...getColumnSearchProps('orgId'), 
    filteredValue: filteredInfo.orgId || null,
    // onFilter: (value, record) => record.website.includes(value),
        sorter: (a, b) => a.orgId.length - b.orgId.length,
    sortOrder: sortedInfo.columnKey === 'orgId' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
    title: 'Status',
    dataIndex: 'state',
    key: 'state', 
    fixed: "right",
    width: 80,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div>
        {a.state == 1 ? (<Tooltip title="New request"><Badge status="warning" text="New request" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
        ) : <Badge status="warning" text="others"/>}
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state.state - b.state.state, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {title: 'Action', key: 'action', fixed: 'right', width: 110,
    render: (b) => <div className={css.ActionCss}>
         <div>  
            <Tooltip title="Reject"><Button size="small" className={css.BtnReject}  onClick={()=> showModalReject(b)} icon={<FormOutlined />}></Button> </Tooltip>
            <Tooltip title="User info"><Button size="small" className={css.BtnRight}  onClick={()=> showUserInfo(b)} icon={<SolutionOutlined/>}></Button> </Tooltip>
        </div>   
    </div>,
    },
];

return <div>
    <div className={css.ClearTable}><Button type="dashed" onClick={clearAll}>Clear filters and sorters</Button></div>
    <Table size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={spinner}  scroll={{x:  1500, }} pagination={tableParams.pagination}/>
    <Modal title="User info" open={isModalOpenUser} onOk={handleOkUser}  onCancel={handleCancelUser} footer={null}> 
                 <div>
                    {userSpin ? <Spin size="large" className={css.SpinCss}/> : 
                    <>
                    <div className={css.CompNameCss}>
                    <div className={css.CompFlex}><div className={css.CompName}>Company name:</div>
                    <div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div></div>
                    
                    </div>
                        <div className={css.imgL}>
                           <div className={css.ImageCss}><Image preview={false} alt="Obertech" src={"/img/user.png"} className={css.Img}/></div>
                           {userInfo ?
                           <div className={css.Info}> 
                            
                            <div className={css.Title}>
                                <div className={css.TitleChild}>Full name: </div>
                                <div className={css.TitleChild}>Email: </div>
                                <div className={css.TitleChild}>Phone: </div>
                                <div className={css.TitleChild}>address: </div>
                            </div>
                            <div className={css.Description}>
                                <div className={css.TitleChild2}>{userInfo.lastname}  {userInfo.firstname}</div>
                                <div className={css.TitleChild2}>{userInfo.email} </div>
                                <div className={css.TitleChild2}>{userInfo.phone}</div>
                                <div className={css.TitleChild2}>{userInfo.address} </div>
                            </div>
                           </div>
                           : "" }
                        </div>
                        </>
                    }
                 </div>
            </Modal>


</div>
}
export default NewCompanyRequest;