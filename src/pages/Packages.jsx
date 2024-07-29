import Appbar from "../components/Appbar.jsx";
import Footer from "../components/Footer.jsx";
import PackagesPricing from "../components/PackagesPricing.jsx";

export default function Packages() {
  window.scrollTo(0, 0);

  return (
    <>
      <Appbar/>
      <PackagesPricing/>
      <Footer/>
    </>
  );
}