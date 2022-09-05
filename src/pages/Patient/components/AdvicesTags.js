import React, { useState } from "react";
import CreateSelectTagsAutoComplete from "./CreateSelectTagsAutoComplete";

const AdvicesTags = () => {
  const [tags, setTags] = useState([]);

  const [selectSuggestionModal, setSelectSuggestionModal] = useState({
    title: "Select Advice Group",
    show: false,
    data: [
      {
        label: "Group 1",
        items: [
          { id: 1, name: "advice 1" },
          { id: 2, name: "advice 2" },
          { id: 3, name: "advice 3" },
          { id: 4, name: "advice 4" },
          { id: 5, name: "advice 5" },
        ],
      },
      {
        label: "Group 2",
        items: [
          { id: 1, name: "advice 1" },
          { id: 2, name: "advice 2" },
          { id: 3, name: "advice 3" },
          { id: 4, name: "advice 4" },
          { id: 5, name: "advice 5" },
        ],
      },
      {
        label: "Group 3",
        items: [
          { id: 1, name: "advice 1" },
          { id: 2, name: "advice 2" },
          { id: 3, name: "advice 3" },
          { id: 4, name: "advice 4" },
          { id: 5, name: "advice 5" },
        ],
      },
    ],
  });

  return (
    <CreateSelectTagsAutoComplete
      name="advice"
      label="Advice"
      tags={tags}
      setTags={(val) => {
        setTags(val);
      }}
      suggestionModal={{
        state: selectSuggestionModal,
        setState: setSelectSuggestionModal,
      }}
      createGroupMsg="Advice Group created successfully."
    />
  );
};

export default AdvicesTags;
