import React, { useContext } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { ReactSelectField } from "../../../components/Forms";
import InputMask from "react-input-mask";
import MedicineNameField from "./MedicineNameField";
import { PrescriptionContext } from "../../../context/Prescription";
import { typeOptions, unitOptions } from "../../../utils/constants";

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

const TableRow = ({ index, field, register, remove }) => {
  return (
    <tr>
      <td>
        <input
          {...register(`items[${index}].name`)} // Use array syntax in register
          defaultValue={field.name} // Set default value for editing
        />
      </td>
      <td>
        <input
          {...register(`items[${index}].quantity`)} // Use array syntax in register
          defaultValue={field.quantity} // Set default value for editing
        />
      </td>
      <td>
        <button type="button" onClick={() => remove(index)}>
          Remove
        </button>
      </td>
    </tr>
  );
};

const NewMedTable = () => {
  const classes = useStyles();

  const [state, actions] = useContext(PrescriptionContext);
  const { rxGroups } = state;

  const { setValue, register, control } = useFormContext();
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
    const props = {
      objKey: key,
      index,
      name,
      obj: field,
      // isFilled,
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
    { field: "duration", label: "Duration", width: "120px" },
    { field: "note", label: "Notes", formatter: noteFormatter },
  ];

  return (
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
            console.log("fields == ", field);
            return (
              <tr
                key={`sr-${index}`}
                className={`${classes.td} ${classes.textCenter}`}
              >
                {headerColumns &&
                  headerColumns.map((col, ind) => {
                    const { formatter } = col;
                    const name = `prescribedMedicines[${index}].${col.field}`;
                    return (
                      <td key={col.field} className={`${classes.td}`}>
                        {formatter && typeof formatter === "function"
                          ? formatter({ name, index, key: col.field, field })
                          : col.field}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
          {/* {fields.map((field, index) => (
            <TableRow
              key={field.id}
              index={index}
              field={field}
              register={register}
              remove={remove}
            />
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default NewMedTable;
