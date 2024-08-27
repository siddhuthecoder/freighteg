import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';

const Profile = () => {
    
 const user = useSelector((state) => state.login.user);
  const userId=user?.id;
  alert(userId)
  return (
      <>
      <Navbar/>
    <div>Profile</div>
    </>
  )
}

export default Profile