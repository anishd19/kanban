import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, List } from "@mui/material";

const CardStyle = ({ listData, index }) => {
  const { id, title, description } = listData;
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided) => (
        <List
          key={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            sx={{
              p: 3,
              color: "black",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "black",
                opacity: [0.9],
                cursor: "pointer",
              },
            }}
          >
            {title}
            {description}
          </Card>
        </List>
      )}
    </Draggable>
  );
};

export default CardStyle;
