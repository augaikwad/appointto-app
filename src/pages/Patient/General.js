import React,{useState} from "react";
import { InputField, SelectField, RadioField, DateTimeField } from "../../components";

const General = () => {
  const [dobDate, setDOBDate] = useState(new Date());
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-4">
            <InputField label="First Name" name="firstName" required={true} />
          </div>
          <div className="col-lg-4">
            <InputField label="Last Name" name="lastName" required={true} />
          </div>
          <div className="col-lg-4">
            <InputField label="Mobile Number" name="mobile" required={true} />
          </div>
          <div className="col-lg-4">
            <DateTimeField
              label="Date of Birth"
              name="dob"
              // required={true}
              selected={dobDate}
              onChange={(date) => setDOBDate(date)}
              withPortal={true}
            />
          </div>
          <div className="col-lg-4">
            <label
              style={{
                fontSize: "0.875rem",
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
                <InputField name="age" required={true} />
              </div>
              <div className="col-lg-6">
                <SelectField
                  name="ageType"
                  options={[
                    { label: "Years", value: "Years" },
                    { label: "Months", value: "Months" },
                    { label: "Days", value: "Days" },
                  ]}
                  placeholder="Select"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <RadioField
              label="Gender"
              name="gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
          </div>
          <div className="col-lg-4">
            <InputField label="Address" name="address1" />
          </div>
          <div className="col-lg-4">
            <InputField label="Area" name="address2" />
          </div>
          <div className="col-lg-4">
            <InputField label="City" name="city" />
          </div>
          <div className="col-lg-4">
            <InputField label="Pin Code" name="pin" />
          </div>
          <div className="col-lg-4">
            <InputField label="Referred By" name="referredBy" />
          </div>
          <div className="col-lg-4">
            <InputField label="Email Id" name="email" />
          </div>
          <div className="col-lg-4">
            <InputField label="Emergency Contact" name="emergency" />
          </div>
        </div>
      </div>
      {/* <div className="col-lg-2 text-right">
        <button type="button" className="btn btn-link">
          Quick Save
        </button>
      </div> */}
    </div>
  );
};

export default General;
