import { useState } from "react";
import { useWriteContract } from "wagmi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { abi } from "../../out/COFO.sol/COFO.json";
import { CofoContractAddress } from "../../CONSTANTS.json";
import { ethers } from "ethers";
import {
  useGlobalState,
  setGlobalState,
} from "../../store";

interface IssueCertificateData {
  address: string;
  tokenId: number;
  name: string;
  symbol: string;
  description: string;
  uri: string;
}

const IssueCertificateForm: React.FC = () => {
  const [createModal] = useGlobalState("createModal");
  const { data: hash, isPending, error, writeContract } = useWriteContract();


  const [formData, setFormData] = useState<IssueCertificateData>({
    address: "",
    tokenId: 0,
    name: "",
    symbol: "",
    description: "",
    uri: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    // Handle number input for tokenId
    const newValue = name === "tokenId" ? parseInt(value) : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.address || !formData.tokenId || !formData.name) return;
    console.log("Issue Certificate:", formData);

    const newhash = ethers.utils.formatBytes32String(
      `${formData.uri}`,
    );

    let MetaData = {
      metadataHash: newhash,
      name: formData.name,
      symbol: formData.symbol,
      description: formData.description,
      uri: formData.uri,
    };

    console.log("address: ", formData.address);
    console.log("metadata: ", MetaData);
    try {
      writeContract(
        {
          abi,
          address: `0x${CofoContractAddress}`,
          functionName: "issueCertificate",
          args: [formData.address, BigInt(formData.tokenId), MetaData],
        },
        {
          onSuccess: (data) => {
            console.log("data: ", data);
            toast.success("Certificate Issued");
          },
          onError: (error) => {
            console.log("error: ", error);
            toast.error(` Failed to issue certificate`);
          }
          
          
        },
      );

      // You can add logic here to handle form submission, such as sending data to an API
      // setFormData({ address: "", tokenId: 0, metadata: "", name : "", symbol:"", description:"", uri:'' });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onClose = () => {
    setGlobalState("createModal", "scale-0");
    resetParam();
  };
  const resetParam = () => {
    setFormData({
      address: "",
      tokenId: 0,
      name: "",
      symbol: "",
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
              {" "}
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
          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxgAU-BU1Lj7me8cXrw0pTRQxCL75tnMd40vTqvt_hA&s"
                }
                alt="project title"
                className=" h-full w-full cursor-pointer object-cover    "
              />
            </div>
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-2 
                 focus:ring-0"
              type="text"
              id="address"
              name="address"
              placeholder="to address "
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-2 
                 focus:ring-0"
              type="text"
              id="uri"
              name="uri"
              placeholder="URI"
              value={formData.uri}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-2 
                 focus:ring-0"
              type="number"
              step={1}
              min={0}
              name="tokenId"
              placeholder="TokenId"
              value={formData.tokenId}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700focus:outline-none p-2 
                 focus:ring-0"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700focus:outline-none p-2 
                 focus:ring-0"
              type="text"
              id="symbol"
              name="symbol"
              placeholder="symbol"
              value={formData.symbol}
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <textarea
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-2 
                 focus:ring-0"
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block bg-blue-600 px-6 py-2.5 text-white
            font-medium  leading-tight text-md rounded-full 
            shadow-md hover:bg-blue-700 mt-5"
          >
            Issue COFO
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueCertificateForm;
