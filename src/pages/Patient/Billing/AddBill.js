import React from "react";
import { Tooltip } from "../../../components";
import { Form, Alert, Button } from "react-bootstrap";
import { format } from "date-fns";
import CommonBillingList from "./CommonBillingList";
import { createUseStyles } from "react-jss";
import AmountWithCurrancy from "../../../components/AmountWithCurrancy";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBill,
  getBillSummary,
  getAllBillData,
  deleteBill,
} from "../../../store/actions/billingActions";
import {
  setBillModal,
  setPaymentModal,
  initialState as billingInitState,
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

const AddBill = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { doctorsByClinicId } = useSelector((state) => state.user);
  const { id_doctor } = useSelector((state) => state.user.details);
  const { patientById } = useSelector((state) => state.patients);
  const { billSummary, allBillData } = useSelector((state) => state.billings);

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
        checked={row.is_Completed === 0 ? false : true}
        className={classes.switch}
        onChange={(e) => {
          let rowData = { ...row };
          rowData.is_Completed = e.target.checked ? 1 : 0;
          dispatch(
            updateBill(rowData, (res) => {
              dispatch(
                getAllBillData({
                  id_doctor: res.id_doctor,
                  id_patient: res.id_patient,
                })
              );
            })
          );
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
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon`}
            disabled={row.is_Completed === 1}
            onClick={() => {
              dispatch(
                setPaymentModal({
                  open: true,
                  isAdd: true,
                  formValue: { bill_id: row.bill_id },
                })
              );
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
        </Tooltip>
        <Tooltip text="Edit Bill" placement="top">
          <Button
            size="sm"
            className={`${classes.listActionBtn} btn-inverse-info btn-icon`}
            onClick={() => {
              let doctorName = doctorsByClinicId.find(
                (item) => item.id_doctor === row.id_doctor
              );
              dispatch(
                setBillModal({
                  open: true,
                  isAdd: false,
                  formValue: { ...row, doctor_name: doctorName },
                })
              );
            }}
          >
            <i className="fa fa-pencil"></i>
          </Button>
        </Tooltip>
        {/* <Tooltip text="Print" placement="top">
          <button
            type="button"
            className={`${classes.listActionBtn} btn btn-inverse-info btn-icon`}
          >
            <i className="fa fa-print"></i>
          </button>
        </Tooltip> */}
        <Tooltip text="Delete Payment" placement="auto">
          <Button
            size="sm"
            className={`${classes.listActionBtn} btn-inverse-danger btn-icon`}
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
          </Button>
        </Tooltip>
      </div>
    );
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
      headerAttrs: {
        width: 80,
      },
    },
    {
      dataField: "net_amount",
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
      dataField: "bill_id",
      text: "",
      formatter: getActionFormatter,
      align: "right",
      headerAttrs: {
        width: 130,
      },
    },
  ];

  return (
    <div className="row">
      <div className="col-lg-12">
        <Alert variant="info" className={classes.cardContent}>
          <div className={`row`}>
            <div className={`col-lg-6 text-center`}>
              <button
                className={`btn btn-sm btn-primary`}
                onClick={() => {
                  dispatch(
                    setBillModal({
                      open: true,
                      isAdd: true,
                      formValue: billingInitState.billModal.formValue,
                    })
                  );
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
                        <AmountWithCurrancy
                          amount={billSummary.totalBillAmount}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className={classes.th}>Balance</th>
                      <td className={`${classes.td} text-right balance`}>
                        <AmountWithCurrancy
                          amount={billSummary.balanceBillAmount}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className={classes.th}></th>
                      <td className={`${classes.td} text-right`}>
                        {billSummary.balanceBillAmount === 0 ? (
                          <AmountWithCurrancy
                            amount={billSummary.balanceBillAmount}
                          />
                        ) : (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              dispatch(
                                setPaymentModal({
                                  open: true,
                                  isAdd: true,
                                  isFullPayment: true,
                                  formValue: {
                                    ...billingInitState.paymentModal.formValue,
                                    amount: billSummary.balanceBillAmount,
                                  },
                                })
                              );
                            }}
                          >
                            Pay{" "}
                            <AmountWithCurrancy
                              amount={billSummary.balanceBillAmount}
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Alert>
      </div>
      <div className="col-lg-12 pt-4">
        <CommonBillingList columns={columns} data={allBillData} />
      </div>
    </div>
  );
};

export default AddBill;
