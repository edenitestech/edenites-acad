// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.black};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    line-height: 1.2;
    margin: 0 0 1rem 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  /* Add spinner animation */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .spinner {
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
`;