// PayDebtForm.tsx
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { Lending } from "../../CONSTANTS.json";
import { abi } from "../../contracts/out/Lending.sol/LendingContract.json";
interface PayDebtData {
    debtID: string;
  }
  
  const PayDebtForm: React.FC = () => {
    const { data: hash, isPending, error, writeContract } = useWriteContract();

    const [formData, setFormData] = useState<PayDebtData>({
      debtID: "",
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            functionName: "paydebt",
            args: [formData.debtID],
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
      // Handle form submission logic here (e.g., send data to server)
    };const onClose = () => {
        resetForm();
      };
    
      const resetForm = () => {
        setFormData({
          debtID: "",
        });
      };
      
  
    return (
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <label htmlFor="debtID" className="block text-sm font-medium text-gray-700">
          Debt ID:
        </label>
        <input
          type="text"
          id="debtID"
          name="debtID"
          value={formData.debtID}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <br />
  
        <button type="submit" className="py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium focus:outline-none">
          Pay Debt
        </button>
      </form>
    );
  };
  
  export default PayDebtForm;
  