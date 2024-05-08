import { useState } from "react";
import { useWriteContract } from "wagmi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { abi } from "../../out/AssetVerification.sol/AssetVerification.json";
import { AssetVerification } from "../../CONSTANTS.json";

import { useGlobalState, setGlobalState } from "../../store";

interface CreateAssetData {
  address: string;
  name: string;
  description: string;
  uri: string;
}

const CreateAsset: React.FC = () => {
  const [createModal] = useGlobalState("createModal");
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const [formData, setFormData] = useState<CreateAssetData>({
    address: "",
    name: "",
    description: "",
    uri: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.address || !formData.name) return;
    console.log("Create Asset:", formData);
    try {
      writeContract(
        {
          abi,
          address: `0x${AssetVerification}`,
          functionName: "createAsset",
          args: [
            formData.address,
            formData.name,
            formData.description,
            formData.uri,
          ],
        },
        {
          onSuccess: (data) => {
            console.log("data: ", data);
            toast.success("Certificate Issued");
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
    setGlobalState("createModal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      address: "",
      name: "",
      description: "",
      uri: "",
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className=" bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold  text-black">
              Certificate of Ownership
            </p>
            <button
              type="button"
              className="border-0 bg- text-black focus:outline-none "
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full bg-transparent border-0 text-sm text-slate-700 focus:outline-none p-2 focus:ring-0"
              type="text"
              id="address"
              name="address"
              placeholder="Owner Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full bg-transparent border-0 text-sm text-slate-700 focus:outline-none p-2 focus:ring-0"
              type="text"
              id="name"
              name="name"
              placeholder="Asset Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              className="block w-full bg-transparent border-0 text-sm text-slate-700 focus:outline-none p-2 focus:ring-0"
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full bg-transparent border-0 text-sm text-slate-700 focus:outline-none p-2 focus:ring-0"
              type="text"
              id="uri"
              name="uri"
              placeholder="Asset URI"
              value={formData.uri}
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

export default CreateAsset;
