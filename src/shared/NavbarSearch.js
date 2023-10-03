import React, { useContext, useEffect, useRef } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import { createUseStyles } from "react-jss";
import CreateAppointmentModal from "../pages/Patient/CreateAppointmentModal";
import AddEditPatientModal from "../pages/Patient/AddEditPatient/AddEditPatientModal";
import { PatientContext } from "../context/Patient";
import { AppointmentContext } from "../context/Appointment";
import moment from "moment";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentModal } from "../store/reducers/appointmentsSlice";
import { createAppointment } from "../store/actions/appointmentActions";

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
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { appointmentForm } = useSelector((state) => state.appointments);

  const [state, actions] = useContext(PatientContext);
  const { globalPatientList } = state;
  const [aptState, aptActions] = useContext(AppointmentContext);
  const { canResetSearchBox } = aptState;

  // useEffect(() => {
  //   actions.getGlobalList();
  // }, []);

  const handleDebounceChange = debounce((val) => {
    actions.getGlobalList(val);
  }, 1000);

  useEffect(() => {
    if (canResetSearchBox) {
      // ref.current?.clear();
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
        <AsyncTypeahead
          labelKey="patient_name"
          filterBy={["patient_name", "mobile_number"]}
          id="globalSearch"
          name="globalSearch"
          onSearch={handleDebounceChange}
          options={globalPatientList || []}
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

                    dispatch(
                      createAppointment(req, () => {
                        aptActions.getAppointmentByDoctor();
                      })
                    );
                    // aptActions.createAppointment(req, () => {
                    //   // ref.current?.clear();
                    //   aptActions.getAppointmentByDoctor();
                    // });
                  }}
                >
                  Add to Queue
                </button>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => {
                    // aptActions.setAppointmentForm({
                    //   id_patient: option.id_patient,
                    //   id_doctor: localStorage.getItem("id_doctor"),
                    // });
                    // aptActions.setAppointmentModal({ show: true });
                    let form = appointmentForm.form;
                    dispatch(
                      setAppointmentModal({
                        show: true,
                        form: {
                          ...form,
                          id_patient: option.id_patient,
                          id_doctor,
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
          ref={ref}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-primary btn-icon-text"
            onClick={() => {
              actions.setPatientModal({ open: true });
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
      <AddEditPatientModal />
    </>
  );
};

export default NavbarSearch;
