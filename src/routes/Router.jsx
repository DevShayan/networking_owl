import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RouterError from "../pages/RouterError";
import Bundles from "../pages/Bundles";
import About from "../pages/About";
import Packages from "../pages/Packages";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmEmail from "../pages/ConfirmEmail";
import ResetPass from "../pages/ResetPass";
import Deposit from "../pages/Deposit";
import Withdraw from "../pages/Withdraw";
import UserProtected from "../pages/UserProtected";
import AdminProtected from "../pages/AdminProtected";
import OrderConfirm from "../pages/OrderConfirm";

import Profile from "../components/Profile";
import Tree from "../components/Tree";
import Members from "../components/Members";
import Wallet from "../components/Wallet";
import BalanceMod from "../components/BalanceMod";
import BundlesBought from "../components/BundlesBought";
import PackOrderConfirm from "../pages/PackOrderConfirm";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <RouterError/>
  },
  {
    path: "/bundles",
    element: <Bundles/>,
    errorElement: <RouterError/>
  },
  {
    path: "/packages",
    element: <Packages/>,
    errorElement: <RouterError/>
  },
  {
    path: "/contact",
    element: <Contact/>,
    errorElement: <RouterError/>
  },
  {
    path: "/about",
    element: <About/>,
    errorElement: <RouterError/>
  },
  {
    path: "/dashboard",
    element: <UserProtected ProtectedPage={Dashboard} />,
    errorElement: <RouterError/>,
    children: [
      {
        path: "profile",
        element: <Profile/>,
        errorElement: <RouterError/>
      },
      {
        path: "tree",
        element: <Tree/>,
        errorElement: <RouterError/>
      },
      {
        path: "members",
        element: <Members/>,
        errorElement: <RouterError/>
      },
      {
        path: "wallet",
        element: <Wallet/>,
        errorElement: <RouterError/>
      },
      {
        path: "bundles-bought",
        element: <BundlesBought/>,
        errorElement: <RouterError/>
      },
    ]
  },
  {
    path: "/admin-dashboard",
    element: <AdminProtected ProtectedPage={AdminDashboard} />,
    errorElement: <RouterError/>,
    children: [
      {
        path: "balance-mod",
        element: <BalanceMod/>,
        errorElement: <RouterError/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <RouterError/>
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement: <RouterError/>
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmail/>,
    errorElement: <RouterError/>
  },
  {
    path: "/reset-pass",
    element: <ResetPass/>,
    errorElement: <RouterError/>
  },
  {
    path: "/deposit",
    element: <UserProtected ProtectedPage={Deposit} />,
    errorElement: <RouterError/>
  },
  {
    path: "/withdraw",
    element: <UserProtected ProtectedPage={Withdraw} />,
    errorElement: <RouterError/>
  },
  {
    path: "/order-conf",
    element: <UserProtected ProtectedPage={OrderConfirm} />,
    errorElement: <RouterError/>
  },
  {
    path: "/pack-order-conf",
    element: <UserProtected ProtectedPage={PackOrderConfirm} />,
    errorElement: <RouterError/>
  }
]);

export default router;