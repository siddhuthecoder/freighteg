import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Dashboard/Header';
import ContractedLane from'../src/pages/ContractedLane' ;
import Bid from './pages/Bid';
import HeaderToolbar from './components/Dashboard/HeaderToolbar';
import TabSection from './components/Dashboard/TabSection';
import TableHeader from './components/Dashboard/TableHeader';
import ContractCard from './components/Dashboard/ContractedLane';
import Vendor from './pages/Vendor';
import Staff from './pages/Staff';
import Branch from './pages/Branch';
import Pod from './pages/Pod';
import Fastag from './pages/Fastag-tracking';
import Vahan from './pages/Vahan';
import Saarthi from './pages/Saarthi';
import Wallet from './pages/Wallet';
import Result from './pages/Result';
import History from './pages/History';
import Counter from './pages/Counter';
import Cancelled from './pages/Cancelled';

function App() {
  return (
    <Router>
      <div>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Bid />} />
            <Route path="/bids" element={<Bid />} />
            <Route path="/contracted-lane" element={<ContractedLane />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/pod" element={<Pod />} />
            <Route path="/fastag-tracking" element={<Fastag/>} />
            <Route path="/vahan" element={<Vahan/>} />
            <Route path="/sarthi" element={<Saarthi/>} />
            <Route path="/wallet" element={<Wallet/>} />
            <Route path="/result" element={<Result/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/counter" element={<Counter/>} />
            <Route path="/cancelled" element={<Cancelled/>} />






          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

