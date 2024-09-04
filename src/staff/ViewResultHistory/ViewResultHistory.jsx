import React from 'react'
import StaffNavBarr from '../StaffNavBarr'
import { useSelector } from 'react-redux';
const ViewResultHistory = () => {
    const user = useSelector((state) => state.login.user);
alert(user?.id)
  return (
      
      <>
      <StaffNavBarr/>
    <div>ViewResultHistory</div>
      </>
  )
}

export default ViewResultHistory