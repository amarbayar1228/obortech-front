import axios from "axios";
import  { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Carousel, Image, message, Spin } from "antd";
import css from "./style.module.css"
const ItemDetails = (props) =>{
const [item, setItem]= useState([]);
const [toogle, setToogle] = useState(false);
const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )
useEffect(()=>{
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
const body = { 
func: "getGroups",
status: 1,
pkId: props.item,
};
    axios.post("/api/post/Gate", body)
    .then((res) => { 
        setItem(res.data.data.itemList);
    })
    .catch((err) => {
        console.log("err", err);
    });
},[])
    return <div> 
                <div className={css.GroupPackageDtl}>
                    <div className={css.GpdImage}>
                        <Swiper slidesPerView={!matches && 2 || matches  && 3 } spaceBetween={30} freeMode={true}
                            autoplay={{delay: 211500, disableOnInteraction: false,
                            }} pagination={{clickable: true,}}  modules={[Autoplay, FreeMode, Pagination]} className="mySwiper">
                            {item.map((e, i)=>(
                            <SwiperSlide key={i}> 
                                <div className={css.Content}>

                                <div className={css.LogoAbGroup} style={{height: "35px"}}>
                                    {/* <Image alt="Obertech" preview={false} src="/img/OBORTECH_logo_V_clean.svg" style={{ marginLeft: "6px", width: "60px" }}/> */}
                                </div>
                                {/* {matches && (<h1>Big Screen</h1>)}
                                {!matches && (<h3>Small Screen</h3>)} */}
                                <div className={css.ImageCss}><Image alt="Obertech" preview={false} className={css.ImageSize} src={"data:image/png;base64," + e.img} /></div>
                                <div className={css.Ddescrip}>
                                    <div className={css.Dtitle}>{e.title}</div>
                                    <div className={css.Ddescrip2}>{e.decription}{e.description}</div>
                                    <div className={css.Dprice}> {e.itemPriceD}$</div>
                                </div>
                                </div>
                            </SwiperSlide>))}  
                        </Swiper>
                    </div>
                </div>
    </div>
}
export default ItemDetails;