import React, { useEffect } from "react";
import { Modal } from "../../../components";
import {
  TextField,
  DatePickerField,
  SelectField,
  CreatableReactSelect,
  ReactSelectField,
} from "../../../components/Forms";
import { FormProvider, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getTreatmentList,
  createBill,
  updateBill,
  getAllBillingDataAction,
  saveTreatment,
} from "../../../store/actions/billingActions";
import {
  setBillModal,
  initialState,
} from "../../../store/reducers/billingSlice";
import cogoToast from "cogo-toast";

const toastOption = { hideAfter: 5, position: "top-right" };

const AddEditBillModal = () => {
  const dispatch = useDispatch();

  const { doctorsByClinicId } = useSelector((state) => state.user);
  const { id_doctor, id_clinic } = useSelector((state) => state.user.details);
  const { treatmentList, billModal } = useSelector((state) => state.billings);
  const { patientById } = useSelector((state) => state.patients);

  const { open, isAdd, formValue } = billModal;

  const form = useForm({
    defaultValues: formValue,
  });

  const { handleSubmit, watch, setValue, register, reset } = form;
  const watchDiscountType = watch("discount_type");
  const watchQty = watch("quantity");
  const watchRate = watch("rate");
  const watchDiscountValue = watch("discount_value");

  useEffect(() => {
    dispatch(getTreatmentList(id_doctor));
  }, []);

  useEffect(() => {
    let totalAmount = watchQty * watchRate;
    let discountedAmount =
      watchDiscountType === 0
        ? totalAmount - watchDiscountValue
        : totalAmount * (1 - watchDiscountValue / 100);
    setValue("gross_amount", discountedAmount);
  }, [watchQty, watchRate, watchDiscountValue, watchDiscountType]);

  // useEffect(() => {
  //   if (!isAdd) {
  //     let formData = { ...formValue };
  //     formData.bill_date = new Date(formValue.bill_date);
  //     reset(formData);
  //   } else {
  //     reset(initialState.billModal.formValue);
  //   }
  // }, [isAdd, formValue]);

  const submitCallback = (res) => {
    dispatch(
      getAllBillingDataAction({
        id_doctor: res.id_doctor,
        id_patient: patientById.id_patient,
        id_clinic: res.id_clinic,
      })
    );
    reset(initialState.billModal.formValue);
    dispatch(setBillModal({ open: false }));
  };

  const onSubmit = (data) => {
    let formData = { ...data };
    formData.doctor_name = `${data.doctor_name.first_name} ${data.doctor_name.last_name}`;
    if (formData.bill_id === 0) {
      formData.id_patient = patientById.id_patient;
      formData.id_doctor = data.doctor_name.id_doctor;
      formData.id_clinic = data.doctor_name.id_clinic;
      dispatch(createBill(formData, submitCallback));
    } else {
      dispatch(updateBill(formData, submitCallback));
    }
  };

  const onHide = () => {
    reset(initialState.billModal.formValue);
    dispatch(setBillModal({ open: false }));
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
          setValue("discount_value", 0);
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
              <DatePickerField
                label="Date"
                name="bill_date"
                maxDate={new Date()}
                showYearDropdown
              />
            </div>
            <div className="col-lg-6">
              <ReactSelectField
                label="Dr. Name"
                name="doctor_name"
                labelField="first_name"
                valueField="id_doctor"
                options={doctorsByClinicId}
                formatOptionLabel={(item) => {
                  return `${item.first_name} ${item.last_name}`;
                }}
                rules={{
                  required: "Please select Doctor",
                }}
              />
              {/* <TextField
                label="Dr. Name"
                name="doctor_name"
                rules={{
                  required: "Please enter Doctor Name",
                }}
              /> */}
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
                  const findItem = treatmentList.some(
                    (item) => item.treatment_name === val
                  );
                  if (!findItem) {
                    let req = {
                      treatment_name: val,
                      treatment_id: 0,
                      id_doctor: id_doctor,
                    };
                    dispatch(
                      saveTreatment(req, (response) => {
                        setValue("treatment", response);
                        dispatch(getTreatmentList(id_doctor));
                      })
                    );
                  } else {
                    cogoToast.error(
                      "Treatment name already exist!",
                      toastOption
                    );
                  }
                }}
                rules={{
                  required: "Please select Treatment",
                }}
                isMulti={false}
              />
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <TextField
                    label="Qty"
                    name="quantity"
                    type="number"
                    // onBlur={(e) => {
                    //   if (watchRate > 0) {
                    //     setValue("gross_amount", watchRate * e.target.value);
                    //   }
                    // }}
                  />
                </div>
                <div className="col-lg-6">
                  <TextField
                    label="Rate"
                    name="rate"
                    type="number"
                    // onBlur={(e) => {
                    //   if (watchQty > 0) {
                    //     setValue("gross_amount", watchQty * e.target.value);
                    //   }
                    // }}
                    rules={{
                      required: true,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <TextField
                label="Amount"
                name="gross_amount"
                type="number"
                readOnly={true}
              />
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
