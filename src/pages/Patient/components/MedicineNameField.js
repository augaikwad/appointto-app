import React, { useState, useEffect } from "react";
import { Modal, InputField } from "../../../components";
import { ReactSelectField } from "../../../components/Forms";
import { createUseStyles } from "react-jss";
import { Button } from "react-bootstrap";
import cogoToast from "cogo-toast";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedicinesByDoctorId,
  searchMedicines,
} from "../../../store/actions/prescriptionActions";

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
    textAlign: "left",
  },
  reactSelect: {
    "& > div": { border: "none", boxShadow: "none" },
  },
});

const MedicineNameField = ({
  name,
  objKey,
  obj,
  isFilled,
  onChange,
  setValue,
  ind,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { doctorMedicines, medicines } = useSelector(
    (state) => state.prescription
  );

  const [show, setShow] = useState(false);

  const [composition, setComposition] = useState(null);
  const [medicineName, setMedicineName] = useState("");

  const { watch } = useFormContext();
  const medicineWatch = watch(name);

  useEffect(() => {
    if (composition == null || composition !== medicineWatch.composition) {
      setComposition(medicineWatch.composition);
    }
  }, [composition]);

  useEffect(() => {
    dispatch(getMedicinesByDoctorId(id_doctor));
  }, []);

  const getTitle = () => {
    return (
      <>
        <span style={{ fontWeight: 300 }}>Generic name </span>
        <b>{medicineName}</b>
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
            setValue(`medicines[${ind}].composition`, composition);
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
      <ReactSelectField
        name={name}
        labelField="medicineName"
        valueField="medicineId"
        options={[...doctorMedicines, ...medicines]}
        menuPortalTarget={document.body}
        className={classes.reactSelect}
        onChange={(val) => {
          setMedicineName(val.medicineName);
          setComposition(val.composition);
          onChange(val);
        }}
        onInputChange={(value) => {
          if (value.length > 2) {
            dispatch(searchMedicines(value));
          }
        }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
      {medicineWatch && Object.keys(medicineWatch).length && (
        <>
          {!!medicineWatch.composition && (
            <span className={`${classes.comosition} compositionName`}>
              ({medicineWatch.composition || ""})
            </span>
          )}
          <button
            className={`btn btn-inverse-info btn-icon nameEditBtn`}
            type="button"
            onClick={(e) => {
              setShow(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <Modal
            title={getTitle()}
            size="md"
            show={show}
            onHide={() => setShow(false)}
            footerActions={<FooterActions />}
          >
            <InputField
              name="genericName"
              value={composition}
              onChange={(e) => {
                setComposition(e.target.value);
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default MedicineNameField;
