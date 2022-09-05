import React, { useState } from "react";
import {
  InputField,
  RadioField,
  DateTimeField,
  SelectField,
} from "../../../components";
import { Form } from "react-bootstrap";

const DoctorInformation = () => {
  const [dobDate, setDOBDate] = useState(new Date());
  return (
    <form>
      <div className="row">
        <div className="col-lg-4">
          <InputField label="First Name" name="firstName" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Last Name" name="lastName" required={true} />
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
          <DateTimeField
            label="Date of Birth"
            name="dob"
            selected={dobDate}
            onChange={(date) => setDOBDate(date)}
            required={true}
          />
        </div>
        <div className="col-lg-4">
          <InputField label="Email ID" name="email" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Mobile Number" name="mobile" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField
            label="Qualification"
            name="qualification"
            required={true}
          />
        </div>
        <div className="col-lg-4">
          <SelectField
            label="Speciality"
            name="speciality"
            options={[
              { label: "Speciality 1", value: "1" },
              { label: "Speciality 1", value: "2" },
              { label: "Speciality 1", value: "3" },
            ]}
            placeholder="Select"
            required={true}
          />
        </div>
        <div className="col-lg-4">
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
        </div>
        <div className="col-lg-4">
          <InputField label="Registration Number" name="registrationNo" />
        </div>
        <div className="col-lg-4">
          <SelectField
            label="Role"
            name="role"
            options={[
              { label: "Admin", value: "ADMIN" },
              { label: "Visiting Doctor", value: "VISITOR" },
            ]}
            placeholder="Select"
          />
        </div>
        <div className="col-lg-4">
          <InputField label="Cunsultation Fees" name="cunsultationFees" />
        </div>
      </div>
    </form>
  );
};

export default DoctorInformation;
