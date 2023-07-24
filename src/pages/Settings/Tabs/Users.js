import React, { useContext, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Modal from "../../../components/Modal";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField, TextField, RadioField } from "../../../components/Forms";
import { SettingsContext } from "../../../context/Settings";

const AddEditUser = () => {
  const [state, actions] = useContext(SettingsContext);
  const { userRoles } = state;
  const { isAdd, open, step, formData } = state.addEditUserModal;
  console.log("formData == ", formData);
  const form = useForm({
    defaultValues: formData,
  });

  const { handleSubmit, watch, reset } = form;

  const userRoleWatch = watch("userRole");
  console.log("userRoleWatch === ", userRoleWatch);

  useEffect(() => {
    reset(formData);
  }, [formData]);

  const onSubmit = (data, e) => {
    const { name } = e.target;
    if (name === "NextBtn") {
      actions.setAddEditUserModal({ step: step + 1 });
    } else if (name === "SaveBtn") {
    }
    console.log("onSubmit == ", data, name);
  };

  useEffect(() => {
    actions.getUsers();
    actions.getUserRoles();
  }, []);

  const FooterActions = () => {
    return (
      <>
        {step === 2 ? (
          <Button
            className="btn btn-sm btn-primary"
            type="submit"
            name="SaveBtn"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        ) : (
          <Button
            className="btn btn-sm btn-primary"
            type="button"
            name="NextBtn"
            onClick={handleSubmit(onSubmit)}
          >
            Next
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
          <Row>
            {step === 0 && (
              <>
                <Col lg="12">
                  <RadioField
                    name="userType"
                    options={[
                      { label: "Doctor", value: "doctor" },
                      { label: "Staff", value: "staff" },
                    ]}
                  />
                </Col>
                <Col lg="12">
                  <SelectField
                    label="Select User Role"
                    name="userRole"
                    labelField="name"
                    valueField="normalizedName"
                    options={userRoles}
                  />
                </Col>
              </>
            )}
            {step === 1 && (
              <>
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
              </>
            )}
          </Row>
        </form>
      </FormProvider>
    </Modal>
  );
};

const Users = () => {
  const [state, actions] = useContext(SettingsContext);
  return (
    <div>
      <AddEditUser />
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => {
          actions.setAddEditUserModal({ open: true });
        }}
      >
        Add User
      </button>
    </div>
  );
};

export default Users;
