import React from 'react'
import NavLink from './NavLink'
import UserLink from './UserLink'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>  <Link to="/">
            <div className="w-full flex justify-between items-center border-4 border-gray-200 px-44 py-2">
                
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    <span className='text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400'>Social Media App</span>
                </div>

                <div className='flex justify-between items-center mx-auto'>
                    <NavLink/>
                </div>

                <div>
                    <UserLink/>
                </div>
                
            </div>
        </Link>
    </>
  )
}

export default Navbar