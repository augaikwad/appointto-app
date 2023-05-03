import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Tooltip, Modal } from "../../../components";
import { CreatableReactSelect } from "../../../components/Forms";
import { useFormContext } from "react-hook-form";
import { createUseStyles } from "react-jss";
import cogoToast from "cogo-toast";

const toastOption = { hideAfter: 5, position: "bottom-center" };

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
});

const CreateSelectTagsAutoComplete = ({
  name,
  label,
  options,
  onCreateGroup = () => {},
  selectGroupBtnClick = () => {},
  ...restProps
}) => {
  const classes = useStyles();
  const { setValue, getValues } = useFormContext();
  const [open, setOpen] = useState(false);

  const GetLabel = ({ name }) => {
    return (
      <>
        {label}
        <Tooltip text="Clear All" placement="top">
          <Button
            variant="link"
            size="sm"
            className={`btn-undo ${classes.btn}`}
            onClick={() => {
              setValue(name, []);
            }}
          >
            <i className="fa fa-undo"></i>
          </Button>
        </Tooltip>
      </>
    );
  };

  const LinkButton = ({ label = "", onClick = () => {} }) => {
    return (
      <Button
        variant="link"
        size="sm"
        className={classes.btn}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  };

  const CreateGroupModal = () => {
    const [groupName, setGroupName] = useState("");

    const onHide = () => {
      setGroupName("");
      setOpen(false);
    };

    const callback = () => {
      onHide();
    };

    const FooterActions = () => {
      return (
        <div className="text-right">
          <Button
            disabled={groupName.length === 0}
            className="btn btn-sm btn-primary"
            onClick={() => onCreateGroup(groupName, callback)}
          >
            Create
          </Button>
        </div>
      );
    };

    return (
      <Modal
        title="Create Group"
        show={open}
        onHide={onHide}
        size="sm"
        footerActions={<FooterActions />}
      >
        <Form.Group>
          <label>Group Name</label>
          <Form.Control
            type="text"
            placeholder="Enter Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>
      </Modal>
    );
  };

  const createGroupBtnClick = () => {
    let value = getValues(name) || [];
    if (value.length > 0) {
      setOpen(true);
    } else {
      cogoToast.error(
        `Please Select One or More ${
          name === "advice" ? "Advice" : "Investigation"
        } to create group`,
        toastOption
      );
    }
  };

  return (
    <>
      <CreatableReactSelect
        name={name}
        label={<GetLabel name={name} />}
        options={options}
        {...restProps}
      />
      <div className={classes.btnContainer}>
        <LinkButton label="Create Group" onClick={createGroupBtnClick} />
        <LinkButton label="Select Group" onClick={selectGroupBtnClick} />
      </div>
      <CreateGroupModal />
    </>
  );
};

export default CreateSelectTagsAutoComplete;
