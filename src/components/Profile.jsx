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
            <label htmlFor="image"><span className="material-symbols-rounded">edit</span></label>
            <input ref={imageRef} id="image" type="file" onChange={onImageChange} />
            <span className="material-symbols-rounded" onClick={onImgRemove}>remove</span>
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
                  <span className="material-symbols-rounded tooltip">content_copy</span>
                </button>
                <button onClick={ reloadPressed }>
                  <span className="material-symbols-rounded tooltip">refresh</span>
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