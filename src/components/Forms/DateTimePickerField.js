import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Field from "./Field";
import MaskedInput from "react-maskedinput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePickerField = ({
  label,
  name,
  placeholder = "",
  inline = false,
  labelWidth,
  dateFormat = "dd/MM/yyyy",
  rules = {},
  inputOnChange = () => {},
  defaultValue = null,
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
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          let newValue = !!value && value !== "" ? new Date(value) : null;
          return (
            <DatePicker
              onChange={(date) => {
                inputOnChange(date);
                onChange(date);
              }}
              selected={newValue}
              dateFormat={dateFormat}
              className={`form-control form-control-sm`}
              calendarClassName="form-control-calendar"
              wrapperClassName={`withIcon ${
                restProps.showTimeSelectOnly ? "time" : "calender"
              }`}
              placeholderText={placeholder}
              dropdownMode="select"
              customInput={
                restProps?.showTimeSelectOnly ? (
                  <MaskedInput mask="11:11AA" placeholder="h:mmAM" />
                ) : (
                  <MaskedInput mask="11/11/1111" placeholder={placeholder} />
                )
              }
              {...restProps}
            />
          );
        }}
      />
    </Field>
  );
};

export default DateTimePickerField;
