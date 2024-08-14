import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-base-100/60 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-1 py-4">
        <div className="flex justify-between items-center">
          <div
            className="text-3xl cursor-pointer font-bold z-50"
          >
            <Link href={"/"} className="z-50 bg-clip-text bg-gradient-to-r from-[#b24bf3] to-[#7e23b7] text-transparent">
              AssetChain
            </Link>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
