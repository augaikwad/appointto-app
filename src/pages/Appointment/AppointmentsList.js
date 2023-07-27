import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components";
import { createUseStyles } from "react-jss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getWeekRange, getMonthRange } from "../../utils/common";
import { AppointmentContext } from "../../context/Appointment";

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
});

const AppointmentsList = () => {
  const classes = useStyles();

  const [state, actions] = useContext(AppointmentContext);
  const { calendarList } = state;

  const [calendarView, setCalendarView] = useState("month");
  const [calendarDate, setCalendarDate] = useState(new Date());

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
    actions.getAppointmentsForCalendar(
      getDateRange(calendarView, calendarDate)
    );
  }, [calendarView, calendarDate]);

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
    const { patient_first_name, patient_last_name } = event;
    return (
      <div
        style={{ fontSize: 14 }}
      >{`${patient_first_name} ${patient_last_name}`}</div>
    );
  };

  const viewButtons = [{ name: "Month" }, { name: "Week" }, { name: "Day" }];
  const navigationButtons = [
    { name: "Today" },
    { name: "Prev" },
    { name: "Next" },
  ];

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    const handleCustomButtonClick = () => {
      // Handle custom button click event
      console.log("Custom button clicked!");
    };

    return (
      <div className="rbc-toolbar">
        {/* <div className="rbc-btn-group">
          <button
            type="button"
            className={`btn btn-sm`}
            onClick={handleCustomButtonClick}
          >
            Custom Button
          </button>
        </div> */}
        <div
          className={`rbc-btn-group btn-group`}
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
                {btn.name}
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
        {/* <div className="rbc-btn-group">
          <button type="button" onClick={() => onView("month")}>
            Month
          </button>
          <button type="button" onClick={() => onView("week")}>
            Week
          </button>
          <button type="button" onClick={() => onView("day")}>
            Day
          </button>
        </div> */}
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
            toolbar: CustomToolbar,
          }}
        />
      </Card>
    </div>
  );
};

export default AppointmentsList;
