import React from "react";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import Field from "./Field";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  reactSelectField: {
    "& > span": {
      display: "none !important",
    },
    "& > .react-creatableSelect__control": {
      minHeight: 32,
      borderRadius: "0.2rem",
      "&, &:hover": {
        borderColor: "#c9ccd7 !important",
      },
      "& .react-creatableSelect__value-container": {
        padding: "0px 8px",
        "& > .react-creatableSelect__placeholder": {
          fontSize: 14,
        },
        "& > .react-creatableSelect__multi-value": {
          "& > .react-creatableSelect__multi-value__label": {
            fontSize: "82%",
            padding: 2,
            paddingLeft: 5,
          },
          "& > .react-creatableSelect__multi-value__remove": {
            paddingLeft: 3,
            paddingRight: 2,
          },
        },
      },
    },
  },
});

const ReactSelectField = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  labelWidth,
  rules = {},
  labelField = "label",
  valueField = "value",
  isClearable = false,
  ...restProps
}) => {
  const classes = useStyles();
  const { control } = useFormContext();

  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: rules.hasOwnProperty("required"),
  };
  return (
    <Field {...fieldProps}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Select
              {...field}
              onChange={(val) => field.onChange(val)}
              getOptionValue={(option) => option[valueField]}
              getOptionLabel={(option) => option[labelField]}
              className={`${classes.reactSelectField} ${restProps?.className}`}
              components={{
                IndicatorSeparator: () => null,
              }}
              isClearable={isClearable}
              placeholder={placeholder}
              {...restProps}
            />
          );
        }}
      />
    </Field>
  );
};

export default ReactSelectField;
