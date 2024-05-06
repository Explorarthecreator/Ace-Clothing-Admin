import { useEffect } from "react"
import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "../features/product/productSlice"
import Spinner from "../components/Spinner"
import ProductItem from "../components/ProductItem"


function Products() {
  const {isLoading,products} = useSelector((state)=>state.product)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(products.length < 1){
      dispatch(fetchProducts())
    }
  },[dispatch, products.length])

  const openModal = (data)=>{
    document.getElementById('viewProduct').showModal()
    console.log(data);
  }
  if(isLoading){
    return <Spinner/>
  }
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

      <div className="w-full mt-5 grid grid-cols gap-y-6 md:grid-cols-3 lg:grid-cols-4">
        {
          products.map((product)=>(
            <ProductItem key={product.id} data={product.data} openModal={openModal}/>
          ))
        }
      </div>


      <dialog id="viewProduct" className="modal">
        <div className="modal-box bg-white">  
          <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-outline text-black hover:bg-black hover:text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Products