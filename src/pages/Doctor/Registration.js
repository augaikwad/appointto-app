import React from "react";
import Navbar from "../../shared/Navbar";
import { VerticalTabs, Card } from "../../components";
import ClinicInformation from "./Tabs/ClinicInformation";
import DoctorInformation from "./Tabs/DoctorInformation";
import Schedule from "./Tabs/Schedule";
import { useSelector, useDispatch } from "react-redux";
import { setRegistrationActiveTab } from "../../store/reducers/doctorSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const { registrationActiveTab } = useSelector((state) => state.doctors);

  const tabs = [
    { name: "Doctor Information", component: <DoctorInformation /> },
    { name: "Clinic Information", component: <ClinicInformation /> },
    { name: "Schedule", component: <Schedule /> },
  ];

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            <div className="content-wrapper" style={{ padding: "1rem 2rem" }}>
              <Card>
                <VerticalTabs
                  tabs={tabs}
                  selectedTab={registrationActiveTab}
                  setSelectedTab={(key) => {
                    dispatch(setRegistrationActiveTab(key));
                  }}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
