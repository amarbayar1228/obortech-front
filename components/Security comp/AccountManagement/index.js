import { Button, Image, Input, Select, Tooltip } from "antd";
import { useContext, useRef, useState } from "react";
import css from "./style.module.css"
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
import BasketContext from "../../../context/basketContext/BasketContext";
const AccountManagement = () =>{ 
    const [toogle, setToogle] = useState(1);
    const [userFormCapt, setUserFormCapt] = useState(true);
    const recaptchaRef = useRef();
    const basketContext = useContext(BasketContext)
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
                            <div className={css.Hdr}>{basketContext.t('addNewAccount', { ns: 'security' })}</div> 
                            {/* <div className={css.ChooseBank}> 
                                <div className={css.SelectCss}> 
                                    <div className={css.SelectTitle}>БАНК</div>
                                    <Select style={{width: "100%"}} placeholder="Сонгоно уу" onChange={handleChange} options={[{value: 'Худалдаа хөгжлийн банк', label: 'Худалдаа хөгжлийн банк'},{value: 'Хаан банк', label: 'Хаан банк'}, {value: 'Төрийн банк', label: 'Төрийн банк'}, {value: 'Голомт банк', label: 'Голомт банк'}]}/>
                                </div>
                                <div className={css.SelectCss}> 
                                    <div className={css.SelectTitle}>ВАЛЮТ</div>
                                    <Select style={{width: "100%"}} placeholder="Сонгоно уу" onChange={handleChange} options={[{value: 'МНТ',label: 'МНТ'}]}/>
                                </div>
                            </div> */}
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
                                <Input placeholder={basketContext.t('walletAddress', { ns: 'security' })} />
                            </div>
                            <div style={{display: "flex", justifyContent: "center", margin: "30px 0px"}}> 
                            <ReCAPTCHA   onErrored={errorCapt}  ref={recaptchaRef}   sitekey="6Ld-prciAAAAAOY-Md7hnxjnk4hD5wbh8bK4ld5t" onChange={onChangeCaptcha}/>
                            </div>
                             
                            <div className={css.DansBat}><Button type="primary" size="large">{basketContext.t('accountVerification', { ns: 'security' })}</Button></div>
                        </div>
                    </div> : ""}
                    {toogle === 2 ?  <div>
                        
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
                                    <div className={css.text4} style={{color: "red"}}>{basketContext.t('confirmationRequired ', { ns: 'security' })}</div>
                                
                                    <div className={css.text5}> 
                                        <Button size="small" icon={<EditOutlined/>} style={{marginRight: "5px"}}></Button>
                                        <Button size="small" icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css.AddForm}> 
                            <div className={css.Hdr}>{basketContext.t('addNewAccount', { ns: 'security' })}</div>
                            <div className={css.ChooseBank}> 
                                <div className={css.SelectCss2}> 
                                    <div className={css.SelectTitle2}>{basketContext.t('SelectYourExisting', { ns: 'security' })}.</div>
                                    <Select style={{width: "100%"}} placeholder={basketContext.t('choose', { ns: 'security' })} onChange={handleChange} options={[{value: 'Visa',label: 'Visa'},
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
                                    <div>{basketContext.t('walletAddress', { ns: 'security' })}</div>
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
                            <div className={css.DansBat}><Button type="primary" size="large">{basketContext.t('accountVerification', { ns: 'security' })}</Button></div>
                        </div>
                    </div> : ""}
                    {toogle === 3 ?  <div>
                        
                        <div className={css.Hdr}>Бүртгэлтэй данс </div>
                        <div className={css.Scroll}> 
                            <div className={css.HdrForm}> 
                                <div className={css.HdrFlex}> 
                                    <div className={css.text1}> Валют</div>
                                    <div className={css.text2}> Банкны нэр</div>
                                    <div className={css.text3}> Банкны данс</div>
                                    <div className={css.text4}> Төлөв</div>
                                    <div className={css.text5}> Үйлдэл</div>
                                </div>
                                <div className={css.DtlFlex}> 
                                    <div className={css.text1}>MNT </div>
                                    <div className={css.text2}>Худалдаа хөгжлийн банк</div>
                                    <div className={css.text3}>456108617</div>
                                    <div className={css.text4} style={{color: "green"}}>Данс баталгаажсан</div>
                                    <div className={css.text5}>
                                        <Button size="small" icon={<EditOutlined/>} style={{marginRight: "5px"}}></Button>
                                        <Button size="small" icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                                <div className={css.DtlFlex}> 
                                    <div className={css.text1}>MNT </div>
                                    <div className={css.text2}>Хаан банк</div>
                                    <div className={css.text3}>5301019298</div>
                                    <div className={css.text4} style={{color: "red"}}>Баталгаажуулах шаардлагатай</div>
                                
                                    <div className={css.text5}> 
                                    <Button size="small" icon={<EditOutlined/>} style={{marginRight: "5px"}}></Button>
                                        <Button size="small" icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css.AddForm}> 
                            <div className={css.Hdr}>Шинэ данс нэмэх</div>
                            <div className={css.ChooseBank}> 
                                <div className={css.SelectCss}> 
                                    <div className={css.SelectTitle}>БАНК</div>
                                    <Select style={{width: "100%"}} placeholder="Сонгоно уу" onChange={handleChange} options={[{value: 'Худалдаа хөгжлийн банк', label: 'Худалдаа хөгжлийн банк'},{value: 'Хаан банк', label: 'Хаан банк'}, {value: 'Төрийн банк', label: 'Төрийн банк'}, {value: 'Голомт банк', label: 'Голомт банк'}]}/>
                                </div>
                                <div className={css.SelectCss}> 
                                    <div className={css.SelectTitle}>ВАЛЮТ</div>
                                    <Select style={{width: "100%"}} placeholder="Сонгоно уу" onChange={handleChange} options={[{value: 'МНТ',label: 'МНТ'}]}/>
                                </div>
                            </div>
                            <div className={css.DansNumb}> 
                                <div className={css.SelectTitle}>ДАНСНЫ ДУГААР</div>
                                <Input placeholder="Дансны дугаараа оруулна уу" />
                            </div>
                            <div> Captcha</div>
                            <div className={css.Tips}>
                                <div className={css.TitleFlex}>
                                    <div className={css.RedIcon}></div>
                                    <div style={{fontWeight: "600"}}>Анхааруулга </div>
                                </div>
                                <div className={css.TitleFlex} style={{marginLeft: "10px"}}>
                                    <div className={css.CircleYel}></div>
                                    <div style={{width: "94%"}}>Зөвхөн өөрийн нэр дээрх дансыг бүртгэнэ үү! </div> 
                                </div>
                                <div className={css.TitleFlex2}>
                                    <div className={css.CircleYel} style={{marginTop: "5px"}}></div>
                                    <div style={{width: "94%"}}>Таны нэмсэн данс руу "Баталгаажуулах КОД" бүхий гүйлгээ хийгдэх бөгөөд 6 оронтой кодыг оруулснаар таны данс баталгаажих болно. </div>
                                </div>
                            </div>
                            <div className={css.DansBat}><Button type="primary" size="large">Данс баталгаажуулах</Button></div>
                        </div>
                    </div> : ""}


                </div>
            </div>
    </div>
}
export default AccountManagement;