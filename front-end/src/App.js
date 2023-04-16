import Router from "./core/router";
import GlobalStyle from "./styles/globalStyle";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}

export default App;
