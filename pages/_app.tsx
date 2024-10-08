"use client";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  scrollTestnet,
  scrollSepolia,
  bscTestnet,
  localhost,
  opBNBTestnet,
} from "wagmi/chains";
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import Navbar from "../components/Navbar/Navbar";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "Blockshare: The decentralized platform",
  projectId: "7f49c7e89e54528522eef8334c58506e",
  transports: {
    [mainnet.id]: http(""), // http('https://eth-mainnet.g.alchemy.com/v2/...')
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/jRWeU9pFpeATDtbmRTHOuSuSp5OVVAO0"
    ), // http('https://eth-sepolia.g.alchemy.com/v2/...')
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.binance.org:8545"),
    [localhost.id]: http("http://127.0.0.1:8545"),
  },
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet, okxWallet],
    },
  ],
  chains: [
    bscTestnet,
    sepolia,
    scrollSepolia,
    localhost,
    // polygon,
    // optimism,
    // arbitrum,

    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Navbar />

          <Component {...pageProps} />
          <ToastContainer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
