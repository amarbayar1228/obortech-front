import { Empty } from "antd";
import { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout"
import BasketContext from "../../context/basketContext/BasketContext";
import axios from "axios";
import css from "./style.module.css";
import {ShoppingCartOutlined} from "@ant-design/icons";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const ItemGroups = () =>{
const [itemData, setItemData] = useState([]);
const [addItemStyle, setAddItemStyle] = useState([css.addItemStyle]); 
const [spinState, setSpinState] = useState(true); 
const [groupState1, setGroupState1] = useState([]);
const basketContext = useContext(BasketContext);
useEffect(() => { 
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
    // console.log("items: ", res.data);
    setSpinState(false); 
    setItemData(res.data.getItems.list); 
    }).catch((err) => {console.log(err)}); 
}; 
const SagsandNemeh = (data, index) => {

let basketA = [];
let notArrived = true;
let notArrived2 = true;
let Overlap = true;
basketA = JSON.parse(localStorage.getItem("basket")) ?? [];
if (basketA.length < 1) {
    basketA.push({product: [],});
    localStorage.setItem("basket", JSON.stringify(basketA));
}
basketA.forEach((e, i) => {
    e.product.forEach((e, indexs) => {
    // console.log("garaas:", data.type_);
    // console.log("local: ", e.type_);

    if (data.pkId === e.pkId) {
        basketA[i].product[indexs].cnt++;
        localStorage.setItem("basket", JSON.stringify(basketA)); 
        notArrived = false;
        message.warn("Added to cart!");
        basketContext.basketStateFunc();
        popFunc();
        // getItems();
    }else if(e.type_ === 106){ 
        if(data.type_ === 107){
            Overlap = false;
            notArrived = false; 
        } 
    }else if(e.type_ === 107){ 
        if(data.type_ === 106){
            
            Overlap = false;
            notArrived = false; 
        } 
    }

    
    });
    if(Overlap === false){
        message.error("Error");
    } 
    
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
      
    return<BaseLayout pageName="item-group">
        <div>
            {basketContext.orgId === undefined ? <Empty /> 
            : <div> 
    <div className={css.ScrollItemsCont} style={{fontFamily: "Roboto Condensed, sans-serif"}}>
        <div>
            <Swiper pagination={true} modules={[Pagination]} className={css.mySwiper}>
            <SwiperSlide className={css.SlideCss}><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack1.png) no-repeat",display: "flex", justifyContent: "space-between", margin: 0, padding: "0", overflow: 'hidden'}}> 
                </h3> </SwiperSlide>
            <SwiperSlide className={css.SlideCss}><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack3.png) no-repeat"}}></h3></SwiperSlide>
            <SwiperSlide className={css.SlideCss}><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack2.png) no-repeat"}}></h3></SwiperSlide> 
            </Swiper> 
        </div>
    </div>
        </div>    
        }
        </div>
    </BaseLayout>
}
export default ItemGroups;
