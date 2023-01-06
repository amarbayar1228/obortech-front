import { useRouter } from "next/router";
import {Layout,Menu,Breadcrumb,Row,Col,message,Button,Popover,Tooltip,Image,Drawer,Spin, Empty, Typography,} from "antd";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {ShoppingCartOutlined,GlobalOutlined,ArrowLeftOutlined,MenuOutlined,HomeOutlined,UserOutlined,RightOutlined,PlusSquareOutlined,CaretRightOutlined,AppstoreAddOutlined,AppstoreOutlined,PieChartOutlined,LogoutOutlined,UnorderedListOutlined,UserAddOutlined,ContainerOutlined,SettingOutlined,DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";
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
  const [settingToggle, setSettingToggle] = useState(false);
  const [matches, setMatches] = useState("(min-width: 590px)"); 
  useEffect(() => {  
    getProfile();
 
    window.matchMedia("(min-width: 590px)").addEventListener('change', e => setMatches( e.matches ));
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
        <Button type="link" className={router.locale == "en" ? css.LanguageBtnActive : css.LanguageBtn} style={{width: "100%"}}>
        <Image style={{marginRight: "7px"}} className={css.Flag} alt="Obertech" preview={false} src="/img/united-kingdom.png"/>
          <span className={router.locale == "en"  ? css.ActiveLang : "" }>{t("English")}</span>
        </Button>
      </Link>
      <Link href="/mn" locale={router.locales[3] === "mn" ? "mn" : "en"}>
        <Button type="link" className={router.locale == "mn" ? css.LanguageBtnActive : css.LanguageBtn} style={{width: "100%"}}>
        <Image className={css.Flag} alt="Obertech" preview={false} src="/img/mongolia.png"/>
          <span className={router.locale == "mn" ? css.ActiveLang : ""}>Монгол</span>
        </Button>
      </Link>
    </div>
  );
  const logoutFunction = () => {
    basketContext.orgIdRemove();
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
    localStorage.removeItem("invoF");
    basketContext.removeBasketStorage();
    basketContext.getUserProfileFunction();
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
  const securityBtn = () =>{
    setSettingToggle(true);
  }
  const changeProfile = (
    <div style={{width: "250px"}}>

      <div className={css.ProXp}>
        <div className={css.AvatarC}>
          <Image className={css.Avatar} alt="Obertech" preview={false} 
          src={basketContext.userInfoProfile === undefined ? "/img/user.png" : basketContext.userInfoProfile.img === "-" ? "/img/user.png" : "data:image/png;base64," + basketContext.userInfoProfile.img }/>
       
        </div> 
        <div className={css.Bonus}>
          <div className={css.BonusChild}>
            <div>Account</div>
            <div>5301019298</div>
          </div>
          <div className={css.BonusChild}>
            <div>Bonus</div>
            <div>10$</div>
          </div>
        </div>
      </div>

       {settingToggle ? 
       <div className={css.SettingToggleCss}>
       <div className={css.SettingTitle}><Button type="ghost" shape="circle" size="small" onClick={()=>setSettingToggle(false)}><ArrowLeftOutlined /></Button> Setting & privacy </div>
       {admin === "1" ?
       <Button size="large" type="link" className={router.pathname === "/global-settings" ? css.LanguageBtnActive : css.LanguageBtn } onClick={()=> router.push("/global-settings")} style={{width: "100%"}}><SettingOutlined /> Global settings</Button> 
       : null}
       <Button type="link" size="large" className={router.pathname === "/security" ? css.LanguageBtnActive : css.LanguageBtn } onClick={()=>router.push("/security")} style={{width: "100%"}}><SettingOutlined /> Security </Button> 
       </div>
       :
       <div> 
     
      <Button type="link" size="large" className={router.pathname === "/security" ? css.LanguageBtnActive : css.LanguageBtn }  onClick={securityBtn}><div><SettingOutlined /> Settings</div> <div style={{position: "absolute", right: "2px"}}><RightOutlined /></div></Button>  
      <Button type="link" size="large" className={router.pathname === "/profile" ? css.LanguageBtnActive : css.LanguageBtn } onClick={Profile}><UserOutlined /> Profile</Button> 
      <Button type="link" size="large" className={router.pathname === "/log" ? css.LanguageBtnActive : css.LanguageBtn }  onClick={()=>router.push("/log")} icon={<UnorderedListOutlined /> }>Log</Button>
      <Button type="link" size="large" onClick={logoutFunction} className={css.LanguageBtn}><LogoutOutlined /> Log out</Button>
      </div>
      }
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
         <Tooltip  title={
                      <div style={{fontSize: "12px"}}>
                        <div> {router.locale === "mn" ? "Байгууллагын нэр: ": "Organization name: "} {basketContext.orgId}</div> 
                        <div>{router.locale === "mn" ? "Байгууллагын код: " : "Organization ID: "} <span>{basketContext.orgNames[0].orgIdstate}</span> </div>
                      </div>} placement="bottomLeft"> 
                      <div className={css.OrgTooltip}> 
                        <div className={css.OrgTextEllip}> {basketContext.orgId}  </div>  
                        <Typography.Text onClick={removeOrgId} className={css.CancelOrgId}> X </Typography.Text>
                      </div>
                </Tooltip>
      </div>}  
    </div>
  </div>

  {/* {basketContext.orgId == undefined ? null : <div className={css.OrgIdTextMobile}> <Tooltip placement="left" color="green" title={basketContext.orgId}>{basketContext.orgId}</Tooltip></div> } */}
{/* Moblie ============================================================= */}
  <div className={css.MenuMobile}>
      {/* =====> Sags */}
    <div className={basketContext.orgId == undefined? css.MenuHoverIconAdminNo : css.MenuHoverIcon}>
      {basketContext.orgId == undefined ? null : (
        <div className={ router.pathname == "/payment" ? css.PopoverStyle2 : css.PopoverStyle1}>
          {basketContext.basketState.length === 0 ? (<div className={css.BasketPopNone}> </div>) : (<div className={ addItemStyleProps === undefined ? [css.BasketPop] : [css.BasketPop] }>{basketContext.basketState.length}</div>)}

          <Tooltip title={t("basketName")}>
            <Popover content={<BacketComponent />}
              placement="topRight"
              title={<div className={css.BasketHeader}> 
              <div className={css.BasketHdrCss}><ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "15px" }}/>Cart</div>
                <div>{basketContext.orgId == undefined ? "" : <div className={css.OrgIdText2}>
                <Tooltip  title={
                      <div style={{fontSize: "12px"}}>
                        <div>{router.locale === "mn" ? "Байгууллагын нэр: " : "Organization name: "} {basketContext.orgId}</div> 
                        <div>{router.locale === "mn" ? "Байгууллагын код: " : "Organization ID:"} <span>{basketContext.orgNames[0].orgIdstate}</span> </div>
                      </div>} placement="bottomLeft"> 
                      <div className={css.OrgTooltip}> 
                        <div className={css.OrgTextEllip}> {basketContext.orgId}  </div>  
                        <Typography.Text onClick={removeOrgId} className={css.CancelOrgId}> X </Typography.Text>
                      </div>
                </Tooltip>
                  
                  </div>}</div>
              </div>}
              trigger="click" open={visibleMenu} onOpenChange={handleVisibleChangeMenu}>
              <Button size="small"type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}><ShoppingCartOutlined /></Button>
            </Popover>
          </Tooltip>
        </div>
      )}
    </div> 
    {/* language */}
    <div className={css.MenuHoverIcon}>
      <Popover content={changeLanguage}><Button type="link" className={css.IconsMenu} size="small"><GlobalOutlined /></Button></Popover>
    </div> 

    {/* {localPkId ? (
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
    )} */}
<Drawer title={<div className={css.MenuTitle}> 

{localPkId ? <>{admin === "0" ? basketContext.userInfoProfile === undefined ? null : basketContext.userInfoProfile.email : admin === "1" ? "Admin" : admin === "2" ? "Operator " : ""} </>: "Menu" }

 </div>} placement="left" onClose={onClose2} open={open2} width={220}>
<div className={css.MenuCont}>  
 
{/* Login */}
{localPkId ? "" : <div className={css.RoutCss}><Button onClick={loginRouter} type="link" className={router.pathname === "/login" ? css.LanguageBtnActive : css.LanguageBtn}><UserOutlined/>Login</Button></div>}

{/* Home */} 
<div className={css.RoutCss}><Button onClick={homeRouter} type="link" className={router.pathname === "/" ? css.LanguageBtnActive : css.LanguageBtn}><HomeOutlined /> {t("homeName")}</Button></div>
{/* Item */}
{basketContext.orgId == undefined ? "" : 
<div className={css.RoutCss}> <Button onClick={() => router.push("/items")} type="link" className={router.pathname === "/items" ? css.LanguageBtnActive  : css.LanguageBtn}><AppstoreAddOutlined /> Items </Button></div>}

{/* Dashboard */}
{localPkId ? (<div><Button onClick={userDashboard} type="link" className={router.pathname === "/dashboard" ?  css.LanguageBtnActive : css.LanguageBtn}><AppstoreOutlined /> {t("dashboardTitle")}</Button></div>) : ("")}
{/* Profile */}
{localPkId ? (<div><Button onClick={Profile} type="link" className={router.pathname === "/profile" ? css.LanguageBtnActive : css.LanguageBtn}><UserOutlined />Profile</Button></div>) : ("")}
{/* Log */}
{localPkId ? (<div><Button onClick={()=>router.push("/log")} type="link" className={router.pathname === "/log" ? css.LanguageBtnActive: css.LanguageBtn}><UnorderedListOutlined />Log</Button></div>) : ("")}
{/* Security  */}
{localPkId ? (<div><Button onClick={()=>router.push("/security")} type="link" className={router.pathname === "/security" ? css.LanguageBtnActive: css.LanguageBtn}><SettingOutlined />Security </Button></div>) : ("")}
{/* Global settings */}
{localPkId ? admin === "1" ?
<div><Button onClick={()=> router.push("/global-settings")} type="link" className={router.pathname === "/global-settings" ? css.LanguageBtnActive : css.LanguageBtn}><SettingOutlined />Global settings</Button></div>
: null : null}


{/* Log out */}
{localPkId ? <div><Button type="link" onClick={logoutFunction} className={css.LanguageBtn}><LogoutOutlined /> Log out</Button></div> : null }

 

{/* {settingToggle ? 
<div className={css.SettingToggleCss}> 
<div className={css.SettingTitle}><Button type="ghost" shape="circle" size="small" onClick={()=>setSettingToggle(false)}><ArrowLeftOutlined /></Button> Setting & privacy </div>
<Button type="link" className={router.pathname === "/global-settings" ? css.LanguageBtnActive : css.LanguageBtn } onClick={()=> router.push("/global-settings")}><SettingOutlined /> Global settings</Button> 
<Button type="link" className={router.pathname === "/security" ? css.LanguageBtnActive : css.LanguageBtn } onClick={()=>router.push("/security")}><SettingOutlined /> Security </Button> 
</div>
:
<div> 
<Button type="link" className={router.pathname === "/profile" ? css.LanguageBtnActive : css.LanguageBtn } onClick={Profile}><UserOutlined /> Profile</Button> 
<Button type="link" className={router.pathname === "/security" ? css.LanguageBtnActive : css.LanguageBtn }  onClick={securityBtn}><SettingOutlined /> Settings</Button>  
<Button type="link" className={router.pathname === "/log" ? css.LanguageBtnActive : css.LanguageBtn }  onClick={()=>router.push("/log")} icon={<UnorderedListOutlined /> }>Log</Button>
<Button type="link" onClick={logoutFunction} className={css.LanguageBtn}><LogoutOutlined /> Log out</Button> */}
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
        <Tooltip title={"Cart"}>
          <Popover content={<BacketComponent />} title={<div className={css.BasketHeader} >
          <div className={css.BasketHdrCss}><ShoppingCartOutlined style={{ paddingRight: "5px", fontSize: "15px" }}/>{"Cart"}</div>
            <div>{basketContext.orgId == undefined ? "" : <div className={css.OrgIdText2}>
              
            <Tooltip   title={
                      <div style={{fontSize: "12px"}}>
                        <div>{router.locale === "mn" ? "Байгууллагын нэр: " : "Organization name: "} {basketContext.orgId}</div> 
                        <div>{router.locale === "mn" ? "Байгууллагын код: " : "Organization ID: "} <span>{basketContext.orgNames[0].orgIdstate}</span> </div>
                      </div>} placement="bottomLeft"> 
                      <div className={css.OrgTooltip}> 
                        <div> {basketContext.orgId}  </div>  
                        <Typography.Text onClick={removeOrgId} className={css.CancelOrgId}> X </Typography.Text>
                      </div>
                </Tooltip>
              
              
              </div>}</div></div>} 
            trigger="click" open={visible} onOpenChange={handleVisibleChange}>
            <Button type="link" className={router.pathname == "/payment" ? css.ActiveBasket : css.Icons}><ShoppingCartOutlined /></Button>
          </Popover>
        </Tooltip>
      </div>
    )}

    

    {localPkId ? (
      <div className={ router.pathname == "/profile" || router.pathname == "/security" ?  css.ProfileBackCss : ""}>
        <div className={css.ProfileBackground}>
          <Popover content={changeProfile}>
            <Button type="link" className={css.Icons}>
              <div className={ router.pathname == "/profile" ? css.ProfileCss : css.FlexPro}><UserOutlined />
                <span className={css.ProfileText}>
                  {admin === "0" ? basketContext.userInfoProfile === undefined ? "" : basketContext.userInfoProfile.email : admin === "1" ? "Admin" : admin === "2" ? "Operator " : ""}
                </span>
              </div>
            </Button>
          </Popover>
        </div>
      </div>
    ) : (
      <div className={router.pathname == "/login" ? css.Active : ""}><Tooltip title={t("loginName")}><Button onClick={loginRouter} type="link" className={css.Icons}><UserOutlined /></Button></Tooltip></div>
    )}
  <div style={{borderLeft: "1px solid #ccc", marginLeft: "16px", paddingTop: "2px"}}><Popover content={changeLanguage}><Button type="link" className={css.Icons}><GlobalOutlined /></Button></Popover></div>
  </div>
</div>
 
{/* Layout ============================================================================== */}
<div className={props.pageName === "payment" ? css.Layout2 : css.Layout}>
{localStorageUserId === "Null" ? null  : <>
{props.pageName === "home" || props.pageName === "login" || props.pageName === "items" ||props.pageName === "register" || 
    props.pageName === "basket" || props.pageName === "profile" || props.pageName === "payment" ? null : 
<div className={toogleCss ? css.Sidebar : css.SidebarHide}>
    <div className={css.Links}> 
    <div className={css.ProfileZX}> 
    <div className={css.ImgZ}>
      {/* <div><Image alt="Obertech" preview={true} className={css.Zurag} src={"data:image/png;base64,"} style={{display: "flex", width: "30px", margin:"0px auto"}}/> </div> */}
      </div>
        {toogleCss ? 
        <div className={css.UserDe}> 
            <div className={css.UserTitle}> {admin === "0" ? basketContext.userInfoProfile === undefined ? "" : basketContext.userInfoProfile.email
                    : admin === "1" ? basketContext.userInfoProfile.email  : admin === "2" ? basketContext.userInfoProfile.email : ""} </div>
            <div className={css.UserDescr}>{admin === "0" ? basketContext.userInfoProfile === undefined ? "" : basketContext.userInfoProfile.firstname
                    : admin === "1" ?  "Admin" : admin === "2" ? "Operator": ""}  </div>   
        </div> 
        : ""}

        {/* <div className={css.ToogleZX}><Button onClick={sidebarF} icon={<LeftOutlined />} size="small" shape="circle" className={css.BtnToogle}></Button> </div> */}
      </div>
      <div className={css.Line}> </div>
        <Link href="/dashboard">
        <Tooltip title={!matches && "" || matches && "Dashboard"} placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/dashboard" ? css.MenuActive : css.MenuZ}>
                <PieChartOutlined style={!matches && {fontSize: "15px"} || matches && {fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Dashboard</div> : ""}
                {!matches &&  <div className={css.Text}>Dashboard</div>}
            </div>
            </Tooltip>
        </Link> 
        
        { admin === "1" ? 
        <Link href="/add-item">
          <Tooltip title={!matches && "" || matches && "Item / Group"} placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/add-item" ? css.MenuActive : css.MenuZ}>
                <AppstoreAddOutlined style={!matches && {fontSize: "15px"} || matches && {fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Item / Group</div> : ""} 
                {!matches &&  <div className={css.Text}>Item</div>}
              {/* {matches && (<h1>Big Screen</h1>)}
                {!matches && (<h3>Small Screen</h3>)} */} 
            </div>
            
            </Tooltip>
        </Link> : null}
        {admin === "1" || admin === "2"  ? 
        <Link href="/affiliate">
            <Tooltip title={!matches && "" || matches && "Referral management"} placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/affiliate" ? css.MenuActive : css.MenuZ}>
                <PlusSquareOutlined style={!matches && {fontSize: "15px"} || matches && {fontSize:"20px"}}/>
                {toogleCss ?  <div className={css.Text}> Referral management</div>  : ""}
                {!matches &&  <div className={css.Text}>Referral management</div>}
            </div>
            </Tooltip>
        </Link> : null}
            
        <Link href="/order-history">
          <Tooltip title={!matches && "" || matches && "Order"}  placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/order-history" ? css.MenuActive : css.MenuZ}>
                <ContainerOutlined style={!matches && {fontSize: "15px"} || matches && {fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Order</div> : ""}
                {!matches &&  <div className={css.Text}>Order</div>}
            </div>
            </Tooltip>
        </Link>
        { admin === "1" ? 
        <Link href="/add-admin">
            <Tooltip title={!matches && "" || matches && "User management"}  placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/add-admin" ? css.MenuActive : css.MenuZ}>
                <UserAddOutlined style={!matches && {fontSize: "15px"} || matches && {fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>User management </div> : ""}
                {!matches &&  <div className={css.Text}>User</div>}
            </div>
            </Tooltip>
        </Link> : null}

          {admin === "1" || admin === "2" ? "" :
        <Link href="/referral">
            <Tooltip title={!matches && "" || matches && "Referral management"} placement="right" color="#f43f5e"> 
            <div className={router.pathname === "/referral" ? css.MenuActive : css.MenuZ}>
                <PlusSquareOutlined style={!matches && {fontSize: "15px"} || matches && {fontSize: "20px"}}/>
                {toogleCss ?  <div className={css.Text}>Referral management</div> : ""}
                {!matches &&  <div className={css.Text}>Referral</div>}
            </div>
            </Tooltip>
        </Link>}
        
    </div>
        <div className={css.BorderTop}>
        <Button style={{width: "100%"}} onClick={sidebarF} icon={toogleCss ? <DoubleLeftOutlined /> : <DoubleRightOutlined />} size="small"  type="primary"></Button>
        </div> 
</div>
}
</>
}
{/* Content ============================================================================== */}
<div className={props.pageName === "items" ? css.ContentItem : props.pageName === "home" ? css.ContentHome  : props.pageName === "login" ? css.ContentHome :    toogleCss ? css.ContentCss : 
props.pageName === "payment" ? css.ContentPayment : css.Content}> 
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
