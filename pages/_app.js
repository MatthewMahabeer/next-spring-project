import "../styles/globals.css";
import { MachineProvider } from "../context/Machines/MachineContext";
import Navbar from "../components/navbar";
import { ClientProvider } from "../context/Clients/ClientContext";
import { QueryClientProvider, QueryClient,  } from 'react-query'
import { ReactQueryDevtools} from 'react-query/devtools';

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient()

  return (
    <ClientProvider>
      <MachineProvider>
        <Navbar />
        <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
        </QueryClientProvider>
      </MachineProvider>
    </ClientProvider>
  );
}

export default MyApp;
