import React from "react";
import { useLocation } from "react-router-dom";
import VerticalTabs from "../../../components/VerticalTabs";
import Modal from "../../../components/Modal";
import { Button } from "react-bootstrap";
import General from "./General";
import Medical from "./Medical";
import Additional from "./Additional";
import Documents from "./Documents";
import { createUseStyles } from "react-jss";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setPatientModal,
  setActiveTab,
  initialState,
} from "../../../store/reducers/patientSlice";
import {
  addPatientGeneralInfo,
  updatePatientGeneralInfo,
  getPatientById,
} from "../../../store/actions/patientActions";
import {
  createAppointment,
  getDashboardAppointments,
} from "../../../store/actions/appointmentActions";
import {
  setAppointmentModal,
  initialState as aptInitState,
} from "../../../store/reducers/appointmentsSlice";

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
  const { patientModal, activeTab, patientById } = useSelector(
    (state) => state.patients
  );
  const { dashboardListFilters, appointmentModal } = useSelector(
    (state) => state.appointments
  );

  const { open, isAdd, formValue } = patientModal;
  const form = useForm({
    defaultValues: formValue,
  });

  const { handleSubmit, reset } = form;

  const refreshDashboardList = () => {
    if (["/dashboard", "/"].includes(location.pathname)) {
      dispatch(getDashboardAppointments(dashboardListFilters));
    }
  };

  const callback = (response) => {
    dispatch(
      setPatientModal({
        ...patientModal,
        formValue: { ...formValue, id_patient: response.id_patient },
      })
    );
    dispatch(setActiveTab(activeTab + 1));

    if (location.pathname === `/patient/${response.id_patient}`) {
      dispatch(getPatientById({ PatientId: response.id_patient }));
    }
  };

  const handleSave = (data) => {
    let formData = { ...data };
    formData.id_clinic = id_clinic;
    formData.id_patient = formValue.id_patient;
    if (formValue.id_patient === 0) {
      dispatch(addPatientGeneralInfo(formData, callback));
    } else {
      dispatch(updatePatientGeneralInfo(formData, callback));
    }
  };

  const addToQueue = (obj) => {
    let currentDate = new Date();
    let req = { ...appointmentModal.form, ...obj };
    req.date = moment(currentDate).format("YYYY-MM-DD");
    req.day = moment(currentDate).format("dddd");
    req.reason = "Consultation";
    req.id_doctor = id_doctor;
    dispatch(
      createAppointment(req, (res) => {
        refreshDashboardList();
        dispatch(
          setPatientModal({
            ...patientModal,
            formValue: { ...formValue, id_patient: res.id_patient },
          })
        );
      })
    );
  };

  const handleAddToQueue = (data) => {
    let formData = { ...data };
    formData.id_clinic = id_clinic;
    if (formValue.id_patient === 0) {
      dispatch(
        addPatientGeneralInfo(formData, (response) => {
          addToQueue({ id_patient: response.id_patient });
        })
      );
    } else {
      addToQueue({ id_patient: formValue.id_patient });
    }
  };

  const handleAddAppointment = (data) => {
    let formData = { ...data };
    formData.id_clinic = id_clinic;

    if (formValue.id_patient === 0) {
      dispatch(
        addPatientGeneralInfo(formData, (response) => {
          dispatch(
            setPatientModal({
              ...patientModal,
              formValue: { ...formValue, id_patient: response.id_patient },
            })
          );
          dispatch(
            setAppointmentModal({
              ...aptInitState.appointmentModal,
              isAdd: true,
              show: true,
              form: {
                ...aptInitState.appointmentModal.form,
                id_patient: response.id_patient,
                id_doctor: id_doctor,
              },
            })
          );
        })
      );
    } else {
      dispatch(
        setAppointmentModal({
          ...aptInitState.appointmentModal,
          isAdd: true,
          show: true,
        })
      );
    }
    refreshDashboardList();
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
                onClick={() => dispatch(setActiveTab(activeTab - 1))}
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
                  dispatch(setActiveTab(0));
                  dispatch(setPatientModal({ open: false }));
                  refreshDashboardList();
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
          dispatch(setPatientModal({ open: false }));
          reset(initialState.patientModal.formValue);
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
