import React from "react";
import CreatableSelect from "react-select/creatable";
import { Controller, useFormContext } from "react-hook-form";
import Field from "./Field";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  creatableSelect: {
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

const CreatableReactSelect = ({
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
  isMulti = true,
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
        render={({ field }) => {
          return (
            <CreatableSelect
              isMulti={isMulti}
              {...field}
              getOptionValue={(option) => option[valueField]}
              getOptionLabel={(option) => option[labelField]}
              className={classes.creatableSelect}
              classNamePrefix="react-creatableSelect"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              isClearable={isClearable}
              {...restProps}
            />
          );
        }}
      />
    </Field>
  );
};

export default CreatableReactSelect;
