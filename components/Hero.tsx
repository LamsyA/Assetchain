import React from "react";
import { setGlobalState } from "../store";
import { useAccount } from "wagmi";
import Link from "next/link";

function Hero() {
  const { address, isConnected } = useAccount();

  console.log("address: ", address);
  const openToggle = () => {
    setGlobalState("createModal", "scale-100");
  };
  const fractionToggle = () => {
    setGlobalState("fraction", "scale-100");
  };
  return (
    <div className="relative  overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0  opacity-75"></div>
      <div className="relative  container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-white">
            Tokenize Your Assets
          </h1>
          <p className="text-lg sm:text-xl text-center mb-8 text-white">
            Unlock the potential of your assets through tokenization. Whether
            it's real estate, artwork, intellectual property, or any other
            valuable asset, tokenization allows you to divide ownership into
            digital tokens, making them more accessible for investment and
            liquidity.
          </p>
          <div className="flex flex-col sm:flex-row cursor-pointer justify-center items-center gap-8">
            <Link href={"orderBook"}>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b24bf3] to-[#7e23b7] text-white font-bold text-lg hover:bg-gradient-to-r hover:from-[#b34bf367] hover:to-[#e24bf3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
                Order Book
              </button>
            </Link>

            {/* Todo : Add admin wallet to issue COFO */}

            <button
              onClick={openToggle}
              className="px-6 py-3 cursor-pointer rounded-full bg-white text-gray-800 font-bold text-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Create Asset
            </button>

            <button
              onClick={fractionToggle}
              className="px-6 py-3 cursor-pointer rounded-full text-white font-bold text-lg hover:bg-[#b24bf3] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b24bf3] border-[#b24bf3] border-2 focus:ring-offset-2 transition-colors duration-300"
            >
              Fractionise Asset
            </button>
          </div>
        </div>
        <div id="learn-more" className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">
            Why Tokenize?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-gray-900 cursor-pointer rounded-lg p-6 shadow-md transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2 cursor-pointer text-white">
                Increased Liquidity
              </h3>
              <p className="text-gray-300">
                Tokenization allows for fractional ownership, making it easier
                for investors to buy and sell shares of an asset.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 cursor-pointer shadow-md transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl  font-semibold mb-2 text-white">
                Global Accessibility
              </h3>
              <p className="text-gray-300">
                Digital tokens can be traded 24/7 on global markets, providing
                access to a broader range of investors.
              </p>
            </div>
            <div className="bg-gray-900 cursor-pointer rounded-lg p-6 shadow-md transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Lower Barriers to Entry
              </h3>
              <p className="text-gray-300">
                Tokenization allows smaller investors to participate in asset
                ownership that was previously only available to large
                institutions.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg cursor-pointer p-6 shadow-md transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Automated Compliance
              </h3>
              <p className="text-gray-300">
                Smart contracts on the blockchain ensure compliance with
                regulatory requirements and increase transparency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
