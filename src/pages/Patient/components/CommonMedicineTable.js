import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  th: {
    textAlign: "center",
    padding: "8px 10px !important",
  },
  td: {
    padding: "8px 10px !important",
  },
});

const CommonMedicineTable = ({ columns, data }) => {
  const classes = useStyles();
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {columns &&
            columns.map((col, ind) => {
              return (
                <th
                  key={col.field}
                  className={classes.th}
                  width={!!col.width ? col.width : "auto"}
                >
                  {col.label}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {!!data &&
          data.length > 0 &&
          data.map((med, ind) => {
            return (
              <tr key={ind}>
                {columns &&
                  columns.map((col, i) => {
                    const { formatter } = col;
                    if (col.field === "sr") {
                      return (
                        <td key={i} className={classes.td}>
                          {ind + 1}
                        </td>
                      );
                    }
                    return (
                      <td key={i} className={classes.td}>
                        {formatter && typeof formatter === "function"
                          ? formatter(med, med[col.field])
                          : med[col.field]}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default CommonMedicineTable;
