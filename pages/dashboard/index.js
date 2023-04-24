import { useContext, useEffect, useRef, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { Avatar, Badge, Button, Divider, Image, Input, List, message, Modal, Select, Spin, Steps, Table, Typography  } from "antd";
import { Statistic, Card, Row, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons"; 
import css from "./style.module.css";
import BasketContext from "../../context/basketContext/BasketContext";
import { useTranslation } from "next-i18next";
import Spinner from "../../components/Spinner";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const basketContext = useContext(BasketContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWithdraw, setIsModalOpenWithdraw] = useState(false);
  const recaptchaRef = useRef();
  const [userFormCapt, setUserFormCapt] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [getDollarSt, setDollarSt] = useState([]);
  const [getCoinSt, setCointSt] = useState([]);
  const [getMntTotal, setMntTotal] = useState(0);
  const [getDollarTotal, setDollarTotal] = useState(0);
  const [showWallet, setShowWallet] = useState(0)
const onChangeCaptcha = (a) =>{ 
  console.log("captcha change: ", a);
  a == null ? setUserFormCapt(true) : setUserFormCapt(false);
}
const errorCapt = (err) =>{
  console.log("err", err);
}
  const showModal = (event) => {
    if(event === 0){
      setShowWallet(0)
    }else{
      setShowWallet(1);
    }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
useEffect(() => {
  window.onpopstate = (event) =>{
    history.go(1)
    console.log("event", event);
    // message.success("Back hiih gj bn ")
  }
  getInsentive();
}, []);
const getInsentive = () =>{
  setSpinner(true)
  const body = {
    func: "getDetInsentive",
    userPkId: localStorage.getItem("pkId")
  }
  axios.post("/api/post/Gate", body ).then((res)=>{ 
    console.log("body: ", res.data);
    var getMnt = [];
    var mntTotal = 0;
    var dollarTotal = 0;
    var getCoin = []; 
    if(res.data.data){
        res.data.data.forEach(element => {
          if(element.payMethod === 3){
            getMnt.push(element)
            mntTotal += element.fee
          }else if (element.payMethod === 1){
            getCoin.push(element);
            dollarTotal += element.fee
            
          }
        });

        console.log("getMnt", getMnt);
        
        setDollarSt(getMnt);
        setCointSt(getCoin);

        setMntTotal(mntTotal);
        setDollarTotal(dollarTotal); 
        // if(hooson.length === 0 ){
        //   console.log("hooson", hooson);
        // }else{
        //   console.log("bish", hooson);
        // }
    }else {
      
    }

  }).catch((err)=>{
    console.log("err: ", err);
  }).finally((dd)=>{
    setSpinner(false)
  })
}
const columns = [
  {
    title: 'Date',
    width: 120,
    dataIndex: 'date',
    key: 'date',
    fixed: 'left',
  },
  {
    title: 'Currency',
    width: 100,
    dataIndex: 'currency',
    key: 'currency',
    fixed: 'left',
  },
  {
    title: 'Payment method',
    width: 200,
    dataIndex: 'paymentCondition',
    key: 'paymentCondition',
   
  },
  {
    title: 'Address',
    width: 300,
    dataIndex: 'address',
    key: 'address',
    // fixed: 'left',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: '1',
    width: 150,
  },      
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status', 
    ellipsis: true,
    width: 150,
    render: (a)=>
      <div>  
        {a === 2 ? <Badge status="processing" text="Processing" /> : ""}
        <div>Cancel</div>
      </div>
  },
  // {
  //   title: 'Action',
  //   key: 'operation',
  //   fixed: 'right',
  //   width: 170,
  //   render: () => <div style={{display: "flex"}}> 
  //     <Button>Details</Button>
  //     <Button>Cancel</Button>
  //   </div>,
  // },

];
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    date: `2023-01-02 ${i}`,
    currency: "Төгрөг",
    paymentCondition: "trade and development bank",
    address: `530101929${i}`,
    amount: "230,000₮",
    status: 2,
  });
}
const showModalWithdraw = () =>{
  setIsModalOpenWithdraw(true);
}
const handleOkWithdraw = () =>{
  setIsModalOpenWithdraw(false)
  console.log("ok");
}
const handleCancelWithdraw = () =>{
  setIsModalOpenWithdraw(false)
  console.log("cancel");
}
  return (
    <BaseLayout pageName="dashboard">
      <Divider orientation="left">

        <div className={css.Title}> {t("title")}</div>
      </Divider>
 
      
      <div style={{width: "98%"}}>
        {spinner ? <Spin /> : 
          <div className={css.DashFlex}>
            
            {/* <div className={css.Box}>
              <div className={css.Col1}>
                <div> 
                  <div style={{color: "#727272"}}>MNT Wallet</div>
                  <div className={css.DPrice}>132,000.0 ₮</div>
                  <div className={css.DMethod}>MNT</div>
                </div>
                <Image alt="Obertech" preview={false} src="/img/walletMNT.jpg" width={95}/>
              </div>
              <div className={css.Col2} > 
                <div><Button icon={<EyeOutlined/>} size="small" type="primary" shape="round" onClick={showModal}></Button></div>
                <div><Button type="primary" size="small">Withdraw</Button></div>
              </div>
            </div>  */}
            {getDollarSt.length === 0 ? null : 
            <div className={css.Box}>
              <div className={css.Col1}>
                <div> 
                  <div style={{color: "#727272"}}>USD Wallet</div>
                  <div className={css.DPrice}>$ {getMntTotal}</div>
                  <div className={css.DMethod}>USD</div>
                </div>
                {/* <div className={css.DIcon}>
                $
                </div> */}
                  <Image alt="Obertech" preview={false} src="/img/walletMNT.jpg" width={95}/>
              </div>
              <div className={css.Col2}> 
              <div><Button icon={<EyeOutlined/>} size="small" type="primary" shape="round" onClick={()=>showModal(0)}></Button></div>
                <div><Button type="primary" size="small">Withdraw</Button></div>
              </div>
            </div> 
            }
            {getCoinSt.length === 0 ? null : 
              <div className={css.Box}>
                <div className={css.Col1}>
                  <div> 
                    <div style={{color: "#727272"}}>OBOT Wallet</div>
                    <div className={css.DPrice}>{getDollarTotal} Obot</div>
                    <div className={css.DMethod}>OBOT</div>
                  </div>
                  {/* <div className={css.DIcon}>
                  C
                  </div> */}
                    <Image alt="Obertech" preview={false} src="/img/walletMNT.jpg" width={95}/>
                </div>
                <div className={css.Col2}> 
                  <div><Button icon={<EyeOutlined/>} size="small" type="primary" shape="round" onClick={()=>showModal(1)}></Button></div>
                  <div><Button type="primary" size="small" onClick={showModalWithdraw}> 
                  <Image alt="Obertech" preview={false} src="/img/wallet-money.svg" width={20} style={{paddingRight: "2px"}}/>
                  Withdraw</Button></div>
                </div>
              </div> 
            }
          </div>
        }
        <div style={{width: "95%", margin: "30px auto"}}>
        <Table bordered columns={columns} dataSource={data} scroll={{x: 1200, y: 300}}/>
            <div>
            <Modal title="Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
              {showWallet === 0 ? 
              <div>
                <div className={css.HdrDetails}>
                  <div className={css.Date}>Date</div>
                  <div className={css.Currency}>Currency</div>
                  <div className={css.OrgName}>Organzition name</div>
                  <div className={css.Amount}>Amount</div>
                  <div className={css.Status}>Status</div>
                </div> 
                {getDollarSt.map((e, i)=>(
                  <div className={css.HdrDetails2} key={i}> 
                    <div className={css.Date}>{e.date1}</div>
                    <div className={css.Currency}>Dollar</div>
                    <div className={css.OrgName}>{e.orgId} </div>
                    <div className={css.Amount}>{e.fee} $ </div>
                    <div className={css.Status}>Success</div>
                  </div>
                ))}
                
                
              </div>
              :    <div>
              <div className={css.HdrDetails}>
                <div className={css.Date}>Date</div>
                <div className={css.Currency}>Currency</div>
                <div className={css.OrgName}>Organzition name</div>
                <div className={css.Amount}>Amount</div>
                <div className={css.Status}>Status</div>
              </div>
              {getCoinSt.map((e, i)=>(
              <div className={css.HdrDetails2}> 
                 <div className={css.Date}>{e.date1}</div>
                    <div className={css.Currency}>Coin</div>
                    <div className={css.OrgName}>{e.orgId} </div>
                    <div className={css.Amount}>{e.fee} $ </div>
                    <div className={css.Status}>Success</div>
              </div> 
              ))}
            </div>
}
            </Modal>
            </div>
           <div> 
           <Modal title="Withdraw Balance" open={isModalOpenWithdraw} onOk={handleOkWithdraw} onCancel={handleCancelWithdraw} okText="Withdraw" >
              <div style={{fontSize: "14px"}}>
                <div>
                Convert your coins into cryptocurrencies to withdraw to your own wallet. No withdrawals can be refunded.
                </div>
                <div style={{marginTop: "10px", marginBottom: "10px"}}>You selected <span style={{color: "#4d5052", fontWeight: "800"}}>Obot</span> as cryptocurrency.</div>
                <div style={{fontWeight: "600"}}>Method</div>
                <div><Select defaultValue="direct"  style={{width: "100%"}} options={[{value: 'direct',label: 'Direct Withdraw'}]}/></div>
                <div style={{marginTop: "5px"}}>The minimum amount is <span style={{background: "#fef08a", color: "#ca8a04", padding: "2px 10px", borderRadius: "10px", textTransform: "uppercase"}}>1200.00 Obot</span></div>
                <div style={{marginBottom: "5px"}}>There is a fee of <span style={{background: "#fecaca", color: "#f26363", padding: "2px 10px", borderRadius: "10px"}}>50.00 Obot</span> on this transaction.</div>
                <div style={{fontWeight: "600", color: "#4d5052", marginTop: "5px"}}>Amount</div>
                <div><Input placeholder="0.000 obot"/></div>
                <div style={{fontWeight: "600", color: "#4d5052", marginTop: "5px"}}>Address</div>
                <div><Input placeholder="Your Wallet Address"/></div>
                <div style={{margin: "5px 0px"}}>You will receive the amount of <span style={{color: "#4d5052", fontWeight: "800"}}>0.02077773 OBOT.</span></div>
                <div>You will withdraw directly to your wallet. Do not withdraw to a Microwallet, Payeer or Exchange with minimum deposit amount.</div>
                <div className={css.Tips}>
                                <div className={css.TitleFlex}>
                                    <div className={css.RedIcon}></div>
                                    <div style={{fontWeight: "600"}}>Warning </div>
                                </div>
                                <div className={css.TitleFlex} style={{marginLeft: "10px"}}>
                                    <div className={css.CircleYel}></div>
                                    <div style={{width: "94%"}}>You will withdraw directly to your wallet. Do not withdraw to a Microwallet, Payeer or Exchange with minimum deposit amount.</div> 
                                </div>
                                {/* <div className={css.TitleFlex2}>
                                    <div className={css.CircleYel} style={{marginTop: "5px"}}></div>
                                    <div style={{width: "94%"}}>Таны нэмсэн данс руу "Баталгаажуулах КОД" бүхий гүйлгээ хийгдэх бөгөөд 6 оронтой кодыг оруулснаар таны данс баталгаажих болно. </div>
                                </div> */}
                            </div>
            
                <div style={{margin: "20px 0px", display: "flex", justifyContent: "center"}}>
                    <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                    </div> 

              </div>
            </Modal>
           </div>
        </div>
      </div>
    </BaseLayout>
  );
};
export default Dashboard;
