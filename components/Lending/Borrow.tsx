// Form.tsx
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { Lending } from "../../CONSTANTS.json";
import { abi } from "../../contracts/out/Lending.sol/LendingContract.json";

interface FormData {
    _fractionalizedToken: string;
    _unitToDeposit: string;
    _loanAmount: string;
    _loanTerm: "0" | "1" | "2" | "3";
  }
  
  const Borrow: React.FC = () => {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

    const [formData, setFormData] = useState<FormData>({
      _fractionalizedToken: "",
      _unitToDeposit: "",
      _loanAmount: "",
      _loanTerm: "0",
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Form data:", formData);
      try {
        writeContract(
          {
            abi,
            address: `0x${Lending}`,
            functionName: "borrow",
            args: [formData._fractionalizedToken, formData._unitToDeposit, formData._loanAmount,formData._loanTerm],
          },
          {
            onSuccess: (data) => {
              console.log("data: ", data);
              toast.success(`Your transaction was processed successfully here is your tx.hash: ${data}`);
              onClose();
            },
            onError: (error) => {
              console.log("error: ", error.stack);
              toast.error(` Failed to process transaction ${error.stack}`);
            },
          }
        );
      } catch (error) {
        console.error("Error creating asset:", error);
        toast.error("Failed to create asset");
      }
    };
    
    const onClose = () => {
      resetForm();
    };
  
    const resetForm = () => {
      setFormData({
        _fractionalizedToken: "",
        _unitToDeposit: "",
        _loanAmount: "",
        _loanTerm: "0",
      });
    };
    
      // Handle form submission logic here (e.g., send data to server)
    return (
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <label htmlFor="_fractionalizedToken" className="block text-sm font-medium text-gray-700">
          Fractionalized Token:
        </label>
        <input
          type="text"
          id="_fractionalizedToken"
          name="_fractionalizedToken"
          value={formData._fractionalizedToken}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <br />
  
        <label htmlFor="_unitToDeposit" className="block text-sm font-medium text-gray-700 mt-4">
          Unit to Deposit:
        </label>
        <input
          type="text"
          id="_unitToDeposit"
          name="_unitToDeposit"
          value={formData._unitToDeposit}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <br />
  
        <label htmlFor="_loanAmount" className="block text-sm font-medium text-gray-700 mt-4">
          Loan Amount:
        </label>
        <input
          type="text"
          id="_loanAmount"
          name="_loanAmount"
          value={formData._loanAmount}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <br />
  
        <label htmlFor="_loanTerm" className="block text-sm font-medium text-gray-700 mt-4">
          Loan Term:
        </label>
        <select
          id="_loanTerm"
          name="_loanTerm"
          value={formData._loanTerm}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="0">Days 14</option>
          <option value="1">Days 30</option>
          <option value="2">Days 60</option>
          <option value="3">Days 180</option>
        </select>
        <br />
  
        <button type="submit" className="py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium focus:outline-none">
          Submit
        </button>
      </form>
    );
  };
  
  export default Borrow;
  