import { useState } from "react";
import { useWriteContract } from 'wagmi'
// import {abi} from "../../out/FractionOrderBook.sol/FractionOrderBook.json";
import { abi } from "../../contracts/out/OrderBook.sol/OrderBook.json";
import { FractionOrderContract } from "../../CONSTANTS.json";

const TerminateOrder = () => {
  const { data: hash,
    isPending, error, writeContract } = useWriteContract();

  const [orderId, setOrderId] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Terminate Order:", orderId);
    // Add your logic to submit the terminate order data here
    try {
      writeContract({
        abi, address: `0x${FractionOrderContract}`, functionName: "terminateOrder", args: [orderId]
      }, {
        onSuccess: (data) => {
          console.log("data:", data)
        },
        onError: (error) => {
          console.log("data: error", error)
        }

      })
    } catch (error) {

    }
    setOrderId(""); // Clear the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mx-auto px-4 py-4 bg-base-300 rounded-lg shadow-md"
    >
      <div className="w-full">
        <label
          htmlFor="orderId"
          className="text-gray-700 font-medium mb-2 block"
        >
          Order ID:
        </label>
        <input
          type="number"
          id="orderId"
          name="orderId"
          value={orderId}
          onChange={handleChange}
          className="input input-error w-full"
          placeholder="Enter Order ID"
        />
      </div>
      <button
        type="submit"
        className="btn btn-error w-full max-w-md" // Red button
      >
        Terminate Order
      </button>
    </form>
  );
};

export default TerminateOrder;
