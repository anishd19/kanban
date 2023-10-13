import React from "react";
import { render, screen } from "@testing-library/react";
import { CardsContext } from "providers";
import { DragDropContext } from "react-beautiful-dnd";
import CardsList from "./CardsList";

const mockHandleOpenDialog = jest.fn();
const mockHandleConfirmAction = jest.fn();
const mockHandleCloseDialog = jest.fn();
jest.mock("./useCardsList", () => ({
  __esModule: true,
  default: () => ({
    handleOpenDialog: mockHandleOpenDialog,
    handleCloseDialog: mockHandleCloseDialog,
    handleConfirmAction: mockHandleConfirmAction,
    editTitle: jest.fn(),
    openDialog: false,
  }),
}));

const mockContextValue = {
  columnsData: [],
  addNewColumn: jest.fn(),
  removeColumnById: jest.fn(),
};

const onDragEnd = jest.fn();
const MockCardsProvider = ({ children }) => {
  return (
    <CardsContext.Provider value={mockContextValue}>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </CardsContext.Provider>
  );
};

describe("CardsList component", () => {
  it("renders column elements", () => {
    const column = { id: "column-1", title: "Column Title", list: [] };
    const { container } = render(
      <MockCardsProvider>
        <CardsList column={column} />
      </MockCardsProvider>
    );
    const titleElement = screen.getByText("Column Title");
    const removeButton = screen.getByLabelText("delete");
    expect(titleElement).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
