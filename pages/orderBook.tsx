import React from "react";
import OrderBookGenerator from "../components/FractionOrderBook/OrderBookGenerator";
import CreateOrder from "../components/FractionOrderBook/CreateOrder";
import FillOrder from "../components/FractionOrderBook/FillOrder";
import TerminateOrder from "../components/FractionOrderBook/TerminateOrder";
// import CreateOrder from "./CreateOrder";
// import FillOrder from "./FillOrder";
// import OrderBookGenerator from "./OrderBookGenerator";
// import TerminateOrder from "./TerminateOrder";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen  items-center">
      <header className="text-[#b24bf3] flex justify-between items-center px-4 py-8">
        <h1 className="text-5xl font-semibold">Order Book</h1>
        {/* Add any additional header elements here */}
      </header>
      <main className="flex flex-grow flex-col overflow-hidden items-center">
        <div className="w-full md:w-3/4 px-4 py-4">
          <OrderBookGenerator />
        </div>
        <div className="w-full md:w-[1000px] px-4 py-4 flex justify-between gap-x-24">
          <div className="mb-4 rounded-md bg-base-300/40">
            <CreateOrder />
          </div>
          <div className="mb-4 grow">
            <div className="mb-8">
              <FillOrder />
            </div>
            <div>
              <TerminateOrder />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
