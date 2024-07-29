import AboutPane from "../components/AboutPane.jsx";
import Appbar from "../components/Appbar.jsx";
import Footer from "../components/Footer.jsx";

export default function About() {
    window.scrollTo(0, 0);

    return (
    <>
        <Appbar/>
        <AboutPane/>
        <Footer/>
    </>
    );
}