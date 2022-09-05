import React from "react";
import InputMask from "react-input-mask";
import FormGroup from "./FormGroup";
import { Controller } from "react-hook-form";

const MaskedInput = React.forwardRef(
  ({ formGroup, label, name, control, mask = "", ...restProps }, ref) => {
    return (
      <FormGroup label={label} {...formGroup}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <InputMask {...field} mask={mask} className="form-control form-control-sm" {...restProps} />
          )}
        />
      </FormGroup>
    );
  }
);

export default MaskedInput;
