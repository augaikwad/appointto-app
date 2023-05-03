import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  card: {
    borderRadius: 5,
  },
});

const Card = ({ title = null, titleClasses = "", children }) => {
  const classes = useStyles();
  return (
    <div className={`card ${classes.card}`}>
      <div className="card-body">
        {title !== null && (
          <p className={`card-title ${titleClasses}`}>{title}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
