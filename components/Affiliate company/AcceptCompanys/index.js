import { Badge, Button, Form, Input, message, Modal, Radio, Space, Spin, Table, Tooltip, Image } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import {SearchOutlined ,InsertRowAboveOutlined,ExclamationCircleOutlined, ClearOutlined, FormOutlined, SendOutlined, StarOutlined,SolutionOutlined, FundViewOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words"; 
import TextArea from "antd/lib/input/TextArea";
const { confirm } = Modal;
const AcceptCompanys = () =>{
const [spinner, setSpinner] = useState(false);
const [companyDate, setCompanyData] = useState([]);
const [filteredInfo, setFilteredInfo] = useState({});
const [sortedInfo, setSortedInfo] = useState({});
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState(''); 
const [loading, setLoading] = useState(false);
const searchInput = useRef(null); 
const [value, setValue] = useState(1);
const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [modalTitle, setModalTitle] = useState("Organization update");
  const [modalCount, setModalCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectValue, setRejectValue] = useState(3); 
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [isModalOpenCompany, setIsModalOpenCompany]  = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [userInfo, setUserInfo]= useState([]);
  const [userSpin, setUserSpin] = useState(false);
  const [form] = Form.useForm();
  const [others, setOthers] = useState(""); 
  const [isModalOpenUser, setIsModalOpenUser] = useState(false);
  const [orgIdState, setOrgIdState] = useState("");
  const [showIncentive, setShowIncentive] = useState(0);
   
  const showModal = (a) => {
    console.log("showModal: ", a.action);
    
    if(a.action.state === 6){
        setModalTitle("Organization update");
        setModalCount(1)
        setCompanyInfo(a.action);
    }else if(a.action.state === 7){
        setModalTitle("Incentive send");
        setModalCount(2)
        setCompanyInfo(a.action);
    }
    // setModalTitle();
    setIsModalOpen(true);
  };
  const showModalProps = (a) =>{
    setPropsOpen(true)
    setPropsReject(a);
    console.log("showModalProps: ", a);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  };
useEffect(()=>{ 
console.log("acceptCompany useEffect");
// setTimeout nemsen
// setTableParams({
//   ...tableParams,
//   pagination: {
//     ...tableParams.pagination,
//     total: 30, 
//   },
// }); 
  companyDataFunc();

},[])

const companyDataFunc = () => {   
setSpinner(true);
setLoading(true);
const body = {
    func: "getCompany",
    adminPkId: localStorage.getItem("pkId"),
    start: "0",
    count: "10",
};
axios.post("/api/post/Gate", body).then((res) => {  
  console.log("ene");
    setCompanyData(res.data.data);  
    
    // pageiin Toog uguhdu zaawal nuhtsul shalgaj uguh ba zaawal build hiine.
    // setTableParams({
    //     ...tableParams,
    //     pagination: {
    //       ...tableParams.pagination,
    //       total: 10, 
    //     }, 
    //   });

      setSpinner(false); 
      setLoading(false);

}) .catch((err) => {console.log(err)});  

 
// const body5 = {
//   func: "getPercentage"
// }
// axios.post("/api/post/Gate", body5).then((res)=>{
//   console.log("ress", res.data);
//   setShowIncentive(res.data.data[0].percentage);
 
// }).catch((err)=>{
//   console.log("err");
// })

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
    setLoading(true);
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
    const body = {
        func: "getCompany",
        adminPkId: localStorage.getItem("pkId"),
        start: resultPage,
        count: pagination.pageSize,
    };
    axios.post("/api/post/Gate", body).then((res) => { 
       
        setCompanyData(res.data.data); 
        console.log("resdata: ", res.data.data); 
          setLoading(false);
          setSpinner(false);
        }) 
        .catch((err) => {
        console.log(err);
        });  
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

  const data = companyDate.map((r, i)=>(
      {
        key: i,
        date: r.date1,
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
  const onChangeReject = (e) =>{
    console.log("reject change; ", e.target.value);
    // setOthers("-");
    setRejectValue(e.target.value);
  }
 
  const showModalReject = (a) =>{
    console.log("reject: ", a);
    setRejectValue(a.action.state);
    setCompanyInfo(a.action);
    setOthers(a.action.others);
    setIsModalOpenReject(true);
  }
const handleOkReject = () =>{  
console.log("radio: ", rejectValue);
console.log("company info pKID: ", companyInfo.PkId);
console.log("others: ", others); 
console.log("handok");
if(rejectValue == 6 ||rejectValue == 2 ){
  message.error("Select state choose!");
}else if(rejectValue == 5){
const body = {
func: "setCompany",
pkId: companyInfo.PkId,
adminPkId: localStorage.getItem("pkId"),
others: others,
state: rejectValue,
orgId: "-", 
};
axios.post("/api/post/Gate", body).then((res) => {
message.success("Success");
companyDataFunc();
setIsModalOpenReject(false);
});  
}else {
const body = {
func: "setCompany",
pkId: companyInfo.PkId,
adminPkId: localStorage.getItem("pkId"),
others: "-",
state: rejectValue,
orgId: "-", 
};
axios.post("/api/post/Gate", body).then((res) => {
message.success("Success");
companyDataFunc();
setIsModalOpenReject(false);
});  
}


}
  const handleCancelReject = () =>{
    setRejectValue(3);
    form.resetFields();
    setIsModalOpenReject(false);
  }
const showPromiseConfirm = (a) => {
confirm({
    title: 'Do you want to invitation send?',
    icon: <ExclamationCircleOutlined />,
    content: <div className={css.CompFlex2}><div>Company name:</div><div className={css.CompTitle2}>{a.action.companyName}</div></div>,
    onOk() {
    return new Promise((resolve, reject) => { 
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000, console.log("object"));
     
        const body = {
            func: "setCompany",
            pkId: a.action.PkId,
            adminPkId: localStorage.getItem("pkId"),
            state: 6,
            others: "-",
            orgId: "-", 
          };
          axios.post("/api/post/Gate", body).then((res) => {
           
              setTimeout(() => { 
                message.success("Success");
                companyDataFunc();
              }, 1400); 
            })
            .catch((err) => {
              console.log(err);
            }); 
    }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
});
};
const showUserInfo = (a) =>{
setUserSpin(true);
setIsModalOpenUser(true);
setRejectValue(a.action.state);
setCompanyInfo(a.action);
console.log("userInfo: ",a.action.userPkId);  
const body = {
    func: "getUserInfo",
    pkId: a.action.userPkId + "",
    };
axios.post("/api/post/Gate", body).then((res) => {  
    console.log("userInfo: ", res);
    setUserInfo(res.data.data);
    setUserSpin(false);
}).catch((err) => {console.log(err)}); 
}
const handleOkUser = () => {
setIsModalOpenUser(false);
};
const handleCancelUser = () => {
setIsModalOpenUser(false);
};

const companyInfof = (a) =>{
    console.log("params: ", a);
    setIsModalOpenCompany(true);
    setCompanyInfo(a.action);
    setRejectValue(a.action.state)
}
const handleCancelCompany = () =>{
    setIsModalOpenCompany(false);
}
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
        ) : a.state == 6 ? (<Tooltip title="Invitation Sent"><Badge color="purple" status="processing" text="Invitation Sent" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
        ) : a.state == 7 ? (<Tooltip title="Organization Onboarded" placement="topLeft"><Badge color="cyan" text="Organization Onboarded" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
        ) : a.state == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)}
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state.state - b.state.state, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {
    title: 'Action',
    key: 'action',
    fixed: 'right', 
    width: 110,
    render: (b) => <div className={css.ActionCss}>
        {b.orgId === "-" ? <div> 
            {b.action.state === 6 ? <Tooltip title="Organization id"><Button size="small" className={css.BtnRight} type="primary" onClick={()=>showModal(b)} icon={<InsertRowAboveOutlined />}></Button> </Tooltip>
            : <Tooltip title="Invitation sent"><Button size="small" type="primary" className={css.BtnRight} onClick={()=>showPromiseConfirm(b)} icon={<SendOutlined />}></Button></Tooltip>
            }
            <Tooltip title="Reject"><Button size="small" className={css.BtnReject}  onClick={()=> showModalReject(b)} icon={<FormOutlined />}></Button> </Tooltip>
            {/* <Tooltip title="User info"><Button size="small" className={css.BtnRight}  onClick={()=> showUserInfo(b)} icon={<SolutionOutlined/>}></Button> </Tooltip> */}
            <Tooltip title="Company info"><Button size="small" className={css.BtnRight}  onClick={()=> companyInfof(b)} icon={<FundViewOutlined />}></Button> </Tooltip>
        </div> : <div>
          {/* <Tooltip title="Incentive"><Button size="small" onClick={()=> showModal(b)} icon={<StarOutlined />} style={{marginRight: "5px"}}></Button></Tooltip> */}
          <Tooltip title="Company info"><Button size="small" className={css.BtnRight}  onClick={()=> companyInfof(b)} icon={<FundViewOutlined />}></Button></Tooltip>
          </div>}
    
    </div>,
    },
];
// -----------OrgId insert---------- 
const  onFinish= (values) =>{ 
console.log("values: ", values); 
console.log("state: ", companyInfo);
console.log('orgName: ', orgIdState);
if(values.others){
const body = {
    func: "setCompany",
    pkId: companyInfo.PkId,
    adminPkId: localStorage.getItem("pkId"),
    orgId: values.others,
    state: 7,
    others: "-", 
    };
    axios.post("/api/post/Gate", body).then((res) => {
      companyDataFunc();
      setIsModalOpen(false);
      message.success("Success"); 
    }).catch((err) => {console.log(err)});
}else { 
  console.log("incenitive");

    // const body = {
    //   func: "setInsentive",
    //   insentive: values.percentage,
    //   orgId: companyInfo.orgId,
    //   userId: companyInfo.userPkId,
    //   type_: values.percentageChoose,
    //   operatorID:  companyInfo.adminPkId,
    // };
    // axios.post("/api/post/Gate", body).then((res) => {
    //     message.success("Success");
    // }).catch((err) => {console.log(err)});
}
 
}
const onFinishFailed = (errInfo)=>{
console.log("Incentive errInfo: ", errInfo);
// formAddItem.resetFields(); 
}

// const  onFinishReject= (values) =>{ 
// console.log("values: ", values); 
// console.log("company info pKID: ", companyInfo.PkId);
// console.log("others: ", others); 
 

// const body = {
//     func: "setCompany",
//     pkId: companyInfo.PkId,
//     adminPkId: localStorage.getItem("pkId"),
//     others: others,
//     state: values.choose,
//     orgId: "-", 
//   };
// axios.post("/api/post/Gate", body).then((res) => {
// message.success("Success");
// form.resetFields();
// // getCompanyUser();
// companyDataFunc();
// setIsModalOpenReject(false);
// });  
// }
const onFinishFailedReject = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
const onChangeRadio = (a) =>{
    console.log("radio: ", a.target.value);
}
const othersOnChange = (e) =>{ 
    setOthers(e.target.value); 
}
const searchOrgId = (e) =>{
  console.log("org ID: ", e.target.value);
  const  body = {
    func: "findOrg",
    orgid: e.target.value,
    // userToken: tokenId,
  } 
    axios.post("/api/post/Gate", body).then((res)=>{  
      if(res.data.data){
        console.log("search: ", res.data.data.map.name); 
        setOrgIdState(res.data.data.map.name);
      
      }else {  
        console.log("bhq");
        setOrgIdState("no result!");
      } 
    }).catch((err)=>{
      console.log("err", err);
    })
}
return <div>
{spinner ? <Spin className={css.SpinCss}/> : 
<div> 
<div className={css.ClearTable}>
  <Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Clear</Button></div>

    <Table size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={loading}  scroll={{x:  1500, }} pagination={tableParams.pagination}/> 
    {/* ------------------------------------------------Modals------------------------------------ */}
    <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
    <Form form={form} name="normal_login" className={css.LoginForm} labelCol={{span: 8,}} wrapperCol={{span: 16,}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {modalCount === 1 ?  
        <>
            {/* ------------------------- orgID insert --------------------------- */}
            <div className={css.CompNameCss}>
            <div>Company name:</div>
            <div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div>
            </div>
            
        <Form.Item label={"Organzation ID"} name={"others"}   rules={[{required: true,message: "Please input your Organzation id!"}]}> 
            <Input placeholder={"Organzation id"} allowClear onChange={searchOrgId}/> 
        </Form.Item>
          <div>Company name:  {orgIdState}</div>
        </>
        : modalCount === 2 ? 
        <div>
                {/* ------------------------- Incentive insert --------------------------- */}
        <div className={css.CompNameCss}>
            <div>Company name: </div>
            <div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div>
        </div>
        <Form.Item label={"Percentage choose"} name={"percentageChoose"}   rules={[{required: true,message: "Please choose"}]}>
            <Radio.Group onChange={onChangeRadio} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Percentage</Radio>
              <Radio value={2}>Dollar</Radio>
              {/* <Radio value={3}>Coin</Radio> */}
            </Space>
            </Radio.Group> 
        </Form.Item>
        <Form.Item label={"Incenitve percent"} name={"percentage"}   rules={[ {required: true,message: "input your incentive"}]}>
            {showIncentive}
            
            <Input placeholder="incenitve percent" type="number"/> 
        </Form.Item>
      
        </div>
        : "Reject"
        }
        {/* <div><Button onClick={()=> form.resetFields()}>Reset</Button></div> */}
        <Form.Item style={{display: "flex", justifyContent: "flex-end"}}>
            <div ><Button type="primary" htmlType="submit" className="login-form-button">Update</Button></div>
        </Form.Item> 
    </Form> 
    </Modal>

        {/* ------------------------------------------------Reject Modals------------------------------------ */}

<Modal title="Reject" open={isModalOpenReject} onOk={handleOkReject}  onCancel={handleCancelReject}> 
    <div className={css.CompNameCss}>
        <div className={css.CompFlex}><div>Company name:</div><div className={css.CompTitle2}>{companyInfo === undefined ? "": companyInfo.companyName}</div></div>
        <div className={css.StatusCss}>
        {rejectValue == 2 ? (<Tooltip title="Request accepted"><Badge status="warning" text="Request accepted" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
        ) : rejectValue== 3 ? (<Tooltip title="Correct your information"><Badge color="red" status="processing" text="Correct your information" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
        //ene Edit hiii gsn state
        ) : rejectValue == 4 ? (<Tooltip title="Rejected"><Badge color="red" status="processing"text="Rejected"style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
        ) : rejectValue == 5 ? (<Tooltip title={companyInfo === undefined ? "": others}><Badge color="gray" status="processing"text="Others"style={{fontSize: "12px", color: "#808080"}}/></Tooltip>
        ) : rejectValue == 6 ? (<Tooltip title="Invitation Sent"><Badge color="purple" status="processing" text="Invitation Sent" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
        ) : rejectValue == 7 ? (<Tooltip title="Organization Onboarded..."><Badge color="cyan" text="Org id" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
        ) : rejectValue == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)}
        
        </div>
    </div>
    <div>Choose: </div> 
    <div className={css.RadioCss}> 
    <Radio.Group onChange={onChangeReject} value={rejectValue}>
    <Space direction="vertical">
        <Radio value={3}>Correct your information</Radio>
        <Radio value={4}>Rejected</Radio> 
        <Radio value={5}> More... {rejectValue === 5 ? (<TextArea style={{width: 200,marginLeft: 10,}} onChange={othersOnChange} value={companyInfo === undefined ? "": others}/>) : null} 
        </Radio>
    </Space>
    </Radio.Group>
    </div> 
</Modal>

            {/* ------------------------------------------------User info Modals------------------------------------ */}

{/* <Modal title="User info" open={isModalOpenUser} onOk={handleOkUser}  onCancel={handleCancelUser} footer={null}> 
<div>{userSpin ? <Spin size="large" className={css.SpinCss}/> : 
        <>
<div className={css.CompNameCss}>
    <div className={css.CompFlex}><div className={css.CompName}>Company name:</div><div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div></div>
    <div className={css.StatusCss}>
    {rejectValue == 2 ? (<Tooltip title="Request accepted"><Badge status="warning" text="Request accepted" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
    ) : rejectValue== 3 ? (<Tooltip title="Correct your information"><Badge color="red" status="processing" text="Correct your information" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
   
    ) : rejectValue == 4 ? (<Tooltip title="Rejected"><Badge color="red" status="processing"text="Rejected"style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
    ) : rejectValue == 5 ? (<Tooltip title={companyInfo === undefined ? "": others}><Badge color="gray" status="processing"text="Others"style={{fontSize: "12px", color: "#808080"}}/></Tooltip>
    ) : rejectValue == 6 ? (<Tooltip title="Invitation Sent"><Badge color="purple" status="processing" text="Invitation Sent" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
    ) : rejectValue == 7 ? (<Tooltip title="Organization Onboarded..."><Badge color="cyan" text="Org id" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
    ) : rejectValue == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)} 
    </div>
</div> 
    <div className={css.imgL}>
        <div className={css.ImageCss}><Image preview={false} alt="Obertech" src={"/img/user.png"} className={css.Img}/></div>
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
    </div>
    </>
    }
    </div>
</Modal> */}

 {/* ------------------------------------------------Company info Modals------------------------------------ */}

<Modal title="Company info" open={isModalOpenCompany}  onCancel={handleCancelCompany} footer={null}> 
<div>{userSpin ? <Spin size="large" className={css.SpinCss}/> : 
<>
<div className={css.CompNameCss}>
    <div className={css.CompFlex}><div className={css.CompName}></div><div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.date1}</div></div>
    <div className={css.StatusCss}>
    {rejectValue == 2 ? (<Tooltip title="Request accepted"><Badge status="warning" text="Request accepted" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
    ) : rejectValue== 3 ? (<Tooltip title="Correct your information"><Badge color="red" status="processing" text="Correct your information" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
    //ene Edit hiii gsn state
    ) : rejectValue == 4 ? (<Tooltip title="Rejected"><Badge color="red" status="processing"text="Rejected" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
    ) : rejectValue == 5 ? (<Tooltip title={companyInfo === undefined ? "": others}> <Badge color="gray" status="processing"text="Others" style={{fontSize: "12px", color: "#808080"}}/></Tooltip>
    ) : rejectValue == 6 ? (<Tooltip title="Invitation Sent"><Badge color="purple" status="processing" text="Invitation Sent" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
    ) : rejectValue == 7 ? (<Tooltip title="Organization Onboarded..."><Badge color="cyan" text="Org id" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
    ) : rejectValue == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)} 
    </div>
</div> 
<div style={{   background: "#4d5052", color: "#fff", padding: "3px 8px"}}>1. Prospect contact information</div>
<div className={css.Prospect1}>
    <div className={css.ProspectTitle}>First name:</div>
    <div className={css.ProspectTitle2}>{companyInfo ? companyInfo.firstname : "null"}</div>
</div>
<div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Last name:</div>
        <div className={css.ProspectTitle2}>{companyInfo ? companyInfo.lastname : "null"}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Job title:</div>
        <div className={css.ProspectTitle2}>{companyInfo ? companyInfo.jobtitle : "null"}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Email: </div>
        <div className={css.ProspectTitle2}>{companyInfo ? companyInfo.email : "null"}</div>
      </div>
      <div style={{  marginTop: "15px",  background: "#4d5052", color: "#fff", padding: "3px 8px"}}>2. Prospect company information</div> 
      {companyInfo === undefined ? "" :
      <>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Date: </div>
        <div className={css.ProspectTitle2}>{companyInfo.date1}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Company name: </div>
        <div className={css.ProspectTitle2}>{companyInfo.companyName}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Country: </div>
        <div className={css.ProspectTitle2}>{companyInfo.country}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Web site: </div>
        <div className={css.ProspectTitle2}>{companyInfo.website}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Employees: </div>
        <div className={css.ProspectTitle2}>{companyInfo.employees}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Total annual revenue: </div>
        <div className={css.ProspectTitle2}>{companyInfo.totalAnnualRevenue}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Additional Information: </div>
        <div className={css.ProspectTitle2}>{companyInfo.additionalInformation}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Others: </div>
        <div className={css.ProspectTitle2}>{companyInfo.others}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Insentive: </div>
        <div className={css.ProspectTitle2}>{companyInfo.insentive}</div>
      </div>
      <div className={css.Prospect1}>
        <div className={css.ProspectTitle}>Org Id: </div>
        <div className={css.ProspectTitle2}>{companyInfo.orgId}</div>
      </div>
      </>}
        {/* <div className={css.ImageCss}><Image preview={false} alt="Obertech" src={"/img/user.png"} className={css.Img}/></div> */}

        {/* <div className={css.InfoComp}> 
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
            <div className={css.TitleChild2}>{companyInfo.date1}</div>
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
        </div> */} 
    </>
}
    </div>
</Modal>
</div>
}
</div>
}
export default AcceptCompanys;