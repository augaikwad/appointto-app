import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "../../components";
import {
  TextField,
  DateTimePickerField,
  DatePickerField,
  SelectField,
  CreatableReactSelectField,
} from "../../components/Forms";
import { useForm, FormProvider } from "react-hook-form";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardAppointments,
  updateAppointment,
  createAppointment,
} from "../../store/actions/appointmentActions";
import useAxios from "../../hooks/useAxios";
import { getValueLabelOptions } from "../../utils/common";

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

const getReasonObjByName = (name, reasons) => {
  let obj = null;
  if (name !== "" && reasons.length > 0) {
    obj = reasons.find((item) => item.reason_name === name);
  }
  return obj;
};

const CreateAppointmentModal = ({ onHide }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [reasons, setReasons] = useState([]);

  const { doctorsByClinicId, selectedDoctor } = useSelector(
    (state) => state.user
  );

  const { dashboardListFilters, appointmentModal } = useSelector(
    (state) => state.appointments
  );

  const { form: formValues, show, isAdd } = appointmentModal;

  const form = useForm({
    defaultValues: formattedFormData(formValues),
  });

  const { reset, setValue, handleSubmit, watch } = form;

  const { fetchData: getReasons } = useAxios();

  const getReasonList = (getReasonCallback) => {
    getReasons(
      {
        url: `AppointmentReason/get-reasons-by-doctor?id_doctor=${formValues.id_doctor}`,
        method: "get",
      },
      (status, res) => {
        if (status === 200) {
          setReasons(res.payload?.appointmentReasons || []);
          if (getReasonCallback && typeof getReasonCallback === "function") {
            getReasonCallback(res.payload?.appointmentReasons || []);
          }
        }
      }
    );
  };

  useEffect(() => {
    if (show) {
      getReasonList();
    }
  }, [show]);

  useEffect(() => {
    if (isAdd) {
      const now = new Date();

      reset(
        formattedFormData({
          ...formValues,
          date: now,
          day: moment(now).format("dddd"),
          start_time: now,
          end_time: moment(now).add(15, "m").toDate(),
          reason: null,
        })
      );
    } else {
      const { reason } = formValues;
      const tempFormValues = { ...formValues };
      const filteredReason = getReasonObjByName(reason, reasons);
      tempFormValues.reason = filteredReason
        ? {
            ...filteredReason,
            label: filteredReason.reason_name,
            value: filteredReason.id_reason,
          }
        : null;
      reset(formattedFormData(tempFormValues));
    }
  }, [isAdd, appointmentModal, reasons]);

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
    formData.reason = data.reason.reason_name;

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

  const { fetchData: createReason } = useAxios();

  const handleAddReason = (req) => {
    createReason(
      {
        url: "AppointmentReason/create-reason",
        method: "post",
        data: req,
      },
      (status, res) => {
        if (status === 200) {
          const { payload } = res;
          if (payload) {
            getReasonList();
            const val = { ...payload };
            val.label = payload.reason_name;
            val.value = payload.id_reason;
            setValue("reason", val);
          }
        }
      }
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
                minDate={new Date()}
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
                minTime={moment(new Date())
                  .set({
                    hour: 9,
                    minute: 0,
                    second: 0,
                  })
                  .toDate()}
                maxTime={moment(new Date())
                  .set({
                    hour: 22,
                    minute: 45,
                    second: 0,
                  })
                  .toDate()}
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
                minTime={moment(new Date(watch("start_time")))
                  .add(15, "m")
                  .toDate()}
                maxTime={moment(new Date())
                  .set({
                    hour: 23,
                    minute: 0,
                    second: 0,
                  })
                  .toDate()}
                timeIntervals={15}
                timeCaption="Time"
                rules={{
                  required: "End Time Required",
                }}
              />
            </div>
            <div className="col-lg-12">
              <CreatableReactSelectField
                name="reason"
                label="Reason"
                isMulti={false}
                options={getValueLabelOptions(
                  reasons,
                  "reason_name",
                  "id_reason"
                )}
                onCreateOption={(val) => {
                  let req = {
                    reason_name: val,
                    id_doctor: formValues.id_doctor,
                  };
                  handleAddReason(req);
                }}
                onChange={(val) => {
                  setValue("reason", val);
                }}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                menuPosition="fixed"
                rules={{
                  required: "Please Select Reason",
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
