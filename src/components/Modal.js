import React from "react";
import { Modal as BSModal } from "react-bootstrap";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

const Modal = ({
  id = "Modal",
  title,
  size = "lg",
  show = false,
  onHide = () => {},
  footerActions,
  backdrop = "static",
  scrollable = true,
  dialogClassName = "",
  children,
}) => {
  const classes = useStyles();

  return (
    <BSModal
      id={id}
      size={size}
      show={show}
      onHide={onHide}
      scrollable={scrollable}
      backdrop={backdrop}
      className={classes.modal}
      dialogClassName={dialogClassName}
      backdropClassName="d-none"
    >
      {title !== null && (
        <BSModal.Header closeButton>
          <BSModal.Title>{title}</BSModal.Title>
        </BSModal.Header>
      )}

      <BSModal.Body>{children}</BSModal.Body>

      {!!footerActions && <BSModal.Footer>{footerActions}</BSModal.Footer>}
    </BSModal>
  );
};

export default Modal;
