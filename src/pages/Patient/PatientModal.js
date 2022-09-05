import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, VerticalTabs } from "../../components";
import Profile from "./Profile";
import Prescription from "./Prescription";
import Billings from "./Billings";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  buttonMinWidth: {
    minWidth: 140,
  },
  modalHeader:{
    display:'flex',
    alignItems:'center',
    "& > span":{
      padding:'0 20px',
      borderRight:'1px solid #ccc',
      "&.age":{
        fontSize:'14px',
        borderRight:'none'
      }
    }
  }
});

const History = () => {
  return "History";
};

const PatientModal = ({ show = false, onHide = () => {}, selectedTab }) => {
  const classes = useStyles();

  const data = {
    firstName: "Soham",
    lastName: "Thorait",
    gender: "Male",
    mobileNo: "1234567890",
    dob: "",
    age: "20 Years",
    email: "abc@xyz.com",
    osAmt: "Rs 2000",
  };

  const tabs = [
    { name: "Profile", component: <Profile data={data}/> },
    { name: "Prescription", component: <Prescription /> },
    { name: "Billing", component: <Billings /> },
    { name: "History", component: <History /> },
  ];
  const [activeTab, setActiveTab] = useState(selectedTab);

  const getModalActions = () => {
    let actions = [];

    actions.push(<Button variant="primary mr-2 btn-sm">Save & Next</Button>);
    actions.push(<Button variant="primary mr-2 btn-sm">Save</Button>);
    actions.push(<Button variant="primary mr-2 btn-sm">Save & Print</Button>);

    return actions;
  };

  const ModalTitle = (props) => {
    const { name, age } = props.data;
    return (
      <div className={classes.modalHeader}>
        <span>{name}</span>
        <span className="age">{age}</span>
      </div>
    );
  };

  const FooterActions = () => {
    return (
      <>
        <div className="col-lg-3"></div>
        <div className="col-lg-9 d-flex">
          <div style={{ flex: "1" }}>
            {/* <Button
              variant="primary mr-2 btn-sm"
              className={classes.buttonMinWidth}
              onClick={() => alert("Added to Queue")}
            >
              Add to Queue
            </Button>
            <Button
              variant="primary btn-sm"
              className={classes.buttonMinWidth}
              onClick={() =>
                appointmentModal.setState({
                  ...appointmentModal.state,
                  show: true,
                })
              }
            >
              Add Appointment
            </Button> */}
          </div>
          <div>
            {activeTab >= 1 && (
              <Button
                variant="primary mr-2 btn-sm"
                className={classes.buttonMinWidth}
                onClick={() => setActiveTab(activeTab - 1)}
              >
                Previous
              </Button>
            )}
            {tabs.length - 1 !== activeTab && (
              <Button
                variant="primary btn-sm"
                className={classes.buttonMinWidth}
                onClick={() => setActiveTab(activeTab + 1)}
              >
                Next
              </Button>
            )}
            {tabs.length === activeTab + 1 && (
              <Button
                variant="primary btn-sm"
                className={classes.buttonMinWidth}
                // onClick={() => patientModal.onModalHide()}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </>
    );
  };


  return (
    <Modal
      title={
        <ModalTitle
          data={{
            name: "Soham Thorait",
            age: "20 Years",
          }}
        />
      }
      show={show}
      onHide={onHide}
      footerActions={<FooterActions />}
    >
      <VerticalTabs
        tabs={tabs}
        selectedTab={activeTab}
        setSelectedTab={(key) => setActiveTab(key)}
      />
    </Modal>
  );
};

export default PatientModal;
