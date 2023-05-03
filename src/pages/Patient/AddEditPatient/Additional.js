import React, { useState } from "react";
import { Modal, InputField } from "../../../components";
import {
  CheckBoxField,
  RadioField,
  CreatableReactSelect,
} from "../../../components/Forms";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";

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
              let newHabitObj = {
                label: newHabit,
                value: newHabit.replace(/\s+/g, "").toLowerCase(),
              };
              setHabbits([...habbits, ...[newHabitObj]]);
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
        <CheckBoxField
          label={<HabitsLabel />}
          name="habbits"
          options={habbits}
        />
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
