import React from 'react'

const Card = ({image,name,status}) => {
  return (
    <>
        <div className="relative">
            <img className='h-80 w-56 roundex-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg' src="#" alt="" />
            <p className='absolute bottom-4 left-4 text-sm font-medium text-white no-underline leading-none'>{name}</p>
            <p className={`${status === "Offline" 
            ? "absolute bottom-4 right-4 text-sm font-medium text-red-600 no-underline leading-none"
            : "absolute bottom-4 right-4 text-sm font-medium text-green-600 no-underline leading-none"}`}>{status}</p>
        </div>
    </>
  )
}

export default Card