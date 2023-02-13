import axios from "axios";
import  { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image} from "antd";
import css from "./style.module.css"

const ItemDetails = (props) =>{
const [item, setItem]= useState([]); 
const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
 

useEffect(()=>{
    window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMatches( e.matches ));
    // console.log("item DetailsL ", props);
    // doorh js dere bichne
     {/* {matches && (<h1>Big Screen</h1>)}
    {!matches && (<h3>Small Screen</h3>)} */}
    // setTimeOut
    // const getGroup = () =>{
        const body = { 
            func: "getGroups",
            status: 1,
            pkId: props.item,
            };
        axios.post("/api/post/Gate", body).then((res) => { 
            setItem(res.data.data.itemList);
        }).catch((err) => {console.log("err", err)});
    // }
    // getGroup();

},[props])

    return <div> 
                {item.map((e, i)=>(
                    <div className={css.ItemGLayout}>
                    <div style={{margin: "3px"}}>
                      <Image preview={false} alt="Obertech" src="/img/avatar.png" style={{display: "flex",  margin: "0px auto", justifyContent: "center", width:"40px"}}/>
                    </div>
                    <div className={css.ItemsDetLa}>
                        <div>{e.title}</div>
                        <div className={css.ItemsPrice}>
                          <div>Description</div>
                          <div>Price: 123$</div>
                        </div>
                    </div>
                  </div>
                ))}
                 
                {/* <div className={css.GroupPackageDtl}>
                    <div className={css.GpdImage}>
                        <Swiper slidesPerView={!matches && 2 || matches  && 3 } spaceBetween={30} freeMode={true}
                            autoplay={{delay: 211500, disableOnInteraction: false,
                            }} pagination={{clickable: true,}}  modules={[Autoplay, FreeMode, Pagination]} className="mySwiper">
                            {item.map((e, i)=>(
                            <SwiperSlide key={i}> 
                                <div className={css.Content}>

                                <div className={css.LogoAbGroup} style={{height: "35px"}}> 
                                </div>
                               
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
                </div> */}
    </div>
}
export default ItemDetails;