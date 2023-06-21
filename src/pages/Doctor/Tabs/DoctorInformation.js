import React, { useContext, useEffect } from "react";
import TextField from "../../../components/Forms/TextField";
import RadioField from "../../../components/Forms/RadioField";
import { DatePickerField } from "../../../components/Forms";
import SelectField from "../../../components/Forms/SelectField";
import { Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import { DoctorContext } from "../../../context/Doctor";
import moment from "moment";

const DoctorInformation = () => {
  const [states, actions] = useContext(DoctorContext);
  const { registrationActiveTab, speciality, qualifications, signupUserData } =
    states;

  useEffect(() => {
    if (speciality.length === 0) {
      actions.getSpeciality();
    }
    if (qualifications.length === 0) {
      actions.getQualifications();
    }
  }, [speciality, qualifications]);

  const form = useForm({
    defaultValues: {
      gender: "male",
      role: "Admin",
      cunsultationFee: null,
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    let resetForm = { ...getValues() };
    if (signupUserData !== null) {
      resetForm.first_name = signupUserData.firstName;
      resetForm.last_name = signupUserData.lastName;
      resetForm.email_id = signupUserData.emailId;
      resetForm.mobile_number = signupUserData.mobileNumber;
    }
    reset(resetForm);
  }, []);

  const onSubmit = (data) => {
    const formData = { ...data };
    formData.dob = moment(new Date(data.dob)).format("YYYY-MM-DD");
    formData.id_speciality = parseInt(data.id_speciality);
    formData.cunsultationFee =
      data.cunsultationFee === null ? null : parseInt(data.cunsultationFee);
    formData.id_doctor = 0;
    formData.userId = "";

    const callback = () => {
      actions.setRegistrationActiveTab(registrationActiveTab + 1);
    };

    actions.updateDoctorInfo(formData, callback);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-4">
            <TextField
              label="First Name"
              name="first_name"
              rules={{
                required: "Please Enter First Name",
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Last Name"
              name="last_name"
              rules={{
                required: "Please Enter Last Name",
              }}
            />
          </div>
          <div className="col-lg-4">
            <RadioField
              label="Gender"
              name="gender"
              register={register}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
          </div>
          <div className="col-lg-4">
            <DatePickerField
              label="Date of Birth"
              name="dob"
              rules={{
                required: "Please Enter Date of Birth",
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Email"
              name="email_id"
              rules={{
                required: "Please Enter Email",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Please enter email in correct format",
                },
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Mobile Number"
              name="mobile_number"
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
          </div>
          <div className="col-lg-4">
            <TextField
              label="Qualification"
              name="qualification"
              rules={{
                required: "Please Enter Qualification",
              }}
            />
          </div>
          {/* <div className="col-lg-4">
            <SelectField
              label="Qualification"
              name="qualification"
              labelField="education"
              valueField="education"
              options={qualifications}
              rules={{
                required: "Please select Qualification",
              }}
            />
          </div> */}
          {/* <div className="col-lg-4">
            <TextField
              label="Passing Year"
              name="passing_year"
              type="number"
              placeholder="yyyy"
            />
          </div> */}
          <div className="col-lg-4">
            <SelectField
              label="Speciality"
              name="id_speciality"
              labelField="specialityName"
              valueField="idSpeciality"
              options={speciality}
              rules={{
                required: "Please select Speciality",
              }}
            />
          </div>
          {/* <div className="col-lg-4">
            <Form.Group>
              <label style={{ marginBottom: 0 }}>Certificate</label>
              <div className="custom-file">
                <Form.Control
                  type="file"
                  className="form-control visibility-hidden"
                  id="customFileLang"
                  lang="es"
                />
                <label className="custom-file-label" htmlFor="customFileLang">
                  Upload image
                </label>
              </div>
            </Form.Group>
          </div>*/}
          <div className="col-lg-4">
            <TextField
              label="Registration Number"
              name="registration_number"
              rules={{
                required: "Please enter Registration Number",
              }}
            />
          </div>
          <div className="col-lg-4">
            <SelectField
              label="Role"
              name="role"
              options={[
                { label: "Admin", value: "Admin" },
                { label: "Visiting Doctor", value: "Visitor" },
              ]}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Consultation Fees"
              name="cunsultationFee"
              type="number"
              placeholder="Enter Consultation Fees"
            />
          </div>
          <div className="col-lg-12 clearfix">
            <div className="float-right">
              <Button className="btn btn-sm btn-primary" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default DoctorInformation;
