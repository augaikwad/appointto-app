import React, { useState } from "react";
import CreateSelectTagsAutoComplete from "./CreateSelectTagsAutoComplete";

const InvestigationsTags = () => {
  const [tags, setTags] = useState([]);

  const [selectSuggestionModal, setSelectSuggestionModal] = useState({
    title: "Select Investigation Group",
    show: false,
    data: [
      {
        label: "Group 1",
        items: [
          { id: 1, name: "investigation 1" },
          { id: 2, name: "investigation 2" },
          { id: 3, name: "investigation 3" },
          { id: 4, name: "investigation 4" },
          { id: 5, name: "investigation 5" },
        ],
      },
      {
        label: "Group 2",
        items: [
          { id: 1, name: "investigation 1" },
          { id: 2, name: "investigation 2" },
          { id: 3, name: "investigation 3" },
          { id: 4, name: "investigation 4" },
          { id: 5, name: "investigation 5" },
        ],
      },
      {
        label: "Group 3",
        items: [
          { id: 1, name: "investigation 1" },
          { id: 2, name: "investigation 2" },
          { id: 3, name: "investigation 3" },
          { id: 4, name: "investigation 4" },
          { id: 5, name: "investigation 5" },
        ],
      },
    ],
  });

  return (
    <CreateSelectTagsAutoComplete
      name="investigations"
      label="Investigations"
      tags={tags}
      setTags={(val) => {
        setTags(val);
      }}
      suggestionModal={{
        state: selectSuggestionModal,
        setState: setSelectSuggestionModal,
      }}
      createGroupMsg="Investigations Group created successfully."
    />
  );
};

export default InvestigationsTags;
