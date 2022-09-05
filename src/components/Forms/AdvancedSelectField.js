import React from "react";
import Field from "./Field";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  react_select: {
    height: 32,
    "& > div": {
      minHeight: 32,
    },
  },
});

const customStyles = {
  // container:()=>({
  //     height:32
  // }),
  // control:()=>({
  //     minHeight:32
  // }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: () => ({
    padding: 5,
  }),
};

const AdvancedSelectField = ({
  label,
  name,
  tags = [],
  suggestions = [],
  allowNew = true,
  handleDelete = () => {},
  handleAddition = () => {},
  formGroupClasses = null,
  inline = false,
  labelWidth = "100px",
  control,
  required,
  ...restProps
}) => {
  const classes = useStyles();

  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
  };

  return (
    <Field {...fieldProps}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select
              {...field}
              classNamePrefix="select"
              styles={customStyles}
              options={[
                { id: 1, name: "test 1" },
                { id: 2, name: "test 2" },
              ]}
            />
          );
        }}
      />
    </Field>
  );
};

export default AdvancedSelectField;
