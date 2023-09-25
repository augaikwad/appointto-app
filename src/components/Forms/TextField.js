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
  onKeyDown,
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

  const handleOnKeyDown = (e) => {
    if (type === "number") {
      const preventKeys = ["e", "E", "-", "+"];
      if (preventKeys.includes(e.key)) {
        e.preventDefault();
      }
    }

    if (onKeyDown) {
      onKeyDown();
    }
  };

  return (
    <Field {...fieldProps}>
      <Form.Control
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        size={size}
        onKeyDown={handleOnKeyDown}
        {...register(name, rules)}
        {...restProps}
      />
    </Field>
  );
};

export default TextField;
