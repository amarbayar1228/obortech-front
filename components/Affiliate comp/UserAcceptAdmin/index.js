import { Badge, Button, Collapse, Descriptions, Empty, Input, message, Modal, Radio, Select, Space, Spin, Table, Tooltip, Image} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./style.module.css";
import { Tabs } from "antd";
import Highlighter from "react-highlight-words";
import {SearchOutlined ,EditOutlined, ArrowLeftOutlined ,SolutionOutlined} from "@ant-design/icons";
import BasketContext from "../../../context/basketContext/BasketContext";
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const UserAcceptAdmin = () => {
  const basketContext = useContext(BasketContext);
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState([]); 
  const [isModalOpenUserInfo, setIsModalOpenUserInfo] = useState(false);
  const [cancelData, setCancelDate] = useState([]);
  const [value, setValue]= useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeValue, setChangeValue] = useState("all");
  const [spinState2, setSpinState2] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [userPkId, setUserPkId]  = useState();
  const [qBoolean, setQboolean] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const searchInput = useRef(null);
  useEffect(() => {
    console.log("user accept");
    // if (changeValue === "all") {
      confirmUserList();
    // }
  }, []);
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
    console.log('Various parameters', pagination, filters, sorter);
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
  const confirmUserList = () => {
    setSpinState2(true); 
    const body = {
      func: "acceptUsers",
      userToken: localStorage.getItem("pkId"),
    };
    axios.post("/api/post/Gate", body).then((res) => {
      console.log("all data: ", res.data.data);
        setSpinState2(false);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // message.error(err);
      }); 
  };
  const handleChange = (value) => {
    setChangeValue(value);
    if (value == "cancel") {
      getUserCancel();
    } else if (value == "all") {
      confirmUserList();
    }
  };
  const getUserCancel = () => {
    setSpinState2(true);
    const body = {
      pkId: localStorage.getItem("pkId"),
    }; 
  };
const modalFunc = (a) =>{
  console.log("name: ", a.all.firstname);
  console.log("pkID:",a.all.pkId );
  console.log("all: ", a.all);
  setUserPkId(a.all.pkId)
  setIsModalOpen(true);
}
const handleOk = () =>{ 
  console.log("pkId: ", userPkId);
  console.log("radio: ", value);
  const body = {
  func: "userAccept",
  pkId: userPkId,
  userToken: localStorage.getItem("pkId"),
  state: value,
  };
  axios.post("/api/post/Gate", body).then((res) => {
    message.success("Success");   
    basketContext.getUserProfileFunction();
    confirmUserList();
    setIsModalOpen(false)
  })
  .catch((err) => {console.log(err)});  

}
const handleCancel = () =>{
  console.log("object");
  setIsModalOpen(false)
}
const onChangeRadio = (e) =>{
  console.log("radio: ", e.target.value);
  setValue(e.target.value);
}
const showUserInfo = (a) =>{
  console.log("a", a);
  // question
  const question = {
    func:"getTypes",  
    parid:0,
    type_:3
  }
  axios.post("/api/post/Gate", question).then((res)=>{
    console.log("Header", res.data.data); 
    setUserQuestion(res.data.data)
    // setQuestionData(res.data.data)
  }).catch((err)=>{console.log("err", err)})

// question answered
  const answered = {
    func:"getQuest", 
    pkId: a.all.pkId
  } 
  axios.post("/api/post/Gate", answered).then((res)=>{
    console.log("getIndustry:", res.data.data); 
    if(res.data.data === ""){
      console.log("null");
    }else{
      const array = JSON.parse(res.data.data);
      setUserAnswer(array);

      console.log("arr: ", array);
    }
   
  }).catch((err)=>console.log("err", err));


  setIsModalOpenUserInfo(true);
  setUserInfo(a);
}
const handleCancelUserInfo = () =>{
  setIsModalOpenUserInfo(false);
}
  const data = userData.map((r, i)=>(
    {
      key: i,
      lastname: r.lastname,
      firstname: r.firstname,
      jobtitle: r.jobtitle,
      address: r.address,
      email: r.email,
      state: r.state, 
      phone: r.phone,
      all: r,
    } 
));
  const columns = [
    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   key: 'date', 
    //   width: 100,
    //   fixed: 'left', 
    //   ...getColumnSearchProps('date'), 
    //   filteredValue: filteredInfo.date || null,
    //   onFilter: (value, record) => record.date.includes(value),
    //   // sorter: (a, b) => a.date.length - b.date.length,
    //   sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
    //   ellipsis: true,
    // },
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
      // width: 120,
      // ...getColumnSearchProps('state'), 
      render: (a) => <div >
        {a == 3 ? (<Tooltip title="Reject" color="red"> <Badge status="error" text="Reject" /> </Tooltip>) : a == 2 ? (<Tooltip title="Request accepted" color="green"> <Badge status="success" text="Request accepted" /> </Tooltip>) : <Tooltip title="Success"> <Badge color="blue" status="success" text="Edited" /> </Tooltip>}</div>,
            filteredValue: filteredInfo.state || null,
            onFilter: (value, record) => record.state.includes(value),
            sorter: (a, b) => a.state - b.state,
            sortOrder: sortedInfo.columnKey === 'state' ? sortedInfo.order : null,
            ellipsis: true,
    },
    
    {title: 'Action',key: 'operation',fixed: 'right',width: 80,
      render: (a) => <div className={css.ActionCss}> <Tooltip title="State change"><Button type="dashed" icon={<EditOutlined />} onClick={()=>modalFunc(a)} size="small"></Button></Tooltip>
       <Tooltip title="User info"><Button size="small" className={css.BtnRight}  onClick={()=> showUserInfo(a)} icon={<SolutionOutlined/>}></Button> </Tooltip>
      </div>,
    },
  ];


  return (
    <div className={css.DivideCss}>
      <div>
        {/* <Select defaultValue="all" style={{ width: 120, marginLeft: "10px"}} onChange={handleChange}>
          <Option value="all">All</Option>
          <Option value="cancel">Cancel</Option>
        </Select> */}
      </div>
      <div className={css.ScrollCss}>
        {changeValue == "all" ? (
          <>
            {spinState2 === true ? (<div><Spin className={css.SpinCss} size="large"></Spin></div>) : ("")}
            {userData[0] ? (
              <div>
              {/* <Space style={{marginBottom: 16}}><Button type="dashed" onClick={clearAll} icon={<ClearOutlined />}>Table sort clear</Button></Space> */}
              <Table size="small" columns={columns} dataSource={data} onChange={handleChangeTable}  scroll={{x:  1000}}/> 
              <Modal title="User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <div className={css.Choose}>
              <div className={css.Text}> Choose: </div>
              <Radio.Group onChange={onChangeRadio} value={value}>
                  <Radio value={2}>Accept user</Radio>
                  <Radio value={3}>Cancel user</Radio> 
              </Radio.Group>
              </div>
              </Modal> 

              
<Modal title="user Info" open={isModalOpenUserInfo} onCancel={handleCancelUserInfo} footer={null}>
{userInfo === undefined ? "" :
<div className={css.Cont}>
{qBoolean ? 
  <div> 
    <div style={{display: "flex", alignItems: "center", fontSize: "15px", color: "#4d5052", fontWeight: "600"}}><Button type="link" icon={<ArrowLeftOutlined />} onClick={()=>setQboolean(false)}></Button> <div>Question</div>
    </div>

    <div> 
      {userAnswer === "" ? null :
<>
{userQuestion.map((e, index)=>(
  <div key={index} style={{fontSize: "13px", fontWeight: "600", color: "#4d5052", marginLeft: "32px"}}> 
    <div>{e.nameeng} </div>  
    <div>
      {userAnswer.map((e, i)=>(
        <div key={i} style={{marginLeft: "15px", fontWeight: "500"}}>
        {index === i ?
        <div>{e}</div> : ""
      }
        </div>
      ))} 
    </div>
  </div>

))}
</>
}
    </div>
  </div>
  :
  <div className={css.imgL}>
  <div className={css.ImageCss}>
    <Image preview={false} alt="Obertech" src={"/img/user.png"} style={{width: "100px"}} className={css.Img}/></div>
  <div style={{marginLeft: "10px"}}> 
    <div style={{display: "flex", borderBottom: "1px solid #ccc", padding: "10px 0px"}}>
      <div style={{width: "120px", color: "#4d5052", fontWeight: "600"}}>Full name:</div>
      <div style={{width: "250px", color: "#777d89"}}>{userInfo.lastname}  {userInfo.firstname}</div>
    </div>
    <div style={{display: "flex", borderBottom: "1px solid #ccc", padding: "10px 0px"}}>
      <div style={{width: "120px", color: "#4d5052", fontWeight: "600"}}>Email:</div>
      <div style={{width: "250px", color: "#777d89"}}>{userInfo.email}</div>
    </div>
    <div style={{display: "flex", borderBottom: "1px solid #ccc", padding: "10px 0px"}}>
      <div style={{width: "120px", color: "#4d5052", fontWeight: "600"}}>Jobtitle:</div>
      <div style={{width: "250px", color: "#777d89"}}>{userInfo.jobtitle}</div>
    </div>
    <div style={{display: "flex", borderBottom: "1px solid #ccc", padding: "10px 0px"}}>
      <div style={{width: "120px", color: "#4d5052", fontWeight: "600"}}>Phone: </div>
      <div style={{width: "250px", color: "#777d89"}}>{userInfo.phone}</div>
    </div>
    <div style={{display: "flex", borderBottom: "1px solid #ccc", padding: "10px 0px"}}>
      <div style={{width: "120px", color: "#4d5052", fontWeight: "600"}}>Address:</div>
      <div style={{width: "250px", color: "#777d89"}}>{userInfo.address}</div>
    </div>
    
    <div style={{marginTop: "10px"}}><Button type="primary" onClick={()=>setQboolean(true)}>Question</Button></div>
  </div>
 
  
  </div>
}
</div>
}
</Modal>

              </div>
            ) : spinState2 === true ? ("") : (<Empty />)}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default UserAcceptAdmin;
