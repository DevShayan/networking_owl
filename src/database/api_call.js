import { isEmptyObj } from "../constants/functions";
import { user } from "../pojos/user";

const baseURL = "http://localhost:8080";

export async function getUser() {
  const res = await fetch(`${baseURL}/user/get-user/${user.id}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  return jsonData.data;
  
}

export async function getRefLink() {
  const res = await fetch(`${baseURL}/ref-link/get-ref-code/${user.id}`);
  const jsonData = await res.json();
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function genRefLink() {
  const res = await fetch(`${baseURL}/ref-link/gen-ref-link/${user.id}`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function getTrees() {
  const res = await fetch(`${baseURL}/user/get-trees/${user.id}`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function register(reqBody, refCode) {
  if (refCode != null) {
    reqBody.ref_code = refCode;
  }

  const res = await fetch(`${baseURL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  });

  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  user.id = jsonData.data.id;
  user.name = reqBody.user.name;
  user.city = reqBody.user.city;
  user.date_joined = reqBody.user.date_joined;
  user.email = reqBody.user.email;
  user.dob = reqBody.user.dob;
  user.country = reqBody.user.country;
  user.phone_no = reqBody.user.ph_no;
  user.balance = 0;
  
  return jsonData.data;
}


export async function login(email, pass) {
  const res = await fetch(`${baseURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      pass: pass
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  user.id = jsonData.data._id;
  user.name = jsonData.data.name;
  user.city = jsonData.data.city;
  user.date_joined = jsonData.data.date_joined;
  user.email = jsonData.data.email;
  user.dob = jsonData.data.dob;
  user.country = jsonData.data.country;
  user.phone_no = jsonData.data.phone_no;
  user.balance = jsonData.data.balance;
  user.people_referred = jsonData.data.people_referred;
  user.image_link = jsonData.data.image_link ?? null;
  user.referred_by = jsonData.data.referred_by ?? null;
  
  return jsonData.data;
}


export async function getMembers() {
  const res = await fetch(`${baseURL}/user/get-people-referred/${user.id}`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    console.log(jsonData.error);
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function getTransactions() {
  const res = await fetch(`${baseURL}/transaction/get-trans/${user.id}`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function getPackages() {
  const res = await fetch(`${baseURL}/packs/get-packages`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function getBundles() {
  const res = await fetch(`${baseURL}/packs/get-bundles`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}


export async function resetPass(newPass, resetCode) {
  const res = await fetch(`${baseURL}/user/reset-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: resetCode,
      new_pass: newPass
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}


export async function buyPackage(pid) {
  const res = await fetch(`${baseURL}/transaction/buy-package`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: user.id,
      bid: pid
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}


export async function buyBundle(bid) {
  const res = await fetch(`${baseURL}/transaction/buy-bundle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: user.id,
      bid: bid
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}


export async function editProfile(newUserData, imgRemove) {
  const formData = new FormData();
  Object.keys(newUserData).forEach((key) => {
    formData.append(key, newUserData[key])
  });

  const res = await fetch(`${baseURL}/user/edit/${user.id}?remove_image=${imgRemove}`, {
    method: "POST",
    body: formData,
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  Object.assign(user, jsonData.data);
  
  return jsonData.data;
}

// TODO: implement
export async function logout() {
  const res = await fetch(`${baseURL}/user/get-trees/${user.id}`);
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  Object.keys(user).forEach((key) => {
    user[key] = null;
  });
  
  return jsonData.data;
}