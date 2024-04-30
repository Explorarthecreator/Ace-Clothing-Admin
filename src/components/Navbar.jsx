
import {  FaAirbnb, FaTruck } from 'react-icons/fa6'
import { FaHome, FaShoppingBag } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'


function Navbar() {
    const location = useLocation()
    const pathMatchRoute = (route)=>{
        if (route === location.pathname){
            return true
        }
    }
  return (
    <div className={` hidden lg:flex flex-col  w-1/5 pt-7 bg-slate-700 h-screen text-white`}>
        {/* <div className='absolute top-4 right-5 lg:hidden'>
            <button onClick={()=>dispatch(hide())}>
                <FaTimes size={25}/>
            </button>
        </div> */}
        <div className='mb-5 lg:mb-12 w-full px-10 pb-4 border-b  border-b-gray-400'>
            <div className=' flex justify-center'>
                <FaAirbnb size={105}/>
            </div>
            <h3 className='mt-3 text-3xl font-semibold text-center'>
                Ace Clothing
            </h3>
        </div>
        <div className=' w-4/5 text-gray-200'>
            <Link className={`flex items-center gap-2 w-1/2 m-auto py-3 text-xl ${pathMatchRoute('/')&&'text-black'}`} to={'/'}>
                <FaHome/> Home
            </Link>
            
            <Link className={`flex items-center gap-2 w-1/2 m-auto py-3 text-xl ${pathMatchRoute('/products')&&'text-black'}`} to={'/products'}>
                <FaShoppingBag/> Products
            </Link>
            
            <Link className={`flex items-center gap-2 w-1/2 m-auto py-3 text-xl ${pathMatchRoute('/orders')&&'text-black'}`} to={'/orders'}>
                <FaTruck/> Order
            </Link>
        </div>
        
    </div>
  )
}

export default Navbar