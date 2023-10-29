import React, { useEffect } from "react";
import CountUp from "react-countup";
import { useLocation } from "react-router-dom";
import { Card } from "../../components";
import ListFilters from "./ListFilters";
import ListWidget from "./ListWidget";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardAppointments } from "../../store/actions/appointmentActions";
import {
  setDashboardListFilters,
  initialState as aptInitState,
} from "../../store/reducers/appointmentsSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isInit } = location.state;
  const { id_doctor, user_name } = useSelector((state) => state.user.details);
  const {
    dashboardListFilters,
    appointmentCount,
    followUpPatient,
    newPatient,
    queueCount,
  } = useSelector((state) => state.appointments);

  useEffect(() => {
    if (isInit) {
      const filters = { ...aptInitState.dashboardListFilters, id_doctor };
      dispatch(getDashboardAppointments(filters));
      dispatch(setDashboardListFilters(filters));
    } else {
      dispatch(getDashboardAppointments(dashboardListFilters));
    }
  }, []);

  const counts = [
    { title: "Today's Queue", count: queueCount, icon: "ti-menu-alt" },
    {
      title: "Today's Appointment",
      count: appointmentCount,
      icon: "ti-calendar",
    },
    { title: "New Patients", count: newPatient, icon: "ti-user" },
    { title: "Follow Ups", count: followUpPatient, icon: "ti-layers-alt" },
  ];

  const CountCard = ({ title = "", count = 0, icon = "" }) => {
    return (
      <Card title={title} titleClasses="text-md-center text-xl-left">
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">
            <CountUp start="0" end={count} />
          </h3>
          <i className={`icon-md text-muted mb-0 mb-md-3 mb-xl-0 ${icon}`}></i>
        </div>
      </Card>
    );
  };

  const getGreetingTime = (m) => {
    var g = null; //return g

    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "Afternoon";
    } else if (currentHour >= split_evening) {
      g = "Evening";
    } else {
      g = "Morning";
    }

    return g;
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="row">
        <div className="col-12 col-xl-5 mb-4 mb-xl-0 grid-margin">
          <p className="card-description">
            Hi, Good {getGreetingTime(moment())}!{" "}
            <b>{`${id_doctor !== 0 ? "Dr." : ""} ${user_name}`}</b>
          </p>
        </div>
      </div>

      <div className="row">
        {counts.map((item, ind) => (
          <div key={ind} className="col-md-3 grid-margin stretch-card">
            <CountCard {...item} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <Card>
            <ListFilters />
            <div
              className="mt-2 p-3"
              style={{ background: "#EDEDED", minHeight: 140 }}
            >
              <ListWidget />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
