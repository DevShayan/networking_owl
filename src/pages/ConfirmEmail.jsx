import AppbarSimple from "../components/AppbarSimple.jsx";
import Footer from "../components/Footer.jsx";
import EmailConfirmation from "../components/EmailConfirmation.jsx";

export default function ConfirmEmail() {
    window.scrollTo(0, 0);

    return (
    <>
        <AppbarSimple/>
        <EmailConfirmation/>
        <Footer/>
    </>
    );
}