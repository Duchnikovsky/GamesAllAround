import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { store } from "../states/store";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children} <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" transition={Flip}/>
      </Provider>
    </QueryClientProvider>
  );
}
