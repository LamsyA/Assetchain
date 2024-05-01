import React, { useState, useEffect } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { abi } from "../../out/FractionOrderBook.sol/FractionOrderBook.json";
import { FractionOrderContract } from "../../CONSTANTS.json";
import OrderBook from "./OrderBook";
import { readContract } from '@wagmi/core'
import { config } from '../../config'

const OrderBookGenerator = () => {
  const { data: hash, writeContract } = useWriteContract();
  const [orders, setOrders] = useState<any[]>([]); // State to store all orders
  const [tokenState, setTokenState] = useState<boolean>(true); // State for the token ID

  useEffect(() => {
    display();
  }, []); // Empty dependency array to run only once on component mount

  const display = async () => {
    try {
      const result = await readContract(config, {
        abi,
        address: `0x${FractionOrderContract}`,
        functionName: "getOrders",
      });
      console.log(result);
      setOrders(result as any[]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  // Handle loading, error, and order data display logic here

  return (
    <>
      {orders.length === 0 ? null : <OrderBook orders={orders} />}
      {/* Order book content using orders state goes here */}
    </>
  );
};

export default OrderBookGenerator;
