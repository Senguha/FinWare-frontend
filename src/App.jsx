import "./App.css";
import Navbar from "./components/navbar";
import { Toaster } from "./components/ui/toaster";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
