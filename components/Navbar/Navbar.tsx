import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            className="text-3xl cursor-pointer  font-bold
           text-white z-50"
          >
            <Link href={"/"} className="z-50">
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
