import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup"
import {ClipLoader} from "react-spinners"


import { AuthContext } from '../AppContext/AppContext';
import { onAuthStateChanged, auth} from '../Firebase/Firebase';

const Login = () => {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false);

    //importing AppContext to signwithgoogle 
    const {signInWithGoogle,loginWithUserAndEmail} = useContext(AuthContext)

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if(user){
                navigate("/")
                setLoading(false)
            }
            else{
                setLoading(false)
                navigate("/login")
            }
        })
    },[navigate])

    let initialValues = {
        email:"",
        password:""
    }

    const validationSchema = Yup.object({
        email:Yup.string()
        .email("Invalid email address")
        .required("Required"),

        password:Yup.string()
        .required("Required")
        .min('4',"Must be at least of 4 charcters")
        .matches(/^[a-zA-Z]+$/, "Password can only contain letters")
    })

    const handleSubmit = (e) => {
        e.preventDefault() 
        // console.log('formik',formik)

        const {email,password} = formik.values 
        if(formik.isValid === true) {
            setLoading(true)
            loginWithUserAndEmail(email,password)
        }
        else{
            setLoading(false)
        }

    }

    const formik = useFormik({initialValues,validationSchema,handleSubmit})


  return (
    <> 
    {
        loading ? (<div className='grid grid-cols-1 h-screen justify-items-center items-center'><ClipLoader className='sweet-loading' color="blue" loading={loading} size={100} /></div>)
        : (<div className="grid grid-cols-1 h-screen justify-items-center items-center">

        <Card className="w-96">
            <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-20 place-items-center"
            >
                <Typography variant="h3" color="white">
                Login Page
                </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <Input name='email' type="email" label="Email" size="lg" {...formik.getFieldProps("email")} />
                    </div>
                    <div className='mb-2'>
                        <Input name='password' type="password" label="Password" size="lg" {...formik.getFieldProps("password")}/>
                    </div>
                    <div className='mb-2'><Button type="submit" variant="gradient" fullWidth>Login</Button></div>
                    <div>
                        <>
                        {
                            formik.touched.email && formik.errors.email && (
                                <Typography variant="small" className="mt-6 flex justify-center">{formik.errors.email}</Typography>
                            )
                        }
                        </>
                        <>
                        {
                            formik.touched.password && formik.errors.password && (
                                <Typography variant="small" className="mt-6 flex justify-center">{formik.errors.password}</Typography>
                            )
                        }                       
                        </>
                    </div>
                </form>
            </CardBody>

            <CardFooter className="pt-0">
                <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue"
                    className="mt-6 flex justify-center ml-1 font-bold">
                    <button onClick={signInWithGoogle}>Login with Google</button>
                </Typography>
                
                <Link to="/resetpassword">
                    <Typography variant="small" color="blue" className="mt-6 flex justify-center ml-1 font-bold">Reset Password</Typography>
                </Link>
                <Link to="/register">
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don't have an account?
                    <Typography
                        as="a"
                        href="#signup"
                        variant="small"
                        color="blue"
                        className="ml-1 font-bold"
                    >
                        Register Now
                    </Typography>
                    </Typography>
                </Link>
            </CardFooter>
        </Card>

        </div>)
    }
    
    </>
  )
}

export default Login