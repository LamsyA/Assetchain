import { useState } from "react";
import { useWriteContract } from "wagmi";
import { abi } from "../../out/FractionOrderBook.sol/FractionOrderBook.json";
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
      className="items-center container mx-auto px-4 sm:px-6 lg:px-8 py-12 w-[500px] flex flex-col"
    >
      <h2 className="text-xl font-bold text-[#b24bf3]">Order Type</h2>

      <div className="flex flex-col md:w-full">
        <label htmlFor="asset" className="text-gray-100 font-medium mb-2">
          Asset:
        </label>
        <input
          type="text"
          id="asset"
          name="asset"
          value={formData.asset}
          onChange={handleChange}
          className="border w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="flex flex-col md:w-full">
        <label htmlFor="amount" className="text-gray-100 font-medium mb-2">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="flex flex-col md:w-full">
        <label htmlFor="price" className="text-gray-100 font-medium mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="flex flex-col md:w-full">
        <label
          htmlFor="paymentToken"
          className="text-gray-100 font-medium mb-2"
        >
          Payment Token:
        </label>
        <input
          type="text"
          id="paymentToken"
          name="paymentToken"
          value={formData.paymentToken}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="isBuy" className="text-gray-100 font-medium mr-4">
          Can Buy:
        </label>
        <input
          type="radio"
          id="isBuy"
          name="isBuy"
          value={`${true}`}
          checked={formData.isBuy}
          onChange={handleChange}
          className="focus:ring-teal-500 focus:ring-offset-2 mr-4" // Add margin-right
        />
        <label htmlFor="isBuy" className="text-gray-100 font-medium mr-2">
          Can't Buy :
        </label>
        <input
          type="radio"
          id="isBuy" // You might want to use a unique ID here
          name="isBuy" // Keep the same name to group them
          value={`${false}`}
          checked={formData.isBuy}
          onChange={handleChange}
          className="focus:ring-teal-500 focus:ring-offset-2"
        />
      </div>

      <div className="mt-6">
        {" "}
        {/* Add margin-top: 6 units */}
        <button
          type="submit"
     

          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b24bf3] to-[#7e23b7] text-white font-bold text-lg hover:bg-gradient-to-r hover:from-[#b34bf367] hover:to-[#e24bf3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Create Buy Order
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
