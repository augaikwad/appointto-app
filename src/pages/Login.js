import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoginLayout from "../shared/LoginLayout";
import { Modal } from "../components";
import { useForm, FormProvider } from "react-hook-form";
import { TextField, TextFieldWithIcon } from "../components/Forms";
import { AuthContext } from "../context/Auth";
import { DoctorContext } from "../context/Doctor";
import { login } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsByClinicId } from "../store/actions/userActions";
import { navigateTo } from "../store/reducers/navigationSlice";

const ForgotPasswordModal = ({ show = false, onHide = () => {}, setShow }) => {
  const [state, actions] = useContext(DoctorContext);
  const { forgetPasswordStep, otpData, verifyOTPData } = state;
  const form = useForm({
    defaultValues: {
      mobile_no: "",
    },
  });
  const { handleSubmit, getValues, watch, reset } = form;

  const onSubmit = (data) => {
    let req = { ...data };
    if (forgetPasswordStep === 1) {
      actions.getOTPForResetPassword({
        ...req,
        country_code: "91",
        otp_for: 2,
      });
    } else {
      let otpDataObj = { ...otpData };
      otpDataObj.otp_for = 2;
      actions.verifyOTP({ ...req, ...otpDataObj });
    }
  };

  const resendOTP = () => {
    let formValues = getValues();
    const req = {
      mobile_no: formValues.mobile_no,
      country_code: "91",
      req_token: otpData.req_token,
      otp_for: 2,
    };
    actions.resendOTP(req);
  };

  const changePassword = () => {
    let formValues = getValues();

    const req = {
      mobileNumber: formValues.mobile_no,
      countryCode: "91",
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      reset_password_token: verifyOTPData.reset_password_token,
    };

    actions.resetPassword(req, () => {
      reset({ mobile_no: "" });
      actions.resetOTPData();
      onHide();
    });
  };

  return (
    <Modal
      title="Forgot Password"
      show={show}
      onHide={() => {
        reset({ mobile_no: "" });
        actions.resetOTPData();
        onHide();
      }}
      size="sm"
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {forgetPasswordStep === 1 && (
            <>
              <TextFieldWithIcon
                label="Mobile Number"
                name="mobile_no"
                type="number"
                placeholder="Enter 10 Digit Mobile Number"
                rules={{
                  required: "Please enter 10 digit mobile number",
                  minLength: {
                    value: 10,
                    message: "Please enter correct Mobile Number",
                  },
                  maxLength: {
                    value: 10,
                    message: "Please enter correct Mobile Number",
                  },
                }}
              />
              <Button
                className="btn btn-block btn-primary btn-sm"
                type="submit"
              >
                Send OTP
              </Button>
            </>
          )}
          {forgetPasswordStep === 2 && (
            <>
              <TextField
                label="An OTP has been sent on your mobile number"
                name="otp"
                type="number"
                rules={{
                  required: "Please Enter OTP",
                  minLength: {
                    value: 6,
                    message: "Please enter correct OTP",
                  },
                  maxLength: {
                    value: 6,
                    message: "Please enter correct OTP",
                  },
                }}
              />
              <div className="mb-2 d-flex justify-content-between align-items-center">
                Didn't receive OTP?{" "}
                <Button
                  variant="link"
                  className="btn-sm"
                  onClick={() => resendOTP()}
                >
                  Resend OTP
                </Button>
              </div>
              <Button
                className="btn btn-block btn-primary btn-sm"
                type="submit"
              >
                Verify
              </Button>
            </>
          )}
          {forgetPasswordStep === 3 && (
            <>
              <TextField
                label="New Password"
                name="password"
                type="password"
                rules={{
                  required: "Password Required",
                }}
              />
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                rules={{
                  required: "Confirm Password Required",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do not match";
                    }
                  },
                }}
              />
              <Button
                className="btn btn-block btn-primary btn-sm"
                onClick={() => changePassword()}
              >
                Change Password
              </Button>
            </>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};

function Login(props) {
  const dispatch = useDispatch();
  const [, docActions] = useContext(DoctorContext);

  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);

  const form = useForm();
  const { handleSubmit, register } = form;

  const onSubmit = (formData) => {
    dispatch(
      login(formData, (res) => {
        const { id_clinic, id_doctor } = res;
        dispatch(
          getDoctorsByClinicId({ id_clinic }, id_doctor, () => {
            dispatch(navigateTo("/dashboard"));
          })
        );
      })
    );
  };

  return (
    <LoginLayout>
      <ForgotPasswordModal
        show={isForgotPassModalOpen}
        setShow={(val) => setIsForgotPassModalOpen(val)}
        onHide={() => setIsForgotPassModalOpen(false)}
      />
      <FormProvider {...form}>
        <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
          <TextFieldWithIcon
            label="Username"
            name="login_id"
            icon="ti-user"
            placeholder="Enter Email or Mobile Number"
            rules={{
              required: "Please enter Email or Mobile Number",
              validate: {
                isValidUserName: (value) => {
                  if (
                    value.match(/^[0-9]{10}$/g) ||
                    value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
                  ) {
                    return true;
                  } else {
                    return "Please Enter Correct Username";
                  }
                },
              },
            }}
          />
          <TextFieldWithIcon
            label="Password"
            name="password"
            type="password"
            icon="ti-lock"
            placeholder="Enter Password"
            rules={{
              required: "Please enter Password",
            }}
          />
          <div className="my-2 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <label className="form-check-label text-muted">
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...register("keepMeSignIn")}
                />
                <i className="input-helper"></i>
                Keep me signed in
              </label>
            </div>
            <Button
              onClick={() => {
                docActions.resetOTPData();
                setIsForgotPassModalOpen(true);
              }}
              variant="link"
              className="auth-link text-black p-0"
            >
              Forgot password?
            </Button>
          </div>
          <div className="my-3">
            <Button className="btn btn-block btn-primary btn-lg" type="submit">
              LOGIN
            </Button>
          </div>
          <div className="text-center mt-4 font-weight-light">
            <Link
              to="/otpConfirmation"
              className="text-primary"
              onClick={() => {
                docActions.resetOTPData();
              }}
            >
              <b>Register now for Free</b>
            </Link>
          </div>
        </form>
      </FormProvider>
    </LoginLayout>
  );
}

export default Login;
