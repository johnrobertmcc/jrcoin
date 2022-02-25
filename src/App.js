import Wrapper from "./components/util/Wrapper/Wrapper";
import Layout from "./components/layout/Layout";
import { BlockchainProvider } from "./context";

/**
 * Renders the dapp wrapped with white background.
 *
 * @returns {Element} The dapp itself.
 *
 */
export default function App() {
  return (
    <BlockchainProvider>
      <Wrapper pt={false} pb={false} className="app">
        <Layout />
      </Wrapper>
    </BlockchainProvider>
  );
}
