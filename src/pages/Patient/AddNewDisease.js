import React from "react";
import { Modal, InputField } from "../../components";

const AddNewDisease = ({ show = false, onHide = () => {}, footerActions }) => {
  return (
    <Modal
      title="Add New"
      show={show}
      onHide={() => onHide()}
      size="sm"
      footerActions={footerActions}
    >
      <InputField name="disease" />
    </Modal>
  );
};

export default AddNewDisease;
