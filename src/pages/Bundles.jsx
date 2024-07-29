import AllBundles from "../components/AllBundles.jsx";
import Appbar from "../components/Appbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Bundles() {
    window.scrollTo(0, 0);

    return (
    <>
        <Appbar/>
        <AllBundles/>
        <Footer/>
    </>
    );
}