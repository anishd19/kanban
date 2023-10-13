import { renderHook, act } from "@testing-library/react";
import useCardsList from "./useCardsList";

const mockRemoveColumnById = jest.fn();
const mockUpdateColumnTitle = jest.fn();

jest.mock("providers", () => ({
  useCards: () => ({
    removeColumnById: mockRemoveColumnById,
    updateColumnTitle: mockUpdateColumnTitle,
  }),
}));

describe("useCardsList hook", () => {
  it("should initialize with openDialog as false", () => {
    const { result } = renderHook(() => useCardsList({ id: "column-1" }));
    expect(result.current.openDialog).toBe(false);
  });

  it("should set openDialog to true when handleOpenDialog is called", () => {
    const { result } = renderHook(() => useCardsList({ id: "column-1" }));
    act(() => {
      result.current.handleOpenDialog();
    });
    expect(result.current.openDialog).toBe(true);
  });

  it("should set openDialog to false when handleCloseDialog is called", () => {
    const { result } = renderHook(() => useCardsList({ id: "column-1" }));
    act(() => {
      result.current.handleOpenDialog();
      result.current.handleCloseDialog();
    });
    expect(result.current.openDialog).toBe(false);
  });

  it("should call removeColumnById when handleConfirmAction is called", () => {
    const columnData = { id: "column-1" };
    const { result } = renderHook(() => useCardsList(columnData));
    act(() => {
      result.current.handleConfirmAction();
    });
    expect(result.current.openDialog).toBe(false);
    expect(mockRemoveColumnById).toHaveBeenCalledTimes(1);
    expect(mockRemoveColumnById).toHaveBeenCalledWith(columnData.id);
  });

  it("should call updateColumnTitle when editTitle is called", () => {
    const columnData = { id: "column-1" };
    const { result } = renderHook(() => useCardsList(columnData));
    const newTitle = "New Title";
    act(() => {
      result.current.editTitle(newTitle);
    });
    expect(mockUpdateColumnTitle).toHaveBeenCalledTimes(1);
    expect(mockUpdateColumnTitle).toHaveBeenCalledWith(columnData.id, newTitle);
  });
});
