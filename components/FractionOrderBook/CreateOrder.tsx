import { useState } from "react";
import { useWriteContract } from "wagmi";
// import { abi } from "../../contracts/out/FractionOrderBook.sol/FractionOrderBook.json";
import { abi } from "../../contracts/out/OrderBook.sol/OrderBook.json";
import { FractionOrderContract } from "../../CONSTANTS.json";

import { writeContract } from "viem/actions";

const CreateOrder = () => {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const [formData, setFormData] = useState({
    isBuy: true, // Default buy order selection
    asset: "",
    amount: "",
    price: "",
    paymentToken: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Buy Order:", formData);
    try {
      writeContract(
        {
          abi,
          address: `0x${FractionOrderContract}`,
          functionName: "createOrder",
          args: [
            formData.asset,
            formData.amount,
            formData.price,
            formData.paymentToken,
            formData.isBuy,
          ],
        },
        {
          onSuccess: (data) => {
            console.log("data:", data);
          },
          onError: (error) => {
            console.log("data: error", error);
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
    // Add your logic to submit the buy order data here
    setFormData({
      isBuy: true, // Reset buy order selection after submission
      asset: "",
      amount: "",
      price: "",
      paymentToken: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center container mx-auto px-4 sm:px-6 lg:px-8 py-12 w-[500px] flex flex-col gap-y-6"
    >
      <h2 className="text-xl font-bold text-[#b24bf3]">Order Type</h2>

      <div className="flex flex-col md:w-full">
        <label htmlFor="asset" className="text-base-content font-medium mb-2">
          Asset:
        </label>
        <input
          type="text"
          id="asset"
          name="asset"
          value={formData.asset}
          onChange={handleChange}
          className="input w-full"
          placeholder="Asset"
        />
      </div>
      <div className="flex flex-col md:w-full">
        <label htmlFor="amount" className="text-base-content font-medium mb-2">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="input w-full"
          placeholder={"Amount"}
        />
      </div>
      <div className="flex flex-col md:w-full">
        <label htmlFor="price" className="text-base-content font-medium mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="input w-full"
          placeholder="Order price"
        />
      </div>
      <div className="flex flex-col md:w-full">
        <label
          htmlFor="paymentToken"
          className="text-base-content font-medium mb-2"
        >
          Payment Token:
        </label>
        <input
          type="text"
          id="paymentToken"
          name="paymentToken"
          value={formData.paymentToken}
          onChange={handleChange}
          className="input w-full"
          placeholder="Enter Payment token"
        />
      </div>
      <div className="flex items-center my-4 gap-x-8">
        <label htmlFor="isBuy" className="self-center flex flex-row gap-x-4 text-base-content font-medium">
          Can Buy:
          <input
            type="radio"
            id="isBuy"
            name="isBuy"
            value={`${true}`}
            checked={formData.isBuy}
            onChange={handleChange}
            className="radio" // Add margin-right
          />
        </label>
        <label htmlFor="isBuy" className="self-center flex flex-row gap-x-4 text-base-content font-medium">
          Can't Buy :
          <input
            type="radio"
            id="isBuy" // You might want to use a unique ID here
            name="isBuy" // Keep the same name to group them
            value={`${false}`}
            checked={formData.isBuy}
            onChange={handleChange}
            className="radio"
          />
        </label>
      </div>

      <div className="">
        {" "}
        {/* Add margin-top: 6 units */}
        <button
          type="submit"
          className="px-6 py-3 rounded-box bg-[#b24bf3] hover:bg-[#7e23b7] text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Create Buy Order
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
