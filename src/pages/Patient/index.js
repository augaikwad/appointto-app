import React, { useEffect, useState, useContext } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Card } from "../../components";
import Profile from "./Profile";
import Prescription from "./Prescription";
import Billings from "./Billings";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router-dom";
import { PatientContext } from "../../context/Patient";
import { BillingContext } from "../../context/Billing";
import AddEditPatientModal from "../Patient/AddEditPatient/AddEditPatientModal";
import AmountWithCurrancy from "../../components/AmountWithCurrancy";

const useStyles = createUseStyles({
  tabContent: {
    paddingTop: 20,
    paddingBottom: 20,
    // border: "none !important",
    borderRadius: 5,
  },
  navItem: {
    marginRight: "7px !important",
    width: 220,
  },
  navLink: {
    fontSize: "16px",
    fontWeight: 600,
    background: "#e6e9ed !important",
    border: "none !important",
    padding: "1em !important",
    textAlign: "center",
    borderRadius: "0.25rem !important",
    "&.step-done": {
      background: "#bcdcff !important",
      color: "#ffffff !important",
    },
    "&.active": {
      background: "#248afd !important",
      color: "#ffffff !important",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 14,
    "& > span": {
      padding: "0 20px",
      borderRight: "1px solid #ccc",
      "&.name": {
        fontWeight: 500,
      },
      "&.age,&.gender,&.outstandingAmt": {
        fontSize: "14px",
      },
      "&.no-border": {
        borderRight: "none",
      },
      "&.outstandingAmt > b": {
        color: "#df0000",
      },
    },
  },
});

const History = () => {
  return "History";
};

const Patient = () => {
  const classes = useStyles();

  const [state, actions] = useContext(PatientContext);
  const { patientData, profileActiveTab } = state;

  const [billState, billActions] = useContext(BillingContext);
  const { billSummary } = billState;

  const location = useLocation();
  const { selectedTab } = location.state;

  const [activeTab, setActiveTab] = useState(selectedTab);

  useEffect(() => {
    if (activeTab !== selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (patientData === null) {
      actions.getPatientById(location.pathname.split("/")[2], (res) => {
        let req = {
          id_doctor: localStorage.getItem("id_doctor"),
          id_patient: res.id_patient,
          id_clinic: res.id_clinic,
          totalBillAmount: 0,
          balanceBillAmount: 0,
        };
        billActions.getBillSummary(req);
      });
    }
  }, [patientData]);

  const tabs = [
    { name: "Profile", component: <Profile /> },
    { name: "Prescription", component: <Prescription /> },
    { name: "Billing", component: <Billings /> },
    { name: "History", component: <History /> },
  ];

  return (
    <div>
      <Card>
        {patientData !== null && (
          <div className={classes.header}>
            <span className="pl-0 name">
              {patientData.first_name} {patientData.last_name}
            </span>
            <span className="gender">{patientData.gender}</span>
            <span className="age">{patientData.age}</span>
            <span className="outstandingAmt no-border">
              O/s Amount:{" "}
              <b>
                <AmountWithCurrancy amount={billSummary.balanceBillAmount} />
              </b>
            </span>
          </div>
        )}

        <div className="tab-pills-horizontal">
          <Tab.Container id="top-tabs-example" activeKey={activeTab}>
            <Row>
              <Col xs={12}>
                <Nav variant="pills" className="flex-column">
                  {tabs.map((tab, ind) => {
                    return (
                      <Nav.Item
                        key={`tab+${ind}`}
                        onClick={() => {
                          setActiveTab(ind);
                        }}
                        className={classes.navItem}
                      >
                        <Nav.Link
                          eventKey={ind}
                          className={`${classes.navLink} ${
                            ind < activeTab ? "step-done" : ""
                          }`}
                        >
                          {tab.name}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Col>
              <Col xs={12}>
                <Tab.Content style={{ padding: "1rem 1rem" }}>
                  {tabs.map((tab, ind) => {
                    if (activeTab !== ind) return true;
                    return (
                      <Tab.Pane key={`tab+${ind}`} eventKey={ind}>
                        {tab.component}
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Card>
    </div>
  );
};

export default Patient;
