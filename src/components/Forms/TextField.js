import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";

const TextField = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  required = false,
  labelWidth,
  register,
  rules = {},
  error = null,
  ...restProps
}) => {
  const errorClass = !!error ? "error" : "";
  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: required,
    classNames: errorClass,
  };
  return (
    <Field {...fieldProps}>
      <Form.Control
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        size={size}
        {...register(name, rules)}
        {...restProps}
      />
      {!!error && !!error.message && (
        <div className="invalid-feedback">{error.message}</div>
      )}
    </Field>
  );
};

export default TextField;
