import React, { useContext } from "react";
import { format } from "date-fns";
import CommonBillingList from "./CommonBillingList";
import { BillingContext } from "../../../context/Billing";

const PaymentReceived = () => {
  const [state, actions] = useContext(BillingContext);
  const { transactionSummary } = state;

  const getDateFormatted = (cell, row) => {
    return format(new Date(cell), "dd/MM/yyyy");
  };

  const getAmountFormatter = (cell, row) => {
    return <div className="text-right">{`Rs ${cell}`}</div>;
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
  ];
  return <CommonBillingList columns={columns} data={transactionSummary} />;
};

export default PaymentReceived;
