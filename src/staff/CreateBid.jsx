import React from 'react'
import StaffNavBarr from './StaffNavBarr'
import { useSelector } from 'react-redux';

const CreateBid = () => {
const user = useSelector((state) => state.login.user);
alert(user?.id)
  return (
      <>
      <StaffNavBarr/>
    <div>CreateBid</div>
      </>
  )
}

export default CreateBid