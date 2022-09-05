import React from "react";
import { Form } from "react-bootstrap";

const FormGroup = ({ label, inline = false, children }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};

export default FormGroup;
