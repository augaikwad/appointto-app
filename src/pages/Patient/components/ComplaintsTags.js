import React, { useContext, useEffect, useState } from "react";
import { PrescriptionContext } from "../../../context/Prescription";
import TopTagsCreatable from "./TopTagsCreatable";

const ComplaintsTags = () => {
  const [top, setTop] = useState([]);

  const [state, actions] = useContext(PrescriptionContext);
  const { complaints } = state;

  useEffect(() => {
    actions.getComplaints();
  }, []);

  useEffect(() => {
    if (complaints.length > 0) {
      let topArr = complaints.sort((a, b) => b.count - a.count).slice(0, 5);
      setTop(topArr);
    }
  }, [complaints]);

  return (
    <TopTagsCreatable
      label="Complaints"
      name="lstcomplaints"
      options={complaints}
      valueField="id_complaints"
      topFive={top}
      addNewCallback={() => {
        actions.getComplaints();
      }}
    />
  );
};

export default ComplaintsTags;
