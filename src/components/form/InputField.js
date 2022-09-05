import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";

const InputField = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  required = false,
  labelWidth,
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
      <Form.Control
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        size={size}
        {...restProps}
      />
    </Field>
  );
};

export default InputField;
