import { useDispatch, useSelector } from "react-redux"
import OrderList from "../components/OrderList"
import { useEffect } from "react"
import { fetchOrders } from "../features/order/orderSlice"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

function Orders() {
  const {orders, isLoading, isSuccess, isError,message, statusSuccess, statusError} = useSelector((state)=>state.order)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(statusSuccess){
      toast.success('Order updated successfully')
    }
    if (statusError){
      toast.error(message)
    }
    dispatch(fetchOrders())
    if(orders.length <=0){
      dispatch(fetchOrders())
    }
    // if(isSuccess){
    //   toast.success("Orders loaded successfully")
    // }
    
    if(isError){
      toast.error(message)
    }
  },[orders.length,dispatch, isError, isSuccess, message, statusError, statusSuccess])

  if(isLoading){
    return <Spinner/>
  }
  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-black text-3xl font-medium">
        Orders Summary
      </h1>
      <div className="stats shadow lg:gap-3 bg-transparent stats-vertical md:stats-horizontal my-10 w-full gap-3">
    
        <div className="stat bg-white text-black">
          <div className="stat-title text-gray-900 text-xl font-semibold">Open Order</div>
            <div className="stat-value text-center">
              {
                orders.filter((order)=>order.data.status === 'open').length
              }
            </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

              <div className="stat bg-white text-black">
                <div className="stat-title text-gray-900 text-xl font-semibold">Pending Order</div>
                <div className="stat-value text-warning text-center">
                  {
                    orders.filter((order)=>order.data.status === 'pending').length
                  }
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>

              <div className="stat bg-white text-black">
                <div className="stat-title text-gray-900 text-xl font-semibold">Completed Order</div>
                <div className="stat-value text-success text-center">
                  {
                    orders.filter((order)=>order.data.status === 'closed').length
                  }
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
          
      </div>

      {/* {
        orders.map((order)=>(
          <OrderList key={order.id} orders={order.data}/>
        ))
      } */}
      {/* <OrderList  orders={orders.data}/> */}
      {
        orders.length >=1 && <OrderList orders={orders}/>
      }
    </div>
  )
}

export default Orders