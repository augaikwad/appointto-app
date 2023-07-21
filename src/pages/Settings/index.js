import React, { useState, useEffect, useContext } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Card } from "../../components";
import { PrescriptionSetting, Users } from "./Tabs";
import { createUseStyles } from "react-jss";
import { SettingsContext } from "../../context/Settings";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  const classes = useStyles();

  const [state, actions] = useContext(SettingsContext);

  useEffect(() => {
    actions.getPrintingSetting();
  }, []);
  console.log("state === ", state);
  const tabs = [
    { name: "Users", component: <Users /> },
    { name: "Prescription", component: <PrescriptionSetting /> },
  ];

  return (
    <div style={{ flex: 1 }}>
      <Card>
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
                          className={`${classes.navLink}`}
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

export default Index;
