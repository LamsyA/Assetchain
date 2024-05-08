import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { abi } from "../../out/AssetVerification.sol/AssetVerification.json";
import { AssetVerification } from "../../CONSTANTS.json";

interface CreateAssetData {
  address: string;
}

const SetFactoryAddress: React.FC = () => {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const [formData, setFormData] = useState<CreateAssetData>({
    address: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.address) return;
    console.log("Create Asset:", formData);
    try {
      writeContract(
        {
          abi,
          address: `0x${AssetVerification}`,
          functionName: "setFactoryContractaddress",
          args: [formData.address],
        },
        {
          onSuccess: (data) => {
            console.log("data: ", data);
            toast.success("Certificate Issued");
            onClose();
          },
          onError: (error) => {
            console.log("error: ", error.stack);
            toast.error(` Failed to issue certificate`);
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
      address: "",
    });
  };

  return (
    <div
      className={`top-0 left-0  h-screen flex
    items-center justify-center  bg-opacity-50
   `}
    >
      <div
        className=" bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="font-semibold uppercase text-black">
              set Factory Address
            </p>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full bg-transparent border-0 text-sm text-slate-700 focus:outline-none p-2 focus:ring-0"
              type="text"
              id="address"
              name="address"
              placeholder="Factory Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="inline-block bg-[#b24bf3] px-6 py-2.5 text-white font-medium  leading-tight text-md rounded-full shadow-md hover:bg-[#8941b6] mt-5"
          >
            Create Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetFactoryAddress;
