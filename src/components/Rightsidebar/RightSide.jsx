import React, { useContext, useState } from 'react'
import nature from "../../assest/logo512.png"
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-tailwind/react";
import { collection, doc,query,  where, getDocs, updateDoc, arrayRemove} from 'firebase/firestore'
import { db } from '../Firebase/Firebase'
import avatar1 from "../../assest/logo512.png"

const RightSide = () => {

  const [input,setInput] = useState("")
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;


  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  
  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen p-4 bg-white border-4 rounded-r-x1 shadow-lg">
        <div className="flex flex-col items-center relative pt-10">
          <img src={user?.photoURL || nature} alt="" className='h-48 rounded-md' />
        </div>
        {/* <p className='text-sm text-gray-700 max-w-full no-underline tracking-normal leading-tight py-2 mx-2'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea temporibus illum minus sapiente quia quasi explicabo obcaecati labore laudantium, corporis eligendi ad quas distinctio voluptatibus, cupiditate sint quis, magni eum.
        </p> */}

        <div className="mt-12">
          <p className='text-sm text-gray-700 max-w-full no-underline tracking-normal leading-tight mx-2'>
            Friends:{""}
          </p>
          <input type="text" className='mt-2 mr-2 border-0 outline-none' placeholder='Search Friends' onChange={(e) =>  setInput(e.target.value)}/>
          {
            friendList?.length > 0 ? (
              searchFriends(friendList)?.map((friend) => {
                return (
                  <div className="flex items-center justify-between" key={friend.id}>
                    <Link to={`/profile/${friend.id}`}>
                      <div className="flex items-center my-2 cursor-pointer">
                        <div className="flex items-center">
                          <Avatar size="sm" variant="circular" src={friend?.image || avatar1} alt="avatar"></Avatar>
                          <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                            {friend.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="mr-4">
                      {/* <img onClick={() => removeFriend(friend.id, friend.name, friend.image)} className="cursor-pointer h-10" 
                      src={avatar1} alt="deleteFriend"></img> */}
                      <Button onClick={() => removeFriend(friend.id, friend.name, friend.image)} className='cursor-pointer'>Remove</Button>
                    </div>
                  </div>
                );
              })
            ) : (<p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                Add friends to check their profile
              </p>)
            }
        </div>
      </div>
    </>
  )
}

export default RightSide