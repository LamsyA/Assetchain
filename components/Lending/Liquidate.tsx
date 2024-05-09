// Liquidate.tsx
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { Lending } from "../../CONSTANTS.json";
import { abi } from "../../contracts/out/Lending.sol/LendingContract.json";

interface LiquidateProps {
    debtId: string;
  }
  
  const Liquidate: React.FC<LiquidateProps> = ({ debtId }) => {
    const { data: hash, isPending, error, writeContract } = useWriteContract();

    const handleLiquidate = async () => {
      console.log("Liquidating debt:", debtId);
      // Replace with your actual liquidation logic here (e.g., call contract functions)
      try {
        writeContract(
          {
            abi,
            address: `0x${Lending}`,
            functionName: "liquidate",
            args: [debtId],
          },
          {
            onSuccess: (data) => {
              console.log("data: ", data);
              toast.success(`Your transaction was processed successfully here is your tx.hash: ${data}`);
            },
            onError: (error) => {
              console.log("error: ", error.stack);
              toast.error(` Failed to process transaction: ${error.stack}`);
            },
          }
        );
      } catch (error) {
        console.error("Error creating asset:", error);
        toast.error("Failed to create asset");
      }
    };
  
    return (
      <div className="bg-white p-4 rounded shadow-md">
        <p>Liquidate Debt ID: {debtId}</p>
        <button
          type="button" // Use type="button" to prevent form submission
          className="py-2 px-4 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium focus:outline-none w-full sm:w-auto" // Responsive button
          onClick={handleLiquidate}
        >
          Liquidate Debt
        </button>
      </div>
    );
  };
  
  export default Liquidate;
  