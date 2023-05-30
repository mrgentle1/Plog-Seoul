import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root, 
  body,html {
    margin: 0;
    padding: 0;

    width: 100%;
    height: 100%;
    margin: 0 auto;
    font-size: 62.5%;

    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);

  }

  @font-face {
    font-family: "SUITE-Regular";
    src: url("./styles/fonts/SUIT-Variable-ttf/SUIT-Variable.ttf");
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
