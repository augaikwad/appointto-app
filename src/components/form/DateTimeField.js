import React from "react";
import Field from "./Field";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateTimeField = ({
  label,
  name,
  placeholder = "",
  inline = false,
  required = false,
  labelWidth,
  dateFormat="dd/MM/yyyy",
  ...restProps
}) => {
  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
  };
  return (
    <Field {...fieldProps}>
      <DatePicker
        id={name}
        name={name}
        placeholder={placeholder}
        dateFormat={dateFormat}
        className="form-control form-control-sm"
        {...restProps}
      />
    </Field>
  );
};

export default DateTimeField;
