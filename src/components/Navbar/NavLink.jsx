// import React, { useContext } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
// import { AuthContext } from '../AppContext/AppContext'

const NavLink = () => {

  // const {user,userData} = useContext(AuthContext)

  return (
    <>
        <div className="flex justify-center items-center cursor-pointer">
            <Link to="/">
              <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">Home</div>
            </Link>
            
            {/* <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">{user?.email || userData?.email}</div> */}
            {/*<div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">Cube</div>
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">Trophy</div> */}
        </div>
    </>
  )
}

export default NavLink