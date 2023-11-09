import React, { useState, useEffect, useRef } from "react";
import { Tooltip, InputField, Modal } from "../../../components";
import Field from "../../../components/form/Field";
import Select from "react-select";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Button, Alert } from "react-bootstrap";
import ComplaintsTags from "../components/ComplaintsTags";
import ObservationTags from "../components/ObservationTags";
import DiagnosisTags from "../components/DiagnosisTags";
import WorkDoneTags from "../components/WorkDoneTags";
import MedicinesTable from "../components/MedicinesTable";
import InvestigationsTags from "../components/InvestigationsTags";
import AdvicesTags from "../components/AdvicesTags";
import LastVisits from "../components/LastVisits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
// import AddNewVitalModal from "../components/AddNewVitalModal";
import ToothChartModal from "../components/ToothChartModal";
import {
  TextField,
  SelectField,
  DatePickerField,
  MaskedField,
} from "../../../components/Forms";
import cogoToast from "cogo-toast";
import PrescriptionPrint from "../components/PrescriptionPrint";
import { useReactToPrint } from "react-to-print";
import { allowOnlyNumbers } from "../../../utils/common";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPrintingSetting } from "../../../store/actions/settingActions";
import {
  getPrescriptions,
  savePrescription,
} from "../../../store/actions/prescriptionActions";
import {
  getAppointmentById,
  updateAppointment,
  getDashboardAppointments,
} from "../../../store/actions/appointmentActions";
import { navigateTo } from "../../../store/reducers/navigationSlice";
import moment from "moment";

const toastOption = { hideAfter: 5, position: "top-right" };

const AddNewVitalModal = ({
  show = false,
  onHide = () => {},
  newVitalState,
  footerActions,
}) => {
  const [value, setValue] = useState(null);
  return (
    <Modal
      title="Add New Vital"
      show={show}
      onHide={() => {
        setValue(null);
        onHide();
      }}
      size="sm"
      footerActions={footerActions}
    >
      <Field label="Select Vital">
        <Select
          isSearchable={false}
          menuPosition="fixed"
          value={value}
          options={[
            { label: "Height", value: "height" },
            { label: "Weight", value: "weight" },
          ]}
          onChange={(val) => {
            newVitalState.setValue(val);
            setValue(val);
          }}
        />
      </Field>
    </Modal>
  );
};

const Prescription = () => {
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { patientById } = useSelector((state) => state.patients);
  const { prescriptionForm } = useSelector((state) => state.prescription);
  const { dashboardListFilters } = useSelector((state) => state.appointments);

  const printRef = useRef(null);
  const [printData, setPrintData] = useState([]);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [newVital, setNewVital] = useState(null);

  const location = useLocation();
  const { id_appointment } = location.state;

  useEffect(() => {
    dispatch(getPrintingSetting(id_doctor));
  }, []);

  const form = useForm({
    defaultValues: {
      ...prescriptionForm,
      vitals: [],
      prescribedMedicines: [
        {
          type: "",
          medicineName: "",
          dose: "",
          unit: "",
          timing: "",
          duration: "",
          note: "",
        },
      ],
    },
  });

  const { handleSubmit, reset, control, setValue, watch, formState } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "vitals",
  });

  useEffect(() => {
    if (patientById !== null) {
      const { medicalPrecondition } = patientById;
      setHasAllergies(medicalPrecondition.includes("allergies"));
    }
  }, [patientById]);

  const handleUpdateAppointment = () => {
    if (id_appointment && id_appointment > 0) {
      dispatch(
        getAppointmentById(id_appointment, (res) => {
          let req = { ...res };
          req.appointment_status = "Completed";
          dispatch(
            updateAppointment(req, () => {
              dispatch(getDashboardAppointments(dashboardListFilters));
            })
          );
        })
      );
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => {
      dispatch(
        navigateTo({
          pathname: "/patient/" + patientById.id_patient,
          state: {
            selectedTab: 2,
          },
        })
      );
    },
  });

  const onSubmit = (data, e) => {
    const formData = { ...data };
    formData.patientId = patientById.id_patient;
    const prescribedMed = [];
    if (data.prescribedMedicines.length === 1) {
      cogoToast.error("Please Enter Medicine Details", toastOption);
    } else {
      data.prescribedMedicines.forEach((med, ind) => {
        if (data.prescribedMedicines.length - 1 === ind) return true;
        let medObj = {
          MedicineName: med.medicineName.medicineName,
          Composition: med.medicineName.composition,
          Unit: med.unit.value,
          Type: med.type.value,
          medicineId: med.medicineName.medicineId,
          Dose: med.dose,
          Timing: med.timing.value,
          Duration: med.duration.value,
        };
        if (med.note !== "") {
          medObj.Note = med.note;
        }

        prescribedMed.push(medObj);
      });
      formData.prescribedMedicines = prescribedMed;

      if (formData.vitals.length > 0) {
        formData.vitals.forEach((vital) => {
          formData[vital.name] = vital.value;
        });
      }

      delete formData.vitals;

      dispatch(
        savePrescription(formData, (res) => {
          const btnId = e.target.id;
          handleUpdateAppointment();
          dispatch(getPrescriptions({ PatientId: res.patientId }));
          if (btnId === "SaveNext") {
            dispatch(
              navigateTo({
                pathname: "/patient/" + patientById.id_patient,
                state: {
                  selectedTab: 2,
                },
              })
            );
          } else if (btnId === "SavePrint") {
            setPrintData(res);
            handlePrint();
          }
          reset();
        })
      );
    }
  };

  const [show, setShow] = useState(false);
  const FooterActions = () => {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          if (newVital) {
            const isAlreadySelected = fields.some(
              (item) => item.name === newVital.value
            );
            if (!isAlreadySelected) {
              append({
                label: newVital.label,
                name: newVital.value.replace(/\s/g, "").toLowerCase(),
              });
              setNewVital(null);
              setShow(false);
            } else {
              cogoToast.error(
                "Vital already selected, Please select other option.",
                toastOption
              );
            }
          } else {
            cogoToast.error("Please select Vital", toastOption);
          }
        }}
      >
        Add
      </button>
    );
  };

  const [toothChartShow, setToothChartShow] = useState(false);

  const calculateNextVisitDays = (selectedDate) => {
    const startMoment = moment(new Date());
    const endMoment = moment(selectedDate);

    const daysDifference = endMoment.diff(startMoment, "days");
    const monthsDifference = endMoment.diff(startMoment, "months");
    const yearsDifference = endMoment.diff(startMoment, "years");

    if (daysDifference < 30) {
      console.log(`${daysDifference} day${daysDifference !== 1 ? "s" : ""}`);
    } else if (monthsDifference < 12) {
      return console.log(
        `${monthsDifference} month${monthsDifference !== 1 ? "s" : ""}`
      );
    } else {
      return console.log(
        `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""}`
      );
    }
  };

  return (
    <>
      {hasAllergies && (
        <Alert variant="danger">Patient Allergies content ......</Alert>
      )}
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-1">
              <h6 style={{ height: 32, lineHeight: "32px" }}>Vitals</h6>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-3">
                  <MaskedField
                    label="BP"
                    name="bp"
                    mask="111/111"
                    inline={true}
                    labelWidth="80px"
                  />
                </div>
                <div className="col-lg-3">
                  <TextField
                    label="TEMP"
                    name="tempratureInFahrenhiet"
                    inline={true}
                    labelWidth="80px"
                  />
                </div>
                <div className="col-lg-3">
                  <TextField
                    label="SPO2"
                    name="oxizenSaturation"
                    inline={true}
                    labelWidth="80px"
                  />
                </div>
                <div className="col-lg-3">
                  <TextField
                    label="PR"
                    name="pr"
                    inline={true}
                    labelWidth="80px"
                  />
                </div>
              </div>
              <div className="row">
                {fields.map((field, index) => {
                  return (
                    <div className="col-lg-3">
                      <TextField
                        label={field.label}
                        name={`vitals.${index}.value`}
                        inline={true}
                        labelWidth="80px"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-1">
              <Tooltip text="Add New Vital" placement="top">
                <button
                  className="btn btn-sm btn-primary btn-icon"
                  style={{ height: 32, width: 32 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(true);
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </Tooltip>
              <AddNewVitalModal
                show={show}
                onHide={() => setShow(false)}
                newVitalState={{
                  value: newVital,
                  setValue: setNewVital,
                }}
                footerActions={<FooterActions />}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5">
              <ComplaintsTags />
            </div>
            <div className="col-lg-5">
              <ObservationTags />
            </div>
            <div className="col-lg-2">
              {/* <div style={{ marginTop: 17 }}>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => setToothChartShow(true)}
                >
                  <FontAwesomeIcon icon={faTooth} /> Chart
                </button>
                <ToothChartModal
                  show={toothChartShow}
                  onHide={() => setToothChartShow(false)}
                />
              </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5">
              <DiagnosisTags />
            </div>
            <div className="col-lg-5">
              <WorkDoneTags />
            </div>
            <div className="col-lg-2">
              {/* <div style={{ marginTop: 17 }}>
                <button className="btn btn-sm btn-link">
                  <FontAwesomeIcon icon={faTooth} /> Chart
                </button>
              </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h6>Medicines</h6>
              <MedicinesTable {...{ control, setValue }} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-lg-6">
                  <AdvicesTags />
                </div>
                <div className="col-lg-6">
                  <InvestigationsTags />
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-lg-6">
                  <label
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1,
                      verticalAlign: "top",
                      marginBottom: 0,
                      fontWeight: 500,
                    }}
                  >
                    Next Visit After
                    {/* <span style={{ color: "red", marginLeft: "2px" }}>*</span> */}
                  </label>
                  <div className="row">
                    <div className="col-lg-5">
                      <TextField
                        name="nextVisitAfter"
                        placeholder="7"
                        onKeyPress={allowOnlyNumbers}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(value) && value > 0) {
                            setValue(
                              "nextVisitDate",
                              new Date(
                                moment().add(
                                  value,
                                  watch("nextVisitUnit").toLowerCase()
                                )
                              )
                            );
                          } else {
                            setValue("nextVisitDate", new Date());
                          }
                        }}
                      />
                    </div>
                    <div className="col-lg-7">
                      <SelectField
                        name="nextVisitUnit"
                        options={[
                          { label: "Days", value: "Days" },
                          { label: "Weeks", value: "Weeks" },
                          { label: "Months", value: "Months" },
                        ]}
                        onChange={(e) => {
                          const value = e.target.value;
                          const nextVisit = watch("nextVisitAfter");
                          if (!isNaN(nextVisit) && nextVisit > 0) {
                            setValue(
                              "nextVisitDate",
                              new Date(
                                moment().add(nextVisit, value.toLowerCase())
                              )
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <DatePickerField
                    label="Select Date"
                    name="nextVisitDate"
                    inputOnChange={(val) => {
                      calculateNextVisitDays(val);
                      return val;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center mt-4 pb-4">
              <Button
                id="SavePrint"
                variant="primary btn-sm"
                style={{ minWidth: 120 }}
                onClick={handleSubmit(onSubmit)}
              >
                Save & Print
              </Button>
              <Button
                id="Save"
                variant="primary ml-3 btn-sm"
                style={{ minWidth: 120 }}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
              <Button
                id="SaveNext"
                variant="primary ml-3 btn-sm"
                style={{ minWidth: 120 }}
                onClick={handleSubmit(onSubmit)}
              >
                Save & Next
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
      <PrescriptionPrint ref={printRef} data={printData} />
      <LastVisits />
    </>
  );
};

export default Prescription;
