import { useEffect, useState } from "react"
import { FaPen, FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts, reset, updateProduct } from "../features/product/productSlice"
import Spinner from "../components/Spinner"
import ProductItem from "../components/ProductItem"
import { toast } from "react-toastify"


function Products() {
  const {isLoading,products, updateLoading, updateError,updateSuccess,message} = useSelector((state)=>state.product)
  const [singleProduct, setSingleProduct] = useState({})
  const [formData, setFormData] = useState({
    name: singleProduct.name,
    description: singleProduct.description,
    tag: singleProduct.tag,
    price: singleProduct.price,
    size: singleProduct.size 
  })

  const [id, setId] = useState(null)
  const {name, description, tag, price, size} = formData
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{

    if(products.length < 1){
      dispatch(fetchProducts())
    }

    if(updateError){
      toast.error(message)
    }

    if(updateSuccess){
      dispatch(reset())
      setEdit(false)
    }

  },[dispatch, products.length, message,updateError,updateSuccess])

  const openModal = (data,id)=>{
    setId(id)
    setSingleProduct(data)
    setFormData(data)
    document.getElementById('viewProduct').showModal()
  }

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  const submit = (e)=>{
    e.preventDefault()
    if(formData === singleProduct){
      toast.error('You did not change anything')
      return
    }
    
    dispatch(updateProduct({id,formData}))
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
            <ProductItem key={product.id} data={product.data} id={product.id} openModal={openModal}/>
          ))
        }
      </div>


      <dialog id="viewProduct" className="modal">
        <div className="modal-box bg-white">
          <div className=" flex justify-between items-center">
            <h1 className="text-2xl">
              {
                edit? 'Edit Product Details': 'Product Details'
              }
            </h1>

            <FaPen onClick={()=>setEdit(!edit)} className="cursor-pointer"/>
          </div>

          <form onSubmit={submit}>
            <div className=" form-control mt-3">
              <label className=" text-lg font-medium">
                 Name
              </label>
              {
                edit? 
                  <input type="text" id="name" value={name}  className=" input input-black text-black bg-white mt-1 w-full border-2 border-black focus:outline-none focus:border-black" onChange={onChange}/>:
                  <p className=" px-4 py-2 bg-gray-100 rounded-md mt-1">
                    {
                      singleProduct.name
                    }
                  </p>
              }
            </div>

            <div className=" form-control mt-3">
              <label className=" text-lg font-medium">
                Description
              </label>

              {
                edit?
                  <textarea id="description" value={description} className=" textarea text-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={onChange}></textarea>
                  :
                  <p className=" px-4 py-2 bg-gray-100 rounded-md mt-1">
                    {
                      singleProduct.description
                    }
                  </p>
              }
            </div>

            <div className=" form-control mt-3">
              <label className=" text-lg font-medium">
                Price
              </label>

              {
                edit?
                  <input type="number" id="price" min={1}  value={price} className=" input input-black text-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={onChange}/>:
                  <p className=" px-4 py-2 bg-gray-100 rounded-md mt-1">
                    {
                      singleProduct.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    }
                  </p>
              }
              </div>

              <div className=" form-control mt-3">
                <label className=" text-lg font-medium">
                  Tag
                </label>

                {
                  edit?
                  <input type="text" id="tag"  value={tag} className=" input input-black text-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={onChange}/>:
                  <p className=" px-4 py-2 bg-gray-100 rounded-md mt-1">
                      {
                        singleProduct.tag
                      }
                  </p>
                }
              </div>

              <div className=" form-control mt-3">
                <label className=" text-lg font-medium">
                  Size
                </label>

                {
                  edit?
                  <input type="text" id="size" value={size} className=" input input-black text-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={onChange}/>:
                  <p className=" px-4 py-2 bg-gray-100 rounded-md mt-1">
                    {
                      singleProduct.size
                    }
                  </p>
                }
              </div>
              {
                edit &&
                  <button className={`btn w-full md:w-2/5 md:m-auto text-white bg-black mt-4 md:mt-4 ${updateLoading&&'btn-disabled'}`}>
                    {
                      updateLoading? <span className="loading loading-spinner"></span>:'Update'
                    }
                  </button>
              }   
          </form>
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