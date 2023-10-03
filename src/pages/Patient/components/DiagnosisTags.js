import React, { useEffect, useState } from "react";
import TopTagsCreatable from "./TopTagsCreatable";
import { useDispatch, useSelector } from "react-redux";
import { getDiagnosis } from "../../../store/actions/prescriptionActions";

const DiagnosisTags = () => {
  const dispatch = useDispatch();
  const { id_doctor } = useSelector((state) => state.user.details);
  const { diagnosis } = useSelector((state) => state.prescription);
  const [top, setTop] = useState([]);

  useEffect(() => {
    dispatch(getDiagnosis(id_doctor));
  }, []);

  useEffect(() => {
    if (diagnosis.length > 0) {
      let options = [...diagnosis];
      let topArr = options.sort((a, b) => b.count - a.count).slice(0, 5);
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
        dispatch(getDiagnosis(id_doctor));
      }}
    />
  );
};

export default DiagnosisTags;
