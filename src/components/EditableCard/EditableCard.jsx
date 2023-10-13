import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Input,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

const EditableCard = ({
  title: initialTitle,
  description: initialDescription,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <div>
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          ) : (
            <Typography variant="h5">{title}</Typography>
          )}

          {isEditing ? (
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          ) : (
            <Typography variant="body1">{description}</Typography>
          )}
        </div>

        <IconButton onClick={handleEditClick}>
          <Edit />
        </IconButton>

        {isEditing ? (
          <>
            <IconButton onClick={handleSaveClick}>
              <Save />
            </IconButton>
            <IconButton onClick={handleCancelClick}>
              <Cancel />
            </IconButton>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default EditableCard;
