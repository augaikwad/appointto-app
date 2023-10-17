import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../components";
import { TextField } from "../../components/Forms";
import { Row, Col, Button } from "react-bootstrap";
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
import { Tooltip } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { debounce } from "lodash";
import ListPagination from "../../components/ListPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientsList,
  getPatientById,
} from "../../store/actions/patientActions";
import { navigateTo } from "../../store/reducers/navigationSlice";
import { createAppointment } from "../../store/actions/appointmentActions";
import { setAppointmentModal } from "../../store/reducers/appointmentsSlice";
import {
  setPatientModal,
  initialState,
} from "../../store/reducers/patientSlice";
import { areObjectsEqual } from "../../utils/common";
import { formattedObjForPatientForm } from "../../store/actions/dataFormatters/patients";

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
  filterContainer: {
    display: "flex",
    alignItems: "center",
    "& > form": {
      flex: 1,
    },
  },
});

const PatientList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isInit } = location.state;

  const { selectedDoctorId } = useSelector((state) => state.user);
  const { id_clinic } = useSelector((state) => state.user.details);
  const { patientList, patientListFilter, patientModal } = useSelector(
    (state) => state.patients
  );

  const { appointmentModal } = useSelector((state) => state.appointments);

  const form = useForm({
    defaultValues: patientListFilter,
  });

  const { reset } = form;

  useEffect(() => {
    reset(patientListFilter);
  }, [patientListFilter]);

  const handleGetPatientList = (opt) => {
    dispatch(
      getPatientsList({
        ...patientListFilter,
        ...opt,
      })
    );
  };

  useEffect(() => {
    if (isInit) {
      handleGetPatientList({ ...initialState.patientListFilter, id_clinic });
    } else {
      handleGetPatientList({ id_clinic });
    }
  }, []);

  const handleButtonClick = (patientId, tab) => {
    dispatch(
      getPatientById({ PatientId: patientId }, (res) => {
        dispatch(
          navigateTo({
            to: `/patient/${patientId}`,
            state: { selectedTab: tab },
          })
        );
      })
    );
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
    const { name, value } = e.target;
    handleGetPatientList({ [name]: value, start_record: 1, end_record: 10 });
  }, 1000);

  let startIndex = patientListFilter.start_record - 1;

  return (
    <div style={{ flex: 1 }}>
      <Card>
        <div className={`list-filters ${classes.filterContainer}`}>
          <FormProvider {...form}>
            <form>
              <Row>
                <Col lg={3}>
                  <TextField
                    name="Keywords"
                    label="Search Patient"
                    placeholder="Enter Name or Mobile number"
                    onChange={handleDebounceChange}
                  />
                </Col>
                <Col lg={3}>
                  {!areObjectsEqual(
                    patientListFilter,
                    initialState.patientListFilter
                  ) && (
                    <Button
                      className="btn btn-sm btn-primary"
                      style={{ marginTop: 19 }}
                      onClick={() => {
                        dispatch(
                          getPatientsList({
                            ...initialState.patientListFilter,
                            id_clinic,
                          })
                        );
                      }}
                    >
                      Reset
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </FormProvider>
          <div>
            <ListPagination
              totalCount={patientList.count}
              start={patientListFilter.start_record}
              end={patientListFilter.end_record}
              onPaginationChange={(range) => {
                handleGetPatientList(range);
              }}
            />
          </div>
        </div>
        <div className={`table-responsive ${classes.ListContainer}`}>
          <table className="table table-borderless">
            <tbody>
              {patientList.item.length === 0 && (
                <tr key="NoRecords">
                  <td style={{ textAlign: "center", fontWeight: "500" }}>
                    No Patients Found
                  </td>
                </tr>
              )}
              {patientList.item.length > 0 &&
                patientList.item.map((item, ind) => {
                  startIndex++;
                  return (
                    <tr key={item.id_patient} className={classes.tr}>
                      <td className={`text-center ${classes.td}`} width="30px">
                        {startIndex}
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
                              id_doctor: selectedDoctorId,
                              id_patient: item.id_patient,
                              date: new Date(currentDate),
                              day: moment(currentDate).format("dddd"),
                              start_time: "",
                              end_time: "",
                              reason: "Consultation",
                              appointment_status: "",
                            };
                            dispatch(createAppointment(req));
                          }}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Create an appointment"
                          btnClasses={classes.appointmentBtn}
                          icon={faCalendarAlt}
                          btnOnClick={() => {
                            dispatch(
                              setAppointmentModal({
                                isAdd: true,
                                show: true,
                                form: {
                                  ...appointmentModal.form,
                                  id_patient: item.id_patient,
                                  id_doctor: selectedDoctorId,
                                },
                              })
                            );
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
                          btnOnClick={() => {
                            dispatch(
                              getPatientById(
                                { PatientId: item.id_patient },
                                (res) => {
                                  dispatch(
                                    setPatientModal({
                                      ...patientModal,
                                      isAdd: false,
                                      open: true,
                                      formValue: formattedObjForPatientForm({
                                        ...patientModal.formValue,
                                        ...res,
                                      }),
                                    })
                                  );
                                }
                              )
                            );
                          }}
                          icon={faPencil}
                        />
                      </td>
                      <td className={`${classes.td} text-center`} width={56}>
                        <IconButton
                          tooltipText="Delete Patient"
                          btnClasses={classes.deletePatientBtn}
                          // btnOnClick={() =>
                          //   // handleButtonClick(item.id_patient, 0)
                          // }
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
