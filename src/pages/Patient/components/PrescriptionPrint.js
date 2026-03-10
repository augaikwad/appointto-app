import React from "react";
import { createUseStyles } from "react-jss";
import moment from "moment";
import RXImg from "../../../content/images/rx.png";
import { useSelector } from "react-redux";
import { timingOptions } from "../../../utils/constants";

const useStyles = createUseStyles({
  container: {
    background: "#fff",
    padding: "50px 70px",
    fontSize: 18,
    "@media print": {
      marginTop: (props) => `${props.hearder_margin}in`,
      marginBottom: (props) => `${props.footer_margin}in`,
      marginLeft: (props) => `${props.left_margin}in`,
      marginRight: (props) => `${props.right_margin}in`,
    },
  },
  header: {
    // background: "#ebebeb",
    display: "flex",
    "& > table": {
      width: "100%",
      borderBottom: "1px solid #b3b3b3",
      "& td": {
        padding: 12,
        fontSize: "18px",
      },
    },
  },
  body: {
    padding: "30px 0",
    "& .advices": {
      marginTop: 15,
      display: "flex",
      "& > i": {
        marginRight: 10,
      },
      "& ul": {
        fontSize: "12pt",
      },
    },
    "& .pt-12": {
      fontSize: "12pt",
    },
  },
  rxImgContainer: {
    marginTop: 10,
    "& > img": {
      height: 18,
    },
  },
  medicineRow: {
    fontSize: 18,
    "& > .sr": {
      width: 40,
      textAlign: "center",
      padding: "10px 12px",
    },
    "& .main-row": {
      display: "flex",
      "& > div": {
        padding: "10px 12px",
        fontSize: "18px",

        "&.medicine": {
          flex: 1,
        },
        "&.timing, &.duration, &.dose": {
          width: "15%",
        },
      },
    },
    "&.header": {
      borderBottom: "1px solid #5f5f5f",
      marginTop: 16,
      "& > div": {
        fontWeight: "bold",
      },
    },
    "&.body": {
      display: "flex",
      borderBottom: "1px solid #b3b3b3",
    },
  },
  footer: {
    "& > div": {
      textAlign: "right",
    },
  },
});

const PrescriptionPrint = React.forwardRef(({ data }, ref) => {
  const { prescriptionMargins } = useSelector((state) => state.settings);
  const { patientById } = useSelector((state) => state.patients);

  const classes = useStyles(prescriptionMargins);

  const getStringFromObj = (arr) => {
    return (
      !!arr &&
      arr.length > 0 &&
      arr
        .map((elem) => {
          return elem.name;
        })
        .join(",  ")
    );
  };

  const getTimingLabel = (value) => {
    const option = timingOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div style={{ display: "none" }}>
      <div ref={ref} className={classes.container}>
        <div className={classes.header}>
          <table>
            <tbody>
              <tr>
                <td width={"70px"}>
                  <b>Name</b>:
                </td>
                <td>
                  <b>{`${patientById?.first_name} ${patientById?.last_name} (${patientById?.age}y, ${patientById?.gender})`}</b>
                </td>
                <td width={"60px"}>
                  <b>Date</b>:
                </td>
                <td width={"130px"}>
                  {moment(data?.prescriptionDate).format("DD-MMM-yyyy")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.body}>
          <div>
            <i>
              <b>Diagnosis</b>
            </i>
            :{" "}
            <span className="pt-12">
              {getStringFromObj(data?.lstDiagnosis)}
            </span>
          </div>
          <div className={classes.rxImgContainer}>
            <img src={RXImg} />
          </div>
          <div className={`${classes.medicineRow} header`}>
            <div className="main-row">
              <div className="sr"></div>
              <div className="medicine">Medicine</div>
              <div className="dose">Dose</div>
              <div className="timing">Timing</div>
              <div className="duration">Duration</div>
            </div>
          </div>
          {!!data.prescribedMedicines &&
            data.prescribedMedicines.length > 0 &&
            data.prescribedMedicines.map((med, ind) => {
              return (
                <div className={`${classes.medicineRow} body`}>
                  <div className="sr">
                    <b>{ind + 1}</b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <div className={`main-row`}>
                      <div className="medicine">
                        <b>
                          {med.type}. {med.medicineName}
                        </b>
                      </div>
                      <div className="dose">
                        {med.dose} {`(${med.unit})`}
                      </div>
                      <div className="timing">{getTimingLabel(med.timing)}</div>
                      <div className="duration">{med.duration}</div>
                    </div>
                    {med.note && med.note.trim() !== "" && (
                      <div style={{ padding: "0 12px 10px" }}>
                        <b>Note:</b>
                        {med.note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          <div className="advices">
            <i>
              <b>Advice</b>
            </i>
            <ul>
              {!!data?.lstAdvice &&
                data?.lstAdvice.length > 0 &&
                data?.lstAdvice.map((elem) => {
                  return <li key={elem.id_advice}>{elem.name}</li>;
                })}
            </ul>
            {/* : {getStringFromObj(data?.lstAdvice)} */}
          </div>
          <div className="nextVisitDate">
            <i>
              <b>Follow Up Date:</b>
            </i>
            {` ${data?.nextVisitDate ? moment(data.nextVisitDate).format("DD-MMM-yyyy") : "N/A"}`}
          </div>
        </div>
        <div className={classes.footer}>
          <div>
            <b>{`Dr. ${data?.doctorName}`}</b>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrescriptionPrint;
