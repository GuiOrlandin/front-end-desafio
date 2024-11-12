import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useProductStore } from "./procutsStore";
import { act } from "react";

describe("Product store", () => {
  it("should set products array", async () => {
    function ProductComponent() {
      const products = useProductStore((state) => state.products);
      const handleSetProducts = useProductStore((state) => state.addProducts);

      return (
        <div>
          <button
            data-testid="create-products-button"
            onClick={() =>
              handleSetProducts([
                {
                  id: "2",
                  thumbnail: "https://example.com/product-thumbnail.jpg",
                  discountPercentage: 15,
                  title: "Smartphone Exemplo",
                  description:
                    "Smartphone de última geração com ótima performance.",
                  price: 899.99,
                  stock: 100,
                  brand: "Marca Exemplo",
                  rating: 4.8,
                  tags: ["smartphone", "tecnologia", "eletrônicos"],
                  shippingInformation: "Envio gratuito em até 5 dias úteis.",
                  warrantyInformation:
                    "Garantia de 2 anos contra defeitos de fabricação.",
                  reviews: [
                    {
                      comment: "Excelente produto, recomendo!",
                      date: new Date("2024-05-15"),
                      rating: 5,
                      reviewerEmail: "cliente1@example.com",
                      reviewerName: "João Silva",
                    },
                    {
                      comment: "Muito bom, mas poderia ser mais barato.",
                      date: new Date("2024-06-01"),
                      rating: 4,
                      reviewerEmail: "cliente2@example.com",
                      reviewerName: "Maria Oliveira",
                    },
                  ],
                  dimensions: {
                    width: 7.5,
                    height: 15.2,
                    depth: 0.8,
                  },
                },

                {
                  id: "3",
                  thumbnail: "https://example.com/product-thumbnail.jpg",
                  discountPercentage: 15,
                  title: "Carro Exemplo",
                  description:
                    "Smartphone de última geração com ótima performance.",
                  price: 899.99,
                  stock: 100,
                  brand: "Marca Exemplo",
                  rating: 4.8,
                  tags: ["smartphone", "tecnologia", "eletrônicos"],
                  shippingInformation: "Envio gratuito em até 5 dias úteis.",
                  warrantyInformation:
                    "Garantia de 2 anos contra defeitos de fabricação.",
                  reviews: [
                    {
                      comment: "Excelente produto, recomendo!",
                      date: new Date("2024-05-15"),
                      rating: 5,
                      reviewerEmail: "cliente1@example.com",
                      reviewerName: "João Silva",
                    },
                    {
                      comment: "Muito bom, mas poderia ser mais barato.",
                      date: new Date("2024-06-01"),
                      rating: 4,
                      reviewerEmail: "cliente2@example.com",
                      reviewerName: "Maria Oliveira",
                    },
                  ],
                  dimensions: {
                    width: 7.5,
                    height: 15.2,
                    depth: 0.8,
                  },
                },
              ])
            }
          >
            Criar
          </button>
          <div data-testid="products-display">
            {products.length === 0
              ? "Nenhum produto"
              : `Produtos: ${products.length}`}
          </div>
        </div>
      );
    }

    render(<ProductComponent />);

    const createProductsButton = screen.getByTestId("create-products-button");
    const productsDisplay = screen.getByTestId("products-display");

    userEvent.click(createProductsButton);

    await waitFor(() => {
      expect(productsDisplay).toHaveTextContent("Produtos: 2");
    });
  }),
    it("should create a product", async () => {
      function ProductComponent() {
        const products = useProductStore((state) => state.products);
        const handleCreateProduct = useProductStore(
          (state) => state.addProduct
        );

        return (
          <div>
            <button
              data-testid="create-product-button"
              onClick={() =>
                handleCreateProduct({
                  id: "4",
                  thumbnail: "https://example.com/product-thumbnail.jpg",
                  discountPercentage: 15,
                  title: "fogão Exemplo",
                  description:
                    "Smartphone de última geração com ótima performance.",
                  price: 899.99,
                  stock: 100,
                  brand: "Marca Exemplo",
                  rating: 4.8,
                  tags: ["smartphone", "tecnologia", "eletrônicos"],
                  shippingInformation: "Envio gratuito em até 5 dias úteis.",
                  warrantyInformation:
                    "Garantia de 2 anos contra defeitos de fabricação.",
                  reviews: [
                    {
                      comment: "Excelente produto, recomendo!",
                      date: new Date("2024-05-15"),
                      rating: 5,
                      reviewerEmail: "cliente1@example.com",
                      reviewerName: "João Silva",
                    },
                    {
                      comment: "Muito bom, mas poderia ser mais barato.",
                      date: new Date("2024-06-01"),
                      rating: 4,
                      reviewerEmail: "cliente2@example.com",
                      reviewerName: "Maria Oliveira",
                    },
                  ],
                  dimensions: {
                    width: 7.5,
                    height: 15.2,
                    depth: 0.8,
                  },
                })
              }
            >
              Criar
            </button>
            <div data-testid="product-display">
              {products.length > 0 &&
                products.map((product) => (
                  <div key={product.id}>
                    <p> {`title: ${product.title}`}</p>
                  </div>
                ))}
            </div>
          </div>
        );
      }

      render(<ProductComponent />);

      const createProductButton = screen.getByTestId("create-product-button");
      const productDisplay = screen.getByTestId("product-display");

      userEvent.click(createProductButton);

      await waitFor(() => {
        expect(productDisplay).toHaveTextContent("title: Smartphone Exemplo");
      });
    }),
    it("should edit a product", async () => {
      function ProductComponent() {
        const products = useProductStore((state) => state.products);
        const handleEditProduct = useProductStore((state) => state.editProduct);

        return (
          <div>
            <button
              data-testid="edit-product-button"
              onClick={() =>
                handleEditProduct({
                  id: "2",
                  thumbnail: "https://example.com/product-thumbnail.jpg",
                  discountPercentage: 25,
                  title: "Geladeira Exemplo",
                  description:
                    "Smartphone de última geração com ótima performance.",
                  price: 799.99,
                  stock: 100,
                  brand: "Marca Exemplo",
                  rating: 4.8,
                  tags: ["smartphone", "tecnologia", "eletrônicos"],
                  shippingInformation: "Envio gratuito em até 5 dias úteis.",
                  warrantyInformation:
                    "Garantia de 2 anos contra defeitos de fabricação.",
                  reviews: [
                    {
                      comment: "Excelente produto, recomendo!",
                      date: new Date("2024-05-15"),
                      rating: 5,
                      reviewerEmail: "cliente1@example.com",
                      reviewerName: "João Silva",
                    },
                    {
                      comment: "Muito bom, mas poderia ser mais barato.",
                      date: new Date("2024-06-01"),
                      rating: 4,
                      reviewerEmail: "cliente2@example.com",
                      reviewerName: "Maria Oliveira",
                    },
                  ],
                  dimensions: {
                    width: 7.5,
                    height: 15.2,
                    depth: 0.8,
                  },
                })
              }
            >
              Editar
            </button>
            <div data-testid="product-display">
              {products.length > 0 &&
                products.map((product) => (
                  <div key={product.id}>
                    <p> {`title: ${product.title}`}</p>
                  </div>
                ))}
            </div>
          </div>
        );
      }

      render(<ProductComponent />);

      const editProductButton = screen.getByTestId("edit-product-button");
      const productDisplay = screen.getByTestId("product-display");

      userEvent.click(editProductButton);

      await waitFor(() => {
        expect(productDisplay).toHaveTextContent("title: Geladeira Exemplo");
      });
    }),
    it("should delete a product", async () => {
      function ProductComponent() {
        const products = useProductStore((state) => state.products);
        const handleRemoveProduct = useProductStore(
          (state) => state.removeProduct
        );

        return (
          <div>
            <button
              data-testid="delete-product-button"
              onClick={() => handleRemoveProduct("2")}
            >
              Deletar
            </button>
            <div data-testid="delete-display">
              {products.length > 0 &&
                products.map((product) => (
                  <div key={product.id}>
                    <p> {`title: ${product.title}`}</p>
                  </div>
                ))}
            </div>
          </div>
        );
      }

      render(<ProductComponent />);

      const deleteProductButton = screen.getByTestId("delete-product-button");

      userEvent.click(deleteProductButton);

      await waitFor(() => {
        expect(
          screen.queryByText("title: Geladeira Exemplo")
        ).not.toBeInTheDocument();
      });
    });
});
