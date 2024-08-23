import React,{useState} from 'react'
import Header from './repeats/Header'
import DataTable from './repeats/DataTable';

const BidLayout = () => {
    const  [dataHandling,setDataHandling] = useState({})
    const handleFormSubmit = (formData) => {
        console.log(formData); 
        setDataHandling(formData)
      };
  return (
    <>
      <Header onSubmit={handleFormSubmit} />
      <DataTable />
      
    </>
  )
}

export default BidLayout
