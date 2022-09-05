import React from "react";
import Field from './Field';

const SelectField = ({
  label,
  name,
  options = [],
  valueField = "value",
  labelField = "label",
  labelWidth = "100px",
  inline = false,
  required
}) => {

  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
  };

  return (
    <Field {...fieldProps}>
      <select className="form-control" id={name} name={name}>
        {options &&
          options.length > 0 &&
          options.map((opt, ind) => (
            <option key={ind} value={opt[valueField]}>
              {opt[labelField]}
            </option>
          ))}
      </select>
    </Field>
  );
};

export default SelectField;
