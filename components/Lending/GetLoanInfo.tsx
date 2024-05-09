// LoanInfo.tsx
import { useState, useEffect } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { toast } from "react-toastify";
import { Lending } from "../../CONSTANTS.json";
import { abi } from "../../contracts/out/Lending.sol/LendingContract.json";
import { readContract } from '@wagmi/core';
import { config } from '../../config'
interface LoanData {
    borrower: string;
    amount: number;
    dueDate: number; // Unix timestamp
    unit: string;
    fractionalizedToken: string;
  }

  interface LoanProps {
    num: string;
  }
  
  const GetLoanInfo: React.FC<LoanProps> = ({ num }) => {
    const [loanData, setLoanData] = useState<LoanData | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const result = await readContract(config, {
              abi,
              address: `0x${Lending}`,
              functionName: "getLoanInfo",                       args:[num]
            });
            console.log(result);
            setLoanData(result as any)
            toast.success("Information Processing...");

          } catch (error) {
            console.error("Error fetching orders:", error);
          }
      };
  
      fetchData();
    }, [num]);
  
    if (!loanData) {
      return <p>Loading loan information...</p>;
    }
  
    const { borrower, amount, dueDate, unit, fractionalizedToken } = loanData;
  
    const formattedDueDate = new Date(dueDate * 1000).toLocaleDateString("en-US"); // Convert Unix timestamp to human-readable date
  
    return (
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded shadow-md overflow-x-auto"> // Gradient background and overflow for table
        <table className="table-auto w-full min-w-max">
          <thead>
            <tr>
              <th
                className="px-4 py-2 text-left text-sm font-medium text-white bg-gray-800 border-b border-gray-700"
              >
                Field
              </th>
              <th
                className="px-4 py-2 text-right text-sm font-medium text-white bg-gray-800 border-b border-gray-700"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b border-gray-700">Borrower</td>
              <td className="px-4 py-2 text-right border-b border-gray-700">{borrower}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-700">Amount</td>
              <td className="px-4 py-2 text-right border-b border-gray-700">{amount}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-700">Due Date</td>
              <td className="px-4 py-2 text-right border-b border-gray-700">{formattedDueDate}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-700">Unit</td>
              <td className="px-4 py-2 text-right border-b border-gray-700">{unit}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-700">Fractionalized Token</td>
              <td className="px-4 py-2 text-right border-b border-gray-700">{fractionalizedToken}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default GetLoanInfo;
  