import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { MdHome, MdBarChart, MdPerson } from "react-icons/md"; // Importing necessary icons

export function SidebarLinks(props) {
  let location = useLocation();
  const { routes, userRole } = props;

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      // Check userRole to conditionally render routes
      if (
        (userRole === "admin" && ["dashboard", "contests"].includes(route.path)) ||
        (userRole === "superadmin" && ["default", "admins", "contests"].includes(route.path))
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8" key={index}>
                <span className={`${
                  activeRoute(route.path) === true
                    ? "font-bold text-brand-500 dark:text-white"
                    : "font-medium text-gray-600"
                }`}>
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p className={`leading-1 ml-4 flex ${
                  activeRoute(route.path) === true
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}>
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      } else {
        return null; // Return null for routes not matching the user's role
      }
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;
