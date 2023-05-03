import React from "react";
import Field from "./Field";
import { useFormContext } from "react-hook-form";

const CheckBoxField = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  required = false,
  labelWidth,
  rules = {},
  options = [],
  valueField = "value",
  labelField = "label",
  color = "primary",
  hideError = false,
  ...restProps
}) => {
  const { register } = useFormContext();

  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
    hideError: hideError,
  };
  return (
    <Field {...fieldProps}>
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
    </Field>
  );
};

export default CheckBoxField;
