import React from 'react'

import StaffNavBarr from '../StaffNavBarr'
import { useSelector } from 'react-redux';

const ViewResult = () => {
    const user = useSelector((state) => state.login.user);
alert(user?.id)
  return (
      <>
      <StaffNavBarr/>
    <div>ViewResult</div>
      </>
  )
}

export default ViewResult