import { Link, useNavigate } from "react-router-dom";
import "./LoginInput.css"
import { useRef, useState } from "react";
import { login } from "../database/api_call";

export default function LoginInput() {
  const [passVisible, setPassVisible] = useState(false);
  const [regError, setRegError] = useState("");

  const emailRef = useRef();
  const passRef = useRef();
  const regBtnRef = useRef();

  const navigate = useNavigate();

  function onLoginPress() {
    var isError = false;

    emailRef.current.childNodes[2].innerHTML = "";
    passRef.current.childNodes[2].innerHTML = "";

    const emailInput = emailRef.current.childNodes[1].value;
    const passInput = passRef.current.childNodes[1].childNodes[0].value;


    if (emailInput == "") {
      emailRef.current.childNodes[2].innerHTML = "Required";
      isError = true;
    }

    if (passInput == "") {
      passRef.current.childNodes[2].innerHTML = "Required";
      isError = true;
    }

    
    if (!isError) {
      regBtnRef.current.innerHTML = "Please wait...";
      
      login(emailInput, passInput)
        .then(() => {
          regBtnRef.current.innerHTML = "Login";
          navigate("/dashboard/profile");
        })
        .catch((err) => {
          regBtnRef.current.innerHTML = "Login";
          typeof err === "string" ? setRegError(err) : setRegError(err.message);
          console.log(err);
        });
    }
  }


  return (
    <div id="login-input">
      <h3 id="login-heading">Login</h3>
      <div ref={emailRef}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
        <span className="err-msg"></span>
      </div>
      <div ref={passRef}>
        <label htmlFor="pass">Password</label>
        <div>
          <input type={ passVisible ? "text" : "password" } id="pass" />
          <span onClick={() => setPassVisible((prev) => !prev)} className="material-symbols-rounded eye-icon">
            { passVisible ? "visibility" : "visibility_off" }
          </span>
        </div>
        <span className="err-msg"></span>
      </div>
      <button ref={regBtnRef} onClick={onLoginPress}>Login</button>
      <Link to="/register">No account?
      </Link>
      <span id="reg-err">{regError}</span>
    </div>
  );
}