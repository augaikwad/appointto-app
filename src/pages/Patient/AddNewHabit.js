import React from "react";
import { Modal, InputField } from "../../components";

const AddNewHabit = ({ show = false, onHide = () => {}, footerActions }) => {
  return (
    <Modal
      title="Add New Habit"
      show={show}
      onHide={() => onHide()}
      size="sm"
      footerActions={footerActions}
    >
      <InputField label="Habit" name="habit" />
    </Modal>
  );
};

export default AddNewHabit;
