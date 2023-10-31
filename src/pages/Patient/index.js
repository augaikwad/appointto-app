import React, { useEffect, useState, useContext } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Card } from "../../components";
import { Profile, Prescription, Billings } from "./DetailsTab";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router-dom";
import { BillingContext } from "../../context/Billing";
import AmountWithCurrancy from "../../components/AmountWithCurrancy";
import { useDispatch, useSelector } from "react-redux";
import { getAllBillingDataAction } from "../../store/actions/billingActions";

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
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { patientById } = useSelector((state) => state.patients);
  const { billSummary } = useSelector((state) => state.billings);

  const location = useLocation();
  const { selectedTab } = location.state;

  const [activeTab, setActiveTab] = useState(selectedTab);

  useEffect(() => {
    if (activeTab !== selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (patientById) {
      dispatch(
        getAllBillingDataAction({
          id_doctor: id_doctor,
          id_patient: patientById.id_patient,
          id_clinic: patientById.id_clinic,
        })
      );
    }
  }, []);

  const tabs = [
    { name: "Profile", component: <Profile /> },
    { name: "Prescription", component: <Prescription /> },
    { name: "Billing", component: <Billings /> },
    // { name: "History", component: <History /> },
  ];

  return (
    <div style={{ flex: 1 }}>
      <Card>
        <div className={classes.header}>
          <span className="pl-0 name">
            {patientById.first_name} {patientById.last_name}
          </span>
          <span className="gender">{patientById.gender}</span>
          <span className="age">{patientById.age}</span>
          <span className="outstandingAmt no-border">
            O/s Amount:{" "}
            <b>
              <AmountWithCurrancy amount={billSummary.balanceBillAmount} />
            </b>
          </span>
        </div>
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
