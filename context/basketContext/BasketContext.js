import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message, notification, Spin } from "antd";
import axios from "axios";
import { useTranslation } from "next-i18next";
const BasketContext = React.createContext();
export const BasketItem = (props) => {
  const [basketState, setBasketState] = useState([]);
  const [menuSelectKeyState, setMenuSelectKeyState] = useState("1");
  const [localStorageBasketLength, setLocalStorageBasketLength] = useState();
  const [totalPriceState, setTotalPriceState] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [userInfoProfile, setUserInfoProfile] = useState();
  const [hanshnuud, setHanshnuud] = useState([]);
  const [todayDateState,setTodayDateState] = useState();
  const [orgId, setOrgId] = useState(undefined);
  const [orgNames, setOrgNames] = useState([]);
  const { t, ready } = useTranslation(["login", "organization", "dashboard", "order-history", "security", "header"]); 

  const router = useRouter();
  useEffect(() => {
    // setTimeout(()=>{
      basketStateFunc();
      MenuKey();
      getUserProfileFunction();
      HanshFunc();
      todayDate();
      orgIdLocal(); 
    // },600)
    

  }, []);

  const onCollapse = (e) => {
    setCollapsed(e);
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };
const orgIdLocal = (orgName, orgId) =>{ 
  // setOrgId(localStorage.getItem("orgId")) 
  setOrgNames([{orgIdstate: orgId}]);
  
  setOrgId(orgName);  
}
const orgIdRemove = () =>{
  setOrgId(undefined); 
}
  const removeBasketStorage = () => {
    localStorage.removeItem("basket");
    setBasketState([]);
    basketStateFunc();
  };
  

  var basketLocal = [];
  const basketStateFunc = (a) => { 
    basketLocal = JSON.parse(localStorage.getItem("basket")) ?? [];
    basketLocal.forEach((element) => {
      element.product.forEach((p, i) => {
        if (p.hasOwnProperty("gbm")) {
          let sum = 0;
          p.gbm.forEach((e) => {
            sum += e.itemCnt * e.itemPriceD;
          });
          element.product[i].groupTotalPrice = sum;
        }
      });
      setBasketState(element.product);
    });
    // totalPriceFunction();
  };
  const increase = (i, totalPriceFunction) => { 
    basketState[i].cnt = basketState[i].cnt + 1;
    setBasketState([...basketState]);
    totalPriceFunction();
  };
  const decline = (i, totalPriceFunction) => {
    if (basketState[i].cnt > 1) {
      basketState[i].cnt = basketState[i].cnt - 1;
      setBasketState([...basketState]);
      totalPriceFunction();
    }
  };
  const MenuKey = (a) => {
    setMenuSelectKeyState(a);
  };
  var b = [];
  const basketItemDelete = (index, totalPriceFunction) => {
    basketState.splice(index, 1);
    setLocalStorageBasketLength(basketState.length);
    b = JSON.parse(localStorage.getItem("basket"));
    b.forEach((element, i) => {
      b[i].product = basketState;
    });
    setBasketState(basketState);
    localStorage.setItem("basket", JSON.stringify(b));
    totalPriceFunction();
    message.success("Item was removed."); 
    basketStateFunc();
  };
  const totalPriceFunction2 = () => {
    let totalPirce2 = 0;
    basketState.forEach((element) => { 
      totalPirce2 += element.cnt * element.itemPriceTotal;
    });
    setTotalPriceState(totalPirce2);
  };
  const getUserProfileFunction = () => {
    if (localStorage.getItem("pkId")) {
      const body = {
        func: "getUserInfo",
        pkId: localStorage.getItem("pkId"),
      };
      axios.post("/api/post/Gate", body).then((res) => {  
        // console.log("pro: ", res.data.data);
          setUserInfoProfile(res.data.data);
        }).catch((err) => {console.log(err)});
    } else { 
      setUserInfoProfile(undefined);
    } 
   
  };
  
  const HanshFunc = () => { 
    const body = {func: "getRate"};
    const rate  = {
      func: "getUSDrate"
    }
     // obot rate
    axios.post("/api/post/Gate", body).then((res) => { 
       
      console.log("OBOT: ", res.data.data);
      const obotRate = res.data.data.map.data.map.obotValueCG
        //mnt rate
        axios.post("/api/post/Gate",rate ).then((res)=>{
          console.log("Rate: ", res.data.data.myArrayList[0].map);
          // setHanshnuud(res.data.data);
          setHanshnuud([
            {mnt:{hansh1:  res.data.data.myArrayList[0].map.rate, 
              hansh2: res.data.data.myArrayList[0].map.rate_float}},
            {obot:{hansh: obotRate}}]);

        }).catch((err)=>{
          console.log("err",err);
        })
        
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description:
            'Obot hansh tatahad aldaa garlaa!!!',
        });

        setHanshnuud([
          {mnt:{hansh1:  "100", 
            hansh2: 100.0}},
          {obot:{hansh: 0.008746}}]); 
      });
  };
  const todayDate = () =>{ 
      const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12",];
      var date = new Date();
      var d1 =  date.getFullYear() + "-" + mounths[date.getMonth()] + "-" + date.getDate() + "";  
      setTodayDateState(d1);
  }
  const groupDetailFuncContext = (groupDetails) => {  
    groupDetails();
  }
  const clearBasket = () =>{
    localStorage.removeItem("basket");
    setBasketState([]);
  }
     // Locize Loading...
     if (!ready)
     return (
       <div style={{position: "absolute", height:"100vh", width: "100%", }} >
         <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%"}}>
           <Spin size="default" /> 
         </div>
       </div>
     );
  return (
    <BasketContext.Provider
      value={{ orgNames, t,
        orgId, orgIdLocal, groupDetailFuncContext, clearBasket,orgIdRemove,
        basketState, getUserProfileFunction, userInfoProfile, onCollapse, toggle, hanshnuud, collapsed, basketItemDelete,
        totalPriceFunction2, totalPriceState, removeBasketStorage, decline,
        MenuKey, todayDateState, localStorageBasketLength, increase, basketStateFunc, menuSelectKeyState,
      }}>
      {props.children}
    </BasketContext.Provider>
  );
};
export default BasketContext;
