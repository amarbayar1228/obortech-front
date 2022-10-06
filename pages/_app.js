import { ConfigProvider } from "antd";
import "../styles/globals.css";
import "antd/dist/antd.variable.min.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { BasketItem } from "../context/basketContext/BasketContext";
import { ThemeProvider } from "next-themes";
import { createRoot } from "react-dom/client";
function MyApp({ Component, pageProps }) {
  ConfigProvider.config({
    theme: {
      primaryColor: "#4D5057",
    },
  });
  // const testShvv = () => {
  //   console.log("amraa");
  // };
  return (
    <div>
      <BasketItem>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </BasketItem>
    </div>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
