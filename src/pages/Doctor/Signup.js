import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LogoLarge from "../../assets/images/logo-large.svg";
import { useForm } from "react-hook-form";
import TextField from "../../components/Forms/TextField";
import { Button } from "react-bootstrap";
import { DoctorContext } from "../../context/Doctor";

function Register(props) {
  const history = useHistory();

  const [states, actions] = useContext(DoctorContext);
  const { otpData, verifyOTPData } = states;

  useEffect(() => {
    if (otpData === null && verifyOTPData === null) {
      history.push("/login");
    }
  }, [otpData, verifyOTPData]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    let req = { ...formData };
    req = {
      ...req,
      mobileNumber: otpData.mobile_no,
      countryCode: otpData.country_code,
      termsAccepted: req.termsAccepted ? 1 : 0,
      registrationToken: verifyOTPData.registration_token,
    };

    actions.signupUser(req);
  };

  return (
    <div>
      <div className="d-flex align-items-stretch auth auth-img-bg h-100">
        <div className="row flex-grow">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="auth-form-transparent text-left p-3">
              <div className="brand-logo">
                <img src={LogoLarge} alt="logo" />
              </div>
              <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="First Name"
                  name="firstName"
                  register={register}
                  required={true}
                  rules={{
                    required: "First Name Required",
                  }}
                  error={errors?.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  register={register}
                  required={true}
                  rules={{
                    required: "Last Name Required",
                  }}
                  error={errors?.lastName}
                />
                <TextField
                  label="Email"
                  name="emailId"
                  type="email"
                  register={register}
                  required={true}
                  rules={{
                    required: "Email Required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Please enter email in correct format",
                    },
                  }}
                  error={errors?.emailId}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  required={true}
                  rules={{
                    required: "Password Required",
                  }}
                  error={errors?.password}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  register={register}
                  required={true}
                  rules={{
                    required: "Confirm Password Required",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  }}
                  error={errors?.confirmPassword}
                />

                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        className="form-check-input"
                        {...register("termsAccepted")}
                      />
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="my-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg"
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => history.push("/login")}>
                    Login
                  </Button>
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

export default Register;
