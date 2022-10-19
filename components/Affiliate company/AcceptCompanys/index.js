import { Badge, Button, Form, Input, Modal, Radio, Space, Spin, Table, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import {SearchOutlined ,EditOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Reject from "./Reject";
import TextArea from "antd/lib/input/TextArea";
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
  const [modalTitle, setModalTitle] = useState("Organzation id send");
  const [modalCount, setModalCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectValue, setRejectValue] = useState(1); 
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [form] = Form.useForm();
  const showModal = (a) => {
    console.log("showModal: ", a.action);
    
    if(a.action.state === 6){
        setModalTitle("Organzation id send");
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
    
    setCompanyData(res.data.data); 
    console.log("resdata: ", res.data.data);
    setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 60, 
        },
      });
      setSpinner(false);
      setLoading(false);
    }) 
    .catch((err) => {
    console.log(err);
    });  
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
  const onChangeReject = (e) =>{
    console.log("reject change; ", e.target.value);
    setRejectValue(e.target.value);
  }
 
  const showModalReject = (a) =>{
    console.log("reject: ", a);
    setIsModalOpenReject(true);
  }
  const handleCancelReject = () =>{
    setIsModalOpenReject(false);
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
    width: 220,
    // ...getColumnSearchProps('state'), 
    render: (a) => <div>
        {a.state == 2 ? (<Badge status="warning" text="Request accepted"/>
        ) : a.state == 3 ? (<Badge color="red" status="processing"text="Rejected"/>
        //ene Edit hiii gsn state
        ) : a.state == 4 ? (<Badge color="red" status="processing"text="Rejected"/>
        ) : a.state == 5 ? (<Tooltip title={a.others}><Badge color="gray" status="processing"text="Others"/></Tooltip>
        ) : a.state == 6 ? (<Badge color="purple" status="processing" text="Invitation Send..."/>
        ) : a.state == 7 ? (<Badge color="cyan" text="Organization Onboarded..."/>
        ) : a.state == 8 ? (<Badge status="error" text="Canceled" />) : (<Badge status="default" text="..." />)}
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
    width: 300,
    render: (b) => <div className={css.ActionCss}>
        {b.orgId === "-" ? <div> 
            {b.action.state === 6 ? <Button type="primary" style={{fontWeight: "500"}} onClick={()=>showModal(b)}>OrgId insert</Button> 
            : <Button type="primary" style={{fontWeight: "500"}}>Inventation send</Button>
            }
            <Button onClick={()=> showModalReject(b)}>Reject</Button> 
        </div> : <div> <Button onClick={()=> showModal(b)}>Incentive</Button></div>}
    
    </div>,
    },
];
    
const  onFinish= (values) =>{ 
console.log("values: ", values); 
}
const onFinishFailed = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
const  onFinishReject= (values) =>{ 
    console.log("values: ", values); 
    }
const onFinishFailedReject = (errInfo)=>{
console.log("errInfo: ", errInfo);
// formAddItem.resetFields(); 
}
const onChangeRadio = (a) =>{
    console.log("radio: ", a.target.value);
}
return <div>
        {spinner ? <Spin className={css.SpinCss}/> : 
        <div> 
             <Space style={{marginBottom: 16}}>
            {/* <Button onClick={setAgeSort}>Sort age</Button> */}
            
            {/* <Button onClick={clearFilters}>Clear filters</Button> */}
            <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table size="small" columns={columns} dataSource={data} onChange={handleChangeTable} loading={loading}  scroll={{x:  2000, }} pagination={tableParams.pagination}/> 
            {/* ------------------------------------------------Modals------------------------------------ */}
            <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form form={form} name="normal_login" className={css.LoginForm}  
                labelCol={{span: 8,}} wrapperCol={{span: 16,}} 
                onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {modalCount === 1 ?  
                <>
                 <div className={css.CompNameCss}>
                    <div>Company name:</div>
                    <div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div>
                 </div>
                 
                <Form.Item label={"Organzation ID"} name={"title"}   rules={[{required: true,message: "Please input your Organzation id!"}]}> 
                    <Input placeholder={"Organzation id"} allowClear/>
                </Form.Item>
                </>
                : modalCount === 2 ? 
                <div>
                    <div className={css.CompNameCss}>
                    <div>Company name:</div>
                    <div className={css.CompTitle}>{companyInfo === undefined ? "": companyInfo.companyName}</div>
                 </div>
                <Form.Item label={"Percentage choose"} name={"percentageChoose"}   rules={[{required: true,message: "Please choose"}]}>
                    <Radio.Group onChange={onChangeRadio} value={value}>
                    <Space direction="vertical">
                    <Radio value={1}>Percentage</Radio>
                    <Radio value={2}>Dollar</Radio>
                    <Radio value={3}>Coin</Radio></Space>
                    </Radio.Group> 
                </Form.Item>
                <Form.Item label={"Incenitve percent"} name={"percentage"}   rules={[{required: true,message: "input your incentive"}]}>
                    <Input placeholder="incenitve percent" />
                </Form.Item>
                </div>
                : "Reject"
                }
                {/* <div><Button onClick={()=> form.resetFields()}>Reset</Button></div> */}
                <Form.Item style={{display: "flex", justifyContent: "flex-end"}}>
                    <div ><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div>
                </Form.Item> 
                </Form> 
            </Modal>
                {/* ------------------------------------------------Reject Modals------------------------------------ */}
            <Modal title="Reject" open={isModalOpenReject} onCancel={handleCancelReject} footer={null}>
            <Form form={form} name="normal_login" className={css.LoginForm} labelCol={{span: 8,}} wrapperCol={{span: 16,}} onFinish={onFinishReject} onFinishFailed={onFinishFailedReject}>
                 <Form.Item label={"Choose"} name={"choose"}   rules={[{required: true,message: "Please choose"}]}>
                 <Radio.Group onChange={onChangeReject} value={rejectValue}>
                <Space direction="vertical">
                    <Radio value={3}>Correct your information</Radio>
                    <Radio value={4}>Rejected</Radio> 
                    <Radio value={5}> More... {rejectValue === 5 ? (<TextArea style={{width: 200,marginLeft: 10,}}/>) : null} 
                    </Radio>
                </Space>
                </Radio.Group>
                 </Form.Item>
                
                <Form.Item style={{display: "flex", justifyContent: "flex-end"}}>
                    <div ><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div>
                </Form.Item> 
            </Form> 
            </Modal>
        </div>
        }
</div>
}
export default AcceptCompanys;