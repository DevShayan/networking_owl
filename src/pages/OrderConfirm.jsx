import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import OrderConfPane from "../components/OrderConfPopup.jsx";

export default function Login() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <OrderConfPane/>
      <Footer/>
    </>
  );
}