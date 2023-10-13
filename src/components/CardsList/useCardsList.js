import { useState } from "react";
import { useCards } from "providers";

const useCardsList = (column) => {
  const { removeColumnById, updateColumnTitle } = useCards();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmAction = () => {
    removeColumnById(column?.id);
  };

  const editTitle = (newTitle) => {
    updateColumnTitle(column.id, newTitle);
  };

  return {
    handleOpenDialog,
    handleCloseDialog,
    handleConfirmAction,
    editTitle,
    openDialog,
  };
};

export default useCardsList;
