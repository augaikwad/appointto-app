import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescription,
  faWallet,
  faUsersBetweenLines,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import PatientModal from "../Patient/PatientModal";
import { useHistory } from "react-router-dom";

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

const listData = [
  {
    patientName: "Soham Thorait",
    appointmentTime: { start: "09:00 AM", end: "10:00 AM" },
    billStatus: "Paid",
    isAppointment: true,
  },
  {
    patientName: "Bala Naik",
    appointmentTime: { start: "10:00 AM", end: "11:00 AM" },
    billStatus: "Pending",
    isAppointment: false,
  },
  {
    patientName: "Karan Ahuja",
    appointmentTime: { start: "11:00 AM", end: "12:00 PM" },
    billStatus: "Paid",
    isAppointment: false,
  },
  {
    patientName: "Shyam Kumar",
    appointmentTime: { start: "12:00 PM", end: "01:00 PM" },
    billStatus: "Pending",
    isAppointment: true,
  },
];

const ListWidget = () => {
  const classes = useStyles();

  const history = useHistory();

  const [modalState, setModalState] = useState({
    title: "Patient",
    show: false,
    selectedTab: 0,
  });

  return (
    <>
      <PatientModal
        {...modalState}
        onHide={() =>
          setModalState({ ...modalState, ...{ show: false, selectedTab: 0 } })
        }
      />

      <div className="table-responsive" style={{ minHeight: 125 }}>
        <table className="table table-borderless">
          <tbody>
            {listData &&
              listData.map((item, ind) => {
                return (
                  <tr key={ind} className={classes.tr}>
                    <td className={`text-center ${classes.td}`} width="30px">
                      {ind + 1}
                    </td>
                    <td className={`font-weight-bold ${classes.td}`}>
                      <button
                        className={`btn btn-sm btn-link ${classes.patientName}`}
                        onClick={
                          () =>
                            history.push({
                              pathname: "/patient/" + (ind + 1),
                              state: {
                                data: item,
                                selectedTab: 0,
                              },
                            })
                          // setModalState({
                          //   ...modalState,
                          //   ...{ show: true, selectedTab: 0 },
                          // })
                        }
                      >
                        {item.patientName}
                      </button>
                    </td>
                    <td
                      className={`font-weight-bold text-center ${classes.td}`}
                      width="26px"
                    >
                      {item.isAppointment && (
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          style={{ fontSize: 18, color: "green" }}
                        />
                      )}
                    </td>
                    <td className={`${classes.td} text-right`} width="130px">
                      {item.appointmentTime.start} - {item.appointmentTime.end}
                    </td>
                    <td
                      className={`font-weight-bold ${
                        item.billStatus === "Paid"
                          ? "text-success"
                          : "text-warning"
                      } text-center ${classes.td}`}
                      width="105px"
                    >
                      <span>{item.billStatus}</span>
                    </td>
                    <td className={classes.td} width={56}>
                      <button
                        type="button"
                        className={`btn btn-inverse-primary btn-rounded btn-icon ${classes.iconBtn}`}
                      >
                        <FontAwesomeIcon icon={faUsersBetweenLines} />
                      </button>
                      {/* <div className="form-check">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="ExampleRadio3"
                    id="membershipRadios2"
                    defaultChecked
                  />{" "}
                  Checked In
                  <i className="input-helper"></i>
                </label>
              </div> */}
                    </td>
                    <td
                      className={`font-weight-bold text-success ${classes.td}`}
                      width={130}
                    >
                      <select
                        className={`${classes.statusDropdown} form-control form-control-sm`}
                      >
                        <option>Select</option>
                        <option>Arrived</option>
                        <option>In Queue</option>
                        <option>On Going</option>
                        <option>Completed</option>
                        <option>No Show</option>
                      </select>
                    </td>
                    <td className={`${classes.td} text-center`} width={56}>
                      <button
                        type="button"
                        className={`btn btn-primary btn-rounded btn-icon ${classes.iconBtn}`}
                        onClick={() =>
                          history.push({
                            pathname: "/patient/" + (ind + 1),
                            state: {
                              data: item,
                              selectedTab: 1,
                            },
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPrescription} />
                      </button>
                    </td>
                    <td className={`${classes.td} text-center`} width={56}>
                      <button
                        type="button"
                        className={`btn btn-dark btn-rounded btn-icon ${classes.iconBtn}`}
                        onClick={() =>
                          history.push({
                            pathname: "/patient/" + (ind + 1),
                            state: {
                              data: item,
                              selectedTab: 2,
                            },
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faWallet} />
                      </button>
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
                          <Dropdown.Item>Edit</Dropdown.Item>
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
