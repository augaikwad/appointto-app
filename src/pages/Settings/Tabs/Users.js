import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "../../../components/Modal";
import { FormProvider, useForm } from "react-hook-form";
import {
  SelectField,
  TextField,
  RadioField,
  DatePickerField,
} from "../../../components/Forms";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUserRoles,
  registerUser,
  registerDoctor,
} from "../../../store/actions/settingActions";
import { setAddEditUserModal } from "../../../store/reducers/settingSlice";
import { getSpeciality } from "../../../store/actions/doctorActions";
import { getDoctorsByClinicId } from "../../../store/actions/userActions";

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
      UserId,
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
      UserId,
    };
  }
  return req;
};

const AddEditUser = () => {
  const dispatch = useDispatch();

  const { id_clinic } = useSelector((state) => state.user.details);
  const { userRoles, addEditUserModal } = useSelector(
    (state) => state.settings
  );
  const { formData, isAdd, open, step } = addEditUserModal;

  const { speciality } = useSelector((state) => state.doctors);

  const form = useForm({
    defaultValues: formData,
  });

  const { handleSubmit, watch, reset, setValue } = form;

  const [rolesOpt, setRolesOpt] = useState([]);
  const [lastStep, setLastStep] = useState(0);

  useEffect(() => {
    reset(formData);
  }, [formData]);

  const filteredUserRoles = {
    1: ["ADMIN", "VISITING DOCTOR"],
    2: ["ADMIN", "CASHIER", "RECEPTIONIST"],
  };

  const setDefault = (userTypeId) => {
    const findBy = userTypeId === 1 ? "VISITING DOCTOR" : "RECEPTIONIST";
    const defaultValue = userRoles.find(
      (item) => item.normalizedName === findBy
    );
    setValue("userRole", defaultValue.name);
  };

  useEffect(() => {
    const { userTypeId } = formData;
    if (userTypeId && !isNaN(userTypeId)) {
      const filterBy = filteredUserRoles[userTypeId];
      const filteredOpt = userRoles.filter((role) =>
        filterBy.includes(role.normalizedName)
      );
      setDefault(userTypeId);

      setRolesOpt(filteredOpt);
      setLastStep(userTypeId === 2 ? 1 : 2);
    }
  }, [formData, userRoles]);

  const onSubmit = (data, e) => {
    const { name } = e.target;
    if (name === "NextBtn") {
      if (lastStep === 2 && step === 1) {
        dispatch(
          registerUser({ ...data, id_clinic: id_clinic }, (res) => {
            dispatch(getUsers(id_clinic));
            const nextFormData = {
              first_name: data.firstName,
              last_name: data.lastName,
              mobile_number: data.mobileNumber,
              email_id: data.emailId,
              role: data.userRole,
              UserId: res.id_user,
            };
            reset({ ...data, ...nextFormData });
          })
        );
      }
      dispatch(
        setAddEditUserModal({
          ...addEditUserModal,
          step: step + 1,
        })
      );
    } else if (name === "SaveBtn") {
      if (lastStep === 1) {
        dispatch(
          registerUser({ ...data, id_clinic: id_clinic }, () => {
            dispatch(setAddEditUserModal({ open: false }));
            dispatch(getUsers(id_clinic));
          })
        );
      } else if (lastStep === 2) {
        let request = getFormattedRequestForCreateDocUser({
          ...data,
          id_clinic,
        });
        dispatch(
          registerDoctor(request, () => {
            dispatch(setAddEditUserModal({ open: false }));
            dispatch(getUsers(id_clinic));
            dispatch(getDoctorsByClinicId({ id_clinic }, null));
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getUsers(id_clinic));
    dispatch(getUserRoles());
  }, []);

  useEffect(() => {
    if (speciality && speciality.length === 0) {
      dispatch(getSpeciality());
    }
  }, [speciality]);

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
        dispatch(setAddEditUserModal({ open: false }));
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
                    minLength: {
                      value: 8,
                      message: "Password should be minimum 8 charachter",
                    },
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
                  options={speciality}
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
  const dispatch = useDispatch();

  const { addEditUserModal } = useSelector((state) => state.settings);
  const { formData } = addEditUserModal;

  const handleButtonClick = (userTypeId) => {
    dispatch(
      setAddEditUserModal({
        ...addEditUserModal,
        open: true,
        formData: { ...formData, userTypeId: userTypeId },
      })
    );
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
