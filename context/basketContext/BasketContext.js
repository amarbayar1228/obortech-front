import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
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
  const { t } = useTranslation(["login", "organization", "dashboard", "order-history", "security"]); 

  const router = useRouter();
  useEffect(() => {   
    
    basketStateFunc();
    routerFunction();
    MenuKey();
    getUserProfileFunction();
    HanshFunc();
    todayDate();
    orgIdLocal(); 
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
  const routerFunction = () => {
    // if(router.pathname == "/items"){
    //   if(orgId === ""){
    //       router.push("/");
    //   }else{
    //     router.push("/items");
    //   }
    // }

    // if (router.pathname == "/login") {
    //   if (localStorage.getItem("username")) {
    //     router.push("/");
    //   } else {
    //     router.push("/login");
    //   }
    // }
    // if (router.pathname == "/add-item") {
    //   if (localStorage.getItem("isSuperAdmin") === "1") {
    //     router.push("/add-item");
    //   } else {
    //     router.push("/");
    //   }
    // }
    // if (router.pathname == "/dashboard") {
    //   if (localStorage.getItem("username")) {
    //     router.push("/dashboard");
    //   } else {
    //     router.push("/");
    //   }
    // }
    // if (router.pathname == "/add-admin") {
    //   if (localStorage.getItem("isSuperAdmin") === "1") {
    //     router.push("/add-admin");
    //   } else {
    //     router.push("/");
    //   }
    // }
    // if (router.pathname == "/profile") {
    //   if (localStorage.getItem("username") === "1") {
    //     router.push("/profile");
    //   } else {
    //     router.push("/");
    //   }
    // }
    // if (router.pathname == "/affiliate") {
    //   if (localStorage.getItem("isSuperAdmin") === "1") {
    //     router.push("/affiliate");
    //   } else {
    //     router.push("/");
    //   }
    // }
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
          setUserInfoProfile(res.data.data);
        }).catch((err) => {console.log(err)});
    } else { 
      setUserInfoProfile(undefined);
    } 
   
  };
  
  const HanshFunc = () => {
    const body = {func: "getRate"};
    axios.post("/api/post/Gate", body).then((res) => { 
      // console.log("rate: ", res.data.data);
      const obotRate = res.data.data.map.data.map.obotValueCG
      axios.get("http://monxansh.appspot.com/xansh.json?currency=USD|EUR'").then((res)=>{
        // console.log("mongol rate", res.data);
        // setHanshnuud(res.data.data);
        setHanshnuud([{mnt:{hansh1:  res.data[0].rate, hansh2: res.data[0].rate_float}},{obot:{hansh: obotRate}}]);

      }).catch((err)=>{
        console.log("err",err);
      })
      
      })
      .catch((err) => {
        console.log("err: ", err);
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
