import React, { useState } from "react";
import { AutocompleteField, Modal, InputField } from "../../../components";
import { createUseStyles } from "react-jss";
import { Menu, MenuItem } from "react-bootstrap-typeahead";
import {Button} from 'react-bootstrap';
import cogoToast from "cogo-toast";

const useStyles = createUseStyles({
  nameEditBtn: {},
  buttonMinWidth: {
    minWidth: 120,
  },
  comosition: {
    color: "#495057",
    padding: "0 10px 5px",
    fontSize: "11px",
    display: "block",
    marginTop: "-3px",
    position: "relative",
  },
});

const data = [
  {
    type: "Tab",
    name: "Azithral 500",
  },
  {
    type: "Syr",
    name: "Ascoril LS",
  },
  {
    type: "Cre",
    name: "Betnovate-N",
  },
  {
    type: "Cap",
    name: "Betacap TR 40",
  },
];

const MedicineNameField = ({
  name,
  objKey,
  obj,
  isFilled,
  control,
  onChange,
  setValue,
  ind
}) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const [genericVal,setGenericVal]=useState(null);

  const getTitle = (medicineNameString) => {
    return (
      <>
        <span style={{ fontWeight: 300 }}>Generic name for </span>
        <b>{medicineNameString}</b>
      </>
    );
  };

  const FooterActions = () => {
    return (
      <div className="text-right">
        <Button
          variant="primary btn-sm"
          className={classes.buttonMinWidth}
          onClick={(e) => {
            e.preventDefault();
            setValue(`medicine[${ind}].compositionName`,genericVal);
            cogoToast.success("Generic Name added successfully", {
              position: "top-right",
            });
            setShow(false);
          }}
        >
          Save
        </Button>
        <Button
          variant="secondary ml-2 btn-sm"
          className={classes.buttonMinWidth}
          onClick={(e) => {
            e.preventDefault();
            setShow(false);
          }}
        >
          Cancel
        </Button>
      </div>
    );
  };

  return (
    <>
      <AutocompleteField
        id="medicineAutoField"
        name={name}
        control={control}
        data={data}
        onChange={onChange}
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps}>
            {results.map((result, index) => {
              return (
                <MenuItem option={result} position={index}>
                  <span>{result.type}</span>
                  <span>{result.name}</span>
                </MenuItem>
              );
            })}
          </Menu>
        )}
      />
      {isFilled && (
        <>
          {!!genericVal && <span className={`${classes.comosition} compositionName`}>({genericVal})</span>}
          <button
            className={`btn btn-inverse-info btn-icon nameEditBtn`}
            onClick={(e) => {
              e.preventDefault();
              setShow(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <Modal
            title={getTitle(obj[objKey])}
            size="md"
            show={show}
            onHide={() => setShow(false)}
            footerActions={<FooterActions />}
          >
            <InputField
              name="genericName"
              value={genericVal}
              onChange={(e) => {
                setGenericVal(e.target.value)
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default MedicineNameField;
