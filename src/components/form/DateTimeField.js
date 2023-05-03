import React, { useRef } from "react";
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
  dateFormat = "dd/MM/yyyy",
  ...restProps
}) => {
  const datepickerRef = useRef(null);

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
        calendarClassName="form-control-calendar"
        ref={datepickerRef}
        {...restProps}
      />
      <i
        className="fa fa-calendar"
        style={{
          position: "absolute",
          right: "8px",
          bottom: "8px",
          color: "#707070",
          pointer: "curser",
        }}
        onClick={() => {
          const datepickerElement = datepickerRef.current;
          datepickerElement.setFocus(true);
        }}
      ></i>
    </Field>
  );
};

export default DateTimeField;
