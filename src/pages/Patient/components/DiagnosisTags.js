import React, { useContext, useEffect, useState } from "react";
import { PrescriptionContext } from "../../../context/Prescription";
import TopTagsCreatable from "./TopTagsCreatable";

const DiagnosisTags = () => {
  const [top, setTop] = useState([]);

  const [state, actions] = useContext(PrescriptionContext);
  const { diagnosis } = state;

  useEffect(() => {
    actions.getDiagnosis();
  }, []);

  useEffect(() => {
    if (diagnosis.length > 0) {
      let topArr = diagnosis.sort((a, b) => b.count - a.count).slice(0, 5);
      setTop(topArr);
    }
  }, [diagnosis]);

  return (
    <TopTagsCreatable
      label="Diagnosis"
      name="lstdiagnosis"
      options={diagnosis}
      valueField="id_diagnosis"
      topFive={top}
      addNewCallback={() => {
        actions.getDiagnosis();
      }}
    />
  );
};

export default DiagnosisTags;
