import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import PayWithdraw from "../components/PayWithdraw.jsx";

export default function Withdraw() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <PayWithdraw/>
      <Footer/>
    </>
  );
}