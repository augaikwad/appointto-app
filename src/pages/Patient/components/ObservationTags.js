import React, { useEffect, useState } from "react";
import TopTagsCreatable from "./TopTagsCreatable";
import { useDispatch, useSelector } from "react-redux";
import { getObservations } from "../../../store/actions/prescriptionActions";

const ObservationTags = () => {
  const dispatch = useDispatch();
  const { id_doctor } = useSelector((state) => state.user.details);
  const { observations } = useSelector((state) => state.prescription);
  const [top, setTop] = useState([]);

  useEffect(() => {
    dispatch(getObservations(id_doctor));
  }, []);

  useEffect(() => {
    if (observations.length > 0) {
      let options = [...observations];
      let topArr = options.sort((a, b) => b.count - a.count).slice(0, 5);
      setTop(topArr);
    }
  }, [observations]);

  return (
    <TopTagsCreatable
      label="Observations"
      name="lstobservations"
      options={observations}
      valueField="id_observations"
      topFive={top}
      addNewCallback={() => {
        dispatch(getObservations(id_doctor));
      }}
    />
  );
};

export default ObservationTags;
