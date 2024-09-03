import React from 'react'
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
const AssignedStaff = () => {
    const user = useSelector((state) => state.login.user);
    alert(JSON.stringify(user))
  return (
    <>
    <TransportNavBar/>
    <div>AssignedStaff</div>
    </>  
  )
}

export default AssignedStaff