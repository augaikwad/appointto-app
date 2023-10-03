import React, { useEffect, useState } from "react";
import TopTagsCreatable from "./TopTagsCreatable";
import { useDispatch, useSelector } from "react-redux";
import { getWorkDone } from "../../../store/actions/prescriptionActions";

const WorkDoneTags = () => {
  const dispatch = useDispatch();
  const { id_doctor } = useSelector((state) => state.user.details);
  const { workdone } = useSelector((state) => state.prescription);
  const [top, setTop] = useState([]);

  useEffect(() => {
    dispatch(getWorkDone(id_doctor));
  }, []);

  useEffect(() => {
    if (workdone.length > 0) {
      let options = [...workdone];
      let topArr = options.sort((a, b) => b.count - a.count).slice(0, 5);
      setTop(topArr);
    }
  }, [workdone]);

  return (
    <TopTagsCreatable
      label="Work Done"
      name="lstworkDone"
      options={workdone}
      valueField="id_workdone"
      topFive={top}
      addNewCallback={() => {
        dispatch(getWorkDone(id_doctor));
      }}
    />
  );
};

export default WorkDoneTags;
