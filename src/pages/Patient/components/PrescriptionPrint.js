import React from "react";
import { createUseStyles } from "react-jss";
import moment from "moment";
import RXImg from "../../../content/images/rx.png";
import { useSelector } from "react-redux";

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
    background: "#ebebeb",
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
    },
  },
  rxImgContainer: {
    marginTop: 10,
    "& > img": {
      height: 18,
    },
  },
  medicineRow: {
    display: "flex",
    "&.header": {
      background: "#b9b8b8",
      marginTop: 16,
      "& > div": {
        fontWeight: "bold",
      },
    },
    "&.body": {
      background: "#ebebeb",
      borderBottom: "1px solid #898989",
    },
    "& > div": {
      padding: "10px 12px",
      fontSize: "18px",
      "&.medicine,&.timing": {
        flex: "1 1 auto",
        width: "40%",
      },
      "&.sr": {
        width: 40,
        textAlign: "center",
        flex: "0 0 auto",
      },
      "&.dose": {
        width: 135,
        flex: "0 0 auto",
      },
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
                <td>{`${patientById?.first_name} ${patientById?.last_name} (${patientById?.age}y, ${patientById?.gender})`}</td>
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
            : {getStringFromObj(data?.lstDiagnosis)}
          </div>
          <div className={classes.rxImgContainer}>
            <img src={RXImg} />
          </div>
          <div className={`${classes.medicineRow} header`}>
            <div className="sr"></div>
            <div className="medicine">Medicine</div>
            <div className="dose">Dose</div>
            <div className="timing">Timing - Duration</div>
          </div>
          {!!data.prescribedMedicines &&
            data.prescribedMedicines.length > 0 &&
            data.prescribedMedicines.map((med, ind) => {
              return (
                <div className={`${classes.medicineRow} body`}>
                  <div className="sr">
                    <b>{ind + 1}</b>
                  </div>
                  <div className="medicine">
                    {med.type}. {med.medicineName}
                  </div>
                  <div className="dose">
                    {med.dose} {`(${med.unit})`}
                  </div>
                  <div className="timing">
                    {med.timing} - {med.duration}
                  </div>
                </div>
              );
            })}
          <div className="advices">
            <i>
              <b>Advice</b>
            </i>
            : {getStringFromObj(data?.lstAdvice)}
          </div>
        </div>
        <div className={classes.footer}>
          <div>Dr. Doctor Name</div>
        </div>
      </div>
    </div>
  );
});

export default PrescriptionPrint;
