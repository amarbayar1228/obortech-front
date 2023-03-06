
import {useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import { Button, Empty, Image, Input, message, Spin, Tooltip  } from "antd";

import css from "./style.module.css";
import {ShoppingCartOutlined, SendOutlined, MediumOutlined, LinkedinOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import axios from "axios";
import BasketContext from "../../context/basketContext/BasketContext";
import "swiper/css/pagination"; 
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemDetails from "../../components/ItemDetails";
import PaginationComp from "../../components/ItemGroupComp/Pagination";
 
const { TextArea } = Input;
const ItemGroup = () => {
  const [itemData, setItemData] = useState([]);
  const [addItemStyle, setAddItemStyle] = useState([css.addItemStyle]);
  const basketContext = useContext(BasketContext);
  const [spinState, setSpinState] = useState(true); 
  const [groupState1, setGroupState1] = useState([]);
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
      console.log("group items");
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
          // getItems();
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
    <BaseLayout pageName="items" addItemStyle={addItemStyle} style={{ maxWidth: "100%", fontFamily: "Roboto Condensed, sans-serif" }}> 
      {basketContext.orgId === undefined ? <Empty style={{marginTop: "100px"}}/> :  
       <div className={css.ScrollItemsCont} style={{fontFamily: "Roboto Condensed, sans-serif"}}>
           
      <div>
        <Swiper pagination={true} modules={[Pagination]} className={css.mySwiper}>
          <SwiperSlide className={css.SlideCss}>
            <h3 className={css.BackgrounImg} style={{background: "url(/img/obBack1.png) no-repeat",display: "flex", justifyContent: "space-between", margin: 0, padding: "0", overflow: 'hidden'}}></h3> 
          </SwiperSlide>
          <SwiperSlide className={css.SlideCss}><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack3.png) no-repeat"}}></h3></SwiperSlide>
          <SwiperSlide className={css.SlideCss}><h3 className={css.BackgrounImg} style={{background: "url(/img/obBack2.png) no-repeat"}}></h3></SwiperSlide> 
        </Swiper> 
       </div>
     {spinState === true ? (<div><Spin className={css.SpinCss} tip="" size="large"></Spin></div>) : (
       <>
          <div className={css.ItemTitlecss}>
            <div className={css.ItemBackcss}>
              <div className={css.ItemsTitlechild}>
                <div className={css.TitleWhiteBackg}>

                </div>
                Items</div>
            </div>
          </div>
         {itemData === undefined ? <Empty /> : (
           <div className={css.ItemSection}>
               
             {itemData.map((iData, index) => (
               <div className={css.Item} key={index}>
                 <div className={css.ItemLogo}> 
                 Item
                 </div>
                 <div className={css.ItemPic}> 
                   <Image preview={false} alt="Obertech" src={"data:image/gif;base64," + iData.img} className={css.ImgItem}/>
                   <div className={css.BtnPlus}>
                   <Tooltip title="Add basket" color="red" placement="bottom">
                      <Button type="link" danger shape="circle" size="large" onClick={() => SagsandNemeh(iData, index)} icon={<ShoppingCartOutlined />}></Button>
                    </Tooltip>
                    </div>
                 </div>
                 <div className={css.ContText}>
                   <div className={css.ItemTitle1}> {iData.title}</div>
                   <div className={css.ItemDescriptionText}>{iData.description}</div>
                   <div className={css.ItemPrice}>{iData.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$</div>
                 </div>
               </div>
             ))}
             <div style={{display: "flex",marginTop: "25px", justifyContent: "flex-end", width: "100%"}}> 
                <PaginationComp />
             </div>
           </div>
         )}
         {/* Groupt items ===========================================================================================================*/}
         <div className={css.ItemTitlecss}>
            <div className={css.ItemBackcss}>
              <div className={css.ItemsTitlechild}>
                <div className={css.TitleWhiteBackg}>

                </div>Pacakge items</div>
            </div>
          </div>
          <div className={css.GroupCss}>
            {groupState1.map((e, i)=>(
                <div className={css.GroupItems} key={i}>
                 <div className={css.GrpPic}>
                 <div className={css.GrpPackHdr}> 
                   <div className={css.BackImg}></div>
                   <div className={css.PackageName}>Package</div>
                   <div className={css.GroupPackageTitle}>
                       <div className={css.Gphtitle}>{e.title}</div> <div className={css.Gphdescrip}> {e.description}</div>
                       <div className={css.Gphprice}><span>Package price: </span><span>{e.price}$</span></div>
                   </div>
                   </div> 
                 </div>
                 <div className={css.GrpDetails}>
                     <div className={css.GrpHdrTitle}>
                       <div>{e.title}</div>
                     </div>
                     <div className={css.GrpItems}>
                     <ItemDetails item={e.pkId}/>

                       {/* <div className={css.ItemGLayout}>
                         <div style={{margin: "3px"}}>
                           <Image preview={false} alt="Obertech" src="/img/avatar.png" style={{display: "flex",  margin: "0px auto", justifyContent: "center", width:"40px"}}/>
                         </div>
                         <div className={css.ItemsDetLa}>
                             <div>Title</div>
                             <div className={css.ItemsPrice}>
                               <div>Description</div>
                               <div>Price: 123$</div>
                             </div>
                         </div>
                       </div> */}
                       
                       
                     </div>
                     <div className={css.GrpHdrDesc}>
                       <div style={{fontWeight: "600"}}>Price: {e.price}$</div>
                     <Tooltip title="Add basket" color="red" placement="right"><div className={css.GrpBtn2}><Button type="link" shape="circle" size="large" danger icon={<ShoppingCartOutlined />}    onClick={() => groupBasketAdd(e, i)}></Button></div></Tooltip>
                     </div>
                 </div>
               </div>
            ))}
              <div style={{display: "flex",marginTop: "25px", justifyContent: "flex-end", width: "100%"}}> 
                <PaginationComp />
             </div>
          </div>
            
         {/* <div className={css.GroupLayoutCss}> 
           <div>
             {groupState1 === undefined ?  <Empty /> : (
               <>
                 {groupState1.map((e, gst1) => (
                   <div key={gst1}>
                     <div className={css.GroupPackage}>
                       <div className={css.GroupPackageHdr}> 
                        <div className={css.BackImg}></div>
                         <div className={css.PackageName}>Package</div>
                         <div className={css.GroupPackageTitle}>
                           <div className={css.Gphtitle}>{e.title}</div> <div className={css.Gphdescrip}> {e.description}</div>
                           <div className={css.Gphprice}><span>Package price: </span><span>{e.price}$</span></div>
                         </div>
                        <Tooltip title="Add basket" color="red" placement="right"><div className={css.GrpBtn}><Button type="link" shape="circle" size="large" danger icon={<ShoppingCartOutlined />}    onClick={() => groupBasketAdd(e, gst1)}></Button></div></Tooltip>
                       </div>
                       <ItemDetails item={e.pkId}/>
                     </div>
                   </div>
                 ))}
               </>
             )}
           </div> 
         </div> */}


         <div style={{width: "100%", background: "#D2D3D5", color: "#4d5057"}}>
            <div className={css.Footercss}>
              <div className={css.FtLayout}>
                <div className={css.Socialapp}>
                  <div style={{marginBottom: "10px"}}>
                    <Image preview={false} alt="Obertech" src={"/img/OBORTECH_logo_H_clean.svg"} width={150} />
                  </div>
                  <div className={css.FtInfo}>
                    <div className={css.FtText}>
                      <div>OBORTECHglobal OU</div>
                      <div>Tallinn, Estonia.</div>
                    </div>
                    <div className={css.FtText}>
                      <div>ОБОРТЕЧ МОНГОЛИА ХХК</div>
                      <div>Улаанбаатар хот, Монгол улс.</div>
                    </div>
                    <div className={css.FtText}>
                      <div>OBORTECH Poland</div>
                      <div>Warsaw, Poland.</div>
                    </div>
                    <div className={css.FtText}>
                      <div>OBORTECH БНЭУ:</div>
                      <div>Chandigarh, India </div>
                    </div>
                    <div className={css.FtText}>
                      <div>info@obortech.io</div> 
                    </div>
                  </div>
                  <div style={{display: "flex", gap: "10px"}}>
                    <Button shape="circle" icon={<SendOutlined />}></Button>
                    <Button shape="circle" icon={<MediumOutlined />}></Button>
                    <Button shape="circle" icon={<LinkedinOutlined />}></Button>
                    <Button shape="circle" icon={<FacebookOutlined />}></Button>
                    <Button shape="circle" icon={<TwitterOutlined />}></Button>
                    <Button shape="circle" icon={<YoutubeOutlined />}></Button>
                  </div>
                </div>
                <div className={css.myAcc}>
                    <div className={css.myAccTitle}> 
                      <div className={css.BorderLef}></div>
                      <div style={{textTransform: "uppercase"}}>MY ACCOUNT</div>
                    </div>
                    <div className={css.myAccChild}>
                      <div className={css.CircleLink}> 
                        <div className={css.circleAcc}></div>
                        <div> My Account</div>
                      </div>
                      <div className={css.CircleLink}> 
                        <div className={css.circleAcc}></div>
                        <div> My Cart</div>
                      </div> 
                      <div className={css.CircleLink}> 
                        <div className={css.circleAcc}></div>
                        <div>Sign in</div>
                      </div> 
                      <div className={css.CircleLink}> 
                        <div className={css.circleAcc}></div>
                        <div>Registration</div>
                      </div>  
                      <div className={css.CircleLink}> 
                        <div className={css.circleAcc}></div>
                        <div>Check out</div>
                      </div>  
                      <div className={css.CircleLink}> 
                        <div className={css.circleAcc}></div>
                        <div> Order Complete</div>
                      </div>  
                    </div>
                </div>
                <div className={css.SendMail}>
                  <div className={css.myAccTitle}> 
                    <div className={css.BorderLef}></div>
                    <div style={{textTransform: "uppercase"}}>Get in touch</div>
                  </div>
                  <div>
                      <Input placeholder="Name" style={{marginBottom: "10px"}} />
                  </div>
                  <div>
                      <Input placeholder="Email" style={{marginBottom: "10px"}}/>
                  </div>
                  <div>
                      <TextArea placeholder="Message" style={{marginBottom: "10px"}}/>
                  </div>
                   <div>
                      <Button type="primary">SUBMIT MESSAGE</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.CrSize}> 
              <div className={css.CopyRight}>
                  <div>Copyright © 2023 OBORTECH. All Rights Reserved.</div>
                  <div>
                    <Image preview={false} alt="Obertech" src={"/img/cardnuud.png"} width={150} />
                  </div>
              </div>
            </div>
         </div>
       </>
       
     )}
   
      </div>
      } 
    </BaseLayout>
  );
};
export default ItemGroup;
