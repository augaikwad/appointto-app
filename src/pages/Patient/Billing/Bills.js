import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Tooltip } from "../../../components";
import { format } from "date-fns";
import CommonBillingList from "./CommonBillingList";
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

const Bills = () => {
  const classes = useStyles();

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

  const [selectedRows, setSelectedRows] = useState([]);

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelectedRows([...selectedRows, ...[row]]);
    } else {
      setSelectedRows(selectedRows.filter((x) => x.id !== row.id));
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    if (isSelect) {
      setSelectedRows(rows);
    } else {
      setSelectedRows([]);
    }
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
      width: 85,
    },
    {
      dataField: "rate",
      text: "Rate",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
    },
    { dataField: "qty", text: "Qty", headerAlign: "center", align: "center" },
    {
      dataField: "discount",
      text: "Discount",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
    },
    {
      dataField: "amount",
      text: "Amount",
      headerAlign: "center",
      formatter: getAmountFormatter,
      align: "right",
    },
    {
      dataField: "id",
      text: "",
      formatter: getActionFormatter,
      align: "right",
      width: 160,
    },
  ];

  return (
    <CommonBillingList
      columns={columns}
      data={data}
      selectRow={{
        mode: "checkbox",
        clickToSelect: false,
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll,
      }}
    />
  );
};

export default Bills;
