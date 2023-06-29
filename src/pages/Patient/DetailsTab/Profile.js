import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { PatientContext } from "../../../context/Patient";
import moment from "moment";

const useStyles = createUseStyles({
  smAddBtn: {
    padding: 3,
    fontSize: 8,
    marginLeft: "13px",
    borderRadius: "50%",
    height: 20,
    width: 20,
    textAlign: "center",
    "& > .fa": {
      fontSize: "13px",
    },
  },
  cardContainer: {
    display: "flex",
  },
  card: {
    flex: "1",
    backgroundColor: "#e7f2ff",
    padding: "10px 15px",
    borderRadius: "5px",
  },
  cardHeader: {
    marginBottom: "20px",
  },
  cardContent: {
    "& div.form-group": {
      marginBottom: 10,

      "& > label": {
        marginBottom: "0px",
      },
      "& > div": {
        fontSize: "14px",
      },
      "&.inline-form-group": {
        display: "flex",
        alignItems: "flex-start",
        textAlign: "left",
        "& > label": {
          paddingRight: 8,
          lineHeight: "17px",
        },
      },
    },
  },
});

const Profile = () => {
  const classes = useStyles();

  const [state, actions] = useContext(PatientContext);
  const { patientData } = state;

  return (
    <>
      {patientData !== null && (
        <div className="row">
          <div className={`col-lg-4 ${classes.cardContainer}`}>
            <div className={classes.card}>
              <h6 className={classes.cardHeader}>
                General{" "}
                <button
                  className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
                  onClick={() => {
                    actions.setActiveTab(0);
                    actions.setPatientModal({
                      open: true,
                      isAdd: false,
                      formValue: patientData,
                    });
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </h6>
              <div className={classes.cardContent}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Name:</label>
                      <div>
                        {patientData.first_name} {patientData.last_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Gender:</label>
                      <div>{patientData.gender}</div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="form-group inline-form-group">
                      <label>D. O. B.:</label>
                      <div>
                        {!!patientData.dob
                          ? moment(new Date(patientData.dob)).format(
                              "DD/MM/yyyy"
                            )
                          : "-"}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="form-group inline-form-group">
                      <label>Age:</label>
                      <div>{patientData.age}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Mobile:</label>
                      <div>{patientData.mobile_number}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Emergency Contact No.:</label>
                      <div>{patientData.emergency_contact}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Email:</label>
                      <div>{patientData.email_id}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Address:</label>
                      <div>{patientData.address}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Area:</label>
                      <div>{patientData.area}</div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="form-group inline-form-group">
                      <label>City:</label>
                      <div>{patientData.city}</div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="form-group inline-form-group">
                      <label>Pin:</label>
                      <div>{patientData.pincode}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Referred By:</label>
                      <div>{patientData.reffered_by}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-lg-4 ${classes.cardContainer}`}>
            <div className={classes.card}>
              <h6 className={classes.cardHeader}>
                Medical{" "}
                <button
                  className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
                  onClick={() => {
                    actions.setActiveTab(1);
                    actions.setPatientModal({
                      open: true,
                      isAdd: false,
                      formValue: patientData,
                    });
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </h6>
              <div className={classes.cardContent}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <div>{patientData.medicalPrecondition}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Allergies:</label>
                      <div>{patientData.allergies}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Blood Group:</label>
                      <div>{patientData.blood_group}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Current Medications:</label>
                      <div>{patientData.current_medicine}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-lg-4 ${classes.cardContainer}`}>
            <div className={classes.card}>
              <h6 className={classes.cardHeader}>
                Additional{" "}
                <button
                  className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
                  onClick={() => {
                    actions.setActiveTab(2);
                    actions.setPatientModal({
                      open: true,
                      isAdd: false,
                      formValue: patientData,
                    });
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </h6>
              <div className={classes.cardContent}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Habits:</label>
                      <div>{patientData.habbits}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Diet:</label>
                      <div>{patientData.diet}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
