import css from "./style.module.css"
import { Button, Input, Modal, Select, Tooltip } from "antd";
import { useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import BasketContext from "../../../../context/basketContext/BasketContext"; 
import {DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";
const ForeignAccount = () =>{
    const basketContext = useContext(BasketContext);
    const recaptchaRef = useRef(); 
    const [userFormCapt, setUserFormCapt] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onChangeCaptcha = (a) =>{ 
      a == null ? setUserFormCapt(true) : setUserFormCapt(false);
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const errorCapt = (err) =>{
        console.log("err", err);
    }
    return<div>
       <div className={css.Hdr}>{basketContext.t('registeredAccount', { ns: 'security' })}  </div>
        <div className={css.Scroll}> 
            <div className={css.HdrForm}> 
                <div className={css.HdrFlex}> 
                    <div className={css.text1}>{basketContext.t('currency', { ns: 'security' })}</div>
                    <div className={css.text2}> {basketContext.t('paymentCondition', { ns: 'security' })}</div> 
                    <div className={css.text3}>{basketContext.t('bankAccount', { ns: 'security' })}</div>
                    <div className={css.text4}> {basketContext.t('status', { ns: 'security' })}</div>
                    <div className={css.text5}>{basketContext.t('action', { ns: 'security' })}</div>
                </div>
                <div className={css.DtlFlex}> 
                    <div className={css.text1}>USD </div>
                    <div className={css.text2}>Visa Card</div>
                    <div className={css.text3}>456108617</div> 
                    <div className={css.text4} style={{color: "green"}}>{basketContext.t('accountVerified', { ns: 'security' })}</div>
                    <div className={css.text5}>
                    <Button size="small" icon={<EditOutlined/>} style={{marginRight: "5px"}}></Button>
                        <Button size="small" icon={<DeleteOutlined />}></Button>
                    </div>
                </div>
                <div className={css.DtlFlex}> 
                    <div className={css.text1}>USD </div>
                    <div className={css.text2}>MasterCard</div>
                    <div className={css.text3}>5301019298</div>
                    <div className={css.text4} style={{color: "red"}}>{basketContext.t('confirmationRequired', { ns: 'security' })}</div>
                
                    <div className={css.text5}> 
                        <Button size="small" icon={<EditOutlined/>} style={{marginRight: "5px"}}></Button>
                        <Button size="small" icon={<DeleteOutlined />}></Button>
                    </div>
                </div>
            </div>
        </div>
        <div className={css.AddForm}> 
        <Button size="large" icon={<PlusCircleOutlined />} className={css.Hdr} onClick={showModal}>{basketContext.t('addNewAccount', { ns: 'security' })}</Button>
            {/* <div className={css.Hdr}>{basketContext.t('addNewAccount', { ns: 'security' })}</div> */}
            <Modal title={basketContext.t('addNewAccount', { ns: 'security' })} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
            footer={ <><Button>Cancel</Button> <Button type="primary" disabled={userFormCapt}>{basketContext.t('accountVerification', { ns: 'security' })}</Button></>}>
                 <div className={css.ChooseBank}> 
                <div className={css.SelectCss2}> 
                    <div className={css.SelectTitle2}>{basketContext.t('SelectYourExisting', { ns: 'security' })}.</div>
                    <Select style={{width: "100%"}} placeholder={basketContext.t('choose', { ns: 'security' })} onChange={handleChange} 
                    options={[{value: 'Visa',label: 'Visa'},
                        {value: 'MasterCard',label: 'MasterCard'}, 
                        ]}/>
                </div>
                
            </div>
            <div className={css.CardForm}> 
                
                {/* <div className={css.CardFormInput1}> 
                    <div>Card number</div>
                    <Input placeholder="Дансны дугаараа оруулна уу" />
                </div>  */}
                
                <div className={css.CardFormInput1}> 
                    <div className={css.SelectTitle2}>{basketContext.t('walletAddress', { ns: 'security' })}</div>
                    <Input placeholder="**** **** **** ****"  style={{width: "100%"}} suffix={
                <Tooltip title="Extra information" placement="right"><QuestionCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/></Tooltip>}/>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", margin: "30px 0px"}}> 
            <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
            </div>
            <div className={css.Tips}>
                <div className={css.TitleFlex}>
                    <div className={css.RedIcon}></div>
                    <div style={{fontWeight: "600"}}>{basketContext.t('notice', { ns: 'security' })} </div>
                </div>
                <div className={css.TitleFlex} style={{marginLeft: "10px"}}>
                    <div className={css.CircleYel}></div>
                    <div style={{width: "94%"}}>{basketContext.t('noticeDetails1', { ns: 'security' })} </div> 
                </div>
                <div className={css.TitleFlex2}>
                    <div className={css.CircleYel} style={{marginTop: "5px"}}></div>
                    <div style={{width: "94%"}}> 
                    {basketContext.t('noticeDetails2', { ns: 'security' })}
                        </div>
                </div>
            </div>
            {/* <div className={css.DansBat}><Button type="primary" size="large">{basketContext.t('accountVerification', { ns: 'security' })}</Button></div> */}
            </Modal>
           
        </div>
    </div>
}
export default ForeignAccount;