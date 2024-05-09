import { http, createConfig } from 'wagmi'
import { bscTestnet, localhost, mainnet, scrollSepolia, scrollTestnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, scrollSepolia, bscTestnet, localhost],
  transports: {
    [mainnet.id]: http(),
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/"),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.binance.org:8545"),
    [localhost.id]: http("http://127.0.0.1:8545")
  },
})