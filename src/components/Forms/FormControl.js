import React from "react";
import { Form } from "bootstrap";

const FormControl = React.forwardRef(
  ({ label, children, ...restProps }, ref) => {
    console.log("FormControl === ", restProps);
    return (
      <Form.Group>
        <label>{label}</label>
      </Form.Group>
    );
  }
);

export default FormControl;
