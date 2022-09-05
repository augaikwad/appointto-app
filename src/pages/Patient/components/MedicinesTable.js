import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AutocompleteField, Modal } from "../../../components";
import InputMask from "react-input-mask";
import MedicineNameField from "./MedicineNameField";
import CommonMedicineTable from "./CommonMedicineTable";

const useStyles = createUseStyles({
  tableContainer: {},
  th: {
    textAlign: "center",
    padding: "8px 10px !important",
    borderTop: "1px solid #c9ccd7 !important",
  },
  td: {
    padding: "0 !important",
    "& > div.form-group": {
      margin: "0 !important",
      "& .form-control": {
        border: "none !important",
      },
    },
    "&.no-border": {
      border: "none !important",
    },
    "& > .form-control": {
      border: "none !important",
      borderRadius: "0 !important",
    },
    "&.nameFilled": {
      position: "relative",
      "&:hover > button.nameEditBtn": {
        display: "block",
      },
      "& > button.nameEditBtn": {
        display: "none",
        position: "absolute",
        right: 0,
        top: 0,
        height: 20,
        width: 20,
        boxShadow: "none !important",
        "& > i.fa": {
          fontSize: "12px",
        },
      },
    },
  },
  removeBtn: {
    padding: "6px 8px",
  },
  btn: {
    marginLeft: 25,
    padding: 0,
    "&:first-child": {
      marginLeft: 0,
    },
  },
  tableFooter: {
    marginTop: 8,
    marginBottom: "1.5rem",
    fontSize: "0.875rem",
    textAlign: "right",
  },
  buttonMinWidth: {
    minWidth: 140,
  },
  groups: {
    background: "#f1f1f1",
    borderRadius: "5px",
    padding: 5,
    marginBottom: 15,
    "& > div.groupsHeader": {
      display: "flex",
      padding: "5px 8px",
      marginBottom: 10,
      " & > span:first-child": {
        flex: 1,
      },
    },
    "& > div.groupsBody": {
      padding: "5px 8px",
    },
  },
});

const initFields = {
  type: "",
  name: "",
  dose: "",
  timing: "",
  duration: "",
  notes: "",
};

const MedicinesTable = ({ rxGroupData }) => {
  const classes = useStyles();
  const [durationData, setDurationData] = useState([
    "Days",
    "Weeks",
    "Months",
    "Years",
  ]);
  const { setValue, control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      medicine: [initFields],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicine",
  });

  const headerColumns = [
    { field: "type", label: "Unit", width: "55px" },
    { field: "name", label: "Medicine", width: "30%" },
    { field: "dose", label: "Dose", width: "80px" },
    { field: "timing", label: "Timing", width: "120px" },
    { field: "duration", label: "Duration", width: "120px" },
    { field: "notes", label: "Notes" },
  ];

  const onSubmit = (data) => {
    console.log("onSubmit ==== ", data);
  };

  const getInputs = (key, obj, ind, isFilled) => {
    let name = `medicine[${ind}].${key}`;
    if (key === "name") {
      const props = {
        objKey: key,
        ind,
        name,
        obj,
        isFilled,
        control,
        setValue,
      };
      console.log("watch ====== ", watch(`medicine[${ind}]`));
      return (
        <MedicineNameField
          {...props}
          onChange={([val]) => {
            setValue(`medicine[${ind}]`, { ...obj, ...val });
            if (fields.length - 1 === ind) {
              append(initFields);
            }
          }}
        />
      );
    } else if (key === "dose") {
      return (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <InputMask
              {...field}
              mask="9-9-9"
              className="form-control no-border"
            />
          )}
        />
      );
    } else if (key === "timing") {
      return (
        <AutocompleteField
          id="TimingAutocomplete"
          name={name}
          control={control}
          className="medicinesAutocomplete"
          data={[
            {
              value: 1,
              name: "Before Food",
            },
            {
              value: 2,
              name: "After Food",
            },
          ]}
        />
      );
    } else if (key === "duration") {
      return (
        <AutocompleteField
          id="DurationAutocomplete"
          name={name}
          control={control}
          className="medicinesAutocomplete"
          data={durationData}
          minLength={1}
          inputProps={{ name: name }}
          onChange={(val) => setValue(name, val[0])}
          onInputChange={(val) => {
            if (!isNaN(val)) {
              let tempDur = [...durationData].map((data) => {
                let splitedText = data.trim().split(" ");
                let text = splitedText[splitedText.length - 1];
                let elem = val + " " + text;
                return elem;
              });
              setDurationData(tempDur);
            }
          }}
          onKeyDown={(e) => {
            const key = e.key;
            if (key == "Backspace") {
              console.log("onKeyDown if", key);
              setValue(name, "");
            }
          }}
        />
      );
    } else {
      return (
        <input
          type="text"
          className="form-control no-border"
          name={name}
          {...register(name)}
        />
      );
    }
  };

  const [rxGroupModalShow, setRxGroupModalShow] = useState(false);

  return (
    <>
      <div className={`table-responsive ${classes.tableContainer}`}>
        <table className="table table-bordered">
          <thead>
            <tr>
              {headerColumns &&
                headerColumns.map((col, ind) => {
                  return (
                    <th
                      key={col.field}
                      className={classes.th}
                      width={!!col.width ? col.width : "auto"}
                    >
                      {col.label}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {fields.map((field, ind) => {
              return (
                <tr key={ind}>
                  {Object.keys(field).length > 0 &&
                    Object.keys(field).map((objKey, objInd) => {
                      let isFilled = false;
                      if (objKey === "name" && !!field[objKey]) {
                        isFilled = true;
                      }
                      return (
                        <>
                          {objKey !== "id" && (
                            <td
                              key={objKey}
                              className={`${classes.td} ${
                                isFilled ? "nameFilled" : ""
                              }`}
                            >
                              {getInputs(objKey, field, ind, isFilled)}
                            </td>
                          )}
                        </>
                      );
                    })}
                  {fields.length > 0 && ind !== fields.length - 1 && (
                    <td
                      key={`action-${ind}`}
                      className={`${classes.td} no-border`}
                    >
                      <button
                        className={`btn btn-sm btn-link ${classes.removeBtn}`}
                        onClick={() => remove(ind)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.tableFooter}>
        <button className={`btn btn-sm btn-link ${classes.btn}`}>
          Save Rx Group
        </button>
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            setRxGroupModalShow(true);
          }}
        >
          Rx Group <i className="fa fa-angle-down"></i>
        </button>
        <button className={`btn btn-sm btn-link ${classes.btn}`}>
          Prev. Rx Group
        </button>
      </div>
      <Modal
        id="SelectRxGroupModal"
        title="Select Rx Group"
        size="lg"
        show={rxGroupModalShow}
        onHide={() => setRxGroupModalShow(false)}
      >
        {rxGroupData.length > 0 &&
          rxGroupData.map((group, ind) => {
            return (
              <div key={ind} className={classes.groups}>
                <div className="groupsHeader">
                  <span>Rx Group {ind + 1}</span>
                  <button
                    className={`btn btn-sm btn-link ${classes.btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      // const mergedTags = [].concat(
                      //   tags,
                      //   group.items
                      // );

                      // setTags(mergedTags);
                    }}
                  >
                    Select
                  </button>
                </div>
                <div className="groupsBody">
                  <CommonMedicineTable
                    columns={headerColumns}
                    data={group.medicines}
                  />
                </div>
              </div>
            );
          })}
      </Modal>
    </>
  );
};

export default MedicinesTable;
