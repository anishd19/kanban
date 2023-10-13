import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  message,
  negativeMessage = "No",
  positiveMessage = "Yes",
  titleMessage = "Confirmation",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{titleMessage}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {negativeMessage}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="primary"
        >
          {positiveMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
