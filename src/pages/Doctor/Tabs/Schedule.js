import React, { useState } from "react";
import { CheckBoxField, DateTimeField } from "../../../components";
import { format } from "date-fns";

const Schedule = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([
    {
      label: "Daily",
      value: "daily",
      isChecked: false,
      day: "Daily",
      startTime: "",
      endTime: "",
    },
    {
      label: "Mon",
      value: "mon",
      isChecked: false,
      day: "Monday",
      startTime: "",
      endTime: "",
    },
    {
      label: "Tue",
      value: "tue",
      isChecked: false,
      day: "Tuesday",
      startTime: "",
      endTime: "",
    },
    {
      label: "Wed",
      value: "wed",
      isChecked: false,
      day: "Wednesday",
      startTime: "",
      endTime: "",
    },
    {
      label: "Thu",
      value: "thu",
      isChecked: false,
      day: "Thursday",
      startTime: "",
      endTime: "",
    },
    {
      label: "Fri",
      value: "fri",
      isChecked: false,
      day: "Friday",
      startTime: "",
      endTime: "",
    },
    {
      label: "Sat",
      value: "sat",
      isChecked: false,
      day: "Saturday",
      startTime: "",
      endTime: "",
    },
    {
      label: "Sun",
      value: "sun",
      isChecked: false,
      day: "Sunday",
      startTime: "",
      endTime: "",
    },
  ]);

  const GetTimeFormatter = (field, rowData) => {
    if (rowData.isChecked && rowData[field] !== "") {
      return rowData[field];
    }
    return "-";
  };

  const columns = [
    { field: "day", label: "Days" },
    { field: "startTime", label: "Start Time", formatter: GetTimeFormatter },
    { field: "endTime", label: "End Time", formatter: GetTimeFormatter },
  ];

  const handleOnChange = (name, val) => {
    const options = [...data];
    options.map((op, ind) => {
      return (op[name] = format(new Date(val), "h:mm aa"));
    });
    setData(options);
  };

  return (
    <form>
      <div className="row">
        <div className="col-lg-12">
          <CheckBoxField
            label="Available Days"
            name="availableDays"
            required={true}
            options={data}
            onChange={(e) => {
              const { name, value, checked } = e.target;
              const options = [...data];
              if (value === "daily") {
                options.map((op, ind) => (op.isChecked = checked));
              } else {
                options.map((op, ind) => {
                  if (op.value === value && value !== "daily") {
                    return (op.isChecked = checked);
                  }
                  return op;
                });
              }
              setData(options);
            }}
          />
        </div>
        <div className="col-lg-3">
          <DateTimeField
            label="Start Time"
            name="startTime"
            selected={startTime}
            onChange={(date) => {
              handleOnChange("startTime", date);
              setStartTime(date);
            }}
            withPortal={false}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            required={true}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
        <div className="col-lg-3">
          <DateTimeField
            label="End Time"
            name="endTime"
            selected={endTime}
            onChange={(date) => {
              handleOnChange("endTime", date);
              setEndTime(date);
            }}
            withPortal={false}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            required={true}
            timeCaption="Time"
            dateFormat="h:mm aa"
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
              {data.map((row, ind) => {
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
      </div>
    </form>
  );
};

export default Schedule;
