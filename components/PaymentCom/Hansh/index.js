import { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import {Input,Button,message,Empty,Steps,Modal,Image,InputNumber,Row,Col,Radio,Form,Spin, Tooltip, Alert, Typography, notification, DatePicker, Select} from "antd";
import {CaretRightOutlined,ShoppingCartOutlined,MailOutlined ,SmileFilled,DeleteOutlined, PhoneOutlined, CheckCircleOutlined} from "@ant-design/icons";
import css from "./style.module.css"
const Hansh = (props) =>{
    const basketContext = useContext(BasketContext); 
    const [tugrugHansh, setTugrugHansh] = useState(0);
    const [coinHansh, setCoinHansh] = useState("");
    const [coinMnt, setCoinMnt] = useState("");
    const [niitVne, setNiitVne] = useState("");
    const [niitVneObot, setNiitVneObot] = useState("");
    useEffect(()=>{
        console.log("Hansh");
        TugrugDollar();
    },[]);

    const TugrugDollar = () =>{
        const tugrug = 0;
        tugrug = props.totalPriceState * 0.6;
        tugrug = tugrug * basketContext.hanshnuud[1].rate;
        setTugrugHansh(parseInt(tugrug).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"));

        const coin = 0;
        coin =  props.totalPriceState * 0.4;
        coin = coin / basketContext.hanshnuud[2].rate;
        setCoinHansh(parseInt(coin).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"));

        const coinMn = 0; 
        coinMn = basketContext.hanshnuud[2].rate * basketContext.hanshnuud[1].rate; 
        setCoinMnt(parseInt(coinMn).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
        
        const niit = 0;
        niit = props.totalPriceState * basketContext.hanshnuud[1].rate;
        setNiitVne(parseInt(niit).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"));

        const obotNiit = 0;

        obotNiit =  props.totalPriceState * 0.4 * basketContext.hanshnuud[1].rate;
        setNiitVneObot(parseInt(obotNiit).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
      
     
    }
    return <div className={css.Huwaalt}>
           {/* <div className={css.HanshRate}> */}
      <div className={css.HanshLayout}> 
      <div className={css.HanshIcon}><CaretRightOutlined /> Hansh</div>
        {basketContext.hanshnuud.map((e, i) => (
            
          <div key={i} className={css.HanshCss}> 
            <div style={{paddingRight: "10px"}}> 
              {e.code_ === "USD" ?  <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/united-kingdom.png"/> 
              : e.code_ === "TUG" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px", height: "20px",objectFit: "inherit"}} src="/img/mongolia.png"/> 
              : e.code_ === "COIN" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/HeaderLogo.png"/>: "" } 

              
          </div>
            <div>{e.paymentName === "Coin" ? "Obot" : e.paymentName === "Төгрөг" ? "АНУ доллар" : e.paymentName } </div> 
            <div style={{paddingLeft: "4px"}}> - {e.rate} {e.code_ === "USD" ? "$" : e.code_ === "TUG" ? "₮" : e.code_ === "COIN" ? "Dollar" : ""}</div>
          </div>
        ))} 
  
            <div className={css.HanshCss}> 
              <div style={{paddingRight: "10px"}}> 
               <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/HeaderLogo.png"/>
            </div>
              <div>Obot </div> 
              <div style={{paddingLeft: "4px"}}> - {coinMnt} Төгрөг </div>
            </div> 

      </div> 
            
      {props.bankChoose === "Mongol" ? 
        <div className={css.Fontcss}>
             <div><CaretRightOutlined /> Hansh</div>
            <div>Total: {props.totalPriceState}$ </div>
            {/* <div>Dollar: {basketContext.hanshnuud[0].rate}$ </div> */}
            <div>Төгрөг: {tugrugHansh}₮ / <span className={css.Fontcss2}> {props.totalPriceState}$ </span>  </div>
        </div>
        : props.bankChoose === "Coin" ?
        <div className={css.Fontcss}>
             {/* <div className={css.HanshIcon}><CaretRightOutlined /> Hansh</div> */}
            <div className={css.MntHuwi} style={{background: "rgb(244, 63, 94)", color: "rgb(255 241 242)", fontSize: "14px"}}> 
                <div className={css.MntHuwi2}>
                <div style={{display: "flex", alignItems: "center"}}> <Image alt="Obertech" preview={false} 
                style={{
                    display: "flex",
                alignItems: "center", 
                textAlign: "center",
                paddingLeft: "2px",
                paddingRight: "2px",
                width: "24px", 
                marginRight: "6px",
                borderRadius: "1px",
                height: "15px",
                 background: "#fff"
                }} src="/img/mongolia.png"/></div>
                    MNT 60%</div>
                <div className={css.MntHuwi2}>Нийт үнэ</div>
            </div>
            <div className={css.MntHuwi}> 
                <div className={css.MntHuwi2}> {tugrugHansh}₮</div>
                <div className={css.MntHuwi2}> {niitVne}₮</div>
            </div>

            <div className={css.MntHuwi} style={{background: "rgb(244, 63, 94)", color: "rgb(255 241 242)", fontSize: "14px"}}> 
                <div className={css.MntHuwi2} > <div style={{display: "flex", alignItems: "center"}}> <Image alt="Obertech" preview={false} 
                
                style={{
                   
                    display: "flex",
                    alignItems: "center", 
                    textAlign: "center",
                    paddingLeft: "2px",
                    paddingRight: "2px",
                    width: "24px", 
                    marginRight: "6px",
                    borderRadius: "1px",
                    height: "14px",
                     background: "#fff"
                
                }} 
                src="/img/united-kingdom.png"/></div> USD 60%</div>
                <div className={css.MntHuwi2}>Total</div>
            </div>
            <div className={css.MntHuwi}> 
                <div className={css.MntHuwi2}>{props.totalPriceState * 0.6}$</div>
                <div className={css.MntHuwi2}> {props.totalPriceState}$</div>
            </div>

            <div className={css.MntHuwi}style={{background: "rgb(244, 63, 94)", color: "rgb(255 241 242)", fontSize: "14px"}}> 
                <div className={css.MntHuwi2}>
                <div style={{display: "flex", alignItems: "center", paddingRight: "5px"}}> <Image alt="Obertech" preview={false} 
                style={{display: "flex", alignItems: "center", position: "relative",width: "20px",height: "20px",padding: "2px",objectFit: "inherit"}} src="/img/HeaderLogo.png"/></div>
                    OBOT 40%</div>
                <div className={css.MntHuwi2}>Total</div>
                <div className={css.MntHuwi2} style={{width: "100px"}}>Нийт үнэ</div>
            </div>
            <div className={css.MntHuwi}> 
                <div className={css.MntHuwi2}> {coinHansh} Obot</div>
                <div className={css.MntHuwi2}>{props.totalPriceState * 0.4}$  </div>
                <div className={css.MntHuwi2} style={{width: "100px"}}> {niitVneObot}₮ </div>
            </div>

            {/* <div>Total: {props.totalPriceState}$</div>
            <div>Нийт үнэ: {niitVne}₮</div>
            <div>Dollar: {props.totalPriceState * 0.6}$ / <span className={css.Fontcss2}>60% </span>  </div>
            <div>Төгрөг: {tugrugHansh}₮ / <span className={css.Fontcss2}> 60% </span>  </div>
            <div>OBOT: {coinHansh} / <span className={css.Fontcss2}> 40% 79800tugrug - dollar - 28$</span>  </div> */}
        </div>
        : props.bankChoose === "Usd" ?
        <div className={css.Fontcss}>
            <div>Total: 14.05$ </div>
            <div>Төгрөг: {tugrugHansh}₮ / <span className={css.Fontcss2}> {props.totalPriceState}$  </span>  </div> 
        </div>
        : null}
    </div>
}
export default Hansh;