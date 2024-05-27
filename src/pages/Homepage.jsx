import { useEffect } from "react"
import Spinner from "../components/Spinner"
import { useSelector, useDispatch } from "react-redux"
import { fetchOrders} from "../features/order/orderSlice"
import { checkAdminStatus, fetchUsers } from "../features/user/userSlice"
import { Doughnut } from "react-chartjs-2"
import { toast } from "react-toastify"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import UserList from "../components/UserList"
import BoxSpinner from "../components/BoxSpinner"



function Homepage() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const {isLoading, orders, isError, message: orderMessage} = useSelector((state)=>state.order)
  const {id} = useSelector((state)=>state.auth)
  const {user, isLoading: userLoading, isSuccess, updateError, updateSucess, message, adminStatus} = useSelector((state)=>state.user)
  const dispatch = useDispatch()


  
  useEffect(()=>{
    dispatch(checkAdminStatus(id))

    if(adminStatus){
      dispatch(fetchOrders())
      dispatch(fetchUsers(id))
    }
    

    if(isError){
      toast.error(orderMessage)
    }
    if(isSuccess){
      dispatch(fetchUsers(id))
      if(updateSucess){
        toast.success('User status updated successfully')
      }
    }
    if(updateError){
      toast.error(message)
    }
    
  },[dispatch,id, isSuccess, updateError,updateSucess, message, isError, orderMessage,adminStatus])

// Chart JS
  const data = {
    labels: [ 'Pending', 'Closed', 'Open'],
    datasets: [
      {
        label: 'Orders',
        data: [orders.filter((order)=>order.data.status === 'pending').length, orders.filter((order)=>order.data.status === 'closed').length, orders.filter((order)=>order.data.status === 'open').length],
        backgroundColor: [
          'rgba(255, 223, 0, 0.7)',
          'rgba(0, 128, 0, 0.7)',
          'rgba(0, 0, 0, 0.7)',
        ],
        borderColor: [
          'rgba(255, 223, 0, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };




  if(isLoading){
    return <Spinner/>
  }
  if(adminStatus === false){
    return <p className="text-black h-1/2 flex items-center justify-center mt-20 font-medium text-xl lg:text-2xl">
      You are not authorised to view this page, Please contact an Admin
    </p>
  }
  return (
    <div className=' p-5 lg:p-10'>
        <div className="w-full">
          <div className=" lg:m-auto lg:p-10 lg:flex lg:items-center justify-between w-full">
            <div className=" h-96">
              <Doughnut data={data} className="mb-5"/>
            </div>
            <div className="stats shadow lg:gap-3 bg-transparent stats-vertical md:stats-horizontal my-10 w-full gap-3">
    
              <div className="stat bg-white text-black">
                <div className="stat-title text-gray-900 text-xl font-semibold">Open Order</div>
                <div className="stat-value text-center">
                  {
                    orders.filter((order)=>order.data.status === 'open').length
                  }
                </div>
              </div>

              <div className="stat bg-white text-black">
                <div className="stat-title text-gray-900 text-xl font-semibold">Pending Order</div>
                <div className="stat-value text-warning text-center">
                  {
                    orders.filter((order)=>order.data.status === 'pending').length
                  }
                </div>
              </div>

              <div className="stat bg-white text-black">
                <div className="stat-title text-gray-900 text-xl font-semibold">Completed Order</div>
                <div className="stat-value text-success text-center">
                  {
                    orders.filter((order)=>order.data.status === 'closed').length
                  }
                </div>
              </div>
          
            </div>

          </div>


          <div className=" text-black mt-5">
            

            {
              userLoading? <BoxSpinner col={'white'}/>:
              user.filter((er)=>er.data.isAdmin === true).length >=1&&
              <>
                <h1 className=" mb-7 text-3xl font-semibold">
                  Admin
                </h1>
                <UserList users={user.filter((er)=>er.data.isAdmin === true)}/>
              </>
            }
          </div>


          <div className=" text-black mt-5">
            

            {
              userLoading? <BoxSpinner col={'white'}/>:
              user.filter((er)=>er.data.isAdmin === false).length >=1 &&
              <>
                <h1 className=" mb-7 text-3xl font-semibold">
                  Users
                </h1>
                <UserList users={user.filter((er)=>er.data.isAdmin === false)}/>
              </>
            }
          </div>
        </div>
    </div>
  )
}

export default Homepage