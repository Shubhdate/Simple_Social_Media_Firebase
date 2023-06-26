import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import {GoogleAuthProvider,createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword,signInWithPopup} from "firebase/auth"
import {auth,db,onAuthStateChanged} from "../Firebase/Firebase"
import { collection,getDocs,query,where,addDoc, onSnapshot} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext() 

const AppContext = ({children}) => {
    
    const provider =  new GoogleAuthProvider()

    const [user,setUser] = useState("")
    const [userData,setUserData] = useState("")

    const collectionRef = collection(db,"users")

    const navigate = useNavigate()
    

    const signInWithGoogle = async () => {
        try {
            const popup = await signInWithPopup(auth,provider)
            const user = popup.user 
            const q = query(collectionRef, where("uid", "==", user.uid))
            const docs = await getDocs(q)
            if(docs.docs.length === 0){
                await addDoc(collectionRef, {
                    uid:user?.uid,
                    name:user?.displayName,
                    email:user?.email,
                    image:user?.photoURL,
                    authProvider:popup?.providerId
                })
        }
        } catch (error) {
            console.log(error)
        }
    }

    const loginWithUserAndEmail = async (email,password) => {
        try {

            await signInWithEmailAndPassword(auth,email,password)

        } catch (error) {
            console.log(error)
        }
    }

    const registerWithEmailAndPassword = async (name,email,password) => {
        try {
            
            const res = await createUserWithEmailAndPassword(auth,email,password)
            const user = res.user 
            await addDoc(collectionRef, {
                uid:user?.uid,
                name,
                providerId:"email/password",
                email:user?.email,
            })


        } catch (error) {
            console.log(error)
        }
    }

    const sendPasswordToUser = async (email) => {
        try {

            await sendPasswordResetEmail(auth,email).then((res) => {
                console.log(res)
            })
            alert("New password send to email")
            
        } catch (error) {
            console.log(error)
        }
    }

    const signOutUser = async () => {
        await auth.signOut(auth)
    }

    const userStateChanged = async () => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const q = query(collectionRef, where('uid', "==", user?.uid))
                await onSnapshot(q, (doc) => {
                    setUserData(doc?.docs[0]?.data())
                })
                setUser(user)
            }
            else{
                setUser(null)
                navigate("/login")
            }
        })
    }

    useEffect(() => {
        userStateChanged()
        if(user || userData){
            navigate("/")
        }
        else{
            navigate("/login")
        }
        return () => userStateChanged()
    },[])


    const intialState = {
        signInWithGoogle : signInWithGoogle,
        loginWithUserAndEmail:loginWithUserAndEmail,
        registerWithEmailAndPassword:registerWithEmailAndPassword,
        sendPasswordToUser:sendPasswordToUser,
        signOutUser:signOutUser,
        user:user,
        userData:userData
    }

    // console.log("user",user)
    // console.log("userData",userData)


  return (
    <>
    <div>
        <AuthContext.Provider value={intialState}>
            {children}
        </AuthContext.Provider>
    </div>
    </>
  )
}

export default AppContext