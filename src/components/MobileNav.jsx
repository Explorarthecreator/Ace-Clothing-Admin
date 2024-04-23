import {  useDispatch } from 'react-redux'
import {  FaAirbnb, FaTruck } from 'react-icons/fa6'
import { FaHome, FaShoppingBag, FaTimes } from 'react-icons/fa'
import { hide} from '../features/navigation/navSlice'
import { Link, useLocation } from 'react-router-dom'
import {motion } from 'framer-motion'
// import { delay } from '@reduxjs/toolkit/dist/utils'

function MobileNav() {

    const dispatch = useDispatch()
    const location = useLocation()
    const pathMatchRoute = (route)=>{
        if (route === location.pathname){
            return true
        }
    }

    const hideNav = ()=>{
        dispatch(hide())
    }
    // const variants = {
    //     open: { opacity: 1, x: 0 },
    //     closed: { opacity: 0, x: "-100%" },
    //   }
    // Declare the variant
    const menuVars = {
        initial:{
            scaleX: 0,
            opacity:0
        },
        animate:{
            scaleX:1,
            opacity:1,
            transition:{
                // delayChildren:0.3,
                duration: 0.9,
                ease:[0.12,0,0.39,0]
            }
        },
        exit:{
            // opacity: 0,
            scaleX:0.3,
            opacity:0,
            transition:{
                delay:0.2,
                duration: 0.9,
                ease:[0.22,1,0.36,1]
            }
        }
    }
    const linkVar ={
        initial:{
            x:'90%',
            y:'60vh',
            transition: {
                duration:0.7,
                ease:[0.37,0,0.63,1]
            }
        },
        open:{
            x:0,
            y:0,
            transition:{
                delay: 0.3,
                duration:1,
                ease:[0,0.55,0.45,1]
            }
        }
    }
  return (
    <motion.div variants={menuVars} initial="initial" animate="animate" exit={'exit'} className={` origin-left fixed top-0 left-0 z-40 lg:hidden pt-7 bg-slate-700 text-white h-screen flex flex-col justify-between w-4/5 md:w-1/3`}>
        <div className='absolute top-4 right-5 lg:hidden'>
            <button onClick={()=>dispatch(hide())}>
                <FaTimes size={25}/>
            </button>
        </div>
        <div>
            <div className='mb-5 lg:mb-12 w-full px-10 pb-4 border-b  border-b-gray-400'>
                <div className=' flex justify-center'>
                    <FaAirbnb size={105}/>
                </div>
                <h3 className='mt-3 text-3xl font-semibold text-center'>
                    Ace Clothing
                </h3>
            </div>
            <motion.div variants={linkVar} initial="initial" animate="open" className=' w-4/5 m-auto '>
                <div className="overflow-hidden">
                    <Link className={`flex items-center gap-2 w-1/2 m-auto py-3 text-xl ${pathMatchRoute('/')&&'text-black'}`} to={'/'} onClick={hideNav}>
                        <FaHome/> Home
                    </Link>
                    
                    <Link className={`flex items-center gap-2 w-1/2 m-auto py-3 text-xl ${pathMatchRoute('/products')&&'text-black'}`} to={'/products'} onClick={hideNav}>
                        <FaShoppingBag/> Products
                    </Link>
                    
                    <Link className={`flex items-center gap-2 w-1/2 m-auto py-3 text-xl ${pathMatchRoute('/orders')&&'text-black'}`} to={'/orders'} onClick={hideNav}>
                        <FaTruck/> Order
                    </Link>
                </div>
            </motion.div>
        </div>
        <div className='py-7 text-center border-t border-t-gray-300'>
            &copy; 2024 Explorar
        </div>
    </motion.div>
  )
}

export default MobileNav