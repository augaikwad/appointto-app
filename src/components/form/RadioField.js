import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";

const RadioField = ({
  label,
  name,
  options = [],
  valueField = "value",
  labelField = "label",
  labelWidth = "100px",
  inline = false,
  radioInlineType = true,
  required,
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
      <div className="custom-form-check-inline">
        {options &&
          options.length > 0 &&
          options.map((opt, ind) => (
            <Form.Check
              key={ind}
              inline
              label={opt[labelField]}
              name={name}
              type="radio"
              id={`${name}_${ind}`}
              value={opt[valueField]}
            />
          ))}
      </div>
    </Field>
  );
};

export default RadioField;
