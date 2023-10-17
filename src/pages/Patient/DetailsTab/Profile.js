import React from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { formattedObjForPatientForm } from "../../../store/actions/dataFormatters/patients";
import {
  setActiveTab,
  setPatientModal,
} from "../../../store/reducers/patientSlice";

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
  const dispatch = useDispatch();

  const { patientById } = useSelector((state) => state.patients);

  return (
    <>
      {patientById !== null && (
        <div className="row">
          <div className={`col-lg-4 ${classes.cardContainer}`}>
            <div className={classes.card}>
              <h6 className={classes.cardHeader}>
                General{" "}
                <button
                  className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
                  onClick={() => {
                    dispatch(setActiveTab(0));
                    dispatch(
                      setPatientModal({
                        open: true,
                        isAdd: false,
                        formValue: formattedObjForPatientForm(patientById),
                      })
                    );
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
                        {patientById.first_name} {patientById.last_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Gender:</label>
                      <div>{patientById.gender}</div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="form-group inline-form-group">
                      <label>D. O. B.:</label>
                      <div>
                        {!!patientById.dob
                          ? moment(new Date(patientById.dob)).format(
                              "DD/MM/yyyy"
                            )
                          : "-"}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="form-group inline-form-group">
                      <label>Age:</label>
                      <div>{patientById.age}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Mobile:</label>
                      <div>{patientById.mobile_number}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Emergency Contact No.:</label>
                      <div>{patientById.emergency_contact}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Email:</label>
                      <div>{patientById.email_id}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Address:</label>
                      <div>{patientById.address}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Area:</label>
                      <div>{patientById.area}</div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="form-group inline-form-group">
                      <label>City:</label>
                      <div>{patientById.city}</div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="form-group inline-form-group">
                      <label>Pin:</label>
                      <div>{patientById.pincode}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Referred By:</label>
                      <div>{patientById.reffered_by}</div>
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
                    dispatch(setActiveTab(1));
                    dispatch(
                      setPatientModal({
                        open: true,
                        isAdd: false,
                        formValue: formattedObjForPatientForm(patientById),
                      })
                    );
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </h6>
              <div className={classes.cardContent}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <div>{patientById.medicalPrecondition}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Allergies:</label>
                      <div>{patientById.allergies}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Blood Group:</label>
                      <div>{patientById.blood_group}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Current Medications:</label>
                      <div>{patientById.current_medicine}</div>
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
                    dispatch(setActiveTab(2));
                    dispatch(
                      setPatientModal({
                        open: true,
                        isAdd: false,
                        formValue: formattedObjForPatientForm(patientById),
                      })
                    );
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
                      <div>{patientById.habbits}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group inline-form-group">
                      <label>Diet:</label>
                      <div>{patientById.diet}</div>
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
