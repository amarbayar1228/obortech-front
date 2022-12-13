import { Badge, Button, Form, Input, InputNumber, message, Modal, Select, Space, Spin, Table, Tooltip } from "antd";
import {CaretRightOutlined,TeamOutlined,InfoCircleOutlined,RollbackOutlined,FormOutlined,SearchOutlined,ClearOutlined, FundViewOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import Highlighter from "react-highlight-words";
const { Option } = Select;
const Company = () =>{
const [isModalVisibleCorporation, setIsModalVisibleCorporation] =useState(false);
const [companyData, setCompanyData] = useState([]);
const [form] = Form.useForm();
const [filteredInfo, setFilteredInfo] = useState({});
const [sortedInfo, setSortedInfo] = useState({});
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState(''); 
const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
const searchInput = useRef(null); 
const [compInfo, setCompInfo] = useState("");
const [formComp] = Form.useForm();
const [fromSpin, setFormSpin] = useState(false);
const [isModalOpenComp, setIsModalOpenComp] = useState(false);
const [companyInfo, setCompanyInfo] = useState();
const [slide, setSlide] = useState(0);
const [lastname, setLastname] = useState();
const [firstname, setFirstname] = useState();
const [jobtitle, setJobtitle] = useState();
const [email, setEmail] = useState();
const [industryD, setIndustryD] = useState();

useEffect(()=>{ 
getCompany();
},[])

const getCompany = () =>{
const body = {
func: "getCompany",
userPkId: localStorage.getItem("pkId"),
};
axios.post("/api/post/Gate", body).then((res) => {
    console.log("comp: ", res.data.data);
    setCompanyData(res.data.data);
}).catch((err) => {console.log(err)});

const body2 = {
  func: "getIndustry",
  };
  axios.post("/api/post/Gate", body2).then((res) => {
      console.log("industry: ", res.data.data);
      setIndustryD(res.data.data)
  }).catch((err) => {console.log(err)});

}
const CorporationShowModal = () => {
setIsModalVisibleCorporation(true);
};
const selectBefore = (
<Form.Item name="before" noStyle rules={[{required: true, message: "Please select your protal!"}]}>
<Select className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
</Select>
</Form.Item>
);
const selectAfter = (
<Form.Item name="after" noStyle rules={[{required: true, message: "Please select your dot!"}]}> 
<Select className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".mn">.mn</Option>
    <Option value=".io">.io</Option>
    <Option value=".org">.org</Option>
</Select>
</Form.Item>
);
const cancelCompany = () => {
form.resetFields();
setIsModalVisibleCorporation(false);
};
const onFinish = (values) => {
console.log("company: ", values);
//company ilgeeh
const body = {
    func: "companySend",
    userPkId: localStorage.getItem("pkId"), 
    totalAnnualRevenue: values.totalAnnualRevenue,
    companyName: values.companyName,
    country: values.country, 
    employees: values.employees,
    additionalInformation: values.additionalInformation,
    website: values.before + values.website + values.after,
    industry: values.industry,
    firstname: firstname,
    lastname: lastname,
    jobtitle: jobtitle,
    email: email,
    phone: 95732047,
    state: 1,
};
axios.post("/api/post/Gate", body).then((res) => {
    message.success("Succes");
    // userCompany();
    getCompany();
    setIsModalVisibleCorporation(false);
    }).catch((err) => {
    message.error("Error");
    }); 
}; 
const onFinishFailed = (errorInfo) => {
console.log("Failed:", errorInfo);
message.error("Please fill in all fields!"); 

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
const clearAll = () => {
setFilteredInfo({});
setSortedInfo({});
};
const handleChangeTable = (pagination, filters, sorter) => {
// setSpinner(true);
// console.log('Various pagination: ', pagination);
// setTableParams({
//     pagination,
//     filters,
//     ...sorter,
//   });
// // setPagiValue2(page);
// // setPagiValue3(1);
// // setSpinState(true);
// console.log("page: ", pagination.current +" pageSize: "+pagination.pageSize);
// const resultPage = 0;   
// if(pagination.current == 1){
//   resultPage = 0;
//   console.log("tentsv");
// }else {
//   resultPage = pagination.current - 1; 
// } 
// resultPage = resultPage * pagination.pageSize;   
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

// console.log("result page: ", resultPage);
console.log("table change");
setFilteredInfo(filters);
setSortedInfo(sorter);
};

const editComp = (a)=>{
    setFormSpin(true)
    console.log("object: ", a.action);
    setCompanyInfo(a.action);
    setCompInfo(a.action);
    setTimeout(() => {
        setFormSpin(false)
        formComp.resetFields();
        console.log('This will run after 1 second!');
      }, 300);
    
    setIsModalVisibleEdit(true);
}
const handleCancelEdit = () =>{
    console.log("cancel");
    formComp.resetFields();
    setIsModalVisibleEdit(false);
}
const onFinishEditForm = (values) => {  
    console.log("pkID", compInfo.PkId);
    console.log("values", values);
    const body = {
      func: "editCompany",
      pkId: compInfo.PkId, 
      additionalInformation: values.additionalInformationEdit,
      companyName: values.companyNameEdit,
      employees: values.employeesEdit,

      totalAnnualRevenue: values.totalAnnualRevenueEdit,
      website: values.websiteEdit,
      country: values.countryEdit, 
      state: 6,
    }; 
    axios.post("/api/post/Gate", body).then((res) => {
        message.success("Success");
        setIsModalVisibleEdit(false);
        getCompany();
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      }); 
  };

const onFinishFailedEdit = (errorInfo) => {
// console.log("Failed:", errorInfo);
// message.error(errorInfo.errorFields[0].errors);

};
const onValuesChangeFunc = (a, b) =>{
     
}
const  compShow = (a) =>{
    console.log("a",a);
    setIsModalOpenComp(true);
    setCompanyInfo(a.action);
}
const handleCancelCompanyInfo = () =>{
    setIsModalOpenComp(false);
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
    sorter: (a, b) => a.totalAnnualRevenue.length - b.totalAnnualRevenue.length,
    // onFilter: (value, record) => record.totalAnnualRevenue.includes(value),
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
    render: (e) => <div>  
    {e.state == 2 ? (<Tooltip title="Request accepted" color="#faad14"> <Badge status="warning" text="Request accepted"  className={css.BadgeCSs}  /></Tooltip>) : 
    e.state == 3 ? (<Tooltip title="Correct your information" color="red"> <Badge status="error" text="Correct your information"  className={css.BadgeCSs} /></Tooltip>
    ) : e.state == 4 ? (<Tooltip title="Rejected your request" color="red"> <Badge status="error" text="Rejected your request"  className={css.BadgeCSs} /></Tooltip>
    ) : e.state == 5 ? (<Tooltip title="Rejected your request" color="red"> <Badge status="error" text="Rejected your request"  className={css.BadgeCSs} /></Tooltip>
    ) : e.state == 6 ? (<Tooltip title="Invitation Sent" color="purple"> <Badge status="processing" color="purple" text="Invitation Sent" className={css.BadgeCSs}  /></Tooltip>
    ) : e.state == 7 ? (<Tooltip title="Organization Onboarded" color="cyan"> <Badge status="success" color="cyan" text="Organization Onboarded" className={css.BadgeCSs} /></Tooltip>
    ) : e.state == 8 ? (<Tooltip title="Canceled" color="red"> <Badge status="error" text="Canceled"  className={css.BadgeCSs}  /></Tooltip>
    ) : e.state == 1 ? (<Tooltip title="Request pending.." color="blue"> <Badge status="processing" text="Request pending.."  className={css.BadgeCSs}  /></Tooltip>) : ("")}
    </div>, 
    filteredValue: filteredInfo.state || null,
    onFilter: (value, record) => record.state.includes(value),
    sorter: (a, b) => a.state.state - b.state.state, 
    sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {title: 'Action', key: 'action', fixed: 'right', width: 70,
    render: (b) => <div className={css.ActionCss}>
         <div>   
         <Tooltip title="Show"><Button size="small" onClick={()=>compShow(b)}  icon={<FundViewOutlined />}></Button> </Tooltip>
             {b.state.state == 3 || b.state.state == 4 || b.state.state == 5 ?<Tooltip title="Edit"><Button size="small" onClick={()=>editComp(b)} icon={<FormOutlined />}></Button></Tooltip> : ""}
           
            {/* <Tooltip title="Accept company"><Button size="small" className={css.BtnAccept}  onClick={()=> confirm(b)} icon={<CheckOutlined />}></Button> </Tooltip>
            <Tooltip title="Reject"><Button size="small" className={css.BtnReject}  onClick={()=> showModalReject(b)} icon={<FormOutlined />}></Button> </Tooltip>
            <Tooltip title="User info"><Button size="small" className={css.BtnRight}  onClick={()=> showUserInfo(b)} icon={<SolutionOutlined/>}></Button> </Tooltip> */}
        </div>   
    </div>,
    },
];
const slideFunc = () =>{
  // onFinishFailed();
  setSlide(1)
}
const selectHandle = ()=>{

}
return <div style={{width: "100%"}}>
<div>
<Button type="dashed" shape="round" onClick={CorporationShowModal}>+ Organization</Button>
{/* ================================================================ Add Corporation Modal =========================================================================== */}
<Modal title="Invite Organization" closable={false} open={isModalVisibleCorporation}footer={null} >
<div>
<Form form={form} name="basic" labelCol={{span: 9}}wrapperCol={{span: 16}} initialValues={{totalAnnualRevenue: 10000, before: "http://",after: ".com"}} 
onFinish={onFinish} onFinishFailed={onFinishFailed}autoComplete="off">
{/* <div><Button size="small" onClick={() => {form.resetFields();}}>Clear</Button></div> */}
{
  slide === 0 ? <>
<div className={css.Step1}>1. Prospect contact information: </div>
<Form.Item label="Last name" name="lastname" rules={[{required: true,message: "Please input your Last name!"}]}><Input onChange={(e)=>   setLastname(e.target.value )}/></Form.Item>
<Form.Item label="First name" name="firstname" rules={[{required: true,message: "Please input your First name!"}]}><Input onChange={(e)=>  setFirstname(e.target.value )}/></Form.Item>
<Form.Item label="Job title" name="jobtitle" rules={[{required: true,message: "Please input your Job title!"}]}><Input onChange={(e)=>  setJobtitle(e.target.value )}/></Form.Item>
<Form.Item label="Email" name="email" rules={[{required: true,message: "Please input your Email!"}]}><Input onChange={(e)=>   setEmail(e.target.value )}/></Form.Item>
 
<Form.Item wrapperCol={{offset: 15,span: 16,}}>
    <Button style={{ marginRight: "10px" }}onClick={cancelCompany}>Cancel</Button> <Button type="primary" htmlType="submit" onClick={slideFunc}>Next</Button>
</Form.Item>
  </>
  : slide === 1 ? 
  <>
<div className={css.BackCss}> 
  <Button onClick={()=>setSlide(0)} type="link"> <RollbackOutlined /></Button>
  <div className={css.Step2}>2. Prospect company information</div>
</div>
  <Form.Item label="Company name" name="companyName" rules={[{required: true,message: "Please input your Company name!"}]}><Input /></Form.Item>
<Form.Item label="Web site" name="website" rules={[{required: true,message: "Please input your Web site!"}]}><Input addonBefore={selectBefore} addonAfter={selectAfter} placeholder="" /></Form.Item>
<Form.Item label="Country" name="country" rules={[{required: true, message: "Please input your Country!"}]}><Input /></Form.Item>
<Form.Item label="Industry" name="industry" rules={[{required: true,message: "Please input your Industry!"}]}>
    <Select  style={{width: "100%"}} onChange={selectHandle} options={industryD.map((e, i)=>({label: e.nameeng, value:  e.index_,}))}/>
      </Form.Item>  
<Form.Item label="How many employees" name="employees" rules={[{required: true,message: "Please input your employees!"}]}>
    <InputNumber addonBefore={<TeamOutlined />} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/></Form.Item>
<Form.Item label="Total annual revenue" name="totalAnnualRevenue" rules={[{ required: true, message:"Please input your Total annual revenue!",}]}>
<InputNumber formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} style={{width: "100%"}}/></Form.Item>
<Form.Item label="Additional information" name="additionalInformation" rules={[{required: true,message:"Please input your Additional information!"}]}><TextArea showCount allowClear/></Form.Item>

<Form.Item wrapperCol={{offset: 15,span: 16,}}>
    <Button style={{ marginRight: "10px" }}onClick={cancelCompany}>Cancel</Button> <Button type="primary" htmlType="submit">Send</Button>
</Form.Item>
  </>
: null}

</Form>
</div>
</Modal>
</div> 
<div>
<div className={css.ClearTable}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Clear</Button></div>
<Table bordered size="small" columns={columns} dataSource={data} onChange={handleChangeTable}  scroll={{x:  1500, y: 600 }}/>
{/* ================================================================ Edit Company Modal =========================================================================== */}
<Modal title="Edit" open={isModalVisibleEdit}footer={false}  onCancel={handleCancelEdit}> 
  <Form form={formComp} name="basic" labelCol={{span: 10}} wrapperCol={{span: 16,}} onValuesChange={onValuesChangeFunc}
  initialValues={{
    companyNameEdit: compInfo.companyName,
    additionalInformationEdit:compInfo.additionalInformation,
    countryEdit: compInfo.country,
    employeesEdit: compInfo.employees,
    totalAnnualRevenueEdit: compInfo.totalAnnualRevenue,
    websiteEdit: compInfo.website,
  }} onFinish={onFinishEditForm} onFinishFailed={onFinishFailedEdit} autoComplete="off">
    {fromSpin ? <Spin className={css.Spinner}/> : 
    <>
    <div className={css.CompNameCss}>
        <div className={css.CompFlex}><div className={css.CompName}>Company name:</div><div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div></div>
        {companyInfo === undefined ? "" : 
        <div className={css.StatusCss}>
        {companyInfo.state == 2 ? (<Tooltip title="Request accepted" color="#faad14"> <Badge status="warning" text="accept request"    /></Tooltip>) : 
            companyInfo.state == 3 ? (<Tooltip title="Correct your information" color="red"> <Badge status="error" text="Correct your information"   /></Tooltip>
            ) : companyInfo.state == 4 ? (<Tooltip title="Rejected your request" color="red"> <Badge status="error" text="Rejected your request"  /></Tooltip>
            ) : companyInfo.state == 5 ? (<Tooltip title="Rejected your request" color="red"> <Badge status="error" text="Rejected your request" /></Tooltip>
            ) : companyInfo.state == 6 ? (<Tooltip title="Invitation Send..." color="purple"> <Badge status="processing" color="purple" text="Invitation Send..." /></Tooltip>
            ) : companyInfo.state == 7 ? (<Tooltip title="Organization Onboarded" color="cyan"> <Badge status="success" color="cyan" text="Organization Onboarded..." /></Tooltip>
            ) : companyInfo.state == 8 ? (<Tooltip title="Canceled" color="red"> <Badge status="error" text="Canceled"  className={css.BadgeCSs}  /></Tooltip>
            ) : companyInfo.state == 1 ? (<Tooltip title="Request pending.." color="blue"> <Badge status="processing" text="Request pending.." /></Tooltip>) : ("")}
        </div>}
    </div> 
    <Form.Item label="Company name"name="companyNameEdit" rules={[{required: true,message:"Please input your Company name!"}]}><Input /></Form.Item>  
    <Form.Item label="Web site" name="websiteEdit" rules={[{required: true, message:"Please input your Web site!"}]}><Input /></Form.Item>
    <Form.Item label="Country" name="countryEdit" rules={[{ required: true, message:"Please input your Country!"}]}><Input /></Form.Item>
    <Form.Item label="How many employees" name="employeesEdit" rules={[{required: true,message:"Please input your How many employees!"}]}> 
    <InputNumber addonBefore={<TeamOutlined />} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
    </Form.Item>
    <Form.Item label="Total annual revenue" name="totalAnnualRevenueEdit" rules={[{required: true,message:"Please input your Total annual revenue!"}]}>
    <InputNumber formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} style={{width: "100%"}}/></Form.Item>
    <Form.Item label="Additional information" name="additionalInformationEdit" rules={[{ required: true, message:"Please input your Additional information!"}]}><TextArea showCount allowClear/></Form.Item>  
    <Form.Item wrapperCol={{offset: 8,span: 16,}}><Button style={{ marginRight: "10px" }} onClick={() =>setIsModalVisibleEdit(false)}>Cancel</Button> <Button type="primary"htmlType="submit">Submit</Button></Form.Item>
    </>
    }
</Form>   
</Modal>
{/* ================================================================ Company Info Modal =========================================================================== */}
<Modal title="Company info" footer={null} open={isModalOpenComp} onCancel={handleCancelCompanyInfo}>
<>
<div className={css.CompNameCss}>
<div className={css.CompFlex}><div className={css.CompName}>Company name:</div><div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div></div>
{companyInfo === undefined ? "" : 
<div className={css.StatusCss}>
{companyInfo.state == 2 ? (<Tooltip title="Request accepted" color="#faad14"> <Badge status="warning" text="accept request"    /></Tooltip>) : 
    companyInfo.state == 3 ? (<Tooltip title="Correct your information" color="red"> <Badge status="error" text="Correct your information"   /></Tooltip>
    ) : companyInfo.state == 4 ? (<Tooltip title="Rejected your request" color="red"> <Badge status="error" text="Rejected your request"  /></Tooltip>
    ) : companyInfo.state == 5 ? (<Tooltip title="Rejected your request" color="red"> <Badge status="error" text="Rejected your request" /></Tooltip>
    ) : companyInfo.state == 6 ? (<Tooltip title="Invitation Send..." color="purple"> <Badge status="processing" color="purple" text="Invitation Send..." /></Tooltip>
    ) : companyInfo.state == 7 ? (<Tooltip title="Organization Onboarded" color="cyan"> <Badge status="success" color="cyan" text="Organization Onboarded..." /></Tooltip>
    ) : companyInfo.state == 8 ? (<Tooltip title="Canceled" color="red"> <Badge status="error" text="Canceled"  className={css.BadgeCSs}  /></Tooltip>
    ) : companyInfo.state == 1 ? (<Tooltip title="Request pending.." color="blue"> <Badge status="processing" text="Request pending.." /></Tooltip>) : ("")}
{/* {compInfo.state == 2 ? (<Tooltip title="Request accepted"><Badge status="warning" text="Request accepted" style={{fontSize: "12px", color: "#faad14"}}/></Tooltip>
) : rejectValue == 3 ? (<Tooltip title="Correct your information"><Badge color="red" status="processing" text="Correct your information" style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
//ene Edit hiii gsn state
) : rejectValue == 4 ? (<Tooltip title="Rejected"><Badge color="red" status="processing"text="Rejected"style={{fontSize: "12px", color: "#f5222d"}}/></Tooltip>
) : rejectValue == 5 ? (<Tooltip title={companyInfo === undefined ? "": others}><Badge color="gray" status="processing"text="Others"style={{fontSize: "12px", color: "#808080"}}/></Tooltip>
) : rejectValue == 6 ? (<Tooltip title="Invitation Send..."><Badge color="purple" status="processing" text="Invitation Send." style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>
) : rejectValue == 7 ? (<Tooltip title="Organization Onboarded..."><Badge color="cyan" text="Org id" style={{fontSize: "12px", color: "#13c2c2"}}/></Tooltip>
) : rejectValue == 8 ? (<Tooltip title="Canceled"><Badge status="error" text="C" style={{fontSize: "12px", color: "#722ed1"}}/></Tooltip>) : (<Tooltip title="..."><Badge status="default" text="..." /></Tooltip>)}  */}
</div>}
</div> 
<div className={css.imgL}>
    {/* <div className={css.ImageCss}><Image preview={false} alt="Obertech" src={"/img/user.png"} className={css.Img}/></div> */}
    <div>
      <div style={{color: "rgb(14 14 14)",fontWeight: "600"}}>1. Prospect contact information</div>
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
    </div>


    <div style={{color: "rgb(14 14 14)",fontWeight: "600", marginTop: "15px"}}>2. Prospect company information</div>
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
</Modal>
</div>
</div>
}
export default Company