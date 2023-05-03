import React from "react";
import { Form } from "react-bootstrap";
import { createUseStyles } from "react-jss";

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

const Field = ({
  label,
  name,
  inline = false,
  required = false,
  labelWidth = "90px",
  children,
}) => {
  const classes = useStyles({ inline: inline, labelWidth: labelWidth });
  return (
    <Form.Group
      className={`${inline ? `form-group-inline` : ""} ${classes.inputField}`}
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
    </Form.Group>
  );
};

export default Field;
