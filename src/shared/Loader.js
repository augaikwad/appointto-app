import React from "react";
import { Spinner } from "react-bootstrap";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  loaderContainer: {
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    height: "100%",
    width: "100%",
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0,0.6)",
    "&.active": {
      display: "flex !important",
    },
    "&.suspense-loader": {
      backgroundColor: "transparent !important",
    },
    "& > .spinner-border": {
      height: 60,
      width: 60,
      borderWidth: 6,
    },
  },
});

function Loader({ open, isSuspense = false }) {
  const classes = useStyles();
  return (
    <div
      className={`${classes.loaderContainer} ${isSuspense ? "suspense-loader" : ""} ${open ? "active" : ""}`}
    >
      <Spinner animation="border" variant="info" />
    </div>
  );
}

export default Loader;
