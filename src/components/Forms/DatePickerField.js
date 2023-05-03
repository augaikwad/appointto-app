import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Field from "./Field";
import MaskedInput from "react-maskedinput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({
  label,
  name,
  placeholder = "DD/MM/YYYY",
  inline = false,
  labelWidth,
  dateFormat = "dd/MM/yyyy",
  rules = {},
  inputOnChange = () => {},
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
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              onChange={(date) => {
                inputOnChange(date);
                onChange(date);
              }}
              selected={value}
              dateFormat={dateFormat}
              className={`form-control form-control-sm`}
              calendarClassName="form-control-calendar"
              wrapperClassName={`withIcon ${
                restProps.showTimeSelectOnly ? "time" : "calender"
              }`}
              placeholderText={placeholder}
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
              customInput={
                <MaskedInput mask="11/11/1111" placeholder={placeholder} />
              }
              {...restProps}
            />
          );
        }}
      />
    </Field>
  );
};

export default DatePickerField;
