import React, { useContext, useEffect } from "react";
import { Modal } from "../../../components";
import {
  TextField,
  DatePickerField,
  SelectField,
  ReactSelectField,
  CreatableReactSelect,
} from "../../../components/Forms";
import { FormProvider, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { BillingContext, initialState } from "../../../context/Billing";
import { PatientContext } from "../../../context/Patient";

const AddEditBillModal = () => {
  const [state, actions] = useContext(BillingContext);
  const { treatmentList, billModal } = state;
  const { open, isAdd, formValue } = billModal;
  const [patientState, patientActions] = useContext(PatientContext);
  const { patientData } = patientState;

  const form = useForm();

  const { handleSubmit, watch, setValue, register, reset } = form;
  const watchDiscountType = watch("discount_type");

  useEffect(() => {
    actions.getTreatmentList();
  }, []);

  useEffect(() => {
    if (formValue.bill_id > 0) {
      let formData = { ...formValue };
      formData.bill_date = new Date(formValue.bill_date);
      reset(formData);
    } else {
      reset(formValue);
    }
  }, [formValue]);

  const submitCallback = (res) => {
    reset(initialState.billModal.formValue);
    actions.getAllBillData({
      id_doctor: res.id_doctor,
      id_patient: res.id_patient,
    });
    actions.getBillSummary({
      id_doctor: res.id_doctor,
      id_patient: res.id_patient,
      id_clinic: localStorage.getItem("id_clinic"),
    });
    actions.setBillModal({ open: false });
  };

  const onSubmit = (data) => {
    let formData = { ...data };
    if (formData.bill_id === 0) {
      formData.id_patient = patientData.id_patient;
      formData.id_doctor = parseInt(localStorage.getItem("id_doctor"));
      formData.id_clinic = parseInt(localStorage.getItem("id_clinic"));
      actions.createBill(formData, submitCallback);
    } else {
      actions.updateBill(formData, submitCallback);
    }
  };

  const onHide = () => {
    reset(initialState.billModal.formValue);
    actions.setBillModal({ open: false });
  };

  const FooterAction = () => {
    return (
      <>
        <Button
          size="sm"
          className="btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        <Button size="sm" className="btn-secondary ml-2" onClick={onHide}>
          Cancel
        </Button>
      </>
    );
  };

  const DiscountButtons = ({ icon, value }) => {
    return (
      <Button
        className={`btn-sm ${
          watchDiscountType === value ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => {
          setValue("discount_type", value);
          setValue("discount_value", "");
        }}
      >
        <i className={`fa ${icon}`}></i>
      </Button>
    );
  };

  return (
    <Modal
      title={`${isAdd ? "Add" : "Edit"} Bill`}
      show={open}
      size="md"
      onHide={onHide}
      footerActions={<FooterAction />}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <DatePickerField label="Date" name="bill_date" showYearDropdown />
            </div>
            <div className="col-lg-6">
              <TextField
                label="Dr. Name"
                name="doctor_name"
                rules={{
                  required: "Please enter Doctor Name",
                }}
              />
            </div>
            <div className="col-lg-6">
              <CreatableReactSelect
                label="Name of Treatment"
                name="treatment"
                labelField="treatment_name"
                valueField="treatment_id"
                options={treatmentList}
                getNewOptionData={(value, label) => {
                  return {
                    treatment_name: label,
                    treatment_id: value,
                  };
                }}
                onCreateOption={(val) => {
                  let req = {
                    treatment_name: val,
                    treatment_id: 0,
                    id_doctor: parseInt(localStorage.getItem("id_doctor")),
                  };
                  actions.saveTreatment(req, (response) => {
                    setValue("treatment", response);
                    actions.getTreatmentList();
                  });
                }}
                rules={{
                  required: "Please select Treatment",
                }}
                isMulti={false}
              />
              {/* <ReactSelectField
                label="Name of Treatment"
                name="treatment"
                labelField="treatment_name"
                valueField="treatment_id"
                options={treatmentList}
                rules={{
                  required: "Please select Treatment",
                }}
              /> */}
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <TextField label="Qty" name="quantity" type="number" />
                </div>
                <div className="col-lg-6">
                  <TextField
                    label="Rate"
                    name="rate"
                    type="number"
                    onBlur={(e) => {
                      let watchQty = watch("quantity");
                      if (watchQty > 0) {
                        setValue("gross_amount", watchQty * e.target.value);
                      } else {
                        alert("Please enter Quantity");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <TextField label="Amount" name="gross_amount" type="number" />
            </div>
            <div className="col-lg-6">
              <Form.Group>
                <label style={{ marginBottom: 0 }}>Discount</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <DiscountButtons icon="fa-inr" value={0} />
                  </div>
                  <Form.Control
                    type="text"
                    className={`form-control ${
                      watchDiscountType === 1 ? "text-right" : ""
                    }`}
                    name="discount_value"
                    {...register("discount_value")}
                  />
                  <div className="input-group-append">
                    <DiscountButtons icon="fa-percent" value={1} />
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="col-lg-6">
              <TextField
                label="Payment Recieved"
                name="amount_received"
                type="number"
                rules={{
                  required: "Please enter amount",
                }}
              />
            </div>
            <div className="col-lg-6">
              <SelectField
                label="Payment Mode"
                name="payment_mode"
                options={[
                  { label: "Card", value: "card" },
                  { label: "UPI", value: "upi" },
                  { label: "Cash", value: "cash" },
                ]}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddEditBillModal;
