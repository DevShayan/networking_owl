import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import PackOrderConfPopup from "../components/PackOrderConfPopup.jsx";

export default function PackOrderConfirm() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <PackOrderConfPopup/>
      <Footer/>
    </>
  );
}