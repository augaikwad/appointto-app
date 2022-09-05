import React from "react";

const Card = ({ title = null, titleClasses="", children }) => {
  return (
    <div className="card">
      <div className="card-body">
        {title !== null && <p className={`card-title ${titleClasses}`}>{title}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
