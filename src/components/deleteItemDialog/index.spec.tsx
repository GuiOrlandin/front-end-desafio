import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import fetchMock from "jest-fetch-mock";

import "@testing-library/jest-dom";

import DeleteItemDialog from ".";

import { act } from "react";

const pushMock = jest.fn();

fetchMock.enableMocks();

describe("deleteItemDialog component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    pushMock.mockClear();
  });
  it("should be able to delete a product", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "1",
        isDeleted: true,
      })
    );

    render(<DeleteItemDialog product_id="1" />);

    const openDialogDeleteItemButton = screen.getByTestId("delete-item-button");

    userEvent.click(openDialogDeleteItemButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Deseja deletar seu item");
      expect(modalTitle).toBeInTheDocument();
    });

    await act(async () => {
      const deleteItemButton = screen.getByTestId("submit-delete-item-button");
      userEvent.click(deleteItemButton);
    });

    await waitFor(() => {
      const deleteItemButton = screen.getByTestId("delete-item-button");
      expect(deleteItemButton).toBeInTheDocument();
    });
  });
});
