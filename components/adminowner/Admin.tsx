import React, { useState } from "react";
import IssueCertificateForm from "./IssueCertificate";
import AddLegalTeamForm from "./AddLegalTeam";
import AddAuditorForm from "./AddAuditor";
import CreateAssetForm from "./CreateAsset";
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
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeTab === "legalTeam" && "bg-gray-700"
              }`}
              onClick={() => handleTabChange("legalTeam")}
            >
              Add Legal Team
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeTab === "auditor" && "bg-gray-700"
              }`}
              onClick={() => handleTabChange("auditor")}
            >
              Add Auditor
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeTab === "asset" && "bg-gray-700"
              }`}
              onClick={() => handleTabChange("asset")}
            >
              Create Asset
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
        {activeTab === "legalTeam" && <AddLegalTeamForm />}
        {activeTab === "auditor" && <AddAuditorForm />}
        {activeTab === "asset" && <CreateAssetForm />}
      </div>
    </div>
  );
};

export default Admin;
