import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Tooltip } from "../../../components";
import { format } from "date-fns";
import CommonBillingList from "./CommonBillingList";
import { createUseStyles } from "react-jss";
import { BillingContext } from "../../../context/Billing";
import { PatientContext } from "../../../context/Patient";

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
    padding: 15,
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

const PaymentReceived = () => {
  const classes = useStyles();

  const [state, actions] = useContext(BillingContext);
  const { transactionSummary } = state;

  const [patientState, patientActions] = useContext(PatientContext);
  const { patientData } = patientState;

  useEffect(() => {
    if (patientData !== null && transactionSummary.length === 0) {
      actions.getTransactionSummary({
        id_doctor: parseInt(localStorage.getItem("id_doctor")),
        id_patient: patientData.id_patient,
      });
    }
  }, [patientData]);

  const getDateFormatted = (cell, row) => {
    return format(new Date(cell), "dd/MM/yyyy");
  };

  const getAmountFormatter = (cell, row) => {
    return <div className="text-right">{`Rs ${cell}`}</div>;
  };

  const getActionFormatter = (cell, row) => {
    return (
      <div>
        {/* <Tooltip text="Add Payment" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
          >
            <i className="fa fa-plus"></i>
          </button>
        </Tooltip> */}
        <Tooltip text="Edit Payment" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
            onClick={(e) => {
              e.preventDefault();
              actions.setPaymentModal({
                open: true,
                isAdd: false,
                formValue: row,
              });
            }}
          >
            <i className="fa fa-pencil"></i>
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
      dataField: "created_date",
      text: "Date",
      headerAttrs: {
        width: 90,
      },
      formatter: getDateFormatted,
    },
    {
      dataField: "amount",
      text: "Amount",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
      headerAttrs: {
        width: 100,
      },
    },
    {
      dataField: "payment_mode",
      text: "Payment Mode",
      headerAlign: "center",
      align: "center",
      headerAttrs: {
        width: 200,
      },
    },
    // {
    //   dataField: "id",
    //   text: "",
    //   formatter: getActionFormatter,
    //   align: "right",
    //   headerAttrs: {
    //     width: 100,
    //   },
    // },
  ];
  return <CommonBillingList columns={columns} data={transactionSummary} />;
};

export default PaymentReceived;
