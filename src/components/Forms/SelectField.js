import React from "react";
import Field from "./Field";
import { useFormContext } from "react-hook-form";

const SelectField = ({
  label,
  name,
  placeholder = null,
  inline = false,
  labelWidth,
  labelField = "label",
  valueField = "value",
  rules = {},
  options = [],
  optionRenderer,
  ...restProps
}) => {
  const { register } = useFormContext();

  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: rules.hasOwnProperty("required"),
  };

  return (
    <Field {...fieldProps}>
      <select
        className="form-control"
        {...register(name, rules)}
        {...restProps}
      >
        {placeholder !== null && <option value="">{placeholder}</option>}
        {options &&
          options.length > 0 &&
          options.map((opt, ind) => (
            <option key={ind} value={opt[valueField]}>
              {typeof optionRenderer === "function"
                ? optionRenderer(opt)
                : opt[labelField]}
            </option>
          ))}
      </select>
    </Field>
  );
};

export default SelectField;
