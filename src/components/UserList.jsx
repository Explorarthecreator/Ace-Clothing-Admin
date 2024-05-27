// import { useState } from "react";
import UserItem from "./UserItem"
import { updateId, updateUserStatus } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import BoxSpinner from "./BoxSpinner";


function UserList({users}) {
    const {id, isLoading} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const showModal = (id)=>{
        
        dispatch(updateId(id))
        document.getElementById('my_modal_1').showModal()
    }
    const changeStatus = (e)=>{
        e.preventDefault()
        dispatch(updateUserStatus(id))        
    }
    


    if(isLoading){
      return <BoxSpinner col={'black'}/>
    }
  return (
    <div className="overflow-x-auto">
              <table className="table bg-white border-none">
                {/* head */}
                <thead className=" text-black">
                  <tr>
                    <th>
                      Name
                    </th>
                    <th>
                      Email
                    </th>
                    <th>
                      Number
                    </th>
                    <th>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {
                    users.map((user)=>(
                        <UserItem key={user.id} id={user.id} user={user.data} updateStatus={showModal}/>
                    ))
                  }
                </tbody>
              </table>
              
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg text-warning">Warning!</h3>
                    <p className="py-2">
                        Are you sure?
                    </p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn bg-green-500 border-0 text-white hover:border hover:border-green-500 hover:bg-transparent hover:text-green-700 mr-4" onClick={changeStatus}>Yes</button>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline text-black hover:bg-black hover:text-white">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
    </div>
  )
}

export default UserList