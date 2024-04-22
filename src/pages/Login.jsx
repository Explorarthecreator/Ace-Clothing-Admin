import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../features/auth/authSlice'
import { FaKey, FaUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [loading, setLoading] = useState(false)

    const {isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {email, password} = formData

    useEffect(()=>{
        if(isError){
            console.log('An error occured');
            console.log(message);
        }
        if(isSuccess){
            console.log('it was succesfull');
            navigate('/')
        }

        dispatch(reset())
    },[isError,isLoading,isSuccess,message,navigate,dispatch])
    const change = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value
        }))
        
    }
    const submit = (e)=>{
        e.preventDefault()
        console.log(formData);

        setLoading(true)
        dispatch(login(formData))
    }
    if(isLoading){
        <Spinner/>
    }
  return (
    <div className='w-11/12 lg:w-1/2 m-auto lg:mt-28 mt-14'>
        <form className=' bg-white p-6 rounded-lg shadow-lg w-full lg:w-4/5 m-auto' onSubmit={submit} >
            <h1 className=' mb-5 text-3xl text-black font-bold'>
                Login
            </h1>
            {/* <div>
                <label htmlFor="email">
                    Email 
                </label>
                <input type="email" id='email' value={email} onChange={change} />
                
            </div>

            <div>
                <label htmlFor="password">
                    Password 
                </label>
                <input type="password" id='password' value={password} onChange={change} />
            </div> */}
            <div className=' flex flex-col gap-4'>
                <div>
                    <label className="input input-bordered input-success flex items-center gap-2 bg-white text-black focus:outline-2 focus:outline-black">
                        <FaUser/>
                        <input type="email" className="grow" placeholder="Enter your email" id='email' value={email} onChange={change} />
                    </label>
                </div>
                
                <div>
                    <label className={`input input-bordered flex items-center gap-2 bg-white text-black border-black`}>
                        <FaKey/>
                        <input type="password" className="grow" placeholder="Enter your password" id='password' value={password} onChange={change} />
                    </label>
                </div>

                {
                    loading? <button className="btn w-full lg:w-2/5 md:w-2/5 m-auto text-white">
                    <span className="loading loading-spinner"></span>
                    loading
                  </button>: <button className='btn w-full lg:w-2/5 md:w-2/5 m-auto text-white'>
                    Submit
                </button>
                }
                
            </div>

            <p className='mt-9 text-black'>
                New User? <Link className='btn ml-3 text-white' to={'/signup'}>Signup</Link>
            </p>
        </form>
    </div>
  )
}

export default Login