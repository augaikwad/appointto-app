import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "../components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navigateTo } from "../store/reducers/navigationSlice";

class Sidebar_Old extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/editors", state: "editorsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas short-sidebar" id="sidebar">
        <ul className="nav">
          <li
            className={
              this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <FontAwesomeIcon className="fa-th-large menu-font-icon" />
              {/* <i className="fa fa-th-large menu-font-icon"></i> */}
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/patients") ? "nav-item active" : "nav-item"
            }
          >
            <Link
              className="nav-link"
              to={{ pathname: "/patients", state: { isInit: true } }}
            >
              {/* <img src={Queue} className="menu-icon" /> */}
              <i className="fa fa-users menu-font-icon"></i>
              <span className="menu-title">Patients</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/appointments")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/appointments">
              {/* <img src={Appointments} className="menu-icon" /> */}
              <i className="fa fa-calendar menu-font-icon"></i>
              <span className="menu-title">Appointments</span>
            </Link>
          </li>
          {/* <li
            className={
              this.isPathActive("/reports") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/widgets">
              <i className="fa fa-file-text menu-font-icon"></i>
              <span className="menu-title">Reports</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/labWork") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/widgets">
              <i className="mdi mdi-tooth menu-font-icon"></i>
              <span className="menu-title">Lab Work</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/inventory") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/widgets">
              <i className="fa fa-cubes menu-font-icon"></i>
              <span className="menu-title">Inventory</span>
            </Link>
          </li> */}
          <li
            className={
              this.isPathActive("/settings") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/settings">
              {/* <img src={Setting} className="menu-icon" /> */}
              <i className="fa fa-cog menu-font-icon"></i>
              <span className="menu-title">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

const Sidebar = () => {
  const dispatch = useDispatch();
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
              onClick={() => {
                dispatch(navigateTo(item.to));
              }}
            >
              {/* <Link className="nav-link" to={item.to}> */}
              <a className="nav-link">
                <FontAwesomeIcon className={`${item.icon} menu-font-icon`} />
                <span className="menu-title">{item.label}</span>
              </a>

              {/* </Link> */}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
