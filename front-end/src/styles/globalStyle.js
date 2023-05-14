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
