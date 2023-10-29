import React, { useEffect, useState } from "react";
import CreateSelectTagsAutoComplete from "./CreateSelectTagsAutoComplete";
import { useFormContext } from "react-hook-form";
import SelectGroupModal from "./SelectGroupModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvices,
  getAdviceGroup,
  saveAdviceGroup,
  saveUpdateTag,
} from "../../../store/actions/prescriptionActions";
import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

const AdvicesTags = ({ name = "lstadvice" }) => {
  const dispatch = useDispatch();
  const { selectedDoctorId } = useSelector((state) => state.user);
  const { id_doctor } = useSelector((state) => state.user.details);
  const { advices, adviceGroup } = useSelector((state) => state.prescription);

  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
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
            id_doctor: selectedDoctorId,
            type: "Advice",
          };
          dispatch(
            saveUpdateTag(name, req, (res) => {
              dispatch(getAdvices(id_doctor));

              let val = getValues(name) || [];
              setValue(name, [...val, ...[res]]);
            })
          );
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
            id_doctor: selectedDoctorId,
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
          const isGrpPresent = selectedGroup.some(
            (itm) => itm.adviceGroupId === group.adviceGroupId
          );
          if (isGrpPresent) {
            cogoToast.warn(
              "Group already selected, Please select other group.",
              toastOption
            );
          } else {
            setSelectedGroup([...selectedGroup, ...[group]]);
            let value = getValues(name) || [];

            if (group.adviceDetails.length > 0) {
              value = [...value, ...group.adviceDetails];
            }
            setValue(name, value);

            setOpen(false);
          }
        }}
        onHide={() => setOpen(false)}
      />
    </>
  );
};

export default AdvicesTags;
