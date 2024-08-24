import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import TermsConditions from "../components/TermsConditions.jsx";

export default function Terms() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <TermsConditions/>
      <Footer/>
    </>
  );
}