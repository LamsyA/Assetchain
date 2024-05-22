import React from "react";
import PayDebtForm from "../components/Lending/PayDebt";
import Borrow from "../components/Lending/Borrow";
import GetUserLoanId from "../components/Lending/GetUserLoanId";

const AdminLend: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <header className="bg-opacity-75 py-4 px-6 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lending Protocol</h1>
      </header>
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Borrow />
        <GetUserLoanId />
        <PayDebtForm />
      </main>
    </div>
  );
};

export default AdminLend;
