import React from "react";
import { Form } from "react-bootstrap";
import FormGroup from "./FormGroup";

const FormControl = React.forwardRef(
  (
    { formGroup, label, name, type = "text", withIcon = false, ...restProps },
    ref
  ) => {
    return (
      <FormGroup label={label} {...formGroup}>
        {withIcon && type === "text" ? (
          <div className="input-group">
            <div className="input-group-prepend bg-transparent">
              <span className="input-group-text bg-transparent border-right-0">
                <i className="ti-mobile text-primary"></i>
              </span>
            </div>
            <Form.Control ref={ref} name={name} type={type} {...restProps} />
          </div>
        ) : (
          <Form.Control ref={ref} name={name} type={type} {...restProps} />
        )}
      </FormGroup>
    );
  }
);

export default FormControl;
