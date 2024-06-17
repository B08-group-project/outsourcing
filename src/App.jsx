import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import CharacterCounter from "./pages/ExamplePage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CharacterCounter />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
