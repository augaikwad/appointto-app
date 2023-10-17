import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { InputField, Modal } from "../../../components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CreatableReactSelect, RadioField } from "../../../components/Forms";
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

export const CheckBoxInput = ({ label, name, checked, onChange }) => {
  const { register, setValue } = useFormContext();
  return (
    <div className={`form-check form-check-primary`}>
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          {...register(name)}
          defaultChecked={checked}
          onChange={(e) => {
            setValue(name, e.target.checked);
            if (onChange) {
              onChange(e);
            }
          }}
        />
        {label}
        <i className="input-helper"></i>
      </label>
    </div>
  );
};

const Medical = (props) => {
  const classes = useStyles();
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "medicalPrecondition",
  });
  const [isAllergies, setIsAllergies] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newTerm, setNewTerm] = useState("");

  const FooterActions = () => {
    return (
      <Button
        className="btn btn-sm btn-primary"
        onClick={() => {
          if (newTerm !== "" && newTerm.length > 0) {
            append({
              label: newTerm,
              value: newTerm.replace(/\s/g, "").toLowerCase(),
              checked: true,
            });
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
          <div className="form-group custom-form-check-inline">
            {fields.map((field, index) => {
              let name = `medicalPrecondition[${index}].checked`;
              return (
                <CheckBoxInput
                  key={index}
                  name={name}
                  label={field.label}
                  checked={field.checked}
                  onChange={(e) => {
                    if (field.value === "allergies") {
                      setIsAllergies(e.target.checked);
                    }
                  }}
                />
              );
            })}
          </div>
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
