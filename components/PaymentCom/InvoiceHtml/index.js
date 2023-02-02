import { Image } from "antd"

const Home = {
    position: "relative",
    width: "650px",
    margin: "0px auto",
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
const InvoiceHtml = (props)=>{

    return<div>
        <div id="invoice">  
    <div style={Home} >
        <div  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>  
            <div style={{width: "285px"}}> 
                <Image preview={false} alt="obortech" src="https://scontent.fuln1-2.fna.fbcdn.net/v/t39.30808-6/267946776_4702286443188593_9002145977596374642_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=KC5BsR7b7VwAX_c5gG8&_nc_ht=scontent.fuln1-2.fna&oh=00_AfD8VzSabDO3RRttP31rTOYxRW3PGPh-PZg-ltD4J9HlKw&oe=63B8199A"  style={{width: "180px", marginLeft: "-8px" }}/>
                </div>
            <div style={{textAlign: "right", width: "100%"}}>
                <div style={{fontSize: "20px", fontWeight: "600"}}>INVOICE</div>
                <div style={{fontWeight: "600"}}>Reg.No: 6371159</div>
                <div>#902, 9th floor, New Horizon Building</div>
                <div>Olympic Street 4, Ulaanbaatar,</div>
                <div>Mongolia.</div>

                <a href="www.obortech.io" style={{marginTop: "15px"}}>www.obortech.io</a>
            </div>
        </div>    
            <div style={{position: "relative", width: "100%", display: "flex",   marginTop: "15px", borderTop: "1px solid #ccc", paddingTop: "5px"}} >
                <div style={{width: "270px", textAlign: "left"}}>
                    <div style={{color: "#ccc", fontWeight: "600"}}>BILL TO</div>
                    <div>{props.companyName} LLC</div>
                    <div>{props.surename} {props.lastname} </div>
                    <div>{props.companyAddress}</div>
                    <div style={{marginTop: "30px", marginBottom: "10px"}}>{props.mail}</div>
                </div>
                <div style={{marginTop: "10px", textAlign: "right", fontWeight: "600", lineHeight: "30px", width: "329px", marginLeft: "50px"}} >
                    <div style={{display: "flex"}}>  
                        <div style={{width: "160px", textAlign: "left"}}>Invoice Number:  </div>
                        <div style={{width: "50%", textAlign: "right"}}>{props.invoNumber}</div>
                    </div>
                    <div style={{display: "flex" }}> 
                        <div style={{width: "160px", textAlign: "left"}}>Invoice Date:</div>
                        <div style={{width: "50%", textAlign: "right"}}>{props.invoDate ? invoDate[0].date1: ""}</div>
                    </div>
                    <div style={{display: "flex" }}> 
                        <div style={{width: "160px", textAlign: "left"}}>Payment Due:</div>
                        <div style={{width: "50%", textAlign: "right"}}> {props.invoDate ? invoDate[1].date2: ""}</div>
                    </div>
                    <div style={{display: "flex" }}> 
                        <div style={{width: "160px", textAlign: "left"}}>Amount Due(MNT):</div>
                        <div style={{width: "50%", textAlign: "right"}}>{props.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮</div>
                    </div>
                    
                </div>
            </div>
            <div  style={Product}>
                <div style={ProductTitle}>Product</div>
                <div style={ProductQuantity}>Quantity</div>
                <div style={ProductPrice}>Price</div>
                <div style={ProductAmount}>Amount</div>
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
            <div>Total: </div>
            <div>{props.totalPrice}$</div>
            </div>
            <div style={AmountDue}>
            <div>Amount Due(MNT):</div>
            <div>{props.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}₮</div>
            </div> 
            <div style={Notes}> 
                <div style={BoldText}>Notes / Terms</div>
                <div style={{color: "red"}}>Нэхэмжлэлийн дугаарыг гүйлгээн дээрээ заавал бичнэ үү!</div>
            </div> 
            <div style={{display: "flex", textAlign: "left", margin: "10px 0px"}} > 
                <div style={{width: "50%"}}>
                    <div style={BoldText}>Trade Development Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
                </div>
                <div style={{marginLeft: "10px", width: "50%"}}>
                    <div style={BoldText}>State Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
                </div>
            </div>
            <div style={{display: "flex", textAlign: "left", margin: "10px 0px"}}> 
            <div style={{width: "50%"}}>
                    <div style={BoldText}>Golomt Bank</div>
                    <div>A/C Name: Обортек Монголиа ХХК</div>
                    <div>A/C Number: 555555555555555555</div>
            </div>
            <div style={{marginLeft: "10px", width: "50%"}}>
                <div style={BoldText} >Khaan Bank</div>
                <div>A/C Name: Обортек Монголиа ХХК</div>
                <div>A/C Number: 555555555555555555</div>
            </div>
            </div> 
    </div>
</div>
    </div>
}
export default InvoiceHtml;