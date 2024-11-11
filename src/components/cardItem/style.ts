import styled from "styled-components";

interface ThemeSelected {
  $variant: string;
  $stock?: number;
}

export const ProductCardContainer = styled.div<ThemeSelected>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ $variant }) =>
    $variant === "light" ? "#F9FAFB" : "#1A1A1A"};
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  width: 21.875rem;
  max-height: 34rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.5);
  }

  color: ${({ $variant }) => ($variant === "light" ? "#333" : "#EEE")};
`;

export const ProductTitle = styled.h2<ThemeSelected>`
  font-size: 20px;
  font-weight: 600;
  color: ${({ $variant }) => ($variant === "light" ? "#171717" : "#FFFEFE")};
  margin-top: 15px;
  text-align: center;
`;

export const ProductPrice = styled.p<ThemeSelected>`
  margin-top: 1rem;
  font-size: 18px;
  font-weight: bold;
  color: ${({ $variant }) => ($variant === "light" ? "#333333 " : "#FFFEFE ")};
`;

export const ProductDescription = styled.p<ThemeSelected>`
  font-size: 14px;
  color: ${({ $variant }) => ($variant === "light" ? "#666" : "#DDD")};
  margin-top: 10px;
  text-align: center;
`;

export const EditProductAndDeleteProductContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: end;
`;
export const ImageAndDiscount = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 15px;

  p {
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    background: white;
    padding: 0.3rem;
    border-radius: 40px;

    color: #00a650;

    &:last-child {
      font-size: 14px;
      color: ${({ theme }) => theme.secondary};
      text-decoration: line-through;
    }
  }

  img {
    position: relative;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  max-height: 150px;
  border-radius: 8px;
`;

export const StockAndRatingContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const StockStatus = styled.div<ThemeSelected>`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ $stock, $variant }) =>
    $stock! > 0
      ? $variant === "light"
        ? "#4CAF50"
        : "#76C7A8"
      : $variant === "light"
      ? "#FF6F61"
      : "#FF4444"};
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
export const ProductCategory = styled.div<ThemeSelected>`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ $variant }) => ($variant === "light" ? "#333" : "#FFFEFE")};
`;

export const ProductBrand = styled.p<ThemeSelected>`
  font-size: 14px;
  color: ${({ $variant }) => ($variant === "light" ? "#666" : "#B0B0B0")};
  margin-top: 5px;
`;

export const ShippingAndWarranty = styled.div<ThemeSelected>`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ $variant }) => ($variant === "light" ? "#666" : "#DDD")};
  text-align: center;
  line-height: 1.5;
`;

export const Rating = styled.p<ThemeSelected>`
  font-size: 14px;
  color: ${({ $variant }) => ($variant === "light" ? "#171717" : "#FFFEFE")};
  margin-top: 10px;
  font-weight: 600;
  text-align: center;
`;
