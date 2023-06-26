import React from 'react'
import Home from '../Home/Home'
import {Routes,Route} from "react-router-dom"
import Login from '../Home/Login'
import Register from '../Home/Register'
import ResetPassword from '../Home/ResetPassword'
import FriendProfile from '../Home/FriendProfile'

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/profile/:id" element={<FriendProfile/>}/>
      </Routes>
        
    </>
  )
}

export default Pages