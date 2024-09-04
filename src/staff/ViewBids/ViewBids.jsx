import React from 'react'
import StaffNavBarr from '../StaffNavBarr'
import { useSelector } from 'react-redux';
const ViewBids = () => {
    const user = useSelector((state) => state.login.user);
alert(user?.id)
  return (
      <>
      <StaffNavBarr/>
    <div>ViewBids</div>
      </>
  )
}

export default ViewBids