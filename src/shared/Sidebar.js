import React from "react";
import { withRouter, useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "../components";

const Sidebar = () => {
  const location = useLocation();
  const sidebarItems = [
    {
      to: { pathname: "/dashboard", state: { isInit: true } },
      icon: "fa-th-large",
      label: "Dashboard",
    },
    {
      to: { pathname: "/patients", state: { isInit: true } },
      icon: "fa-users",
      label: "Patients",
    },
    {
      to: { pathname: "/appointments", state: { isInit: true } },
      icon: "fa-calendar",
      label: "Appointments",
    },
    {
      to: { pathname: "/reports", state: { isInit: true } },
      icon: "fa-file-text",
      label: "Reports",
      isHidden: true,
    },
    {
      to: { pathname: "/settings", state: { isInit: true } },
      icon: "fa-cog",
      label: "Settings",
    },
  ];

  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sidebar sidebar-offcanvas short-sidebar" id="sidebar">
      <ul className="nav">
        {sidebarItems.map((item) => {
          return (
            <li
              key={item.label}
              className={`nav-item ${
                isPathActive(item.to.pathname) ? "active" : ""
              } ${item?.isHidden ? "hide" : ""}`}
            >
              <NavLink className="nav-link" to={item.to}>
                <FontAwesomeIcon className={`${item.icon} menu-font-icon`} />
                <span className="menu-title">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
