import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Router.jsx';
import { getUser } from './database/api_call.js';
import { user } from './pojos/user.js';

// fetch data before rendering UI
// if (user.name == null) {
//   try {
//     const resUser = await getUser("669f72cf12c3b206963ffe76");
//     user.id = resUser._id;
//     user.name = resUser.name;
//     user.image_link = resUser.image_link ?? null;
//     user.city = resUser.city;
//     user.date_joined = resUser.date_joined;
//     user.email = resUser.email;
//     user.curr_package = resUser.curr_package;
//     user.dob = resUser.dob;
//     user.country = resUser.country;
//     user.phone_no = resUser.phone_no;
//     user.balance = resUser.balance;
//     user.people_referred = resUser.people_referred;
//   }
//   catch (error) {
//     console.log(error);
//   }
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
