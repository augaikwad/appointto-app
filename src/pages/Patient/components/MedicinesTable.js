import React, { useContext, useEffect, useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { ReactSelectField } from "../../../components/Forms";
import InputMask from "react-input-mask";
import MedicineNameField from "./MedicineNameField";
import CommonMedicineTable from "./CommonMedicineTable";
import { AutocompleteField, Modal } from "../../../components";
import { PrescriptionContext } from "../../../context/Prescription";
import { typeOptions, unitOptions } from "../../../utils/constants";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getRxGroups,
  saveRxGroup,
} from "../../../store/actions/prescriptionActions";

const toastOption = { hideAfter: 5, position: "top-right" };

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

const initFields = {
  type: "",
  medicineName: "",
  dose: "",
  unit: "",
  timing: "",
  duration: "",
  notes: "",
};

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

const timingOptions = [
  {
    value: "Beforefood",
    label: "Before Food",
  },
  {
    value: "Afterfood",
    label: "After Food",
  },
];

const NewMedTable = ({ control, setValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id_doctor } = useSelector((state) => state.user.details);
  const { rxGroups } = useSelector((state) => state.prescription);

  const [open, setOpen] = useState(false);
  const [rxGroupModalShow, setRxGroupModalShow] = useState(false);

  const [state, actions] = useContext(PrescriptionContext);

  useEffect(() => {
    dispatch(getRxGroups(id_doctor));
  }, []);

  const [durationData, setDurationData] = useState([
    "Days",
    "Weeks",
    "Months",
    "Years",
  ]);

  const { register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prescribedMedicines",
  });

  const typeFormatter = ({ name }) => {
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
  };

  const medicineNameFormatter = ({ name, index, key, field }) => {
    let isFilled = false;
    if (!!field[key]) {
      isFilled = true;
    }

    const props = {
      objKey: key,
      index,
      name,
      obj: field,
      isFilled,
      control,
      setValue,
    };
    return (
      <MedicineNameField
        {...props}
        onChange={(val) => {
          setValue(name, val);
          if (fields.length - 1 === index) {
            append(initFields);
          }
        }}
      />
    );
  };

  const doseFormatter = ({ name }) => {
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
  };

  const unitFormatter = ({ name }) => {
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
  };

  const timingFormatter = ({ name }) => {
    return (
      <ReactSelectField
        name={name}
        options={timingOptions}
        menuPortalTarget={document.body}
        className={classes.reactSelect}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    );
  };

  const durationFormatter = ({ name }) => {
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
            setValue(name, "");
          }
        }}
      />
    );
  };

  const noteFormatter = ({ name }) => {
    return (
      <input
        type="text"
        className="form-control no-border"
        name={name}
        {...register(name)}
      />
    );
  };

  const headerColumns = [
    {
      field: "sr",
      label: "#",
      width: "20px",
      formatter: ({ index }) => {
        return index + 1;
      },
    },
    {
      field: "type",
      label: "Type",
      width: "60px",
      formatter: typeFormatter,
    },
    {
      field: "medicineName",
      label: "Medicine",
      width: "30%",
      formatter: medicineNameFormatter,
    },
    { field: "dose", label: "Dose", width: "80px", formatter: doseFormatter },
    { field: "unit", label: "Unit", width: "80px", formatter: unitFormatter },
    {
      field: "timing",
      label: "Timing",
      width: "120px",
      formatter: timingFormatter,
    },
    {
      field: "duration",
      label: "Duration",
      width: "120px",
      formatter: durationFormatter,
    },
    { field: "note", label: "Notes", formatter: noteFormatter },
  ];

  const setGroupToForm = (group) => {
    const formattedValue = [];
    group.rxGroupPrescribedMedicine.forEach((med, index) => {
      formattedValue.push({
        type: {
          label: med.type,
          value: med.type,
        },
        medicineName: med.medicineName,
        dose: med.dose,
        unit: {
          label: med.unit,
          value: med.unit,
        },
        timing: timingOptions.filter((item) => item.value === med.timing)[0],
        duration: med.duration,
        note: med.note,
      });
    });

    formattedValue.push(initFields);
    setValue("prescribedMedicines", formattedValue);
  };

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
            {fields.map((field, index) => {
              return (
                <tr
                  key={`${field.id}`}
                  className={`${classes.td} ${classes.textCenter}`}
                >
                  {headerColumns &&
                    headerColumns.map((col, ind) => {
                      const { formatter } = col;
                      const name = `prescribedMedicines[${index}].${col.field}`;

                      let isFilled = false;
                      if (col.field === "medicineName" && !!field[col.field]) {
                        isFilled = true;
                      }

                      return (
                        <td
                          key={col.field}
                          className={`${classes.td} ${
                            isFilled ? "nameFilled" : ""
                          }`}
                        >
                          {formatter && typeof formatter === "function"
                            ? formatter({
                                name,
                                index,
                                key: col.field,
                                field,
                              })
                            : col.field}
                        </td>
                      );
                    })}
                  {fields.length > 0 && index !== fields.length - 1 && (
                    <td
                      key={`action-${index}`}
                      className={`${classes.td} no-border`}
                    >
                      <button
                        className={`btn btn-sm btn-link ${classes.removeBtn}`}
                        onClick={() => remove(index)}
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
            dispatch(
              saveRxGroup(request, () => {
                if (callback && typeof callback === "function") {
                  callback();
                }
              })
            );
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
            setRxGroupModalShow(true);
          }}
        >
          Rx Group <i className="fa fa-angle-down"></i>
        </button>
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            const isPreviousGroup = rxGroups.filter((item) => item.isPrevious);
            if (isPreviousGroup && isPreviousGroup.length) {
              setGroupToForm(isPreviousGroup[0]);
            } else {
              cogoToast.warn("No Previos Rx. Group found", toastOption);
            }
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
                      setGroupToForm(group);
                      setRxGroupModalShow(false);
                      actions.setPreviousPrescription(group.rxGroupId, () => {
                        dispatch(getRxGroups(id_doctor));
                      });
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

export default NewMedTable;
