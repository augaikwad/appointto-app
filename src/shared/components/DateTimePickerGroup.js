import React from "react";
import ReactDatePicker from "react-datepicker";
import FormGroup from "./FormGroup";
import { Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const DateTimePickerGroup = React.forwardRef(
  (
    {
      formGroup,
      label,
      name,
      control,
      dateFormat = "dd/MM/yyyy",
      placeholderText = "Select date",
      ...restProps
    },
    ref
  ) => {
    return (
      <FormGroup label={label} {...formGroup}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <ReactDatePicker
                {...field}
                dateFormat={dateFormat}
                placeholderText={placeholderText}
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                className="form-control form-control-sm"
                {...restProps}
              />
            );
          }}
        />
      </FormGroup>
    );
  }
);

export default DateTimePickerGroup;
