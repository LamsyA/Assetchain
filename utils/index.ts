import axios from "axios";
import { toast } from "react-toastify";

export const pinFileToIPFS = async (files: any) => {
    try {
        let data = new FormData();
        data.append("file", files[0]);
        data.append("pinataOptions", '{"cidVersion": 0}');
        data.append("pinataMetadata", '{"name": "assetchain"}');
        toast.info("Uploading event image to IPFS .....");
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
                },
            }
        );
        console.log("res Data", res.data);
        console.log(
            `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
        );
        toast.success("Event Image upload complete");
        return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
        console.log(error);
    }
};