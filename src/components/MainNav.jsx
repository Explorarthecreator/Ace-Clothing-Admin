import { FaHamburger, FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { hide, show } from "../features/navigation/navSlice"
import { logout} from "../features/auth/authSlice"
import MobileNav from "./MobileNav"
import { AnimatePresence } from "framer-motion"
import { getAuth, onAuthStateChanged } from "firebase/auth"

function MainNav() {
    const auth = getAuth()

    // const [changeDetails, setChangeDetails]=useState(false)
    // const [formData, setFormData] = useState({
    //   name : 'Anonymous'|| auth.currentUser.displayName,
    // //   email : auth.currentUser.email,
    // })
    // const {name} = formData
    const [name, setName] = useState('')
    const {hideNav,showNav} = useSelector((state)=>state.nav)
    // const {loggedIn,user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setName(user.displayName)
            }else{
                setName('Anon')
            }
        })
    },[auth])
    
  return (
    <div className='w-full bg-white py-5 px-5 lg:px-9 flex justify-between items-center text-black'>

        {
            hideNav ? <button className="lg:hidden" onClick={()=>dispatch(show())}>
                <FaHamburger size={25}/>
            </button>:
            <button className="lg:hidden" onClick={()=>dispatch(hide())}>
                <FaTimes size={25}/>
            </button>
        }

        <p>
            Hi {name}
        </p>

        {
            auth.currentUser !== null &&
            <button className=" border-2 py-2 px-3 rounded-md bg-black text-white" onClick={()=>dispatch(logout())}>
                Logout
            </button>
        }

        <AnimatePresence>
            {
                showNav && <MobileNav/>
            }
        </AnimatePresence>
        
    </div>
  )
}

export default MainNav