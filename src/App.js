// 应用的根组件  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CidGraph from "./pages/cid/index.jsx";
import { WagmiConfig, createClient } from 'wagmi'
const client = createClient()

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
