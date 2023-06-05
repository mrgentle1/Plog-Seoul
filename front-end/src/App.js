import Router from "./core/router";
import GlobalStyle from "./styles/globalStyle";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
