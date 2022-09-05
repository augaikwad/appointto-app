import React from "react";
import { TagsAutocomplete, Modal, Tooltip } from "../../../components";
import cogoToast from "cogo-toast";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  btnContainer: {
    marginTop: "-15px",
    fontSize: "0.875rem",
  },
  btn: {
    marginLeft: 25,
    padding: 0,
    "&:first-child": {
      marginLeft: 0,
    },
    "&.btn-undo": {
      marginLeft: "12px",
    },
  },
  groups: {
    background: "#f1f1f1",
    borderRadius: "5px",
    padding: 5,
    marginBottom: 15,
    "& > div.groupsHeader": {
      display: "flex",
      padding: "5px 8px",
      marginBottom: 10,
      " & > span:first-child": {
        flex: 1,
      },
    },
    "& > div.groupsBody": {
      padding: "5px 8px",
    },
  },
});

const CreateSelectTagsAutoComplete = ({
  name,
  label,
  tags,
  setTags = () => {},
  placeholder = "Add Tag",
  formGroupClasses = "",
  handleAddition = () => {},
  handleDelete = () => {},
  createGroupMsg = "",
  suggestionModal,
  ...restProps
}) => {
  const classes = useStyles();

  const onHide = () => {
    suggestionModal.setState({
      ...suggestionModal.state,
      show: false,
    });
  };

  const getLabel = () => {
    return (
      <>
        {label}
        <Tooltip text="Clear All" placement="top">
          <button
            className={`btn btn-sm btn-link btn-undo ${classes.btn}`}
            onClick={(e) => {
              e.preventDefault();
              setTags([]);
            }}
          >
            <i className="fa fa-undo"></i>
          </button>
        </Tooltip>
      </>
    );
  };

  return (
    <>
      <TagsAutocomplete
        name={name}
        label={getLabel()}
        tags={tags}
        placeholder={placeholder}
        handleAddition={(tag) => {
          const tempTags = [].concat(tags, tag);
          setTags(tempTags);
        }}
        handleDelete={(i) => {
          const tempTags = tags.slice(0);
          tempTags.splice(i, 1);
          setTags(tempTags);
        }}
        {...restProps}
      />
      <div className={classes.btnContainer}>
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            cogoToast.success(createGroupMsg, {
              position: "top-right",
            });
          }}
        >
          Create Group
        </button>
        <button
          className={`btn btn-sm btn-link ${classes.btn}`}
          onClick={(e) => {
            e.preventDefault();
            suggestionModal.setState({
              ...suggestionModal.state,
              show: true,
            });
          }}
        >
          Select Group
        </button>
        <Modal
          title={suggestionModal.state.title}
          show={suggestionModal.state.show}
          onHide={() => onHide()}
          size="md"
        >
          {suggestionModal.state.data.length > 0 &&
            suggestionModal.state.data.map((group, ind) => {
              return (
                <div key={ind} className={classes.groups}>
                  <div className="groupsHeader">
                    <span>{group.label}</span>
                    <button
                      className={`btn btn-sm btn-link ${classes.btn}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const mergedTags = [].concat(tags, group.items);

                        setTags(mergedTags);

                        onHide();
                      }}
                    >
                      Select
                    </button>
                  </div>
                  <div className="groupsBody">
                    {group.items.length > 0 &&
                      group.items.map((item, i) => {
                        return (
                          <div
                            key={item.id}
                            className="badge badge-primary mr-2 mb-2"
                          >
                            {item.name}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </Modal>
      </div>
    </>
  );
};

export default CreateSelectTagsAutoComplete;
