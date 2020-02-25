import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";

const ConfirmActionButtonDialog = ({
  label,
  icon,
  title,
  subtitle,
  confirm,
  cancel,
  disabled = false,
  showIconText = true
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleCancel() {
    setIsOpen(false);
    cancel();
  }

  function handleConfirm() {
    setIsOpen(false);
    confirm();
  }

  return (
    <>
      <Button disabled={disabled} onClick={() => setIsOpen(true)}>
        {icon}
        {showIconText && <Typography> {label}</Typography>}
      </Button>

      <Dialog open={isOpen} onClose={handleCancel}>
        <DialogTitle>{title || "Confirma?"}</DialogTitle>
        {subtitle && (
          <DialogContent>
            <DialogContentText>{subtitle}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleConfirm()}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmActionButtonDialog;
