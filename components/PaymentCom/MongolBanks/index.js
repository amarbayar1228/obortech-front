import { Button, Image } from "antd";
import React from "react";
import{ CaretLeftOutlined, CaretRightOutlined }from "@ant-design/icons"
import css from "./style.module.css"
import KhanBank from "../khanBank";
 
const MongolBanks = (props) =>{
    const leftFunc = () =>{
        console.log("object");
        document.getElementById('left').scrollLeft -= 40;
    }
    const rightFunc = () =>{
        console.log("object");
        document.getElementById('left').scrollLeft += 40;
    }
    

return <div> 
    <div className={css.Cont}>
            <div  style={{position: "absolute", left: "10px", zIndex: "11"}}><Button size="small" onClick={leftFunc} shape="circle"><CaretLeftOutlined/></Button> </div>
            <div style={{position: "absolute", right: "10px", zIndex: "11"}}><Button onClick={rightFunc} size="small" shape="circle"><CaretRightOutlined /></Button> </div>
        <div className={css.Scroll} id="left"> 

        <div className={css.Banks}>
            <Image alt="Obertech" preview={false} src="/img/boderkhan.png" width={30}/>
            <span style={{marginTop: "5px"}}>Khan bank</span>
        </div>
        <div className={css.Banks}>
        <Image alt="Obertech" preview={false} src="/img/borderGolomt.png" width={30} />
            <span style={{marginTop: "5px"}}>Golomt bank</span>
        </div>
        <div className={css.Banks}><Image alt="Obertech" preview={false} src="/img/borderHas.png" width={30} />
        <span style={{marginTop: "5px"}}>Xas bank </span>
            </div> 
        <div className={css.Banks}><Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={30} />
        
            <span style={{marginTop: "2px"}}>Trade and Development bank</span>
        </div>

        <div className={css.Banks}><Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={30} />
        
        <span style={{marginTop: "2px"}}>Trade and Development bank</span>
        </div>
        <div className={css.Banks}><Image alt="Obertech" preview={false} src="/img/borderTdb.png" width={30} />
            
            <span style={{marginTop: "2px"}}>Trade and Development bank</span>
        </div>
        </div> 
    </div>
<div> 
    <KhanBank data={props}/>
</div>
    </div>
}
export default MongolBanks;