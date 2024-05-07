import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, signup } from '../features/auth/authSlice'
import { FaEnvelope, FaKey, FaUser } from 'react-icons/fa6'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function Signup() {
    const [formData, setFormData] = useState({
        email:'',
        name:'',
        password:'',
        password2:''
    })

    // const {signup}
    const {isLoading, isError, isSuccess, message, loggedIn} = useSelector((state)=> state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {email, password, name , password2} = formData

    useEffect(()=>{
        if(isError){
            // console.log(message);
            toast.error(message)
        }

        if(isSuccess || loggedIn){
            navigate('/')
        }
        dispatch(reset())
    },[isError,isSuccess,message, navigate, dispatch, loggedIn])
    const change = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value
        }))
    }
    const submit = (e)=>{
        e.preventDefault()
        // delete formData.password2

        if(password2.length>=8 && password2===password){
            dispatch(signup(formData))
            // console.log(formData);
        }else{
            // console.log("Not complete");
            toast.error('Not complete data')
            return
        }
        
    }

    if(isLoading){
        console.log('currently loading');
    }
  return (
    <div className='w-11/12 lg:w-1/2 m-auto lg:mt-28 mt-14'>
        <form className=' bg-white p-6 rounded-lg shadow-lg w-full lg:w-4/5 m-auto' onSubmit={submit}>
            <h1 className=' mb-5 text-3xl text-black font-bold'>
                Sign Up
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
                    <label className="input input-bordered input-success flex items-center gap-3 bg-white text-black ">
                        <FaUser/>
                        <input type="text" className="grow" placeholder="Enter your name" id='name' value={name} onChange={change} required />
                    </label>
                </div>

                <div>
                    <label className="input input-bordered input-success flex items-center gap-3 bg-white text-black ">
                        <FaEnvelope/>
                        <input type="email" className="grow" placeholder="Enter your email" id='email' value={email} onChange={change} required />
                    </label>
                </div>
                
                <div>
                    <label className={`input input-bordered flex items-center gap-3 bg-white text-black border-black ${password.length>=8?'input-success':'input-error'}`}>
                        <FaKey/>
                        <input type="password" className="grow" placeholder="Enter your password" id='password' value={password} onChange={change} required/>
                    </label>
                </div>

                <div>
                    <label className={`input input-bordered flex items-center gap-3 bg-white text-black border-black ${password2.length>=8 && password2===password?'input-success':'input-error'}`}>
                        <FaKey/>
                        <input type="password" className="grow" placeholder="Confirm your password" id='password2' value={password2} onChange={change} required />
                    </label>
                </div>
                {
                    isLoading? <button className="btn cursor-not-allowed w-full lg:w-2/5 md:w-2/5 m-auto text-white">
                    <span className="loading loading-spinner"></span>
                    loading
                  </button>:
                    <button className={`btn w-full md:w-2/5 md:m-auto text-white bg-black ${(email === '' || password === '' || name === '' || password2 === '')&&'btn-disabled'}`}>
                        Submit
                    </button>
                }
                
            </div>

            <p className='mt-9 text-black'>
                Have an account? <Link className='btn ml-3 text-white bg-black' to={'/login'}>Login</Link>
            </p>

        </form>
    </div>
  )
}

export default Signup