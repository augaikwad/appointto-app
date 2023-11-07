import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { PatientContext } from "../../../context/Patient";

import { TextField, DatePickerField } from "../../../components/Forms";
import SelectField from "../../../components/Forms/SelectField";
import RadioField from "../../../components/Forms/RadioField";
import moment from "moment";

const General = (props) => {
  const [state, actions] = useContext(PatientContext);

  const { patient, activeTab } = state;

  const { setValue } = useFormContext();

  return (
    <div className="row">
      <div className="col-lg-12">
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
            <TextField
              label="Mobile Number"
              name="mobile_number"
              type="number"
              maxLength="10"
              placeholder="Enter Mobile Number"
              rules={{
                required: "Please enter mobile number",
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
          <div className="col-lg-3">
            <DatePickerField
              label="Date of Birth"
              name="dob"
              maxDate={new Date()}
              showYearDropdown
              inputOnChange={(date) => {
                setValue("age", moment().diff(new Date(date), "years", false));
              }}
            />
          </div>
          <div className="col-lg-4">
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                lineHeight: 1,
                verticalAlign: "top",
                marginBottom: 0,
              }}
            >
              Age
              <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            </label>
            <div className="row">
              <div className="col-lg-6">
                <TextField
                  name="age"
                  type="number"
                  placeholder="Enter Age"
                  onChange={() => {
                    setValue("dob", null);
                  }}
                  rules={{
                    required: "Required",
                  }}
                />
              </div>
              <div className="col-lg-6">
                <SelectField
                  name="ageType"
                  options={[
                    { label: "Years", value: "Years" },
                    { label: "Months", value: "Months" },
                    { label: "Days", value: "Days" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <RadioField
              label="Gender"
              name="gender"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />
          </div>
          <div className="col-lg-6">
            <TextField label="Address" name="address" />
          </div>
          <div className="col-lg-6">
            <TextField label="Area" name="area" />
          </div>
          <div className="col-lg-4">
            <TextField label="City" name="city" />
          </div>
          <div className="col-lg-4">
            <TextField label="State" name="state" />
          </div>
          <div className="col-lg-4">
            <TextField label="Pin Code" name="pincode" type="number" />
          </div>
          <div className="col-lg-4">
            <TextField label="Referred By" name="reffered_by" />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Email Id"
              name="email_id"
              rules={{
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Please enter correct email",
                },
              }}
            />
          </div>
          <div className="col-lg-4">
            <TextField
              label="Emergency Contact"
              name="emergency_contact"
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
