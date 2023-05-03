import React, { useContext } from "react";
import Navbar from "../../shared/Navbar";
import { VerticalTabs, Card } from "../../components";
import ClinicInformation from "./Tabs/ClinicInformation";
import DoctorInformation from "./Tabs/DoctorInformation";
import Schedule from "./Tabs/Schedule";
import { DoctorContext } from "../../context/Doctor";

const Registration = () => {
  const [state, actions] = useContext(DoctorContext);
  const { registrationActiveTab } = state;

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
                  setSelectedTab={(key) =>
                    actions.setRegistrationActiveTab(key)
                  }
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
