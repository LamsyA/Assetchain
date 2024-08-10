import { useState } from "react";
import { useWriteContract } from 'wagmi'
// import {abi} from "../../out/FractionOrderBook.sol/FractionOrderBook.json";
import { abi } from "../../contracts/out/OrderBook.sol/OrderBook.json";
import { FractionOrderContract } from "../../CONSTANTS.json";
import { toast } from "react-toastify";

const FillOrder = () => {
  const { data: hash,
    isPending, error, writeContract } = useWriteContract();
  const [tokenId, setTokenId] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Fill Order:", tokenId);
    try {
      writeContract({
        abi, address: `0x${FractionOrderContract}`, functionName: "fillOrder", args: [tokenId]
      }, {
        onSuccess: (data) => {
          toast.success(`Your Asset transaction hash: ${data}`);

          console.log("data:", data)
        },
        onError: (error) => {
          console.log("data: error", error)
        }

      })
    } catch (error) {

    }
    // Add your logic to submit the fill order data here
    setTokenId(""); // Clear the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mx-auto px-4 py-4 bg-base-300 rounded-lg shadow-md" // Added styles for responsiveness and visual appeal
    >
      <div className="w-full">
        <label
          htmlFor="tokenId"
          className="text-gray-700 font-medium mb-2 block"
        >
          Token ID:
        </label>
        <input
          type="number"
          id="tokenId"
          name="tokenId"
          value={tokenId}
          onChange={handleChange}
          className="input input-success w-full" // Made input field full width
          placeholder="Enter Token ID"
        />
      </div>
      <button
        type="submit"
        className="btn btn-success self-end w-full max-w-md" // Reduced button padding
      >
        Fill Order
      </button>
    </form>
  );
};

export default FillOrder;
