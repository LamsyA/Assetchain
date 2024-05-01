import React, { useState } from "react";

interface FormData {
  name: string;
  symbol: string;
  description: string;
  uri: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    symbol: "",
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
    console.log("Form Submitted:", formData);
    // You can add logic here to handle form submission, such as sending data to an API
    setFormData({ name: "", symbol: "", description: "", uri: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <label htmlFor="name" className="text-gray-700 font-medium mb-2">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <br />

      <label htmlFor="symbol" className="text-gray-700 font-medium mb-2">
        Symbol:
      </label>
      <input
        type="text"
        id="symbol"
        name="symbol"
        value={formData.symbol}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <br />

      <label htmlFor="description" className="text-gray-700 font-medium mb-2">
        Description:
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-20 resize-none"
      />
      <br />

      <label htmlFor="uri" className="text-gray-700 font-medium mb-2">
        URI:
      </label>
      <input
        type="text"
        id="uri"
        name="uri"
        value={formData.uri}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <br />

      <button
        type="submit"
        className="bg-emerald-500 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
