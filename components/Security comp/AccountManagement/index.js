import { Button, Image, Input, Select, Tooltip } from "antd";
import { useContext, useRef, useState } from "react";
import css from "./style.module.css"
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
import BasketContext from "../../../context/basketContext/BasketContext";
import ObotAccount from "./ObotAccount";
import MongolianAccount from "./MongolianAccount";
import ForeignAccount from "./ForeignAccount";
const AccountManagement = () =>{ 
    const [toogle, setToogle] = useState(1);
    const [userFormCapt, setUserFormCapt] = useState(true);
    const recaptchaRef = useRef();
    const basketContext = useContext(BasketContext);
    const onChangeCaptcha = (a) =>{ 
      console.log("captcha change: ", a);
      a == null ? setUserFormCapt(true) : setUserFormCapt(false);
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const errorCapt = (err) =>{
        console.log("err", err);
    }
    return <div>
        <div className={css.Title}>{basketContext.t('userCredit', { ns: 'security' })}</div> 
            <div className={css.Flex}> 
                <div className={css.Banks}> 
                    <Button className={toogle === 1 ? css.Backg2 : css.Backg} size="large" onClick={()=>setToogle(1)}>
                        <div style={{display: "inline-flex", gap: "5px", alignItems: "center"}}> 
                            <Image alt="Obertech" preview={false} src="/img/logomin.png" width={20} style={{borderRadius: "5px"}}/>
                            <div>OBOT {basketContext.t('token', { ns: 'security' })}</div>
                        </div>
                        </Button>
                    <Button className={toogle === 2 ? css.Backg2 : css.Backg}  onClick={()=>setToogle(2)}>
                        <div>{basketContext.t('foreignBank', { ns: 'security' })}</div>
                        <div> <Image alt="Obertech" preview={false} src="/img/cardnuud.png" width={120}/></div>
                    </Button>
                    <Button className={toogle === 3 ? css.Backg2 : css.Backg} size="large" onClick={()=>setToogle(3)}>
                        <div>{basketContext.t('mongolianBank', { ns: 'security' })}</div>
                        <div style={{display: "inline-flex", gap: "4px"}}> 
                            <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={15}/>
                            <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={15}/>
                            <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={15}/>
                        </div>
                    </Button> 
                </div>
                <div className={css.Layout2}> 
                    {toogle === 1 ?   <div>
                        <ObotAccount />
                       
                    </div> : ""}
                    {toogle === 2 ?  <div>
                        <ForeignAccount />
                        
                    </div> : ""}
                    {toogle === 3 ?  <div>
                        <MongolianAccount />
                      
                    </div> : ""}


                </div>
            </div>
    </div>
}
export default AccountManagement;