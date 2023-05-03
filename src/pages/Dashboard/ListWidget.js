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
import { AppointmentContext } from "../../context/Appointment";
import { PatientContext } from "../../context/Patient";

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

  const [state, actions] = useContext(AppointmentContext);
  const { appointmentList, appointmentStatusList } = state;
  const [patientState, patientActions] = useContext(PatientContext);

  useEffect(() => {
    if (appointmentStatusList.length === 0) {
      actions.getAppointmentStatusList();
    }
  }, [appointmentStatusList]);

  const updateAppointment = (req) => {
    actions.updateAppointment(req, () => {
      actions.getAppointmentByDoctor();
    });
  };

  const handleButtonClick = (patientId, tab) => {
    patientActions.getPatientById(patientId, () => {
      history.push({
        pathname: "/patient/" + patientId,
        state: {
          selectedTab: tab,
        },
      });
    });
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
      <CreateAppointmentModal isAdd={false} />
      <div className="table-responsive">
        <table className="table table-borderless">
          <tbody>
            {appointmentList.length === 0 && (
              <tr key="NoRecords">
                <td style={{ textAlign: "center", fontWeight: "500" }}>
                  No Appointments Found
                </td>
              </tr>
            )}
            {appointmentList.length > 0 &&
              appointmentList.map((item, ind) => {
                return (
                  <tr key={item.id_appointment} className={classes.tr}>
                    <td className={`text-center ${classes.td}`} width="30px">
                      {ind + 1}
                    </td>
                    <td className={`font-weight-bold ${classes.td}`}>
                      <button
                        className={`btn btn-sm btn-link ${classes.patientName}`}
                        onClick={() => handleButtonClick(item.id_patient, 0)}
                      >
                        {item.patient_first_name} {item.patient_last_name}
                      </button>
                    </td>
                    <td
                      className={`font-weight-bold text-center ${classes.td}`}
                      width="26px"
                    >
                      {item.queue_type === 0 && (
                        <Tooltip text="Has Appointment" placement="top">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            style={{ fontSize: 18, color: "green" }}
                          />
                        </Tooltip>
                      )}
                      {item.queue_type === 1 && (
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
                          updateAppointment(req);
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
                          updateAppointment(req);
                        }}
                      >
                        {appointmentStatusList.map((item, ind) => (
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
                        btnOnClick={() => handleButtonClick(item.id_patient, 1)}
                        icon={faPrescription}
                      />
                    </td>
                    <td className={`${classes.td} text-center`} width={56}>
                      <IconButton
                        tooltipText="Bill"
                        btnClasses="btn-dark"
                        btnOnClick={() => handleButtonClick(item.id_patient, 2)}
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
                              actions.setAppointmentForm(item);
                              actions.setAppointmentModal({
                                isAdd: false,
                                show: true,
                              });
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                          <Dropdown.Item>Add Vitals</Dropdown.Item>
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
