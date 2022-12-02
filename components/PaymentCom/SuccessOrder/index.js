import { Button, Image, Modal } from "antd";
import React, { useEffect, useState } from "react";
import css from "./style.module.css"
import {CheckOutlined} from "@ant-design/icons";
const SuccessOrder = (props) =>{ 
    const [price,setPrice]= useState(0);
    const [toggle, setToggle] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(()=>{
        console.log("items: ", props.items);
    if(props.totalPriceState > 0 ){
        setPrice(props.totalPriceState);
        setItems(props.items);
        setToggle(true);
    }
        // setTitle(props.totalPriceState);

    },[])
const cancelF = () =>{
    setPrice(0);
    setToggle(false);
}
return <div>    
    {toggle ?
    <div className={css.Absolute}>
    <div className={css.Logo}> <Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg" width={200}/></div>

    <div style={{marginTop: "22px"}}> 
        <div>Сайн байна уу? OBORTECH 5355907</div>
        <div>Таны <span style={{color: 'red'}}> R441340050</span> дугаартай <span style={{color: 'red'}}> 2047,900 </span> төгрөг захиалгын төлбөр амжилттай <span style={{color: 'red'}}>ТӨЛӨГДЛӨӨ </span></div>
    </div>
    <div className={css.textDesc}> 
        Асууж лавлах зүйл байвал <span> 7719-9999 </span> дугаараас, <span>online@obortech.mn</span>  Хаягаар бидэнд хандана уу.
    </div>

    <div> 
        <div style={{fontSize: "20px", marginBottom: "20px", marginTop: "20px"}}>OBORTECH 5355907 </div>
        <div> OBORTECH Mongolia LLC Ulaanbaatar, Mongolia. OBORTECH in India: Sco 362, Top Floor Sector 44D, Chandigarh, India</div>
        <div>info@obortech.io </div>
    </div>
    <div className={css.Layout}>
         {items.map((e)=>(
            <div className={css.Items}>
                <div className={css.Image}>Zurag </div>
                <div className={css.DescWidth}> 
                    <div style={{textTransform: "uppercase"}}>{e.title} </div>
                    <div className={css.Descr}> 
                        <div className={css.Descrtext}>{e.description} </div> <div> Price: {e.price}$</div> 
                    </div>
                </div>
            </div>
         ))}
    </div>

    <div>Total price: {price} </div>
    </div>
    : ""}
</div> 
}
export default SuccessOrder;