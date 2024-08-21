import "./App.css";
import AllRoutes from "./AllRoutes/Routes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Provider store={store}>
          <Toaster />
          <AllRoutes />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
