import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";

import LogoLarge from "../assets/images/logo-large.svg";
import LogoMini from "../assets/images/logo-mini.svg";

function Navbar(props) {
  let { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (pathname === "/registration") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [pathname]);

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo mr-5" to="/">
          <img src={LogoLarge} className="mr-2" alt="logo" />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/">
          <img src={LogoMini} alt="logo" />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-end">
        {isLoggedIn ? (
          <>
            {/* <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="ti-layout-grid2"></span>
          </button> */}
            <ul className="navbar-nav nav-middle-section mr-lg-2">
              <li className="nav-item nav-search d-none d-lg-block">
                <NavbarSearch />
              </li>
            </ul>

            <ul className="navbar-nav nav-actions navbar-nav-right">
              <li className="nav-item nav-reminder">
                <Dropdown alignRight>
                  <Dropdown.Toggle className="nav-link count-indicator">
                    <i className="ti-bell"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="preview-list navbar-dropdown">
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="d-flex align-items-center">
                        <span className="pl-2">No Reminders Found</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="nav-item nav-profile">
                <Dropdown alignRight>
                  <Dropdown.Toggle className="nav-link count-indicator">
                    <i className="ti-user"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="preview-list navbar-dropdown">
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="d-flex align-items-center">
                        <i className="ti-settings text-primary"></i>
                        <span className="pl-2">Settings</span>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="dropdown-item preview-item"
                      onClick={(evt) => evt.preventDefault()}
                    >
                      <div className="d-flex align-items-center">
                        <i className="ti-power-off text-primary"></i>
                        <span className="pl-2">Logout</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="navbar-nav nav-actions navbar-nav-right">
              <li className="nav-item nav-login">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
