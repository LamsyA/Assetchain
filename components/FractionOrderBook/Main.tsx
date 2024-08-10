import React from "react";
import CreateOrder from "./CreateOrder";
import FillOrder from "./FillOrder";
import OrderBookGenerator from "./OrderBookGenerator";
import TerminateOrder from "./TerminateOrder";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-grow overflow-hidden">
        <div className="w-full md:w-3/4 px-4 py-4">
          <OrderBookGenerator />
        </div>
        <div className="w-full md:w-1/4 px-4 py-4">
          <div className="mb-4">
            <CreateOrder />
          </div>
          <div className="">
            <div className="mb-4">
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
