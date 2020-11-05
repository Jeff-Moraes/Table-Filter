import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    background: #fdfdfd;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6, p, span, strong, body, input, button {
    font-size: 1rem;
    font-weight: 400;
    color: "#333";
  }
  button {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;