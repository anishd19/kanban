import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useCards } from "./CardsContext";
import CardsProvider from "./CardsProvider";

jest.mock("uuid", () => ({
  v4: () => "asdf",
}));

const DummyComponent = ({ columnId, cardData = [] }) => {
  const {
    columnsData,
    addNewColumn,
    removeColumnById,
    addNewCardToColumn,
    removeCardFromColumn,
    updateColumnTitle,
    updateCardData,
    updateColumnListData,
    // setColumns,
  } = useCards();
  return (
    <div>
      <button data-testid="addNewColumn" onClick={addNewColumn}></button>
      <button
        data-testid="removeColumnById"
        onClick={() => removeColumnById(columnId)}
      ></button>
      <button
        data-testid="addNewCardToColumn"
        onClick={() => addNewCardToColumn(columnId, cardData)}
      ></button>
      <button
        data-testid="removeCardFromColumn"
        onClick={removeCardFromColumn}
      ></button>
      <button
        data-testid="updateColumnTitle"
        onClick={updateColumnTitle}
      ></button>
      <button data-testid="updateCardData" onClick={updateCardData}></button>
      <button
        data-testid="updateColumnListData"
        onClick={updateColumnListData}
      ></button>

      <div data-testid="data">{JSON.stringify(columnsData)}</div>
    </div>
  );
};

describe("CardsProvider", () => {
  it("adds a new column", async () => {
    render(
      <CardsProvider>
        <DummyComponent />
      </CardsProvider>
    );
    expect(screen.getByTestId("data").textContent).toBe("[]");

    const addNewColumn = screen.getByTestId("addNewColumn");
    fireEvent.click(addNewColumn);
    expect(screen.getByTestId("data").textContent).toBe(
      '[{"id":"asdf","title":"New Column","list":[]}]'
    );
  });

  it("remove a new column", async () => {
    render(
      <CardsProvider>
        <DummyComponent columnId="asdf" />
      </CardsProvider>
    );

    const addNewColumn = screen.getByTestId("addNewColumn");
    fireEvent.click(addNewColumn);
    expect(screen.getByTestId("data").textContent).toBe(
      '[{"id":"asdf","title":"New Column","list":[]}]'
    );

    const removeColumnById = screen.getByTestId("removeColumnById");
    fireEvent.click(removeColumnById, "asdf");
    expect(screen.getByTestId("data").textContent).toBe("[]");
  });

  it("doesn't remove a new column with wrong id", async () => {
    render(
      <CardsProvider>
        <DummyComponent columnId="wrong-asdf" />
      </CardsProvider>
    );

    const addNewColumn = screen.getByTestId("addNewColumn");
    fireEvent.click(addNewColumn);
    expect(screen.getByTestId("data").textContent).toBe(
      '[{"id":"asdf","title":"New Column","list":[]}]'
    );

    const removeColumnById = screen.getByTestId("removeColumnById");
    fireEvent.click(removeColumnById);
    expect(screen.getByTestId("data").textContent).toBe(
      '[{"id":"asdf","title":"New Column","list":[]}]'
    );
  });

  it("add a new card to column", async () => {
    render(
      <CardsProvider>
        <DummyComponent
          columnId="asdf"
          cardData={{ title: "title1", description: "description1" }}
        />
      </CardsProvider>
    );
    const addNewColumn = screen.getByTestId("addNewColumn");
    fireEvent.click(addNewColumn);
    expect(screen.getByTestId("data").textContent).toBe(
      '[{"id":"asdf","title":"New Column","list":[]}]'
    );

    const addNewCardToColumn = screen.getByTestId("addNewCardToColumn");
    fireEvent.click(addNewCardToColumn);
    expect(screen.getByTestId("data").textContent).toBe(
      '[{"id":"asdf","title":"New Column","list":[{"id":"asdf","title":"title1","description":"description1"}]}]'
    );
  });
});
