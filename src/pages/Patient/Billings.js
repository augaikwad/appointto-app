import React, { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import AddBill from "./Billing/AddBill";
import PaymentReceived from "./Billing/PaymentReceived";
import Bills from "./Billing/Bills";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navItem: {
    marginRight: "0 !important",
    borderLeft: "1px solid #ccc",
    "&:first-child": {
      borderLeft: "none",
    },
  },
  navLink: {
    border: "none !important",
    background: "transparent !important",
    padding: "8px 16px !important",
    minWidth: 115,
    textAlign: "center",
    "&.active": {
      color: "#0056b3 !important",
      fontWeight: 500,
    },
  },
  noBorder: {
    borderBottom: "none !important",
    paddingBottom: "0 !important",
  },
});

const Billings = () => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Add Bill", component: <AddBill /> },
    { name: "Bills", component: <Bills /> },
    { name: "Payment Received", component: <PaymentReceived /> },
  ];

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="tab-pills-horizontal">
            <Tab.Container id="left-tabs-example" activeKey={activeTab}>
              <Nav
                variant="pills"
                className={`flex-column ${classes.noBorder}`}
              >
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
              <Tab.Content
                style={{
                  border: "none",
                  padding: "1rem 1rem",
                  margin: "0 -15px",
                }}
              >
                {tabs.map((tab, ind) => {
                  return (
                    <Tab.Pane key={`tab+${ind}`} eventKey={ind}>
                      {tab.component}
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billings;
