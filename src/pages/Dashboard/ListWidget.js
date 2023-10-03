import React, { useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescription,
  faWallet,
  faUsersBetweenLines,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import CreateAppointmentModal from "../Patient/CreateAppointmentModal";
import { useHistory } from "react-router-dom";
import { Tooltip } from "../../components";
import { PatientContext } from "../../context/Patient";
import { BillingContext } from "../../context/Billing";
import { getAppointmentStatusList } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardAppointments,
  updateAppointment,
} from "../../store/actions/appointmentActions";
import { setAppointmentModal } from "../../store/reducers/appointmentsSlice";
import { getPatientById } from "../../store/actions/patientActions";
import { navigateTo } from "../../store/reducers/navigationSlice";

const useStyles = createUseStyles({
  tr: {
    borderBottom: "16px solid #ededed !important",
  },
  td: {
    background: "#fff",
    padding: "5px 10px !important",
  },
  statusDropdown: {
    padding: "4px 10px !important",
    height: "26px !important",
  },
  iconBtn: {
    height: "32px !important",
    width: "32px !important",
  },
  rowActionBtn: {
    "&:after": {
      display: "none",
    },
  },
  patientName: {
    padding: 0,
    fontWeight: 600,
  },
});

const ListWidget = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { dashboardList, dashboardListFilters } = useSelector(
    (state) => state.appointments
  );

  const { appointmentStatuses } = useSelector((state) => state.user);

  const [, patientActions] = useContext(PatientContext);
  const [, billActions] = useContext(BillingContext);

  useEffect(() => {
    if (appointmentStatuses === null) {
      dispatch(getAppointmentStatusList());
    }
  }, [appointmentStatuses]);

  const handleUpdateAppointment = (req) => {
    dispatch(
      updateAppointment(req, () => {
        dispatch(getDashboardAppointments(dashboardListFilters));
      })
    );
  };

  const handleButtonClick = (patientId, pageState) => {
    dispatch(
      getPatientById({ PatientId: patientId }, () => {
        // history.push({
        //   pathname: "/patient/" + patientId,
        //   state: pageState,
        // });
        dispatch(navigateTo({ to: `/patient/${patientId}`, state: pageState }));
      })
    );
    // patientActions.getPatientById(patientId, (res) => {
    //   billActions.getAllBillingDataAction({
    //     id_doctor: parseInt(localStorage.getItem("id_doctor")),
    //     id_patient: res.id_patient,
    //     id_clinic: res.id_clinic,
    //   });
    //   history.push({
    //     pathname: "/patient/" + patientId,
    //     state: pageState,
    //   });
    // });
  };

  const IconButton = ({
    tooltipText = "",
    placement = "top",
    btnClasses = "",
    btnOnClick = () => {},
    icon = faUsersBetweenLines,
  }) => {
    return (
      <Tooltip text={tooltipText} placement={placement}>
        <button
          type="button"
          className={`btn btn-rounded btn-icon ${classes.iconBtn} ${btnClasses}`}
          onClick={() => btnOnClick()}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      </Tooltip>
    );
  };

  return (
    <>
      <CreateAppointmentModal
        onHide={() => {
          dispatch(setAppointmentModal({ show: false }));
        }}
      />
      <div className="table-responsive">
        <table className="table table-borderless">
          <tbody>
            {dashboardList.length === 0 && (
              <tr key="NoRecords">
                <td style={{ textAlign: "center", fontWeight: "500" }}>
                  No Appointments Found
                </td>
              </tr>
            )}
            {dashboardList.length > 0 &&
              dashboardList.map((item, ind) => {
                if (item.appointment_status === "Cancelled") {
                  return true;
                }
                return (
                  <tr key={item.id_appointment} className={classes.tr}>
                    <td className={`text-center ${classes.td}`} width="30px">
                      {ind + 1}
                    </td>
                    <td className={`font-weight-bold ${classes.td}`}>
                      <button
                        className={`btn btn-sm btn-link ${classes.patientName}`}
                        onClick={() =>
                          handleButtonClick(item.id_patient, {
                            selectedTab: 0,
                            id_appointment: item.id_appointment,
                          })
                        }
                      >
                        {item.patient_first_name} {item.patient_last_name}
                      </button>
                    </td>
                    <td className={`${classes.td}`} width="130px">
                      {item.reason}
                    </td>
                    <td
                      className={`font-weight-bold text-center ${classes.td}`}
                      width="26px"
                    >
                      {item.queue_type === 1 && (
                        <Tooltip text="Has Appointment" placement="top">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            style={{ fontSize: 18, color: "green" }}
                          />
                        </Tooltip>
                      )}
                      {item.queue_type === 0 && (
                        <Tooltip text="Walk in" placement="top">
                          <i
                            className="mdi mdi-walk"
                            style={{ fontSize: 21 }}
                          ></i>
                        </Tooltip>
                      )}
                    </td>
                    <td className={`${classes.td} text-right`} width="130px">
                      {item.start_time} - {item.end_time}
                    </td>
                    <td
                      className={`font-weight-bold ${
                        item.payment_status === 0
                          ? "text-warning"
                          : "text-success"
                      } text-center ${classes.td}`}
                      width="105px"
                    >
                      <span>
                        {`${item.payment_status === 0 ? "Pending" : "Paid"}`}
                      </span>
                    </td>
                    <td className={classes.td} width={56}>
                      <IconButton
                        tooltipText={`${
                          item.checked_in === 0
                            ? "Mark as Checked In"
                            : "Checked In"
                        }`}
                        btnClasses={`${
                          item.checked_in === 0
                            ? "btn-inverse-primary"
                            : "btn-success"
                        }`}
                        icon={faUsersBetweenLines}
                        btnOnClick={() => {
                          let req = { ...item };
                          req.checked_in = req.checked_in === 0 ? 1 : 0;
                          handleUpdateAppointment(req);
                        }}
                      />
                    </td>
                    <td
                      className={`font-weight-bold text-success ${classes.td}`}
                      width={130}
                    >
                      <select
                        className={`${classes.statusDropdown} form-control form-control-sm`}
                        value={item.appointment_status}
                        onChange={(e) => {
                          let req = { ...item };
                          req.appointment_status = e.target.value;
                          handleUpdateAppointment(req);
                        }}
                      >
                        {appointmentStatuses.map((item, ind) => (
                          <option key={ind} value={item.statusValue}>
                            {item.statusName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className={`${classes.td} text-center`} width={56}>
                      <IconButton
                        tooltipText="Prescription"
                        btnClasses="btn-primary"
                        btnOnClick={() =>
                          handleButtonClick(item.id_patient, {
                            selectedTab: 1,
                            id_appointment: item.id_appointment,
                          })
                        }
                        icon={faPrescription}
                      />
                    </td>
                    <td className={`${classes.td} text-center`} width={56}>
                      <IconButton
                        tooltipText="Bill"
                        btnClasses="btn-dark"
                        btnOnClick={() =>
                          handleButtonClick(item.id_patient, {
                            selectedTab: 2,
                            id_appointment: item.id_appointment,
                          })
                        }
                        icon={faWallet}
                      />
                    </td>
                    <td className={`${classes.td} text-center`} width={56}>
                      <Dropdown variant="p-0" alignRight>
                        <Dropdown.Toggle
                          className={classes.rowActionBtn}
                          variant="dropdown-toggle p-0"
                        >
                          <i className="ti-more-alt"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              dispatch(
                                setAppointmentModal({
                                  isAdd: false,
                                  show: true,
                                  form: item,
                                })
                              );
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              let req = { ...item };
                              req.appointment_status = "Cancelled";
                              handleUpdateAppointment(req);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item disabled={true}>
                            Add Vitals
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListWidget;
