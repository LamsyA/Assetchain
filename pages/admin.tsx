import React, { useState } from "react";

import Link from "next/link";
// import CreateAsset from "../components/adminowner/CreateAssetModal";
// import CreateAssetForm from "../components/adminowner/CreateAssetModal";
import AddLegalTeamForm from "../components/adminowner/AddLegalTeam";
import AddAuditorForm from "../components/adminowner/AddAuditor";
import CreateAsset from "../components/adminowner/CreateAsset";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("issue");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-[#b24bf3] min-h-screen flex">
      <div className="w-64 bg-base-200/30">
        <div className="p-6 ">
          {/* <h2 className="text-2xl text-center py-2 px-4 rounded-sm font-bold text-white bg-[#b24bf3]">
            Issuer Panel
          </h2> */}
          <ul className="menu menu-lg gap-y-4 rounded-box w-56">
            <li><Link href="" onClick={() => handleTabChange("asset")}>Create Asset</Link></li>
            <li><Link href="" onClick={() => handleTabChange("legalTeam")}>Add Legal Team</Link></li>
            <li><Link href="" onClick={() => handleTabChange("auditor")}>Add Auditor</Link></li>
          </ul>
          {/* <ul className="mt-6 text-center justify-center uppercase">
            <li className="cursor-pointer py-2 px-4 rounded-lg justify-center hover:bg-gray-700">
              <Link href="/">Home</Link>
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${activeTab === "issue" &&
                "bg-[#b24bf3] text-white rounded-lg shadow-sm shadow-orange-50"
                }`}
              onClick={() => handleTabChange("issue")}
            >
              Create Asset
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${activeTab === "legalTeam" &&
                "bg-[#b24bf3] text-white rounded-lg shadow-sm shadow-orange-50"
                }`}
              onClick={() => handleTabChange("legalTeam")}
            >
              Add Legal Team
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${activeTab === "auditor" &&
                "bg-[#b24bf3] text-white rounded-lg shadow-sm shadow-orange-50"
                }`}
              onClick={() => handleTabChange("auditor")}
            >
              Add Auditor
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${activeTab === "asset" &&
                "bg-[#b24bf3] text-white rounded-lg shadow-sm shadow-orange-50"
                }`}
              onClick={() => handleTabChange("asset")}
            >
              Create Asset
            </li>
          </ul> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-slate ">
        {/* <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase ">
          admin page
        </h1> */}
        {activeTab === "issue" && <CreateAsset />}
        {activeTab === "legalTeam" && <AddLegalTeamForm />}
        {activeTab === "auditor" && <AddAuditorForm />}
        {activeTab === "asset" && <CreateAsset />}
      </div>
    </div>
  );
};

export default Admin;
