import { Badge, Button, Input, Modal, Space, Spin, Table, Tooltip, Image, Radio, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import Highlighter from "react-highlight-words";
import {SearchOutlined ,CheckOutlined, ExclamationCircleOutlined, ClearOutlined, SendOutlined, StarOutlined,SolutionOutlined, FundViewOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
const AdminAcceptCompany = () =>{
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
const [isModalOpenReject, setIsModalOpenReject]= useState(false);
const [rejectValue, setRejectValue]= useState(0);
const [others, setOthers] = useState("");
const [tableParams, setTableParams] = useState({pagination: {current: 1,pageSize: 10}});
const [isModalOpenCompany, setIsModalOpenCompany]  = useState(false);
const searchInput = useRef(null); 
useEffect(()=>{
console.log("AdminAcceptCompany");
getNewComp();
},[])
const getNewComp = () => {
setSpinner(true);
const body = {
    func: "getCompany",
    state: "2,3,4,5,6,7,8,9",
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
    console.log("page: ", pagination.current +" pageSize: "+pagination.pageSize);
    const resultPage = 0;   
    if(pagination.current == 1){
      resultPage = 0;
      console.log("tentsv");
    }else {
      resultPage = pagination.current - 1; 
    }

    resultPage = resultPage * pagination.pageSize;   
    const body = {
        func: "getCompany",
        state: "2,3,4,5,6,7,8,9",
        start: resultPage,
        count: pagination.pageSize,
    };
    axios.post("/api/post/Gate", body).then((res) => {
    console.log("res.data: ", res.data.data);
    setCompanyData(res.data.data); 
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
setCompanyInfo(a.action);
setIsModalOpenReject(true)
} 
// user handle modal
const handleOkUser = () => {
setIsModalOpenUser(false);
};
const handleCancelUser = () => {
setIsModalOpenUser(false);
};
// reject handle modal
const handleOkReject = (a) =>{
console.log("company pkId: ", companyInfo.PkId);
console.log("radio: ",rejectValue );
console.log("others: ", others); 
if(rejectValue == 5){
    if(others == ""){
        message.error("Write your reason!");
    }else{
       const body = {
            func: "setCompany",
            pkId: companyInfo.PkId,
            adminPkId: localStorage.getItem("pkId"),
            others: others,
            state: rejectValue,
            orgId: "-", 
        } 
        console.log("other axios");
        // axios.post("/api/post/Gate", body).then((res) => {
        //     message.success("Success"); 
        //     setIsModalOpenReject(false)
        //   }); 
    }
}else if(rejectValue == 0){
    console.log("ene anhni hooson ");
    message.error("Choose a return type?");
}else {
    if(others == ""){
      const body = {
            func: "setCompany",
            pkId: companyInfo.PkId,
            adminPkId: localStorage.getItem("pkId"),
            others: "-",
            state: rejectValue,
            orgId: "-", 
        }
        console.log("other bhq");
        // axios.post("/api/post/Gate", body).then((res) => {
        //     message.success("Success"); 
        //     setIsModalOpenReject(false)
        //   });  
    }else {
        console.log("ene shvvv");
    }
} 
 
}
const handleCancelReject = ()=>{
setOthers("");
setRejectValue(0);
console.log("cancel reject");
setIsModalOpenReject(false)
}
const showUserInfo = (b) =>{
console.log("b: ", b.action);
console.log("userInfo: ",b.action.userPkId);  
setCompanyInfo(b.action);
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
const onChangeReject = (e)=>{
    setRejectValue(e.target.value)
    setOthers("");
}
const textAreaChange = (e) =>{
    console.log("eL ", e.target.value);
    setOthers(e.target.value);
}
const confirm = (a) => {
Modal.confirm({
title: 'Do you want to accept company?',
icon: <ExclamationCircleOutlined />,
content: <div className={css.CompFlex2}>
    <div className={css.CompTitle}>Company name: </div>
    <div className={css.CompNameF}> {a.action.companyName}</div>
</div>,
okText: 'Accept',
cancelText: 'Cancel',
onOk() { 
const body = {func: "setCompany", pkId: a.action.PkId, adminPkId: localStorage.getItem("pkId"), orgId: "-", others: "-", state: 2};
axios.post("/api/post/Gate", body).then((res) => {
    message.success("Success"); getNewComp()}); 
}, 
onCancel() {console.log("Cancel")},
});};
const companyInfof = (a) =>{
    console.log("params: ", a);
    setIsModalOpenCompany(true);
    setCompanyInfo(a.action);
    setRejectValue(a.action.state)
}
const handleCancelCompany = () =>{
    setIsModalOpenCompany(false);
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
       {a.state == 2 ? (<Tooltip title="Request accepted"><Badge status="warning" text="Request accepted" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
        ) : a.state == 3 ? (<Tooltip title="Correct your information"><Badge color="red" status="processing" text="Correct your information" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
        //ene Edit hiii gsn state
        ) : a.state == 4 ? (<Tooltip title="Rejected"><Badge color="red" status="processing"text="Rejected"style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
        ) : a.state == 5 ? (<Tooltip title={a.others}><Badge color="gray" status="processing"text="Others"style={{fontSize: "12px", color: "#808080"}}/></Tooltip>
        ) : a.state == 6 ? (<Tooltip title="Invitation Send..."><Badge color="purple" status="processing" text="Invitation Send." style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
        ) : a.state == 7 ? (<Tooltip title="Organization Onboarded..."><Badge color="cyan" text="Org id" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
        ) : a.state == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)}
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state.state - b.state.state, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {title: 'Action', key: 'action', fixed: 'right', width: 140,
    render: (b) => <div className={css.ActionCss}>
         <div>  
            {/* <Tooltip title="Accept company"><Button size="small" className={css.BtnAccept}  onClick={()=> confirm(b)} icon={<CheckOutlined />}></Button> </Tooltip>
            <Tooltip title="Reject"><Button size="small" className={css.BtnReject}  onClick={()=> showModalReject(b)} icon={<FormOutlined />}></Button> </Tooltip> */}
            <Tooltip title="User info"><Button size="small" className={css.BtnRight}  onClick={()=> showUserInfo(b)} icon={<SolutionOutlined/>}>User</Button> </Tooltip>
            <Tooltip title="Company info"><Button size="small" className={css.BtnRight}  onClick={()=> companyInfof(b)} icon={<FundViewOutlined />}></Button> </Tooltip>
        </div>   
    </div>,
    },
];

return <div>
    <div className={css.ClearTable}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Table sort clear</Button></div>
    <Table size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={spinner}  scroll={{x:  1500, y: 600 }} pagination={tableParams.pagination}/>

    {/* --------------------------------------------------------userInfo modal---------------------------------------------------------------------- */}

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
                <div className={css.TitleChild}>Full name: </div><div className={css.TitleChild}>Email: </div>
                <div className={css.TitleChild}>Phone: </div><div className={css.TitleChild}>address: </div>
            </div>
            <div className={css.Description}>
                <div className={css.TitleChild2}>{userInfo.lastname}  {userInfo.firstname}</div><div className={css.TitleChild2}>{userInfo.email} </div>
                <div className={css.TitleChild2}>{userInfo.phone}</div><div className={css.TitleChild2}>{userInfo.address} </div>
            </div>
            </div>
            : "" }
        </div>
        </>
        }
    </div>
    </Modal>
       {/* --------------------------------------------------------Reject modal ---------------------------------------------------------------------- */}
    <Modal title="Reject" open={isModalOpenReject} onOk={handleOkReject}  onCancel={handleCancelReject}> 
        <div>
        {companyInfo === undefined ? "": 
        <div className={css.CompNameCss}>
            <div className={css.CompFlex}><div className={css.CompTitle}>Company name:</div><div className={css.CompNameF}>{companyInfo.companyName}</div></div>
            <div className={css.StatusCss}>
            {companyInfo.state == 1 ? (<Tooltip title="New request"><Badge status="warning" text="New request" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
            ) :  ""} 
            </div>
        </div>
        }
        <div style={{marginBottom: "10px"}}>
            <div className={css.ChooseCss}>Choose a return type? </div>
            <Radio.Group onChange={onChangeReject} value={rejectValue} style={{marginLeft: "20px"}}>
            <Space direction="vertical">
                <Radio value={3}>Correct your information</Radio>
                <Radio value={4}>Rejected</Radio> 
                <Radio value={5}> More...</Radio> 
            </Space>
            </Radio.Group>
            {rejectValue === 5 ? (
                <TextArea placeholder="Write your reason?"   allowClear onChange={textAreaChange} value={others} style={{height: "100px", marginTop: "10px"}} />
                ) : null}
        </div>
        </div>
    </Modal>
   {/* ------------------------------------------------Company info Modals------------------------------------ */}

<Modal title="Company info" open={isModalOpenCompany}  onCancel={handleCancelCompany} footer={null}> 
<div>{userSpin ? <Spin size="large" className={css.SpinCss}/> : 
<>
<div className={css.CompNameCss}>
    <div className={css.CompFlex}><div className={css.CompName}>Company name:</div><div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div></div>
    <div className={css.StatusCss}>
    {rejectValue == 2 ? (<Tooltip title="Request accepted"><Badge status="warning" text="Request accepted" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
    ) : rejectValue== 3 ? (<Tooltip title="Correct your information"><Badge color="red" status="processing" text="Correct your information" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
    //ene Edit hiii gsn state
    ) : rejectValue == 4 ? (<Tooltip title="Rejected"><Badge color="red" status="processing"text="Rejected"style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
    ) : rejectValue == 5 ? (<Tooltip title={companyInfo === undefined ? "": others}><Badge color="gray" status="processing"text="Others"style={{fontSize: "12px", color: "#808080"}}/></Tooltip>
    ) : rejectValue == 6 ? (<Tooltip title="Invitation Send..."><Badge color="purple" status="processing" text="Invitation Send." style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
    ) : rejectValue == 7 ? (<Tooltip title="Organization Onboarded..."><Badge color="cyan" text="Org id" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
    ) : rejectValue == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)} 
    </div>
</div> 
    <div className={css.imgL}>
        {/* <div className={css.ImageCss}><Image preview={false} alt="Obertech" src={"/img/user.png"} className={css.Img}/></div> */}
        <div className={css.Info}> 
        <div className={css.Title}>
            <div className={css.TitleChild}>Date: </div>
            <div className={css.TitleChild}>Company name: </div>
            <div className={css.TitleChild}>Country: </div>
            <div className={css.TitleChild}>Web site: </div>
            <div className={css.TitleChild}>Employees: </div>
            <div className={css.TitleChild}>Total annual revenue: </div>
            <div className={css.TitleChild}>Additional Information: </div>
            <div className={css.TitleChild}>Others: </div>
            <div className={css.TitleChild}>Insentive: </div>
            <div className={css.TitleChild}>Org Id: </div>

        </div>
        {companyInfo === undefined ? "" : 
        <div className={css.Description}>
            <div className={css.TitleChild2}>2022 01 02</div>
            <div className={css.TitleChild2}>{companyInfo.companyName}</div>
            <div className={css.TitleChild2}>{companyInfo.country}</div>
            <div className={css.TitleChild2}>{companyInfo.website}</div>
            <div className={css.TitleChild2}>{companyInfo.employees}</div>
            <div className={css.TitleChild2}>{companyInfo.totalAnnualRevenue}</div>
            <div className={css.TitleChild2}>{companyInfo.additionalInformation}</div> 
            <div className={css.TitleChild2}>{companyInfo.others}</div>
            <div className={css.TitleChild2}>{companyInfo.insentive}</div>
            <div className={css.TitleChild2}>{companyInfo.orgId}</div> 
        </div>
        }
        </div>
    </div>
    </>
}
    </div>
</Modal>
</div>
}
export default AdminAcceptCompany;