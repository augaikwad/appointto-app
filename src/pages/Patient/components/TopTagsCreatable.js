import React, { useContext } from "react";
import { CreatableReactSelect } from "../../../components/Forms";
import { PrescriptionContext } from "../../../context/Prescription";
import { useFormContext } from "react-hook-form";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  badge: {
    padding: "4px 5px",
    cursor: "pointer",
    margin: "0 4px 4px 0",
  },
});

const TopTagsCreatable = ({
  label,
  name,
  options = [],
  valueField,
  topFive = [],
  addNewCallback = () => {},
}) => {
  const classes = useStyles();
  const { setValue, getValues } = useFormContext();

  const [state, actions] = useContext(PrescriptionContext);

  const setNewValue = (newVal) => {
    let values = getValues(name) || [];
    setValue(name, [...values, ...[newVal]]);
  };

  const callback = (res) => {
    addNewCallback();
    setNewValue(res);
  };

  return (
    <>
      <CreatableReactSelect
        label={label}
        name={name}
        options={options}
        labelField="name"
        valueField={valueField}
        getNewOptionData={(value, label) => {
          return {
            name: label,
            [valueField]: value,
          };
        }}
        onCreateOption={(val) => {
          let req = {
            [valueField]: 0,
            name: val,
            is_new: true,
            id_doctor: localStorage.getItem("id_doctor"),
            count: 0,
          };
          actions.saveUpdateTag(name, req, callback);
        }}
      />

      {topFive.length > 0 && (
        <div className="mb-3" style={{ marginTop: "-15px" }}>
          {topFive.map((tg, ind) => {
            return (
              <div
                key={tg[valueField]}
                className={`badge badge-primary ${classes.badge}`}
                onClick={() => {
                  setNewValue(tg);
                }}
              >
                {tg.name}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TopTagsCreatable;
