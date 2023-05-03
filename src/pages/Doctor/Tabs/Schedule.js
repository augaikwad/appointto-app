import React, { useContext, useEffect } from "react";
import { DateTimePickerField } from "../../../components/Forms";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { DoctorContext } from "../../../context/Doctor";
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles({
  customErrorMsg: {
    position: "absolute",
    left: 15,
    bottom: 13,
  },
  daysCheckboxes: {
    "&>div": {
      width: 60,
    },
  },
  thankyouOverlay: {
    display: "none",
    position: "fixed",
    zIndex: "9999",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "#0862bf",
    "& > div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > i.fa": {
        color: "green",
        fontSize: "53px",
        marginBottom: "15px",
      },
      "& > h5": {
        color: "#fff",
        fontSize: "24px",
      },
    },
    "&.active": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const Schedule = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const [days, setDays] = React.useState([
    { name: "Sunday", selected: false, start_time: "-", end_time: "-" },
    { name: "Monday", selected: false, start_time: "-", end_time: "-" },
    { name: "Tuesday", selected: false, start_time: "-", end_time: "-" },
    { name: "Wednesday", selected: false, start_time: "-", end_time: "-" },
    { name: "Thursday", selected: false, start_time: "-", end_time: "-" },
    { name: "Friday", selected: false, start_time: "-", end_time: "-" },
    { name: "Saturday", selected: false, start_time: "-", end_time: "-" },
  ]);

  const [states, actions] = useContext(DoctorContext);
  const { registrationActiveTab, clinicInfo } = states;

  const form = useForm();

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const GetTimeFormatter = (field, rowData) => {
    return rowData.hasOwnProperty(field) && rowData.selected
      ? rowData[field]
      : "-";
  };

  const columns = [
    { field: "name", label: "Days" },
    { field: "start_time", label: "Start Time", formatter: GetTimeFormatter },
    { field: "end_time", label: "End Time", formatter: GetTimeFormatter },
  ];

  const handleOnSelectAll = (e) => {
    const { checked } = e.target;
    let newDays = [...days];
    if (!checked) {
      newDays = newDays.map((opt) => ({ ...opt, selected: false }));
    } else {
      newDays = newDays.map((opt) => ({ ...opt, selected: true }));
    }
    setDays(newDays);
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;
    let newDays = [...days];
    const index = newDays.findIndex((h) => h.name === name);
    if (index > -1) {
      newDays[index] = { ...newDays[index], selected: checked };
    }
    setDays(newDays);
  };

  const handleTimeChange = (name, val) => {
    let newDays = [...days];
    newDays.forEach((object) => {
      object[name] = moment(new Date(val)).format("h:mmA");
    });
    setDays(newDays);
  };

  const onSubmit = (data) => {
    let newDays = [...days];

    newDays.forEach((object) => {
      object.id_clinic =
        !!clinicInfo && clinicInfo.hasOwnProperty("id_clinic")
          ? clinicInfo.id_clinic
          : null;
      object.id_clinic_availibility = 0;
      object.status = 1;
      object.Clinic = null;
      object.created_date = null;
      object.created_by = null;
      object.updated_date = null;
      object.updated_by = null;
    });

    actions.updateScheduleInfo(newDays, () => {
      setOpen(true);
    });
  };

  const TankYouNotification = () => {
    useEffect(() => {
      if (open) {
        setTimeout(() => {
          actions.resetOTPData();
          localStorage.clear();
          history.push("login");
          setOpen(false);
        }, 2000);
      }
    }, [open]);

    return (
      <div className={`${classes.thankyouOverlay} ${open ? "active" : ""}`}>
        <div>
          <i className="fa fa-check-circle"></i>
          <h5>Thank you for your registration.</h5>
        </div>
      </div>
    );
  };

  return (
    <>
      {!open && (
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Available Days{" "}
                    <span style={{ color: "red", marginLeft: 2 }}>*</span>
                  </label>
                  <div
                    className={`custom-form-check-inline ${classes.daysCheckboxes}`}
                  >
                    <div className="form-check form-check-primary">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={(e) => handleOnSelectAll(e)}
                          checked={days.every((opt) => opt.selected)}
                        />
                        All
                        <i className="input-helper"></i>
                      </label>
                    </div>

                    {days.map((opt, ind) => {
                      return (
                        <div
                          key={ind}
                          className="form-check form-check-primary"
                        >
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={opt.name}
                              onChange={(e) => handleOnChange(e)}
                              checked={opt.selected}
                            />
                            {opt.name.substring(0, 3)}
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <DateTimePickerField
                  label="Start time"
                  name="start_time"
                  dateFormat="h:mmaa"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  rules={{
                    required: "Please Enter Start Time",
                  }}
                  inputOnChange={(date) => handleTimeChange("start_time", date)}
                />
              </div>
              <div className="col-lg-3">
                <DateTimePickerField
                  label="End Time"
                  name="end_time"
                  dateFormat="h:mmaa"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  rules={{
                    required: "Please Enter End Time",
                  }}
                  inputOnChange={(date) => handleTimeChange("end_time", date)}
                />
              </div>
              <div className="col-lg-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {columns.map((col, i) => {
                        return (
                          <th key={i} className="text-center p-2">
                            {col.label}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((row, ind) => {
                      return (
                        <tr key={ind}>
                          {columns.map((col, i) => {
                            return (
                              <td key={i} className="text-center p-2">
                                {col.formatter
                                  ? col.formatter(col.field, row)
                                  : row[col.field]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-12 clearfix">
                <div className="float-right pt-3">
                  <Button
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      actions.setRegistrationActiveTab(
                        registrationActiveTab - 1
                      )
                    }
                  >
                    Previous
                  </Button>
                  <Button className="btn btn-sm btn-primary ml-3" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
      <TankYouNotification open={open} />
    </>
  );
};

export default Schedule;
