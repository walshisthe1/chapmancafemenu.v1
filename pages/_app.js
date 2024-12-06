import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';

function MyApp({ Component, pageProps }) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const walletConfig = useMemo(
    () => ({
      wallets: [], // Add your supported wallet adapters here
      autoConnect: true,
    }),
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider {...walletConfig}>
        <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp; 