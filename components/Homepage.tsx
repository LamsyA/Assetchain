import React from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero";
import Register from "./Register/Register";
import Admin from "./adminowner/Admin";
import Main from "./FractionOrderBook/Main";
import CreateOrder from "./FractionOrderBook/CreateOrder";
import FillOrder from "./FractionOrderBook/FillOrder";
import TerminateOrder from "./FractionOrderBook/TerminateOrder";
import router, { useRouter } from "next/router";
import { getAccount } from "@wagmi/core";
import AdminLend from "../components/Lending/AdminLend";
import { WalletInstance } from "@rainbow-me/rainbowkit/dist/wallets/Wallet";

import FractionalizeForm from "./FractionilizeContract/Fractionalize";
import Link from "next/link";
import CreateAsset from "./adminowner/CreateAsset";
function Homepage() {
  return (
    <div className="">
      {/* <AdminLend/> */}
      {/* <Navbar /> */}
      <div className="">
        <Hero />
        <CreateAsset />
      </div>
      {/* <Main/> */}
      {/* <CreateOrder /> */}
      {/* <FillOrder /> */}
      {/* <TerminateOrder /> */}
      {/* <Admin /> */}
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button" onClick={() => router.push('/components/FractionilizeContract/Fractionalize/')}> */}
      <Link href="/components/FractionilizeContract/Fractionalize/">
        Fractionalize
      </Link>
      {/* </button> */}
      {/* <FractionalizeForm/> */}
      <FractionalizeForm />
    </div>
  );
}

export default Homepage;
