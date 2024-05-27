import { useEffect, useState } from "react"
import { FaPen, FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts, reset, updateProduct } from "../features/product/productSlice"
import Spinner from "../components/Spinner"
import ProductItem from "../components/ProductItem"
import { toast } from "react-toastify"
import { checkAdminStatus } from "../features/user/userSlice"


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
  const {id:userID} = useSelector((state)=>state.auth)
  const {adminStatus} = useSelector((state)=>state.user)


  const {name, description, tag, price} = formData
  const [sizes,setSize] = useState([])


  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAdminStatus(userID))

    if(adminStatus){
      if(products.length < 1){
        dispatch(fetchProducts())
      }
    }
    

    if(updateError){
      toast.error(message)
    }

    if(updateSuccess){
      dispatch(reset())
      setEdit(false)
    }

  },[dispatch, products.length, message,updateError,updateSuccess,userID,adminStatus])

  const openModal = (data,id)=>{
    setId(id)
    setSingleProduct(data)
    setFormData(data)
    setSize(data.size)
    document.getElementById('viewProduct').showModal()
  }

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))


    if(e.target.id === 'tag'){
      setSize([])
    }
  }

  const submit = (e)=>{
    e.preventDefault()
    if(formData === singleProduct){
      toast.error('You did not change anything')
      return
    }

    dispatch(updateProduct({id,formData}))

  }


  const checking = (d)=>{
    const newSizes = []
    if(sizes.includes(d)){
      const index = sizes.indexOf(d)
      sizes.map((size)=>(
        newSizes.push(size)
      ))
      if(index>-1){
          newSizes.splice(index,1)
      }
      // Set size is what the component uses while it alos updates the form data too
      setSize(newSizes)
      setFormData((prevState)=>({
        ...prevState,
        size: newSizes
      }))
      // formData.size = sizes
    }else{
      sizes.map((size)=>(
        newSizes.push(size)
      ))
      newSizes.push(d)
      setSize(newSizes)
      setFormData((prevState)=>({
        ...prevState,
        size: newSizes
      }))
    }
    console.log(newSizes);
  }

  if(isLoading){
    return <Spinner/>
  }
  if(adminStatus === false){
    return <p className="text-black h-1/2 flex items-center justify-center mt-20 font-medium text-xl lg:text-2xl">
      You are not authorised to view this page, Please contact an Admin
    </p>
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
              {
                edit === false && 
                <img src={singleProduct.image} alt="" className=" mb-3" />
              }
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
                  // <input type="text" id="tag"  value={tag} className=" input input-black text-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={onChange}/>:
                  <select id="tag" className="select select-bordered w-full max-w-xs text-black font-medium bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" value={tag} onChange={onChange}>
                        
                        {/* <option disabled selected className="text-black"></option> */}
                        <option value={""} className=" font-medium">
                            Select a product tag
                        </option>

                        <option value={"shoe"} className=" font-medium">
                            Shoe
                        </option>

                        <option value={"t-shirt"} className=" font-medium">
                            T-shirt
                        </option>

                        <option value={"trouser"} className=" font-medium">
                            Trouser
                        </option>

                        <option value={"heel"} className=" font-medium">
                            Heels
                        </option>

                        <option value={"watch"} className=" font-medium">
                            Watch
                        </option>

                        <option value={"gown"} className=" font-medium">
                            Gown
                        </option>

                        <option value={"hoodie"} className=" font-medium">
                            Hoodie
                        </option>
                    </select>:
                  <p className=" capitalize px-4 py-2 bg-gray-100 rounded-md mt-1">
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
                  // <input type="text" id="size" value={size} className=" input input-black text-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={onChange}/>:
                  <>
                    {
                        (tag === 't-shirt' || tag === 'trouser' || tag === 'gown' || tag === 'hoodies') &&
                        <div className="flex gap-1 p-3">
                            <div>
                                <input type="checkbox" id="S" name="size" value="S" className="hidden peer" checked={sizes.includes('s')} readOnly />
                                <label htmlFor="S" className={`inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100`} onClick={()=>checking('s')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">S</div>
                                    </div>    
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="M" name="size" value="M" className="hidden peer" checked={sizes.includes('m')} readOnly />
                                <label htmlFor="M" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('m')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">M</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="L" name="size" value="L" className="hidden peer" checked={sizes.includes('l')} readOnly  />
                                <label htmlFor="L" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('l')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">L</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="XL" name="size" value="XL" className="hidden peer" checked={sizes.includes('xl')} readOnly />
                                <label htmlFor="XL" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('xl')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            XL
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="XXL" name="size" value="XXL" className="hidden peer" checked={sizes.includes('xxl')} readOnly  />
                                <label htmlFor="XXL" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('xxl')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            XXL
                                        </div>
                                    </div>    
                                </label>
                            </div>
                        </div>
                    }
                    
                    {
                        (tag === 'shoe' || tag === 'heel') &&
                        <div className="flex gap-1 p-3 flex-wrap">
                            <div>
                                <input type="checkbox" id="35" name="size" value="35" className="hidden peer" checked={sizes.includes(35)} readOnly />
                                <label htmlFor="35" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(35)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">35</div>
                                    </div>    
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="36" name="size" value="36" className="hidden peer" checked={sizes.includes(36)} readOnly />
                                <label htmlFor="36" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(36)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">36</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="37" name="size" value="37" className="hidden peer" checked={sizes.includes(37)} readOnly />
                                <label htmlFor="37" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(37)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">37</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="38" name="size" value="38" className="hidden peer" checked={sizes.includes(38)} readOnly />
                                <label htmlFor="38" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(38)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            38
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="39" name="size" value="39" className="hidden peer" checked={sizes.includes(39)} readOnly />
                                <label htmlFor="39" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(39)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            39
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="40" name="size" value="40" className="hidden peer" checked={sizes.includes(40)} readOnly />
                                <label htmlFor="40" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(40)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            40
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="41" name="size" value="41" className="hidden peer" checked={sizes.includes(41)} readOnly />
                                <label htmlFor="41" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(41)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            41
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="42" name="size" value="42" className="hidden peer" checked={sizes.includes(42)} readOnly />
                                <label htmlFor="42" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(42)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            42
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="43" name="size" value="43" className="hidden peer" checked={sizes.includes(43)} readOnly />
                                <label htmlFor="43" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(43)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            43
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="44" name="size" value="44" className="hidden peer" checked={sizes.includes(44)} readOnly />
                                <label htmlFor="44" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(44)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            44
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="45" name="size" value="45" className="hidden peer" checked={sizes.includes(45)} readOnly />
                                <label htmlFor="45" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(45)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            45
                                        </div>
                                    </div>    
                                </label>
                            </div>

                        </div>
                    }
                  </>
                  :
                    <div className="flex flex-wrap gap-2">
                      {
                        singleProduct.size?.map((siz,index)=>(
                          <p className="uppercase px-4 py-2 bg-gray-100 rounded-md mt-1" key={index}>
                            {
                              siz
                            }
                          </p>
                        ))
                      }
                    </div>
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