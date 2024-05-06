
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
        <div className=' w-full pb-4 border-b  border-b-gray-400'>
            <div className=' flex justify-center'>
                <FaAirbnb size={105}/>
            </div>
            <h3 className='mt-3 text-3xl font-semibold text-center'>
                Ace Clothing
            </h3>
        </div>
        <div className=' w-full h-4/5 text-gray-200'>
            <Link className={`flex items-center gap-2 py-3 px-5 text-xl ${pathMatchRoute('/')&&'text-black bg-white font-medium'}`} to={'/'}>
                <FaHome/> Home
            </Link>
            
            <Link className={`flex items-center gap-2 py-2 text-xl px-5 ${pathMatchRoute('/products')&&'text-black bg-white font-medium'}`} to={'/products'}>
                <FaShoppingBag/> Products
            </Link>
            
            <Link className={`flex items-center gap-2 px-5 py-3 text-xl ${pathMatchRoute('/orders')&&'text-black bg-white font-medium'}`} to={'/orders'}>
                <FaTruck/> Order
            </Link>
        </div>
        <div className='py-7 text-center border-t border-t-gray-300'>
            &copy; 2024 Explorar
        </div>
    </div>
  )
}

export default Navbar