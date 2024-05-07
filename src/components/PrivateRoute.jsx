import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

const PrivateRoute =()=> {
    const {logged, checkingStatus} = useAuthStatus()


    if(checkingStatus){
        <div>
            Loading
        </div>
    }
  return (
    logged? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default PrivateRoute