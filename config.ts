import { http, createConfig } from 'wagmi'
import { mainnet, scrollSepolia, scrollTestnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, scrollSepolia],
  transports: {
    [mainnet.id]: http(),
    [scrollSepolia.id]: http("https://sepolia-rpc.scroll.io/")  
  },
})