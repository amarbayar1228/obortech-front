import { useRouter } from "next/router";
import {Layout,Menu,Breadcrumb,Row,Col,message,Button,Popover,Tooltip,Image,Drawer,Spin, Empty, Typography,} from "antd";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {ShoppingCartOutlined,GlobalOutlined,DoubleLeftOutlined,MenuOutlined,HomeOutlined,UserOutlined,DoubleRightOutlined,PlusSquareOutlined,LeftOutlined,AppstoreAddOutlined,AppstoreOutlined,PieChartOutlined,LogoutOutlined,UnorderedListOutlined,UserAddOutlined,ContainerOutlined,SettingOutlined} from "@ant-design/icons";
import css from "./style.module.css";
import BacketComponent from "../Backet";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import BasketContext from "../../context/basketContext/BasketContext";
import Head from "next/head";
import axios from "axios";
// import "antd/dist/antd.css";
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
  const [admin, setAdmin] = useState("3");
  const [localPkId, setLocalPkid] = useState("");
  const [open2, setOpen2] = useState(false);
  const [enState, setEnState] = useState("en");
  const [mnState, setMnState] = useState("mn");
  const [profileS, setProfileS] = useState();
  const [toogleCss, setToogleCss] = useState(false);
  useEffect(() => {  
    getProfile();
    // basketContext.basketStateFunc();
    setLocalPkid(localStorage.getItem("pkId"));
    // localStorage.setItem("orgId", "0");
    
    if (localStorage.getItem("token")) {
      setLocalStorageUserId(localStorage.getItem("token"));
    } else {
      setLocalStorageUserId("Null");
    }
  }, []);
  const getProfile  = () =>{
    if (localStorage.getItem("pkId")) {
      const body = {
        func: "getUserInfo",
        pkId: localStorage.getItem("pkId"),
      };
      axios.post("/api/post/Gate", body).then((res) => {  
        setProfileS(res.data.data);
        setAdmin(res.data.data.isSuperAdmin+""); 
        }).catch((err) => {console.log(err)});
    } else {
      console.log("null");
    } 
  }
  useEffect(() => {
    setAddItemStyleProps(props.addItemStyle);
    setTimeout(() => {
      setAddItemStyleProps([css.BasketPop]);
    }, 500); 
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
    admin === "1" ? getItem("Item / Coupon","2",<AppstoreAddOutlined style={{ fontSize: "18px", fontWeight: "500px" }}/>) : "",
    getItem("Order","3", <ContainerOutlined style={{ fontSize: "18px", fontWeight: "500px" }} />),
    admin === "1" ? getItem("User management","4",<UserAddOutlined style={{ fontSize: "18px", fontWeight: "500px" }} />): "",
    admin === "1" || admin === "2" ? "": getItem("Referral","5",<PlusSquareOutlined style={{ fontSize: "18px", fontWeight: "500px" }}/>),
    admin === "1" || admin === "2" ? getItem("Referral management","6",<PlusSquareOutlined style={{ fontSize: "18px", fontWeight: "500px" }}/>): "",


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
        <Button type="link" className={router.locale == "en" ? css.LanguageBtnActive : css.LanguageBtn} >
        <Image style={{marginRight: "7px"}} className={css.Flag} alt="Obertech" preview={false} src="/img/united-kingdom.png"/>
          <span className={router.locale == "en"  ? css.ActiveLang : "" }>{t("English")}</span>
        </Button>
      </Link>
      <Link href="/mn" locale={router.locales[3] === "mn" ? "mn" : "en"}>
        <Button type="link" className={router.locale == "mn" ? css.LanguageBtnActive : css.LanguageBtn}>
        <Image className={css.Flag} alt="Obertech" preview={false} src="/img/mongolia.png"/>
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
      
      <Button type="link" className={router.pathname === "/profile" ? css.LanguageBtnActive : css.LanguageBtn } onClick={Profile}><UserOutlined /> Profile</Button> 
      <Button type="link" className={router.pathname === "/security" ? css.LanguageBtnActive : css.LanguageBtn }  onClick={()=>router.push("/security")}><SettingOutlined /> Security </Button>
      <Button type="link" className={router.pathname === "/log" ? css.LanguageBtnActive : css.LanguageBtn }  onClick={()=>router.push("/log")} icon={<UnorderedListOutlined /> }>Log</Button>
      <Button type="link" onClick={logoutFunction} className={css.LanguageBtn}><LogoutOutlined /> Log out</Button>
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
  const sidebarF = () =>{
    setToogleCss(!toogleCss);
     
  }
  const removeOrgId = () =>{
    console.log("orgID cancel: ");
    router.push("/")
    basketContext.orgIdRemove();
  }
  return (
<>
<Head><title>OBORTECH</title><meta name="description" content="Generated by create next app" /><link rel="icon" href="img/HeaderLogo.png" /></Head>
<div className={css.Header}>
  <div className={css.Logo}>
    <div className={css.MenuMobile}><Button onClick={showDrawer2} type="link" className={css.IconsMenu} size="small"><MenuOutlined /></Button></div>
    <div className={css.ImageLogo}> <Image onClick={LogoFunction} className={css.ImgLogo} alt="Obertech" preview={false} src="/img/OBORTECH_logo_H_clean.svg"/>
      {basketContext.orgId == undefined ? "" :  
      <div className={css.OrgIdText}>
          <Tooltip color="rgb(101 163 13)" title={
                          <div>
                            <div>Organization name: </div>
                            <div style={{marginLeft: "10px"}}> * ObortechMn</div>
                            <div style={{marginLeft: "10px"}}> * ObortechEng</div>
                          </div>} placement="bottomLeft"> 
            <div className={css.OrgTooltip}> 
              <div> {basketContext.orgId}  </div>  
              <Typography.Text onClick={removeOrgId} className={css.CancelOrgId}> X </Typography.Text>
            </div>
        </Tooltip>
      </div>}  
    </div>
  </div>
  {basketContext.orgId == undefined ? null : <div className={css.OrgIdTextMobile}> <Tooltip placement="left" color="green" title={basketContext.orgId}>{basketContext.orgId}</Tooltip></div> }
{/* Moblie ============================================================= */}
  <div className={css.MenuMobile}>
    <div className={basketContext.orgId == undefined? css.MenuHoverIconAdminNo : css.MenuHoverIcon}>
      {basketContext.orgId == undefined ? null : (
        <div className={ router.pathname == "/payment" ? css.PopoverStyle2 : css.PopoverStyle1}>
          {basketContext.basketState.length === 0 ? (<div className={css.BasketPopNone}> </div>
          ) : (<div className={ addItemStyleProps === undefined ? [css.BasketPop] : addItemStyleProps }>{basketContext.basketState.length}</div>)}

          <Tooltip title={t("basketName")}>
            <Popover content={<BacketComponent />}
              title={<div className={css.BasketHeader}> 
              <div className={css.BasketHdrCss}><ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "15px" }}/>{t("basketName")}</div>
                <div>{basketContext.orgId == undefined ? "" : <div className={css.OrgIdText2}>{basketContext.orgId}</div>}</div>
              </div>}
              trigger="click" open={visibleMenu} onOpenChange={handleVisibleChangeMenu}>
              <Button size="small"type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}><ShoppingCartOutlined /></Button>
            </Popover> 


            {/* <Popover content={<BacketComponent />} title={<div className={css.BasketHeader}> 
            <div className={css.BasketHdrCss}><ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "15px" }}/>{t("basketName")}</div>
              <div>{basketContext.orgId == undefined ? "" : <div className={css.OrgIdText2}>Org ID: {basketContext.orgId}</div>}</div>
            </div>} 
              trigger="click" open={visible} onOpenChange={handleVisibleChange}>
              <Button type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}><ShoppingCartOutlined /></Button>
            </Popover> */}


          </Tooltip> 

         

        </div>
      )}
    </div> 
    <div className={css.MenuHoverIcon}>
      <Popover content={changeLanguage}><Button type="link" className={css.IconsMenu} size="small"><GlobalOutlined /></Button></Popover>
    </div> 
    {localPkId ? (
      <div className={router.pathname == "/profile" || router.pathname == "/security" ? css.ProfileBackCss : css.MenuHoverIcon3}>
        <div className={css.ProfileBackground}>
          <Popover content={changeProfile}>
            <Button type="link" className={css.IconsMenu} size="small">
              <div className={router.pathname == "/profile" ? css.ProfileCss : css.FlexPro}> <UserOutlined />
                <span className={css.ProfileText}> {admin === "0" ? basketContext.userInfoProfile === undefined ? "" : basketContext.userInfoProfile.email
                    : admin === "1" ? "Admin" : admin === "2" ? "Operator": ""}
                </span>
              </div>
            </Button>
          </Popover>
        </div>
      </div>
    ) : (
      <div className={router.pathname == "/login" ? css.ActiveMenu2 : css.MenuHoverIcon2}>
        <Tooltip title={t("loginName")}>
          <Button size="small" onClick={loginRouter} shape="circle" className={css.IconsMenu}><UserOutlined style={{ fontSize: "21px" }} /></Button>
        </Tooltip>
      </div>
    )}
    <Drawer title="Menu" placement="left" onClose={onClose2} open={open2} width={250}>
      <div className={css.MenuCont}>
        <div className={router.pathname === "/" ? css.ActiveMenu : ""}>
          <Button onClick={homeRouter} type="link" className={css.IconsMenu}><HomeOutlined /> {t("homeName")}</Button>
        </div>
        {basketContext.orgId == undefined ? "" : 
        <div className={router.pathname == "/items" ? css.ActiveMenu : ""}>
          <Button onClick={() => router.push("/items")} type="link" className={css.IconsMenu}><AppstoreAddOutlined /> Item </Button></div>}
        
        {localPkId ? (
          <div className={
              router.pathname == "/dashboard" ||
              router.pathname == "/affiliate" ||
              router.pathname == "/confirmation-list" ||
              router.pathname == "/order-history" ||
              router.pathname == "/referral" ||
              router.pathname == "/add-admin" ||
              router.pathname == "/add-item"? css.ActiveMenu : ""}>
            <Button onClick={userDashboard} type="link" className={css.IconsMenu}><AppstoreOutlined /> {t("dashboardTitle")}</Button>
          </div>) : ("")}
      </div>  
    </Drawer>
  </div> 
{/* Desktop ============================================================================== */}
  <div className={css.HeaderItem}>
    <div className={router.pathname === "/" ? css.Active : ""}>
      <Tooltip title={t("homeName")}><Button onClick={homeRouter} type="link" className={css.Icons}><HomeOutlined /></Button></Tooltip>
    </div>
    {basketContext.orgId === undefined ? "" : 
      <div className={router.pathname == "/items" ? css.Active : ""}>
      <Tooltip title={"items"}><Button onClick={() => router.push("/items")} type="link" className={css.Icons}><AppstoreAddOutlined /></Button></Tooltip>
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
        <Tooltip title={t("dashboardTitle")}><Button onClick={userDashboard} type="link" className={css.Icons}><AppstoreOutlined /></Button></Tooltip>
      </div>) : ("")}

    {basketContext.orgId == undefined ? ("") : (
      <div className={router.pathname == "/payment" ? css.PopoverStyle2 : css.PopoverStyle1}>
        {basketContext.basketState.length === 0 ? (<div className={css.BasketPopNone}> </div>
        ) : (<div className={ addItemStyleProps === undefined ? [css.BasketPop] : addItemStyleProps}>{basketContext.basketState.length}</div>)}
        <Tooltip title={t("basketName")}>
          <Popover content={<BacketComponent />} title={<div className={css.BasketHeader}>
          <div className={css.BasketHdrCss}><ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "15px" }}/>{t("basketName")}</div>
            <div>{basketContext.orgId == undefined ? "" : <div className={css.OrgIdText2}>{basketContext.orgId}</div>}</div></div>} 
            trigger="click" open={visible} onOpenChange={handleVisibleChange}>
            <Button type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}><ShoppingCartOutlined /></Button>
          </Popover>
        </Tooltip>
      </div>
    )}
    <div><Popover content={changeLanguage}><Button type="link" className={css.Icons}><GlobalOutlined /></Button></Popover></div>
    {localPkId ? (
      <div className={ router.pathname == "/profile" || router.pathname == "/security" ?  css.ProfileBackCss : ""}>
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
        <Tooltip title={t("loginName")}><Button onClick={loginRouter} type="link" className={css.Icons}><UserOutlined /></Button></Tooltip>
      </div>
    )}
  </div>
</div>
 

<div className={css.Layout}>
{localStorageUserId === "Null" ? null  : <>
{props.pageName === "home" || props.pageName === "login" || props.pageName === "items" ||props.pageName === "register" || 
    props.pageName === "basket" || props.pageName === "profile" ? null : 
<div className={toogleCss ? css.Sidebar : css.SidebarHide}>
    <div className={css.Links}> 
    <div className={css.ProfileZX}> 
    <div className={css.ImgZ}>
      {/* <div><Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64,"} style={{display: "flex", width: "30px", margin:"0px auto"}}/> </div> */}
      </div>
        {toogleCss ? 
        <div className={css.UserDe}> 
            <div className={css.UserTitle}> Amarbayar </div>
            <div className={css.UserDescr}>Web developer111111 </div>   
        </div> 
        : ""}

        {/* <div className={css.ToogleZX}><Button onClick={sidebarF} icon={<LeftOutlined />} size="small" shape="circle" className={css.BtnToogle}></Button> </div> */}
      </div>
      <div className={css.Line}> </div>
        <Link href="/dashboard">
        <Tooltip title="Dashboard" placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/dashboard" ? css.MenuActive : css.MenuZ}>
                <PieChartOutlined style={{fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Dashboard</div> : ""}
            </div>
            </Tooltip>
        </Link> 
        
        { admin === "1" ? 
        <Link href="/add-item">
          <Tooltip title="Item / Coupon" placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/add-item" ? css.MenuActive : css.MenuZ}>
                <AppstoreAddOutlined style={{fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Item / Coupon</div> : ""}
            </div>
            </Tooltip>
        </Link> : null}
        {admin === "1" || admin === "2"  ? 
        <Link href="/affiliate">
            <Tooltip title="affiliate" placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/affiliate" ? css.MenuActive : css.MenuZ}>
                <PlusSquareOutlined style={{fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}> affiliate</div>  : ""}
            </div>
            </Tooltip>
        </Link> : null}
            
        <Link href="/order-history">
          <Tooltip title="Order" placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/order-history" ? css.MenuActive : css.MenuZ}>
                <ContainerOutlined style={{fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Order</div> : ""}
            </div>
            </Tooltip>
        </Link>
        { admin === "1" ? 
        <Link href="/add-admin">
            <Tooltip title="User management" placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/add-admin" ? css.MenuActive : css.MenuZ}>
                <UserAddOutlined style={{fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>User management </div> : ""}
            </div>
            </Tooltip>
        </Link> : null}

          {admin === "1" || admin === "2" ? "" :
        <Link href="/referral">
            <Tooltip title="Referral management" placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/referral" ? css.MenuActive : css.MenuZ}>
                <PlusSquareOutlined style={{fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Referral management</div> : ""}
            </div>
            </Tooltip>
        </Link>}
        
    </div>
        <div className={css.BorderTop}>
        <Button style={{width: "100%"}} onClick={sidebarF} icon={<LeftOutlined />} size="small"  type="primary"></Button>
        </div> 
</div>
}
</>
}
    <div className={props.pageName === "items" ? css.ContentItem : props.pageName === "home" ? css.ContentHome  : props.pageName === "login" ? css.ContentHome :    toogleCss ? css.ContentCss : css.Content}>
 
         {props.children}
    </div>
 </div> 
 




{/* <Content>
  {props.pageName === "home" || props.pageName === "login" || props.pageName === "items" || props.pageName === "register" ||
  props.pageName === "basket"  || props.pageName === "security" ? null : (
    <Breadcrumb style={{margin: "4px 10px",}}>
      <Breadcrumb.Item><AppstoreOutlined /></Breadcrumb.Item>
      <Breadcrumb.Item href="/payment"> <ShoppingCartOutlined /> </Breadcrumb.Item>
      <Breadcrumb.Item> <UserOutlined /></Breadcrumb.Item>
    </Breadcrumb>
  )}

  <Layout className="site-layout-background">
    {localStorageUserId === "Null" ? ("" ) : (
      <>
        {props.pageName === "home" || props.pageName === "login" || props.pageName === "items" ||props.pageName === "register" || 
        props.pageName === "basket" || props.pageName === "profile" ? null : (
          <Sider trigger={null} collapsible collapsed={basketContext.collapsed} onCollapse={() => basketContext.onCollapse()} style={{ background: "#fff", color: "red", fontWeight: "500", fontSize: "18px",}} width={200}>
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
              defaultOpenKeys={[router.pathname == "/dashboard" ? "1" : "6",]} items={items2} onClick={getItem}/>
            <div className={css.Toggle}>
              <Button style={{ width: "100%" }} className={css.ToggleBtn} onClick={() => basketContext.toggle()} type="primary" 
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
</Content> */}

</>
  );
}
