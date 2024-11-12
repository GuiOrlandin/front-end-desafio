import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import fetchMock from "jest-fetch-mock";

import "@testing-library/jest-dom";

import EditOrCreateProductDialog from ".";
import { ProductResponse } from "@/store/procutsStore";

const pushMock = jest.fn();

fetchMock.enableMocks();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      pathname: "/",
      push: pushMock,
    };
  },
}));

const product = {
  id: "1",
  thumbnail: "thumbnail_image_url.jpg",
  discountPercentage: 10.5,
  title: "Produto Exemplo",
  description: "Este é um produto de exemplo com várias características.",
  createdAt: new Date("2024-10-01T12:00:00Z"),
  updatedAt: new Date("2024-10-01T12:00:00Z"),
  price: 29.99,
  stock: 100,
  brand: "Marca Exemplo",
  rating: 4.5,
  tags: ["eletrônicos", "acessórios"],
  shippingInformation: "Envio em até 5 dias úteis.",
  warrantyInformation: "Garantia de 1 ano.",
  reviews: [
    {
      rating: 5,
      comment: "Produto excelente! Muito satisfeito.",
      date: new Date(),
      reviewerName: "João Silva",
      reviewerEmail: "joao.silva@exemplo.com",
    },
    {
      rating: 3,
      comment: "Produto bom, mas poderia ser melhor.",
      date: new Date(),
      reviewerName: "Maria Oliveira",
      reviewerEmail: "maria.oliveira@exemplo.com",
    },
  ],
  dimensions: {
    width: 30.5,
    height: 10.5,
    depth: 15.0,
  },
} as ProductResponse;

describe("CreateOrEditItemDialog component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    pushMock.mockClear();
  });
  it("should be able to create a product", async () => {
    render(<EditOrCreateProductDialog dialogType="create" />);

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 1,
        title: "batom",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 21,
        rating: 4,
        stock: 2,
        tags: ["belezas", "maquiagem"],
        brand: "Marca X",
        dimensions: {
          width: 10,
          height: 15,
          depth: 5,
        },
        warrantyInformation: "Garantia de 1 ano",
        shippingInformation: "Entrega em até 7 dias",
        reviews: [],
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
        },
        thumbnail: "...",
      })
    );

    const createButton = screen.getByTestId("create-product-button");

    userEvent.click(createButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Crie seu produto");
      expect(modalTitle).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText(
      "digite o nome do seu produto"
    );
    userEvent.type(titleInput, "batom");

    const stockInput = screen.getByPlaceholderText(
      "digite as informações sobre o estoque seu produto"
    );
    userEvent.type(stockInput, "2");

    const priceInput = screen.getByPlaceholderText(
      "digite o preço do seu produto"
    );
    userEvent.type(priceInput, "21");

    const brandInput = screen.getByPlaceholderText(
      "digite a marca do seu produto"
    );
    userEvent.type(brandInput, "Marca X");

    const ratingInput = screen.getByPlaceholderText(
      "digite o numero da avaliação do seu produto"
    );
    userEvent.type(ratingInput, "4");

    const tagsInput = screen.getByPlaceholderText(
      "digite as categorias do seu produto"
    );
    userEvent.type(tagsInput, "belezas, maquiagem");

    const shippingInfoInput = screen.getByPlaceholderText(
      "digite as informações da entrega do seu produto"
    );
    userEvent.type(shippingInfoInput, "Entrega em até 7 dias");

    const warrantyInfoInput = screen.getByPlaceholderText(
      "digite as informações da garantia do seu produto"
    );
    userEvent.type(warrantyInfoInput, "Garantia de 1 ano");

    const widthInput = screen.getByPlaceholderText("digite a largura (cm)");
    userEvent.type(widthInput, "10");

    const heightInput = screen.getByPlaceholderText("digite a altura (cm)");
    userEvent.type(heightInput, "15");

    const depthInput = screen.getByPlaceholderText(
      "digite a profundidade (cm)"
    );
    userEvent.type(depthInput, "5");

    const descriptionTextArea = screen.getByPlaceholderText(
      "digite a descrição do seu produto"
    );
    userEvent.type(descriptionTextArea, "Descrição do produto");

    fireEvent.submit(screen.getByTestId("form-product"));

    await waitFor(() => {
      const CreateProductButton = screen.getByText("Crie seu item");
      expect(CreateProductButton).toBeInTheDocument();
    });
  });
  it("should be able to edit a product", async () => {
    render(
      <EditOrCreateProductDialog dialogType="edit" initialProduct={product} />
    );

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 1,
        title: "batom",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 21,
        rating: 4,
        stock: 2,
        tags: ["belezas", "maquiagem"],
        brand: "Marca X",
        discountPercentage: 10,
        dimensions: {
          width: 10,
          height: 15,
          depth: 5,
        },
        warrantyInformation: "Garantia de 1 ano",
        shippingInformation: "Entrega em até 7 dias",
        reviews: [],
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
        },
        thumbnail: "...",
      })
    );

    const editButton = screen.getByTestId("edit-product-button");

    userEvent.click(editButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Edite seu Produto");
      expect(modalTitle).toBeInTheDocument();
    });

    const discountInput = screen.getByPlaceholderText(
      "digite o desconto a ser aplicado no produto"
    );
    userEvent.type(discountInput, "10");

    fireEvent.submit(screen.getByTestId("form-product"));

    await waitFor(() => {
      const editProductButton = screen.getByTestId("edit-product-button");
      expect(editProductButton).toBeInTheDocument();
    });
  });
});
