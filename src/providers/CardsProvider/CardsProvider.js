import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardsContext } from "./CardsContext";

const CardsProvider = ({ children }) => {
  const initialColumns = [];
  const [columns, setColumns] = useState(initialColumns);

  const addNewColumn = useCallback(() => {
    setColumns((state) => [
      ...state,
      {
        id: uuidv4(),
        title: "New Column",
        list: [],
      },
    ]);
  }, []);

  const removeColumnById = useCallback((columnId) => {
    setColumns((state) => state.filter((column) => column.id !== columnId));
  }, []);

  const addNewCardToColumn = useCallback((columnId, cardData) => {
    setColumns((state) =>
      state.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            list: [...column.list, { id: uuidv4(), ...cardData }],
          };
        }
        return column;
      })
    );
  }, []);

  const removeCardFromColumn = useCallback((columnId, cardId) => {
    console.log("removeCardFromColumn");
    setColumns((state) =>
      state.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            list: column.list.filter((card) => card.id !== cardId),
          };
        }
        return column;
      })
    );
  }, []);

  const updateColumnTitle = useCallback((columnId, newTitle) => {
    console.log("updateColumnTitle");
    setColumns((state) =>
      state.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      )
    );
  }, []);

  const updateCardData = useCallback(
    (columnId, cardId, newTitle, newDescription) => {
      console.log("updateCardData");
      setColumns((state) =>
        state.map((column) => {
          if (column.id === columnId) {
            const updatedList = column.list.map((card) =>
              card.id === cardId
                ? { ...card, title: newTitle, description: newDescription }
                : card
            );
            return { ...column, list: updatedList };
          }
          return column;
        })
      );
    },
    []
  );

  const updateColumnListData = useCallback((columnId, newListData) => {
    console.log("updateColumnListData");
    setColumns((state) =>
      state.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            list: newListData,
          };
        }
        return column;
      })
    );
  }, []);

  return (
    <CardsContext.Provider
      value={{
        columnsData: columns,
        addNewColumn,
        removeColumnById,
        addNewCardToColumn,
        removeCardFromColumn,
        updateColumnTitle,
        updateCardData,
        updateColumnListData,
        setColumns,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
