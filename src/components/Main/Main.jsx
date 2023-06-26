import { Alert, Avatar, Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
// import addImage from "../../assest/logo512.png"
import { AuthContext } from '../AppContext/AppContext'
import { collection, doc, orderBy, serverTimestamp, setDoc ,query, onSnapshot} from 'firebase/firestore'
import { db } from '../Firebase/Firebase'
import { PostReducer,postActions,postStates } from '../AppContext/PostReducer'
import {getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"
import avatar1 from '../../assest/logo512.png'
import PostCard from './PostCard/PostCard'


const Main = () => {

    const {user,userData} = useContext(AuthContext)
    const text = useRef("")
    // const scrollRef = useRef()
    const [image,setImage] = useState(null)
    const [file,setFile] = useState(null)
    const collectionRef = collection(db, "posts")
    const postRef = doc(collection(db, "posts"))
    const document = postRef.id
    const[state,dispatch] = useReducer(PostReducer,postStates)
    const {SUBMIT_POST,HANDLE_ERROR} = postActions
    const [progressBar,setProgressBar] = useState(0)
    

    
    


    const handleUpload = (e) => {
        setFile(e.target.files[0])
    }


    const handleSubmitPost = async (e) => {
        e.preventDefault();

        if(text.current.value !== ""){
            try {
                await setDoc(postRef,{
                documentId : document,
                uid:user?.uid || userData?.uid,
                logo:user?.photoURL,
                name:user?.displayName || userData?.name,
                email:user?.email || userData?.email,
                text: text.current.value,
                image:image,
                timestamp:serverTimestamp()
            })
                text.current.value = ""
            } 
            catch (error) {
                dispatch({type:HANDLE_ERROR})
                console.log(error)
            }
        }
        else{
            dispatch({type:HANDLE_ERROR})
        }
    }

    

    //uploading the image function with storage also 
    const storage = getStorage()
    const metadata = {
        contentType:["image/jpeg","image/png","image/gif","image/jpg","image/svg+xml"]
    }
    

    const submitImage = async () => {
        const fileType = metadata.contentType.includes(file["type"])
        // console.log("file",file)

        if(!file) return

        if(fileType){
            try {

                const storageRef = ref(storage,`images/${file.name}`)
                const uplaodTask = uploadBytesResumable(storageRef,file,metadata.contentType)
                await uplaodTask.on('state_changed', (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)* 100) 
                    setProgressBar(progress)
                },
                (error) => {alert(error)},
                async () => {await getDownloadURL(uplaodTask.snapshot.ref).then((downlaodURL) => {
                    setImage(downlaodURL)
                })}) 
                
            
            } catch (error) {
                dispatch({type:HANDLE_ERROR})
                console.log(error)
            }
        }
        
    }

    useEffect(() => {
        const postData = async () => {
            const q = query(collectionRef, orderBy('timestamp',"asc"))
            await onSnapshot(q,(doc) => {
                dispatch({
                    type:SUBMIT_POST, 
                    posts:doc?.docs?.map((item) => item?.data())
                })

                // scrollRef?.current?.scrollIntoView({behaviour:"smooth"})
                setImage(null)
                setFile(null)
                setProgressBar(0)
            })
        }
        return () => postData()
    },[SUBMIT_POST])

  return (
    <>
    <div className="flex flex-col items-center">
        <div className="flex flex-col py-4 w-full bg-white shadow-lg">

            <div className="rounded-3xl">

            <div className="flex items-center h-scroll pb-4 pl-4 w-full">
                <Avatar size='sm' variant='circular' src={user?.photoURL || avatar1}/>

                <form className='w-full' onSubmit={handleSubmitPost}>
                    <div className="flex justify-center items-center">
                        <div className="w-full ml-4">
                            <input type="text" className='outline-none w-[60%] bg-gray-100 p-3 rounded-md' 
                            placeholder={`what's in your mind...${user?.displayName?.split(" ")[0] || userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1)}?`} ref={text}/>
                        </div>
                        <div className="mx-4">{image && <img alt="previeewImage" className='h-24 roundex-xl' src={image}/>}</div>
                        <div className="mx-4">
                            <Button variant='text' type='submit'>Post</Button>
                        </div>
                    </div>
                </form>
             </div>

             <span style={{width: `${progressBar}%`}} className='bg-blue-700 py-1 rounded-md'></span>

             <div className="flex justify-around items-center pt-4 border-b-4 pb-6">
                <div className="flex items-center">
                    {/* adding image for post*/}
                    <label htmlFor="addImage" className='cursor-pointer flex items-center'>
                        {/* <img className="h-10 mr-4" src={addImage} alt="" /> */}
                        <input id='addImage' type="file" style={{display:"none"}} onChange={handleUpload}/>
                        <p className='font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Uplaod</p>
                    </label>
                    {
                        file && (<Button variant='text' onClick={submitImage}>Upload</Button>)
                    }
                    
                </div>
                
                <div className="flex items-center">
                    {/* live image of icon*/}
                    <p className='font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Live</p>
                </div>
                <div className="flex items-center">
                    {/* feeling image of icon*/}
                    <p className='font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Feeling</p>
                </div>
             </div>
             </div>

             <div className="flex flex-col py-4 w-full">
                {
                state?.error ? (<div className='flex justify-center items-center'><Alert color='red'/>Refresh and Try again</div>) 
                : (<div>
                        {
                            state.posts.length > 0 && state?.posts?.map((post,index) => { return (
                                <>
                                    <div key={index}>
                                    <PostCard id={post.documentId} 
                                    logo={post.logo} uid={post?.uid} 
                                     text={post.text} email={post.email} 
                                    timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()} 
                                    name={post.name} image={post?.image}/>
                                    </div>
                                </>
                            )})
                        }
                    </div>)
                }
             </div>

            {/* <div ref={scrollRef}></div> */}
             
        </div>
        
    </div>
    </>
  )
}

export default Main