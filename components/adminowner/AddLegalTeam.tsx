import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { abi } from "../../contracts/out/AssetVerification.sol/AssetVerification.json";
import { AssetVerification } from "../../CONSTANTS.json";
interface CreateAssetData {
  address: string;
}

const AddLegalTeam: React.FC = () => {
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
          functionName: "addLegalTeam",
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
      className={``}
    >
      <div
        className="card bg-base-300/40 rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6 mx-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="font-semibold">Add Legal Team</p>
          </div>
          <div className="flex justify-between items-center rounded-xl mt-5">
            <input
              className="input input-md w-full"
              type="text"
              id="address"
              name="address"
              placeholder="Legal Team Address"
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

export default AddLegalTeam;
