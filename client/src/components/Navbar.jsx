import React from 'react'
import { Link } from 'react-router'
import { MapPinHouse } from 'lucide-react'
import Avatar from './../components/Avatar.jsx'
import Button from './Button'
import { getUserData, logoutUser } from '../utils.jsx'
import { useState, useEffect } from 'react'

function Navbar() {
  const [userData, setUserData] = useState({});

  const fetchData = () => {
    const data = getUserData();
    console.log(data);
    setUserData(data);
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return (
    <>
    <div className='max-w-10/12 bg-amber-500 rounded-full px-10 py-2 mx-auto sticky top-3 flex justify-between items-center'>
      <Link to='/' className='flex items-center'>
        <MapPinHouse className='mx-2'/>
        <h2 className='font-medium md:text-2xl! text-xl!'>CommuteTracker</h2>
        </Link>

        <div className='flex items-center gap-4'>
          <div>
          <Link to="/about" className='mx-2 text-sm md:text-lg'>About</Link>
          <Link to="/contact" className='mx-2 text-sm md:text-lg'>Contact</Link>
        </div> 
   
        {userData?.name ? (
          <Link to="/dashboard" className='flex items-center'>
            <Avatar name={userData.name}/>
          <span className='text-sm md:text-lg mr-2'>Hello, {userData.name}</span>
          <Button title={"Logout"} size='small'  onClick={logoutUser}/>
        </Link>
        ) : (
          <Link to="/login" className='bg-white text-red-600 px-2 py-1 rounded'>Login</Link>
        )}
      </div>
      </div>
    </>
  )
}

export default Navbar
