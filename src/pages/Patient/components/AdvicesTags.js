import React, { useContext, useEffect, useState } from "react";
import CreateSelectTagsAutoComplete from "./CreateSelectTagsAutoComplete";
import { PrescriptionContext } from "../../../context/Prescription";
import { useFormContext } from "react-hook-form";
import SelectGroupModal from "./SelectGroupModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvices,
  getAdviceGroup,
  saveAdviceGroup,
} from "../../../store/actions/prescriptionActions";

const AdvicesTags = ({ name = "lstadvice" }) => {
  const dispatch = useDispatch();
  const { id_doctor } = useSelector((state) => state.user.details);
  const { advices, adviceGroup } = useSelector((state) => state.prescription);

  const [state, actions] = useContext(PrescriptionContext);
  const [open, setOpen] = useState(false);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    dispatch(getAdvices(id_doctor));
    dispatch(getAdviceGroup(id_doctor));
  }, []);

  return (
    <>
      <CreateSelectTagsAutoComplete
        name={name}
        label="Advice"
        options={advices}
        labelField="name"
        valueField="id_advice"
        getNewOptionData={(value, label) => {
          return {
            name: label,
            id_advice: value,
          };
        }}
        onCreateOption={(val) => {
          let req = {
            id_advice: 0,
            name: val,
            is_new: true,
            id_doctor: localStorage.getItem("id_doctor"),
            type: "Advice",
          };
          actions.saveUpdateTag(name, req, (res) => {
            dispatch(getAdvices(id_doctor));

            let val = getValues(name) || [];
            setValue(name, [...val, ...[res]]);
          });
          return val;
        }}
        onCreateGroup={(groupName, callback) => {
          let vals = getValues(name) || [];
          let adviceDetails = vals.map((el) => {
            return el.id_advice;
          });

          let req = {
            adviceGroupId: 0,
            advGroupName: groupName,
            adviceDetails: adviceDetails.toString(),
            id_doctor: localStorage.getItem("id_doctor"),
          };
          dispatch(
            saveAdviceGroup(req, () => {
              callback();
              dispatch(getAdviceGroup(id_doctor));
            })
          );
        }}
        selectGroupBtnClick={() => {
          setOpen(true);
        }}
      />
      <SelectGroupModal
        open={open}
        data={adviceGroup}
        groupKeys={{
          id: "adviceGroupId",
          label: "advGroupName",
          items: "adviceDetails",
          itemId: "id_advice",
        }}
        onGroupSelect={(group) => {
          let value = getValues(name) || [];

          if (group.adviceDetails.length > 0) {
            value = [...value, ...group.adviceDetails];
          }
          setValue(name, value);

          setOpen(false);
        }}
        onHide={() => setOpen(false)}
      />
    </>
  );
};

export default AdvicesTags;
