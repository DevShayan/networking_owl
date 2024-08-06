import { bundles } from "../pojos/bundles";
import { members } from "../pojos/members";
import { transactions } from "../pojos/transactions";
import { trees } from "../pojos/trees";
import { user } from "../pojos/user";

const baseURL = "https://localhost:8080";

export async function getCurrUser() {
  const res = await fetch(`${baseURL}/user/get-curr-user`, {
    credentials: "include",
  });

  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  user.id = jsonData.data.user._id;
  delete jsonData.data.user._id;
  Object.assign(user, jsonData.data.user);
  jsonData.data.user._id = user.id;

  user.type = jsonData.data.type;

  return jsonData.data.user;
  
}

export async function getUser(uid) {
  const res = await fetch(`${baseURL}/admin/get-user/${uid}`, {
    credentials: "include",
  });

  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  return jsonData.data;
  
}

export async function getRefLink() {
  const res = await fetch(`${baseURL}/ref-link/get-ref-link/${user.id}`, {
    credentials: "include",
  });
  const jsonData = await res.json();
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function genRefLink() {
  const res = await fetch(`${baseURL}/ref-link/gen-ref-link/${user.id}`, {
    credentials: "include",
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function getTrees() {
  const res = await fetch(`${baseURL}/user/get-trees/${user.id}`, {
    credentials: "include",
  });
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
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  });

  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  Object.assign(user, jsonData.data)
  
  return jsonData.data;
}


export async function login(email, pass, isAdmin) {
  const res = await fetch(`${baseURL}/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      pass: pass,
      is_admin: isAdmin
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  user.id = jsonData.data.user._id;
  delete jsonData.data.user._id;
  Object.assign(user, jsonData.data.user);
  user.type = jsonData.data.type;
  jsonData.data.user._id = user.id;

  bundles.list = null;
  
  return jsonData.data.user;
}


export async function getMembers() {
  const res = await fetch(`${baseURL}/user/get-people-referred/${user.id}`, {
    credentials: "include",
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    console.log(jsonData.error);
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}

export async function getTransactions() {
  const res = await fetch(`${baseURL}/transaction/get-trans/${user.id}`, {
    credentials: "include",
  });
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
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: user.id,
      pid: pid
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  await getCurrUser();
  transactions.list = await getTransactions();
  
  return jsonData.data;
}


export async function buyBundle(bid) {
  const res = await fetch(`${baseURL}/transaction/buy-bundle`, {
    method: "POST",
    credentials: "include",
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

  await getCurrUser();
  transactions.list = await getTransactions();
  
  return jsonData.data;
}


export async function editProfile(newUserData, imgRemove) {
  const formData = new FormData();
  Object.keys(newUserData).forEach((key) => {
    formData.append(key, newUserData[key])
  });

  const res = await fetch(`${baseURL}/user/edit/${user.id}?remove_image=${imgRemove}`, {
    method: "POST",
    credentials: "include",
    body: formData
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  Object.assign(user, jsonData.data);
  
  return jsonData.data;
}


export async function logout() {
  const res = await fetch(`${baseURL}/user/logout`, {
    credentials: "include",
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }

  Object.keys(user).forEach((key) => user[key] = null);
  members.list = null;
  transactions.list = null;
  trees.list = null;
  
  return jsonData.data;
}

export async function modifyBalance(uid, amount) {
  const res = await fetch(`${baseURL}/admin/mod-balance`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid: uid,
      amount: amount
    })
  });
  const jsonData = await res.json();
  
  if (jsonData.error != null) {
    throw new Error(jsonData.error);
  }
  
  return jsonData.data;
}
