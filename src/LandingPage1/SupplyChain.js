import React from "react";

const SupplyChain = () => {
  return (
    <div className="supply-chain flex justify-center items-center space-x-4 p-8">
      <div className="step">SUPPLIERS</div>
      <div className="arrow">→</div>
      <div className="step">FACTORY</div>
      <div className="arrow">→</div>
      <div className="step">WAREHOUSE</div>
      <div className="arrow">→</div>
      <div className="step">RETAIL STORE</div>
    </div>
  );
};

export default SupplyChain;
