import React, { useState } from "react";
import { CheckBoxField, RadioField, TagsAutocomplete } from "../../components";
import AddNewDisease from "./AddNewDisease";
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

const Medical = () => {
  const [isAllergies, setIsAllergies] = useState(false);

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "terms" && value === "allergies") {
      setIsAllergies(checked);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // const DiseaseLabel = () => {
  //   const FooterActions = () => {
  //     return (
  //       <button
  //         className="btn btn-sm btn-primary"
  //         onClick={() => setIsOpen(false)}
  //       >
  //         Save
  //       </button>
  //     );
  //   };
  //   return (
  //     <>
  //       Disease
  //       <button
  //         className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
  //         onClick={() => setIsOpen(true)}
  //       >
  //         <i className="fa fa-plus"></i>
  //       </button>
  //       <AddNewDisease
  //         show={isOpen}
  //         onHide={() => setIsOpen(false)}
  //         footerActions={<FooterActions />}
  //       />
  //     </>
  //   );
  // };

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
      <AddNewDisease
        show={isOpen}
        onHide={() => setIsOpen(false)}
        footerActions={<FooterActions />}
      />
      <div className="row">
        <div className={`col-lg-12 ${classes.terms}`}>
          <CheckBoxField
            name="terms"
            options={[
              { label: "High BP", value: "highBP" },
              { label: "Low BP", value: "lowBP" },
              { label: "TB", value: "tb" },
              { label: "Asthma", value: "asthma" },
              { label: "Diabetes", value: "diabetes" },
              { label: "Allergies", value: "allergies" },
            ]}
            onChange={(e) => handleChange(e)}
          />
          <div style={{ lineHeight: "32px" }}>
            <button
              className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
              onClick={() => setIsOpen(true)}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        {isAllergies && (
          <div className="col-lg-6">
            <TagsAutocomplete
              label="Enter Allergies"
              name="allergies"
              // inline={true}
              // labelWidth="150px"
              tags={[]}
              //   handleAddition={(tag) => handleAddition("complaints", tag)}
              //   handleDelete={(i) => handleDelete("complaints", i)}
              placeholder="Add Allergies"
            />
          </div>
        )}
        <div className="col-lg-10">
          <RadioField
            label="Blood Group"
            name="bloodGroup"
            // labelWidth="auto"
            // inline={true}
            options={[
              { label: "A+", value: "A+" },
              { label: "A-", value: "A-" },
              { label: "B+", value: "B+" },
              { label: "B-", value: "B-" },
              { label: "AB+", value: "AB+" },
              { label: "AB-", value: "AB-" },
              { label: "O+", value: "O+" },
              { label: "O-", value: "O-" },
            ]}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-lg-6">
          <TagsAutocomplete
            label="Curerent Medications"
            name="complaints"
            // inline={true}
            // labelWidth="150px"
            tags={[]}
            //   handleAddition={(tag) => handleAddition("complaints", tag)}
            //   handleDelete={(i) => handleDelete("complaints", i)}
            placeholder="Add Tag"
          />
        </div>
      </div>
    </>
  );
};

export default Medical;
