import React, { useState } from "react";
import { CheckBoxField, RadioField, TagsAutocomplete } from "../../components";
import { createUseStyles } from "react-jss";
import AddNewHabit from "./AddNewHabit";

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

  const HabitsLabel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const FooterActions = () => {
      return (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setIsOpen(false)}
        >
          Save
        </button>
      );
    };
    return (
      <>
        Habits
        <button
          className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
          onClick={() => setIsOpen(true)}
        >
          <i className="fa fa-plus"></i>
        </button>
        <AddNewHabit
          show={isOpen}
          onHide={() => setIsOpen(false)}
          footerActions={<FooterActions />}
        />
      </>
    );
  };

  return (
    <div className="row">
      <div className={`col-lg-6`}>
        <CheckBoxField
          label={<HabitsLabel />}
          name="habits"
          // labelWidth="100px"
          // inline={true}
          options={[
            { label: "Tobacco Chewing", value: "tobacco" },
            { label: "Smoking", value: "smoking" },
            { label: "Alcohol", value: "alcohol" },
          ]}
        />
      </div>
      <div className="col-lg-10">
        <RadioField
          label="Diet"
          name="diet"
          // labelWidth="100px"
          // inline={true}
          options={[
            { label: "Veg", value: "veg" },
            { label: "Non Veg", value: "nonVeg" },
            { label: "Mix", value: "mix" },
          ]}
        />
      </div>
      <div className="col-lg-6">
        <TagsAutocomplete
          label="Other"
          name="other"
          // inline={true}
          // labelWidth="100px"
          tags={[]}
          //   handleAddition={(tag) => handleAddition("complaints", tag)}
          //   handleDelete={(i) => handleDelete("complaints", i)}
          placeholder="Add Tag"
        />
      </div>
    </div>
  );
};

export default Additional;
