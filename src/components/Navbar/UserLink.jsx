import React, { useContext} from 'react'
import { Tooltip } from '@material-tailwind/react'
import { Avatar } from '@material-tailwind/react'
import avatar1 from './logo512.png'

import { AuthContext } from '../AppContext/AppContext';


const UserLink = () => {


    //importing AppContext to signwithgoogle 
    const {signOutUser,user,userData} = useContext(AuthContext)


  return (
    <>
    <div className="flex justify-center items-center cursor-pointer">
        {/* <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">Profile</div>
        <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">Notifications</div>
        <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500 mr-1">Settings</div> */}
        <div className='flex items-center' onClick={signOutUser}>
          
          <p className=' text-sm text-black font-medium no-underline mr-4'>
            {
              user?.displayName === null && userData?.name !== undefined 
              ? userData?.name?.charAt(0)?.toUpperCase() + userData?.name?.slice(1) 
              : user?.displayName
            }
          </p>

          <Tooltip content="Sign Out" placement="bottom" >
            <Avatar src={user?.photoURL || avatar1} size='sm'></Avatar>
          </Tooltip>

          <p className=" text-sm text-black font-medium no-underline ml-4">{user?.email || userData?.email}</p>
        </div>
    </div>
    </>
  )
}

export default UserLink