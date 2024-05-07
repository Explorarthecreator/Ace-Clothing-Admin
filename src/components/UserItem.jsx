

function UserItem({user,updateStatus,id}) {
  return (
                <tr className=" border-gray-600 border-b-0">
                    <td>
                      {
                        user.name
                      }
                    </td>
                    <td>
                      {
                        user.email
                      }
                    </td>
                    <td>
                      {
                        user.number
                      }
                    </td>
                    <td>
                      {
                        user.isAdmin? 'Admin' : 'User'
                      }
                    </td>
                    {
                        !user.isAdmin && <th>
                        <button className="btn btn-outline btn-success btn-sm" onClick={()=>updateStatus(id)}>
                          Make Admin
                        </button>
                      </th>
                    }
                    
                </tr>
  )
}

export default UserItem