import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import { Modal } from "../../../components";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navItem: {},
  navLink: {
    padding: "8px 20px!important",
    background: "#ccc !important",
    borderRadius: "3px !important",
    color: "#3c3c3c !important",
    border: "none !important",
    "&.active": {
      color: "#fff !important",
      backgroundColor: "#007bff !important",
    },
  },
  noBorder: {
    border: "none !important",
  },
  toothContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > div": {
      width: "50%",
      padding: 7,
      "&.topLeft, &.topRight": {
        borderBottom: "3px solid #ccc",
      },
      "&.topLeft, &.bottomLeft": {
        borderRight: "3px solid #ccc",
        textAlign: "right",
      },
      "& > button.btn": {
        marginLeft: 4,
        height: 30,
        width: 30,
      },
    },
  },
});

const ToothChartModal = ({
  show = false,
  onHide = () => {},
  footerActions,
}) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const handleToothClick = (key, ind, item, tooth, setTooth) => {
    let toothData = { ...tooth };
    toothData[key][ind].isSelected = !item.isSelected;
    setTooth(toothData);
  };

  const RenderTooths = ({ field, tooth, setTooth }) => {
    return (
      <div className={field}>
        {tooth[field].map((item, ind) => {
          return (
            <button
              key={ind}
              className={`btn btn-icon ${
                item.isSelected ? "btn-secondary" : "btn-outline-secondary"
              }`}
              onClick={() =>
                handleToothClick(field, ind, item, tooth, setTooth)
              }
            >
              {item.id}
            </button>
          );
        })}
      </div>
    );
  };

  const toothFields = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

  const Permanent = () => {
    const classes = useStyles();

    const [tooth, setTooth] = useState({
      topLeft: [
        { id: 18, isSelected: false },
        { id: 17, isSelected: false },
        { id: 16, isSelected: false },
        { id: 15, isSelected: false },
        { id: 14, isSelected: false },
        { id: 13, isSelected: false },
        { id: 12, isSelected: false },
        { id: 11, isSelected: false },
      ],
      topRight: [
        { id: 21, isSelected: false },
        { id: 22, isSelected: false },
        { id: 23, isSelected: false },
        { id: 24, isSelected: false },
        { id: 25, isSelected: false },
        { id: 26, isSelected: false },
        { id: 27, isSelected: false },
        { id: 28, isSelected: false },
      ],
      bottomLeft: [
        { id: 48, isSelected: false },
        { id: 47, isSelected: false },
        { id: 46, isSelected: false },
        { id: 45, isSelected: false },
        { id: 44, isSelected: false },
        { id: 43, isSelected: false },
        { id: 42, isSelected: false },
        { id: 41, isSelected: false },
      ],
      bottomRight: [
        { id: 31, isSelected: false },
        { id: 32, isSelected: false },
        { id: 33, isSelected: false },
        { id: 34, isSelected: false },
        { id: 35, isSelected: false },
        { id: 36, isSelected: false },
        { id: 37, isSelected: false },
        { id: 38, isSelected: false },
      ],
    });

    return (
      <div className={classes.toothContainer}>
        {toothFields.map((elem) => {
          return (
            <RenderTooths field={elem} tooth={tooth} setTooth={setTooth} />
          );
        })}
      </div>
    );
  };

  const Deciduous = () => {
    const [tooth, setTooth] = useState({
      topLeft: [
        { id: 55, isSelected: false },
        { id: 54, isSelected: false },
        { id: 53, isSelected: false },
        { id: 52, isSelected: false },
        { id: 51, isSelected: false },
      ],
      topRight: [
        { id: 61, isSelected: false },
        { id: 62, isSelected: false },
        { id: 63, isSelected: false },
        { id: 64, isSelected: false },
        { id: 65, isSelected: false },
      ],
      bottomLeft: [
        { id: 85, isSelected: false },
        { id: 84, isSelected: false },
        { id: 83, isSelected: false },
        { id: 82, isSelected: false },
        { id: 81, isSelected: false },
      ],
      bottomRight: [
        { id: 71, isSelected: false },
        { id: 72, isSelected: false },
        { id: 73, isSelected: false },
        { id: 74, isSelected: false },
        { id: 75, isSelected: false },
      ],
    });
    return (
      <div className={classes.toothContainer}>
        {toothFields.map((elem) => {
          return (
            <RenderTooths field={elem} tooth={tooth} setTooth={setTooth} />
          );
        })}
      </div>
    );
  };

  const tabs = [
    { name: "Permanent", component: <Permanent /> },
    { name: "Deciduous", component: <Deciduous /> },
  ];
  return (
    <Modal
      id="ToothChartModal"
      title="Tooth Chart"
      show={show}
      onHide={() => onHide()}
      size="lg"
      footerActions={footerActions}
    >
      <div className="tab-pills-horizontal">
        <Tab.Container id="left-tabs-example" activeKey={activeTab}>
          <Nav variant="pills" className={`flex-column ${classes.noBorder}`}>
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
    </Modal>
  );
};

export default ToothChartModal;
