import React from "react";
import { Modal } from "../../../components";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
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

const SelectGroupModal = ({
  open,
  data,
  groupKeys,
  onHide,
  onGroupSelect = () => {},
}) => {
  const classes = useStyles();
  const { id, itemId, items, label } = groupKeys;

  return (
    <Modal title="Select Group" show={open} onHide={onHide} size="md">
      {!!data &&
        data.length > 0 &&
        data.map((group, ind) => {
          return (
            <div key={group[id]} className={classes.groups}>
              <div className="groupsHeader">
                <span>{group[label]}</span>
                <button
                  className={`btn btn-sm btn-link ${classes.btn}`}
                  onClick={() => onGroupSelect(group)}
                >
                  Select
                </button>
              </div>
              <div className="groupsBody">
                {group[items].length > 0 &&
                  group[items].map((item, i) => {
                    return (
                      <div
                        key={`${ind}-${group[id]}-${item[itemId]}-${i}`}
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
  );
};

export default SelectGroupModal;
