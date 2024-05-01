import React, { useState } from "react";
import IssueCertificateForm from "./IssueCertificate";
import Homepage from "../Homepage";
import Link from "next/link";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("issue");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Issuer Panel</h2>
          <ul className="mt-6">
            <li className="cursor-pointer py-2 px-4 bg-gray-700">
              <Link href="/">Home</Link>
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeTab === "issue" && "bg-gray-700"
              }`}
              onClick={() => handleTabChange("issue")}
            >
              Issue Certificate
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Certificate of Ownership
        </h1>
        {activeTab === "issue" && <IssueCertificateForm />}
      </div>
    </div>
  );
};

export default Admin;
