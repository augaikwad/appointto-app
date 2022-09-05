import React from "react";
import { Modal, InputField } from "../../../components";

const AddNewVitalModal = ({
  show = false,
  onHide = () => {},
  footerActions,
}) => {
  return (
    <Modal
      title="Add New Vital"
      show={show}
      onHide={() => onHide()}
      size="sm"
      footerActions={footerActions}
    >
      <InputField label="Enter Vital Name" name="newVital" />
    </Modal>
  );
};

export default AddNewVitalModal;
