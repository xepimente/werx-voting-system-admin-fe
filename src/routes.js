import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import RestaurantLists from "components/restaurant/RestaurantLists";
import AdminLists from "components/admins/AdminLists";
import Admindashboard from "views/users/default/Admindashboard";
import Settings from "views/users/default/Settings";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "Voting",
  //   layout: "/admin",
  //   path: "contestants",
  //   icon:  <MdBarChart className="h-6 w-6" />,
  //   component: <RestaurantLists />,
  // },
  {
    name: "Contests",
    layout: "/admin",
    path: "contests",
    icon:  <MdBarChart className="h-6 w-6" />,
    component: <Settings />,
  },
  {
    name: "User Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon:  <MdHome className="h-6 w-6" />,
    component: <Admindashboard />,
  },
  {
    name: "Admins",
    layout: "/admin",
    path: "admins",
    icon:  <MdPerson className="h-6 w-6" />,
    component: <AdminLists />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
