import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";

const CheckBoxField = ({
  label,
  name,
  options = [],
  valueField = "value",
  labelField = "label",
  labelWidth = "100px",
  inline = false,
  inputMinWidth = "80px",
  required,
  ...restProps
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
              id={`${name}_${ind}`}
              value={opt[valueField]}
              style={{minWidth:inputMinWidth}}
              {...restProps}
            />
          ))}
      </div>
    </Field>
  );
};

export default CheckBoxField;
