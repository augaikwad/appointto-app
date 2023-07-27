import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { DatePickerField, SelectField } from "../../components/Forms";
import { useForm, FormProvider } from "react-hook-form";
import { AppointmentContext } from "../../context/Appointment";
import { DoctorContext } from "../../context/Doctor";

const useStyles = createUseStyles({
  queueForFilter: {
    "& > .form-group": {
      marginBottom: 0,
      "& > label": {
        marginBottom: 0,
      },
    },
  },
  dateFilter: {
    marginLeft: 10,
    width: 140,
    "& > .form-group": {
      margin: 0,
    },
  },
});

const ListFilters = () => {
  const classes = useStyles();

  const [activeBtn, setActiveBtn] = useState(0);

  const [state, actions] = useContext(AppointmentContext);
  const { filters } = state;

  const [drState, drActions] = useContext(DoctorContext);
  const { doctorsByClinicId } = drState;

  const form = useForm({
    defaultValues: { ...filters },
  });

  const { setValue, getValues } = form;

  useEffect(() => {
    drActions.getDoctorsByClinicId(
      parseInt(localStorage.getItem("id_clinic")),
      (docList) => {
        let idDoctor = parseInt(localStorage.getItem("id_doctor"));
        if (idDoctor === 0) {
          idDoctor = docList[0].id_doctor;
        }
        setValue("id_doctor", idDoctor);
        actions.setFilters({ id_doctor: idDoctor });
      }
    );
  }, []);

  const filterList = (name, value) => {
    let req = getValues();
    req[name] = value;
    actions.setFilters(req);
  };

  const appointmentStatus = [
    { id: "0", label: "All" },
    { id: "3", label: "Completed" },
    { id: "4", label: "No Show" },
  ];

  return (
    <FormProvider {...form}>
      <form>
        <div className="row">
          <div
            className={`col-lg-4 ${classes.queueForFilter}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <SelectField
              label="Queue For"
              name="id_doctor"
              labelField="first_name"
              valueField="id_doctor"
              options={doctorsByClinicId}
              inline={true}
              labelWidth={78}
              optionRenderer={(opt) =>
                `Dr. ${opt?.first_name} ${opt?.last_name}`
              }
              onChange={(e) => {
                filterList("id_doctor", e.target.value);
              }}
            />
          </div>
          <div
            className="col-lg-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="form-check">
              <Button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setValue("appointment_date", new Date());
                  filterList("appointment_date", new Date());
                }}
              >
                Today
              </Button>
            </div>
            <div className={classes.dateFilter}>
              <DatePickerField
                name="appointment_date"
                inputOnChange={(date) => {
                  filterList("appointment_date", date);
                }}
              />
            </div>
          </div>
          <div
            className="col-lg-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <div className="btn-group" role="group" aria-label="Basic example">
              {appointmentStatus.map((btn, ind) => {
                return (
                  <button
                    key={ind}
                    type="button"
                    className={`btn btn-sm ${
                      activeBtn === ind
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => {
                      setActiveBtn(ind);
                      filterList("appointment_status", btn.id);
                    }}
                    style={{ minWidth: 95 }}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ListFilters;
