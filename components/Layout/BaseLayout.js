import { useRouter } from "next/router";
import {Layout,Menu,Breadcrumb,Row,Col,message,Button,Popover,Tooltip,Image,Drawer,Spin,} from "antd";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {ShoppingCartOutlined,GlobalOutlined,DoubleLeftOutlined,MenuOutlined,HomeOutlined,UserOutlined,DoubleRightOutlined,PlusSquareOutlined,AppstoreAddOutlined,AppstoreOutlined,PieChartOutlined,LogoutOutlined,UserAddOutlined,ContainerOutlined,SettingOutlined} from "@ant-design/icons";
import css from "./style.module.css";
import BacketComponent from "../Backet";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import BasketContext from "../../context/basketContext/BasketContext";
import Head from "next/head";
const { Content, Sider, Footer } = Layout;
export default function BaseLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [addItemStyleProps, setAddItemStyleProps] = useState([css.BasketPop]);
  const router = useRouter();
  const { t, ready } = useTranslation(["header", "language-change", "organization"]);
  const basketContext = useContext(BasketContext);
  const [localStorageUserId, setLocalStorageUserId] = useState();
  const [homeActive, setHomeActive] = useState([]);
  const [homeActiveMenu, setHomeActiveMenu] = useState([]);
  const [affiliateActive, setAffiliateActive] = useState([]);
  const [admin, setAdmin] = useState("");
  const [localPkId, setLocalPkid] = useState("");
  const [open2, setOpen2] = useState(false);
  const [enState, setEnState] = useState("en");
  const [mnState, setMnState] = useState("mn");

  useEffect(() => { 
    basketContext.basketStateFunc();
    setLocalPkid(localStorage.getItem("pkId"));
    // localStorage.setItem("orgId", "0");
    setAdmin(localStorage.getItem("isSuperAdmin")); 
 
    if (localStorage.getItem("token")) {
      setLocalStorageUserId(localStorage.getItem("token"));
    } else {
      setLocalStorageUserId("Null");
    }
  }, []);
  useEffect(() => {
    setAddItemStyleProps(props.addItemStyle);
    setTimeout(() => {
      setAddItemStyleProps([css.BasketPop]);
    }, 500);
    if (router.pathname == "/") {
      setHomeActive([css.Active]);
      setHomeActiveMenu([css.ActiveMenu]);
    } else {
      setHomeActive([]);
      setHomeActiveMenu([]);
    }
    if (router.pathname == "dashboard") {
      setAffiliateActive([css.Active]);
    } else {
      setAffiliateActive([]);
    }
  }, [props]);

  // Locize Loading...
  // if (!ready)
  //   return (
  //     <div className={css.Spinner}>
  //       <div className={css.TitleCenter}>
  //         <Spin size="large" /> 
  //       </div>
  //     </div>
  //   );
  const getItem = (label, key, icon, children, type) => {
    if (label.key === "1") {
      basketContext.MenuKey("1");
      router.push("/dashboard");
    }
    if (label.key === "2") {
      basketContext.MenuKey("2");
      router.push("/add-item");
    }
    if (label.key === "3") {
      basketContext.MenuKey("3");
      router.push("/order-history");
    }
    if (label.key === "4") {
      basketContext.MenuKey("4");
      router.push("/add-admin");
    }
    if (label.key === "5") {
      basketContext.MenuKey("5");
      router.push("/referral");
    }
    if (label.key === "6") {
      basketContext.MenuKey("6");
      // setMenuHomeActive("6");
      router.push("/affiliate");
    }

    // if (label.key === "7") {
    //   basketContext.MenuKey("7");
    //   router.push("/confirmation-list");
    // }

    return {key,icon,children,label,type,};
  };
  const items2 = [
    getItem(t("sidebarDashboard"),"1",<PieChartOutlined style={{ fontSize: "18px", fontWeight: "500px" }} />),
    admin === "1" ? getItem(t("sidebarItemAdd"),"2",<AppstoreAddOutlined style={{ fontSize: "18px", fontWeight: "500px" }}/>) : "",
    getItem(t("sidebarOrderHistory"),"3", <ContainerOutlined style={{ fontSize: "18px", fontWeight: "500px" }} />),
    admin === "1" ? getItem("Add Admin","4",<UserAddOutlined style={{ fontSize: "18px", fontWeight: "500px" }} />): "",
    admin === "1" || admin === "2" ? "": getItem("referral","5",<PlusSquareOutlined style={{ fontSize: "18px", fontWeight: "500px" }}/>),
    admin === "1" || admin === "2"? getItem("Confirmation","6",<PlusSquareOutlined style={{ fontSize: "18px", fontWeight: "500px" }}/>): "",
  ];
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  const handleVisibleChangeMenu = (newVisible) => {
    setVisibleMenu(newVisible);
  };
  const homeRouter = () => {
    router.push("/");
  };
  const loginRouter = () => {
    router.push("/login");
  };
  const userDashboard = () => {
    basketContext.MenuKey("1");
    router.push("/dashboard");
  }; 

  const changeLanguage = (
    <div className={css.LanguageStyle}>
      <Link href="/" locale={router.locales[0] === "en" ? "en" : "en"}>
        <Button type="link" className={css.LanguageBtn} style={{marginLeft:"1px"}}>
        <Image className={css.Flag} alt="Obertech" preview={false} src="/img/united-kingdom.png"/>
          <span   style={{marginRight: "7px"}} className={router.locale == "en"  ? css.ActiveLang : "" }>{t("English")}</span>
        </Button>
      </Link>
      <Link href="/mn" locale={router.locales[3] === "mn" ? "mn" : "en"}>
        <Button type="link" className={css.LanguageBtn}>
        <Image style={{marginRight: "25px"}} className={css.Flag} alt="Obertech" preview={false} src="/img/mongolia.png"/>
          <span className={router.locale == "mn" ? css.ActiveLang : ""}>Монгол</span>
        </Button>
      </Link>
    </div>
  );
  const logoutFunction = () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("isSuperAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("address");
    localStorage.removeItem("pkId");
    localStorage.removeItem("phone");
    localStorage.removeItem("state");
    localStorage.removeItem("introductionText");
    localStorage.removeItem("basket");
    basketContext.removeBasketStorage();
    message.loading("Log out", 2);

    if (router.pathname == "/") {
      router.push("/login");
    } else {
      router.push("/");
    }
  };
  const Profile = () => {
    router.push("/profile");
  };
  const changeProfile = (
    <div>
      <Button type="link" className={css.LanguageBtn} onClick={Profile}>
        <UserOutlined /> Profile
      </Button>
      <Button type="link" className={css.LanguageBtn}>
        <SettingOutlined /> Security 
      </Button>
      <Button type="link" onClick={logoutFunction} className={css.LanguageBtn}>
        <LogoutOutlined /> Log out
      </Button>
    </div>
  );
  const showDrawer2 = () => {
    setOpen2(true);
  };
  const onClose2 = () => {
    setOpen2(false);
  };
  const LogoFunction = () => {
    router.push("/");
  };
  return (
    <>
     <Head><title>OBORTECH</title><meta name="description" content="Generated by create next app" /><link rel="icon" href="img/HeaderLogo.png" /></Head>
      <div className={css.Header}>
        <div className={css.Logo}>
          <div className={css.MenuMobile}>
            <Button onClick={showDrawer2} type="link" className={css.IconsMenu} size="small">
              <MenuOutlined />
            </Button>
          </div>
          <div className={css.ImageLogo}>
            <Image onClick={LogoFunction} className={css.ImgLogo} alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg"/>
            {basketContext.orgId == undefined ? "" : 
              <div className={css.OrgIdText}>ID: Obortech</div>
            } 
          </div>
        </div>
{/* Moblie ============================================================= */}
        <div className={css.MenuMobile}>
          <div className={ admin == "1" || admin == "2" || basketContext.orgId == undefined? css.MenuHoverIconAdminNo : css.MenuHoverIcon}>
            {admin == "1" || admin == "2" || basketContext.orgId == undefined ? null : (
              <div className={ router.pathname == "/payment" ? css.PopoverStyle2 : css.PopoverStyle1}>
                {basketContext.basketState.length === 0 ? (
                  <div className={css.BasketPopNone}> </div>
                ) : (
                  <div className={ addItemStyleProps === undefined ? [css.BasketPop] : addItemStyleProps }>
                    {basketContext.basketState.length}
                  </div>
                )}

                <Tooltip title={t("basketName")}>
                  <Popover content={<BacketComponent />}
                    title={<div className={css.BasketHeader}><ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "25px" }}/> {t("basketName")}</div>}
                    trigger="click" open={visibleMenu} onOpenChange={handleVisibleChangeMenu}>
                    <Button size="small"type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}><ShoppingCartOutlined /></Button>
                  </Popover>
                </Tooltip>

              </div>
            )}
          </div> 
          <div className={css.MenuHoverIcon}>
            <Popover content={changeLanguage}>
              <Button type="link" className={css.IconsMenu} size="small"><GlobalOutlined /></Button>
            </Popover>
          </div> 
          {localPkId ? (
            <div className={router.pathname == "/profile" ? css.ProfileBackCss : css.MenuHoverIcon3}>
              <div className={css.ProfileBackground}>
                <Popover content={changeProfile}>
                  <Button type="link" className={css.IconsMenu} size="small">
                    <div className={router.pathname == "/profile" ? css.ProfileCss : css.FlexPro}>
                      <UserOutlined />
                      <span className={css.ProfileText}>
                        {admin === "0" ? basketContext.userInfoProfile === undefined ? "" : basketContext.userInfoProfile.email
                          : admin === "1" ? "Admin"
                          : admin === "2" ? "Operator"
                          : ""}
                      </span>
                    </div>
                  </Button>
                </Popover>
              </div>
            </div>
          ) : (
            <div className={router.pathname == "/login" ? css.ActiveMenu2 : css.MenuHoverIcon2}>
              <Tooltip title={t("loginName")}>
                <Button size="small" onClick={loginRouter} shape="circle" className={css.IconsMenu}>
                  <UserOutlined style={{ fontSize: "21px" }} />
                </Button>
              </Tooltip>
            </div>
          )}
          <Drawer title="Menu" placement="left" onClose={onClose2} open={open2} width={250}>
            <div className={css.MenuCont}>
              <div className={homeActiveMenu}>
                <Button onClick={homeRouter} type="link" className={css.IconsMenu}>
                  <HomeOutlined /> {t("homeName")}
                </Button>
              </div>
              {basketContext.orgId == undefined ? "" : 
              <div className={router.pathname == "/items" ? css.ActiveMenu : ""}>
                <Button onClick={() => router.push("/items")} type="link" className={css.IconsMenu}>
                  <AppstoreAddOutlined /> Item </Button>
              </div>}
              
              {localPkId ? (
                <div className={
                    router.pathname == "/dashboard" ||
                    router.pathname == "/affiliate" ||
                    router.pathname == "/confirmation-list" ||
                    router.pathname == "/order-history" ||
                    router.pathname == "/referral" ||
                    router.pathname == "/add-admin" ||
                    router.pathname == "/add-item"
                      ? css.ActiveMenu
                      : ""}>
                  <Button onClick={userDashboard} type="link" className={css.IconsMenu}>
                    <AppstoreOutlined /> {t("dashboardTitle")}
                  </Button>
                </div>) : ("")}
            </div>  
          </Drawer>
        </div> 
{/* Desktop ============================================================================== */}
        <div className={css.HeaderItem}>
          <div className={homeActive}>
            <Tooltip title={t("homeName")}>
              <Button onClick={homeRouter} type="link" className={css.Icons}>
                <HomeOutlined />
              </Button>
            </Tooltip>
          </div>
          {basketContext.orgId === undefined ? "" : 
           <div className={router.pathname == "/items" ? css.Active : ""}>
           <Tooltip title={"items"}>
             <Button onClick={() => router.push("/items")} type="link" className={css.Icons}>
               <AppstoreAddOutlined />
             </Button>
           </Tooltip>
         </div>}
         

          {localPkId ? (
            <div className={
                router.pathname == "/dashboard" ||
                router.pathname == "/affiliate" ||
                router.pathname == "/confirmation-list" ||
                router.pathname == "/order-history" ||
                router.pathname == "/referral" ||
                router.pathname == "/add-admin" ||
                router.pathname == "/add-item" ? css.Active : ""}>
              <Tooltip title={t("dashboardTitle")}>
                <Button onClick={userDashboard} type="link" className={css.Icons}>
                  <AppstoreOutlined />
                </Button>
              </Tooltip>
            </div>) : ("")}

          {admin == "1" || admin == "2" || basketContext.orgId == undefined ? ("") : (
            <div className={router.pathname == "/payment" ? css.PopoverStyle2 : css.PopoverStyle1}>
              {basketContext.basketState.length === 0 ? (
                <div className={css.BasketPopNone}> </div>
              ) : (
                <div className={ addItemStyleProps === undefined ? [css.BasketPop] : addItemStyleProps}>
                  {basketContext.basketState.length}
                </div>
              )}
              <Tooltip title={t("basketName")}>
                <Popover
                  content={<BacketComponent />}
                  title={<div className={css.BasketHeader}>
                    <div> 
                  <ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "18px" }}/>{t("basketName")}
                  </div>
                  <div>
                  {basketContext.orgId == undefined ? "" : 
                    <div className={css.OrgIdText2}>ID: Obortech</div>
                  }
                  </div>
                  </div>} 
                  trigger="click" open={visible} onOpenChange={handleVisibleChange}>
                  <Button type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}>
                    <ShoppingCartOutlined />
                  </Button>
                </Popover>
              </Tooltip>
            </div>
          )}
          <div><Popover content={changeLanguage}><Button type="link" className={css.Icons}><GlobalOutlined /></Button></Popover></div>
          {localPkId ? (
            <div className={ router.pathname == "/profile" ?  css.ProfileBackCss : ""}>
              <div className={css.ProfileBackground}>
                <Popover content={changeProfile}>
                  <Button type="link" className={css.Icons}>
                    <div className={ router.pathname == "/profile" ? css.ProfileCss : css.FlexPro}><UserOutlined />
                      <span className={css.ProfileText}>
                        {admin === "0" ? basketContext.userInfoProfile === undefined ? "" : basketContext.userInfoProfile.email
                          : admin === "1" ? "Admin" : admin === "2" ? "Operator " : ""}
                      </span>
                    </div>
                  </Button>
                </Popover>
              </div>
            </div>
          ) : (
            <div className={router.pathname == "/login" ? css.Active : ""}>
              <Tooltip title={t("loginName")}>
                <Button onClick={loginRouter} type="link" className={css.Icons}>
                  <UserOutlined />
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <Content
      // style={{
      //   padding: "0 12px",
      // }}
      >
        {props.pageName === "home" || props.pageName === "login" || props.pageName === "items" || props.pageName === "register" ||
        props.pageName === "basket" ? null : (
          <Breadcrumb style={{margin: "4px 10px",}}>
            <Breadcrumb.Item><AppstoreOutlined /></Breadcrumb.Item>
            <Breadcrumb.Item href="/payment"> <ShoppingCartOutlined /> </Breadcrumb.Item>
            <Breadcrumb.Item> <UserOutlined /></Breadcrumb.Item>
          </Breadcrumb>
        )}
        <Layout className="site-layout-background">
          {localStorageUserId === "Null" ? (
            "" ) : (
            <>
              {props.pageName === "home" || props.pageName === "login" || props.pageName === "items" ||props.pageName === "register" || props.pageName === "basket" || props.pageName === "profile" ? null : (
                <Sider
                  trigger={null} collapsible collapsed={basketContext.collapsed} onCollapse={() => basketContext.onCollapse()}
                  style={{ background: "#fff", color: "red", fontWeight: "500", fontSize: "18px",}} width={200}
                >
                  <Menu theme="light" mode="inline"
                    defaultSelectedKeys={[
                      router.pathname == "/dashboard" ? "1"
                        : router.pathname == "/affiliate" ? "6"
                        : router.pathname == "/confirmation-list" ? "7"
                        : router.pathname == "/add-item" ? "2"
                        : router.pathname == "/order-history" ? "3"
                        : router.pathname == "/add-admin" ? "4"
                        : router.pathname == "/referral" ? "5"
                        : "",
                    ]}
                    defaultOpenKeys={[router.pathname == "/dashboard" ? "1" : "6",]}
                    items={items2}
                    onClick={getItem}
                  />
                  <div className={css.Toggle}>
                    <Button
                      style={{ width: "100%" }} className={css.ToggleBtn} onClick={() => basketContext.toggle()} type="primary"
                      icon={basketContext.collapsed ? (<DoubleLeftOutlined /> ) : (<DoubleRightOutlined />)}
                    ></Button>
                  </div>
                </Sider>
              )}
            </>
          )}
          <Content>
            <Row justify="center" style={{ minHeight: "84.7vh", background: "#fff",}}>
              <Col className="content" span={23}>{props.children}</Col>
            </Row>
          </Content>
        </Layout>
        {/* <Footer
          style={{
            textAlign: "center",
            color: "#555963",
            background: "#fff",
          }}
        >
          Copyright © 2021 OBORTECH. All Rights Reserved.
        </Footer> */}
      </Content>
    </>
  );
}
