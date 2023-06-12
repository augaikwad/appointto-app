import React, { useContext, useEffect, useState } from "react";
import CreateSelectTagsAutoComplete from "./CreateSelectTagsAutoComplete";
import { PrescriptionContext } from "../../../context/Prescription";
import { useFormContext } from "react-hook-form";
import SelectGroupModal from "./SelectGroupModal";

const InvestigationsTags = ({ name = "lstinvestigations" }) => {
  const [state, actions] = useContext(PrescriptionContext);
  const { investigationsGroup, investigations } = state;
  const [open, setOpen] = useState(false);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    actions.getInvestigations();
    actions.getInvestigationsGroup();
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
            id_doctor: localStorage.getItem("id_doctor"),
            type: "Investigations",
          };
          actions.saveUpdateTag(name, req, (res) => {
            actions.getInvestigations();

            let val = getValues(name) || [];
            setValue(name, [...val, ...[res]]);
          });
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
            id_doctor: localStorage.getItem("id_doctor"),
          };
          actions.saveInvestigationsGroup(req, () => {
            actions.getInvestigationsGroup();
            callback();
          });
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
          let value = getValues(name) || [];

          if (group.investigationDetails.length > 0) {
            value = [...value, ...group.investigationDetails];
          }
          setValue(name, value);

          setOpen(false);
        }}
        onHide={() => setOpen(false)}
      />
    </>
  );
};

export default InvestigationsTags;
