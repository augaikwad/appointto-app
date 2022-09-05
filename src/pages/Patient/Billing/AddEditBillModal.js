import React, { useState } from "react";
import {
  Modal,
  InputField,
  SelectField,
  DateTimeField,
} from "../../../components";
import { Form } from "react-bootstrap";

const AddEditBillModal = ({ show, title, onHide }) => {
  const [isPercent, setIsPercent] = useState(false);
  const [date, setDate] = useState(new Date());
  const getFooterAction = () => {
    return (
      <>
        <button className="btn btn-sm btn-primary" onClick={onHide}>
          Save
        </button>
        <button className="btn btn-sm btn-secondary ml-2" onClick={onHide}>
          Cancel
        </button>
      </>
    );
  };
  return (
    <Modal
      title={title}
      show={show}
      size="md"
      onHide={onHide}
      footerActions={getFooterAction()}
    >
      <form>
        <div className="row">
          <div className="col-lg-6">
            <DateTimeField
              label="Date"
              name="date"
              selected={date}
              onChange={(date) => setDate(date)}
            />
            {/* <InputField label="Date" name="date" type="date" /> */}
          </div>
          <div className="col-lg-6">
            <InputField label="Dr. Name" name="drName" />
          </div>
          <div className="col-lg-6">
            <InputField label="Name of Treatment" name="treatment" />
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <InputField label="Qty" name="qty" />
              </div>
              <div className="col-lg-6">
                <InputField label="Rate" name="rate" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <InputField label="Amount" name="amount" />
          </div>
          <div className="col-lg-6">
            <Form.Group>
              <label style={{ marginBottom: 0 }}>Discount</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <button
                    className={`btn btn-sm ${
                      isPercent ? "btn-secondary" : "btn-primary"
                    }`}
                    onClick={() => setIsPercent(false)}
                  >
                    <i className="fa fa-inr"></i>
                  </button>
                </div>
                <Form.Control
                  type="text"
                  className={`form-control ${isPercent ? "text-right" : ""}`}
                  name="discount"
                />
                <div className="input-group-append">
                  <button
                    className={`btn btn-sm ${
                      isPercent ? "btn-primary" : "btn-secondary"
                    }`}
                    onClick={() => setIsPercent(true)}
                  >
                    <i className="fa fa-percent"></i>
                  </button>
                </div>
              </div>
            </Form.Group>
          </div>
          <div className="col-lg-6">
            <InputField label="Payment Recieved" name="recieved" />
          </div>
          <div className="col-lg-6">
            <SelectField
              label="Payment Mode"
              name="mode"
              options={[
                { label: "Select", value: null },
                { label: "Card", value: "card" },
                { label: "UPI", value: "upi" },
                { label: "Cash", value: "cash" },
              ]}
              placeholder="Select"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditBillModal;
