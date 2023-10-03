import React, { useEffect, useState } from "react";
import TopTagsCreatable from "./TopTagsCreatable";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../../../store/actions/prescriptionActions";

const ComplaintsTags = () => {
  const dispatch = useDispatch();
  const { id_doctor } = useSelector((state) => state.user.details);
  const { complaints } = useSelector((state) => state.prescription);
  const [top, setTop] = useState([]);

  useEffect(() => {
    dispatch(getComplaints(id_doctor));
  }, []);

  useEffect(() => {
    if (complaints && complaints.length > 0) {
      let options = [...complaints];
      let topArr = options.sort((a, b) => b.count - a.count).slice(0, 5);
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
        dispatch(getComplaints(id_doctor));
      }}
    />
  );
};

export default ComplaintsTags;
