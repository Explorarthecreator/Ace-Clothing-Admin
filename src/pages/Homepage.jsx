import { useEffect } from "react"
import Spinner from "../components/Spinner"
import { useSelector, useDispatch } from "react-redux"
import { fetchOrders } from "../features/order/orderSlice"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';



function Homepage() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const {isLoading, orders} = useSelector((state)=>state.order)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(fetchOrders())
  },[dispatch])

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
        // radius:'50%',
      },
    ],
  };




  if(isLoading){
    return <Spinner/>
  }
  return (
    <div className=' p-5 lg:p-10'>
        <div className="w-full">
          <div className=" h-96 lg:m-auto lg:p-10 lg:flex lg:items-center justify-between w-full">
            <Doughnut data={data} className="mb-5"/>
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

          </div>
        </div>
    </div>
  )
}

export default Homepage