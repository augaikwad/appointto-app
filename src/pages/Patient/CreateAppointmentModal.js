import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "../../components";
import {
  TextField,
  DateTimePickerField,
  DatePickerField,
  SelectField,
} from "../../components/Forms";
import { useForm, FormProvider } from "react-hook-form";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setAppointmentModal,
//   initialState as appointmentInitState,
// } from "../../store/reducers/appointmentsSlice";
import {
  getDashboardAppointments,
  updateAppointment,
  createAppointment,
} from "../../store/actions/appointmentActions";

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
  obj.date = !!data?.date ? new Date(data.date) : "";
  obj.start_time = getFormattedTime(data.date, data.start_time);
  obj.end_time = getFormattedTime(data.date, data.end_time);
  return obj;
};

const CreateAppointmentModal = ({ onHide }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { doctorsByClinicId } = useSelector((state) => state.user);

  const { dashboardListFilters, appointmentModal } = useSelector(
    (state) => state.appointments
  );
  const { form: formValues, show, isAdd } = appointmentModal;

  const form = useForm({
    defaultValues: formattedFormData(formValues),
  });

  const { reset, setValue, handleSubmit } = form;

  useEffect(() => {
    reset(formattedFormData(formValues));
  }, [appointmentModal.form]);

  const callback = () => {
    onHide();
    if (["/dashboard", "/"].includes(location.pathname)) {
      dispatch(getDashboardAppointments(dashboardListFilters));
    }
  };

  const onSubmit = (data) => {
    const formData = { ...data };
    formData.start_time = moment(new Date(data.start_time)).format("h:mm A");
    formData.end_time = moment(new Date(data.end_time)).format("h:mm A");
    formData.date = moment(new Date(formData.date)).format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );

    if (isAdd) {
      dispatch(createAppointment(formData, callback));
    } else {
      dispatch(updateAppointment(formData, callback));
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
      onHide={onHide}
      footerActions={<FooterActions />}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-12">
              <SelectField
                label="Select Doctor"
                name="id_doctor"
                labelField="first_name"
                valueField="id_doctor"
                options={doctorsByClinicId}
                optionRenderer={(opt) =>
                  `Dr. ${opt?.first_name} ${opt?.last_name}`
                }
              />
            </div>
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
                dateFormat="hh:mmaa"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                inputOnChange={(val) => {
                  if (val) {
                    setValue("end_time", moment(val).add(15, "m").toDate());
                  }
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
                dateFormat="hh:mmaa"
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
