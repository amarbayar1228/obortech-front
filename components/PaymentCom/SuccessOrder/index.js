import { Button, Image, Modal, Result, Select } from "antd";
import React, { useEffect, useState } from "react";
import css from "./style.module.css"
import {CheckCircleOutlined, DownloadOutlined} from "@ant-design/icons";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Home = {
    position: "relative",
    width: "650px",
    marginTop: "10px",
    paddingTop: "50px",
    marginLeft: "70px",
    border: "1px solid #ccc",
    padding: "40px",
    color: "#000"
}
const Product = {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
    fontWeight: "600",
    marginTop: "10px"
} 
const ProductTitle = {
    width: "400px",
    lineBreak: "anywhere"
} 
const ProductQuantity = {
    width: "100px",
    textAlign: "right"
} 
const ProductPrice =  {
    width: "100px",
    textAlign: "right"
} 
const ProductAmount = {
    textAlign: "right",
    width: "100px"
} 
const Total = {
    display: "flex",
    borderTop: "1px solid #000",
    marginTop: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "right",
    fontWeight: "600",
    justifyContent: "flex-end"
} 
const AmountDue = {
    borderTop: "1px solid #000",
    display: "flex",
    width: "50%",
    justifyContent: "space-between",
    fontWeight: "600",
    marginLeft: "50%",
} 
const Notes = {
    textAlign: "left"
} 
const BoldText = {
    fontWeight: "600"
}
const SuccessOrder = (props) =>{ 
    const [price,setPrice]= useState(0);
    const [toggle, setToggle] = useState(false);
    const [items, setItems] = useState([]);
    const [date1, setDate1] = useState(0);
    const [userForm, setUserForm] = useState("");
    const [formText, setFormText] = useState([
        {invoice:{en: "Invoice", mn: "Нэхэмжлэл"}},
        {oboAddress1: {en: "#902, 9th floor, New Horizon Building", mn: "New Horizon Building 9 давхарт 902 тоот"}},
        {oboAddress2: {en: "Olympic Street 4, Ulaanbaatar", mn: "Олимпийн гудамж 4, Улаанбаатар"}},
        {mongolia: {en: "Mongolia", mn: "Монгол"}},
        {billTo: {en: "BILL TO", mn: "Төлбөр"}},
        {invoNumb: {en: "Invoice Number", mn: "Нэхэмжлэлийн дугаар"}},
        {invoDate1: {en: "Invoice Date", mn: "Нэхэмжлэлийн өдөр"}},  
        {invoDate2: {en: "Payment Due", mn: "Төлбөрийн хугацаа"}},
        {amountDue: {en: "Amount Due(MNT)", mn: "Төлөх дүн(МНТ)"}},
        {product: {en: "Product", mn: "Бүтээгдэхүүн"}},
        {quantity: {en: "Quantity", mn: "Тоо ширхэг"}},
        {price: {en: "Price", mn: "Үнэ"}},
        {Amount: {en: "Amount", mn: "Дүн"}},
        {total: {en: "Total", mn: "Нийт үнэ"}},
        {notes: {en: "Notes / Terms", mn: "Тэмдэглэл / Нөхцөл"}},
        {info: {en: "Be sure to write the invoice number on your transaction!", mn: "Нэхэмжлэлийн дугаарыг гүйлгээн дээрээ заавал бичнэ үү!"}},
        {khan: {en: "Khan Bank", mn: "Хаан банк"}},
        {golomt: {en: "Golomt Bank", mn: "Голомт банк"}},
        {state: {en: "State Bank", mn: "Төрийн банк"}},
        {tdb: {en: "Trade Development Bank", mn: "Худалдаа Хөгжлийн Банк"}},
     
        
    ]);
    const [formValue, setFormValue] = useState("mn");
    const [mnPrice, setMnPrice] = useState(0);
    useEffect(()=>{
        console.log("successorder props: ", props);
        
       const funcu = () =>{
        setMnPrice(props.mnPrice[0].mnt);
        setUserForm(JSON.parse(localStorage.getItem("invoF")));
        setDate1(JSON.parse(localStorage.getItem("d1")));
   
    if(props.totalPriceState > 0 ){
        setPrice(props.totalPriceState);
        setItems(props.items);
        setToggle(true);
    }
       }
       funcu();
        // setTitle(props.totalPriceState);

    },[props])
const cancelF = () =>{
    setPrice(0);
    setToggle(false);
}
const downloadPdf = () =>{
    console.log("object");
    const input = document.getElementById("invoice");
    const input2 = document.getElementById("invoice");
 // create one page
    html2canvas(input).then((canvas) =>{
        const imgData = canvas.toDataURL("image/png");   
        const pdf = new jsPDF("p", "pt", "a4");
        pdf.addImage(imgData, "JPEG", 0, 0);  
        pdf.save("Invoice.pdf");  
     });
    //create page 1 2
    // html2canvas(input).then((canvas) =>{
    //     const imgData = canvas.toDataURL("image/png");  
    //     html2canvas(input2).then((canvas) =>{
    //      const imgData2 = canvas.toDataURL("image/png"); 
          
    //      const pdf = new jsPDF("p", "pt", "a4");
    //      pdf.addImage(imgData, "JPEG", 0, 0);
 
    //      pdf.addPage();    
    //      pdf.addImage(imgData2, "JPEG", 0, 0);
    //      pdf.save("Invoice.pdf"); 
    //   });
    //  });
    
  ;

    // console.log('red', img1);
   
}
const handleChange = (value) =>{
    console.log("value", value);
    setFormValue(value);
}
return <div>   
{props.invoiceSuccess === 1 ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
    <div style={{display: "flex"}}> 
    <Select defaultValue={formValue} style={{width: 200,}}onChange={handleChange}
    options={[{label: 'Ptf download', options: [{label: 'English', value: 'en'},
          {label: 'Mongolian', value: 'mn'},
          {label: 'English & Mongolian', value: 'enMn'},
        ]}]}/>
    <Button onClick={downloadPdf} type="primary" icon={<DownloadOutlined />}>Download pdf</Button>
    </div>
<div id="invoice" style={{marginTop: "-30px"}}>   
<div style={{width: "50px", height: "50px", background: "#fff"}}></div>
    <div style={Home} >
    <div  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>  
        <div style={{width: "285px"}}> 
            <Image alt="Obertech"  preview={false}src="/img/invoLogo.png"  style={{width: "180px", marginLeft: "-8px" }}/>
              {/* src="/img/OBORTECH_logo_H_clean.svg" width={200} */}
            </div>
        <div style={{textAlign: "right", width: "100%"}}>
            <div style={{fontSize: "20px", fontWeight: "600"}}>{formValue === "mn" ? formText[0].invoice.mn : formText[0].invoice.en}</div>
            <div style={{fontWeight: "600"}}>Reg.No: 6371159</div>
            <div>{formValue === "mn" ? formText[1].oboAddress1.mn : formText[1].oboAddress1.en}</div>
            <div>{formValue === "mn" ? formText[2].oboAddress2.mn : formText[2].oboAddress2.en}</div>
            <div>{formValue === "mn" ? formText[3].mongolia.mn : formText[3].mongolia.en}.</div>

            <a href="www.obortech.io" style={{marginTop: "15px"}}>www.obortech.io</a>
        </div>
    </div>    
        <div style={{position: "relative", width: "100%", display: "flex",   marginTop: "15px", borderTop: "1px solid #ccc", paddingTop: "5px"}} >
            <div style={{width: "270px", textAlign: "left"}}>
                <div style={{color: "#ccc", fontWeight: "600"}}>{formValue === "mn" ? formText[4].billTo.mn : formText[4].billTo.en}</div>
                <div>{userForm === "" ? "" : userForm.companyName}</div>
                <div>{userForm === "" ? "" : userForm.surename + " " + userForm.lastname}</div>
                <div>{userForm === "" ? "" : userForm.mail}</div>
                <div style={{marginTop: "30px", marginBottom: "10px"}}> {userForm === "" ? "" : userForm.companyAddress}</div>
            </div>
            <div style={{marginTop: "10px", textAlign: "right", fontWeight: "600", lineHeight: "30px", width: "329px", marginLeft: "50px"}} >
                <div style={{display: "flex"}}>  
                    <div style={{width: "186px", textAlign: "left"}}>{formValue === "mn" ? formText[5].invoNumb.mn : formText[5].invoNumb.en}:  </div>
                    <div style={{width: "50%", textAlign: "right"}}>XXXXXXXXX</div>
                </div>
                <div style={{display: "flex" }}> 
                    <div style={{width: "160px", textAlign: "left"}}>{formValue === "mn" ? formText[6].invoDate1.mn : formText[6].invoDate1.en}:</div>
                    <div style={{width: "50%", textAlign: "right"}}>{date1 === 0 ? "" : date1[0].date1}</div>
                </div>
                <div style={{display: "flex" }}> 
                    <div style={{width: "160px", textAlign: "left"}}>{formValue === "mn" ? formText[7].invoDate2.mn : formText[7].invoDate2.en}:</div>
                    <div style={{width: "50%", textAlign: "right"}}>{date1 === 0 ? "" : date1[1].date2} </div>
                </div>
                <div style={{display: "flex" }}> 
                    <div style={{width: "160px", textAlign: "left"}}>{formValue === "mn" ? formText[8].amountDue.mn : formText[8].amountDue.en}:</div>
                    <div style={{width: "50%", textAlign: "right"}}>{mnPrice}₮</div>
                </div>
                
            </div>
        </div>
        <div  style={Product}>
            <div style={ProductTitle}>{formValue === "mn" ? formText[9].product.mn : formText[9].product.en}</div>
            <div style={ProductQuantity}>{formValue === "mn" ? formText[10].quantity.mn : formText[10].quantity.en}</div>
            <div style={ProductPrice}>{formValue === "mn" ? formText[11].price.mn : formText[11].price.en}</div>
            <div style={ProductAmount}>{formValue === "mn" ? formText[12].Amount.mn : formText[12].Amount.en}</div>
        </div>
        {props.items.map((e, i)=>(
        <div style={Product} key={i}>
            <div style={ProductTitle}>{e.title}</div>
            <div style={ProductQuantity}>{e.cnt}</div>
            <div style={ProductPrice}>{e.price}$</div>
            <div style={ProductAmount}>{e.price * e.cnt}$</div>
        </div>
        ))}
        <div style={Total} > 
        <div>{formValue === "mn" ? formText[13].total.mn : formText[13].total.en}: </div>
        <div style={{marginLeft: "5px"}}> {props.totalPriceState}$</div>
        </div>
        <div style={AmountDue}>
        <div>{formValue === "mn" ? formText[8].amountDue.mn : formText[8].amountDue.en}:</div>
        <div>{mnPrice}₮</div>
        </div> 
        <div style={Notes}> 
            <div style={BoldText}>{formValue === "mn" ? formText[14].notes.mn : formText[14].notes.en}</div>
            <div style={{color: "red"}}>{formValue === "mn" ? formText[15].info.mn : formText[15].info.en}</div>
        </div> 
        <div style={{display: "flex", textAlign: "left", margin: "10px 0px"}} > 
            <div style={{width: "50%"}}>
                <div style={BoldText}>{formValue === "mn" ? formText[19].tdb.mn : formText[19].tdb.en}</div>
                <div>A/C Name: Обортек Монголиа ХХК</div>
                <div>A/C Number: 555555555555555555</div>
            </div>
            <div style={{marginLeft: "10px", width: "50%"}}>
                <div style={BoldText}>{formValue === "mn" ? formText[18].state.mn : formText[18].state.en}</div>
                <div>A/C Name: Обортек Монголиа ХХК</div>
                <div>A/C Number: 555555555555555555</div>
            </div>
        </div>
        <div style={{display: "flex", textAlign: "left", margin: "10px 0px"}}> 
        <div style={{width: "50%"}}>
                <div style={BoldText}>{formValue === "mn" ? formText[17].golomt.mn : formText[17].golomt.en}</div>
                <div>A/C Name: Обортек Монголиа ХХК</div>
                <div>A/C Number: 555555555555555555</div>
        </div>
        <div style={{marginLeft: "10px", width: "50%"}}>
            <div style={BoldText} >{formValue === "mn" ? formText[16].khan.mn : formText[16].khan.en}</div>
            <div>A/C Name: Обортек Монголиа ХХК</div>
            <div>A/C Number: 555555555555555555</div>
        </div>
        </div> 
    </div> 
</div>
</div> : 

<> 
{toggle ?
<div className={css.Absolute}>
{/* <div className={css.Logo}> 
<Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg" width={200}/>
</div> */}
{/* <Result status="success" title="Thank you. Your order has been received." subTitle={"Order number: 123123. "}/> */}
{/* <div style={{marginTop: "22px"}}> 
    <div>Сайн байна уу? OBORTECH 5355907</div>
    <div>Таны <span style={{color: 'red'}}> R441340050</span> дугаартай <span style={{color: 'red'}}>{price}$ </span> захиалгын төлбөр амжилттай <span style={{color: 'red'}}>ТӨЛӨГДЛӨӨ </span></div>
</div>
<div className={css.textDesc}> 
    Асууж лавлах зүйл байвал <span> 7719-9999 </span> дугаараас, <span>online@obortech.mn</span>  Хаягаар бидэнд хандана уу.
</div> */}

{/* <div> 
    <div style={{fontSize: "20px", marginBottom: "10px", marginTop: "10px"}}>OBORTECH 5355907 </div>
    <div style={{textAlign: "left"}}> OBORTECH Mongolia LLC Ulaanbaatar, Mongolia. OBORTECH in India: Sco 362, Top Floor Sector 44D, Chandigarh, India</div>
    <div style={{textAlign: "left", marginTop: "10px"}}>info@obortech.io </div>
</div> */}
<div style={{padding: "20px"}}><CheckCircleOutlined style={{color: "green", marginRight: "5px"}}/>Thank you. Your order has been received.</div>
<div style={{borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "20px 0px" }}>
    <div  className={css.OrderNO}>
        <div>
            <div >Order NO</div>
            <div style={{color: "#8D9299", fontSize: "14px"}}>M 2653257</div>
        </div>
        <div className={css.OrderNoLay2}>
            <div>Organization ID</div>
            <div style={{color: "#8D9299", fontSize: "14px"}}>Obogti760</div>
        </div>
        <div>
            <div>Bank</div>
            <div style={{color: "#8D9299", fontSize: "14px"}}>Qpay</div>
        </div>
        {/* <div style={{ paddingRight: "30px", paddingLeft: "30px"}}>
            <div>Order NO</div>
            <div>M 2653257</div>
        </div> */}
    </div>
</div>
<div className={css.OutOrder}>
    <div className={css.LayoutOrder1}> 
        <div className={css.OrderTitle}>
            <div className={css.OrderLine}></div>
            <div>Our order</div>
        </div>
            {items.map((e,i)=>( 
                <div  key={i}  className={css.OrderItem}>
                    <div>{e.title} {e.cnt === 1 ? "" : "X "+ e.cnt}</div>
                    <div style={{fontWeight: "600"}}>${e.price}</div>
                </div> 
            ))} 
            <div className={css.OrderItem}>
                <div>Shipping</div>
                <div style={{fontWeight: "600"}}>$0</div>
            </div>
        <div className={css.OrderTotal}>
            <div>Order total</div>
            <div style={{fontWeight: "600"}}>${price}</div>
        </div>
    </div>

    <div className={css.LayoutOrder2}>

        <div style={{width: "100%",  paddingLeft: "30px"}}> 
            <div className={css.OrderTitle}>
                <div className={css.OrderLine}></div>
                <div>BILLING DETAILS</div>
            </div>
            <div style={{display: "flex", padding: "3px 0px", color: "#8D9299"}}>
                <div className={css.OrgName}>Organization name: </div>
                <div style={{fontSize: "14px"}}>Obortech</div>
            </div>
            <div style={{display: "flex", padding: "3px 0px", color: "#8D9299"}}>
                <div  className={css.OrgName}>Organization ID: </div>
                <div style={{textAlign: "left", fontSize: "14px"}}> Obogti760 </div>
            </div>
        </div>

        <div style={{width: "100%",  paddingLeft: "30px", paddingTop: "10px"}}>
            <div className={css.OrderTitle}>
                <div className={css.OrderLine}></div>
                <div>BILLING DETAILS</div>
            </div>
            
            <div style={{display: "flex", padding: "3px 0px", color: "#8D9299"}}>
                <div className={css.OrgName}>Email: </div>
                <div style={{fontSize: "14px"}}>Amarbayar</div>
            </div>
            <div style={{display: "flex", padding: "3px 0px", color: "#8D9299"}}>
                <div className={css.OrgName}>Description: </div>
                <div style={{textAlign: "left", fontSize: "14px", width: "55%"}}> 28 Green Tower, Street name, New York </div>
            </div>
        </div>

    </div>
</div>
{/* <div className={css.Layout}>
     {items.map((e,i)=>(
        <div className={css.Items} key={i}>
            <div className={css.Image}>
                {e.img === "" ?  <div className={css.Group}> G </div>: <Image preview={false} alt="Obertech" src={"data:image/png;base64," + e.img} className={css.Img}/> }
            </div>
            <div className={css.DescWidth}> 
                <div style={{textTransform: "uppercase", fontWeight: "600"}}>{e.title} </div>
                <div className={css.Descr}> 
                    <div className={css.Descrtext}>{e.description} </div> <div> Price: {e.price}$</div> 
                </div>
            </div>
        </div>
     ))}
</div> */}


{/* <div className={css.TotalPriceCss}>Total price: {price} </div> */}
</div>
: ""}
</>  
}


</div> 
}
export default SuccessOrder;