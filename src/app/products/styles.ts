import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
}
interface IsSelected extends ThemeSelected {
  $isActive: boolean;
}

export const ProductsContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;

  width: 100vw;
  min-height: 100vh;

  background: ${({ $variant }) =>
    $variant === "light" ? "#FFFEFE" : "#3F3D45"};

  transition: background 0.3s ease-in-out;

  header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  h1 {
    text-align: center;
    margin-top: 4rem;
    color: ${({ $variant }) => ($variant === "dark" ? "#FFFEFE" : "#2C2C2D")};
  }
`;

export const CardProductContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const PaginationContainer = styled.div<ThemeSelected>`
  display: flex;
  gap: 0.1rem;
  justify-content: center;
`;

export const PaginationButton = styled.button<IsSelected>`
  color: ${({ $isActive, $variant }) =>
    $variant === "light" && !$isActive ? "#3F3D45" : "#FFFEFE"};
  color: ${({ $isActive, $variant }) =>
    $isActive && $variant === "light" && "#B9B0B0"};
  color: ${({ $isActive, $variant }) =>
    $isActive && $variant === "dark" && "#B9B0B0"};
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: ${({ $variant }) => ($variant === "light" ? "#9D9292" : "#B9B0B0")};
  }
`;

export const FilterSelect = styled.select<ThemeSelected>`
  background: ${({ $variant }) => ($variant === "light" ? "#F5F5F5" : "white")};

  padding: 1rem;
  border-radius: 8px;
  border: none;
`;

export const FilterInput = styled.input<ThemeSelected>`
  background: ${({ $variant }) => ($variant === "light" ? "#F5F5F5" : "white")};
  width: 20rem;
  padding: 1rem;
  border-radius: 8px;
  border: none;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterSelectContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
`;

export const HeaderAndFiltersContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
`;
