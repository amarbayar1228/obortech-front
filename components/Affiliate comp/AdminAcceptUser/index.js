import { Badge, Button, Input, Modal, Radio, Space, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css"
import {SearchOutlined ,EditOutlined,ClearOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const AdminAcceptUser  = () =>{
    const [userData, setUserData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchInput = useRef(null); 
    const [value, setValue] = useState(2);
  
    useEffect(()=>{
    console.log("AdminAcceptUser");
    getUserAcceptAll();
    },[])

 // Operatoruudiin batalgaajuulsan hereglegchvvd
  const getUserAcceptAll = () => {
    setSpinner(true);
    const body = {func: "acceptUsers", userToken: "all"};
    axios.post("/api/post/Gate", body).then((res) => {   
        setUserData(res.data.data); 
        console.log("res: ", res.data.data);
        setSpinner(false);
      })
      .catch((err) => {console.log(err); });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => { 
  console.log("a: ", id); 
}
const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
    console.log('Various parameters', sorter);
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

  const data = userData.map((r, i)=>(
      {
        key: i,
        lastname: r.lastname,
        firstname: r.firstname, 
        jobtitle: r.jobtitle,
        address: r.address,
        email: r.email,
        phone: r.phone,
        state: r.state,
        pkId: r.pkId
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
        title: 'Last name',
        dataIndex: 'lastname',
        key: 'lastname', 
        // width: 120,
        ...getColumnSearchProps('lastname'), 
        filteredValue: filteredInfo.lastname || null,
        onFilter: (value, record) => record.lastname.includes(value),
        // sorter: (a, b) => a.lastname.length - b.lastname.length,
        sortOrder: sortedInfo.columnKey === 'lastname' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'First name',
        dataIndex: 'firstname',
        key: 'firstname', 
        // width: 120,
        ...getColumnSearchProps('firstname'), 
        filteredValue: filteredInfo.firstname || null,
        onFilter: (value, record) => record.firstname.includes(value),
        sorter: (a, b) => a.firstname.length - b.firstname.length,
        sortOrder: sortedInfo.columnKey === 'firstname' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
          title: 'Job title',
          dataIndex: 'jobtitle',
          key: 'jobtitle', 
          // width: 120,
          ...getColumnSearchProps('jobtitle'), 
          filteredValue: filteredInfo.jobtitle || null,
          onFilter: (value, record) => record.jobtitle.includes(value),
          sorter: (a, b) => a.jobtitle.length - b.jobtitle.length,
          sortOrder: sortedInfo.columnKey === 'jobtitle' ? sortedInfo.order : null,
          ellipsis: true,
        },
      {
        title: 'Phone number',
        dataIndex: 'phone',
        key: 'phone', 
        // width: 120,
        ...getColumnSearchProps('phone'), 
        filteredValue: filteredInfo.phone || null,
        onFilter: (value, record) => record.phone.includes(value),
        // sorter: (a, b) => a.phone.length - b.phone.length,
        sortOrder: sortedInfo.columnKey === 'phone' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email', 
        // width: 120,
        ...getColumnSearchProps('email'), 
        filteredValue: filteredInfo.email || null,
        onFilter: (value, record) => record.email.includes(value),
        // sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address', 
        // width: 120,
        ...getColumnSearchProps('address'), 
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        // sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: 'Status',
        dataIndex: 'state',
        key: 'state', 
        fixed: "right",
        width: 100,
        // ...getColumnSearchProps('state'), 
        render: (a) => <div >
          {a == 3 ? (<Badge status="error" text="Reject" />) : (<Badge status="processing" text="Request" />)}</div>,
        filteredValue: filteredInfo.state || null,
        onFilter: (value, record) => record.state.includes(value),
        sorter: (a, b) => a.state - b.state,
        sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
        ellipsis: true,
      },    
      {
        title: 'Action',
        key: 'pkId',
        fixed: 'right',
        width: 80,
        render: (a) => <div className={css.ActionCss}><Button onClick={showModal} type="dashed" icon={<EditOutlined />}></Button>
      
        </div>,
      },
    ];
    return <div>
        {spinner ? <Spin size="large" className={css.SpinCss} /> : 
        <div>
             <Space style={{marginBottom: 16}}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Table sort clear</Button></Space>
            <Table size="small" columns={columns} dataSource={data}  onChange={handleChangeTable}  scroll={{x:  1200, }}/> 
            <Modal title="User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={2}>Accept user</Radio>
                <Radio value={3}>Cancel user</Radio> 
            </Radio.Group>
            </Modal>
        </div> 
        }
    </div>
}

export default AdminAcceptUser;