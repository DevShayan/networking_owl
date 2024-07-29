import { useNavigate } from "react-router-dom";
import "./NewPass.css"
import { useRef, useState } from "react";
import { login } from "../database/api_call";

export default function LoginInput() {
  const [passVisible, setPassVisible] = useState(false);
  const [regError, setRegError] = useState("");

  const passRef = useRef();
  const cPassRef = useRef();
  const regBtnRef = useRef();

  const navigate = useNavigate();

  function onLoginPress() {
    var isError = false;

    cPassRef.current.childNodes[2].innerHTML = "";
    passRef.current.childNodes[2].innerHTML = "";

    const passInput = passRef.current.childNodes[1].childNodes[0].value;
    const cPassInput = cPassRef.current.childNodes[1].childNodes[0].value;

    if (!passInput.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(.+){8}$/)) {
      passRef.current.childNodes[2].innerHTML = "Password must be at least 8 digits having a number and a letter";
      isError = true;
    }
    
    if (passInput == "") {
      passRef.current.childNodes[2].innerHTML = "Required";
      isError = true;
    }

    if (cPassInput != passInput) {
      cPassRef.current.childNodes[2].innerHTML = "Password does not match";
      isError = true;
    }

    if (cPassInput == "") {
      cPassRef.current.childNodes[2].innerHTML = "Required";
      isError = true;
    }

    
    if (!isError) {
      regBtnRef.current.innerHTML = "Please wait...";
      
      login(cPassInput, passInput)
      .then(() => {
        regBtnRef.current.innerHTML = "Change";
        navigate("/login");
      })
      .catch((err) => {
        regBtnRef.current.innerHTML = "Change";
        typeof err === "string" ? setRegError(err) : setRegError(err.message);
        console.log(err);
      });
    }
  }


  return (
    <div id="pass-input">
      <h3 id="pass-heading">Login</h3>
      <div ref={passRef}>
        <label htmlFor="pass">New Password</label>
        <div>
          <input type={ passVisible ? "text" : "password" } id="pass" />
          <span onClick={() => setPassVisible((prev) => !prev)} className="material-symbols-rounded eye-icon">
            { passVisible ? "visibility" : "visibility_off" }
          </span>
        </div>
        <span className="err-msg"></span>
      </div>
      <div ref={cPassRef}>
        <label htmlFor="pass">Confirm Password</label>
        <div>
          <input type={ passVisible ? "text" : "password" } id="pass" />
          <span onClick={() => setPassVisible((prev) => !prev)} className="material-symbols-rounded eye-icon">
            { passVisible ? "visibility" : "visibility_off" }
          </span>
        </div>
        <span className="err-msg"></span>
      </div>
      <button ref={regBtnRef} onClick={onLoginPress}>Change</button>
      <span id="reg-err">{regError}</span>
    </div>
  );
}