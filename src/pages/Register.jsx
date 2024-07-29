import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import RegisterInput from "../components/RegisterInput.jsx";

export default function Register() {
    window.scrollTo(0, 0);

    return (
    <>
        <AppbarSimple/>
        <RegisterInput/>
        <Footer/>
    </>
    );
}