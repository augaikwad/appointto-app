import React, { useContext, useEffect, useState } from "react";
import { PrescriptionContext } from "../../../context/Prescription";
import TopTagsCreatable from "./TopTagsCreatable";

const ObservationTags = () => {
  const [top, setTop] = useState([]);

  const [state, actions] = useContext(PrescriptionContext);
  const { observations } = state;

  useEffect(() => {
    actions.getObservations();
  }, []);

  useEffect(() => {
    if (observations.length > 0) {
      let topArr = observations.sort((a, b) => b.count - a.count).slice(0, 5);
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
        actions.getObservations();
      }}
    />
  );
};

export default ObservationTags;
