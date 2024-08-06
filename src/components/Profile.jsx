import "./Profile.css"
import profile from "../assets/blank_profile.png"
import { refLink, user } from "../pojos/user";
import dateFormat from "dateformat"
import { useContext, useRef, useState } from "react";
import { editProfile, genRefLink, getRefLink } from "../database/api_call";
import { reloadContext } from "../contexts/reloadContext";

export default function Profile() {
  const [, setReload] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [tempImg, setTempImg] = useState(user.image_link ?? profile);
  const setHeaderReload = useContext(reloadContext);

  const editBtnRef = useRef();
  const nameRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const dobRef = useRef();
  const imageRef = useRef();

  if (refLink.code == null) {
    getRefLink(user.id)
      .then((res) => {
        refLink.link = res.referral_link;
        refLink.code = res.referral_code;
        setReload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        refLink.code = "-";
        refLink.link = "-";
        setReload((prev) => !prev);
      });
  }

  function reloadPressed() {
    genRefLink(user.id)
      .then((res) => {
        refLink.link = res.referral_link;
        refLink.code = res.referral_code;
        setReload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        setReload((prev) => !prev);
      });
  }

  function editPressed() {
    var isError = false;

    if (enabled) {

      nameRef.current.childNodes[2].childNodes[0].innerHTML = "";
      cityRef.current.childNodes[2].childNodes[0].innerHTML = "";
      countryRef.current.childNodes[2].childNodes[0].innerHTML = "";
      dobRef.current.childNodes[2].childNodes[0].innerHTML = "";

      const nameInput = nameRef.current.childNodes[1].childNodes[0].value;
      const cityInput = cityRef.current.childNodes[1].childNodes[0].value;
      const countryInput = countryRef.current.childNodes[1].childNodes[0].value;
      const dobInput = dobRef.current.childNodes[1].childNodes[0].value;
      const imageInput = imageRef.current.files[0] ?? "";


      if (nameInput.trim() == "") {
        nameRef.current.childNodes[2].childNodes[0].innerHTML = "Required field";
        isError = true;
      }

      if (cityInput.trim() == "") {
        cityRef.current.childNodes[2].childNodes[0].innerHTML = "Required field";
        isError = true;
      }

      if (countryInput.trim() == "") {
        countryRef.current.childNodes[2].childNodes[0].innerHTML = "Required field";
        isError = true;
      }

      if (dobInput == "") {
        dobRef.current.childNodes[2].childNodes[0].innerHTML = "Required field";
        isError = true;
      }
      else {
        const [year] = dobInput.split("-");
        if (parseInt(year) < 1900) {
          dobRef.current.childNodes[2].childNodes[0].innerHTML = "Invalid date";
          isError = true;
        }
      }

      if (!isError) {
        editBtnRef.current.innerHTML = "Updating...";
        editBtnRef.current.disabled = true;

        var newData = {};
        var imgRemoved = false;
        // continue

        if (nameInput.trim() != user.name.trim())
          newData.name = nameInput;
        if (cityInput.trim() != user.city.trim())
          newData.city = cityInput;
        if (countryInput.trim() != user.country.trim())
          newData.country = countryInput;
        if (new Date(dobInput).toISOString() != user.dob)
          newData.dob = dobInput;
        if (imageInput != "")
          newData.image = imageInput;
        if (tempImg == profile)
          imgRemoved = true;
        

        editProfile(newData, imgRemoved)
          .then(() => {
            editBtnRef.current.innerHTML = "Edit";
            editBtnRef.current.disabled = false;
            setEnabled(false);
            setHeaderReload((prev) => !prev);
          })
          .catch((err) => {
            editBtnRef.current.innerHTML = "Edit";
            editBtnRef.current.disabled = false;
            typeof err === "string" ? setUpdateError(err) : setUpdateError(err.message);
            console.log(err);
          });
      }
    }
    else {
      editBtnRef.current.innerHTML = "Done";
      setEnabled(true);
    }

  }

  function onImageChange() {
    const imageInput = imageRef.current.files[0] ?? "";

    if (imageInput != "") {
      setTempImg(URL.createObjectURL(imageInput));
    }
  }

  function onImgRemove() {
    imageRef.current.value = "";
    setTempImg(profile);
  }


  return (
    <div id="profile">
      <div className="prof-column">
        <div id="pf-wrapper">
          <img src={tempImg} alt="model" id="blank_profile" />
          <div style={{display: enabled ? "flex" : "none"}}>
            <label htmlFor="image">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </label>
            <input ref={imageRef} id="image" type="file" onChange={onImageChange} />
            <svg onClick={onImgRemove} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z"/></svg>
          </div>
        </div>
        <table>
          <tbody>
            <tr ref={nameRef}>
              <td><label htmlFor="u-name">Name</label></td>
              <td><input type="text" id="u-name" defaultValue={user.name} disabled={!enabled} /></td>
              <td><span className="err-msg"></span></td>
            </tr>
            <tr ref={cityRef}>
              <td><label htmlFor="city">City</label></td>
              <td><input type="text" id="city" defaultValue={user.city} disabled={!enabled} /></td>
              <td><span className="err-msg"></span></td>
            </tr>
            <tr ref={countryRef}>
              <td><label htmlFor="country">Country</label></td>
              <td><input type="text" id="country" defaultValue={user.country} disabled={!enabled} /></td>
              <td><span className="err-msg"></span></td>
            </tr>
            <tr ref={dobRef}>
              <td><label htmlFor="country">Date of Birth</label></td>
              <td><input type="date" id="country" defaultValue={dateFormat(user.dob, "yyyy-mm-dd")} disabled={!enabled} /></td>
              <td><span className="err-msg"></span></td>
            </tr>
            <tr>
              <td><label htmlFor="j-date">Joining Date</label></td>
              <td><input type="text" id="j-date" defaultValue={dateFormat(user.date_joined, "d mmm, yyyy")} disabled={true} /></td>
            </tr>
            <tr>
              <td><label htmlFor="p-ref">People Referred</label></td>
              <td><input type="text" id="p-ref" defaultValue={user.people_referred?.length ?? 0} disabled={true} /></td>
            </tr>
            <tr>
              <td><label htmlFor="ref-link">Referral link</label></td>
              <td><input type="text" id="ref-link" defaultValue={refLink.link} disabled={true} /></td>
              <td>
                <button onClick={ () => navigator.clipboard.writeText(refLink.link) }>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z"/></svg>
                </button>
                <button onClick={ reloadPressed }>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-70q0-17 11.5-28.5T760-800q17 0 28.5 11.5T800-760v200q0 17-11.5 28.5T760-520H560q-17 0-28.5-11.5T520-560q0-17 11.5-28.5T560-600h128q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q68 0 124.5-34.5T692-367q8-14 22.5-19.5t29.5-.5q16 5 23 21t-1 30q-41 80-117 128t-169 48Z"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="prof-column">
        <button ref={editBtnRef} onClick={editPressed}>Edit</button>
        <span className="err-msg">{updateError}</span>
      </div>
    </div>
  );
}