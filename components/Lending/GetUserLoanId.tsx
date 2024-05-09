// UserIdLoanInfo.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import { Lending } from "../../CONSTANTS.json";
import { abi } from "../../contracts/out/Lending.sol/LendingContract.json";
import { readContract } from '@wagmi/core';
import { config } from '../../config'
import GetLoanInfo from "./GetLoanInfo";

const GetUserIdLoanInfo: React.FC = () => {
  const [userAddress, setUserAddress] = useState("");
  const [loanNumbers, setLoanNumbers] = useState<number[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userAddress) {
      console.error("Please enter a user address.");
      return; // Prevent further processing without an address
    }
    try {
      const result = await readContract(config, {
        abi,
        address: `0x${Lending}`,
        functionName: "getUserIdLoans",
        args:[userAddress]
      });
      console.log(result);
      setLoanNumbers(result as [])
      toast.success("Information Processing...");

    } catch (error) {
      console.error("Error fetching orders:", error);
    }

  };

  const handleLoanClick = (loanNumber: number) => {
    console.log("Loan number clicked:", loanNumber);
    <GetLoanInfo num={loanNumber.toString()}/>
    // You can pass the loan number as a prop to another component here
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="userAddress" className="text-sm font-medium">
          User Address:
        </label>
        <input
          type="text"
          id="userAddress"
          name="userAddress"
          value={userAddress}
          onChange={(event) => setUserAddress(event.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button type="submit" className="py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium focus:outline-none">
          Get Loan ID's
        </button>
      </form>
      {loanNumbers.length === 0 ? (
        <p>Enter an address and click "Get Loan ID's".</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {loanNumbers.map((loanNumber) => (
            <button
              key={loanNumber}
              className={`py-2 px-4 rounded-md text-white font-medium focus:outline-none shadow-md ${getRandomColor()}`} // Random color using function
              onClick={() => handleLoanClick(loanNumber)}
            >
              Loan {loanNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function getRandomColor() {
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-purple-500"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default GetUserIdLoanInfo;
