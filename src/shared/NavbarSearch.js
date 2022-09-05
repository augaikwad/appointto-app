import React from "react";
import AddEditPatientModal from "../pages/Patient/AddEditPatientModal";
import { Typeahead } from "react-bootstrap-typeahead";
import { createUseStyles } from "react-jss";
import cogoToast from "cogo-toast";
import CreateAppointmentModal from "../pages/Patient/CreateAppointmentModal";

const useStyles = createUseStyles({
  customMenuItem: {
    display: "flex",
    alignItems: "center",
    "& > div.label": {
      flex: 1,
    },
  },
});

const NavbarSearch = () => {
  const classes = useStyles();

  const [modalState, setModalState] = React.useState({
    title: "Add Patient",
    show: false,
    selectedTab: 0,
  });

  const [appointmentModal, setAppointmentModal] = React.useState({
    title: "Add Appointment",
    show: false,
  });

  return (
    <>
      <div className="input-group">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            style={{ borderRadius: "0.1875rem 0 0 0.1875rem" }}
          >
            <i className="ti-search"></i>
          </span>
        </div>
        <Typeahead
          labelKey="label"
          id="globalSearch"
          name="globalSearch"
          minLength={3}
          options={[
            { value: 1, label: "Soham Thorait" },
            { value: 2, label: "Bala Naik" },
            { value: 3, label: "Karan Ahuja" },
            { value: 4, label: "Shyam Kumar" },
          ]}
          renderMenuItemChildren={(option, props, index) => {
            return (
              <div className={classes.customMenuItem}>
                <div className="label">{option.label}</div>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() =>
                    cogoToast.success("Successfully added in Queue.", {
                      position: "top-right",
                    })
                  }
                >
                  Add to Queue
                </button>
                <button
                  className="btn btn-sm btn-link"
                  onClick={() =>
                    setAppointmentModal({ ...appointmentModal, show: true })
                  }
                >
                  Add Appointment
                </button>
              </div>
            );
          }}
          placeholder="Search & Add Patients"
          className="globalSearchField"
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-primary btn-icon-text"
            onClick={() =>
              setModalState({
                ...modalState,
                ...{ show: true, selectedTab: 0 },
              })
            }
          >
            <i className="ti-plus btn-icon-prepend"></i>
            Add Patient
          </button>
        </div>
      </div>
      <CreateAppointmentModal
        {...appointmentModal}
        onHide={() => setAppointmentModal({ ...appointmentModal, show: false })}
      />
      <AddEditPatientModal
        {...modalState}
        onHide={() =>
          setModalState({ ...modalState, ...{ show: false, selectedTab: 0 } })
        }
      />
    </>
  );
};

export default NavbarSearch;
