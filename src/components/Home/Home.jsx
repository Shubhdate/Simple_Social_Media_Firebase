import React from 'react'
import Navbar from '../Navbar/Navbar'
import LeftSide from '../Leftsidebar/LeftSide'
import RightSide from '../Rightsidebar/RightSide'
import Main from '../Main/Main'
import CardSection from '../Main/CardSection'

const Home = () => {
  return (
    <>
    <div className="w-full">
      <div className="fixed top-0 w-full bg-white z-10">
        <Navbar/>
      </div>

      <div className="flex bg-gray-100" style={{overflowAnchor:"none"}}>
        <div className='flex-auto w-[20%] fixed top-16'>
          <LeftSide/>
        </div>

        <div className='flex-auto w-[60%] absolute left-[20%] bg-gray-100 rounded-xl top-16 scroll-smooth'>
          <div className="w-[80%] mx-auto">
            <CardSection/>
            <Main/>
          </div>
        </div>

        <div className='flex-auto w-[20%] fixed right-0 top-16'>
          <RightSide/>
        </div>
      </div>
    </div>
        
        
        
    </>
  )
}

export default Home