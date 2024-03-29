import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import LogoLarge from "../../assets/images/logo-large.svg";

import { DoctorContext } from "../../context/Doctor";
import TextFieldWithIcon from "../../components/Forms/TextFieldWithIcon";
import TextField from "../../components/Forms/TextField";

function MobileOTP(props) {
  const [states, actions] = useContext(DoctorContext);
  const { otpData } = states;

  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    let req = { ...data };
    if (otpData === null) {
      actions.getOTP({ ...req, country_code: "91" });
    } else {
      actions.verifyOTP({ ...req, ...otpData });
    }
  };

  const resendOTP = () => {
    let formValues = getValues();
    const req = {
      mobile_no: formValues.mobile_no,
      country_code: "91",
      req_token: otpData.req_token,
    };
    actions.resendOTP(req);
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
              <FormProvider {...form}>
                <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                  {otpData === null && (
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
                        className="btn btn-block btn-primary btn-lg"
                        type="submit"
                      >
                        Send OTP
                      </Button>
                    </>
                  )}
                  {!!otpData && (
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
                      <div className="my-2 d-flex justify-content-between align-items-center">
                        Didn't receive OTP?{" "}
                        <Button variant="link" onClick={() => resendOTP()}>
                          Resend OTP
                        </Button>
                      </div>
                      <Button
                        className="btn btn-block btn-primary btn-lg"
                        type="submit"
                      >
                        Verify
                      </Button>
                    </>
                  )}
                </form>
              </FormProvider>
            </div>
          </div>
          <div className="col-lg-6 login-half-bg d-flex flex-row"></div>
        </div>
      </div>
    </div>
  );
}

export default MobileOTP;
