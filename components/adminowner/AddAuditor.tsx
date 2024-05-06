import { useState } from "react";

interface UpdateCertificateData {
  addressTo: string;
  tokenId: number;
  address: string;
}

const AddAuditorForm: React.FC = () => {
  const [formData, setFormData] = useState<UpdateCertificateData>({
    addressTo: "",
    tokenId: 0,
    address: "",
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
    console.log("Update Certificate:", formData);
    // You can add logic here to handle form submission, such as sending data to an API
    setFormData({ addressTo: "", tokenId: 0, address: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800">Update Certificate</h2>
      <label htmlFor="addressTo" className="text-gray-700 font-medium mb-2">
        Transfer To Address:
      </label>
      <input
        type="text"
        id="addressTo"
        name="addressTo"
        value={formData.addressTo}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <br />

      <label htmlFor="tokenId" className="text-gray-700 font-medium mb-2">
        Token ID:
      </label>
      <input
        type="number"
        id="tokenId"
        name="tokenId"
        value={formData.tokenId}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <br />

      <label htmlFor="address" className="text-gray-700 font-medium mb-2">
        Current Address:
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <br />

      <button
        type="submit"
        className="bg-orange-500 text-white font-medium py-2 px-4 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Update
      </button>
    </form>
  );
};

export default AddAuditorForm;
