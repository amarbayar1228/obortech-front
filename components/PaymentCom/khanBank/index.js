import { Button, DatePicker, Image, Input, message, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";
import BasketContext from "../../../context/basketContext/BasketContext";


const KhanBank = (props) => {
  const [basketState, setBasketState] = useState([]);
  const basketContext = useContext(BasketContext); 
  const [Test, SetTest] = useState("");
  const router = useRouter();
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  useEffect(()=>{
    console.log("kanbank: ", router.query);
  })

  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  //aaaaaaaaaaaaaaaaaaa
  const customWeekStartEndFormat = (value) =>
    `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
      .endOf("week")
      .format(weekFormat)}`;
  var basketLocal = [];
 
 
  const sendOrders = () => {
  
    console.log("orgIdRadio: ",props.orgIdRadio );
    console.log("basketState: ",props.basketState );
    console.log("price: ", props.totalPriceState);
    const arr = props.basketState ;
    // img tei bol Item, imggui bol Group
    arr.forEach((element, i) => {
    if (element.img) {arr[i].state = 2} else {arr[i].state = 1; arr[i].img = "";}
    });  

    // newtersen hereglegch bwl Axiosru shidne
    if (localStorage.getItem("token")) {
      const body = arr;
      const body2 = {
        func: "neworder",
        item: body,
        orgId: props.orgIdRadio,
        totalPrice: props.totalPriceState, 
        pkId: localStorage.getItem("pkId"), 
      };
      console.log("bodyId:2  ===>> ", body2);
      var basketLocal = [];
      axios.post("/api/post/Gate", body2).then((result) => {
        console.log("res orderId: ", result.data.orderid); 
          props.sucessOrder();  
          basketContext.removeBasketStorage();   

          const bodySmart = {
            func: "orderSend",
            orderid: result.data.orderid
           }
           axios.post("/api/post/Gate", bodySmart).then((res)=>{
            console.log("res: ", res.data);
           }).catch((err)=>{
            console.log("object", err);
           });

        },(error) => {console.log(error)}); 
      } else {
    // newtreeq hereglegch bwl Axiosru shidne
      const bodyNoId = {
        func: "neworder",
        orgId: props.orgIdRadio,
        totalPrice: props.totalPriceState,
        item: arr, 
      };
      // console.log("bodyNoId: ", bodyNoId);
      axios.post("/api/post/Gate", bodyNoId).then((result) => {
        console.log("res orderId: ", result.data.orderid); 
          // message.success("Success");

          props.sucessOrder();
          basketContext.removeBasketStorage();  
          const bodySmart = {
            func: "orderSend",
            orderid: result.data.orderid
           }
           axios.post("/api/post/Gate", bodySmart).then((res)=>{
            console.log("res: ", res.data);
           }).catch((err)=>{
            console.log("object", err);
           });
        },(error) => {console.log(error)});
      }
  };
  const eneBolProps = () => {
    console.log("object");
  };
  return ( 
      <div className={css.Cont}>
        <div className={css.Logo}>
          <Image
            preview={false}
            alt="Landscape picture"
            src="/img/Khanbank.png"
            width={300}
            height={60}
          />
        </div>
        <div className={css.AllCard}>
          Бүх банкны картаар төлбөр хийх боломжтой
        </div>
        <div className={css.Section}>
          <div className={css.SectionChild}>
            <div className={css.TulburHiih}>төлбөр хийх / payment</div>
            <div className={css.Expired}>Session expired in 09:28</div>

            <div className={css.Info}>
              <div className={css.Title}>
                Гүйлгээний мэдээлэл / Order details
              </div>

              <div className={css.InfoChild}>
                <div>Дүн / Amount</div>
                <div>8000.00MNT</div>
              </div>
              <div className={css.InfoChild}>
                <div>Гэрээний дугаар / Order ID: </div>
                <div>2022293116275884556629</div>
              </div>
            </div>

            <div className={css.Info}>
              <div className={css.Title}>
                Хувийн мэдээлэ / Personal information
              </div>

              <div className={css.InfoChild}>
                <div>Карт эзэмшигчийн нэр / Cardholder name: </div>
                <div>
                  <Input placeholder="Cardholder name: "></Input>
                </div>
              </div>
            </div>
            <div className={css.Info}>
              <div className={css.Title}>
                Картын мэдээлэл / Card information
              </div>

              <div className={css.InfoChild}>
                <div> Картын мэдээлэл / Card informatin: </div>
                <div>
                  <Input placeholder="1234 5678 1234 5678"></Input>
                </div>
              </div>
              <div className={css.InfoChild}>
                <div>CVV код / CVV number: </div>
                <div>
                  <Input placeholder="123"></Input>
                </div>
              </div>

              <div className={css.InfoChild}>
                <div>Хүчинтэй хугацаа / Expire date</div>
                <div>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      defaultValue={moment("2015/01/01", dateFormat)}
                      format={dateFormat}
                    />
                  </Space>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <Button type="primary" onClick={sendOrders}>
                  Захиалах
                </Button>
              </div>
            </div>
          </div>
          <div className={css.Zaawar}>
            <div className={css.Zurag}>
              <Image
                alt="Landscape picture"
                src="/img/atm.png"
                style={{ width: "60px", margin: "20px auto" }}
                preview={false}
                width={60}
                height={60}
              />
            </div>
            <div className={css.Desc}>
              <div className={css.Text}>ATM-аас Код авах заавар</div>
              <div className={css.Text}>
                Step-by-step guide for getting an E-pin code by ATM{" "}
              </div>
            </div>
            <div className={css.Text} style={{ paddingTop: "10px" }}>
              <Button
                style={{
                  background: "#0d4f31",
                  color: "#fff",
                }}
              >
                Заавар харах / See gude{" "}
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
       
  );
};

export default KhanBank;
