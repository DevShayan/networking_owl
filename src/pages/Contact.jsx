import Appbar from "../components/Appbar.jsx";
import ContactPane from "../components/ContactPane.jsx";
import Footer from "../components/Footer.jsx";

export default function Contact() {
  window.scrollTo(0, 0);

  return (
    <>
      <Appbar/>
      <ContactPane/>
      <Footer/>
    </>
  );
}