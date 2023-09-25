import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Field from "./Field";
import MaskedInput from "react-maskedinput";
import "react-datepicker/dist/react-datepicker.css";

const MaskedField = ({
  label,
  name,
  inline = false,
  labelWidth,
  mask = "",
  rules = {},
  ...restProps
}) => {
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
        render={({ field }) => (
          <MaskedInput
            {...field}
            mask={mask}
            className="form-control form-control-sm"
            {...restProps}
          />
        )}
      />
    </Field>
  );
};

export default MaskedField;
