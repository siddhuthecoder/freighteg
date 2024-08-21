import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Dashboard/Header'
import HeaderToolbar from '../components/Dashboard/HeaderToolbar'
import TabSection from '../components/Dashboard/TabSection'
import ContractCard from '../components/Dashboard/ContractedLane'
import Result from './Result';
import TableHeader from '../components/Dashboard/TableHeader';

const Bid = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full m-0 p-0 bg-white">
        <Header/>
        <HeaderToolbar/>
        {/* <TabSection/> */}
        {/* <TableHeader/> */}
        {/* <ContractCard/> */}
        {/* <ContractCard/> */}
        {/* <ContractCard/> */}
    </div>
  )
}

export default Bid