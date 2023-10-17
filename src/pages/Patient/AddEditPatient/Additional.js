import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Modal, InputField } from "../../../components";
import {
  CheckBoxField,
  RadioField,
  CreatableReactSelect,
} from "../../../components/Forms";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { CheckBoxInput } from "./Medical";

const useStyles = createUseStyles({
  symptomsContainer: {
    "& > *": {
      display: "inline-block",
    },
  },
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
});

const Additional = () => {
  const classes = useStyles();

  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "habbits",
  });

  const [habbits, setHabbits] = useState([
    { label: "Tobacco Chewing", value: "tobacco" },
    { label: "Smoking", value: "smoking" },
    { label: "Alcohol", value: "alcohol" },
  ]);

  const HabitsLabel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newHabit, setNewHabit] = useState("");

    const FooterActions = () => {
      return (
        <Button
          className="btn btn-sm btn-primary"
          onClick={() => {
            if (newHabit !== "") {
              append({
                label: newHabit,
                value: newHabit.replace(/\s/g, "").toLowerCase(),
                checked: true,
              });
            }
            setIsOpen(false);
            setNewHabit("");
          }}
        >
          Save
        </Button>
      );
    };

    return (
      <>
        Habits
        <Button
          className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <i className="fa fa-plus"></i>
        </Button>
        <Modal
          title="Add New Habit"
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
          size="sm"
          footerActions={<FooterActions />}
        >
          <InputField
            name="habbit"
            onChange={(e) => {
              setNewHabit(e.target.value);
            }}
          />
        </Modal>
      </>
    );
  };

  return (
    <div className="row">
      <div className={`col-lg-12`}>
        <div className="form-group">
          <label>
            <HabitsLabel />
          </label>
          <div className="custom-form-check-inline">
            {fields.map((field, index) => {
              let name = `habbits[${index}].checked`;
              return (
                <CheckBoxInput
                  key={index}
                  name={name}
                  label={field.label}
                  checked={field.checked}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <RadioField
          label="Diet"
          name="diet"
          options={[
            { label: "Veg", value: "veg" },
            { label: "Non Veg", value: "nonVeg" },
            { label: "Mix", value: "mix" },
          ]}
        />
      </div>
      <div className="col-lg-6">
        <CreatableReactSelect label="Other" name="otherInfo" />
      </div>
    </div>
  );
};

export default Additional;
