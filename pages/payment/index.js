import {
  Input,
  Button,
  message,
  Empty,
  Steps,
  Modal,
  Image,
  InputNumber,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import css from "./style.module.css";
import Link from "next/link";
import { WalletOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BasketContext from "../../context/basketContext/BasketContext";
import axios from "axios";
import {
  CaretRightOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const { Step } = Steps;
const Payment = () => {
  const basketContext = useContext(BasketContext);
  const [basketState, setBasketState] = useState([]);
  const [too, setToo] = useState(0);
  const [count, setCount] = useState(1);
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [dateState, setDateState] = useState();
  const [datePlusState, setDatePlusState] = useState();
  const [totalPriceState, setTotalPriceState] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupPrice, setGroupPrice] = useState({});
  const [isModalVisibleOrgId, setIsModalVisibleOrgId] = useState(false);
  const [isModalVisibleOrgId2, setIsModalVisibleOrgId2] = useState(false);
  const [orgIdInput, setOrgIdInput] = useState("");
  const [orgIdInput2, setOrgIdInput2] = useState("");
  const [groupBtn, setGroupBtn] = useState();
  const [hanshnuud, setHanshnuud] = useState();
  const [dollarResult, setDollarResult] = useState(0);

  const [coinState, setCoinState] = useState(0);
  const [usdState, setUsdState] = useState(0);
  const [tugrugState, setTugrugState] = useState(0);

  const [coinStateTarget, setCoinTargetState] = useState(0);
  const [usdStateTarget, setUsdTargetState] = useState(0);
  const [tugrugStateTarget, setTugrugTargetState] = useState(0);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    dateFunction();
    totalPriceFunction();
  }, []);

  const totalPriceFunction = () => {
    let itemPrice = 0;
    let result = 0;
    basketContext.basketState.forEach((element) => {
      if (element.itemPriceTotal == undefined) {
        console.log("object");
        result = element.price;
      } else {
        result = element.itemPriceTotal;
      }
      itemPrice += element.cnt * result;
      // if (element.gbm) {
      //   gbmPrice += element.cnt * element.groupTotalPrice;
      // } else {
      //   itemPrice += element.cnt * element.price;
      // }
    });
    setTotalPriceState(itemPrice);
  };
  const dateFunction = () => {
    const mounths = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    var date = new Date();
    setDateState(
      date.getFullYear() + "/" + mounths[date.getMonth()] + "/" + date.getDate()
    );

    var datePlus = new Date();
    datePlus.setDate(datePlus.getDate() + 30);
    setDatePlusState(
      datePlus.getFullYear() +
        "/" +
        mounths[datePlus.getMonth()] +
        "/" +
        datePlus.getDate()
    );

    //test
    // var testDate = new Date("2012-12-08");
    // testDate.setDate(testDate.getDate() + 30);
    // console.log(
    //   "eeeeeeeeeeeeeeeeeeeee",
    //   testDate.getFullYear() +
    //     "/" +
    //     mounths[testDate.getMonth()] +
    //     "/" +
    //     testDate.getDate()
    // );
  };

  const order = () => {
    const arr = basketContext.basketState;
    arr.forEach((element, i) => {
      if (element.gbm) {
        arr[i].state = "group";
      } else {
        arr[i].state = "item";
      }
    });
    setConfirmLoading(true);
    setTimeout(() => {
      // setVisible(false);
      setConfirmLoading(false);
    }, 2000);

    if (localStorage.getItem("token")) {
      const body = arr;
      const body2 = {
        token: localStorage.getItem("token"),
        orgId: "orgIdNomin123",
        paymentMethod: 0,
        product: body,
      };
      console.log("body2 ===>> ", body2);
      // var basketLocal = [];
      // axios.post("/api/post/orderHistory/save", body2).then(
      //   (result) => {
      //     message.success("Amjilttai");
      //     basketContext.removeBasketStorage();
      //     router.push("/order-history");
      //   },
      //   (error) => {
      //     message.error("Error");
      //     console.log(error);
      //   }
      // );
    } else {
      const bodyNoId = arr;
      // axios.post("/api/post/orderHistory/saveOrderHistoryNoId", bodyNoId).then(
      //   (result) => {
      //     message.success("Amjilttai");
      //     basketContext.removeBasketStorage();
      //     router.push("/");
      //   },
      //   (error) => {
      //     message.error("Error");
      //     console.log(error);
      //   }
      // );
    }
  };
  const generatePDF = () => {
    const input = document.getElementById("content2");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  const info = (items) => {
    Modal.info({
      title: "This is group items",
      content: (
        <div className={css.ItemScroll}>
          {items.map((e, index) => (
            <div className={css.BasketItem} key={index}>
              <div className={css.Zurag2}>
                <Image
                  alt="Obertech"
                  preview={false}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
                />
              </div>
              <div className={css.Descrip2}>
                <div className={css.Title2}>
                  <div className={css.ItemTitle2}>{e.itemTitle}</div>
                </div>
                <div className={css.Price2}>
                  <div> Qty: {e.itemCnt}</div>
                  <div> {e.itemPriceD}$</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),

      onOk() {},
    });
  };

  const orderOrgId = () => {
    setIsModalVisibleOrgId(true);
  };
  const orderOrgId2 = () => {
    const rs = usdStateTarget + coinStateTarget + tugrugStateTarget;
    console.log("Niit vne: ", rs);
    setDollarResult(rs);
    setIsModalVisibleOrgId2(true);
  };
  const handleOkOrgId = () => {
    console.log("basketContext.basketState: ", basketContext.basketState);
    const arr = basketContext.basketState;
    arr.forEach((element, i) => {
      if (element.gbm) {
        arr[i].state = "group";
      } else {
        arr[i].state = "item";
      }
    });
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   // setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);

    if (localStorage.getItem("token")) {
      const body = arr;
      const body2 = {
        token: localStorage.getItem("token"),
        orgId: orgIdInput,
        paymentMethod: 0,
        product: body,
      };
      console.log("bodyId:  ===>> ", body2);
      var basketLocal = [];
      // axios.post("/api/post/orderHistory/save", body2).then(
      //   (result) => {
      //     message.success("Success");
      //     basketContext.removeBasketStorage();
      //     router.push("/order-history");
      //   },
      //   (error) => {
      //     message.error("Error");
      //     console.log(error);
      //   }
      // );
    } else {
      const bodyNoId = {
        orgId: orgIdInput,
        product: arr,
      };
      console.log("bodyNoId: ", bodyNoId);
      // axios.post("/api/post/orderHistory/saveOrderHistoryNoId", bodyNoId).then(
      //   (result) => {
      //     message.success("Amjilttai");
      //     basketContext.removeBasketStorage();
      //     router.push("/");
      //   },
      //   (error) => {
      //     message.error("Error");
      //     console.log(error);
      //   }
      // );
    }
  };
  const handleOkOrgId2 = () => {
    // console.log("orgIdInput2: ", orgIdInput2);
    // console.log("dollarResult: ", dollarResult);
    // console.log("basketContext.basketState: ", basketContext.basketState);
    console.log("tugrugState: ", tugrugState);
    console.log("coinState: ", coinState);
    console.log("usd: ", usdState);
    const tugrugResult = 0;
    if (tugrugState == 0) {
      console.log("tugrugState: Hooson", tugrugState);
    } else {
      tugrugResult = tugrugState;
    }
    const payment = [];
    if (usdState == 0) {
      console.log("usd hoosn:");
    } else {
      payment.push({ paymentMethod: 0, paymentPrice: usdState });
    }

    if (tugrugState == 0) {
      console.log("hoosn");
    } else {
      payment.push({ paymentMethod: 1, paymentPrice: tugrugState });
    }

    if (coinState == 0) {
      console.log("coin hoosn");
    } else {
      payment.push({ paymentMethod: 2, paymentPrice: coinState });
    }

    console.log("payment: ", payment);

    const arr = basketContext.basketState;

    console.log(arr);
    arr.forEach((element, i) => {
      if (element.img) {
        arr[i].state = 2;
      } else {
        arr[i].state = 1;
        arr[i].img = "";
      }
    });
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   // setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);

    if (localStorage.getItem("token")) {
      const body = arr;

      const body2 = {
        func: "neworder",
        item: body,
        orgId: orgIdInput2,
        totalPrice: totalPriceState,
        // payment: payment,
        pkId: localStorage.getItem("pkId"),
        // orgId: orgIdInput2,
        // paymentMethod: 0,
        // product: body,
      };
      console.log("bodyId:2  ===>> ", body2);
      var basketLocal = [];
      axios.post("/api/post/Gate", body2).then(
        (result) => {
          message.success("Success");
          // basketContext.removeBasketStorage();
          // router.push("/order-history");
        },
        (error) => {
          message.error("Error");
          console.log(error);
        }
      );
      // axios.post("/api/post/orderHistory/save", body2).then(
      //   (result) => {
      //     message.success("Success");
      //     basketContext.removeBasketStorage();
      //     router.push("/order-history");
      //   },
      //   (error) => {
      //     message.error("Error");
      //     console.log(error);
      //   }
      // );
    } else {
      const bodyNoId = {
        func: "neworder",
        orgId: orgIdInput2,
        totalPrice: totalPriceState,
        item: arr,
        // payment: payment,
      };
      console.log("bodyNoId: ", bodyNoId);
      axios.post("/api/post/Gate", bodyNoId).then(
        (result) => {
          message.success("Amjilttai");
          // basketContext.removeBasketStorage();
          // router.push("/");
        },
        (error) => {
          message.error("Error");
          console.log(error);
        }
      );
    }
  };
  const handleCancelOrgId = () => {
    setIsModalVisibleOrgId(false);
  };
  const handleCancelOrgId2 = () => {
    setIsModalVisibleOrgId2(false);
  };
  const showFunction = (i) => {
    if (groupBtn == null) {
      setGroupBtn(i);
    } else if (groupBtn == i) {
      setGroupBtn(null);
    } else if (groupBtn != i) {
      setGroupBtn(i);
    }
  };
  const CoinFunc = (e) => {
    console.log("coin input: ", e);
    setCoinTargetState(e);
    const result = 0;
    result = e / basketContext.hanshnuud[2].rate;
    console.log("coin: ", result);
    setCoinState(result);

    console.log("coinstate");
  };
  const UsdFunc = (e) => {
    console.log("Usd input: ", e);
    setUsdTargetState(e);
    const result = 0;
    if (e === null) {
      setUsdState(0);
    } else {
      result = e;
      setUsdState(result);
    }
  };
  const TugrugFunc = (e) => {
    setTugrugTargetState(e);
    const result = 0;
    result = e * basketContext.hanshnuud[1].rate;
    setTugrugState(result);
  };
  const TotalPriceFunc = () => {
    console.log("coinState: ", coinStateTarget);
    console.log("usdState: ", usdStateTarget);
    console.log("tugrugState: ", tugrugStateTarget);
  };
  var sss = 0;
  const steps = [
    {
      title: "My basket",
      content: (
        <div>
          <div className={css.orderItem}>
            {basketContext.basketState.length === 0 ? (
              <Empty description="Basket is empty"></Empty>
            ) : (
              <div className={css.ItemDivide}>
                <div className={css.ItemTotal}>
                  <div className={css.ItemSize}>
                    {basketContext.basketState.map((e, i) => (
                      <div
                        className={
                          e.gbm === undefined
                            ? css.Items
                            : groupBtn === i
                            ? css.ItemGroupCss2
                            : css.ItemGroupCss
                        }
                        key={i}
                      >
                        <div
                          className={
                            e.gbm === undefined ? css.ItemsSolo : css.ItemGroupD
                          }
                        >
                          <div
                            className={
                              e.gbm === undefined
                                ? css.ItemZurag2
                                : css.ItemZurag
                            }
                          >
                            <Image
                              alt="Obertech"
                              preview={false}
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
                            />
                          </div>
                          <div className={css.ItemsInfo}>
                            <div className={css.ItemsTitle}>
                              <div>{e.title}</div>
                              <div>
                                <Button
                                  type="default"
                                  shape="circle"
                                  size="small"
                                  onClick={() =>
                                    basketContext.basketItemDelete(
                                      i,
                                      totalPriceFunction
                                    )
                                  }
                                >
                                  X
                                </Button>
                              </div>
                            </div>
                            <div className="text-left text-gray-500 -mt-2 capitalize">
                              {e.description}
                            </div>

                            <div className={css.Descrip}>
                              <div className={css.QtyBtn}>
                                <Button
                                  type="dashed"
                                  size="small"
                                  onClick={() =>
                                    basketContext.decline(i, totalPriceFunction)
                                  }
                                >
                                  -
                                </Button>
                                <div className={css.QtyName}>{e.cnt}</div>
                                <Button
                                  type="dashed"
                                  size="small"
                                  onClick={() =>
                                    basketContext.increase(
                                      i,
                                      totalPriceFunction
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </div>
                              <div>
                                {" "}
                                {e.price} {e.itemPriceTotal}$
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-left">
                          {e.gbm === undefined ? (
                            ""
                          ) : (
                            <div
                              className={
                                groupBtn === i ? css.groupCss2 : css.groupCss
                              }
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  background: "#eaeaea",
                                  paddingLeft: "5px",
                                  marginTop: "5px",
                                  borderRadius: "10px",
                                  backgroundColor: "rgb(5 150 105)",
                                  color: "#fff",
                                }}
                              >
                                <CaretRightOutlined color="red" />
                                <div>Package Items</div>
                              </div>
                              <div
                                className={
                                  groupBtn === i
                                    ? css.ItemScrollTrans
                                    : css.ItemScroll
                                }
                              >
                                {e.gbm.map((e, index) => (
                                  <div className={css.BasketItem} key={index}>
                                    <div className={css.Zurag2}>
                                      <Image
                                        alt="Obertech"
                                        preview={false}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW7rCilvBCSYjhu0wGwr0TYxHTtmmjKk_Gs44QIfdjRCbSDP9PRP5ScSfSq3As-m_TEWc&usqp=CAU"
                                      />
                                    </div>
                                    <div className={css.Descrip2}>
                                      <div className={css.Title}>
                                        <div className={css.ItemTitle}>
                                          {e.itemTitle}
                                        </div>
                                      </div>
                                      <div className="text-left text-gray-500 -mt-2 capitalize">
                                        {e.description}
                                      </div>
                                      <div className={css.Price}>
                                        <div> Qty: {e.itemCnt}</div>
                                        <div> {e.itemPriceD}$</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <Button
                                  type="dashed"
                                  style={{
                                    width: "100%",
                                    marginBottom: "5px",
                                    color: "#059669",
                                  }}
                                  size="small"
                                  onClick={() => showFunction(i)}
                                  icon={
                                    groupBtn === i ? (
                                      <CaretUpOutlined />
                                    ) : (
                                      <CaretDownOutlined />
                                    )
                                  }
                                ></Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={css.TotalStyle}>
                    <div className={css.OrderCss}>
                      {/* <Button
                        size="small"
                        icon={<ShoppingCartOutlined />}
                        // loading={confirmLoading}
                        onClick={orderOrgId}
                      >
                        Order
                      </Button>
                      <Modal
                        title="OrgID"
                        visible={isModalVisibleOrgId}
                        onOk={handleOkOrgId}
                        onCancel={handleCancelOrgId} 
                      >
                        <Input
                          onChange={(e) => setOrgIdInput(e.target.value)}
                          placeholder="OrgId"
                        />
                      </Modal> */}
                    </div>
                    <div className={css.TotalPayment}>
                      <WalletOutlined className={css.TotalIcon} /> TOTAL
                      PAYMENT:
                      {totalPriceState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
                    </div>
                  </div>
                </div>
                <div className={css.Reminder}>Reminder</div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Invoice",
      content: (
        <div>
          <div className={css.InvoiceBorder} id="content2">
            <div className={css.Header}>
              <div className={css.InvoiceLogo}>
                <Image
                  alt="Obertech"
                  preview={false}
                  style={{
                    position: "relative",
                    width: "120px",
                    height: "100px",
                    objectFit: "inherit",
                  }}
                  src="/img/OBORTECH_logo_H_clean.svg"
                />
              </div>
              <div> Invoice number - 0037038387</div>
            </div>
            <div className={css.InvoiceTable}>
              <div className={css.Contract1}>
                <div className={css.InvoiceDate}>
                  {dateState} - Tulburiin nehemjlel
                </div>
                <div className={css.InvoiceLayout}>
                  <div> Hereglegch ner: </div>
                  <div> 9011826614 BEC</div>
                </div>

                <div className={css.InvoiceLayout}>
                  <div>Gereenii dugaar: </div>
                  <div> 9011826614</div>
                </div>

                <div className={css.InvoiceLayout}>
                  <div>Hamragdah hugatsaa: </div>
                  <div>
                    {" "}
                    {dateState} - {datePlusState}
                  </div>
                </div>
              </div>
              <div className={css.Contract2}>
                <div className={css.ContractLayout}>
                  <div className={css.PayState}>Төлбөр төлөх сувгууд</div>
                  <div className={css.Sector}>
                    <div className={css.SectorText}>
                      <div className={css.IconCaretRight}>
                        <CaretRightOutlined />
                      </div>
                      <div>Үйлчилгээний салбар</div>
                    </div>
                    <div className={css.SectorText}>
                      <div className={css.IconCaretRight}>
                        <CaretRightOutlined />
                      </div>
                      <div> Банкны данс</div>
                    </div>
                  </div>
                </div>
                <div className={css.ContractLayout}>
                  <div className={css.PayState}>Нэмэлт хэрэглээ</div>

                  <div>
                    {basketContext.basketState.map((e, i) => (
                      <div className={css.ItemLayout} key={i}>
                        <div className={css.ContractItemText}>{e.title}</div>
                        <div
                          style={{
                            width: "20%",
                            borderRight: "1px solid #ccc",
                          }}
                        >
                          Qty: {e.quantity}
                        </div>
                        <div className={css.ContractItemTotalBorder}>
                          {e.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={css.ItemLayout}>
                    <div className={css.ContractItemTotalT}>Total Price: </div>
                    <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                  </div>
                </div>
                <div className={css.ContractLayout}>
                  {" "}
                  <div className={css.PayState}> Нэхэмлэх дүн</div>
                  <div className={css.ItemLayout}>
                    <div className={css.ContractItemText}>
                      Татвар тооцоогүй дүн:{" "}
                    </div>
                    <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                  </div>
                  <div className={css.ItemLayout}>
                    <div className={css.ContractItemText}>Нөат 10%:</div>
                    <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                  </div>
                  <div className={css.ItemLayout}>
                    <div className={css.ContractItemText}>
                      Нийт төлбөл зохих дүн:{" "}
                    </div>
                    <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button onClick={generatePDF}>Pdf download</Button>
          </div>
        </div>
      ),
    },
    {
      title: "Payment",
      content: (
        <div
          style={{
            background: "#fff",
            padding: "15px",
            fontSize: "15px",
          }}
        >
          <div className={css.HanshRate}>
            <div className={css.HanshLayout}>
              <div className={css.RateHdr}>
                <div className={css.RateTitle}> Rate</div>
                <div className={css.RateLine}> </div>
              </div>
              {basketContext.hanshnuud.map((e, i) => (
                <div key={i} className={css.HanshCss}>
                  <div className={css.CodeCsss}>{e.code_}</div>
                  <div className={css.CodeCsss}>{e.paymentName} </div>
                  <div className={css.CodeCsss}> rate: {e.rate}$</div>
                </div>
              ))}
            </div>
            <div className={css.Section2}>
              <div className={css.RateHdr}>
                <div className={css.RateTitle}>
                  Total price:{" "}
                  {totalPriceState
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  $
                </div>
                <div className={css.RateLine}> </div>
              </div>
              <div className={css.RateL}>
                <div className={css.RateCont}>
                  <div className={css.RateLayout}>
                    <span className={css.CoinTitle}>Coin: </span>
                    <InputNumber
                      style={{ width: "150px" }}
                      defaultValue={0}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={CoinFunc}
                    />
                    <span className={css.RateLayoutTitle}>
                      {coinState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                      Coin
                    </span>
                  </div>
                  <div className={css.RateLayout}>
                    <span className={css.CoinTitle}>USD: </span>
                    <InputNumber
                      allowClear
                      style={{ width: "150px" }}
                      defaultValue={0}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={UsdFunc}
                    />
                    <span className={css.RateLayoutTitle}>
                      {usdState.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
                    </span>
                  </div>
                  <div className={css.RateLayout}>
                    <span className={css.CoinTitle}>Tugrug: </span>
                    <InputNumber
                      style={{ width: "150px" }}
                      defaultValue={0}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      onChange={TugrugFunc}
                    />
                    <span className={css.RateLayoutTitle}>
                      {tugrugState
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                      Төгрөг
                    </span>
                  </div>
                </div>

                <div className={css.Balance}>
                  Price: <span>$</span>
                  {usdStateTarget + coinStateTarget + tugrugStateTarget >
                  totalPriceState ? (
                    <span>
                      {(sss =
                        usdStateTarget + coinStateTarget + tugrugStateTarget)
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      {message.error("The price is too high!!!")}
                    </span>
                  ) : (
                    usdStateTarget + coinStateTarget + tugrugStateTarget
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <Tabs defaultActiveKey="1" centered>
            <TabPane
              tab={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    color: "#e23434",
                  }}
                >
                  <BankOutlined />
                  Mongolian bank
                </span>
              }
              key="1"
            >
              <div>
                <div className={css.BankList}>
                  <div className={css.Bank2}>
                    <div className={css.Bank2Css}>
                      <Image
                        alt="Obertech"
                        preview={false}
                        src="/img/golomt.png"
                        width={180}
                      />
                    </div>
                    <Link href="/Banks/khanBank">
                      <div className={css.Bank2Css}>
                        <Image
                          alt="Obertech"
                          preview={false}
                          src="/img/Khanbank.png"
                          width={180}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className={css.Bank2}>
                    <div className={css.Bank2Css}>
                      <Image
                        alt="Obertech"
                        preview={false}
                        src="/img/monpay.png"
                        width={200}
                      />
                    </div>
                    <div className={css.Bank2Css}>
                      <Image
                        alt="Obertech"
                        preview={false}
                        src="/img/qpay.png"
                        width={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    color: "#e23434",
                  }}
                >
                  <BankOutlined />
                  Foreign bank
                </span>
              }
              key="2"
            >
              <div>
                <div className={css.BankList}>
                  <div className={css.Bank2}>
                    <div className={css.Bank2Css}>
                      <Image
                        alt="Obertech"
                        preview={false}
                        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
                        width={180}
                      />
                    </div>
                    <Link href="/Banks/khanBank">
                      <div className={css.Bank2Css}>
                        <Image
                          alt="Obertech"
                          preview={false}
                          src="img/minnwestbank.png"
                          width={180}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className={css.Bank2}>
                    <div className={css.Bank2Css}>
                      <Image
                        alt="Obertech"
                        preview={false}
                        src="https://www.bylinebank.com/wp-content/uploads/2020/08/logoHeader-BylineBank.svg"
                        width={180}
                      />
                    </div>
                    <div className={css.Bank2Css}>
                      <Image
                        alt="Obertech"
                        preview={false}
                        src="/img/qpay.png"
                        width={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <BaseLayout pageName="payment">
        <div style={{ fontSize: "14px", fontWeight: "500" }}>
          {basketContext.basketState.length === 0 ? (
            <Empty description="Basket is empty"></Empty>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <Steps current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[current].content}</div>
              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <>
                    <Button
                      icon={<ShoppingCartOutlined />}
                      type="primary"
                      onClick={orderOrgId2}
                    >
                      Done
                    </Button>
                    <Modal
                      title="OrgID"
                      visible={isModalVisibleOrgId2}
                      onOk={handleOkOrgId2}
                      onCancel={handleCancelOrgId2}
                    >
                      <Input
                        onChange={(e) => setOrgIdInput2(e.target.value)}
                        placeholder="OrgId"
                      />
                    </Modal>
                  </>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: "0 8px",
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};
export default Payment;