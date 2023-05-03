import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  currancy: {
    marginRight: "2px !important",
    fontSize: "inherit !important",
    color: "inherit !important",
  },
});

const AmountWithCurrancy = ({ amount = 0 }) => {
  const classes = useStyles();
  return (
    <>
      <i className={`${classes.currancy} fa fa-inr`}></i>
      {amount}
    </>
  );
};

export default AmountWithCurrancy;
