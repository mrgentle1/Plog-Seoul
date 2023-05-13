import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root, 
  body,html {
    margin: 0;
    padding: 0;

    width: 393px;
    height: 100%;
    margin: 0 auto;
    font-size: 62.5%;

  }

  @font-face {
    font-family: 'SUIT Variable';
    font-weight: 100 900;
    src: local('SUIT Variable Regular'), url('./SUIT-Variable.woff2') format('woff2-variations');
  }

  * {
    box-sizing: border-box;
	}

  button:hover {
    cursor: pointer;
  }
  
  a, a:visited {
    text-decoration: none;
    color: black;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }
`;

export default GlobalStyle;
