import React, { useContext, useEffect, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { createUseStyles } from "react-jss";
import CreateAppointmentModal from "../pages/Patient/CreateAppointmentModal";
import AddEditPatientModal from "../pages/Patient/AddEditPatient/AddEditPatientModal";
import { PatientContext } from "../context/Patient";
import { AppointmentContext } from "../context/Appointment";
import moment from "moment";

const useStyles = createUseStyles({
  customMenuItem: {
    display: "flex",
    alignItems: "center",
    "& > div.label": {
      flex: 1,
    },
  },
});

const NavbarSearch = () => {
  const classes = useStyles();
  const ref = useRef();
  const [state, actions] = useContext(PatientContext);
  const { globalPatientList } = state;

  const [aptState, aptActions] = useContext(AppointmentContext);
  const { appointmentForm, canResetSearchBox } = aptState;

  useEffect(() => {
    actions.getGlobalList();
  }, []);

  useEffect(() => {
    if (canResetSearchBox) {
      ref.current?.clear();
      aptActions.setCanResetSearchBox(false);
    }
  }, [canResetSearchBox]);

  return (
    <>
      <div className="input-group">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            style={{ borderRadius: "0.1875rem 0 0 0.1875rem" }}
          >
            <i className="ti-search"></i>
          </span>
        </div>
        <Typeahead
          labelKey="patient_name"
          filterBy={["patient_name", "mobile_number"]}
          id="globalSearch"
          name="globalSearch"
          // minLength={3}
          options={globalPatientList}
          renderMenuItemChildren={(option, props, index) => {
            return (
              <div className={classes.customMenuItem} key={index}>
                <div className="label">{option.patient_name}</div>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => {
                    let currentDate = new Date();
                    let req = { ...appointmentForm };
                    req.id_patient = option.id_patient;
                    req.date = currentDate.toISOString();
                    req.day = moment(currentDate).format("dddd");
                    req.reason = "Consultation";

                    aptActions.createAppointment(req, () => {
                      ref.current?.clear();
                      aptActions.getAppointmentByDoctor();
                    });
                  }}
                >
                  Add to Queue
                </button>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => {
                    aptActions.setAppointmentForm({
                      id_patient: option.id_patient,
                      id_doctor: localStorage.getItem("id_doctor"),
                    });
                    aptActions.setAppointmentModal({ show: true });
                  }}
                >
                  Add Appointment
                </button>
              </div>
            );
          }}
          placeholder="Search & Add Patients"
          className="globalSearchField"
          ref={ref}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-primary btn-icon-text"
            onClick={() => {
              actions.setPatientModalOpen(true);
            }}
          >
            <i
              className="ti-plus btn-icon-prepend"
              style={{ fontWeight: "bolder" }}
            ></i>
            Add Patient
          </button>
        </div>
      </div>
      <CreateAppointmentModal />
      <AddEditPatientModal />
    </>
  );
};

export default NavbarSearch;
