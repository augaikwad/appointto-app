import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PatientContext } from "../../../context/Patient";
import { AppointmentContext } from "../../../context/Appointment";
import VerticalTabs from "../../../components/VerticalTabs";
import Modal from "../../../components/Modal";
import { Button } from "react-bootstrap";
import General from "./General";
import Medical from "./Medical";
import Additional from "./Additional";
import Documents from "./Documents";
import { createUseStyles } from "react-jss";
import { FormProvider, useForm } from "react-hook-form";
import {
  getFormattedValueForRequest,
  formattedObjForSetForm,
} from "./dataFormatter";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setPatientModal } from "../../../store/reducers/patientSlice";
import {
  addPatientGeneralInfo,
  updatePatientGeneralInfo,
} from "../../../store/actions/patientActions";
import {
  createAppointment,
  getDashboardAppointments,
} from "../../../store/actions/appointmentActions";

const useStyles = createUseStyles({
  buttonMinWidth: {
    minWidth: 140,
  },
});

const AddEditPatientModal = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const { id_doctor, id_clinic } = useSelector((state) => state.user.details);
  const { patientModal } = useSelector((state) => state.patients);
  const { dashboardListFilters } = useSelector((state) => state.appointments);

  console.log("patientModal === ", patientModal.formValue);

  const [state, actions] = useContext(PatientContext);
  const { activeTab } = state;
  const { open, isAdd, formValue } = patientModal;

  const [aptState, aptActions] = useContext(AppointmentContext);
  const { appointmentForm } = aptState;
  const form = useForm({
    defaultValues: formattedObjForSetForm(formValue),
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset(formattedObjForSetForm(formValue));
  }, [formValue]);

  const callback = (response) => {
    reset(formattedObjForSetForm(response));
    actions.setActiveTab(activeTab + 1);
  };

  const handleSave = (data) => {
    let formData = { ...data };
    formData = getFormattedValueForRequest(data);
    formData.id_clinic = id_clinic;

    if (formValue.id_patient === 0) {
      dispatch(addPatientGeneralInfo(formData, callback));
    } else {
      dispatch(updatePatientGeneralInfo(formData, callback));
    }
  };

  const addToQueue = (obj) => {
    let currentDate = new Date();
    let req = { ...appointmentForm, ...obj };
    req.date = moment(currentDate).format("YYYY-MM-DD");
    req.day = moment(currentDate).format("dddd");
    req.reason = "Consultation";
    req.id_doctor = id_doctor;
    dispatch(
      createAppointment(req, () => {
        if (["/dashboard", "/"].includes(location.pathname)) {
          dispatch(getDashboardAppointments(dashboardListFilters));
        }
      })
    );
  };

  const handleAddToQueue = (data) => {
    let formData = { ...data };
    formData = getFormattedValueForRequest(data);
    formData.id_clinic = localStorage.getItem("id_clinic");
    if (formValue.id_patient === 0) {
      dispatch(
        addPatientGeneralInfo(formData, (response) => {
          dispatch(
            setPatientModal({
              ...patientModal,
              formValue: response,
            })
          );
          aptActions.setAppointmentForm({
            id_patient: response.id_patient,
          });
          addToQueue({ id_patient: response.id_patient });
        })
      );
    } else {
      addToQueue({ id_patient: formValue.id_patient });
    }
    actions.getGlobalList();
  };

  const handleAddAppointment = (data) => {
    let formData = { ...data };
    formData = getFormattedValueForRequest(data);
    formData.id_clinic = localStorage.getItem("id_clinic");
    if (formValue.id_patient === 0) {
      actions.addPatientGeneralInfo(formData, (response) => {
        dispatch(
          setPatientModal({
            ...patientModal,
            formValue: response,
          })
        );

        aptActions.setAppointmentForm({
          id_patient: response.id_patient,
        });
        aptActions.setAppointmentModal({ show: true });
      });
    } else {
      aptActions.setAppointmentModal({ show: true });
    }
    actions.getGlobalList();
  };

  const onSubmit = (data, e) => {
    const { name } = e.target;
    if (name === "save") {
      handleSave(data);
    } else if (name === "addToQueue") {
      handleAddToQueue(data);
    } else if (name === "addAppointment") {
      handleAddAppointment(data);
    }
  };

  const ModalFooterActions = () => {
    return (
      <>
        <div className="col-lg-3"></div>
        <div className="col-lg-9 d-flex">
          <div style={{ flex: "1" }}>
            <Button
              name="addToQueue"
              variant="primary mr-2 btn-sm"
              className={classes.buttonMinWidth}
              onClick={handleSubmit(onSubmit)}
            >
              Add to Queue
            </Button>
            <Button
              name="addAppointment"
              variant="primary btn-sm"
              className={classes.buttonMinWidth}
              onClick={handleSubmit(onSubmit)}
            >
              Add Appointment
            </Button>
          </div>
          <div>
            {activeTab >= 1 && (
              <Button
                variant="primary mr-2 btn-sm"
                className={classes.buttonMinWidth}
                onClick={() => actions.setActiveTab(activeTab - 1)}
              >
                Previous
              </Button>
            )}
            {tabs.length - 1 !== activeTab && (
              <Button
                name="save"
                variant="primary btn-sm"
                className={classes.buttonMinWidth}
                onClick={handleSubmit(onSubmit)}
              >
                Save & Next
              </Button>
            )}
            {tabs.length === activeTab + 1 && (
              <Button
                variant="primary btn-sm"
                className={classes.buttonMinWidth}
                onClick={() => {
                  actions.setActiveTab(0);
                  dispatch(setPatientModal({ open: false }));
                  actions.getGlobalList();
                  if (!isAdd) {
                    actions.getPatientById(formValue.id_patient);
                  }
                  if (["/dashboard", "/"].includes(location.pathname)) {
                    aptActions.getAppointmentByDoctor();
                  }
                }}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </>
    );
  };

  const tabs = [
    { name: "General", component: <General /> },
    { name: "Medical", component: <Medical /> },
    { name: "Additional", component: <Additional /> },
    { name: "Documents", component: <Documents /> },
  ];

  return (
    <>
      <Modal
        title={`${isAdd ? "Add" : "Update"} Patient`}
        show={open}
        onHide={() => {
          actions.setActiveTab(0);
          dispatch(setPatientModal({ open: false }));
          if (!isAdd) {
            actions.getPatientById(formValue.id_patient);
          }
        }}
        dialogClassName="modal-1030px"
        footerActions={<ModalFooterActions />}
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VerticalTabs tabs={tabs} selectedTab={activeTab} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddEditPatientModal;
