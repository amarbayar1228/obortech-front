
import {React, useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { Button, Carousel, Empty, Image, message, Spin } from "antd";

import css from "./style.module.css";
import {ShoppingCartOutlined, PlusCircleOutlined} from "@ant-design/icons";
import axios from "axios";
import BasketContext from "../../context/basketContext/BasketContext";
// import "swiper/css"; 
// import "swiper/css/free-mode"; 
// import "swiper/css/pagination"; 
import ItemDetails from "../../components/ItemDetails";
const Items = () => {
  const [itemData, setItemData] = useState([]);
  const [addItemStyle, setAddItemStyle] = useState([css.addItemStyle]);
  const basketContext = useContext(BasketContext);
  const [spinState, setSpinState] = useState(true); 
  const [groupState1, setGroupState1] = useState([]);
  useEffect(() => {
    console.log("items");
    basketContext.MenuKey();
    basketContext.basketStateFunc();
    popFunc();
    getItems();
    getGroupItemsS1();
  }, []);
  const popFunc = () => {
    basketContext.basketStateFunc();
    setAddItemStyle([css.addItemStyle2]);
    setTimeout(() => {setAddItemStyle([css.addItemStyle])}, 500);
  };
  const getGroupItemsS1 = () => {
    const body = {func: "getGroups", status: 1};
    axios.post("/api/post/Gate", body).then((res) => {
        setGroupState1(res.data.data.list);
      }).catch((err) => {console.log("err", err)}); 
  }; 
  const getItems = () => {
    const body = {func: "getItems", status: 1};
    axios.post("/api/post/Gate", body).then((res) => {
        setSpinState(false); 
        setItemData(res.data.getItems.list); 
      }).catch((err) => {console.log(err)}); 
  }; 
  const SagsandNemeh = (data, index) => {
    let basketA = [];
    let notArrived = true;
    basketA = JSON.parse(localStorage.getItem("basket")) ?? [];
    if (basketA.length < 1) {
      basketA.push({product: [],});
      localStorage.setItem("basket", JSON.stringify(basketA));
    }
    basketA.forEach((e, i) => {
      e.product.forEach((e, indexs) => {
        if (data.pkId === e.pkId) {
          notArrived = false;
          message.warn("It's in the cart!");
          basketContext.basketStateFunc();
          popFunc();
          getItems();
        }
      });
      if (notArrived) {
        basketA[i].product.push(data);
        localStorage.setItem("basket", JSON.stringify(basketA));
        popFunc();
        basketContext.basketStateFunc();
        message.success("Added to cart!");
        basketContext.totalPriceFunction2();
      }
    });
  };
  const groupBasketAdd = (data, index) => {
    let basketA = [];
    let notArrived = true;
    basketA = JSON.parse(localStorage.getItem("basket")) ?? [];
    if (basketA.length < 1) {
      basketA.push({product: [],});
      localStorage.setItem("basket", JSON.stringify(basketA));
    }
    basketA.forEach((e, i) => {
      e.product.forEach((e, indexs) => {
        if (data.pkId === e.pkId) {
          notArrived = false;
          message.warn("It's in the cart!");
          basketContext.basketStateFunc();
          popFunc();
          getItems();
        }
      });
      if (notArrived) {
        basketA[i].product.push(data);
        localStorage.setItem("basket", JSON.stringify(basketA));
        popFunc();
        basketContext.basketStateFunc();
        
        message.success("Added to cart!");
        basketContext.totalPriceFunction2();
      }
    });
  }; 
  
  return (
    <BaseLayout pageName="items" addItemStyle={addItemStyle} style={{ maxWidth: "100%" }}>
      {basketContext.orgId === undefined ? <Empty style={{marginTop: "100px"}}/> :  
       <div className={css.ScrollItemsCont}><div>
       <Carousel>
         <div><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack1.png) no-repeat"}}>
           {/* <Image alt="Obertech" preview={false} className={css.bImg} src="/img/obBack1.png"/> */}
           </h3></div>
         <div><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack3.png) no-repeat"}}></h3></div>
         <div><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack2.png) no-repeat"}}></h3></div>
       </Carousel></div>
     {spinState === true ? (<div><Spin className={css.SpinCss} tip="" size="large"></Spin></div>) : (
       <>
         {itemData === undefined ? <Empty /> : (
           <div className={css.ItemSection}>
             {itemData.map((iData, index) => (
               <div className={css.Item} key={index}>
                 <div className={css.ItemLogo}><Image preview={false} alt="Obertech" src="/img/OBORTECH_logo_V_clean.svg"/></div>
                 <div className={css.ItemPic}>
                   <Image preview={false} alt="Obertech" src={"data:image/png;base64," + iData.img} className={css.ImgItem}/>
                   <div className={css.BtnPlus}><Button type="link" shape="circle" size="large" onClick={() => SagsandNemeh(iData, index)} icon={<ShoppingCartOutlined />}></Button></div>
                 </div>
                 <div className={css.ContText}>
                   <div className={css.ItemTitle1}> {iData.title}</div>
                   <div className={css.ItemDescriptionText}>{iData.description}</div>
                   <div className={css.ItemPrice}>{iData.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
                 </div>
               </div>
             ))}
           </div>
         )}
         {/* Groupt items ===========================================================================================================*/}
         <div className={css.Package}> <div className={css.PackageLine}></div> <div className={css.PackageTitle}>Package items</div></div>
         <div className={css.GroupLayoutCss}> 
           <div>
             {groupState1 === undefined ? ("item bhq") : (
               <>
                 {groupState1.map((e, gst1) => (
                   <div key={gst1}>
                     <div className={css.GroupPackage}>
                       <div className={css.GroupPackageHdr}> <div className={css.PackageName}>Package</div>
                         <div className={css.GroupPackageTitle}>
                           <div className={css.Gphtitle}>{e.title}</div> <div className={css.Gphdescrip}> {e.description}</div>
                           <div className={css.Gphprice}><span>Package price: </span><span>{e.price}$</span></div>
                         </div>
                         <div className={css.GrpBtn}><Button type="link" shape="circle" size="large" danger icon={<ShoppingCartOutlined />}    onClick={() => groupBasketAdd(e, gst1)}></Button></div>
                       </div>
                       <ItemDetails item={e.pkId}/>
                     </div>
                   </div>
                 ))}
               </>
             )}
           </div> 
         </div>
         <div style={{width: "100%", background: "rgb(30 41 59)", height: "250px"}}></div>
       </>
       
     )}
   
      </div>
      } 
    </BaseLayout>
  );
};
export default Items;
