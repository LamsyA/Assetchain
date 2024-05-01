import { useState } from "react";
import { useWriteContract } from 'wagmi'
import {abi} from "../../out/FractionOrderBook.sol/FractionOrderBook.json";
import {FractionOrderContract} from "../../CONSTANTS.json";
import { toast } from "react-toastify";

const FillOrder = () => {
  const { data: hash, 
    isPending,error, writeContract } = useWriteContract();
  const [tokenId, setTokenId] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Fill Order:", tokenId);
    try{
      writeContract({
        abi, address: `0x${FractionOrderContract}`, functionName:"fillOrder", args:[tokenId]
      },{
        onSuccess: (data)=> {
          toast.success(`Your Asset transaction hash: ${data}`); 

          console.log("data:", data)
        },
        onError: (error)=>{
          console.log("data: error", error)
        } 
        
      })
    }catch(error){

    }
    // Add your logic to submit the fill order data here
    setTokenId(""); // Clear the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex space-x-4 max-w-sm mx-auto px-4 py-4 bg-white rounded-lg shadow-md" // Added styles for responsiveness and visual appeal
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
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full" // Made input field full width
          placeholder="Enter Token ID"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-700 text-white px-8 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700" // Reduced button padding
      >
        Fill Order
      </button>
    </form>
  );
};

export default FillOrder;
