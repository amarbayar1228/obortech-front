import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
import axios from "axios";
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
  const [orgId, setOrgId] = useState("");
  const router = useRouter();
  useEffect(() => {  
    console.log("context: ");
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
const orgIdLocal = (orgId) =>{ 
  // setOrgId(localStorage.getItem("orgId"))
  setOrgId(orgId);
  console.log("orgId: ", orgId);
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

    if (router.pathname == "/login") {
      if (localStorage.getItem("username")) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
    if (router.pathname == "/add-item") {
      if (localStorage.getItem("isSuperAdmin") === "1") {
        router.push("/add-item");
      } else {
        router.push("/");
      }
    }
    if (router.pathname == "/dashboard") {
      if (localStorage.getItem("username")) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
    if (router.pathname == "/add-admin") {
      if (localStorage.getItem("isSuperAdmin") === "1") {
        router.push("/add-admin");
      } else {
        router.push("/");
      }
    }
    if (router.pathname == "/profile") {
      if (localStorage.getItem("username") === "1") {
        router.push("/profile");
      } else {
        router.push("/");
      }
    }
    if (router.pathname == "/affiliate") {
      if (localStorage.getItem("isSuperAdmin") === "1") {
        router.push("/affiliate");
      } else {
        router.push("/");
      }
    }
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
    console.log("increase: ", basketState[i]);
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
    message.success("Item was removed.");
    totalPriceFunction();
    basketStateFunc();
  };
  const totalPriceFunction2 = () => {
    let totalPirce2 = 0;
    basketState.forEach((element) => {
      console.log("element basket: ", element);
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
      axios
        .post("/api/post/Gate", body)
        .then((res) => {
          console.log("Context profile data: ", res.data.data);
          setUserInfoProfile(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("null");
    }
    // if (localStorage.getItem("pkId")) {
    //   const body = {
    //     pkId: localStorage.getItem("pkId"),
    //   };
    //   axios
    //     .post("/api/post/getUserProfile", body)
    //     .then((res) => {
    //       setUserInfoProfile(res.data[0]);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    // }
  };

  const HanshFunc = () => {
    const body = {
      func: "getRate",
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        console.log("hansh", res.data.data);
        setHanshnuud(res.data.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const todayDate = () =>{
      console.log("date:");
      const mounths = ["01","02","03","04","05","06","07","08","09","10","11","12",];
      var date = new Date();
      var d1 =  date.getFullYear() + "-" + mounths[date.getMonth()] + "-" + date.getDate() + ""; 
      console.log("todayDate", d1);
      setTodayDateState(d1);
  }
  const groupDetailFuncContext = (groupDetails) => {  
    groupDetails();
  }
  return (
    <BasketContext.Provider
      value={{
        orgId, orgIdLocal, groupDetailFuncContext,
        basketState, getUserProfileFunction, userInfoProfile, onCollapse, toggle, hanshnuud, collapsed, basketItemDelete,
        totalPriceFunction2, totalPriceState, removeBasketStorage, decline,
        MenuKey, todayDateState, localStorageBasketLength, increase, basketStateFunc, menuSelectKeyState,
      }}>
      {props.children}
    </BasketContext.Provider>
  );
};
export default BasketContext;
