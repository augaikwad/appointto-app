import React from "react";
import CreatableSelect from "react-select/creatable";
import FormGroup from "./FormGroup";
import { Controller } from "react-hook-form";

const CreatableReactSelect = React.forwardRef(
  ({ formGroup, label, name, control, ...restProps }, ref) => {
    return (
      <FormGroup label={label} {...formGroup}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <CreatableSelect isMulti {...field} {...restProps} />
          )}
        />
      </FormGroup>
    );
  }
);

export default CreatableReactSelect;
