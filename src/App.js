import "./App.css";
import AllRoutes from "./AllRoutes/Routes";
import AllRoutes2 from "./AllRoutes/Routes2";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.user);
  // console.log(isAuthenticated)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Provider store={store}>
          <Toaster />
          <AllRoutes2 />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
