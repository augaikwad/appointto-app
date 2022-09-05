import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, VerticalTabs } from "../../components";
import General from "./General";
import Medical from "./Medical";
import Additional from "./Additional";
import Documents from "./Documents";
import CreateAppointmentModal from "./CreateAppointmentModal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  buttonMinWidth: {
    minWidth: 140,
  },
});

const FooterActions = (props) => {
  const { tabs, activeTab, setActiveTab, appointmentModal, patientModal } =
    props;

  const classes = useStyles();

  return (
    <>
      <div className="col-lg-3"></div>
      <div className="col-lg-9 d-flex">
        <div style={{ flex: "1" }}>
          <Button
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
          </Button>
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
              onClick={() => patientModal.onModalHide()}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const AddEditPatientModal = ({
  title = "Patient",
  show = false,
  onHide = () => {},
  selectedTab,
}) => {
  const tabs = [
    { name: "General", component: <General /> },
    { name: "Medical", component: <Medical /> },
    { name: "Additional", component: <Additional /> },
    { name: "Documents", component: <Documents /> },
  ];

  const [appointmentModal, setAppointmentModal] = useState({
    show: false,
  });

  const [activeTab, setActiveTab] = useState(parseInt(selectedTab));

  useEffect(() => {
    if (activeTab !== selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  const onModalHide = () => {
    onHide(false);
    setActiveTab(0);
  };

  const footerActionsProps = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    tabs: tabs,
    patientModal: {
      onModalHide,
    },
    appointmentModal: {
      state: appointmentModal,
      setState: setAppointmentModal,
    },
  };

  return (
    <>
      <CreateAppointmentModal
        {...appointmentModal}
        onHide={() => setAppointmentModal({ ...appointmentModal, show: false })}
      />
      <Modal
        title={title}
        show={show}
        onHide={() => onModalHide()}
        dialogClassName="modal-1030px"
        footerActions={<FooterActions {...footerActionsProps} />}
      >
        <VerticalTabs
          tabs={tabs}
          selectedTab={activeTab}
          setSelectedTab={(key) => setActiveTab(key)}
        />
      </Modal>
    </>
  );
};

export default AddEditPatientModal;
