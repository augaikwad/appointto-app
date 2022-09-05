import React from "react";
import { Dropdown } from "react-bootstrap";
import { InputField, DateTimeField } from "../../components";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  dateFilter: {
    marginLeft:10,
    "& > .form-group":{
      margin:0
    }
  },
});

const ListFilters = () => {
  const classes = useStyles();
  return (
    <div className="row">
      <div
        className="col-lg-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        <p className="card-title mb-0 mr-2">Queue For</p>
        <Dropdown>
          <Dropdown.Toggle variant="btn btn-primary btn-sm" id="QueueFor">
            Dr. Uday
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Dr. Vishnu</Dropdown.Item>
            <Dropdown.Item>Dr. Vishnu</Dropdown.Item>
            <Dropdown.Item>Dr. Vishnu</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="optionsRadios"
              id="optionsRadios1"
              value=""
              checked
            />
            <i className="input-helper"></i>
            Today
          </label>
        </div>
        <div className={classes.dateFilter}>
          <DateTimeField name="date" />
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
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ minWidth: 95 }}
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            style={{ minWidth: 95 }}
          >
            Completed
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            style={{ minWidth: 95 }}
          >
            No Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListFilters;
