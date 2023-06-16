import React, { useState, useContext } from "react";
import { createUseStyles } from "react-jss";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { AutocompleteField, Modal } from "../../../components";
import { ReactSelectField } from "../../../components/Forms";
import InputMask from "react-input-mask";
import MedicineNameField from "./MedicineNameField";
import CommonMedicineTable from "./CommonMedicineTable";
import { PrescriptionContext } from "../../../context/Prescription";

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
  reactSelect: { "& > div": { border: "none", boxShadow: "none" } },
  textCenter: { textAlign: "center" },
});

const unitOptions = [
  { label: "mg", value: "mg" },
  { label: "mcg", value: "mcg" },
  { label: "ml", value: "ml" },
  { label: "IU", value: "IU" },
  { label: "g", value: "g" },
  { label: "ug", value: "ug" },
  { label: "tsp", value: "tsp" },
  { label: "drps", value: "drps" },
  { label: "units", value: "units" },
  { label: "tab", value: "tab" },
  { label: "cap", value: "cap" },
  { label: "puffs", value: "puffs" },
];

const typeOptions = [
  { label: "TAB", value: "TAB" },
  { label: "SYP", value: "SYP" },
  { label: "CRM", value: "CRM" },
  { label: "POW", value: "POW" },
  { label: "INJ", value: "INJ" },
  { label: "CAP", value: "CAP" },
  { label: "DRP", value: "DRP" },
  { label: "SUS", value: "SUS" },
  { label: "LIQ", value: "LIQ" },
  { label: "SAC", value: "SAC" },
  { label: "EXP", value: "EXP" },
  { label: "OIN", value: "OIN" },
  { label: "GEN", value: "GEN" },
  { label: "LOT", value: "LOT" },
  { label: "GEL", value: "GEL" },
  { label: "GRA", value: "GRA" },
  { label: "SOAP", value: "SOAP" },
  { label: "SOL", value: "SOL" },
  { label: "VAC", value: "VAC" },
  { label: "PAS", value: "PAS" },
  { label: "INH", value: "INH" },
  { label: "OTH", value: "OTH" },
  { label: "SPR", value: "SPR" },
];

const initFields = {
  type: "",
  medicineName: "",
  dose: "",
  unit: "",
  timing: "",
  duration: "",
  notes: "",
};

const headerColumns = [
  { field: "sr", label: "#", width: "20px" },
  { field: "type", label: "Type", width: "60px" },
  { field: "medicineName", label: "Medicine", width: "30%" },
  { field: "dose", label: "Dose", width: "80px" },
  { field: "unit", label: "Unit", width: "80px" },
  { field: "timing", label: "Timing", width: "120px" },
  { field: "duration", label: "Duration", width: "120px" },
  { field: "note", label: "Notes" },
];

const selectModalHeaderColumns = [
  { field: "sr", label: "#", width: "20px" },
  { field: "type", label: "Type", width: "60px" },
  {
    field: "medicineName",
    label: "Medicine",
    width: "30%",
    formatter: (rowData, cellValue) => {
      return (
        <div>
          <div>{cellValue.medicineName}</div>
          <div>{cellValue.composition}</div>
        </div>
      );
    },
  },
  { field: "dose", label: "Dose", width: "80px" },
  { field: "unit", label: "Unit", width: "80px" },
  { field: "timing", label: "Timing", width: "120px" },
  { field: "duration", label: "Duration", width: "120px" },
  { field: "note", label: "Notes" },
];

const CreateGroupModal = ({
  open = false,
  onCreateGroup = () => {},
  onHide = () => {},
}) => {
  const [groupName, setGroupName] = useState("");

  const callback = () => {
    setGroupName("");
    onHide();
  };

  const FooterActions = () => {
    return (
      <div className="text-right">
        <Button
          disabled={groupName.length === 0}
          className="btn btn-sm btn-primary"
          onClick={() => onCreateGroup(groupName, callback)}
        >
          Create
        </Button>
      </div>
    );
  };
  return (
    <Modal
      title="Create Group"
      show={open}
      onHide={onHide}
      size="sm"
      footerActions={<FooterActions />}
    >
      <Form.Group>
        <label>Group Name</label>
        <Form.Control
          type="text"
          placeholder="Enter Group Name"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </Form.Group>
    </Modal>
  );
};

const MedicinesTable = ({ rxGroupData, control }) => {
  const classes = useStyles();

  const [state, actions] = useContext(PrescriptionContext);
  const { rxGroups } = state;
  const [durationData, setDurationData] = useState([
    "Days",
    "Weeks",
    "Months",
    "Years",
  ]);

  const { setValue, register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescribedMedicines",
  });

  const [open, setOpen] = useState(false);

  const getInputs = (key, obj, ind, isFilled) => {
    let name = `prescribedMedicines[${ind}].${key}`;
    if (key === "type") {
      return (
        <ReactSelectField
          name={name}
          options={typeOptions}
          menuPortalTarget={document.body}
          className={classes.reactSelect}
          placeholder=""
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      );
    } else if (key === "medicineName") {
      const props = {
        objKey: key,
        ind,
        name,
        obj,
        isFilled,
        control,
        setValue,
      };
      return (
        <MedicineNameField
          {...props}
          onChange={(val) => {
            setValue(name, val);
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
    } else if (key === "unit") {
      return (
        <ReactSelectField
          name={name}
          options={unitOptions}
          menuPortalTarget={document.body}
          className={classes.reactSelect}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      );
    } else if (key === "timing") {
      return (
        <ReactSelectField
          name={name}
          options={[
            {
              value: "Beforefood",
              label: "Before Food",
            },
            {
              value: "Afterfood",
              label: "After Food",
            },
          ]}
          menuPortalTarget={document.body}
          className={classes.reactSelect}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
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
                  <td
                    key={`sr-${ind}`}
                    className={`${classes.td} ${classes.textCenter}`}
                  >
                    {ind + 1}
                  </td>
                  {Object.keys(field).length &&
                    Object.keys(field).map((objKey, objInd) => {
                      let isFilled = false;
                      if (objKey === "medicineName" && !!field[objKey]) {
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
        <CreateGroupModal
          open={open}
          onCreateGroup={(groupName, callback) => {
            const medicinesArray = watch("prescribedMedicines");
            const slicedArray = medicinesArray.slice(0, -1);

            let request = {
              id_doctor: parseInt(localStorage.getItem("id_doctor")),
              rxGroupName: groupName,
            };
            let group = [];
            slicedArray.forEach((item) => {
              const { duration, note, timing, dose, unit, type } = item;
              const { medicineName, composition, medicineId } =
                item.medicineName;
              let groupItem = {
                medicineName: medicineName,
                composition: composition,
                medicineId: medicineId,
                unit: unit.value,
                type: type.value,
                dose,
                timing: timing.value,
                duration,
                note,
              };
              group.push(groupItem);
            });
            request.RxGroupPrescribedMedicine = group;
            actions.saveRxGroup(request, () => {
              if (callback && typeof callback === "function") {
                callback();
              }
            });
          }}
          onHide={() => setOpen(false)}
        />
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Save Rx Group
        </button>
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            actions.getRxGroups(() => {
              setRxGroupModalShow(true);
            });
          }}
        >
          Rx Group <i className="fa fa-angle-down"></i>
        </button>
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
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
        {rxGroups.length > 0 &&
          rxGroups.map((group, ind) => {
            return (
              <div key={group.rxGroupId} className={classes.groups}>
                <div className="groupsHeader">
                  <span>{group.rxGroupName}</span>
                  <button
                    className={`btn btn-sm btn-link ${classes.btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const formattedValue = [];
                      group.rxGroupPrescribedMedicine.forEach((med) => {
                        formattedValue.push({
                          type: med.type,
                          medicineName: med.medicineName,
                          dose: med.dose,
                          unit: med.unit,
                          timing: med.timing,
                          duration: med.duration,
                          note: med.note,
                        });
                      });

                      formattedValue.push(initFields);
                      setValue("prescribedMedicines", formattedValue);
                      setRxGroupModalShow(false);
                    }}
                  >
                    Select
                  </button>
                </div>
                <div className="groupsBody">
                  <CommonMedicineTable
                    columns={selectModalHeaderColumns}
                    data={group.rxGroupPrescribedMedicine}
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
