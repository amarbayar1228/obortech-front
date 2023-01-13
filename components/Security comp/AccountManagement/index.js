import { Button, Input, Select, Tooltip } from "antd";
import { useState } from "react";
import css from "./style.module.css"
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined} from "@ant-design/icons";
const AccountManagement = () =>{ 
    const [toogle, setToogle] = useState(1);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    return <div>
        <div className={css.Title}>User Credit</div> 
            <div className={css.Flex}> 
                <div className={css.Banks}> 
                    <Button className={css.Backg} size="large" onClick={()=>setToogle(1)}>Obot</Button>
                    <Button className={css.Backg} size="large" onClick={()=>setToogle(2)}>Foreign Bank</Button>
                    <Button className={css.Backg} size="large" onClick={()=>setToogle(3)}>Mongolia Bank</Button> 
                </div>
                <div className={css.Layout2}> 
                    {toogle === 1 ?   <div>
                        
                        <div className={css.Hdr}>Obot данс </div>
                        <div className={css.Scroll}> 
                            <div className={css.HdrForm}> 
                                <div className={css.HdrFlex}> 
                                    <div className={css.obotext1}> Coin</div> 
                                    <div className={css.obotext2}> Address</div> 
                                    <div className={css.text4}> State</div>
                                    <div className={css.text5}> Action</div>
                                </div>
                                <div className={css.DtlFlex}>  
                                    <div className={css.obotext1}>OBORTECH</div>
                                    <div className={css.obotext2}>0xD8E5163dd630558149c8934EA49C083d7b859A9A</div>
                                    <div className={css.text4} style={{color: "green"}}>Данс баталгаажсан</div>
                                    <div className={css.text5}>
                                        <Button size="small" icon={<EditOutlined />} style={{marginRight: "5px"}}></Button>
                                        <Button size="small" icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                                <div className={css.DtlFlex}>  
                                    <div className={css.obotext1}>OBORTECH</div>
                                    <div className={css.obotext2}>0xD8E5163dd630558149c8934EA49C083d7b859A9A</div>
                                    <div className={css.text4} style={{color: "red"}}>Баталгаажуулах шаардлагатай</div>
                                
                                    <div className={css.text5}> 
                                    <Button size="small" icon={<EditOutlined />} style={{marginRight: "5px"}}></Button>
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
                    {toogle === 2 ?  <div>
                        
                        <div className={css.Hdr}>Бүртгэлтэй данс </div>
                        <div className={css.Scroll}> 
                            <div className={css.HdrForm}> 
                                <div className={css.HdrFlex}> 
                                    <div className={css.text1}> Валют</div>
                                    <div className={css.text2}> Төлбөрийн нөхцөл</div>
                                    <div className={css.text3}> Банкны данс</div>
                                    <div className={css.text4}> Төлөв</div>
                                    <div className={css.text5}> Үйлдэл</div>
                                </div>
                                <div className={css.DtlFlex}> 
                                    <div className={css.text1}>USD </div>
                                    <div className={css.text2}>Visa Card</div>
                                    <div className={css.text3}>456108617</div>
                                    <div className={css.text4} style={{color: "green"}}>Данс баталгаажсан</div>
                                    <div className={css.text5}>
                                    <Button size="small" icon={<EditOutlined/>} style={{marginRight: "5px"}}></Button>
                                        <Button size="small" icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                                <div className={css.DtlFlex}> 
                                    <div className={css.text1}>USD </div>
                                    <div className={css.text2}>MasterCard</div>
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
                                <div className={css.SelectCss2}> 
                                    <div className={css.SelectTitle2}>Select your existing saved payment method or enter a new payment method for future purchases and subscription renewals.</div>
                                    <Select style={{width: "100%"}} placeholder="Сонгоно уу" onChange={handleChange} options={[{value: 'Visa',label: 'Visa'},
                                     {value: 'MasterCard',label: 'MasterCard'}, 
                                     ]}/>
                                </div>
                               
                            </div>
                            <div className={css.CardForm}> 
                                
                                <div className={css.CardFormInput1}> 
                                    <div>Card number</div>
                                    <Input placeholder="Дансны дугаараа оруулна уу" />
                                </div> 
                                <div className={css.CardFormInput2}> 
                                    <div>Expiration date</div>
                                    <div className={css.ExpDate}> 
                                        <Input placeholder=" - -" />
                                        <Input placeholder=" - - -" style={{marginLeft: "5px"}}/>
                                    </div>
                                </div> 
                                <div className={css.CardFormInput3}> 
                                    <div>Security code</div>
                                    <Input placeholder="***"  style={{width: "70px"}} suffix={
        <Tooltip title="Extra information" placement="right">
          <QuestionCircleOutlined
            style={{
              color: 'rgba(0,0,0,.45)',
            }}
          />
        </Tooltip>
      }/>
                                </div>
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