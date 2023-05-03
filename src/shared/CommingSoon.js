import React from "react";
import cominSoonImg from "../content/images/coming-soon.png";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  img: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

const CommingSoon = () => {
  const classes = useStyles();
  return (
    <div>
      <img src={cominSoonImg} className={classes.img} />
    </div>
  );
};

export default CommingSoon;
