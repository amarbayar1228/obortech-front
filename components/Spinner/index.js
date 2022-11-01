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
            <Image preview={false} alt="Obertech"  src="img/HeaderLogo.png" style={{width: "33px", borderRadius: "2px", marginLeft: "5.1px"}}/>
    </div>
    </div>
}
export default Spinner;