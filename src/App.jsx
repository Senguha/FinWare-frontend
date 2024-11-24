import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Router from "./components/Routes/router";
import { Toaster } from "./components/ui/toaster";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
