import React, { useContext, useEffect } from "react";
import { Card } from "../../components";
import { TextField } from "../../components/Forms";
import { Row, Col } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescription,
  faWallet,
  faUsersBetweenLines,
  faWalking,
  faPencil,
  faTrashCan,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Tooltip } from "../../components";
import { AppointmentContext } from "../../context/Appointment";
import { PatientContext } from "../../context/Patient";
import { BillingContext } from "../../context/Billing";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { debounce } from "lodash";

const useStyles = createUseStyles({
  ListContainer: {
    padding: 10,
    background: "#ededed",
  },
  tr: {
    borderBottom: "16px solid #ededed !important",
  },
  td: {
    background: "#fff",
    padding: "5px 10px !important",
  },
  addToQueueBtn: {
    color: "#000",
    fontSize: 18,
  },
  appointmentBtn: {
    color: "#000",
    fontSize: 18,
  },
  deletePatientBtn: {
    color: "#db1919",
    fontSize: 18,
  },
  editPatientBtn: {
    color: "#248afd",
    fontSize: 18,
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

const PatientList = () => {
  const classes = useStyles();

  const history = useHistory();

  const form = useForm();
  const { handleSubmit } = form;

  const filterList = (formData) => {
    console.log("onSubmit === ", formData);
  };

  const [, actions] = useContext(AppointmentContext);
  const [patientState, patientActions] = useContext(PatientContext);
  const { patientList } = patientState;
  const [, billActions] = useContext(BillingContext);
  console.log("patientList == ", patientList);
  useEffect(() => {
    patientActions.getPatientsList();
  }, []);

  const handleButtonClick = (patientId, tab) => {
    patientActions.getPatientById(patientId, (res) => {
      billActions.getAllBillingDataAction({
        id_doctor: parseInt(localStorage.getItem("id_doctor")),
        id_patient: res.id_patient,
        id_clinic: res.id_clinic,
      });
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

  const handleDebounceChange = debounce((e) => {
    console.log("handleDebounceChange === ", e.target.value);
  }, 1000);

  return (
    <div style={{ flex: 1 }}>
      <Card>
        <div className="list-filters">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(filterList)}>
              <Row>
                <Col lg={2}>
                  <TextField
                    name="patientName"
                    label="Patient Name"
                    onChange={handleDebounceChange}
                  />
                </Col>
                <Col lg={2}>
                  <TextField name="doctorName" label="Doctor Name" />
                </Col>
                <Col lg={2}>
                  <TextField
                    name="mobileNumber"
                    type="number"
                    label="Mobile Number"
                    onChange={handleDebounceChange}
                  />
                </Col>
              </Row>
            </form>
          </FormProvider>
        </div>
        <div className={`table-responsive ${classes.ListContainer}`}>
          <table className="table table-borderless">
            <tbody>
              {patientList.length === 0 && (
                <tr key="NoRecords">
                  <td style={{ textAlign: "center", fontWeight: "500" }}>
                    No Patients Found
                  </td>
                </tr>
              )}
              {patientList.length > 0 &&
                patientList.map((item, ind) => {
                  return (
                    <tr key={item.id_patient} className={classes.tr}>
                      <td className={`text-center ${classes.td}`} width="30px">
                        {ind + 1}
                      </td>
                      <td className={`font-weight-bold ${classes.td}`}>
                        <button
                          className={`btn btn-sm btn-link ${classes.patientName}`}
                          onClick={() => handleButtonClick(item.id_patient, 0)}
                        >
                          {item.patient_name}
                        </button>
                      </td>
                      <td className={`${classes.td}`} width="130px">
                        {item.gender}
                      </td>
                      <td className={`${classes.td}`} width="130px">
                        {item.age} Years
                      </td>
                      <td className={`${classes.td}`} width="130px">
                        {item.mobile_number}
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Add to Queue"
                          btnClasses={classes.addToQueueBtn}
                          icon={faWalking}
                          btnOnClick={() => {
                            let currentDate = new Date();
                            let req = {
                              id_appointment: 0,
                              id_doctor: parseInt(
                                localStorage.getItem("id_doctor")
                              ),
                              id_patient: item.id_patient,
                              date: new Date(currentDate),
                              day: moment(currentDate).format("dddd"),
                              start_time: "",
                              end_time: "",
                              reason: "Consultation",
                              appointment_status: "",
                            };

                            actions.createAppointment(req, () => {
                              actions.getAppointmentByDoctor();
                            });
                          }}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Create an appointment"
                          btnClasses={classes.appointmentBtn}
                          icon={faCalendarAlt}
                          btnOnClick={() => {
                            actions.setAppointmentForm({
                              id_patient: item.id_patient,
                            });
                            actions.setAppointmentModal({ show: true });
                          }}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Prescription"
                          btnClasses="btn-primary"
                          btnOnClick={() =>
                            handleButtonClick(item.id_patient, 1)
                          }
                          icon={faPrescription}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Bill"
                          btnClasses="btn-dark"
                          btnOnClick={() =>
                            handleButtonClick(item.id_patient, 2)
                          }
                          icon={faWallet}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Edit Patient"
                          btnClasses={classes.editPatientBtn}
                          btnOnClick={() =>
                            handleButtonClick(item.id_patient, 0)
                          }
                          icon={faPencil}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Delete Patient"
                          btnClasses={classes.deletePatientBtn}
                          btnOnClick={() =>
                            handleButtonClick(item.id_patient, 0)
                          }
                          icon={faTrashCan}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PatientList;