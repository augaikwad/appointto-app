import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Modal, InputField, Tooltip } from "../../../components";
import { useSelector } from "react-redux";
import useAxios from "../../../hooks/useAxios";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  pageTitle: {
    display: "flex",
    "& > .title": {
      flex: 1,
    },
  },
  ListContainer: {
    padding: 10,
    background: "#ededed",
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
});

const Index = () => {
  const classes = useStyles();
  const [reasons, setReasons] = useState([]);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [selectedReason, setSelectedReason] = useState({});
  const { id_doctor } = useSelector((state) => state.user.details);

  const { fetchData: getReasons } = useAxios();

  const getReasonList = () => {
    getReasons(
      {
        url: `AppointmentReason/get-reasons-by-doctor?id_doctor=${id_doctor}`,
        method: "get",
      },
      (status, res) => {
        if (status === 200) {
          setReasons(res.payload?.appointmentReasons || []);
        }
      }
    );
  };

  useEffect(() => {
    getReasonList();
  }, []);

  const onHide = () => {
    setReasonModalOpen(false);
    setSelectedReason({});
    setIsAdd(true);
  };

  const callback = (status, res) => {
    if (status === 200) {
      getReasonList();
      onHide();
    }
  };

  const FooterActions = () => {
    const { fetchData: updateReason } = useAxios();
    const { fetchData: createReason } = useAxios();

    return (
      <Button
        className="btn btn-sm btn-primary"
        onClick={() => {
          const payload = { ...selectedReason };
          if (isAdd) {
            payload.id_doctor = id_doctor;

            createReason(
              {
                url: "AppointmentReason/create-reason",
                method: "post",
                data: payload,
              },
              callback
            );
          } else {
            updateReason(
              {
                url: "AppointmentReason/update-reason",
                method: "post",
                data: payload,
              },
              callback
            );
          }
        }}
      >
        Save
      </Button>
    );
  };

  const { fetchData: deleteReason } = useAxios();

  const handleDelete = (item) => {
    deleteReason(
      {
        url: "AppointmentReason/delete-reason",
        method: "post",
        data: {
          id_reason: item.id_reason,
        },
      },
      callback
    );
  };

  return (
    <>
      <div className={classes.pageTitle}>
        <h6 className="title">Reasons</h6>
        <Button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setIsAdd(true);
            setReasonModalOpen(true);
          }}
        >
          Add New
        </Button>
      </div>
      <div
        className="mt-2 p-3"
        style={{ background: "#EDEDED", minHeight: 140 }}
      >
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              {reasons.length === 0 && (
                <tr key="NoRecords">
                  <td style={{ textAlign: "center", fontWeight: "500" }}>
                    No reasons Found
                  </td>
                </tr>
              )}
              {reasons.length > 0 &&
                reasons.map((item, ind) => {
                  return (
                    <tr key={item.id_reason} className={classes.tr}>
                      <td className={`${classes.td}`}>{item.reason_name}</td>
                      <td className={`${classes.td} actions`} width="130px">
                        <Tooltip text="Edit Reason" placement="top">
                          <Button
                            className="btn btn-rounded btn-icon btn-primary"
                            onClick={() => {
                              setReasonModalOpen(true);
                              setSelectedReason(item);
                              setIsAdd(false);
                            }}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </Button>
                        </Tooltip>
                        <Tooltip text="Delete Reason" placement="top">
                          <Button
                            className="btn btn-rounded btn-icon btn-danger"
                            onClick={() => {
                              handleDelete(item);
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
      </div>
      <Modal
        title={`${isAdd ? "Add New" : "Update"} Reason`}
        show={reasonModalOpen}
        onHide={onHide}
        size="sm"
        footerActions={<FooterActions />}
      >
        <Row>
          <Col xs={12}>
            <InputField
              name="disease"
              value={selectedReason?.reason_name || ""}
              onChange={(e) => {
                setSelectedReason((prev) => ({
                  ...prev,
                  reason_name: e.target.value,
                }));
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Index;
