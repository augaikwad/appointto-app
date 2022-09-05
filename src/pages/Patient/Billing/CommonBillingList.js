import React from "react";
import { createUseStyles } from "react-jss";
import BootstrapTable from "react-bootstrap-table-next";

const useStyles = createUseStyles({
  bootstrapTable: {
    "& th, & td": {
      padding: "5px !important",
    },
  },
  th: {
    padding: "5px !important",
  },
  td: {
    padding: "5px !important",
  },
});

const CommonBillingList = ({
  columns,
  data,
  condensed = true,
  striped = true,
  keyField = "id",
  selectRow,
}) => {
  const classes = useStyles();

  let tableProps = {
    keyField,
    condensed,
    striped,
  };

  if (!!selectRow) {
    tableProps = { ...tableProps, selectRow: selectRow };
  }

  return (
    <>
      <BootstrapTable
        classes={classes.bootstrapTable}
        data={data}
        columns={columns}
        {...tableProps}
      />

      {/* <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, ind) => {
                let thProps = {};
                if (!!col.width) {
                  thProps = { ...thProps, width: col.width };
                }
                let className = classes.th;
                if (!!col.align && col.align === "center") {
                  className = `${className} text-center`;
                } else if (!!col.align && col.align === "right") {
                  className = `${className} text-right`;
                }

                return (
                  <th key={ind} className={className} {...thProps}>
                    {col.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, ind) => (
              <tr key={ind}>
                {columns.map((col, i) => {
                  let className = classes.td;
                  if (!!col.align && col.align === "center") {
                    className = `${className} text-center`;
                  } else if (!!col.align && col.align === "right") {
                    className = `${className} text-right`;
                  }
                  return (
                    <td key={`${col.field}_${ind}_${i}`} className={className}>
                      {col.formatter
                        ? col.formatter(item[col.field], item)
                        : item[col.field]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default CommonBillingList;
