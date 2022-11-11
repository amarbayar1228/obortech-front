import React from "react";
import css from "./style.module.css"
import {Image } from "antd";
const Spinner = () =>{
    return <div className={css.BoxShadow}>
          <div className={css.Loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {/* <Image preview={false} alt="Obertech"  src="img/HeaderLogo.png" style={{width: "33px", borderRadius: "2px", marginLeft: "5.1px"}}/> */}
            <div className={css.LogBox}>
              <div style={{display: "flex", justifyContent: "space-around",alignItems: "center"}}> 
                <div className={css.BoxChild}></div>
                <div className={css.Line}></div>
                <div className={css.BoxChild}></div>
              </div>
              <div className={css.BoxTopLine}>
                <div className={css.UpLine}> </div>
                <div className={css.UpLine} style={{marginLeft:"11px"}}></div>
              </div>
              <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}> 
                <div className={css.BoxChild}></div>
                <div className={css.Line}></div>
                <div className={css.BoxChild}></div>
              </div>
            </div>
    </div>
    </div>
}
export default Spinner;