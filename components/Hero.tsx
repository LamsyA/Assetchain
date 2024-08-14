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
    <div className="relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-15 bg-gradient-to-br from-transparent via-transparent to-[#7e23b7]"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-8xl font-extrabold text-center my-24 bg-clip-text bg-gradient-to-r from-[#b24bf3] to-[#7e23b7] text-transparent">
            Tokenize Your Assets
          </h1>
          <div className="text-lg sm:text-xl text-center leading-10 mb-16 text-base-content text-pretty">
            Unlock the potential of your assets through tokenization.
            <br />Whether
            it's real estate, artwork, intellectual property, or any other
            valuable asset, tokenization allows you to divide ownership into
            digital tokens, making them more accessible for investment and
            liquidity.
          </div>
          <div className="flex flex-col sm:flex-row cursor-pointer justify-center items-center gap-16">
            <Link href={"orderbook"}>
              <button className="btn bg-[#b24bf3] text-secondary-content px-6 rounded-full font-bold text-lg hover:bg-[#7e23b7] transition-colors duration-300">
                Order Book
              </button>
            </Link>

            {/* Todo : Add admin wallet to issue COFO */}

            <Link
              href={"/admin"}
              // onClick={openToggle}
              className="btn bg-[#b24bf3] text-secondary-content px-6 cursor-pointer rounded-full font-bold text-lg hover:bg-[#7e23b7] transition-colors duration-300"
            >
              Create Asset
            </Link>

            <Link
              href={"/admin"}
              // onClick={fractionToggle}
              className="btn bg-[#b24bf3] text-secondary-content px-6 cursor-pointer rounded-full font-bold text-lg hover:bg-[#7e23b7] transition-colors duration-300"
            >
              Fractionise Asset
            </Link>
          </div>
        </div>
        <div id="learn-more" className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-base-content">
            Why Tokenize?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-base-200 cursor-pointer rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2 cursor-pointer text-base-content">
                Increased Liquidity
              </h3>
              <p className="text-base-content">
                Tokenization allows for fractional ownership, making it easier
                for investors to buy and sell shares of an asset.
              </p>
            </div>
            <div className="bg-base-200 rounded-lg p-6 cursor-pointer shadow-sm transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl  font-semibold mb-2 text-base-content">
                Global Accessibility
              </h3>
              <p className="text-base-content">
                Digital tokens can be traded 24/7 on global markets, providing
                access to a broader range of investors.
              </p>
            </div>
            <div className="bg-base-200 cursor-pointer rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2 text-base-content">
                Lower Barriers to Entry
              </h3>
              <p className="text-base-content">
                Tokenization allows smaller investors to participate in asset
                ownership that was previously only available to large
                institutions.
              </p>
            </div>
            <div className="bg-base-200 rounded-lg cursor-pointer p-6 shadow-sm transform transition-transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2 text-base-content">
                Automated Compliance
              </h3>
              <p className="text-base-content">
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
