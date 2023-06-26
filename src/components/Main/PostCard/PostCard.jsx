import { Avatar, Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import avatar1 from '../../../assest/logo512.png'
import { AuthContext } from '../../AppContext/AppContext'
import { PostReducer ,postActions,postStates} from '../../AppContext/PostReducer'
import { db } from '../../Firebase/Firebase'
import { arrayUnion, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import CommentsSection from '../Comment/CommentsSection'
// import addFriendimage from "../../../assest/logo512.png"

const PostCard = ({uid,name,logo,image,text,timestamp,id}) => {

    const {user} = useContext(AuthContext)
    const [state,dispatch] = useReducer(PostReducer,postStates)
    
    const likesRef = doc(collection(db,"posts",id,'likes'))
    const likesCollection = collection(db,"posts",id,'likes')
    const singlePostDocument = doc(db, "posts", id);
    const {ADD_LIKE, HANDLE_ERROR} = postActions
    const [open,setOpen] = useState(false)


    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    const addUser = async (e) => {
        e.preventDefault();
        try {

            const q = query(collection(db,"users"), where('uid', "==", user?.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0].ref 
            await updateDoc(data, {
                friends: arrayUnion({id:uid,image:logo,name:name})
            })

        } catch (error) {
          console.log(error)
        }
    };

    const deletePost = async (e) => {
        e.preventDefault();
        try {
          if (user?.uid === uid) {
            await deleteDoc(singlePostDocument);
          } else {
            alert("You cant delete other users posts !!!");
          }
        } catch (err) {
          alert(err.message);
          console.log(err.message);
        }
    };

    const handleLike = async () => {

        const q = query(likesCollection, where('id', "==", user?.uid))
        const querySnapShot = await getDocs(q)
        const likesDocId = await querySnapShot?.docs[0]?.id 

        try {
            
            if(likesDocId !== undefined){
                const deleteId = doc(db, "posts", id, "likes", likesDocId)
                await deleteDoc(deleteId)
            }
            else{
                await setDoc(likesRef,{
                    id:user?.uid
                })
            }

        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        const getLikes = async () => {
            try {

                const q = collection(db, "posts", id, "likes")
                await onSnapshot(q, (doc) => {
                    dispatch({type:ADD_LIKE, 
                    likes: doc?.docs?.map((item) => item?.data())})
                })
                
            } catch (error) {
                dispatch({type:HANDLE_ERROR})
                console.log(error)
            }
        }
        return () => getLikes()
    },[id,ADD_LIKE,HANDLE_ERROR])

  return (
    <>
        <div className="mb-4">
            <div className="flex flex-col py-4 bg-white rounded-t-3xl">
                <div className="flex justify-start items-center pb-4 pl-4">
                    <Avatar size='sm' variant='circular' src={user?.photoURL || avatar1}/>
                    <div className="flex flex-col ml-4">
                        <p className='ml-4 py-2 font-medium text-sm text-gray-700 no-underlne leading-none tracking-normal'>{name}</p>
                        {/* <p className='ml-4 py-2 font-medium text-sm text-gray-700 no-underlne leading-none tracking-normal'>{email}</p> */}
                        <p className='ml-4 py-2 font-medium text-sm text-gray-700 no-underlne leading-none tracking-normal'>Publish:{timestamp}</p>
                    </div>

                    {/* /addfriend */}

                    {
                        user?.uid !== uid && 
                        (<div onClick={addUser} className='w-full flex justify-end cursor-pointer mr-10'>
                            <Button color='white'>Add Friend</Button>
                           {/* <img className='hover:bg-blue-100 rounded-xl p-2' src="" alt="aDDFRIENDPIC"/> */}
                        </div>)
                        
                    }


                </div>

                <div>
                    <p className='ml-4 py-2 font-medium text-sm text-gray-700 no-underlne leading-none tracking-normal'>{text}</p>
                    {
                        image && (<img src={image} className='h-[300px] w-full' alt='postpic'/>)
                    }
                </div>

                <div className="flex justify-around items-center pt-4">
                    <div className='cursor-pointer flex items-center rounded-lg p-2 ' onClick={handleLike}>
                        {/*likepic*/}
                        {/* <img className='h-8 mr-4' src={like} alt="likepic" />*/}
                        <Button>
                            {
                            state.likes?.length > 0 && state?.likes?.length
                            }
                            &nbsp; Likes
                        </Button>
                    </div>
                    <div className='flex items-center rounded-lg p-2 cursor-pointer' onClick={handleOpen}>
                        <div className="flex items-center cursor-pointer" >
                            <Button >Comment</Button>
                            
                            {/* <img className='h-8 mr-4' src={comment} alt="comment" />
                            <p className='font-medium text-md text-gray-700 no-underline leading-none tracking-normal'>comments</p> */}
                        </div>
                    </div>
                    <div className="flex items-center cursor-pointer rounded-lg p-2" onClick={deletePost}>
                        {/* for delete */}
                        <Button  >Delete</Button>
                        {/* <img className='h-8 mr-4' src={deletepng} alt="comment" />
                        <p className='font-medium text-md text-gray-700 no-underline leading-none tracking-normal'>Delete</p> */}
                    </div>
                    
                </div>
                
                
            </div>
                {
                  open && (<CommentsSection postId={id}/>) 
                }
        </div>
    </>
  )
}

export default PostCard