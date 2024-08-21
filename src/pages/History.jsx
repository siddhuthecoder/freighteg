import React from 'react';
import Header from '../components/Dashboard/Header';
import HeaderToolbar from '../components/Dashboard/HeaderToolbar';
import TabSection from '../components/Dashboard/TabSection';
import ContractCard from '../components/Dashboard/ContractedLane';
import TableHeader from '../components/Dashboard/TableHeader';

const History = () => {
  
  const contractCardCount = 4;

  return (
    <div className='absolute top-0 left-0 w-full h-full m-0 p-0 bg-white'>
      <Header />
      <HeaderToolbar />
      <TabSection contractCardCount={contractCardCount} />
      <TableHeader />
      {Array.from({ length: contractCardCount }).map((_, index) => (
        <ContractCard key={index} />
      ))}
    </div>
  );
};

export default History;
