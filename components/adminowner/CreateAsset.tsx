import { useState } from "react";
import { useWriteContract } from "wagmi";
import { useAccount, useConnect } from "wagmi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { abi } from "../../contracts/out/AssetVerification.sol/AssetVerification.json";
import { AssetVerification } from "../../CONSTANTS.json";

import { useGlobalState, setGlobalState } from "../../store";
import Image from "next/image";
import { create } from "ipfs-http-client";
import { injected } from "wagmi/connectors";
import { pinFileToIPFS } from "../../utils";

interface CreateAssetData {
  address: string;
  name: string;
  description: string;
  uri: string;
}

// Initialize IPFS client
const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });
// { url: "http://127.0.0.1:5002/api/v0" }

const CreateAsset: React.FC = () => {
  const [createModal] = useGlobalState("createModal");
  const [files, setFiles] = useState([]);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const [imageUri, setImageUri] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

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
    console.log("Inside handle submit");
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
            console.error("error: ", error, error.stack);
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

  // const onFileChange = (e) => {
  //   setFiles(Array.from(e.target.files));
  // };

  // const uploadFilesToIPFS = async () => {
  //   const filesArray = files.map((file) => ({
  //     path: file.name,
  //     content: file,
  //   }));

  //   const result = ipfs.addAll(filesArray, { wrapWithDirectory: true });

  //   let lastFile;
  //   for await (const file of result) {
  //     lastFile = file;
  //   }

  //   const cid = lastFile.cid.toString();
  //   const url = `https://ipfs.infura.io/ipfs/${cid}`;
  //   setIpfsUrl(url);
  //   return url;
  // };

  // const handleFilesSubmit = async () => {
  //   if (!isConnected) {
  //     connect({ connector: injected() });
  //   }

  //   const url = await uploadFilesToIPFS();
  //   // await storeIPFSUrl({
  //   //   args: [url],
  //   // });
  //   alert(`IPFS URL stored on-chain: ${url}`);
  // };

  // // THE OTHER IPFS TEST IMPLEMENTATION
  // const [file, setFile] = useState(null);
  // const [urlArr, setUrlArr] = useState([]);

  // const retrieveFile = (e) => {
  //   const data = e.target.files[0];
  //   const reader = new window.FileReader();
  //   reader.readAsArrayBuffer(data);
  //   reader.onloadend = () => {
  //     console.log("Buffer data: ", new Buffer(reader.result));
  //     setFile(new Buffer(reader.result));
  //   };

  //   e.preventDefault();
  // };

  // const handleFileSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const created = await ipfs.add(file);
  //     const url = `https://ipfs.infura.io/ipfs/${created.path}`;
  //     setUrlArr((prev) => [...prev, url]);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleFileUpload = async (e: any) => {
    setFiles(e.target.files as any);
    setImagePreview(window.URL.createObjectURL(e.target.files[0]));
  }

  const handleFileSubmit = async (e: any) => {
    const imgUrl = await pinFileToIPFS(files);
    if (imgUrl) setImageUri(imgUrl);
    console.log("handle File submit imgUrl", imgUrl);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-base-300/90
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="card bg-base-300 shadow-xl shadow-black rounded-xl
    w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="card-title font-semibold text-3xl text-base-content">
              Certificate of Ownership
            </p>
            <button
              type="button"
              className="border-0 text-base-content focus:outline-none "
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col gap-y-4 self-center pt-8">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <label htmlFor="id-asset-upload">
                  <Image width={320} height={320} src={imagePreview} alt="Asset selector" />
                </label>
                <input hidden id="id-asset-upload" type="file" name="data" onChange={handleFileUpload} multiple />
              </div>
            </div>
            {/* <input type="file" multiple onChange={onFileChange} />
              <button onClick={handleFilesSubmit}>Upload and Send On-Chain</button> */}

            <button type="button" className="btn" onClick={handleFileSubmit} disabled={!imagePreview}>
              Upload file
            </button>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="input w-full"
              type="text"
              id="address"
              name="address"
              placeholder="Owner Address"
              defaultValue={address}
              value={formData.address}
              onChange={handleChange}
              disabled={!imageUri}
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="input w-full"
              type="text"
              id="name"
              name="name"
              placeholder="Asset Name"
              value={formData.name}
              onChange={handleChange}
              disabled={!imageUri}
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              className="textarea w-full"
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              disabled={!imageUri}
            ></textarea>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="input input-disabled w-full"
              type="text"
              id="uri"
              name="uri"
              placeholder="Asset URI"
              value={imageUri}
              onChange={handleChange}
              readOnly
            />
          </div>
          <button
            type="submit"
            className="btn inline-block bg-[#b24bf3] px-6 py-4 text-white font-medium leading-tight text-md rounded-box shadow-md hover:bg-[#8941b6] disabled:bg-[#8941b666] mt-5"
            disabled={!imageUri}
          >
            Create Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAsset;
