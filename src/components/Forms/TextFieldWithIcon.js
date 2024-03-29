import React from "react";
import { Form } from "react-bootstrap";
import Field from "./Field";
import { useFormContext } from "react-hook-form";
import { hasError } from "../../helpers/hasError";

const TextFieldWithIcon = ({
  label,
  name,
  type = "text",
  size = "sm",
  placeholder = "",
  inline = false,
  labelWidth,
  rules = {},
  icon = "ti-mobile",
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
      <div className="input-group">
        <div className="input-group-prepend bg-transparent">
          <span className="input-group-text bg-transparent border-right-0">
            <i className={`${icon} text-primary`}></i>
          </span>
        </div>
        <Form.Control
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          size={size}
          style={{ borderLeft: "none" }}
          {...register(name, rules)}
          {...restProps}
        />
      </div>
    </Field>
  );
};

export default TextFieldWithIcon;
