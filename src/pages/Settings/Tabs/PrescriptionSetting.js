import React, { useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../../../components/Forms";
import { SettingsContext } from "../../../context/Settings";

const PrescriptionSetting = () => {
  const [state, actions] = useContext(SettingsContext);
  const { prescriptionMargins } = state;

  const form = useForm({ defaultValues: prescriptionMargins });
  const { handleSubmit, reset } = form;
  const onSubmit = (formData) => {
    let request = { ...formData };
    request.id_doctor = parseInt(localStorage.getItem("id_doctor"));
    request.id_clinic = parseInt(localStorage.getItem("id_clinic"));
    if (request.hasOwnProperty("id")) {
      actions.updatePrintingSetting(request);
    } else {
      actions.addPrintingSetting(request);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={3}>
              <TextField
                name="hearder_margin"
                type="number"
                label="Header Margin (Inches)"
              />
            </Col>
            <Col lg={3}>
              <TextField
                name="footer_margin"
                type="number"
                label="Footer Margin (Inches)"
              />
            </Col>
            <Col lg={3}>
              <TextField
                name="left_margin"
                type="number"
                label="Left Margin (Inches)"
              />
            </Col>
            <Col lg={3}>
              <TextField
                name="right_margin"
                type="number"
                label="Right Margin (Inches)"
              />
            </Col>
            <Col lg={12}>
              <Button size="sm" type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </form>
      </FormProvider>
    </div>
  );
};

export default PrescriptionSetting;
