

function OrderItem({order,show,id}) {
  return (
    <tr className=" border-gray-600 border-b-0">
      <td>
        {
          order.amount
        }
      </td>              
      <td >
        <span className={`badge text-white p-3 font-medium ${order.status ==='open'?'badge-black' : order.status === 'closed'? 'badge-success':'badge-warning'}`}>
          {
            order.status  
          }
        </span>
        
      </td>
      <th>
        <button className="btn btn-outline border border-black text-black hover:bg-black hover:text-white btn-sm" onClick={()=>show(order.cartRef,order.userRef,order.status,id)}>
          view details
        </button>
      </th>
    </tr>
  )
}

export default OrderItem