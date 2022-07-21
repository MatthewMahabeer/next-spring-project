import "../styles/globals.css";
import { MachineProvider } from "../context/Machines/MachineContext";
import Navbar from "../components/navbar";
import { ClientProvider } from "../context/Clients/ClientContext";
import { QueryClientProvider, QueryClient,  } from '@tanstack/react-query'
import { ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';


function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();

  return (
    <ClientProvider>
      <MachineProvider>
        <Navbar />
        <Provider>
        <QueryClientProvider client={queryClient} contextSharing={true}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
        </QueryClientProvider>
        </Provider>
      </MachineProvider>
    </ClientProvider>
  );
}

export default MyApp;
