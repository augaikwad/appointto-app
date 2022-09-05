import React from "react";
import Select from "react-select";
import FormGroup from "./FormGroup";
import { Controller } from "react-hook-form";

const ReactSelect = React.forwardRef(
  ({ formGroup, label, name, control, ...restProps }, ref) => {
    return (
      <FormGroup label={label} {...formGroup}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Select {...field} {...restProps} />}
        />
      </FormGroup>
    );
  }
);

export default ReactSelect;
