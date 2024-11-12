"use client";

import { Suspense, useEffect, useState } from "react";

import { useThemeStore } from "@/store/themeStore";

import {
  PaginationContainer,
  PaginationButton,
  ProductsContainer,
  CardProductContainer,
  FilterContainer,
  FilterInput,
  FilterSelectContainer,
  FilterSelect,
  HeaderAndFiltersContainer,
} from "./styles";
import Header from "@/components/header";
import CardItem from "@/components/cardItem";
import { useProductStore } from "@/store/procutsStore";
import LoadingPage from "@/components/loadingPage";
import { getAllProductsFetch } from "@/services/getAllProductsFetch";

export default function Products() {
  const theme = useThemeStore((state) => state.theme);
  const addProducts = useProductStore((state) => state.addProducts);
  const products = useProductStore((state) => state.products);
  const [filterPriority, setFilterPriority] = useState("");
  const [dateFilterPriority, setDateFilterPriority] = useState("");
  const [filterTitleOrBrand, setFilterTitleOrBrand] = useState("");

  async function getAllProducts() {
    try {
      const allProducts = await getAllProductsFetch();

      if (
        Array.isArray(allProducts) &&
        allProducts.length > 0 &&
        products.length === 0
      ) {
        addProducts(allProducts);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const filteredItems = products
    .filter((product) => {
      const matchesTitleOrBrand =
        (product.title &&
          product.title
            .toLowerCase()
            .includes(filterTitleOrBrand.toLowerCase())) ||
        (product.brand &&
          product.brand
            .toLowerCase()
            .includes(filterTitleOrBrand.toLowerCase()));

      return matchesTitleOrBrand;
    })
    .sort((a, b) => {
      const sortBy = filterPriority;

      if (sortBy === "brand" && a.brand && b.brand) {
        return a.brand.localeCompare(b.brand);
      } else if (sortBy === "title" && a.title && b.title) {
        return a.title.localeCompare(b.title);
      }
      if (dateFilterPriority === "newest" && b.meta && a.meta) {
        return (
          new Date(b.meta?.updatedAt).getTime() -
          new Date(a.meta?.updatedAt).getTime()
        );
      } else if (dateFilterPriority === "oldest" && b.meta && a.meta) {
        return (
          new Date(a.meta?.updatedAt).getTime() -
          new Date(b.meta?.updatedAt).getTime()
        );
      }

      return (
        new Date(b.meta?.updatedAt!).getTime() -
        new Date(a.meta?.updatedAt!).getTime()
      );
    });

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / limit);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const productsStorage = localStorage.getItem("@products:product-1.0.0");

      if (!productsStorage) {
        getAllProducts();
      }
    }
  }, [products]);

  return (
    <ProductsContainer $variant={theme}>
      <HeaderAndFiltersContainer>
        <FilterContainer>
          <FilterInput
            $variant={theme}
            type="text"
            placeholder="Filtrar por nome ou marca"
            onChange={(e) => setFilterTitleOrBrand(e.target.value)}
          />
          <FilterSelectContainer>
            <FilterSelect
              $variant={theme}
              data-testid="filter-item-by-priority"
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Todas as Prioridades</option>
              <option value="brand">Marca</option>
              <option value="title">Titulo</option>
            </FilterSelect>
            <FilterSelect
              $variant={theme}
              onChange={(e) => setDateFilterPriority(e.target.value)}
              data-testid="filter-item-by-age"
            >
              <option value="newest">Mais Novos</option>
              <option value="oldest">Mais Antigos</option>
            </FilterSelect>
          </FilterSelectContainer>
        </FilterContainer>
        <Header page="products" />
      </HeaderAndFiltersContainer>

      <Suspense fallback={<LoadingPage />}>
        {paginatedItems.length > 0 ? (
          <CardProductContainer>
            {paginatedItems.map((product) => (
              <CardItem key={product.id} product={product} />
            ))}
          </CardProductContainer>
        ) : (
          <LoadingPage />
        )}
      </Suspense>

      <PaginationContainer $variant={theme}>
        {pages.map((page) => (
          <PaginationButton
            key={page}
            onClick={() => setCurrentPage(page)}
            $isActive={currentPage === page}
            $variant={theme}
          >
            {page}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </ProductsContainer>
  );
}
