import {Badge,Button,Collapse,Descriptions,Divider,Empty,Form,Image,Input,InputNumber,message,Modal,Pagination,Result,Select,Spin,Table,Tooltip} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import {EditOutlined,ArrowLeftOutlined,InfoCircleOutlined,CheckCircleOutlined,ExclamationCircleOutlined,} from "@ant-design/icons";
import axios from "axios";
import css from "./style.module.css";
import BasketContext from "../../context/basketContext/BasketContext";
import { Router, useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";
import Company from "../../components/Referral comp/Company";
import QuestionDetails from "../../components/Referral comp/QuestionDetails";
const { Panel } = Collapse; 
const { Option } = Select;
const Referral = () => {
  const basketContext = useContext(BasketContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [question, setQuestion] = useState(0);
  // const [questionData, setQuestionData] = useState(0);
  // const [questionArray, setQuestionArray] = useState([]);
  // const [ques1, setQues1] = useState(0); 
  // const [quesValue1, setQuesValue1] = useState(0);  
  const router = useRouter();  
  const [spin, setSpin] = useState(false);
 

  const [formUser] = Form.useForm();
  const [form] = Form.useForm(); 
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => { 
    //setTime 
      userCompany(); 
  }, []);
  const userCompany = () => {
    //userPkId gaar awchirj bgn
      if (localStorage.getItem("pkId")) {
        const body = {
          func: "getUserInfo",
          pkId: localStorage.getItem("pkId"),
        };
        axios.post("/api/post/Gate", body).then((res) => { 
          setUserInfo(res.data.data);
          }).catch((err) => {console.log(err)});
      }
    
    // const question = {
    //   func:"getTypes",  
    //   parid:0,
    //   type_:3
    // }
    // axios.post("/api/post/Gate", question).then((res)=>{
    //   // console.log("Header", res.data.data); 
    //   setQuestionData(res.data.data)
    // }).catch((err)=>{console.log("err", err)})
    // questions(); 
};

// const questions = () =>{
// // question 1
//   const question1 = {
//     func:"getTypes",  
//     parid:32,
//     type_:3
//   }
//   axios.post("/api/post/Gate", question1).then((res)=>{
//     console.log("Header details", res.data.data); 
//     setQues1(res.data.data)
//   }).catch((err)=>{console.log("err", err)})
// }
const showModal = () => {
  setIsModalVisible(true);
};
const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  console.log("cancel");
  formUser.resetFields();
  setIsModalVisible(false);
};
const data = [
    {
      key: 1, 
      img: userInfo ?  userInfo.img : "",
      firstname: userInfo ?  userInfo.firstname : "",
      lastname: userInfo ?  userInfo.lastname : "",
      state: userInfo ?  userInfo.state : "",
      action: userInfo ?  userInfo.state : "",
    }];
const columns = [
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
    title: <div className={css.TableTitle}>First name</div>,
    dataIndex: 'firstname',
    key: 'firstname',  
    ellipsis: true,
    },
    {
    title: <div className={css.TableTitle}>Last name</div>,
    dataIndex: 'lastname',
    key: 'lastname',  
    // sorter: (a, b) => a.lastname.length - b.lastname.length, 
    ellipsis: true,
    }, 
    
    {
    title: <div className={css.TableTitle}>Status</div>,
    dataIndex: 'state',
    key: 'state', 
    fixed: "right",
    width: 150, 
    render: (a) => <div>
       
        {a == 1 ? (<Tooltip title="Request pending"><Badge status="processing" text="Request pending" style={{color: "rgb(24 144 255)", fontWeight: "600"}}/></Tooltip>) : 
        a == 0 ? <Tooltip title="Invisible">  <Badge status="default" text="invisible" style={{color: "#8d8d8d",fontWeight: "600"}}/></Tooltip> : 
        a == 3 ? <Tooltip title="Rejected">  <Badge status="error" text="Rejected" style={{color: "red",fontWeight: "600"}}/></Tooltip>  : ""
        }
    </div>,   
    ellipsis: true,
    }, 

    {title: <div className={css.TableTitle}>Action</div>,   key: 'action', fixed: 'right', width: 140,
    render: (b) => <div className={css.ActionCss}>
         <div style={{display: "flex"}}> 
         {/* {console.log("a", b)} */}
          {b.state == 3 ? <Button onClick={()=> router.push("/profile")}>Edit</Button> : ""}
         {/* <StatusChangeModal addItemStatus={b.state} addItemGetItems={getItems} />
         <ItemEdit addItemStatus={b.state} addItemGetItems={getItems} typeLevel={typeLevel}/>
         <ItemDel addItemStatus={b.state} addItemGetItems={getItems}/>  */}
        </div>   
    </div>,
    },
];
 
return (
<BaseLayout pageName="referral">
  <div className={css.LayoutRef}>
    <div className={css.DisplayLayout}>
 
{basketContext.userInfoProfile ? (
<>
{userInfo.state == 2 ? (
  ""
) : (
  <div className={css.Layout}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Divider orientation="left">User information</Divider> <Divider type="vertical" />
      <Tooltip title="More information on user invitations"><InfoCircleOutlined style={{ fontSize: "18px" }} /></Tooltip>
    </div>
    <div>

    {spin === true ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center"}}/> : ""}
      {userInfo.state === 1 ? (
        <div style={{ marginTop: "-30px" }}>
        <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/send4.png" width={100}/>} subTitle="Admin will check your request and reply soon." title="Your request has been sent to an administrator."/>

        <Table bordered size="small" columns={columns} dataSource={data}/>
        </div>
      ) : (
        <> 
        <div style={{ marginTop: "-30px" }}>
          {userInfo.state === 0 ? 
          <>
          <Button type="dashed" shape="round" onClick={showModal} style={{marginTop: "30px"}}>+ Information</Button>
          <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/info.png" width={100}/>} subTitle="Then you will be able to invite company. " title="Fill in your details."/>
          </> 
         
           :
          <>
             <Button type="dashed" shape="round" onClick={showModal} style={{marginTop: "30px"}}>+ Information</Button>
            <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/info.png" width={100}/>} subTitle="Correct your information!" title="Your request has been rejected"/>
           <Table bordered size="small" columns={columns} dataSource={data}/>
          </>  
          } 
        </div>
        </>
      )}
<Modal title="Form for Affiliate" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={700}>
          <div> 
            {question === 0 ? 
            <div style={{padding: "0px 20px"}}>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Email: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.email}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Web site: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.website}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Country: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.countryregion}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>City: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.city}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Address: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.address}</div>
              </div>
              <div className={css.FormAffiliate}>
                <div className={css.FormTitle}>Phone number: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.phone}</div>
              </div>
              <div className={css.FormAffiliate} style={{marginBottom: "10px"}}>
                <div className={css.FormTitle}>Job title: </div>
                <div className={css.FormDescrip}>{basketContext.userInfoProfile.jobtitle}</div>
              </div>
              {basketContext.userInfoProfile.firstname === "-" ? 
              <div><Button onClick={()=> router.push("profile")} icon={<EditOutlined />} >Edit profile</Button> </div>
              : <div>
                  <div style={{color: "#4d5052", fontWeight: "600"}}> If you are a Standard member and wish to apply for the Affiliate Program, you will be requested to fill in the following forms. </div> 
                  <Button type="primary" onClick={()=> setQuestion(1)} size="large" style={{marginTop: "20px", marginBottom: "10px"}} >Fill out the form</Button> 
                  </div>
              } 
            </div> 
            : <div>  
                <div className={css.BackCss}> 
                  <Button onClick={()=> setQuestion(0)} size="small" type="link"> <ArrowLeftOutlined /></Button> 
                  <div className={css.Title}> Please fill in the questions below correctly?</div>
                </div>
                  <QuestionDetails handleOk={handleOk} 
                  getUserInfo={userCompany}
                  />
              </div>}
          </div>

</Modal>
    </div>
  </div>
)} 

{/* ----------------------------------------------- Company ------------------------------------------------------------------------------------------ */}

{userInfo.state == "2" ? (
<div className={css.Layout}>
<div style={{background: "#fff"}}>
  <div style={{ display: "flex", alignItems: "center" }}>
    <Divider orientation="left">Organization list</Divider> <Divider type="vertical" />
    <Tooltip title="More information on company invitations" placement="topRight"> <InfoCircleOutlined style={{ fontSize: "18px" }} /></Tooltip>
  </div>
  {/* {lstate == 2 ? ( */}
<div className={css.Corporation}>
  <Company />


{/* --------------------------------------------------Incentive============================================================= */}
{/* {spinState == true ? (<div><Spin /></div>) : ("")}
{insentive[0] ? (
<div className={css.InsentiveCon}>
  <div>
    <Divider orientation="left">
      <div style={{ display: "flex", alignItems: "center",}}>
        <Image alt="Obertech" preview={false} src="/img/incentive.png"style={{width: "45px",marginRight: "7px",background: "#fff",borderRadius: "20px",}}/>
        <div className={css.IncentiveText}>INCENTIVE</div>
      </div>
    </Divider>
  </div>
  <div className={css.InsentiveScroll}>
    {insentive.map((e, i) => (
      <div key={i} className={css.ContainerInvs}>
        <div className={css.DateCss}>{e.date} </div>
        <div className={css.FeeLayout}>
          <div className={css.ImgCss}><Image alt="Obertech" preview={false}src="/img/usdIcon.png.crdownload"/></div>
          <div className={css.FeeCompleted}>
            <div className={css.CoinCss}>$ {e.fee}</div>
            <div className={css.CompletedCss}>Completed</div>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className={css.TotalPriceCss}>Total price: {incentiveTotalPrice}$</div>
</div>
) : (
""
)} */}
</div>
</div>
</div>
) : (
  ""
)}
</>
) : (
""
)}

  {/* Edit Modal */}
  <Modal>
    <div>
      Edit
    </div>
  </Modal>
</div>
</div>
</BaseLayout>
  );
};
export default Referral;
