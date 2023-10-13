import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, AddCard, EditableText, ConfirmationDialog } from "components";
import { Stack, Divider, IconButton, List } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { CardsListContainer } from "./CardsList.style";
import useCardsList from "./useCardsList";

const CardsList = ({ column }) => {
  const {
    handleOpenDialog,
    handleCloseDialog,
    handleConfirmAction,
    editTitle,
    openDialog,
  } = useCardsList(column);

  return (
    <CardsListContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
      >
        <EditableText variant="h6" text={column.title} callBack={editTitle} />

        <Divider orientation="vertical" flexItem />
        <IconButton
          aria-label="delete"
          size="large"
          color="secondary"
          onClick={() => handleOpenDialog()}
          data-testid="remove-button"
        >
          <Remove />
        </IconButton>
      </Stack>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ height: "100%" }}
            >
              <List>
                {column?.list?.map((listData, index) => (
                  <Card listData={listData} index={index} key={listData.id} />
                ))}
              </List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <AddCard column={column} />

      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        message="Are you sure you want to delete the column? All data associated with the column will be deleted."
      />
    </CardsListContainer>
  );
};

export default CardsList;
