import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import { VerticalTabs, Card } from "../../components";
import ClinicInformation from "./Tabs/ClinicInformation";
import DoctorInformation from "./Tabs/DoctorInformation";
import Schedule from "./Tabs/Schedule";
import { useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  thankyouOverlay: {
    display: "none",
    position: "fixed",
    zIndex: "9999",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgb(0 106 215 / 53%)",
    "& > div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > i.fa": {
        color: "green",
        fontSize: "53px",
        marginBottom: "15px",
      },
      "& > h5": {
        color: "#fff",
        fontSize: "24px",
      },
    },
    "&.active": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const Registration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const tabs = [
    { name: "Doctor Information", component: <DoctorInformation /> },
    { name: "Clinic Information", component: <ClinicInformation /> },
    { name: "Schedule", component: <Schedule /> },
  ];

  const TankYouNotification = () => {
    return (
      <div className={`${classes.thankyouOverlay} ${open ? "active" : ""}`}>
        <div>
          <i className="fa fa-check-circle"></i>
          <h5>Thank you for your registration.</h5>
        </div>
      </div>
    );
  };

  return (
    <>
      <TankYouNotification open={open} />
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
            <div className="content-wrapper" style={{ padding: "1rem 2rem" }}>
              <Card>
                <VerticalTabs
                  tabs={tabs}
                  selectedTab={activeTab}
                  setSelectedTab={(key) => setActiveTab(key)}
                />
                <div className="text-right p-3">
                  {activeTab >= 1 && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setActiveTab(activeTab - 1)}
                    >
                      Previous
                    </button>
                  )}
                  {tabs.length - 1 !== activeTab && (
                    <button
                      className="btn btn-sm btn-primary ml-3"
                      onClick={() => setActiveTab(activeTab + 1)}
                    >
                      Next
                    </button>
                  )}
                  {tabs.length === activeTab + 1 && (
                    <button
                      className="btn btn-sm btn-primary ml-3"
                      onClick={() => {
                        setOpen(true);
                        setTimeout(() => {
                          setOpen(false);
                          history.push("/login");
                        }, 2000);
                      }}
                    >
                      Save
                    </button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
