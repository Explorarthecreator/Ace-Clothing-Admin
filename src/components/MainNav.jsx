import { FaHamburger, FaTimes } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { hide, show } from "../features/navigation/navSlice"
import MobileNav from "./MobileNav"
import { AnimatePresence } from "framer-motion"

function MainNav() {
    const {hideNav,showNav} = useSelector((state)=>state.nav)
    const dispatch = useDispatch()
    
  return (
    <div className='w-full bg-white py-5 px-5 lg:px-9 flex justify-between items-center'>
        
        {
            hideNav ? <button className="lg:hidden" onClick={()=>dispatch(show())}>
                <FaHamburger size={25}/>
            </button>:
            <button className="lg:hidden" onClick={()=>dispatch(hide())}>
                <FaTimes size={25}/>
            </button>
        }
        
        <h1>
            Good boy
        </h1>

        <p>
            Hi John!
        </p>

        <AnimatePresence>
            {
                showNav && <MobileNav/>
            }
        </AnimatePresence>
        
    </div>
  )
}

export default MainNav