import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import ProductInfo from "./page";

import fetchMock from "jest-fetch-mock";

import { useProductStore } from "@/store/procutsStore";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      pathname: "/",
      push: pushMock,
    };
  },
}));

fetchMock.enableMocks();

describe("ProductInfo Page", () => {
  it("should be able to render a product info", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "1",
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        dimensions: {
          width: 23.17,
          height: 14.43,
          depth: 28.01,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        reviews: [
          {
            rating: 2,
            comment: "Very unhappy with my purchase!",
            date: new Date("2024-05-23T08:56:21.618Z"),
            reviewerName: "John Doe",
            reviewerEmail: "john.doe@x.dummyjson.com",
          },
          {
            rating: 2,
            comment: "Not as described!",
            date: new Date("2024-05-23T08:56:21.618Z"),
            reviewerName: "Nolan Gonzalez",
            reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Very satisfied!",
            date: new Date("2024-05-23T08:56:21.618Z"),
            reviewerName: "Scarlett Wright",
            reviewerEmail: "scarlett.wright@x.dummyjson.com",
          },
        ],
        meta: {
          createdAt: new Date("2024-05-23T08:56:21.618Z"),
          updatedAt: new Date("2024-05-23T08:56:21.618Z"),
        },
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      })
    );

    const { addProduct } = useProductStore.getState();
    const params = Promise.resolve({ id: "1" });

    addProduct({
      id: "1",
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      price: 9.99,
      discountPercentage: 7.17,
      rating: 4.94,
      stock: 5,
      tags: ["beauty", "mascara"],
      brand: "Essence",
      dimensions: {
        width: 23.17,
        height: 14.43,
        depth: 28.01,
      },
      warrantyInformation: "1 month warranty",
      shippingInformation: "Ships in 1 month",
      reviews: [
        {
          rating: 2,
          comment: "Very unhappy with my purchase!",
          date: new Date("2024-05-23T08:56:21.618Z"),
          reviewerName: "John Doe",
          reviewerEmail: "john.doe@x.dummyjson.com",
        },
        {
          rating: 2,
          comment: "Not as described!",
          date: new Date("2024-05-23T08:56:21.618Z"),
          reviewerName: "Nolan Gonzalez",
          reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Very satisfied!",
          date: new Date("2024-05-23T08:56:21.618Z"),
          reviewerName: "Scarlett Wright",
          reviewerEmail: "scarlett.wright@x.dummyjson.com",
        },
      ],
      meta: {
        createdAt: new Date("2024-05-23T08:56:21.618Z"),
        updatedAt: new Date("2024-05-23T08:56:21.618Z"),
      },
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    });

    const view = render(<ProductInfo params={params} />);

    await waitFor(() => {
      expect(screen.queryByText("Carregando...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Essence Mascara Lash Princess")).toBeVisible();
    });
  });
});
