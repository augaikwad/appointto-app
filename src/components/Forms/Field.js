import React from "react";
import { Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { useFormContext } from "react-hook-form";
import { hasError } from "../../helpers/hasError";
import clsx from "clsx";

const useStyles = createUseStyles({
  label: {
    marginBottom: "0 !important",
    paddingRight: 2,
  },
  inlineLabel: {
    width: (props) => props.labelWidth,
    textAlign: (props) => props.textAlign,
    paddingRight: 10,
  },
  inputField: {
    position: "relative",
    "&.form-group-inline": {
      display: "flex",
      alignItems: "flex-start",
      lineHeight: "32px",
    },
  },
});

const Field = React.forwardRef(
  (
    {
      label,
      name,
      inline = false,
      required = false,
      labelWidth = "90px",
      hideError = false,
      children,
    },
    ref
  ) => {
    const classes = useStyles({ inline: inline, labelWidth: labelWidth });

    const {
      formState: { errors },
    } = useFormContext();
    const error = hasError(name, errors);

    return (
      <Form.Group
        className={clsx(classes.inputField, {
          "form-group-inline": inline,
          error: Boolean(error),
        })}
      >
        {label && (
          <label
            htmlFor={name}
            className={`${
              inline ? `inline-label ${classes.inlineLabel}` : classes.label
            }`}
          >
            {label}
            {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
          </label>
        )}
        {children}

        {!hideError && error && error.message.length > 0 && (
          <div className="invalid-feedback">{error.message}</div>
        )}
      </Form.Group>
    );
  }
);

export default Field;
