import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  button {
    padding: 0.3rem 1rem;
    border-radius: 5px;
    border: 1px solid #1f1f1f;
    font-weight: 600;
    background-color: white;
    color: #1f1f1f;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
    padding: 0;
  margin: 0;
  box-sizing: border-box;
    }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }
  
`;
