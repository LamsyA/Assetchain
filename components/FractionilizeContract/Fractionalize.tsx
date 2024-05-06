import React, { useState, FormEvent } from "react";
import { useWriteContract } from "wagmi";
import { abi } from "../../out/FractionalizerFactory.sol/FractionalizerFactory.json";
import { ASSET_FACTORY } from "../../CONSTANTS.json";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { watchContractEvent } from '@wagmi/core'
import { config } from "../../config";

import {
  useGlobalState,
  setGlobalState,
} from "../../store";
import { ethers } from "ethers";


interface FractionalizeData {
  tokenId: string;
  assetManager: string;
  assetName: string;
  assetSymbol: string;
  assetPrice: string;
  paymentToken: string;
  description: string;
  uri: string;
}

const FractionalizeForm: React.FC = () => {
  let FractionalizerAddress: any;
  const { data: hash, isPending,isSuccess,  error, writeContract } = useWriteContract();
  const [fraction] = useGlobalState("fraction");

  const [formData, setFormData] = useState<FractionalizeData>({
    tokenId: "",
    assetManager: "",
    assetName: "",
    assetSymbol: "",
    assetPrice: "",
    paymentToken: "",
    description: "",
    uri: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     console.log("Fractionalize:", formData);
   
    try {
      writeContract(
        {
          abi,
          address: `0x${ASSET_FACTORY}`,
          functionName: "fractionalize",
          args: [
            formData.tokenId,
            formData.assetManager,
            formData.assetName,
            formData.assetSymbol,
            formData.assetPrice,
            formData.paymentToken,
            formData.description,
            formData.uri,
          ],
        }, {
          onSuccess: async(data:any) => {
            console.log("data: ", data);
            const contractAddress = data?.to; 
            console.log("contractAddress: ", contractAddress);
            toast.success(`Your Asset transaction hash: ${data}`); 
            onClose();
    //          setFormData({
    //   tokenId: "",
    //   assetManager: "",
    //   assetName: "",
    //   assetSymbol: "",
    //   assetPrice: "",
    //   paymentToken: "",
    //   description: "",
    //   uri: "",
    // });
          },
          onError: (error) => {
            console.log("error: ", error);
            toast.error(` Failed to fractionalize asset`);
          },
        },
      );
      
      
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rpc.scroll.io/");
        const contract = new ethers.Contract(`0x${ASSET_FACTORY}`, abi, provider)
        const eventFilter = contract.filters.FractionalizerCreated(); 
         // Event listener
         
           contract.on(eventFilter, (fractionalizer, tokenId, event) => {
            FractionalizerAddress = fractionalizer;
            console.log("FractionalizerCreated event emitted:");
            console.log("Your Asset Contract Address: ", fractionalizer);
            console.log("Token ID:", tokenId.toString());
            // console.log("Event:", event);
          });
      
      // toast.promise(newFractionalizerPromise, {
      //   pending: "Fractionalizing...",
      //   success: `Contract Address: ${FractionalizerAddress}`,
      //   error: "Fractionalization failed",
      // })


    } catch (error) {
      console.log("error: ", error);
    }
    // setFormData({
    //   tokenId: "",
    //   assetManager: "",
    //   assetName: "",
    //   assetSymbol: "",
    //   assetPrice: "",
    //   paymentToken: "",
    //   description: "",
    //   uri: "",
    // });
  };
  const onClose = () => {
    setGlobalState("fraction", "scale-0");
    resetParam();
  };
  const resetParam = () => {
    setFormData({
      tokenId: "",
      assetManager: "",
      assetName: "",
      assetSymbol: "",
      assetPrice: "",
      paymentToken: "",
      description: "",
      uri: "",
    });
  };

   
  
 
  return (
   
    <div
      className={`fixed top-10 left-0 bottom-2 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${fraction}`}
    >
      <div
        className=" bg-white shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-5"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold  text-black">
              {" "}
              Fractionalize Asset
            </p>

            <button
              type="button"
              className="border-0 bg- text-black focus:outline-none "
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-1">
            
            <div className="rounded-xl overflow-hidden h-20 w-20 animate-pulse">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxgAU-BU1Lj7me8cXrw0pTRQxCL75tnMd40vTqvt_hA&s"
                }
                alt="project title"
                className=" h-full w-full cursor-pointer object-cover    "
              />
            </div>
          </div>
          {/* <h2 className="text-black:text-sm ">{ "FractionalizerAddress:"} { newFractionalizer?.toString()}</h2> */}

          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-1.5 
                 focus:ring-0"
              type="text"
              id="tokenId"
              name="tokenId"
              placeholder="Asset Token ID "
              value={formData.tokenId}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-1.5 
                 focus:ring-0"
              type="text"
              id="assetManager"
              name="assetManager"
              placeholder="Asset Manager Address "
              value={formData.assetManager}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-1.5 
                 focus:ring-0"
              type="text"
              id="assetName"
              name="assetName"
              placeholder="Asset Name"
              value={formData.assetName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center">

          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5 mr-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700 focus:outline-none p-1.5 
                 focus:ring-0"
              type="text"
              id="assetSymbol"
              name="assetSymbol"
              placeholder="Asset Symbol"
              value={formData.assetSymbol}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700focus:outline-none p-1.5
                 focus:ring-0"
              type="text"
              id="assetPrice"
              name="assetPrice"
              placeholder="Asset Price"
              value={formData.assetPrice}
              onChange={handleChange}
              required
            />
          </div>
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700focus:outline-none p-1.5
                 focus:ring-0"
              type="text"
              id="uri"
              name="uri"
              placeholder="Asset URI"
              value={formData.uri}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent border-0
                 text-sm text-slate-700focus:outline-none p-1.5 
                 focus:ring-0"
              type="text"
              id="paymentToken"
              name="paymentToken"
              placeholder="Payment Token Address"
              value={formData.paymentToken}
              onChange={handleChange}
              required
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
            className="inline-block bg-yellow-600 px-6 py-2.5 text-white
            font-medium  leading-tight text-md rounded-full 
            shadow-md hover:bg-yellow-700 mt-5"
          >
            Fractionise Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default FractionalizeForm;
