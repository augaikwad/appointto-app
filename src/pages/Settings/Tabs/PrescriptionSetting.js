import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../../../components/Forms";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrintingSetting,
  addPrintingSetting,
  updatePrintingSetting,
} from "../../../store/actions/settingActions";

const PrescriptionSetting = () => {
  const dispatch = useDispatch();

  const { id_doctor, id_clinic } = useSelector((state) => state.user.details);
  const { prescriptionMargins } = useSelector((state) => state.settings);

  const form = useForm({ defaultValues: prescriptionMargins });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    dispatch(
      getPrintingSetting(id_doctor, (res) => {
        reset(res);
      })
    );
  }, []);

  const onSubmit = (formData) => {
    let request = { ...formData };
    request.id_doctor = id_doctor;
    request.id_clinic = id_clinic;
    if (prescriptionMargins.hasOwnProperty("id")) {
      dispatch(updatePrintingSetting(request));
    } else {
      dispatch(addPrintingSetting(request));
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
