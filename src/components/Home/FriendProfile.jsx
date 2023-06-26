import React, { useState, useEffect } from "react";
import LeftSide from "../Leftsidebar/LeftSide";
import Navbar from "../Navbar/Navbar";
import RightSide from "../Rightsidebar/RightSide";
import Main from "../Main/Main";
import profilePic1 from "../../assest/logo512.png";
import { Avatar } from "@material-tailwind/react";
import avatar1 from "../../assest/logo512.png";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useParams } from "react-router-dom";

const FriendProfile = () => {

  const { id } = useParams();
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", id));
      await onSnapshot(q, (doc) => {
        setProfile(doc.docs[0].data());
      });
    };
    getUserProfile();
  }, [id]);
  console.log(profile);


  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide></LeftSide>
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
          <div className="w-[80%] mx-auto">
            <div>
              <div className="relative py-4">
                <img
                  className="h-96 w-full rounded-md"
                  src={profile?.image || profilePic1}
                  alt="profilePic"
                ></img>
                <div className="absolute bottom-10 left-6">
                  <Avatar
                    size="xl"
                    variant="circular"
                    src={profile?.image || avatar1}
                    alt="avatar"
                  ></Avatar>
                  <p className="py-2 font-roboto font-medium text-sm  no-underline tracking-normal leading-none">
                    {profile?.email}
                  </p>
                  <p className="py-2 font-roboto font-medium text-sm no-underline tracking-normal leading-none">
                    {profile?.name}
                  </p>
                </div>
                <div className="flex flex-col absolute right-6 bottom-10">
                  <div className="flex items-center">
                    <span className="ml-2 py-2 font-roboto font-medium text-sm no-underline tracking-normal leading-none">
                      Loaction - From Tokyo, Japan
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2 py-2 font-roboto font-medium text-sm  no-underline tracking-normal leading-none">
                      Lives - Lives in New York
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Main></Main>
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;