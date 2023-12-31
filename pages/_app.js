import { ConfigProvider, Spin } from "antd";
import "../styles/globals.css";
// import "antd/dist/antd.variable.min.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { BasketItem } from "../context/basketContext/BasketContext";
import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";

function MyApp({ Component, pageProps }) {
  // ConfigProvider.config({theme: {primaryColor: "#4D5057"}}); 
  function Loading() {
    const router = useRouter(); 
    const [loading, setLoading] = useState(false); 
 
useEffect(() => {  
// page loading..
const handleStart = (url) => (url !== router.asPath) && setLoading(true);
const handleComplete = (url) => (url === router.asPath) && setTimeout(() =>{setLoading(false)},800);

router.events.on('routeChangeStart', handleStart)
router.events.on('routeChangeComplete', handleComplete)
router.events.on('routeChangeError',  handleComplete)

return () => {
  router.events.off('routeChangeStart', handleStart)
  router.events.off('routeChangeComplete', handleComplete)
  router.events.off('routeChangeError', handleComplete)
}
})
  
return loading && (<div className='spinner-wrapper'><div><Spinner /> </div></div>)
}
  return (
    <div>
        <Loading />
      <BasketItem>
        {/* <ThemeProvider attribute="class">  */}
          <Component {...pageProps} />
        {/* </ThemeProvider> */}
      </BasketItem>
    </div>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
