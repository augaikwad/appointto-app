import React, { useState, useEffect, useCallback } from "react";
import { Modal, InputField } from "../../../components";
import CreatableSelect from "react-select/creatable";
import { createUseStyles } from "react-jss";
import { Button } from "react-bootstrap";
import cogoToast from "cogo-toast";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedicinesByDoctorId,
  searchMedicines,
} from "../../../store/actions/prescriptionActions";
import useAxios from "../../../hooks/useAxios";
import _ from "lodash";

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
    "&.compositionName": {
      display: "block",
      width: 320,
      textOverflow: "ellipsis",
      overflow: "hidden",
      textWrap: "nowrap",
      "&:hover": {
        textWrap: "wrap",
        lineHeight: 1.3,
      },
    },
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
  index,
  rules = {},
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id_doctor } = useSelector((state) => state.user.details);
  const { doctorMedicines, medicines } = useSelector(
    (state) => state.prescription,
  );

  const [show, setShow] = useState(false);

  const { watch, setFocus } = useFormContext();
  const medicineWatch = watch(name);

  const [composition, setComposition] = useState("");

  useEffect(() => {
    if (medicineWatch && medicineWatch?.composition) {
      setComposition(medicineWatch?.composition);
    }
  }, [medicineWatch]);

  const fetchDoctorsMedicines = () => {
    dispatch(getMedicinesByDoctorId(id_doctor));
  };

  useEffect(() => {
    fetchDoctorsMedicines();
  }, []);

  const getTitle = () => {
    return (
      <>
        <span style={{ fontWeight: 300 }}>Generic name </span>
        <b>{medicineWatch.medicineName}</b>
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
            setValue(`${name}.composition`, composition);
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

  const getOptions = (opts) => {
    return opts.map((op) => ({
      value: op.medicineId,
      label: op.medicineName,
      ...op,
    }));
  };

  const { fetchData: addMedicine } = useAxios();

  const handleAddMedicine = (payload) => {
    addMedicine(
      {
        url: "Medicine/add-medicine",
        method: "post",
        data: payload,
      },
      (status, res) => {
        if (status === 200) {
          fetchDoctorsMedicines();
          setValue(`${name}`, getOptions([res.payload])[0]);
          onChange(getOptions([res.payload])[0]);
          setFocus(`prescribedMedicines.${index}.dose`);
        }
      },
    );
  };

  const [searchMedLoading, setSearchMedLoading] = useState(false);

  const handleInputChange = useCallback(
    _.debounce((value) => {
      if (value.length > 2) {
        setSearchMedLoading(true);
        dispatch(
          searchMedicines({ Keywords: value, id_doctor: id_doctor }, () => {
            setSearchMedLoading(false);
          }),
        );
      }
    }, 1000),
  );

  return (
    <>
      <CreatableReactSelectField
        name={name}
        options={getOptions([...doctorMedicines, ...medicines])}
        onInputChange={handleInputChange}
        onCreateOption={(val) => {
          let req = {
            medicineId: 0,
            medicineName: val,
            composition: val,
            weightValue: 0,
            id_doctor: id_doctor,
            created_date: new Date(),
          };
          handleAddMedicine(req);
        }}
        onChange={(val) => {
          onChange(val);
        }}
        isLoading={searchMedLoading}
        rules={rules}
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

const CreatableReactSelectField = ({
  name,
  options = [],
  optionLabel = "label",
  optionValue = "value",
  ...restProps
}) => {
  const classes = useStyles();
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CreatableSelect
          {...field} // Spreads: onChange, onBlur, value, ref
          className={classes.reactSelect}
          isClearable
          options={options}
          getOptionLabel={(option) => option[optionLabel]}
          getOptionValue={(option) => option[optionValue]}
          placeholder=""
          getNewOptionData={(value, label) => {
            return {
              [optionLabel]: label,
              [optionValue]: value,
              __isNew__: true,
            };
          }}
          formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          menuPortalTarget={document.body}
          {...restProps}
        />
      )}
    />
  );
};

export default MedicineNameField;
