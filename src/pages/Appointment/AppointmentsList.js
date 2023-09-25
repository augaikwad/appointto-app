import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components";
import { createUseStyles } from "react-jss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getWeekRange, getMonthRange } from "../../utils/common";
import { AppointmentContext } from "../../context/Appointment";
import { DoctorContext } from "../../context/Doctor";
import Select from "react-select";

const localizer = momentLocalizer(moment);

const useStyles = createUseStyles({
  pageCard: {
    flex: 1,
    display: "flex",
    "& > .card-body": {
      display: "flex",
      flexDirection: "column",
    },
  },
  rbcToolbarButton: {
    "&.btn-primary": {
      background: "#248afd !important",
      color: "#fff !important",
      backgroundColor: "#0276f8 !important",
      borderColor: "#0270ec !important",
    },
  },
  customEventWrapper: {
    "& > .rbc-event": {
      "&, &.rbc-selected": {
        backgroundColor: "#d0e6ff",
        color: "inherit",
      },
      "& > .rbc-event-label": {
        display: "none",
      },
    },
    "&.OnGoing > .rbc-event": {
      backgroundColor: "#d0ffe1",
      color: "inherit",
      "& .faIcon": {
        color: "#00bd44",
      },
    },
  },
  customEventContent: {
    position: "relative",
    color: "#555",
    "& > b": {
      fontSize: ".75em",
      marginRight: 5,
    },
    "& > span": {
      fontSize: ".80em",
      fontWeight: 500,
    },
    "& > i.faIcon": {
      fontSize: 8,
      verticalAlign: "middle",
      marginRight: 5,
      color: "#0276f8",
    },
  },
  drDropdownFilter: {
    width: 300,
    "& > .customDrDropDown > div": {
      minHeight: "31px",
      height: 31,
      fontSize: 14,
      flexWrap: "inherit",
    },
  },
  ml10: {
    marginLeft: 10,
  },
});

const AppointmentsList = () => {
  const classes = useStyles();

  const [drState, drActions] = useContext(DoctorContext);
  const { doctorsByClinicId } = drState;
  console.log("doctorsByClinicId === ", doctorsByClinicId);

  const [state, actions] = useContext(AppointmentContext);
  const { calendarList, appointmentStatusList } = state;

  const [calendarView, setCalendarView] = useState("month");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsByClinicId[0]);

  const getList = (req) => {
    actions.getAppointmentsForCalendar(req);
  };

  useEffect(() => {
    drActions.getDoctorsByClinicId(
      parseInt(localStorage.getItem("id_clinic")),
      (docList) => {
        let idDoctor = parseInt(localStorage.getItem("id_doctor"));
        let doctor = "";
        if (idDoctor === 0) {
          doctor = docList[0];
        } else {
          doctor = docList.find((doc) => doc.id_doctor === idDoctor);
        }
        setSelectedDoctor(doctor);
      }
    );
  }, []);

  const getDateRange = (view, date) => {
    let range = "";
    if (view === "week") {
      range = getWeekRange(date);
    } else if (view === "month") {
      range = getMonthRange(date);
    } else if (view === "day") {
      range = {
        start_date: moment(date).format("YYYY-MM-DD"),
        end_date: moment(date).format("YYYY-MM-DD"),
      };
    }
    return range;
  };

  useEffect(() => {
    getList({
      id_doctor: selectedDoctor?.id_doctor,
      ...getDateRange(calendarView, calendarDate),
    });
  }, [calendarView, calendarDate, selectedDoctor]);

  const handleOnNavigate = (date, view) => {
    setCalendarView(view);
    setCalendarDate(date);
  };

  const handleOnRangeChange = (range, view) => {
    if (view) {
      setCalendarView(view);
    }
  };

  const EventComponent = ({ event }) => {
    const { patient_first_name, patient_last_name, start_time } = event;
    return (
      <div className={classes.customEventContent}>
        <i className="fa fa-circle faIcon"></i>
        <b>{`${start_time}`}</b>
        <span>{`${patient_first_name} ${patient_last_name}`}</span>
      </div>
    );
  };

  const EventWrapper = ({ event, children }) => {
    console.log(
      "EventWrapper === appointment_status :: ",
      event.appointment_status,
      appointmentStatusList
    );
    return (
      <div
        className={`${classes.customEventWrapper} ${event.appointment_status}`}
      >
        {children}
      </div>
    );
  };

  const viewButtons = [{ name: "Month" }, { name: "Week" }, { name: "Day" }];
  const navigationButtons = [
    { name: "Prev", icon: "fa-chevron-left" },
    { name: "Next", icon: "fa-chevron-right" },
  ];

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div className="rbc-toolbar">
        <div className="rbc-btn-group">
          <div className={classes.drDropdownFilter}>
            <Select
              className="customDrDropDown"
              placeholder="Please select doctor..."
              getOptionValue={(option) => option["id_doctor"]}
              getOptionLabel={(option) => option["first_name"]}
              formatOptionLabel={(opt) =>
                `Dr. ${opt?.first_name} ${opt?.last_name}`
              }
              defaultValue={selectedDoctor}
              name="id_doctor"
              options={doctorsByClinicId}
              isSearchable={true}
              onChange={(val) => {
                setSelectedDoctor(val);
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className={`btn btn-sm ${classes.ml10}`}
          onClick={() => onNavigate("Today".toUpperCase())}
        >
          Today
        </button>
        <div
          className={`rbc-btn-group btn-group ${classes.ml10}`}
          role="group"
          aria-label="Navigation buttons"
        >
          {navigationButtons.map((btn, ind) => {
            const btnName = btn.name.toUpperCase();
            return (
              <button
                key={ind}
                type="button"
                className={`btn btn-sm`}
                onClick={() => onNavigate(btnName)}
              >
                <i className={`fa faIcon ${btn.icon}`}></i>
              </button>
            );
          })}
        </div>
        <div className="rbc-toolbar-label">{label}</div>
        <div
          className={`rbc-btn-group btn-group`}
          role="group"
          aria-label="View buttons"
        >
          {viewButtons.map((btn, ind) => {
            const btnName = btn.name.toLowerCase();
            return (
              <button
                key={ind}
                type="button"
                className={`btn btn-sm ${classes.rbcToolbarButton} ${
                  btnName === calendarView
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => onView(btnName)}
              >
                {btn.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Card className={classes.pageCard}>
        <Calendar
          localizer={localizer}
          view={calendarView}
          date={calendarDate}
          events={calendarList}
          views={{ month: true, week: true, day: true, agenda: false }}
          onNavigate={handleOnNavigate}
          onRangeChange={handleOnRangeChange}
          components={{
            event: EventComponent,
            eventWrapper: EventWrapper,
            toolbar: CustomToolbar,
          }}
          popup={true}
          step={15}
        />
      </Card>
    </div>
  );
};

export default AppointmentsList;
