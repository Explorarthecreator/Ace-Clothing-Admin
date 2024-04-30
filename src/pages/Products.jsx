import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"


function Products() {
  return (
    <div className="p-5 lg:p-10 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">
          Products
        </h1>
        <Link className="btn btn-md bg-black font-bold text-white hover:border-2 hover:border-black hover:bg-transparent hover:shadow-lg" to={'/products/add-product'}>
          <FaPlus/> Add Product
        </Link>
      </div>
    </div>
  )
}

export default Products