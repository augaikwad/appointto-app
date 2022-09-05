import React, { useState } from "react";
import { InputField, SelectField, Tooltip } from "../../../components";
import { Form, Alert } from "react-bootstrap";
import { format } from "date-fns";
import CommonBillingList from "./CommonBillingList";
import AddEditBillModal from "./AddEditBillModal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  th: {
    padding: "6px 0 !important",
    "&.noBorder": {
      borderTop: 0,
    },
  },
  td: {
    padding: "6px 0 !important",
    "&.noBorder": {
      borderTop: 0,
    },
    "&.balance": {
      color: "red",
    },
  },
  cardContent: {
    padding: "8px 15px",
    "& > .row": {
      alignItems: "center",
      "& > .field": {
        display: "flex",
        justifyContent: "center",
        "& .btn": {
          padding: "5px 8px !important",
        },
      },
    },
    "& div.form-group": {
      marginBottom: 0,
      "& > label": {
        marginBottom: "0px",
      },
      "& > div": {
        fontSize: "14px",
      },
      "&.inline-form-group": {
        display: "flex",
        alignItems: "flex-start",
        textAlign: "left",
        "& > label": {
          paddingRight: 8,
          lineHeight: "17px",
        },
      },
    },
    "& .borderLeft": {
      borderLeft: "1px solid #60a1eb",
    },
  },
  switch: {
    display: "flex",
    justifyContent: "center",
  },
  listActionBtn: {
    padding: "5px !important",
    height: "25px !important",
    width: "25px !important",
    marginLeft: 5,
    "&:first-child": {
      marginLeft: 0,
    },
  },
});

const data = [
  {
    id: 1,
    date: "2022/06/10",
    drName: "Doctor Name",
    treatmentName: "Tratment Name",
    status: true,
    rate: 2500,
    qty: 1,
    discount: 0,
    amount: 2000,
    balance: 1000,
  },
  {
    id: 2,
    date: "2022/06/9",
    drName: "Doctor Name",
    treatmentName: "Tratment Name",
    status: false,
    rate: 1000,
    qty: 1,
    discount: 0,
    amount: 500,
    balance: 500,
  },
  {
    id: 3,
    date: "2022/06/8",
    drName: "Doctor Name",
    treatmentName: "Tratment Name",
    status: true,
    rate: 1500,
    qty: 1,
    discount: 0,
    amount: 1000,
    balance: 500,
  },
];

const billModalInit = {
  title: "Add Bill",
  show: false,
  data: null,
};

const AddBill = () => {
  const classes = useStyles();
  const [isPercent, setIsPercent] = useState(false);

  const [billModal, setBillModal] = useState(billModalInit);

  const getDateFormatted = (cell, row) => {
    return format(new Date(cell), "dd/MM/yyyy");
  };

  const getAmountFormatter = (cell, row) => {
    return <div className="text-right">{`Rs ${cell}`}</div>;
  };

  const [val, setVal] = useState(false);

  const getStatusFormatter = (cell, row) => {
    return (
      <Form.Check
        type="switch"
        id="custom-switch"
        label=""
        checked={val}
        className={classes.switch}
        onChange={(e) => {
          setVal(e.target.checked);
        }}
      />
    );
  };

  const getActionFormatter = (cell, row) => {
    return (
      <div>
        <Tooltip text="Add Payment" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
          >
            <i className="fa fa-plus"></i>
          </button>
        </Tooltip>
        <Tooltip text="Edit Bill" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
          >
            <i className="fa fa-pencil"></i>
          </button>
        </Tooltip>
        <Tooltip text="Print" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
          >
            <i className="fa fa-print"></i>
          </button>
        </Tooltip>
        <Tooltip text="Delete Payment" placement="auto">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-danger btn-icon`}
          >
            <i className="fa fa-trash"></i>
          </button>
        </Tooltip>
      </div>
    );
  };

  const columns = [
    {
      dataField: "date",
      text: "Date",
      headerAttrs: {
        width: 90,
      },
      formatter: getDateFormatted,
    },
    { dataField: "drName", text: "Dr. Name" },
    { dataField: "treatmentName", text: "Treatment Name" },
    {
      dataField: "status",
      text: "Completed",
      headerAlign: "center",
      formatter: getStatusFormatter,
      align: "center",
      headerAttrs: {
        width: 85,
      },
    },
    {
      dataField: "rate",
      text: "Rate",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
      headerAttrs: {
        width: 80,
      },
    },
    { dataField: "qty", text: "Qty", headerAlign: "center", align: "center" },
    {
      dataField: "discount",
      text: "Discount",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
      headerAttrs: {
        width: 80,
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
      headerAttrs: {
        width: 80,
      },
    },
    {
      dataField: "balance",
      text: "Balance",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
      headerAttrs: {
        width: 80,
      },
    },
    {
      dataField: "id",
      text: "",
      formatter: getActionFormatter,
      align: "right",
      headerAttrs: {
        width: 130,
      },
    },
  ];

  return (
    <>
      <AddEditBillModal
        {...billModal}
        onHide={() => {
          setBillModal(billModalInit);
        }}
      />
      <div className="row">
        <div className="col-lg-9 hide">
          <div
            className="row"
            style={{ background: "#f1f1f1", paddingTop: 15 }}
          >
            <div className="col-lg-3">
              <InputField label="Date" name="date" type="date" />
            </div>
            <div className="col-lg-3">
              <InputField label="Dr. Name" name="drName" />
            </div>
            <div className="col-lg-3">
              <InputField label="Name of Treatment" name="treatment" />
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="col-lg-6">
                  <InputField label="Qty" name="qty" />
                </div>
                <div className="col-lg-6">
                  <InputField label="Rate" name="rate" />
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <InputField label="Amount" name="amount" />
            </div>
            <div className="col-lg-3">
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
            <div className="col-lg-3">
              <InputField label="Payment Recieved" name="recieved" />
            </div>
            <div className="col-lg-3">
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
        </div>
        <div className="col-lg-3 hide">
          <table className="table">
            <tbody>
              <tr>
                <th className={`${classes.th} noBorder`}>Total Fees</th>
                <td className={`${classes.td} noBorder text-right`}>Rs 5000</td>
              </tr>
              <tr>
                <th className={classes.th}>Balance</th>
                <td className={`${classes.td} text-right balance`}>Rs 1000</td>
              </tr>
              <tr>
                <th className={classes.th}></th>
                <td className={`${classes.td} text-right`}>
                  <button className="btn btn-sm btn-primary">
                    Pay Rs 1000
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary btn-sm">Add Bill</button>
        </div>
        <div className="col-lg-12">
          <Alert variant="info" className={classes.cardContent}>
            <div className={`row`}>
              <div className={`col-lg-6 text-center`}>
                <button
                  className={`btn btn-sm btn-primary`}
                  onClick={() => {
                    setBillModal({ ...billModalInit, show: true });
                  }}
                >
                  Add New Bill
                </button>
              </div>
              <div className={`col-lg-6 field borderLeft`}>
                <div className="table-responsive" style={{ width: 170 }}>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th className={`${classes.th} noBorder`}>Total Fees</th>
                        <td className={`${classes.td} noBorder text-right`}>
                          Rs 5000
                        </td>
                      </tr>
                      <tr>
                        <th className={classes.th}>Balance</th>
                        <td className={`${classes.td} text-right balance`}>
                          Rs 1000
                        </td>
                      </tr>
                      <tr>
                        <th className={classes.th}></th>
                        <td className={`${classes.td} text-right`}>
                          <button className="btn btn-sm btn-primary">
                            Pay Rs 1000
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`col-lg-3 field hide`}>
                <div
                  className="form-group inline-form-group"
                  style={{ color: "red" }}
                >
                  <label>Balance:</label>
                  <div>Rs 2500</div>
                </div>
              </div>
              <div className={`col-lg-3 text-center hide`}>
                <button className={`btn btn-sm btn-primary`}>
                  Pay Rs 2500
                </button>
              </div>
            </div>
          </Alert>
        </div>
        <div className="col-lg-12 pt-4">
          <CommonBillingList columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default AddBill;
