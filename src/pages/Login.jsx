import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import LoginInput from "../components/LoginInput.jsx";

export default function Login() {
  window.scrollTo(0, 0);

  return (
    <>
      <AppbarSimple/>
      <LoginInput/>
      <Footer/>
    </>
  );
}