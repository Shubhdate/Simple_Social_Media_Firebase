import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from "yup"

import {ClipLoader} from "react-spinners"

const ResetPassword = () => {

    let [loading, setLoading] = useState(false);

    let initialValues = {
        email:""
    }

    const validationSchema = Yup.object({
        email:Yup.string()
        .email("Invalid email address")
        .required("Required"),
    })

    const handleSubmit = (e) => {
        e.preventDefault() 
        // console.log('formik',formik)

        const {email} = formik.values 
        if(formik.isValid === true) {
            alert("Verificatuion is send to your email")
            setLoading(true)
        }
        else{
            alert("Wrong email")
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
                Reset Password Page
                </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Typography variant="p">
                    Type your email to reset the password to send verification code and resetting your password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <Input name='email' type="email" label="Email" size="lg" {...formik.getFieldProps("email")} />
                    </div>
                    <div className='mb-2'><Button type="submit" variant="gradient" fullWidth>Send</Button></div>
                    {/* <div>
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
                    </div> */}
                </form>
            </CardBody>

            {/* <CardFooter className="pt-0">
                <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue"
                    className="mt-6 flex justify-center ml-1 font-bold">
                    Login with Google
                </Typography>

                <Link to="/login">
                    <Typography
                        as="a"
                        href="#signup"
                        variant="small"
                        color="blue"
                        className="flex items-center justify-center"
                    >
                        Login Now
                    </Typography>
                </Link>
            </CardFooter> */}
        </Card>

        </div>)
    }
    
    </>
  )
}

export default ResetPassword