import React, { useContext, useEffect, useRef, useState } from 'react'
import { Tooltip } from '@material-tailwind/react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assest/logo512.png'
import nature from '../../assest/logo512.png'

import { AuthContext } from '../AppContext/AppContext';

const LeftSide = () => {

    const {user,userData} = useContext(AuthContext)

    //creating random ads features

    const [data,setData] = useState([])
    const count = useRef(0)


    const handleRandom = (arr) => {
        setData(arr[Math.floor(Math.random() * arr.length)])
    }

    useEffect(() => {
        const imageList = [
            {
                id:"1",
                imageurl:"Laptop",
            },
            {
                id:"2",
                imageurl:"Mobile",
            },
            {
                id:"3",
                imageurl:"Earbuds",
            },{
                id:"4",
                imageurl:"TV",
            },
            {
                id:"5",
                imageurl:"Tablet",
            },
        ]

        handleRandom(imageList)
        let countads = 0
        let startads = setInterval(() => {
            countads++;
            handleRandom(imageList)
            count.current = countads

            if(countads === 5){
                clearInterval(startads)
            }
        },2000)

        return () => {
            clearInterval(startads)
        }
    },[])

    const progressbar = () => {
        switch(count.current){
            case 1: 
                return 15;
            case 2: 
                return 30;
            case 3: 
                return 45;
            case 4: 
                return 60;
            case 5: 
                return 75;
            default: 
                return 0;
        }
    }

  return (
    <>
        <div className="flex flex-col h-screen p-4 bg-white border-4 rounded-r-x1 shadow-lg">
            <div className='flex flex-col items-center relative'>
                <img className='h-28 w-full rounded-r-xl' src={user?.photoURL || avatar} alt="" />
                <div className="absolute -bottom-4">
                    <Tooltip content="SProfile" placement="top">
                        <Avatar src={user?.photoURL || avatar} size='md'></Avatar>
                    </Tooltip>
                </div>
            </div>

            <div className='flex flex-col items-center pt-6'>
                <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                    Email : {user?.email || userData?.email}
                </p>
            </div>

            {/* <div className="flex flex-col items-center">
                <div className="flex items-center">
                    <img className='h-10' src={nature} alt="job pic" />
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Job:
                    </p>
                </div>
                
                <div className="flex items-center">
                    <img className='h-10' src={nature} alt="job pic" />
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Location:
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Event:
                    </p>
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Groups:
                    </p>
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Follow:
                    </p>
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Product:
                    </p>
                </div>
            </div> */}

            {/* <div className="ml-2">
                <div className="flex items-center justify-center">
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Social Profiles
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Social Network Facebook:
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                        Social Network Twitter:
                    </p>
                </div>
            </div> */}


            {/* <div className="flex flex-col justify-center items-center">
                <p className='font-medium text-md no-underline tracking-normal leading-none text-gray-700 py-2'>
                    Random Ads:
                </p>
            </div>

            
            <div style={{width:`${progressbar()}%`}} className="bg-blue-600 roundex-r-xl h-1 mb-4">
                <img className='h-36 roundex-lg' src={data.imageurl} alt={data.imageurl} />
            </div> */}
            
        </div>
    </>
  )
}

export default LeftSide