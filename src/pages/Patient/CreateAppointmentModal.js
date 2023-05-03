import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "../../components";
import {
  TextField,
  DateTimePickerField,
  DatePickerField,
} from "../../components/Forms";
import { useForm, FormProvider } from "react-hook-form";
import { AppointmentContext } from "../../context/Appointment";
import moment from "moment";
import { Button } from "react-bootstrap";

const getFormattedTime = (date, time) => {
  let oDate = "";
  if (!!date) {
    let otime = moment(time, "hh:mm A");
    oDate = new Date(
      moment(date).set({
        hour: otime.get("hour"),
        minute: otime.get("minute"),
      })
    );
  }
  return oDate;
};

const formattedFormData = (data) => {
  let obj = { ...data };
  obj.date = !!data.date ? new Date(data.date) : "";
  obj.start_time = getFormattedTime(data.date, data.start_time);
  obj.end_time = getFormattedTime(data.date, data.end_time);
  return obj;
};

const CreateAppointmentModal = () => {
  const location = useLocation();

  const [state, actions] = useContext(AppointmentContext);
  const { appointmentForm } = state;
  const { isAdd, show } = state.appointmentModal;

  const form = useForm({
    defaultValues: appointmentForm,
  });

  const { reset, setValue, handleSubmit } = form;

  useEffect(() => {
    reset(formattedFormData(appointmentForm));
  }, [appointmentForm]);

  const callback = () => {
    actions.resetAppointmentForm();
    actions.setAppointmentModal({ show: false });
    if (["/dashboard", "/"].includes(location.pathname)) {
      actions.getAppointmentByDoctor();
    }
  };

  const onSubmit = (data) => {
    const formData = { ...data };
    formData.start_time = moment(new Date(data.start_time)).format("h:mm A");
    formData.end_time = moment(new Date(data.end_time)).format("h:mm A");
    formData.date = moment(new Date(formData.date)).format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );

    if (["/dashboard", "/"].includes(location.pathname)) {
      actions.setCanResetSearchBox(true);
    }
    if (isAdd) {
      actions.createAppointment(formData, callback);
    } else {
      actions.updateAppointment(formData, callback);
    }
  };

  const FooterActions = () => {
    return (
      <div className="text-right">
        <Button
          className="btn btn-sm btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          {isAdd ? "Create" : "Save"}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      id="CreateAppointment"
      title={`${isAdd ? "Create" : "Update"} Appointment`}
      size="md"
      show={show}
      onHide={() => {
        actions.resetAppointmentForm();
        actions.setAppointmentModal({ isAdd: true, show: false });
      }}
      footerActions={<FooterActions />}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <DatePickerField
                label="Date"
                name="date"
                rules={{
                  required: "Please select Date",
                }}
                inputOnChange={(date) => {
                  setValue("day", moment(new Date(date)).format("dddd"));
                }}
              />
            </div>
            <div className="col-lg-6">
              <TextField label="Day" name="day" disabled />
            </div>
            <div className="col-lg-6">
              <DateTimePickerField
                label="Start time"
                name="start_time"
                dateFormat="h:mmaa"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                inputOnChange={(val) => {
                  setValue("end_time", moment(val).add(15, "m").toDate());
                }}
                rules={{
                  required: "Start Time Required",
                }}
              />
            </div>
            <div className="col-lg-6">
              <DateTimePickerField
                label="End Time"
                name="end_time"
                dateFormat="h:mmaa"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                rules={{
                  required: "End Time Required",
                }}
              />
            </div>
            <div className="col-lg-12">
              <TextField
                label="Reason"
                name="reason"
                rules={{
                  required: "Please Enter Reason",
                }}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateAppointmentModal;
