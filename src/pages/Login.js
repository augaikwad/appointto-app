import React from "react";
import { Link } from "react-router-dom";

import LogoLarge from "../assets/images/logo-large.svg";

import PasswordField from "../components/Forms/PasswordField";

function Login(props) {
  return (
    <div>
      <div className="d-flex align-items-stretch auth auth-img-bg h-100">
        <div className="row flex-grow">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="auth-form-transparent text-left p-3">
              <div className="brand-logo">
                <img src={LogoLarge} alt="logo" />
              </div>
              <form className="pt-3">
                {/* <PasswordField label="test" /> */}
                <div className="form-group">
                  <label>Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="ti-user text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-lg border-left-0"
                      id="exampleInputEmail"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                      <span className="input-group-text bg-transparent border-right-0">
                        <i className="ti-lock text-primary"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control form-control-lg border-left-0"
                      id="exampleInputPassword"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-black"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="my-3">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    to="/dashboard"
                  >
                    LOGIN
                  </Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  <Link to="/otpConfirmation" className="text-primary">
                    <b>Register now for Free</b>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 login-half-bg d-flex flex-row"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
