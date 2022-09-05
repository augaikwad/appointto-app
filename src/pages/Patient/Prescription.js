import React, { useState } from "react";
import {
  InputField,
  TagsAutocomplete,
  DateTimeField,
  SelectField,
  Tooltip,
} from "../../components";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Alert } from "react-bootstrap";
import MedicinesTable from "./components/MedicinesTable";
import InvestigationsTags from "./components/InvestigationsTags";
import AdvicesTags from "./components/AdvicesTags";
import LastVisits from "./components/LastVisits";
import TextField from "../../components/Forms/TextField";
import AdvancedSelectField from "../../components/Forms/AdvancedSelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import AddNewVitalModal from "./components/AddNewVitalModal";
import ToothChartModal from "./components/ToothChartModal";

const lastVisitsData = [
  {
    date: new Date(),
    by: "Dr. Uday Bondre",
    complaints: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    observations: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    diagnosis: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    workDone: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    advice: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    investigations: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    medicines: [
      {
        type: "Tab",
        name: "Azithral 500",
        dose: "1-0-1",
        timing: "After Food",
        duration: "1 Week",
        notes: "-",
      },
      {
        type: "Cap",
        name: "Betacap TR 40",
        dose: "1-1-1",
        timing: "After Food",
        duration: "1 Week",
        notes: "-",
      },
    ],
  },
  {
    date: new Date("06/08/2022"),
    by: "Dr. Uday Bondre",
    complaints: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    observations: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    diagnosis: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    workDone: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    advice: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    investigations: [
      { id: 1, name: "Abc" },
      { id: 2, name: "Efg" },
    ],
    medicines: [
      {
        type: "Tab",
        name: "Azithral 500",
        dose: "1-0-1",
        timing: "After Food",
        duration: "1 Week",
        notes: "-",
      },
      {
        type: "Cap",
        name: "Betacap TR 40",
        dose: "1-1-1",
        timing: "After Food",
        duration: "1 Week",
        notes: "-",
      },
    ],
  },
];

const Prescription = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("Prescription onSubmit ===== ", data);

  const [complaintsTags, setComplaintsTags] = useState([]);
  const [observationsTags, setObservationsTags] = useState([]);
  const [topComplaintTags, setTopComplaintTags] = useState([
    { id: 1, name: "top 1" },
    { id: 2, name: "top 2" },
    { id: 3, name: "top 3" },
    { id: 4, name: "top 4" },
    { id: 5, name: "top 5" },
  ]);

  const [diagnosisTags, setDiagnosisTags] = useState([]);
  const [workDoneTags, setWorkDoneTags] = useState([]);

  const handleAddition = (name, tag) => {
    if (name === "complaints") {
      const tags = [].concat(complaintsTags, tag);
      setComplaintsTags(tags);
    } else if (name === "observations") {
      const tags = [].concat(observationsTags, tag);
      setObservationsTags(tags);
    }
  };

  const handleDelete = (name, i) => {
    if (name === "complaints") {
      const tags = complaintsTags.slice(0);
      tags.splice(i, 1);
      setComplaintsTags(tags);
    } else if (name === "observations") {
      const tags = observationsTags.slice(0);
      tags.splice(i, 1);
      setObservationsTags(tags);
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
      <Alert variant="danger">Patient Allergies content ......</Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-1">
            <h6 style={{ height: 32, lineHeight: "32px" }}>Vitals</h6>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-3">
                <TextField
                  label="BP/BP"
                  name="bp"
                  inline={true}
                  labelWidth="60px"
                  register={register}
                />
              </div>
              <div className="col-lg-3">
                <TextField
                  label="TEMP"
                  name="temp"
                  inline={true}
                  labelWidth="60px"
                  register={register}
                />
              </div>
              <div className="col-lg-3">
                <TextField
                  label="SPO2"
                  name="sp"
                  inline={true}
                  labelWidth="60px"
                  register={register}
                />
              </div>
              <div className="col-lg-3">
                <TextField
                  label="PR"
                  name="pr"
                  inline={true}
                  labelWidth="60px"
                  register={register}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-1">
            <Tooltip text="Add New Vital" placement="top">
              <button
                className="btn btn-sm btn-primary btn-icon"
                style={{ height: 32, width: 32 }}
                onClick={() => setShow(true)}
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
            {/* <AdvancedSelectField control={control} label="Complaints" name="test"/> */}
            <TagsAutocomplete
              name="complaints"
              label="Complaints"
              tags={complaintsTags}
              handleAddition={(tag) => handleAddition("complaints", tag)}
              handleDelete={(i) => handleDelete("complaints", i)}
              placeholder="Add Tag"
            />
            {topComplaintTags.length > 0 && (
              <div className="mb-3" style={{ marginTop: "-15px" }}>
                {topComplaintTags.map((tg, ind) => {
                  return (
                    <div
                      key={tg.id}
                      className="badge badge-primary mr-2 mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      {tg.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="col-lg-5">
            <TagsAutocomplete
              name="observations"
              label="Observations"
              tags={observationsTags}
              handleAddition={(tag) => handleAddition("observations", tag)}
              handleDelete={(i) => handleDelete("observations", i)}
              placeholder="Add Tag"
            />
            {topComplaintTags.length > 0 && (
              <div className="mb-3" style={{ marginTop: "-15px" }}>
                {topComplaintTags.map((tg, ind) => {
                  return (
                    <div
                      key={tg.id}
                      className="badge badge-primary mr-2 mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      {tg.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="col-lg-2">
            <div style={{ marginTop: 17 }}>
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
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <TagsAutocomplete
              name="diagnosis"
              label="Diagnosis"
              tags={diagnosisTags}
              handleAddition={(tag) => handleAddition("complaints", tag)}
              handleDelete={(i) => handleDelete("complaints", i)}
              placeholder="Add Tag"
            />
            {topComplaintTags.length > 0 && (
              <div className="mb-3" style={{ marginTop: "-15px" }}>
                {topComplaintTags.map((tg, ind) => {
                  return (
                    <div
                      key={tg.id}
                      className="badge badge-primary mr-2 mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      {tg.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="col-lg-5">
            <TagsAutocomplete
              name="workDone"
              label="Work Done"
              tags={workDoneTags}
              handleAddition={(tag) => handleAddition("observations", tag)}
              handleDelete={(i) => handleDelete("observations", i)}
              placeholder="Add Tag"
            />
            {topComplaintTags.length > 0 && (
              <div className="mb-3" style={{ marginTop: "-15px" }}>
                {topComplaintTags.map((tg, ind) => {
                  return (
                    <div
                      key={tg.id}
                      className="badge badge-primary mr-2 mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      {tg.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="col-lg-2">
            <div style={{ marginTop: 17 }}>
              <button className="btn btn-sm btn-link">
                <FontAwesomeIcon icon={faTooth} /> Chart
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h6>Medicines</h6>
            <MedicinesTable rxGroupData={lastVisitsData} />
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
                    <InputField name="nextVisit" placeholder="7" />
                  </div>
                  <div className="col-lg-7">
                    <SelectField
                      name="nextVisitType"
                      options={[
                        { label: "Days", value: "Days" },
                        { label: "Weeks", value: "Weeks" },
                        { label: "Months", value: "Months" },
                      ]}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <DateTimeField
                  label="Select Date"
                  name="nextVisit"
                  selected={nextVisit}
                  onChange={(date) => setNextVisit(date)}
                  withPortal={true}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12 text-center mt-4 pb-4">
            <Button variant="primary btn-sm" style={{ minWidth: 120 }}>
              Save & Print
            </Button>
            <Button
              variant="primary ml-3 btn-sm"
              style={{ minWidth: 120 }}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
            <Button variant="primary ml-3 btn-sm" style={{ minWidth: 120 }}>
              Save & Next
            </Button>
          </div>
        </div>
      </form>
      <LastVisits data={lastVisitsData} />
    </>
  );
};

export default Prescription;
