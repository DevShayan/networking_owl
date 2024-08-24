import "./AboutPane.css"
import model1 from "../assets/modelf2.webp"
import model2 from "../assets/modelf3.webp"
import tree from "../assets/tree.png"
import { Link } from "react-router-dom"

export default function AboutPane() {

  return (
    <div id="about">
      <div id="about-pane">
        <img src={model1} alt="model" id="modelf2" />
        <div id="about-content">
          <h1 id="about-heading">Modes of earning through<br/> The Networking Owl</h1>
          <p id="para">You have two basic modes of earning as a member in our company</p>
          <div id="about-btn-wrapper">
            <Link to="/dashboard/profile"><button>get started</button></Link>
          </div>
        </div>
      </div>
      <div id="first-mode">
      <h3 className="content-heading">Our first mode</h3>
        <h4>User earning through money tree</h4>
        <p>If user makes A1 and A2 join, he will gets 25% of A1 and A2&apos;s registration fees, and if A1, A2 add B1, B2, B3, B4 user will get 20% of registration fee and A1, A2 will get 25% of B1, B2, B3, B4 registration fee. If B1, B2, B3, B4 add C1, C2, C3, C4, C5, C6, C7, C8 user will get 15% of their registration fee, A1, A2 will get 20% of C1, C2, C3, C4, C5, C6, C7, CB registration fee and B1, B2, B3, B4 will get 25% of C1, C2, C3, C4, C5, C6, C7, C8 registration fee.</p>
        <div id="tree-wrapper">
          <img src={ tree } alt="" />
          <p>Here 25% means if your referred person buys any packages, for example basic package which cost 899, then you’ll get 224.25 rupees, similarly goes on</p>
        </div>
      </div>
      <div id="second-mode">
        <h3 className="content-heading">Our second mode</h3>
        <h4>User earning through money tree</h4>
        <div id="para-wrapper">
          <p>The networking owl is providing the authority to it&apos;s user&apos;s that they can first buy our bundles and then sell bundles to any of the buyers without any risk of copyright and our comission. whenever user buy our bundle they can sell it any time it&apos;s all theirs. The networking owl is providing the authority to it&apos;s user&apos;s that they can first buy our bundles and then sell bundles to any of the buyers without any risk of copyright and our comis sion. whenever user buy our bundle they can sell it any time it&apos;s all theirs. The networking owl is providing the authority to it&apos;s user&apos;s that they can first buy our bundles and then sell bundles to any</p>
          <img src={ model2 } alt="model 2" id="modelf3" />
        </div>
      </div>
      <Link to="/dashboard/profile"><button>get started</button></Link>
    </div>
  );
}