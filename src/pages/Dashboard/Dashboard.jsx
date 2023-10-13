import React from "react";
import { useCards } from "providers";
import { CardsList } from "components";
import { Box, Divider, Stack, IconButton, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import { DragDropContext } from "react-beautiful-dnd";

const Dashboard = () => {
  const { addNewColumn, columnsData, updateColumnListData } = useCards();

  const onDragEnd = ({ source, destination }) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columnsData.find(
      (column) => column.id === source.droppableId
    );
    const end = columnsData.find(
      (column) => column.id === destination.droppableId
    );

    if (start.id === end.id) {
      console.log("Start: ", start);
      const newList = start.list.filter((_, idx) => idx !== source.index);

      newList.splice(destination.index, 0, start.list[source.index]);

      updateColumnListData(start.id, newList);
      return null;
    } else {
      const newStartList = start.list.filter((_, idx) => idx !== source.index);
      updateColumnListData(start.id, newStartList);

      const newEndList = end.list;

      newEndList.splice(destination.index, 0, start.list[source.index]);
      updateColumnListData(end.id, newEndList);
      return null;
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Paper
          sx={{
            p: 3,
          }}
          style={{
            overflowX: "auto",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            style={{
              height: "100%",
              width: "300px",
            }}
          >
            {columnsData.map((column) => {
              console.log(column);
              return <CardsList column={column} key={column.id} />;
            })}
            <Box
              spacing={2}
              sx={{
                height: "100%",
                border: "1px dotted #000",
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="delete"
                size="large"
                color="secondary"
                onClick={addNewColumn}
              >
                <Add />
              </IconButton>
            </Box>
          </Stack>
        </Paper>
      </DragDropContext>
    </Box>
  );
};

export default Dashboard;
