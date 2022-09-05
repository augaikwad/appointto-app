import React, { useState } from "react";
import { Modal, InputField, DateTimeField } from "../../components";

const FooterActions = ({ closeModal = () => {} }) => {
  return (
    <div className="text-right">
      <button className="btn btn-sm btn-primary" onClick={() => closeModal()}>
        Create
      </button>
    </div>
  );
};

const CreateAppointmentModal = ({ show = false, onHide = () => {} }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const footerActionsProps = {
    closeModal: onHide,
  };

  return (
    <Modal
      id="CreateAppointment"
      title="Create Appointment"
      size="md"
      show={show}
      onHide={onHide}
      footerActions={<FooterActions {...footerActionsProps} />}
    >
      <div className="row">
        <div className="col-lg-6">
          <InputField label="Doctor" name="doctor" />
        </div>
        <div className="col-lg-6">
          <InputField label="Speciality" name="speciality" />
        </div>
        <div className="col-lg-12">
          <InputField label="Patient" name="patient" />
        </div>
        <div className="col-lg-6">
          <DateTimeField
            label="Date"
            name="date"
            selected={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            withPortal={true}
          />
        </div>
        <div className="col-lg-6">
          <InputField label="Day" name="day" />
        </div>
        <div className="col-lg-6">
          <DateTimeField
            label="Start Time"
            name="startTime"
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            withPortal={false}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
        <div className="col-lg-6">
          <DateTimeField
            label="End Time"
            name="endTime"
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            withPortal={false}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
        <div className="col-lg-12">
          <InputField label="Reason" name="reason" />
        </div>
      </div>
    </Modal>
  );
};

export default CreateAppointmentModal;
