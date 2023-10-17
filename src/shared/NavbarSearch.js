import React, { useRef } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { createUseStyles } from "react-jss";
import CreateAppointmentModal from "../pages/Patient/CreateAppointmentModal";
import AddEditPatientModal from "../pages/Patient/AddEditPatient/AddEditPatientModal";
import moment from "moment";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentModal } from "../store/reducers/appointmentsSlice";
import {
  createAppointment,
  getDashboardAppointments,
} from "../store/actions/appointmentActions";
import { getGlobalList } from "../store/actions/patientActions";
import { setPatientModal } from "../store/reducers/patientSlice";

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
  const globalSearchRef = useRef();
  const dispatch = useDispatch();

  const { id_doctor, id_clinic } = useSelector((state) => state.user.details);
  const { appointmentModal, dashboardListFilters } = useSelector(
    (state) => state.appointments
  );
  const { globalPatientList, patientModal } = useSelector(
    (state) => state.patients
  );

  const handleDebounceChange = debounce((val) => {
    dispatch(
      getGlobalList({
        id_clinic,
        Keywords: val,
        start_record: 1,
        end_record: 10,
      })
    );
  }, 1000);

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
        <AsyncTypeahead
          labelKey="patient_name"
          filterBy={["patient_name", "mobile_number"]}
          id="globalSearch"
          name="globalSearch"
          onSearch={handleDebounceChange}
          options={globalPatientList?.item || []}
          renderMenuItemChildren={(option, props, index) => {
            return (
              <div className={classes.customMenuItem} key={index}>
                <div className="label">{option.patient_name}</div>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => {
                    let currentDate = new Date();
                    let req = { ...appointmentModal.form };
                    req.id_patient = option.id_patient;
                    req.id_doctor = id_doctor;
                    req.date = currentDate.toISOString();
                    req.day = moment(currentDate).format("dddd");
                    req.reason = "Consultation";

                    dispatch(
                      createAppointment(req, () => {
                        dispatch(
                          getDashboardAppointments(dashboardListFilters)
                        );
                      })
                    );
                  }}
                >
                  Add to Queue
                </button>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => {
                    dispatch(
                      setAppointmentModal({
                        show: true,
                        isAdd: true,
                        form: {
                          ...appointmentModal.form,
                          id_doctor,
                          id_patient: option.id_patient,
                        },
                      })
                    );
                  }}
                >
                  Add Appointment
                </button>
              </div>
            );
          }}
          placeholder="Search & Add Patients"
          className="globalSearchField"
          ref={globalSearchRef}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-primary btn-icon-text"
            onClick={() => {
              dispatch(setPatientModal({ ...patientModal, open: true }));
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
      <CreateAppointmentModal
        onHide={() => {
          dispatch(setAppointmentModal({ show: false }));
        }}
      />
      {patientModal.open && <AddEditPatientModal />}
    </>
  );
};

export default NavbarSearch;
