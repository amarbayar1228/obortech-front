import { Button, Empty, Image } from "antd";
import css from "./style.module.css";
import { useRouter } from "next/router";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import BasketContext from "../../context/basketContext/BasketContext";
const BacketComponent = (props) => {
  const basketContext = useContext(BasketContext);
  const { t } = useTranslation("basket");
  const router = useRouter();
  const [loadings, setLoadings] = useState([]);
  const [totalPrice, setTotalPriceState] = useState(0);
  // useEffect(() => {
  //   basketContext.basketStateFunc(); 
  // }, []);
  const paymentRoute = (index) => {
    router.push("/payment");
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  const totalPriceFunction = () => {
    let price = 0;
    basketContext.basketState.forEach((element) => { 
      console.log("delete: ", element);
      price += element.cnt * element.price;
    });
     setTotalPriceState(price);
  };
const clearFunc = () =>{
  console.log("clear");
  localStorage.removeItem("basket");

}
  return (
    <div className={css.Basket}>
      {basketContext.basketState.length === 0 ? (
        <div> 
          <Empty description={<span style={{ fontSize: "15px", fontWeight: "600"}}>{t("basketEmpty")}</span>}/> 
        </div>
      ) : (
        <> 
        {/* <div className={css.OrgIdCss}>
          <div>Organization ID: </div>
          <div className={css.OrgOver}>{basketContext.orgId === undefined ? "" : basketContext.orgId}</div>
        </div> */}
        <div className={css.BasketScroll}>
          {basketContext.basketState.map((e, i) => (
            <div className={e.img === undefined ? css.grpBackColor : css.BasketItem} key={i}>
              <div className={css.Zurag}>
                {e.img === undefined ? <div className={css.PgrCss}>P</div> : <Image alt="Obertech" preview={false} src={"data:image/png;base64," + e.img} />} 
              </div>
              <div className={css.Descrip}>
                <div className={css.Title}>
                  <div className={css.ItemTitle}>{e.title}</div>
                  <div>
                    <Button className={css.CloseBtn} type="default" size="small" shape="circle" onClick={() =>basketContext.basketItemDelete(i, totalPriceFunction)}
                      icon={<CloseOutlined style={{ fontSize: "10px", fontWeight: "500"}}/>}></Button>
                  </div>
                </div>
                <div className={css.Price}>
                  <div> Cnt: {e.cnt}</div>
                  <div>{parseInt(e.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$ {e.itemPriceTotal}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
      <div className={css.Orderbtns}> 
        <div className={css.BtnOrder}>
          <Button size="small" style={{fontSize: "14px", marginRight: "5px"}} onClick={()=>basketContext.clearBasket()}>clear</Button>
          <Button className={css.OrderIcon} type="primary" icon={<ShoppingCartOutlined style={{ fontSize: "16px" }} />} loading={loadings[1]} size="small" 
          onClick={() => paymentRoute(1)}>View cart</Button>
        </div>
      </div>
    </div>
  );
};
export default BacketComponent;
