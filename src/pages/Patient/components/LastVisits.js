import React, { useRef } from "react";
import { Tooltip } from "../../../components";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";
import CommonMedicineTable from "./CommonMedicineTable";
import PrescriptionPrint from "../components/PrescriptionPrint";
import ReactToPrint from "react-to-print";
import { timingOptions } from "../../../utils/constants";

const useStyles = createUseStyles({
  container: {
    margin: "0 -17px",
    background: "#c9ccd7",
    padding: 15,
  },
  visitsContainer: {
    "& > .card": {
      marginTop: 26,
    },
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
  th: {
    textAlign: "center",
    padding: "8px 10px !important",
  },
  td: {
    padding: "8px 10px !important",
  },
  visitsTimeline: {
    "&:before": {
      left: 10,
    },
    "& > .timeline-inverted": {
      paddingLeft: "30px !important",
      "& > .timeline-badge": {
        left: "2px",
      },
      "& > .timeline-panel": {
        marginLeft: "18px !important",
        width: "calc(100% - 18px)",
        "& > .timeline-heading": {
          display: "flex",
          alignItems: "center",
          "& > .timeline-title": {
            flex: 1,
          },
        },
      },
    },
    "& .list-pointer": {
      position: "relative",
      paddingLeft: "10px",
      "&:before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        height: "4px",
        width: "4px",
        borderRadius: "50%",
        background: "#414141",
      },
    },
  },
  timelineActionBtn: {
    height: "30px !important",
    width: "30px !important",
    padding: "5px !important",
  },
});

const headerColumns = [
  { field: "type", label: "Type", width: "55px" },
  { field: "medicineName", label: "Medicine", width: "30%" },
  { field: "dose", label: "Dose", width: "80px" },
  { field: "unit", label: "Unit", width: "55px" },
  {
    field: "timing",
    label: "Timing",
    width: "120px",
    formatter: (item, val) => {
      const option = timingOptions.find((opt) => opt.value === val);
      return option ? option.label : val;
    },
  },
  { field: "duration", label: "Duration", width: "120px" },
  { field: "note", label: "Notes" },
];

const PrintButton = ({ data }) => {
  const classes = useStyles();
  const ref = useRef();
  return (
    <>
      <Tooltip text="Print" placement="auto">
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className={`btn btn-inverse-info btn-icon ${classes.timelineActionBtn}`}
            >
              <i className="fa fa-print"></i>
            </button>
          )}
          content={() => ref.current}
        />
      </Tooltip>
      <PrescriptionPrint ref={ref} data={data} />
    </>
  );
};

const LastVisits = ({ loading = false, prescriptions = [] }) => {
  const classes = useStyles();

  const getCardTitle = (item) => {
    return (
      <>
        <b className="pr-5">
          {format(new Date(item.prescriptionDate), "dd-MMM-yyyy")}
        </b>{" "}
        By: {item.doctorName}
      </>
    );
  };

  // Sort prescriptions by prescriptionId in descending order before rendering
  const sortedPrescriptions = [...prescriptions].sort(
    (a, b) => b.prescriptionId - a.prescriptionId,
  );

  return (
    <div className={classes.container}>
      <div className="row">
        <div className="col-lg-12">
          <h5 className="text-center">
            {sortedPrescriptions.length > 0
              ? `Timeline`
              : "No Visits Available"}
          </h5>
        </div>
        <div className={`col-lg-12 ${classes.visitsContainer}`}>
          <div className={`timeline ${classes.visitsTimeline}`}>
            {sortedPrescriptions.length > 0 &&
              sortedPrescriptions.map((item, ind) => {
                return (
                  <div
                    key={ind}
                    className="timeline-wrapper timeline-inverted timeline-wrapper-info"
                  >
                    <div className="timeline-badge"></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h6 className="timeline-title">{getCardTitle(item)}</h6>
                        <PrintButton data={item} />
                      </div>
                      <div className="timeline-body">
                        <div className="row">
                          <div className="col-lg-12">
                            {item?.quickNotes && (
                              <div className="form-group inline-form-group">
                                <label>Quick Note:</label>
                                <div>{item.quickNotes}</div>
                              </div>
                            )}
                            <div className="form-group inline-form-group">
                              <label>Complaints:</label>
                              <div>
                                {!!item.lstComplaints &&
                                  item.lstComplaints.length > 0 &&
                                  item.lstComplaints
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                            {item.lstObservations && (
                              <div className="form-group inline-form-group">
                                <label>Observations:</label>
                                <div>
                                  {!!item.lstObservations &&
                                    item.lstObservations.length > 0 &&
                                    item.lstObservations
                                      .map((elem) => {
                                        return elem.name;
                                      })
                                      .join(", ")}
                                </div>
                              </div>
                            )}
                            <div className="form-group inline-form-group">
                              <label>Diagnosis:</label>
                              <div>
                                {!!item.lstDiagnosis &&
                                  item.lstDiagnosis.length > 0 &&
                                  item.lstDiagnosis
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                            {item.lstWorkDone && (
                              <div className="form-group inline-form-group">
                                <label>Work Done:</label>
                                <div>
                                  {!!item.lstWorkDone &&
                                    item.lstWorkDone.length > 0 &&
                                    item.lstWorkDone
                                      .map((elem) => {
                                        return elem.name;
                                      })
                                      .join(", ")}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-lg-12 mb-3">
                            <h6>Medicines</h6>
                            <CommonMedicineTable
                              columns={headerColumns}
                              data={item.prescribedMedicines}
                            />
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group inline-form-group">
                              <label>Advice:</label>
                              <div>
                                {!!item.lstAdvice &&
                                  item.lstAdvice.length > 0 &&
                                  item.lstAdvice.map((elem) => {
                                    return (
                                      <div
                                        key={elem.id_advice}
                                        className="list-pointer"
                                      >
                                        {elem.name}
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                            <div className="form-group inline-form-group">
                              <label>Investigations:</label>
                              <div>
                                {!!item.lstInvestigations &&
                                  item.lstInvestigations.length > 0 &&
                                  item.lstInvestigations
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastVisits;
