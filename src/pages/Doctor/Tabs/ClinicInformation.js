import React, { useContext } from "react";
import moment from "moment";
// import { InputField, CheckBoxField } from "../../../components";
import TextField from "../../../components/Forms/TextField";
import ReactSelectField from "../../../components/Forms/ReactSelectField";
import { Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import { DoctorContext } from "../../../context/Doctor";
import { GlobalContext } from "../../../context/Global";

const ClinicInformation = () => {
  const [states, actions] = useContext(DoctorContext);

  const { registrationActiveTab } = states;

  const [globalState, globalActions] = useContext(GlobalContext);
  const { cities } = globalState;

  const form = useForm({
    defaultValues: {
      state: "Maharashtra",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    const formData = { ...data };
    formData.id_clinic = 0;
    formData.is_schedule = !data.is_schedule ? 0 : 1;
    formData.id_city = data?.city?.id_city;
    formData.created_date = moment(new Date()).toISOString();
    formData.created_by = 0;
    formData.updated_date = moment(new Date()).toISOString();
    formData.updated_by = 0;

    const callback = () => {
      actions.setRegistrationActiveTab(registrationActiveTab + 1);
    };

    actions.updateClinicInfo(formData, callback);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-4">
            <TextField
              label="Clinic Name"
              name="clinic_name"
              rules={{
                required: "Please Enter Clinic Name",
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Number"
              name="clinic_number"
              type="number"
              rules={{
                required: "Please Enter Clinic Number",
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
              label="Address"
              name="address"
              rules={{
                required: "Please Enter Address",
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField label="Area" name="area" />
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <ReactSelectField
              label="City"
              name="city"
              labelField="city_name"
              valueField="id_city"
              options={cities}
              onInputChange={(val) => {
                if (val && val.length >= 2) {
                  globalActions.getCities(val);
                }
              }}
              rules={{
                required: "Please select City",
              }}
            />
            {/* <TextField
              label="City"
              name="city"
              rules={{
                required: "Please Enter City",
              }}
            /> */}
          </div>
          <div className="col-lg-4">
            <TextField
              label="State"
              name="state"
              disabled={true}
              rules={{
                required: "Please Enter State",
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Pin"
              name="pin"
              type="number"
              rules={{
                required: "Please enter 6 digit Pin code",
                minLength: {
                  value: 6,
                  message: "Please enter correct Pin code",
                },
                maxLength: {
                  value: 6,
                  message: "Please enter correct Pin code",
                },
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField label="About Clinic" name="about_clinic" />
          </div>
          {/* <div className="col-lg-4">
            <Form.Group>
              <label style={{ marginBottom: 0 }}>Logo</label>
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
          </div> */}
          {/* <div className="col-lg-4">
            <CheckBoxField
              label="Available Days"
              name="is_schedule"
              register={register}
              options={[{ label: "As per Doctor Schedule", value: 1 }]}
            />
          </div> */}
          <div className="col-lg-12 clearfix">
            <div className="float-right">
              <Button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  actions.setRegistrationActiveTab(registrationActiveTab - 1)
                }
              >
                Previous
              </Button>
              <Button className="btn btn-sm btn-primary ml-3" type="submit">
                Save & Next
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ClinicInformation;
