import React from "react";
import FormGroup from "./FormGroup";

const CheckboxGroup = React.forwardRef(
  (
    {
      formGroup,
      label,
      name,
      options = [],
      color = "primary",
      labelField = "label",
      valueField = "value",
      register,
      ...restProps
    },
    ref
  ) => {
    return (
      <FormGroup label={label} {...formGroup}>
        <div className="custom-form-check-inline">
          {options.length > 0 &&
            options.map((item, ind) => {
              return (
                <div key={ind} className={`form-check form-check-${color}`}>
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      name={name}
                      className="form-check-input"
                      value={item[valueField]}
                      {...register(name)}
                      {...restProps}
                    />
                    {item[labelField]}
                    <i className="input-helper"></i>
                  </label>
                </div>
              );
            })}
        </div>
      </FormGroup>
    );
  }
);

export default CheckboxGroup;
