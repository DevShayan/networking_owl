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
          {
            passVisible ?
              <svg onClick={() => setPassVisible((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg> :
              <svg onClick={() => setPassVisible((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
          }
        </div>
        <span className="err-msg"></span>
      </div>
      <div ref={cPassRef}>
        <label htmlFor="conf_pass">Confirm Password</label>
        <div>
          <input type={ passVisible ? "text" : "password" } id="conf_pass" />
          {
            passVisible ?
              <svg onClick={() => setPassVisible((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg> :
              <svg onClick={() => setPassVisible((prev) => !prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
          }
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