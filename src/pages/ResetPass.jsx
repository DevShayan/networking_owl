import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import NewPass from "../components/NewPass.jsx";

export default function Register() {
    window.scrollTo(0, 0);

    return (
    <>
        <AppbarSimple/>
        <NewPass/>
        <Footer/>
    </>
    );
}