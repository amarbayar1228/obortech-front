import React from "react";
import BaseLayout from "../../../components/Layout/BaseLayout";
import css from "./style.module.css";
import { DatePicker, Image, Space } from "antd";
import { Checkbox, Col, Input, Row } from "antd";
const GolomtBank = () => {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <BaseLayout pageName="Banks/golomtBank">
      <div className={css.Cont}>
        <div className={css.Title}>
          <Image alt="Obertech" src="/img/golomt.png" preview={false} />
        </div>
        <div className={css.Time}>
          <div className={css.TitlePay}> Payment</div>
          <div>09:50</div>
        </div>
        <div className={css.Item}>
          <div className={css.Price}>
            <div>
              <div>Merchant</div>
              <div className={css.TitleChild2}>OBORTECH ITEMS</div>
            </div>
            <div>
              <div>Amount</div>
              <div className={css.TitleChild2}>9,000.00MNT</div>
            </div>
          </div>
          <div className={css.CheckPay}>
            <div>
              <Checkbox.Group
                style={{
                  width: "100%",
                }}
                onChange={onChange}
              >
                <Row>
                  <Col style={{ paddingRight: "30px" }}>
                    <Checkbox
                      value="A"
                      style={{ fontWeight: "500", fontSize: "16px" }}
                    >
                      Card
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox
                      value="B"
                      style={{ fontWeight: "500", fontSize: "16px" }}
                    >
                      Socialpay
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
          </div>
          <div className={css.CardNumber}>
            <div>Card number</div>
            <div>
              <Input placeholder="Card number: " />
            </div>
          </div>
          <div className={css.CardNumber}>
            <div>Cardholder name</div>
            <div>
              <Input placeholder="Cardholder name: " />
            </div>
          </div>

          <div className={css.Dates}>
            <div style={{ paddingRight: "20px" }}>
              <div>Expration Date</div>
              <div>
                <DatePicker onChange={onChangeDate} picker="month" />
              </div>
            </div>
            <div>
              <div>CVV code</div>
              <div>
                <Input placeholder="Cardholder name: " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
export default GolomtBank;
