import React, { useEffect, useState } from "react";
import CreateSelectTagsAutoComplete from "./CreateSelectTagsAutoComplete";
import { useFormContext } from "react-hook-form";
import SelectGroupModal from "./SelectGroupModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvestigations,
  getInvestigationsGroup,
  saveInvestigationsGroup,
  saveUpdateTag,
} from "../../../store/actions/prescriptionActions";
import cogoToast from "cogo-toast";
const toastOption = { hideAfter: 5, position: "top-right" };

const InvestigationsTags = ({ name = "lstinvestigations" }) => {
  const dispatch = useDispatch();
  const { selectedDoctorId } = useSelector((state) => state.user);
  const { id_doctor } = useSelector((state) => state.user.details);
  const { investigations, investigationsGroup } = useSelector(
    (state) => state.prescription
  );

  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    dispatch(getInvestigations(id_doctor));
    dispatch(getInvestigationsGroup(id_doctor));
  }, []);

  return (
    <>
      <CreateSelectTagsAutoComplete
        name={name}
        label="Investigations"
        options={investigations}
        labelField="name"
        valueField="id_investigations"
        getNewOptionData={(value, label) => {
          return {
            name: label,
            id_investigations: value,
          };
        }}
        onCreateOption={(val) => {
          let req = {
            id_investigations: 0,
            name: val,
            is_new: true,
            id_doctor: selectedDoctorId,
            type: "Investigations",
          };
          dispatch(
            saveUpdateTag(name, req, (res) => {
              dispatch(getInvestigations(id_doctor));

              let val = getValues(name) || [];
              setValue(name, [...val, ...[res]]);
            })
          );
          return val;
        }}
        onCreateGroup={(groupName, callback) => {
          let vals = getValues(name) || [];
          let idArray = vals.map((el) => {
            return el.id_investigations;
          });

          let req = {
            investigationGroupId: 0,
            invGroupName: groupName,
            investigationDetails: idArray.toString(),
            id_doctor: selectedDoctorId,
          };
          dispatch(
            saveInvestigationsGroup(req, () => {
              dispatch(getInvestigationsGroup(id_doctor));
              callback();
            })
          );
        }}
        selectGroupBtnClick={() => {
          setOpen(true);
        }}
      />
      <SelectGroupModal
        open={open}
        data={investigationsGroup}
        groupKeys={{
          id: "investigationGroupId",
          label: "invGroupName",
          items: "investigationDetails",
          itemId: "id_investigations",
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

            if (group.investigationDetails.length > 0) {
              value = [...value, ...group.investigationDetails];
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

export default InvestigationsTags;
