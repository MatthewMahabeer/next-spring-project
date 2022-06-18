import "../styles/globals.css";
import { MachineProvider } from "../context/Machines/MachineContext";
import Navbar from "../components/navbar";
import { ClientProvider } from "../context/Clients/ClientContext";

function MyApp({ Component, pageProps }) {
  return (
    <ClientProvider>
      <MachineProvider>
        <Navbar />
        <Component {...pageProps} />
      </MachineProvider>
    </ClientProvider>
  );
}

export default MyApp;
