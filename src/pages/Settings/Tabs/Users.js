import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "../../../components/Modal";
import { FormProvider, useForm } from "react-hook-form";
import {
  SelectField,
  TextField,
  RadioField,
  DatePickerField,
} from "../../../components/Forms";
import { SettingsContext } from "../../../context/Settings";
import { DoctorContext } from "../../../context/Doctor";
import { createUseStyles } from "react-jss";
import moment from "moment";

const useStyles = createUseStyles({
  userSettingContainer: {},
  header: {
    display: "flex",
    "& > .title": {},
    "& > .actionButtons": {
      "& > button:not(:first-child)": {
        marginLeft: "20px",
      },
    },
  },
});

const getFormattedRequestForCreateDocUser = (data) => {
  let req = {};
  if (data && Object.keys(data).length) {
    const {
      first_name,
      last_name,
      gender,
      mobile_number,
      email_id,
      cunsultationFee,
      role,
      id_speciality,
      qualification,
      registration_number,
      dob,
      userRole,
      id_clinic,
    } = data;
    req = {
      first_name,
      last_name,
      gender,
      mobile_number,
      email_id,
      cunsultationFee,
      role,
      id_speciality,
      qualification,
      registration_number,
      id_clinic,
      dob: moment(new Date(dob)).format("YYYY-MM-DD"),
      role: userRole,
    };
  }
  return req;
};

const AddEditUser = () => {
  const [docState, docActions] = useContext(DoctorContext);

  const [state, actions] = useContext(SettingsContext);
  const { userRoles } = state;
  const { isAdd, open, step, formData } = state.addEditUserModal;
  const form = useForm({
    defaultValues: formData,
  });

  const { handleSubmit, watch, reset } = form;

  const [rolesOpt, setRolesOpt] = useState([]);
  const [lastStep, setLastStep] = useState(0);

  useEffect(() => {
    reset(formData);
  }, [formData]);

  const filteredUserRoles = {
    1: ["ADMIN", "VISITING DOCTOR"],
    2: ["ADMIN", "CASHIER", "RECEPTIONIST"],
  };

  useEffect(() => {
    const { userTypeId } = formData;
    if (userTypeId && !isNaN(userTypeId)) {
      const filterBy = filteredUserRoles[userTypeId];
      const filteredOpt = userRoles.filter((role) =>
        filterBy.includes(role.normalizedName)
      );
      setRolesOpt(filteredOpt);
      setLastStep(userTypeId === 2 ? 1 : 2);
    }
  }, [formData, userRoles]);

  const onSubmit = (data, e) => {
    const { name } = e.target;
    if (name === "NextBtn") {
      if (lastStep === 2 && step === 1) {
        actions.registerUser(data, () => {
          actions.getUsers();
          const nextFormData = {
            first_name: data.firstName,
            last_name: data.lastName,
            mobile_number: data.mobileNumber,
            email_id: data.emailId,
            role: data.userRole,
          };
          reset({ ...data, ...nextFormData });
        });
      }
      actions.setAddEditUserModal({ step: step + 1 });
    } else if (name === "SaveBtn") {
      if (lastStep === 1) {
        actions.registerUser(data, () => {
          actions.setAddEditUserModal({ open: false });
          actions.getUsers();
        });
      } else if (lastStep === 2) {
        let request = getFormattedRequestForCreateDocUser(data);
        actions.registerDoctor(request, () => {
          actions.setAddEditUserModal({ open: false });
          actions.getUsers();
        });
      }
    }
  };

  useEffect(() => {
    actions.getUsers();
    actions.getUserRoles();
    docActions.getSpeciality();
  }, []);

  const FooterActions = () => {
    return (
      <>
        {lastStep !== step && (
          <Button
            className="btn btn-sm btn-primary"
            type="button"
            name="NextBtn"
            onClick={handleSubmit(onSubmit)}
          >
            Next
          </Button>
        )}

        {lastStep === step && (
          <Button
            className="btn btn-sm btn-primary"
            type="submit"
            name="SaveBtn"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        )}
      </>
    );
  };

  return (
    <Modal
      title={`${isAdd ? "Add" : "Update"} User`}
      show={open}
      size="md"
      onHide={() => {
        actions.setAddEditUserModal({ open: false });
      }}
      footerActions={<FooterActions />}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <Row>
              <Col lg="12">
                <SelectField
                  label="Select User Role"
                  name="userRole"
                  labelField="name"
                  valueField="name"
                  options={rolesOpt}
                  rules={{
                    required: true,
                  }}
                />
              </Col>
            </Row>
          )}
          {step === 1 && (
            <Row>
              <Col lg="12">
                <TextField
                  label="First Name"
                  name="firstName"
                  rules={{
                    required: "First Name Required",
                  }}
                />
              </Col>
              <Col lg="12">
                <TextField
                  label="Last Name"
                  name="lastName"
                  rules={{
                    required: "Last Name Required",
                  }}
                />
              </Col>
              <Col lg="12">
                <TextField
                  type="number"
                  label="Mobile Number"
                  name="mobileNumber"
                  rules={{
                    required: "Mobile Number Required",
                  }}
                />
              </Col>
              <Col lg="12">
                <TextField
                  label="Email"
                  name="emailId"
                  type="email"
                  rules={{
                    required: "Email Required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Please enter email in correct format",
                    },
                  }}
                />
              </Col>
              <Col lg="12">
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  rules={{
                    required: "Password Required",
                  }}
                />
              </Col>
              <Col lg="12">
                <TextField
                  label="Confirm Password"
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
              </Col>
            </Row>
          )}
          {step === 2 && (
            <Row>
              <Col lg={6}>
                <TextField
                  label="First Name"
                  name="first_name"
                  readOnly={true}
                  rules={{
                    required: "Please Enter First Name",
                  }}
                />
              </Col>
              <Col lg={6}>
                <TextField
                  label="Last Name"
                  name="last_name"
                  readOnly={true}
                  rules={{
                    required: "Please Enter Last Name",
                  }}
                />
              </Col>
              <Col lg={6}>
                <RadioField
                  label="Gender"
                  name="gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    // { label: "Other", value: "other" },
                  ]}
                />
              </Col>
              <Col lg={6}>
                <DatePickerField
                  label="Date of Birth"
                  name="dob"
                  portalId="root-portal"
                  rules={{
                    required: "Please Enter Date of Birth",
                  }}
                />
              </Col>
              <Col lg={6}>
                <TextField
                  label="Email"
                  name="email_id"
                  readOnly={true}
                  rules={{
                    required: "Please Enter Email",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Please enter email in correct format",
                    },
                  }}
                />
              </Col>
              <Col lg={6}>
                <TextField
                  label="Mobile Number"
                  name="mobile_number"
                  readOnly={true}
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
              </Col>
              <Col lg={6}>
                <TextField
                  label="Qualification"
                  name="qualification"
                  rules={{
                    required: "Please Enter Qualification",
                  }}
                />
              </Col>
              <Col lg={6}>
                <SelectField
                  label="Speciality"
                  name="id_speciality"
                  labelField="specialityName"
                  valueField="idSpeciality"
                  options={docState.speciality}
                  rules={{
                    required: "Please select Speciality",
                  }}
                />
              </Col>
              <Col lg={6}>
                <TextField
                  label="Registration Number"
                  name="registration_number"
                  rules={{
                    required: "Please enter Registration Number",
                  }}
                />
              </Col>
              <Col lg={6}>
                <TextField
                  label="Consultation Fees"
                  name="cunsultationFee"
                  type="number"
                  placeholder="Enter Consultation Fees"
                />
              </Col>
            </Row>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};

const Users = () => {
  const classes = useStyles();

  const [state, actions] = useContext(SettingsContext);
  const { formData } = state.addEditUserModal;

  const handleButtonClick = (userTypeId) => {
    actions.setAddEditUserModal({
      open: true,
      formData: { ...formData, userTypeId: userTypeId },
    });
  };

  return (
    <div className={classes.userSettingContainer}>
      <AddEditUser />
      <div className={classes.header}>
        <div className="title"></div>
        <div className="actionButtons">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => {
              handleButtonClick(1);
            }}
          >
            Add Doctor
          </button>

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => {
              handleButtonClick(2);
            }}
          >
            Add Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
