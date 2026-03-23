import React, { useEffect, useState, useMemo } from "react";
import ListPage from "../../ListPage";
import { Button, Row, Col } from "react-bootstrap";
import useAxios from "../../../../hooks/useAxios";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Modal } from "../../../../components";
import { ReactSelectField, TextField } from "../../../../components/Forms";
import { FormProvider, useForm } from "react-hook-form";
import {
  typeOptions,
  unitOptions,
  timingOptions,
} from "../../../../utils/constants";
import ListPagination from "../ListPagination";
import cogoToast from "cogo-toast";
import _ from "lodash";
import Spinner from "../../../../shared/Spinner";

const toastOption = { hideAfter: 5, position: "top-right" };

const useStyles = createUseStyles({
  medicinePageTitle: {
    "& .pagination": {
      margin: 0,
    },
    "& > .custom-page-title": {
      flex: 1,
      display: "flex",
      alignItems: "center",
      "& > *:not(:first-child)": {
        marginLeft: 20,
      },
    },
    "& + div": {
      position: "relative",
    },
  },
  tr: {
    borderBottom: "16px solid #ededed !important",
  },
  td: {
    background: "#fff",
    padding: "5px 10px !important",
    "&.actions > button:not(:first-child)": {
      marginLeft: 14,
    },
  },
  medicineSearch: {
    width: 250,
  },
});

const initData = {
  data: [],
  page: 1,
  pageSize: 20,
  totalPages: 1,
  totalRecords: 0,
};

const Index = () => {
  const classes = useStyles();
  const { id_doctor } = useSelector((state) => state.user.details);

  const [listData, setListData] = useState(initData);
  const [unitMap, setUnitMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState(null);

  const [searchParam, setSearchParam] = useState({
    search: "",
    page: 1,
    pageSize: 20,
  });

  const { loading: listLoading, fetchData: getMedicines } = useAxios();
  const { fetchData: deleteMedicine } = useAxios();
  const { fetchData: getUnitMapping } = useAxios();

  useEffect(() => {
    getUnitMapping(
      {
        url: `Medicine/get-medicine-type-units`,
        method: "get",
      },
      (status, res) => {
        if (status === 200) {
          setUnitMap(res.payload);
        } else {
          setUnitMap(null);
        }
      },
    );
  }, []);

  const getMedicinesList = (obj) => {
    const params = new URLSearchParams({
      id_doctor,
      ...obj,
    }).toString();
    getMedicines(
      {
        url: `Medicine/get-doctor-medicine?${params}`,
        method: "get",
      },
      (status, res) => {
        if (status === 200) {
          setListData(res.payload);
        } else {
          setListData(initData);
        }
      },
    );
  };

  useEffect(() => {
    getMedicinesList(searchParam);
  }, [searchParam]);

  const PageActions = () => {
    return (
      <>
        <ListPagination
          totalPages={listData.totalPages}
          currentPage={listData.page}
          onPaginationChange={(page) => {
            setSearchParam((prev) => ({ ...prev, page }));
          }}
        />
        <Button
          color="primary"
          size="sm"
          className="ml-3"
          onClick={() => {
            setOpen(true);
            setModalFormData(null);
          }}
        >
          Add New
        </Button>
      </>
    );
  };

  const handleDelete = (medId) => {
    deleteMedicine(
      {
        url: `Medicine/delete-medicine/${medId}/${id_doctor}`,
        method: "delete",
      },
      (status, res) => {
        if (status === 200) {
          getMedicinesList(searchParam);
          cogoToast.success(res.message, toastOption);
        } else {
          cogoToast.warn("Something went wrong...!", toastOption);
        }
      },
    );
  };

  const [searchVal, setSearchVal] = useState("");

  const handleDebounceChange = useMemo(
    () =>
      _.debounce(
        (val) => setSearchParam((prev) => ({ ...prev, search: val })),
        300,
      ),
    [],
  );

  const handleImmediateSearch = (val) => {
    if (handleDebounceChange.cancel) {
      handleDebounceChange.cancel();
    }
    setSearchParam((prev) => ({ ...prev, search: val }));
  };

  useEffect(() => {
    return () => {
      if (handleDebounceChange.cancel) {
        handleDebounceChange.cancel();
      }
    };
  }, [handleDebounceChange]);

  const pageTitle = (
    <PageTitle
      searchVal={searchVal}
      setSearchVal={setSearchVal}
      onSearch={handleDebounceChange}
      onImmediateSearch={handleImmediateSearch}
      onReset={() => {
        setSearchVal("");
        setSearchParam((prev) => ({ ...prev, search: "" }));
      }}
    />
  );

  return (
    <ListPage
      pageTitle={pageTitle}
      pageTitleClass={classes.medicinePageTitle}
      pageActions={<PageActions />}
    >
      <div className="table-responsive">
        <table className="table table-borderless">
          <tbody>
            {listData.data.length === 0 && (
              <tr key="NoRecords">
                <td style={{ textAlign: "center", fontWeight: "500" }}>
                  No medicines Found
                </td>
              </tr>
            )}
            {listData.data.length > 0 &&
              listData.data.map((item, ind) => {
                return (
                  <tr key={item.medicineId} className={classes.tr}>
                    <td className={`${classes.td}`}>{item.medicineName}</td>
                    <td className={`${classes.td} actions`} width="130px">
                      <Tooltip text="Edit Medicine" placement="top">
                        <Button
                          className="btn btn-rounded btn-icon btn-primary"
                          onClick={() => {
                            setModalFormData(item);
                            setOpen(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </Button>
                      </Tooltip>
                      <Tooltip text="Delete Medicine" placement="top">
                        <Button
                          className="btn btn-rounded btn-icon btn-danger"
                          onClick={() => {
                            handleDelete(item.medicineId);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <AddEditMedicineModal
        open={open}
        formData={modalFormData}
        unitMap={unitMap}
        onHide={() => {
          setOpen(false);
          setModalFormData(null);
          getMedicinesList(searchParam);
        }}
      />
      {listLoading && <Spinner />}
    </ListPage>
  );
};

const PageTitle = ({
  searchVal,
  setSearchVal,
  onSearch,
  onImmediateSearch,
  onReset,
}) => {
  return (
    <div className="custom-page-title">
      <h6>Medicines</h6>
      <input
        type="text"
        value={searchVal}
        placeholder="Search Medicine..."
        className="form-control form-control-sm"
        style={{ width: 250 }}
        onChange={(e) => {
          const value = e.target.value;
          setSearchVal(value);
          onSearch(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onImmediateSearch(searchVal);
          }
        }}
      />
      <Button color="primary" size="sm" className="ml-3" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

const initFields = {
  type: "",
  medicineName: "",
  dose: "",
  unit: "",
  timing: "",
  duration: "",
  notes: "",
};

const AddEditMedicineModal = (props) => {
  const { formData, open, onHide, unitMap } = props;

  const { fetchData: addMedicine } = useAxios();
  const { fetchData: updateMedicine } = useAxios();

  const { id_doctor } = useSelector((state) => state.user.details);
  const [durationOpt, setDurationOpt] = useState([]);

  const isAdd = formData === null;

  const form = useForm();
  const { handleSubmit, reset, setValue, watch } = form;
  const typeWatch = watch("type");

  useEffect(() => {
    if (formData) {
      const timingVal = timingOptions.find(
        (item) => item.label === formData.timing,
      );
      reset({
        ...formData,
        type: { value: formData.type, label: formData.type },
        unit: { value: formData.unit, label: formData.unit },
        timing: timingVal || {},
        duration: { value: formData.duration, label: formData.duration },
      });
    } else {
      reset(initFields);
    }
  }, [formData]);

  useEffect(() => {
    if (typeWatch) {
      const mappedUnit = unitMap.find((item) => item.type === typeWatch.value);
      if (mappedUnit) {
        setValue("unit", { value: mappedUnit.unit, label: mappedUnit.unit });
      }
    }
  }, [typeWatch]);

  const onSubmit = (form) => {
    let medObj = {
      ...form,
      id_doctor: id_doctor,
      medicineName: form.medicineName,
      composition: form.composition,
      unit: form.unit.value,
      type: form.type.value,
      dose: form.dose,
      timing: form.timing.label,
      duration: form.duration.value,
    };

    if (isAdd) {
      addMedicine(
        {
          url: `Medicine/add-medicine`,
          method: "post",
          data: medObj,
        },
        (status, res) => {
          if (status === 200) {
            cogoToast.success(res.message, toastOption);
            onHide();
          }
        },
      );
    } else {
      updateMedicine(
        {
          url: "Medicine/update-medicine",
          method: "post",
          data: medObj,
        },
        (status, res) => {
          if (status === 200) {
            cogoToast.success(res.message, toastOption);
            onHide();
          }
        },
      );
    }
  };

  const FooterActions = () => {
    return (
      <Button
        className="btn btn-sm btn-primary"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    );
  };

  const formatDose = (e) => {
    const rawValue = e.target.value.trim();

    // 1. Exit if empty
    if (!rawValue && rawValue.includes("-")) return;

    if (!rawValue.includes("-")) {
      const formattedValue = rawValue.split("").join("-");
      setValue("dose", formattedValue, { shouldValidate: true });
    }
  };

  return (
    <Modal
      title={`${isAdd ? "Add New" : "Update"} Medicine`}
      id="add-edit-medicine-modal"
      show={open}
      onHide={onHide}
      size="md"
      footerActions={<FooterActions />}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12}>
              <ReactSelectField
                label="Type"
                name="type"
                options={typeOptions}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                rules={{
                  required: true,
                }}
                placeholder="Select"
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </Col>
            <Col xs={12}>
              <TextField
                label="Medicine Name"
                name="medicineName"
                rules={{
                  required: true,
                }}
                placeholder="Please enter medicine name"
              />
            </Col>
            <Col xs={12}>
              <TextField
                label="Composition"
                name="composition"
                rules={{
                  required: true,
                }}
                placeholder="Please enter composition"
              />
            </Col>

            <Col xs={12}>
              <TextField
                label="Dose"
                name="dose"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[0-9.-]+$/,
                    message: "Invalid dose format",
                  },
                }}
                placeholder="Please enter dose"
                onBlur={formatDose}
              />
            </Col>
            <Col xs={12}>
              <ReactSelectField
                label="Unit"
                name="unit"
                options={unitOptions}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                rules={{
                  required: true,
                }}
                placeholder="Select"
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </Col>
            <Col xs={12}>
              <ReactSelectField
                label="Timing"
                name="timing"
                options={timingOptions}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                rules={{
                  required: true,
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder="Select"
              />
            </Col>
            <Col xs={12}>
              <ReactSelectField
                label="Duration"
                name="duration"
                options={durationOpt}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                components={{
                  IndicatorSeparator: () => null,
                }}
                rules={{
                  required: true,
                }}
                onInputChange={(val) => {
                  const suggestions = ["Days", "Weeks", "Months", "Years"];
                  const newDurationOpt = [];
                  if (val.length > 0 && !isNaN(val)) {
                    suggestions.forEach((sug) => {
                      newDurationOpt.push({
                        label: `${val} ${sug}`,
                        value: `${val} ${sug}`,
                      });
                    });
                  }
                  setDurationOpt(newDurationOpt);
                }}
                placeholder="Select"
              />
            </Col>
            <Col xs={12}>
              <TextField
                label="Note"
                name="notes"
                placeholder="Please enter note"
              />
            </Col>
          </Row>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default Index;
