import React from "react";
import { InputField, CheckBoxField } from "../../../components";
import { Form } from "react-bootstrap";

const ClinicInformation = () => {
  return (
    <form>
      <div className="row">
        <div className="col-lg-4">
          <InputField label="Clinic Name" name="clinicName" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Number" name="number" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Email ID" name="email" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Address 1" name="address1" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Area" name="area" />
        </div>
        <div className="col-lg-4">
          <InputField label="City" name="city" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="State" name="state" required={true} />
        </div>
        <div className="col-lg-4">
          <InputField label="Pin" name="pin" required={true} />
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <InputField label="About Clinic" name="aboutClinic" />
        </div>
        <div className="col-lg-4">
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
        </div>
        <div className="col-lg-4">
          <CheckBoxField
            label="Available Days"
            name="habits"
            required={true}
            options={[{ label: "As per Doctor Schedule", value: "Yes" }]}
          />
        </div>
      </div>
    </form>
  );
};

export default ClinicInformation;
