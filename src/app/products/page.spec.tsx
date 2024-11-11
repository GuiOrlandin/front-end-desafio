import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import { useUserStore } from "@/store/userStore";
import fetchMock from "jest-fetch-mock";
import Products from "./page";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      pathname: "/",
      push: pushMock,
    };
  },
}));

describe("Products Page", () => {
  const mockSetUser = jest.fn();
  beforeEach(() => {
    fetchMock.resetMocks();
    useUserStore.setState({ setUser: jest.fn() });
    mockSetUser.mockClear();
    pushMock.mockClear();
  });

  it("should be able to render loading page", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Carregando...")).toBeVisible();
    });
  });
  it("should be able to render products in the page", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Gucci Bloom Eau de")).toBeVisible();
      expect(
        screen.getByText("Knoll Saarinen Executive Conference Chair")
      ).toBeVisible();
      expect(screen.getByText("Apple")).toBeVisible();
    });
  });

  it("should be able to search products by name", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    const NameOrBrandinput = screen.getByPlaceholderText(
      "Filtrar por nome ou marca"
    );

    userEvent.type(NameOrBrandinput, "Essence");

    await waitFor(() => {
      expect(screen.getByText("Essence Mascara Lash Princess")).toBeVisible();
      expect(
        screen.queryByText("Knoll Saarinen Executive Conference Chair")
      ).not.toBeInTheDocument();
    });
  });

  it("should be able to search products by oldest", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    const dateFilterSelect = screen.getByTestId("filter-item-by-age");

    userEvent.selectOptions(dateFilterSelect, "oldest");

    await waitFor(() => {
      const selectedOption = screen.getByRole("option", {
        name: "Mais Antigos",
        selected: true,
      });
      expect(selectedOption).toBeInTheDocument();
    });

    const products = screen.getAllByTestId("product-item");

    expect(products[0]).toHaveTextContent("Essence Mascara Lash Princess");
  });
  it("should be able to search products by brand", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    const priorityFilterSelect = screen.getByTestId("filter-item-by-priority");

    userEvent.selectOptions(priorityFilterSelect, "brand");

    await waitFor(() => {
      const selectedOption = screen.getByRole("option", {
        name: "Marca",
        selected: true,
      });
      expect(selectedOption).toBeInTheDocument();
    });

    const products = screen.getAllByTestId("product-item");

    expect(products[0]).toHaveTextContent("Annibale Colombo Bed");
  });

  it("should be able to search products by title", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    const priorityFilterSelect = screen.getByTestId("filter-item-by-priority");

    userEvent.selectOptions(priorityFilterSelect, "title");

    await waitFor(() => {
      const selectedOption = screen.getByRole("option", {
        name: "Titulo",
        selected: true,
      });
      expect(selectedOption).toBeInTheDocument();
    });

    const products = screen.getAllByTestId("product-item");

    expect(products[2]).toHaveTextContent("Apple");
  });
  it("should be able to redirect to products info", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    });

    const productContent = screen.getAllByTestId("product-content");

    userEvent.click(productContent[0]);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/productInfo/10");
    });
  });
});
