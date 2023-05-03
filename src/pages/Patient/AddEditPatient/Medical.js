import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { InputField, Modal } from "../../../components";

import {
  CreatableReactSelect,
  RadioField,
  CheckBoxField,
} from "../../../components/Forms";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  smAddBtn: {
    padding: 3,
    fontSize: 8,
    marginLeft: "13px",
    borderRadius: "50%",
    height: 20,
    width: 20,
    textAlign: "center",
    "& > .fa": {
      fontSize: "13px",
    },
  },
  terms: {
    display: "flex",
    alignItems: "flex-start",
  },
});

const Medical = (props) => {
  const classes = useStyles();

  const [isAllergies, setIsAllergies] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [newTerm, setNewTerm] = useState("");

  const [terms, setTerms] = useState([
    { label: "High BP", value: "highBP" },
    { label: "Low BP", value: "lowBP" },
    { label: "TB", value: "tb" },
    { label: "Asthma", value: "asthma" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Allergies", value: "allergies" },
  ]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "medicalPrecondition" && value === "allergies") {
      setIsAllergies(checked);
    }
  };

  const FooterActions = () => {
    return (
      <Button
        className="btn btn-sm btn-primary"
        onClick={() => {
          if (newTerm !== "") {
            let newTermObj = { label: newTerm, value: newTerm.toLowerCase() };
            setTerms([...terms, ...[newTermObj]]);
          }
          setIsOpen(false);
          setNewTerm("");
        }}
      >
        Save
      </Button>
    );
  };

  return (
    <>
      <Modal
        title="Add New"
        show={isOpen}
        onHide={() => setIsOpen(false)}
        size="sm"
        footerActions={<FooterActions />}
      >
        <InputField
          name="newTerm"
          onChange={(e) => setNewTerm(e.target.value)}
        />
      </Modal>
      <div className="row">
        <div className={`col-lg-12 ${classes.terms}`}>
          <CheckBoxField
            name="medicalPrecondition"
            options={terms}
            onChange={(e) => handleChange(e)}
          />

          <div style={{ lineHeight: "32px" }}>
            <Button
              className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
              onClick={(e) => {
                setIsOpen(true);
              }}
            >
              <i className="fa fa-plus"></i>
            </Button>
          </div>
        </div>
        {isAllergies && (
          <div className="col-lg-6">
            <CreatableReactSelect label="Enter Allergies" name="allergies" />
          </div>
        )}
        <div className="col-lg-10">
          <RadioField
            label="Blood Group"
            name="blood_group"
            options={[
              { label: "A+", value: "A+ve" },
              { label: "A-", value: "A-ve" },
              { label: "B+", value: "B+ve" },
              { label: "B-", value: "B-ve" },
              { label: "AB+", value: "AB+ve" },
              { label: "AB-", value: "AB-ve" },
              { label: "O+", value: "O+ve" },
              { label: "O-", value: "O-ve" },
            ]}
          />
        </div>
        <div className="col-lg-6">
          <CreatableReactSelect
            label="Curerent Medications"
            name="current_medicine"
          />
        </div>
      </div>
    </>
  );
};

export default Medical;
