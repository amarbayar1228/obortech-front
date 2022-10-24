import {Badge,Button,Collapse,Descriptions,Divider,Empty,Form,Image,Input,InputNumber,message,Modal,Pagination,Result,Select,Spin,Tooltip} from "antd";
import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import {CaretRightOutlined,SendOutlined,InfoCircleOutlined,CheckCircleOutlined,ExclamationCircleOutlined,} from "@ant-design/icons";
import axios from "axios";
import css from "./style.module.css";
import BasketContext from "../../context/basketContext/BasketContext";
const { Panel } = Collapse;
const { Option } = Select;
const Referral = () => {
  const basketContext = useContext(BasketContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCorporation, setIsModalVisibleCorporation] =
    useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const [phoneState, setPhoneState] = useState();
  const [addressState, setAddressState] = useState();
  const [spin, setSpin] = useState(false);
  // user Medeeleliig haruulj bga State
  const [lusername, setlUsername] = useState();
  const [llastname, setllastname] = useState();
  const [lphone, setlphone] = useState();
  const [lfirstname, setlfirstname] = useState();
  const [lstate, setlstate] = useState();
  const [lemail, setlemail] = useState();
  const [laddress, setladdress] = useState();
  const [introductionText, setIntroductionText] = useState(0);

  //  Company medeelel haruulj bga state
  const [companyName, setCompanyName] = useState();
  const [register, setRegister] = useState();
  const [areasOfActivity, setAreasOfActivity] = useState();
  const [telephone, setTelephone] = useState();
  const [address, setAddress] = useState();
  const [dateCompany, setDateCompany] = useState();

  const [companyUserGet, setCompanyUserGet] = useState([]);
  const [userInfoGet, setUserInfoGet] = useState([]);
  const [CompanyListState, setCompanyListState] = useState([]);

  //CompanyEdit Modal Input value
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [additionalInformationInput, setAdditionalInformationInput] =
    useState("");
  const [websiteInput, setWebSite] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [employeesInput, setEmployeesInput] = useState("");
  const [totalAnnualRevenueInput, setTotalAnnualRevenue] = useState("");

  const [companyPkIdInput, setCompanyPkIdInput] = useState();
  const [insentive, setInsentive] = useState([]);
  const [incentiveTotalPrice, setIncentiveTotalPrice] = useState(0);

  const [formUser] = Form.useForm();
  const [form] = Form.useForm();
  const [spinState, setSpinState] = useState(false);
  useEffect(() => { 
    // getUserInfo();
    userCompany();
    // userInfo();
    // getPayInsentive();
  }, []);
  // const getUserInfo = () => {
  //   basketContext.getUserProfileFunction();
  //   // console.log("basketContext: ", basketContext.userInfoProfile.firstname);
  // };
   
  const CorporationShowModal = () => {
    setIsModalVisibleCorporation(true);
  };
  const EditShowModal = (e) => {
    console.log("edit modal: ", e);

    setCompanyPkIdInput(e.PkId);

    setAdditionalInformationInput(e.additionalInformation);
    setCompanyNameInput(e.companyName);
    setCountryInput(e.country);
    setEmployeesInput(e.employees);
    setTotalAnnualRevenue(e.totalAnnualRevenue);
    setWebSite(e.website);

    setIsModalVisibleEdit(true);
  };
  const onFinishEdit = () => {
    setIsModalVisibleEdit(false);
  };
  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };
  const userCompany = () => {
    //userPkId gaar awchirj bgn

    const body = {
      func: "getCompany",
      userPkId: localStorage.getItem("pkId"),
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        setCompanyUserGet(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });

    // axios
    //   .post("/api/post/company/userGet", body)
    //   .then((res) => {
    //     setCompanyUserGet(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error("Error");
    //   });
  };
  // const handleOkCorporation = () => {
  //   const body = {
  //     userToken: localStorage.getItem("token"),
  //     companyName: companyName,
  //     register: register,
  //     areasOfActivity: areasOfActivity,
  //     state: 1,
  //     telephone: telephone,
  //     address: address,
  //     dateCompany: dateCompany,
  //   };
  //   axios
  //     .post("/api/post/company/send", body)
  //     .then((res) => {
  //       console.log("amjilttai", res);
  //       message.success("Succes");
  //       userCompany();
  //       // setIntroductionText(1);
  //       // localStorage.setItem("introductionText", 1);
  //       setIsModalVisibleCorporation(false);
  //       console.log("blsn");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       message.error("Error");
  //     });
  // };

  // const handleCancelCorporation = () => {
  //   setIsModalVisibleCorporation(false);
  // };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    const body = {
      pkId: localStorage.getItem("pkId"),
      phone: phoneState,
      address: addressState,
      state: 1,
    };
    // axios
    //   .post("/api/post/user/updateUser", body)
    //   .then((res) => {
    //     message.success("Succesfull");
    //     setIntroductionText(1);
    //     localStorage.setItem("introductionText", 1);
    //     setIsModalVisible(false);
    //   })
    //   .catch((err) => {
    //     // message.error(err);
    //   });
  };

  const handleCancel = () => {
    console.log("cancel");
    formUser.resetFields();
    setIsModalVisible(false);
  };
  const genExtra = () => (
    <div className={css.StateCss}>
      <div className={css.StateIconCss}>
        {(lstate == 0) | (lstate == 1) ? (
          <ExclamationCircleOutlined style={{ color: "blue" }} />
        ) : lstate == 2 ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <ExclamationCircleOutlined style={{ color: "red" }} />
        )}
      </div>
      <div>
        {" "}
        State:{" "}
        {(lstate == 0) | (lstate == 1)
          ? "Pending.."
          : lstate == 2
          ? "Active"
          : "Canceled"}
      </div>{" "}
    </div>
  );

  const genExtraCompanyGet = (e) => (
    <div className={css.StateCss}>
      <div className={css.StateIconCss}>
        {e.state == 2 ? (
          <Badge status="warning" text="accept request" />
        ) : e.state == 3 ? (
          // medeelelee zas
          <Badge status="processing" text="Rejected your request.." />
        ) : e.state == 4 ? (
          // tuhain baiguulga baina
          <Badge status="error" text="Rejected your request" />
        ) : e.state == 5 ? (
          // others shaltgaana
          <Tooltip title={e.others}>
            <Badge status="error" text="Rejected your request" />
          </Tooltip>
        ) : e.state == 6 ? (
          <Badge status="processing" text="Invitation Send..." />
        ) : e.state == 7 ? (
          <Badge status="success" text="Organization Onboarded..." />
        ) : e.state == 8 ? (
          <Badge status="error" text="Canceled" />
        ) : e.state == 1 ? (
          <Badge status="processing" text="Request pending.." />
        ) : (
          ""
        )}
      </div>
      {/* <div>
        {" "}
        State:{" "}
        {(e.state == 0) | (e.state == 1)
          ? "Pending.."
          : e.state == 2
          ? "Active"
          : "Canceled"}
      </div>{" "} */}
    </div>
  );

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[
        {
          required: true,
          message: "Please select your  +976!",
        },
      ]}
    >
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+976">+86</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );
  const paginationFunc = (a, b) => {
    console.log("pagination", a, b);
  };
  const onFinish = (values) => {
    console.log("company: ", values);
    //company ilgeeh
    const body = {
      func: "companySend",
      userPkId: localStorage.getItem("pkId"),

      totalAnnualRevenue: values.totalAnnualRevenue,
      companyName: values.companyName,
      country: values.country,

      employees: values.employees,
      additionalInformation: values.additionalInformation,
      website: values.website,

      state: 1,
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Succes");
        userCompany();
        setIsModalVisibleCorporation(false);
      })
      .catch((err) => {
        message.error("Error");
      });
    // axios
    //   .post("/api/post/company/send", body)
    //   .then((res) => {
    //     message.success("Succes");
    //     userCompany();
    //     setIsModalVisibleCorporation(false);
    //   })
    //   .catch((err) => {
    //     message.error("Error");
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors);
    // errorInfo.errorFields.forEach((element) => {
    //   console.log("elemetn===> ", element.errors);
    // });
  };

  const onFinishEditForm = (values) => {
    console.log("edit values: ", values);

    console.log("com ID: ", companyPkIdInput);

    const body = {
      func: "editCompany",
      pkId: companyPkIdInput,

      additionalInformation: values.additionalInformationEdit,
      companyName: values.companyNameEdit,
      employees: values.employeesEdit,

      totalAnnualRevenue: values.totalAnnualRevenueEdit,
      website: values.websiteEdit,
      country: values.countryEdit,

      state: 6,
    };

    axios
      .post("/api/post/Gate", body)
      .then((res) => {
        message.success("Success");
        setIsModalVisibleEdit(false);
        userCompany();
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
    // axios
    //   .post("/api/post/company/companyUpdateUserEdit", body)
    //   .then((res) => {
    //     message.success("Succes");
    //     setIsModalVisibleEdit(false);
    //     userCompany();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     message.error("Error");
    //   });
  };

  const onFinishFailedEdit = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors);
    // errorInfo.errorFields.forEach((element) => {
    //   console.log("elemetn===> ", element.errors);
    // });
  };
  const getPayInsentive = () => {
    const body = {
      userPkId: localStorage.getItem("pkId"),
    };
    // axios
    //   .post("/api/post/orderHistory/getPayInsentive", body)
    //   .then((res) => {
    //     setInsentive(res.data);
    //     let total = 0;
    //     let sum = 0;
    //     res.data.forEach((element) => {
    //       total += element.fee;
    //     });
    //     setIncentiveTotalPrice(total);
    //     setSpinState(false);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  };
  const onFinishUserSend = (values) => {
    // console.log("Received values of form: ", values);
    setSpin(true);
    const body = {
      func: "inviteUserUpd",
      pkId: localStorage.getItem("pkId"),
      firstname: values.firstname,
      jobtitle: values.jobtitle,
      lastname: values.lastname,
      phone: values.phone,
      state: 1,
    };
    axios
      .post("/api/post/Gate", body)
      .then((res) => { 
        basketContext.getUserProfileFunction();
        
          setSpin(false);
          message.success("Success");
          setIsModalVisible(false);  
        // setIntroductionText(1);
        // localStorage.setItem("introductionText", 1);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  const onFinishFailedUserSend = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const cancelCompany = () => {
    form.resetFields();
    setIsModalVisibleCorporation(false);
  };
  return (
    <BaseLayout pageName="referral">
      <div className={css.LayoutRef}>
        <div className={css.DisplayLayout}>
          {basketContext.userInfoProfile ? (
            <>
              {basketContext.userInfoProfile.state == 2 ? (
                <div style={{ marginTop: "-30px" }}>
                  <Result icon={ <Image style={{ marginBottom: "-24px" }}alt="Obertech" preview={false} src="/img/succcess.png" width={100}/>
                    } title="The user has been authenticated successfully" subTitle="You are now able to invite companies."/>
                </div>
              ) : (
                <div className={css.Layout}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Divider orientation="left">User information</Divider> <Divider type="vertical" />
                    <Tooltip title="More information on user invitations"><InfoCircleOutlined style={{ fontSize: "18px" }} /></Tooltip>
                  </div>
                  <div>
                    {spin === true ? <Spin style={{display: "flex", alignItems: "center", justifyContent: "center"}}/> : ""}
                    {basketContext.userInfoProfile.state === 1 ? (
                      <div style={{ marginTop: "-30px" }}>
                        <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/send4.png" width={100}/>}
                          subTitle="Admin will check your request and reply soon." title="Your request has been sent to an administrator."/>
                      </div>
                    ) : (
                      <>
                      <Button type="dashed" shape="round" onClick={showModal}>+ Information</Button>
                      <div style={{ marginTop: "-30px" }}>
                        <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/info.png" width={100}/>}
                          subTitle="Then you will be able to invite company. " title="Fill in your details."/>
                      </div>
                      </>

                    )}

                      {basketContext.userInfoProfile.state === 0 ? 
                       <Result icon={<Image style={{ marginBottom: "-24px" }} alt="Obertech" preview={false} src="/img/info.png" width={100}/>}
                       subTitle="Admin will check your request and reply soon." title="Submit your details!"/>: ""}

                    <Modal title="User Register" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                      <Form form={formUser} name="normal_login" className={css.LoginForm} labelCol={{span: 6,}} wrapperCol={{span: 16,}}
                        initialValues={{remember: true,}} onFinish={onFinishUserSend} onFinishFailed={onFinishFailedUserSend}>
                        <Form.Item label="First name" name="firstname" rules={[{required: true,message: "Please input your First name!",},]}>
                          <Input placeholder={"First name:"}/>
                        </Form.Item>
                        <Form.Item label="Last name" name="lastname" rules={[{required: true,message: "Please input your Last name!",},]}>
                          <Input placeholder={"Last name:"}/>
                        </Form.Item> 
                        <Form.Item label="Job title" name="jobtitle" rules={[{required: true,message: "Please input your Job title!",},]}>
                          <Input placeholder={"Job title:"}/>
                        </Form.Item> 
                        <Form.Item label="Phone number"name="phone" rules={[{required: true,message: "Please input your Phone!",},]}>
                          <Input placeholder={"Phone:"}/></Form.Item>
                        <Form.Item><div className={css.Ok}><Button type="primary" htmlType="submit" className="login-form-button">Send</Button></div></Form.Item>
                      </Form> 
                    </Modal>
                  </div>
                </div>
              )} 

              {basketContext.userInfoProfile.state == "2" ? (
                <div className={css.Layout}>
                  <div style={{background: "#fff"}}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Divider orientation="left">Corporation list</Divider> <Divider type="vertical" />
                      <Tooltip title="More information on company invitations"> <InfoCircleOutlined style={{ fontSize: "18px" }} /></Tooltip>
                    </div>
                    {/* {lstate == 2 ? ( */}
                    <div className={css.Corporation}>
                      <Button type="dashed" shape="round" onClick={CorporationShowModal}>+ Corporation</Button>
                      <Modal title="Corporation" closable={false} open={isModalVisibleCorporation}footer={null}

                        // onOk={onFinish}
                        // onCancel={handleCancelCorporation}
                        >
                        <div>
                          <Form form={form} name="basic" labelCol={{span: 8}}wrapperCol={{span: 16,}}
                            initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed}autoComplete="off">
                            <div style={{display: "flex",justifyContent: "flex-end",marginBottom: "5px",marginTop: "-20px",}}>
                              <Button size="small" onClick={() => {form.resetFields();}}>Clear</Button>
                            </div>
                            
                            <Form.Item label="Company name" name="companyName"rules={[{required: true,message: "Please input your Web site!"}]}><Input />
                            </Form.Item>
                            <Form.Item label="Web site" name="website"
                              rules={[{required: true,message: "Please input your Web site!"}]}><Input />
                            </Form.Item>

                            <Form.Item label="Country" name="country"
                              rules={[{required: true, message: "Please input your Country!"}]}><Input />
                            </Form.Item>
                            <Form.Item label="How many employees" name="employees"
                              rules={[{required: true,message: "Please input your employees!"}]}>
                              <Input addonBefore={prefixSelector}style={{width: "100%",}}/>
                            </Form.Item>
                            <Form.Item label="Total annual revenue" name="totalAnnualRevenue"
                              rules={[{ required: true, message:"Please input your Total annual revenue!",}]}>
                              <Input />
                            </Form.Item>
                            <Form.Item label="Additional information" name="additionalInformation"
                              rules={[{required: true,message:"Please input your Additional information!",},]}><Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                              <Button style={{ marginRight: "10px" }}onClick={cancelCompany}>Cancel</Button>
                              <Button type="primary" htmlType="submit">Send</Button></Form.Item>
                          </Form>
                        </div>
                      </Modal>
                    </div>
                    <div className={css.ContainerCss}>
                      <div className={css.ScrollCss}>
                        {companyUserGet.map((e, i) => (
                          <div key={i}>
                            <Collapse key={i} style={{ background: "#fff" }} bordered={true}
                              expandIcon={({ isActive }) => ( <CaretRightOutlined rotate={isActive ? 90 : 0}/>
                              )}className="site-collapse-custom-collapse">
                              <Panel key={i} header={<div style={{fontWeight: "500",textTransform: "capitalize",}}
                                  >{e.companyName}</div>}extra={genExtraCompanyGet(e)}>
                                <div className={css.Cont1}>
                                  <Descriptions key={i} title="Company Info" layout="vertical"bordered>
                                    <Descriptions.Item label="Company name:">{e.companyName}</Descriptions.Item>
                                    <Descriptions.Item label="Website:">{e.website}</Descriptions.Item>
                                    <Descriptions.Item label="Country">{e.country}</Descriptions.Item>
                                    <Descriptions.Item label="How many employees">{e.employees}</Descriptions.Item>
                                    <Descriptions.Item label="Total annual revenue">{e.totalAnnualRevenue}</Descriptions.Item>
                                    <Descriptions.Item label="Additional information">{e.additionalInformation}</Descriptions.Item>
                                    <Descriptions.Item label="Organization Id">{e.orgId}</Descriptions.Item>
                                    {e.others === null || e.others === "" ? ("") : (
                                      <div style={{background: "red",color: "#fff",}}>{e.others}</div>
                                    )}
                                  </Descriptions>

                                  <div>
                                    {e.state === 3 || e.state === 4 || e.state === 5 ? (
                                      <Button onClick={() => EditShowModal(e)}>Edit</Button>) : ("")}
                                    <Modal title="Edit" visible={isModalVisibleEdit}footer={false}onOk={onFinishEdit}onCancel={handleCancelEdit}>
                                      <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16,}}
                                        initialValues={{
                                          companyNameEdit: companyNameInput,
                                          additionalInformationEdit:additionalInformationInput,
                                          countryEdit: countryInput,
                                          employeesEdit: employeesInput,
                                          totalAnnualRevenueEdit:totalAnnualRevenueInput,
                                          websiteEdit: websiteInput,
                                        }} onFinish={onFinishEditForm} onFinishFailed={onFinishFailedEdit} autoComplete="off"
                                      >
                                        <Form.Item label="Company name"name="companyNameEdit"
                                          rules={[{required: true,message:"Please input your Company name!"}]}><Input />
                                        </Form.Item>

                                        <Form.Item label="Web site" name="websiteEdit"
                                          rules={[{required: true,message:"Please input your Web site!",},]}><Input />
                                        </Form.Item>

                                        <Form.Item label="Country" name="countryEdit"
                                          rules={[ { required: true, message:"Please input your Country!",},]}><Input />
                                        </Form.Item>
                                        <Form.Item label="How many employees" name="employeesEdit"
                                          rules={[{required: true,message:"Please input your How many employees!",},]}>
                                          <Input addonBefore={prefixSelector} style={{width: "100%",}}/>
                                        </Form.Item>
                                        <Form.Item label="Total annual revenue" name="totalAnnualRevenueEdit"
                                          rules={[{required: true,message:"Please input your Total annual revenue!",}]}>
                                          <Input />
                                        </Form.Item>
                                        <Form.Item label="Additional information" name="additionalInformationEdit" rules={[{ required: true, message:"Please input your Additional information!",}]}>
                                            <Input />
                                        </Form.Item>

                                        <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                                          <Button style={{ marginRight: "10px" }} onClick={() =>setIsModalVisibleEdit(false)}>Cancel</Button>
                                          <Button type="primary"htmlType="submit">Submit</Button>
                                        </Form.Item>
                                      </Form>
                                    </Modal>
                                  </div>
                                </div>
                              </Panel>
                            </Collapse>
                          </div>
                        ))}
                      </div>

                      {spinState == true ? (<div><Spin /></div>) : ("")}
                      {insentive[0] ? (
                        <div className={css.InsentiveCon}>
                          <div>
                            <Divider orientation="left">
                              <div style={{ display: "flex", alignItems: "center",}}>
                                <Image alt="Obertech" preview={false} src="/img/incentive.png"style={{width: "45px",marginRight: "7px",background: "#fff",borderRadius: "20px",}}/>
                                <div className={css.IncentiveText}>INCENTIVE</div>
                              </div>
                            </Divider>
                          </div>
                          <div className={css.InsentiveScroll}>
                            {insentive.map((e, i) => (
                              <div key={i} className={css.ContainerInvs}>
                                <div className={css.DateCss}>{e.date} </div>
                                <div className={css.FeeLayout}>
                                  <div className={css.ImgCss}><Image alt="Obertech" preview={false}src="/img/usdIcon.png.crdownload"/></div>
                                  <div className={css.FeeCompleted}>
                                    <div className={css.CoinCss}>$ {e.fee}</div>
                                    <div className={css.CompletedCss}>Completed</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className={css.TotalPriceCss}>Total price: {incentiveTotalPrice}$</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {/* <div>
            <Pagination
              showTitle
              defaultCurrent={1}
              total={60}
              onChange={paginationFunc}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              defaultPageSize={10}
            />
          </div> */}
        </div>
        <div className={css.Note}>
          <Result
            title="More information on company invitations"
            extra={
              <Button type="primary" key="console">
                Go Console
              </Button>
            }
          />
        </div>
      </div>
    </BaseLayout>
  );
};
export default Referral;
