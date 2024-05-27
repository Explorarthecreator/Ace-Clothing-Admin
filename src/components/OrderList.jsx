import OrderItem from "./OrderItem"
import { useDispatch, useSelector } from "react-redux"
import { reset as res } from "../features/order/orderSlice"
import { fetchUser } from "../features/user/userSlice"
import BoxSpinner from "./BoxSpinner"
import { useState } from "react"
import { closeOrder, pendingOrder } from "../features/order/orderSlice"


function OrderList({orders}) {

  const dispatch = useDispatch()
  const [order, setOrder] = useState({})
  const [orderId, setOrderId] = useState('')
  const {isLoading:userLoading, singleUser} = useSelector((state)=>state.user)


  const showModal = (order,id)=>{
    setOrderId(id)
    setOrder(order)
    dispatch(fetchUser(order.userRef))
    document.getElementById('viewOrderModal').showModal()

  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table bg-white border-none">
          {/* head */}
          <thead className=" text-black">
            <tr>
              <th>
                Amount
              </th>
              <th>
                Status
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-black">
            {/* row 1 */}
            {
              orders.map((order)=>(
                <OrderItem key={order.id} id={order.id} order={order.data} show={showModal}/>
              ))
            }
          </tbody>
        </table>
      </div>


      <dialog id="viewOrderModal" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-2xl text-black">
            Order Details
          </h3>
          <div className=" my-4">
            
            {
              userLoading? <BoxSpinner/>:
              Object.keys(singleUser).length >=1? 
              <>
                <h1 className="text-lg text-black font-semibold">
                User Details
                </h1>
                <div className="stats shadow bg-transparent stats-vertical my-3 w-full gap-3">

                  <div className="stat bg-white text-black">
                    <div className="stat-desc text-gray-500 text-sm font-semibold">Name</div>
                    <div className=" stat-title text-center text-xl font-bold text-black">
                        {
                          singleUser.firstName + ' ' + singleUser.lastName
                        }
                    </div>
                  </div>

                  <div className="stat bg-white text-black">
                    <div className="stat-desc text-gray-500 text-sm font-semibold">
                      Email
                    </div>
                    <div className="stat-title text-center text-xl font-bold text-black">
                      {
                        singleUser.email
                      }
                    </div>
                  </div>

                  <div className="stat bg-white text-black">
                    <div className="stat-desc text-gray-500 text-sm font-semibold">
                      Phone Number
                    </div>
                    <div className="stat-title text-center text-xl font-bold text-black">
                      {
                        singleUser.phoneNumber
                      }
                    </div>
                  </div>
                  
                </div>
              </>:
              <p>
                NO USer
              </p>
            }
          </div>

          <div className="my-4">
            <h1 className="text-lg text-black font-semibold">
              Cart details 
            </h1>
            
            <div className="overflow-x-auto mt-3">
                <table className="table bg-gray-200 border-none text-black">
                  {/* head */}
                  <thead className="text-black text-md">
                    <tr>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {
                      order.cart?.map((cart,index)=>(
                        <tr key={index} className=" border-b-gray-400">
                          <td>
                            {
                              cart.name
                            }
                          </td>
                          <td>
                            {
                              cart.size
                            }
                          </td>
                          <td>
                            {
                              cart.quantity
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            </div>

            <h3 className="mt-3 text-black">
              Address
            </h3>
            <p>
              {
                order.address
              }
            </p>
          </div>
          
          <div className="modal-action">
            <form method="dialog">
              {
                order.status === 'pending'? <button className="btn bg-green-500 border-0 text-white hover:border hover:border-green-500 hover:bg-transparent hover:text-green-700 mr-4" onClick={()=>{
                  dispatch(closeOrder(orderId))
                  dispatch(res())
                }}>Close Order</button>:
                order.status === 'open'? <button className="btn bg-green-500 border-0 text-white hover:border hover:border-green-500 hover:bg-transparent hover:text-green-700 mr-4" onClick={()=>{
                  dispatch(pendingOrder(orderId))
                  dispatch(res())
                }}>Make Pending</button>:
                <button className="btn bg-green-500 btn-disabled border-0 text-white hover:border hover:border-green-500 hover:bg-transparent hover:text-green-700 mr-4">Closed</button>
              }
              
                {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-outline text-black hover:bg-black hover:text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default OrderList