import React, { useState, useContext, useEffect, useRef } from "react";
import { Tooltip } from "../../../components";
import { useForm, FormProvider } from "react-hook-form";
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
import AddNewVitalModal from "../components/AddNewVitalModal";
import ToothChartModal from "../components/ToothChartModal";
import {
  TextField,
  SelectField,
  DatePickerField,
} from "../../../components/Forms";
import { useHistory } from "react-router-dom";
import { PrescriptionContext } from "../../../context/Prescription";
import { PatientContext } from "../../../context/Patient";
import { SettingsContext } from "../../../context/Settings";
import cogoToast from "cogo-toast";
import PrescriptionPrint from "../components/PrescriptionPrint";
import { useReactToPrint } from "react-to-print";
import { allowOnlyNumbers } from "../../../utils/common";
import moment from "moment";

const toastOption = { hideAfter: 5, position: "top-right" };

const Prescription = () => {
  const history = useHistory();
  const printRef = useRef(null);
  const [printData, setPrintData] = useState([]);
  const [hasAllergies, setHasAllergies] = useState(false);

  const [state, actions] = useContext(PrescriptionContext);
  const { prescriptionForm, allPrescriptions } = state;

  const [patientState, patientActions] = useContext(PatientContext);
  const { patientData } = patientState;

  const [settingsState, settingsActions] = useContext(SettingsContext);

  useEffect(() => {
    settingsActions.getPrintingSetting();
  }, []);

  const form = useForm({
    defaultValues: {
      ...prescriptionForm,
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

  const { handleSubmit, reset, control, setValue, watch } = form;

  useEffect(() => {
    if (patientData !== null) {
      const { medicalPrecondition } = patientData;
      setHasAllergies(medicalPrecondition.includes("allergies"));
    }
  }, [patientData]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onSubmit = (data, e) => {
    const formData = { ...data };
    formData.patientId = patientData.id_patient;
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
          Duration: med.duration,
        };
        if (med.note !== "") {
          medObj.Note = med.note;
        }

        prescribedMed.push(medObj);
      });
      formData.prescribedMedicines = prescribedMed;

      actions.savePrescription(formData, (res) => {
        const btnId = e.target.id;
        actions.getPrescriptions({ PatientId: res.patientId });
        if (btnId === "SaveNext") {
          history.push({
            pathname: "/patient/" + patientData.id_patient,
            state: {
              selectedTab: 2,
            },
          });
        } else if (btnId === "SavePrint") {
          setPrintData(res);
          handlePrint();
        }
        reset();
      });
    }
  };

  const [nextVisit, setNextVisit] = useState(new Date());

  const [show, setShow] = useState(false);
  const FooterActions = () => {
    return (
      <button className="btn btn-sm btn-primary" onClick={() => setShow(false)}>
        Save
      </button>
    );
  };

  const [toothChartShow, setToothChartShow] = useState(false);

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
                  <TextField
                    label="BP"
                    name="bp"
                    inline={true}
                    labelWidth="60px"
                  />
                </div>
                <div className="col-lg-3">
                  <TextField
                    label="TEMP"
                    name="tempratureInFahrenhiet"
                    inline={true}
                    labelWidth="60px"
                    // rules={{
                    //   required: true,
                    // }}
                  />
                </div>
                <div className="col-lg-3">
                  <TextField
                    label="SPO2"
                    name="oxizenSaturation"
                    inline={true}
                    labelWidth="60px"
                    // rules={{
                    //   required: true,
                    // }}
                  />
                </div>
                <div className="col-lg-3">
                  <TextField
                    label="PR"
                    name="pr"
                    inline={true}
                    labelWidth="60px"
                  />
                </div>
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
                              new Date(moment().add(value, "days"))
                            );
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
                        placeholder="Select"
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
                  <DatePickerField label="Select Date" name="nextVisitDate" />
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
