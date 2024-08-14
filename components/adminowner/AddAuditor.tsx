import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { abi } from "../../contracts/out/AssetVerification.sol/AssetVerification.json";
import { AssetVerification } from "../../CONSTANTS.json";

interface CreateAssetData {
  address: string;
}

const AddAuditorTeam: React.FC = () => {
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
          functionName: "addAuditorTeam",
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
      className={`h-screen flex
    items-start justify-center  bg-opacity-50
   `}
    >
      <div
        className="card bg-base-300/30 rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="card-title font-semibold">
              Add Auditor Team
            </p>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="input w-full"
              type="text"
              id="address"
              name="address"
              placeholder="Auditor Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn inline-block bg-[#b24bf3] px-6 py-2.5 text-white font-medium leading-tight text-md rounded-lg shadow-md hover:bg-[#8941b6] disabled:bg-[#8941b666] mt-5"
            disabled={!formData.address}
          >
            Create Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAuditorTeam;
