import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Tooltip } from "../../../components";
import CommonBillingList from "./CommonBillingList";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBill,
  getAllBillData,
  getBillSummary,
} from "../../../store/actions/billingActions";
import {
  setBillModal,
  setPaymentModal,
  initialState,
} from "../../../store/reducers/billingSlice";

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

const Bills = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { allBillData } = useSelector((state) => state.billings);
  const { patientById } = useSelector((state) => state.patients);

  const getDateFormatted = (cell, row) => {
    return format(new Date(cell), "dd/MM/yyyy");
  };

  const getAmountFormatter = (cell, row) => {
    return <div className="text-right">{`Rs ${cell}`}</div>;
  };

  const getDiscountFormatter = (cell, row) => {
    return (
      <div className="text-right">{`${
        row.discount_type === 0 ? `Rs ${cell}` : `${cell}%`
      } `}</div>
    );
  };

  const getStatusFormatter = (cell, row) => {
    return (
      <Form.Check
        type="switch"
        id="custom-switch"
        label=""
        checked={cell === 1 ? true : false}
        className={classes.switch}
        disabled={true}
        onChange={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
      />
    );
  };

  const getActionFormatter = (cell, row) => {
    return (
      <div>
        <Tooltip text="Add Payment" placement="top">
          <button
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
            disabled={row.is_Completed === 1}
            onClick={() => {
              dispatch(
                setPaymentModal({
                  open: true,
                  isAdd: true,
                  formValue: {
                    ...initialState.paymentModal.formValue,
                    bill_id: row.bill_id,
                  },
                })
              );
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
        </Tooltip>
        <Tooltip text="Edit Bill" placement="top">
          <button
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
            onClick={() => {
              dispatch(
                setBillModal({
                  open: true,
                  isAdd: false,
                  formValue: row,
                })
              );
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
        </Tooltip>
        {/* <Tooltip text="Print" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon `}
          >
            <i className="fa fa-print"></i>
          </button>
        </Tooltip> */}
        <Tooltip text="Delete Payment" placement="auto">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-danger btn-icon`}
            onClick={() => {
              let req = { bill_id: row.bill_id };
              dispatch(
                deleteBill(req, () => {
                  dispatch(
                    getAllBillData({
                      id_doctor: row.id_doctor,
                      id_patient: row.id_patient,
                    })
                  );
                  dispatch(
                    getBillSummary({
                      id_doctor: id_doctor,
                      id_patient: patientById.id_patient,
                      id_clinic: patientById.id_clinic,
                    })
                  );
                })
              );
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </Tooltip>
      </div>
    );
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleOnSelect = (row, isSelect) => {
    console.log("handleOnSelect === ", row, isSelect);
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
      dataField: "bill_date",
      text: "Date",
      headerAttrs: {
        width: 90,
      },
      formatter: getDateFormatted,
    },
    { dataField: "doctor_name", text: "Dr. Name" },
    { dataField: "treatment.treatment_name", text: "Treatment Name" },
    {
      dataField: "is_Completed",
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
    {
      dataField: "quantity",
      text: "Qty",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "discount_value",
      text: "Discount",
      headerAlign: "center",
      formatter: getDiscountFormatter,
      align: "right",
    },
    {
      dataField: "net_amount",
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
      data={allBillData}
      // selectRow={{
      //   mode: "checkbox",
      //   clickToSelect: true,
      //   onSelect: handleOnSelect,
      //   onSelectAll: handleOnSelectAll,
      // }}
    />
  );
};

export default Bills;
