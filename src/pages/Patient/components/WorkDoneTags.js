import React, { useContext, useEffect, useState } from "react";
import { PrescriptionContext } from "../../../context/Prescription";
import TopTagsCreatable from "./TopTagsCreatable";

const WorkDoneTags = () => {
  const [top, setTop] = useState([]);

  const [state, actions] = useContext(PrescriptionContext);
  const { workdone } = state;

  useEffect(() => {
    actions.getWorkDone();
  }, []);

  useEffect(() => {
    if (workdone.length > 0) {
      let topArr = workdone.sort((a, b) => b.count - a.count).slice(0, 5);
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
        actions.getWorkDone();
      }}
    />
  );
};

export default WorkDoneTags;
