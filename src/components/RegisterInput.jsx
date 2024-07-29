import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./RegisterInput.css"
import { useRef, useState } from "react";
import { register } from "../database/api_call";

export default function RegisterInput() {
  const [searchParams] = useSearchParams();
  const [passVisible, setPassVisible] = useState(false);
  const [regError, setRegError] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const cPassRef = useRef();
  const dobRef = useRef();
  const cityRef = useRef();
  const phNoRef = useRef();
  const countryRef = useRef();
  const regBtnRef = useRef();

  const navigate = useNavigate();

  const refCode = searchParams.get("ref_code");

  function onRegisterPress() {
    var isError = false;

    nameRef.current.childNodes[2].innerHTML = "";
    emailRef.current.childNodes[2].innerHTML = "";
    passRef.current.childNodes[2].innerHTML = "";
    cPassRef.current.childNodes[2].innerHTML = "";
    dobRef.current.childNodes[2].innerHTML = "";
    cityRef.current.childNodes[2].innerHTML = "";
    countryRef.current.childNodes[2].innerHTML = "";
    phNoRef.current.childNodes[2].innerHTML = "";

    const nameInput = nameRef.current.childNodes[1].value;
    const emailInput = emailRef.current.childNodes[1].value;
    const passInput = passRef.current.childNodes[1].childNodes[0].value;
    const cPassInput = cPassRef.current.childNodes[1].childNodes[0].value;
    const dobInput = dobRef.current.childNodes[1].value;
    const cityInput = cityRef.current.childNodes[1].value;
    const countryInput = countryRef.current.childNodes[1].value;
    const phNoInput = phNoRef.current.childNodes[1].value;


    if (nameInput.trim() == "") {
      nameRef.current.childNodes[2].innerHTML = "Required field";
      isError = true;
    }

    if (!emailInput.match(/^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      emailRef.current.childNodes[2].innerHTML = "Invalid email";
      isError = true;
    }

    if (!passInput.match(/^.{8,}$/)) {
      passRef.current.childNodes[2].innerHTML = "Password must be at least 8 digits having a number and a letter";
      isError = true;
    }

    if (cPassInput != passInput) {
      cPassRef.current.childNodes[2].innerHTML = "Password does not match";
      isError = true;
    }
    
    if (dobInput == "") {
      dobRef.current.childNodes[2].innerHTML = "Required field";
      isError = true;
    }
    else {
      const [year] = dobInput.split("-");
      if (parseInt(year) < 1900) {
        dobRef.current.childNodes[2].innerHTML = "Invalid date";
        isError = true;
      }
    }

    if (cityInput.trim() == "") {
      cityRef.current.childNodes[2].innerHTML = "Required field";
      isError = true;
    }

    if (countryInput.trim() == "") {
      countryRef.current.childNodes[2].innerHTML = "Required field";
      isError = true;
    }

    if (phNoInput.trim() == "") {
      phNoRef.current.childNodes[2].innerHTML = "Required field";
      isError = true;
    }
    
    if (!isError) {
      regBtnRef.current.innerHTML = "Please wait...";
      
      register({
        user: {
          name: nameInput,
          email: emailInput,
          city: cityInput,
          password: passInput,
          dob: dobInput,
          country: countryInput,
          phone_no: phNoInput
        }
      }, refCode)
      .then(() => {
        regBtnRef.current.innerHTML = "Register";
        navigate("/dashboard/profile");
      })
      .catch((err) => {
        regBtnRef.current.innerHTML = "Register";
        typeof err === "string" ? setRegError(err) : setRegError(err.message);
        console.log(err);
      });
    }
  }


  return (
    <div id="register-input">
      <h3 id="register-heading">Register</h3>
      <div ref={nameRef}>
        <label htmlFor="f-name">Full Name</label>
        <input type="text" id="f-name" />
        <span className="err-msg"></span>
      </div>
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
      <div ref={cPassRef}>
        <label htmlFor="conf_pass">Confirm Password</label>
        <div>
          <input type={ passVisible ? "text" : "password" } id="conf_pass" />
          <span  onClick={() => setPassVisible((prev) => !prev)} className="material-symbols-rounded eye-icon">
            {passVisible ? "visibility" : "visibility_off"}
          </span>
        </div>
        <span className="err-msg"></span>
      </div>
      <div ref={dobRef}>
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" />
        <span className="err-msg"></span>
      </div>
      <div ref={cityRef}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
        <span className="err-msg"></span>
      </div>
      <div ref={countryRef}>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" />
        <span className="err-msg"></span>
      </div>
      <div ref={phNoRef}>
        <label htmlFor="phone">Phone no.</label>
        <input type="tel" id="phone" />
        <span className="err-msg"></span>
      </div>
      <button ref={regBtnRef} onClick={onRegisterPress}>Register</button>
      <Link to="/login">Already have an account?
      </Link>
      <span id="reg-err">{regError}</span>
    </div>
  );
}