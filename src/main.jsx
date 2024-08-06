import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Router.jsx';
import { getCurrUser } from './database/api_call.js';
import { user } from './pojos/user.js';

// fetch user before rendering UI
if (user.name == null) {
  try {
    await getCurrUser();
  }
  catch (error) {
    console.log(error);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
