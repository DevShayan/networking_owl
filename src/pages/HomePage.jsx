import Appbar from "../components/Appbar.jsx";
import Footer from "../components/Footer.jsx";
import Info from "../components/Info.jsx";
import TopSelling from "../components/TopSelling.jsx";

export default function HomePage() {
  window.scrollTo(0, 0);

  return (
    <>
      <Appbar/>
      <Info/>
      <TopSelling/>
      <Footer/>
    </>
  );
}