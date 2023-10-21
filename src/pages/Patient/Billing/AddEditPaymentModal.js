import React, { useEffect } from "react";
import { Modal } from "../../../components";
import { TextField, SelectField } from "../../../components/Forms";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentModal } from "../../../store/reducers/billingSlice";
import {
  addPayment,
  getAllBillingDataAction,
} from "../../../store/actions/billingActions";

const AddEditPaymentModal = () => {
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { patientById } = useSelector((state) => state.patients);
  const { paymentModal } = useSelector((state) => state.billings);

  const { open, isAdd, formValue } = paymentModal;

  const form = useForm({
    defaultValues: formValue,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (open) {
      reset(formValue);
    }
  }, [open]);

  const onHide = () => {
    reset();
    dispatch(setPaymentModal({ open: false }));
  };

  const onSubmit = (data) => {
    dispatch(
      addPayment(data, () => {
        dispatch(
          getAllBillingDataAction({
            id_doctor: id_doctor,
            id_patient: patientById.id_patient,
            id_clinic: patientById.id_clinic,
          })
        );
        onHide();
      })
    );
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
      title={`${isAdd ? "Add" : "Edit"} Payment`}
      show={open}
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
