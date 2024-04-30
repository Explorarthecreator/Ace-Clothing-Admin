
import {  useMemo, useState} from "react"
import { useSelector } from "react-redux"

export const useAuthStatus=()=> {
    const [logged, setLogged] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)


    const {loggedIn} = useSelector((state)=>state.auth)

//     const isMounted = useRef(true)

//     useEffect(()=>{

//         if(isMounted){
//             const auth = getAuth()
//             onAuthStateChanged(auth, (user)=>{
//                 if(user){
//                     setLogged(true)

//                 }
// // console.log('ss');
//                 setCheckingStatus(false)
//             })
//         }

//         return ()=>{
//             isMounted.current = false
//         }
        
//     },[isMounted])

    // useEffect(()=>{
    //     const auth= getAuth()
    //     onAuthStateChanged(auth,(user)=>{
    //         if(user){
    //             setLogged(true)
    //         }
    //         else{
    //             setLogged(false)
    //         }
    //     })
        

    //     setCheckingStatus(false)
    // },[loggedIn])

    useMemo(()=>{
        // console.log(loggedIn);
        if(loggedIn){
            setLogged(true)
        }else{
            setLogged(false)
        }
        

        setCheckingStatus(false)
    },[loggedIn])
  return {logged, checkingStatus}
}
