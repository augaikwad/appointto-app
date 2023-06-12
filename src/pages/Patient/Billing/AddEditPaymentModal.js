import React, { useContext, useEffect } from "react";
import { Modal } from "../../../components";
import { TextField, SelectField } from "../../../components/Forms";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { BillingContext } from "../../../context/Billing";
import { PatientContext } from "../../../context/Patient";

const AddEditPaymentModal = () => {
  const [state, actions] = useContext(BillingContext);
  const { isPaymentModalOpen, paymentModalForm, treatmentList } = state;

  const [patientState, patientActions] = useContext(PatientContext);
  const { patientData } = patientState;

  const form = useForm({
    defaultValues: paymentModalForm,
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (isPaymentModalOpen) {
      reset(paymentModalForm);
    }
  }, [isPaymentModalOpen]);

  const onHide = () => {
    reset();
    actions.setPaymentModalOpen(false);
  };

  const onSubmit = (data) => {
    actions.addPayment(data, () => {
      actions.getAllBillData({
        id_doctor: parseInt(localStorage.getItem("id_doctor")),
        id_patient: patientData.id_patient,
      });
      actions.getBillSummary({
        id_doctor: parseInt(localStorage.getItem("id_doctor")),
        id_patient: patientData.id_patient,
        id_clinic: patientData.id_clinic,
      });
      onHide();
    });
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

  return (
    <Modal
      title={"Add Payment"}
      show={isPaymentModalOpen}
      size="md"
      onHide={onHide}
      footerActions={<FooterAction />}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <TextField
                label="Payment Recieved"
                name="amount"
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

export default AddEditPaymentModal;
