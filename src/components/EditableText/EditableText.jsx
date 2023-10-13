import React, { useEffect, useState } from "react";
import { IconButton, Input, Typography, Stack } from "@mui/material";
import { Edit, Check, Clear } from "@mui/icons-material";

const EditableText = ({ variant, text, callBack = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsConfirmed(false);
  };

  const handleConfirmClick = () => {
    if (newText.trim() !== "") {
      setIsEditing(false);
      setIsConfirmed(true);
    }
  };

  const handleCancelClick = () => {
    setNewText(text);
    setIsEditing(false);
    setIsConfirmed(false);
  };

  useEffect(() => {
    if (isConfirmed && newText !== text) {
      callBack(newText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newText, text, isConfirmed]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
    >
      {isEditing ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            fullWidth
          />
          <IconButton
            variant="outlined"
            aria-label="confirm"
            size="large"
            color="secondary"
            onClick={handleConfirmClick}
          >
            <Check />
          </IconButton>
          <IconButton
            variant="outlined"
            aria-label="cancel"
            size="large"
            color="secondary"
            onClick={handleCancelClick}
          >
            <Clear />
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Typography variant={variant || "h4"}>{text}</Typography>

          <IconButton
            variant="outlined"
            aria-label="edit"
            size="large"
            color="secondary"
            onClick={handleEditClick}
          >
            <Edit />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default EditableText;
