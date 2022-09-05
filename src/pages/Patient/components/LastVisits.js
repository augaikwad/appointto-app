import React from "react";
import { Card, Tooltip } from "../../../components";
import { createUseStyles } from "react-jss";
import { format } from "date-fns";
import CommonMedicineTable from "./CommonMedicineTable";

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
  },
  timelineActionBtn: {
    height: "30px !important",
    width: "30px !important",
    padding: "5px !important",
  },
});

const headerColumns = [
  { field: "type", label: "Unit", width: "55px" },
  { field: "name", label: "Medicine", width: "30%" },
  { field: "dose", label: "Dose", width: "80px" },
  { field: "timing", label: "Timing", width: "120px" },
  { field: "duration", label: "Duration", width: "120px" },
  { field: "notes", label: "Notes" },
];

const LastVisits = ({ data }) => {
  const classes = useStyles();

  const getCardTitle = (item) => {
    return (
      <>
        <b className="pr-5">{format(new Date(item.date), "dd-MMM-yyyy")}</b> By:{" "}
        {item.by}
      </>
    );
  };

  return (
    <div className={classes.container}>
      <div className="row">
        <div className="col-lg-12">
          <h5 className="text-center">
            {data.length > 0 ? `Timeline` : "No Visits Available"}
          </h5>
        </div>
        <div className={`col-lg-12 ${classes.visitsContainer}`}>
          <div className={`timeline ${classes.visitsTimeline}`}>
            {data.length > 0 &&
              data.map((item, ind) => {
                return (
                  <div
                    key={ind}
                    className="timeline-wrapper timeline-inverted timeline-wrapper-info"
                  >
                    <div className="timeline-badge"></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h6 className="timeline-title">{getCardTitle(item)}</h6>
                        <Tooltip text="Print" placement="auto">
                          <button
                            type="button"
                            className={`btn btn-inverse-info btn-icon ${classes.timelineActionBtn}`}
                          >
                            <i className="fa fa-print"></i>
                          </button>
                        </Tooltip>
                      </div>
                      <div className="timeline-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group inline-form-group">
                              <label>Complaints:</label>
                              <div>
                                {!!item.complaints &&
                                  item.complaints.length > 0 &&
                                  item.complaints
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                            <div className="form-group inline-form-group">
                              <label>Observations:</label>
                              <div>
                                {!!item.observations &&
                                  item.observations.length > 0 &&
                                  item.observations
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                            <div className="form-group inline-form-group">
                              <label>Diagnosis:</label>
                              <div>
                                {!!item.diagnosis &&
                                  item.diagnosis.length > 0 &&
                                  item.diagnosis
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                            <div className="form-group inline-form-group">
                              <label>Work Done:</label>
                              <div>
                                {!!item.workDone &&
                                  item.workDone.length > 0 &&
                                  item.workDone
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3">
                            <h6>Medicines</h6>
                            <CommonMedicineTable
                              columns={headerColumns}
                              data={item.medicines}
                            />
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group inline-form-group">
                              <label>Advice:</label>
                              <div>
                                {!!item.advice &&
                                  item.advice.length > 0 &&
                                  item.advice
                                    .map((elem) => {
                                      return elem.name;
                                    })
                                    .join(", ")}
                              </div>
                            </div>
                            <div className="form-group inline-form-group">
                              <label>Investigations:</label>
                              <div>
                                {!!item.investigations &&
                                  item.investigations.length > 0 &&
                                  item.investigations
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
          {/* {data.length > 0 &&
            data.map((item, ind) => {
              return (
                <Card key={ind} title={getCardTitle(item)}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group inline-form-group">
                        <label>Complaints:</label>
                        <div>
                          {!!item.complaints &&
                            item.complaints.length > 0 &&
                            item.complaints
                              .map((elem) => {
                                return elem.name;
                              })
                              .join(", ")}
                        </div>
                      </div>
                      <div className="form-group inline-form-group">
                        <label>Observations:</label>
                        <div>
                          {!!item.observations &&
                            item.observations.length > 0 &&
                            item.observations
                              .map((elem) => {
                                return elem.name;
                              })
                              .join(", ")}
                        </div>
                      </div>
                      <div className="form-group inline-form-group">
                        <label>Diagnosis:</label>
                        <div>
                          {!!item.diagnosis &&
                            item.diagnosis.length > 0 &&
                            item.diagnosis
                              .map((elem) => {
                                return elem.name;
                              })
                              .join(", ")}
                        </div>
                      </div>
                      <div className="form-group inline-form-group">
                        <label>Work Done:</label>
                        <div>
                          {!!item.workDone &&
                            item.workDone.length > 0 &&
                            item.workDone
                              .map((elem) => {
                                return elem.name;
                              })
                              .join(", ")}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <h6>Medicines</h6>
                      <CommonMedicineTable
                        columns={headerColumns}
                        data={item.medicines}
                      />
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group inline-form-group">
                        <label>Advice:</label>
                        <div>
                          {!!item.advice &&
                            item.advice.length > 0 &&
                            item.advice
                              .map((elem) => {
                                return elem.name;
                              })
                              .join(", ")}
                        </div>
                      </div>
                      <div className="form-group inline-form-group">
                        <label>Investigations:</label>
                        <div>
                          {!!item.investigations &&
                            item.investigations.length > 0 &&
                            item.investigations
                              .map((elem) => {
                                return elem.name;
                              })
                              .join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default LastVisits;
