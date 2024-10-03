import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import "../styles/globals.css"; 
import "../styles/main.css"; 

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router, { useRouter } from "next/router";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });

NProgress.configure({
  minimum: 0.6,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function AppWrapper({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div>
      {router?.pathname != "/search" && <Navbar /> }
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default AppWrapper;
