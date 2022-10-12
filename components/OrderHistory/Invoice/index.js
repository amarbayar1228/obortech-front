import { Button, Modal,Image } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {CaretRightOutlined,ShoppingCartOutlined,BankOutlined,CaretUpOutlined,CaretDownOutlined,} from "@ant-design/icons";
import css from "./style.module.css"
const Invoice = (props) =>{
const [isModalOpen, setIsModalOpen] = useState(false);
const[order, setOrder]= useState([]);
const [dateState, setDateState] = useState();
const [datePlusState, setDatePlusState] = useState(); 
const [totalPrice, setTotalPrice] = useState(0);
const showModal = () => {
    console.log("orderId", props.orderId);
    setTotalPrice(props.orderId.price);
    setIsModalOpen(true); 
    const result = 0;
    const  str = "";
    const strSplit = "";
    const body = {
    func:"getOrderItems", 
    orderid: props.orderId.orderid
    }
    axios.post("/api/post/Gate", body).then((res)=>{
    // res.data.data.forEach(element => {
    //     result += element.price;
    // });
    // setTotalPrice(result);
    setOrder(res.data.data)
    str = res.data.data[0].date1,
    strSplit = str.split(" ")[0] + " " + str.split(" ")[1] + " "+ str.split(" ")[2];
    setDateState(strSplit);

    const mounths = ["Jan","Feb","Mar","Apr","May","jun","jul","Aug","Sep","Oct","Nov","Dec",];
    var datePlus = new Date(strSplit);
    datePlus.setDate(datePlus.getDate() + 30); 
    setDatePlusState(mounths[datePlus.getMonth()] + " " + datePlus.getDate()+ ", " + datePlus.getFullYear());
    
    }).catch((err)=>{
    console.log("err: ", err);
    })
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
}; 
    return <div>
            <Button type="dashed" size="small" onClick={showModal}>
                Invoice
            </Button>
            <Modal title="Invoice" width={630} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
                            height: "50px",
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
                        <div>Date: </div>
                        <div> 
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
                            {order.map((e, i) => (
                            <div className={css.ItemLayout} key={i}>
                                <div className={css.ContractItemText}>{e.title}</div>
                                <div
                                style={{
                                    width: "20%",
                                    borderRight: "1px solid #ccc",
                                }}
                                >
                                Qty: {e.cnt}
                                </div>
                                <div className={css.ContractItemTotalBorder}>
                                {e.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
                                </div>
                            </div>
                            ))}
                        </div>

                        <div className={css.ItemLayout}>
                            <div className={css.ContractItemTotalT}>Total Price: </div>
                            <div className={css.ContractItemTotalBorder} style={{fontWeight: "700"}}> 
                            {totalPrice.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}$
                            </div>
                        </div>
                        </div>
                        <div className={css.ContractLayout}> 
                        <div className={css.PayState}> Нэхэмлэх дүн</div>
                        <div className={css.ItemLayout}>
                            <div className={css.ContractItemText}>
                            Татвар тооцоогүй дүн:
                            </div>
                            <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                        </div>
                        <div className={css.ItemLayout}>
                            <div className={css.ContractItemText}>Нөат 10%:</div>
                            <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                        </div>
                        <div className={css.ItemLayout}>
                            <div className={css.ContractItemText}>
                            Нийт төлбөл зохих дүн:
                            </div>
                            <div className={css.ContractItemTotalBorder}>4,555,00 </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                 </div>
            </Modal>
    </div>
}
export default Invoice;