import React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  tabContent: {
    paddingTop: 20,
    paddingBottom: 20,
    // border: "none !important",
    borderRadius: 5,
  },
  navItem: {
    marginRight: "0 !important",
    marginBottom: "7px !important",
  },
  navLink: {
    fontSize: "16px",
    fontWeight: 600,
    background: "#e6e9ed !important",
    border: "none !important",
    padding: "1em !important",
    textAlign: "center",
    borderRadius: "0.25rem !important",
    "&.step-done":{
      background: "#bcdcff !important",
      color: "#ffffff !important",
    },
    "&.active": {
      background: "#248afd !important",
      color: "#ffffff !important",
    },
  },
});

const VerticalTabs = ({ tabs = [], selectedTab, setSelectedTab }) => {
  const classes = useStyles();
  return (
    <div className="tab-pills-vertical">
      <Tab.Container
        id="left-tabs-example"
        activeKey={selectedTab}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {tabs.map((tab, ind) => {
                return (
                  <Nav.Item
                    key={`tab+${ind}`}
                    onClick={() => {
                      setSelectedTab(ind);
                    }}
                    className={classes.navItem}
                  >
                    <Nav.Link
                      eventKey={ind}
                      className={`${classes.navLink} ${
                        ind < selectedTab ? "step-done" : ""
                      }`}
                    >
                      {tab.name}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className={classes.tabContent}>
              {tabs.map((tab, ind) => {
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
  );
};

export default VerticalTabs;
