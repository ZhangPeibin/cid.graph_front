// 应用的根组件  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CidGraph from "./pages/cid/index.jsx";
import {
    WagmiConfig,
    createClient,
    defaultChains,
    configureChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {getDefaultProvider} from "ethers";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
])


// Set up client
const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
    ],
    provider:getDefaultProvider(),
    webSocketProvider,
})
const App = () => {
  return (
    <WagmiConfig client={client}>
      <BrowserRouter>
          <Routes>
              <Route path="/*" element={<CidGraph />} />
          </Routes>
      </BrowserRouter>
  </WagmiConfig>
  );
};

export default App;
