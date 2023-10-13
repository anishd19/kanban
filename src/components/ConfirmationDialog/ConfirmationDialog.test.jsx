import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

test("ConfirmationDialog displays correctly and triggers actions", () => {
  const initialProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    message: "Are you sure?",
    negativeMessage: "No",
    positiveMessage: "Yes",
    titleMessage: "Confirmation",
  };

  render(<ConfirmationDialog {...initialProps} />);

  expect(screen.getByText("Confirmation")).toBeInTheDocument();
  expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  expect(screen.getByText("No")).toBeInTheDocument();
  expect(screen.getByText("Yes")).toBeInTheDocument();

  fireEvent.click(screen.getByText("No"));
  expect(initialProps.onClose).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByText("Yes"));
  expect(initialProps.onConfirm).toHaveBeenCalledTimes(1);
  expect(initialProps.onClose).toHaveBeenCalledTimes(2);
});
