import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import css from "./style.module.css"
import {CheckOutlined} from "@ant-design/icons";
const SuccessOrder = (props) =>{ 
    const [title,setTitle]= useState(0);
    const [toggle, setToggle] = useState(false);
    useEffect(()=>{
    if(props.totalPriceState > 0 ){
        setTitle(props.totalPriceState);
        setToggle(true);
    }
        // setTitle(props.totalPriceState);

    },[])
const cancelF = () =>{
    setTitle(0);
    setToggle(false);
}
return <div>    
    {toggle ?
    <div className={css.Absolute}>
        <div className={css.Layout}>
        <div> 
            <div className={css.CircD}> <div className={css.Circ}><CheckOutlined style={{color: "#fff", fontSize: "22px"}}/></div></div>
            <div className={css.Textcss}> 
            <div className={css.Title}>
                <div>Гүйлгээ амжилттай хийгдлээ</div>
                <div className={css.Price}>{title}$</div>
            </div>

            <div className={css.Padding}>
                <div className={css.Texts}>
                    <div className={css.STitle}>Шилжүүлсэн данс </div>
                    <div className={css.Price}> 55556464646MNT</div>
                </div>
                <div className={css.Texts}>
                    <div className={css.STitle}>Хүлээн авсан данс </div>
                    <div className={css.Price}> 555564646MNT</div>
                </div>
                <div className={css.Texts} style={{paddingTop: "5px"}}>
                    <div className={css.STitle}>EB-Е-Банк Гүйлгээний шимтгэл </div>
                    <div className={css.Price}> 100$</div>
                </div> 
            </div>

            <div className={css.Texts2}>
                <div>Гүйлгээ хийсэн он сар</div>
                <div> Шилжүүлэг</div>
            </div>
            <div className={css.Texts2}>
                <div style={{color: "#484848"}}>2022.10.30 / 09:11 </div>
                <div style={{color: "#484848"}}> #833800326492</div>
            </div>
            </div>
            <div className={css.Cancel}> 
            <Button type="link" shape="circle" onClick={cancelF}>
                X
            </Button>
            </div>
        </div>
        </div>
    </div>
    : ""}
</div> 
}
export default SuccessOrder;