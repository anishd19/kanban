import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCards } from "providers";

const AddCard = ({ column }) => {
  const { id } = column;
  const [cardTitle, setCardTitle] = useState("");
  const { addNewCardToColumn } = useCards();

  const handleCardTextChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleAddCard = () => {
    if (cardTitle.trim() !== "") {
      addNewCardToColumn(id, {
        title: cardTitle,
        description: "",
      });
      setCardTitle("");
    }
  };

  return (
    <div>
      <TextField
        label="Add a card"
        variant="outlined"
        value={cardTitle}
        onChange={handleCardTextChange}
        fullWidth
        margin="dense"
        color="primary"
      />
      <Button variant="contained" color="primary" onClick={handleAddCard}>
        Add Card
      </Button>
    </div>
  );
};

export default AddCard;
