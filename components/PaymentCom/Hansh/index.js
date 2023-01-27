import { useContext, useEffect, useState } from "react";
import BasketContext from "../../../context/basketContext/BasketContext";
import {Input,Button,message,Empty,Steps,Modal,Image,InputNumber,Row,Col,Radio,Form,Spin, Tooltip, Alert, Typography, notification, DatePicker, Select} from "antd";
import {CaretRightOutlined,WalletOutlined} from "@ant-design/icons";
import css from "./style.module.css"
const Hansh = (props) =>{
    const basketContext = useContext(BasketContext); 
    const [tugrugHansh, setTugrugHansh] = useState(0);
    const [coinHansh, setCoinHansh] = useState("");
    const [coinMnt, setCoinMnt] = useState("");
    const [niitVne, setNiitVne] = useState("");
    const [niitVneObot, setNiitVneObot] = useState("");
    const [dollar, setDollar] = useState([]);
    useEffect(()=>{
        console.log("Hansh");
        // TugrugDollar();
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

        const dollar1 = 0;
        dollar1 = props.totalPriceState * 0.4;
        setDollar(dollar => [...dollar,{dollar1: parseInt(dollar1).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}]);

        const dollar2 = 0;
        dollar2 = props.totalPriceState * 0.6;
        setDollar(dollar => [...dollar,{dollar2: parseInt(dollar2).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}]);

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
      <div className={css.HanshIcon}><CaretRightOutlined /> Rates</div>
        {/* {basketContext.hanshnuud.map((e, i) => (
            
          <div key={i} className={css.HanshCss}> 
            <div className={css.Tugrug}> 
              {e.code_ === "USD" ?  <div> $</div>
              : e.code_ === "TUG" ?  <div> ₮ </div>
              : e.code_ === "COIN" ? <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/HeaderLogo.png"/>: "" } 
              
          </div>
            <div>{e.paymentName === "Coin" ? "Obot" : e.paymentName === "Төгрөг" ? "АНУ доллар" : e.paymentName } </div> 
            <div style={{paddingLeft: "4px"}}> - {e.rate} {e.code_ === "USD" ? "$" : e.code_ === "TUG" ? "₮" : e.code_ === "COIN" ? "Dollar" : ""}</div>
          </div>
        ))}  */}
       <div style={{fontSize: "12px", fontWeight: "600", color: "#7e7e7e", marginLeft: "6px", marginTop: "5px"}}>Price Data for 1USD</div>
            <div className={css.HanshCss}> 
         
              <div className={css.Dollarcss}> 
               {/* <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit"}} src="/img/usdRate.png"/> */}
               $ 
            </div>
              <div>1 USD - <span style={{color: "#727272"}}>{basketContext.hanshnuud[0].mnt.hansh1}  MNT</span> </div> 
              {/* <div style={{paddingLeft: "4px"}}> - {basketContext.hanshnuud[0].mnt.hansh1} ₮ </div> */}
            </div> 
            <div className={css.HanshCss}> 
              <div style={{paddingRight: "10px"}}> 
               <Image alt="Obertech" preview={false} style={{position: "relative",width: "20px",height: "20px",objectFit: "inherit", borderRadius: "50%"}} src="/img/logomin.png"/>
            </div>
              <div>1 USD - <span style={{color: "#727272"}}>{basketContext.hanshnuud[1].obot.hansh}  OBOT</span> </div> 
              {/* <div style={{paddingLeft: "4px"}}> - {basketContext.hanshnuud[1].obot.hansh} OBOT </div> */}
            </div> 

      </div> 
            
      {props.bankChoose === "Mongol" ? 
        <div className={css.Fontcss}>
     
        </div>
        : props.bankChoose === "Coin" ?
        <div className={css.Fontcss}>
           
        </div>
        : props.bankChoose === "Usd" ?
        <div className={css.Fontcss}>

        </div>
        : null}
    </div>
}
export default Hansh;