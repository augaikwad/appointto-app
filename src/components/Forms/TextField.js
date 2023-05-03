import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";
import { useFormContext } from "react-hook-form";

const TextField = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  labelWidth,
  rules = {},
  ...restProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldProps = {
    label: label,
    name: name,
    inline: inline,
    labelWidth: labelWidth,
    required: rules.hasOwnProperty("required"),
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
    </Field>
  );
};

export default TextField;
