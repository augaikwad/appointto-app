import React from "react";
import { createUseStyles } from "react-jss";
import AddEditPatientModal from "./AddEditPatientModal";

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

const Profile = ({ data }) => {
  const classes = useStyles();

  const { firstName, lastName, gender, mobileNo, dob, age, email } = data;

  const [modalState, setModalState] = React.useState({
    title: "Edit Patient",
    show: false,
    selectedTab: 0,
  });

  return (
    <>
      <AddEditPatientModal
        {...modalState}
        onHide={() =>
          setModalState({ ...modalState, ...{ show: false, selectedTab: 0 } })
        }
      />
      <div className="row">
        <div className={`col-lg-4 ${classes.cardContainer}`}>
          <div className={classes.card}>
            <h6 className={classes.cardHeader}>
              General{" "}
              <button
                className={`btn btn-sm btn-primary ${classes.smAddBtn}`}
                onClick={() =>
                  setModalState({
                    ...modalState,
                    ...{ show: true, selectedTab: 0 },
                  })
                }
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
                      {firstName} {lastName}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Gender:</label>
                    <div>{gender}</div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group inline-form-group">
                    <label>D. O. B.:</label>
                    <div>{!!dob ? dob : "-"}</div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="form-group inline-form-group">
                    <label>Age:</label>
                    <div>{age}</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Mobile:</label>
                    <div>{mobileNo}</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Emergency Contact No.:</label>
                    <div>{mobileNo}</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Email:</label>
                    <div>{email}</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Address:</label>
                    <div>Lorem Ipsum es simplemente el texto de relleno de</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Area:</label>
                    <div>Lorem Ipsum es simplemente</div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group inline-form-group">
                    <label>City:</label>
                    <div>Aurangabad</div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="form-group inline-form-group">
                    <label>Pin:</label>
                    <div>123456</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Referred By:</label>
                    <div>Dr. XYZ</div>
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
                onClick={() =>
                  setModalState({
                    ...modalState,
                    ...{ show: true, selectedTab: 1 },
                  })
                }
              >
                <i className="fa fa-pencil"></i>
              </button>
            </h6>
            <div className={classes.cardContent}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <div>High BP, Asthma, Diabetes</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Allergies:</label>
                    <div>ABC, EFG, XYZ</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Blood Group:</label>
                    <div>O+</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Current Medications:</label>
                    <div>ABC, EFG, XYZ</div>
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
                onClick={() =>
                  setModalState({
                    ...modalState,
                    ...{ show: true, selectedTab: 2 },
                  })
                }
              >
                <i className="fa fa-pencil"></i>
              </button>
            </h6>
            <div className={classes.cardContent}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Habits:</label>
                    <div>Tobacco Chewing, Smoking, Alcohol</div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <label>Diet:</label>
                    <div>Mix</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
