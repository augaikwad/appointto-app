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
    </>
  );
};

export default CommonBillingList;
