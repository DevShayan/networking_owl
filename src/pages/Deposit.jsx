import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import PayDeposit from "../components/PayDeposit.jsx";

export default function Deposit() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <PayDeposit/>
      <Footer/>
    </>
  );
}