import { Button, Input, Modal } from "antd";
import { useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import BasketContext from "../../../../context/basketContext/BasketContext";
import css from "./style.module.css"
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
const ObotAccount = () =>{
const basketContext = useContext(BasketContext);
const recaptchaRef = useRef(); 
const [userFormCapt, setUserFormCapt] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);
const [walletAddress, setWalletAddress] = useState(0);
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
const onChangeAddress = (e) =>{
   
    setWalletAddress(e.target.value)
}
    return<div>
         <div className={css.Hdr}>{basketContext.t('obotWallet', { ns: 'security' })} </div>
        <div className={css.Scroll}> 
            <div className={css.HdrForm}> 
                <div className={css.HdrFlex}> 
                    <div className={css.obotext1}>{basketContext.t('token', { ns: 'security' })}</div> 
                    <div className={css.obotext2}> {basketContext.t('walletAddress', { ns: 'security' })}</div> 
                    <div className={css.text4}>{basketContext.t('status', { ns: 'security' })}</div>
                    <div className={css.text5}>{basketContext.t('action', { ns: 'security' })}</div>
                </div>
                <div className={css.DtlFlex}>  
                    <div className={css.obotext1}>OBOT</div>
                    <div className={css.obotext2}>0xD8E5163dd630558149c8934EA49C083d7b859A9A</div>
                    <div className={css.text4} style={{color: "green"}}>{basketContext.t('accountVerified', { ns: 'security' })}</div>
                    <div className={css.text5}>
                        <Button size="small" icon={<EditOutlined />} style={{marginRight: "5px"}}></Button>
                        <Button size="small" icon={<DeleteOutlined />}></Button>
                    </div>
                </div>
                <div className={css.DtlFlex}>  
                    <div className={css.obotext1}>OBOT</div>
                    <div className={css.obotext2}>0xD8E5163dd630558149c8934EA49C083d7b859A9A</div>
                    <div className={css.text4} style={{color: "red"}}>{basketContext.t('confirmationRequired', { ns: 'security' })}</div>
                
                    <div className={css.text5}> 
                    <Button size="small" icon={<EditOutlined />} style={{marginRight: "5px"}}></Button>
                        <Button size="small" icon={<DeleteOutlined />}></Button>
                    </div>
                </div>
            </div>
        </div>
        <div className={css.AddForm}> 
            
            {/* <div className={css.Hdr}>{basketContext.t('addNewAccount', { ns: 'security' })}</div>   */}
            <Button size="large" icon={<PlusCircleOutlined />} className={css.Hdr} onClick={showModal}>{basketContext.t('addNewAccount', { ns: 'security' })}</Button>
            <Modal title={basketContext.t('addNewAccount', { ns: 'security' })} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
            footer={ <><Button>Cancel</Button> <Button type="primary" disabled={userFormCapt}>{basketContext.t('accountVerification', { ns: 'security' })}</Button></>}>
            <div className={css.Tips}>
                <div className={css.TitleFlex}>
                    <div className={css.RedIcon}></div>
                    <div style={{fontWeight: "600"}}>{basketContext.t('notice', { ns: 'security' })} </div>
                </div>
                <div className={css.TitleFlex} style={{marginLeft: "10px"}}>
                    <div className={css.CircleYel}></div>
                    <div style={{width: "94%"}}>{basketContext.t('enterBEP20', { ns: 'security' })}! </div>  
                </div> 
            </div>
            <div className={css.DansNumb}> 
                <div className={css.SelectTitle}>{basketContext.t('walletAddress', { ns: 'security' })}</div>
                <Input placeholder={basketContext.t('walletAddress', { ns: 'security' })} onChange={onChangeAddress}/>
            </div>
            {walletAddress.length > 10 ? 
            <div style={{display: "flex", justifyContent: "center", margin: "30px 0px"}}> 
                <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
            </div>
           : null }
            {/* <div className={css.DansBat}><Button type="primary" size="large">{basketContext.t('accountVerification', { ns: 'security' })}</Button></div> */}
            </Modal>
            
        </div>
    </div>
}
export default ObotAccount;