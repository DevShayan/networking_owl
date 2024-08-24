import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import PrivacyPolicy from "../components/PrivacyPolicy.jsx";

export default function Policy() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <PrivacyPolicy/>
      <Footer/>
    </>
  );
}