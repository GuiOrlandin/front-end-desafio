"use client";

import styled, { keyframes } from "styled-components";

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
  animation: ${spin} 1s infinite linear;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  width: 100%;
`;

export const LoadingText = styled.p`
  margin-top: 0.9375px;
  font-size: 1.125rem;
  font-weight: bold;
`;
