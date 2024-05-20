import { FaArrowLeft } from "react-icons/fa"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createProduct, reset } from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";


function NewProduct() {

    const {isLoading, isSuccess, isError, message} = useSelector((state)=> state.product)
    const [imago, setImago] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [tag,setTag] = useState('')
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        price:1,
        tag:'',
        size:[],
        image:''
    })

    const [sizes,setSizes] = useState([])
    useEffect(()=>{
        if(isSuccess){
            toast.success('Product Added Successfully')
            navigate('/products')
        }

        if(isError){
            toast.error(message)
        }
        dispatch(reset())
    },[isError, isSuccess, message, navigate,dispatch])
    const {name,description,tag,price} = formData
    // Store Image

    const storeImage = async(image)=>{
        return new Promise ((resolve,reject)=>{
            const storage = getStorage();
            const storageRef = ref(storage, `images/${image.name}`);

            const uploadTask = uploadBytesResumable(storageRef, image);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                if (progress === 0){
                    toast.info('Image is uploading')
                }

                if(progress === 100){
                    toast.success('Image upload successful')
                }
                // toast.info(`Image upload is ${progress}% done`)
                
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    console.log("object");
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                reject(error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
            );
        })
    }
    const change = (e)=>{
        if(e.target.files){
            setImago(e.target.files[0])
        }
        else{
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]:e.target.value
            }))
        }


        if(e.target.id === 'tag'){
            setSizes([])
        }
        console.log(formData);
    }
    const createProductForm = async(e)=>{
        e.preventDefault()
        if(name === '' || description === '' || tag===''){
            toast.error('Fields cannot be empty')
            return
        }
        if(price <=0){
            toast.error('Price cannot be that small')
            return
        }
        if(imago === null){
            toast.error('Please upload an image')
            return
        }
        if(sizes.length <= 0){
            toast.error('Please select a size')
            return
        }

        const imageUrl = await storeImage(imago).catch((error)=>{
            toast.error(error)
            return
        })

        formData.image = imageUrl

        formData.size = sizes

        console.log(formData);
        dispatch(createProduct(formData))
    }
    const checking = (check)=>{
        if(sizes.includes(check)){
            // ger.pop()
            const index = sizes.indexOf(check)
            if(index>-1){
                sizes.splice(index,1)
            }
            setSizes(sizes)
            // formData.size = sizes
        }else{
            sizes.push(check)
            setSizes(sizes)
            // formData.size = sizes
        }

        // formData.size = sizes
        // console.log(size);
        console.log(sizes);
        // console.log(ger);
    }
  return (
    <div className=" p-2 md:p-5 lg:p-10">
        <Link className="btn btn-md bg-black font-bold text-white hover:border-2 hover:border-black hover:bg-transparent hover:shadow-lg" to={'/products'}>
            <FaArrowLeft/> Back to Products
        </Link>

        <section className=" mt-5">
            <h1 className="text-black font-bold text-3xl text-center">
                Create a new product
            </h1>


            <form onSubmit={createProductForm} className=" bg-white w-11/12 lg:w-1/2 md:w-2/3 m-auto shadow-lg rounded-xl mt-6 text-black px-3 py-2 md:px-7 md:py-5">
                <div className=" form-control mt-3">
                    <label>
                        Name
                    </label>

                    <input type="text" id="name" value={name}  className=" input input-black bg-white mt-1 w-full border-2 border-black focus:outline-none focus:border-black" onChange={change} />
                </div>

                <div className=" form-control mt-3">
                    <label>
                        Description
                    </label>

                    <textarea id="description" value={description} className=" textarea bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={change}></textarea>
                </div>

                <div className=" form-control mt-3">
                    <label>
                        Price
                    </label>

                    <input type="number" id="price" min={1}  value={price} className=" input input-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black"  onChange={change}/>
                </div>

                <div className=" form-control mt-3">
                    <label>
                        Tag
                    </label>

                    {/* <input type="text" id="tag"  value={tag} className=" input input-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={change} /> */}
                    <select id="tag" className="select select-bordered w-full max-w-xs text-black font-medium bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" value={tag} onChange={change}>
                        
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
                    </select>
                </div>

                <div className=" form-control mt-3">
                    <label>
                        Size
                    </label>

                    {/* <input type="text" id="size" value={size} className=" input input-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={change} /> */}
                    
                    {/* <div class="flex text-black">
                        <div class="flex items-center me-4">
                            <input id="inline-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-checkbox" class="ms-2 text-sm font-medium text-black">Inline 1</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-2-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label for="inline-2-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inline 2</label>
                        </div>
                    </div> */}
                    {
                        (tag === 't-shirt' || tag === 'trouser' || tag === 'gown' || tag === 'hoodies') &&
                        <div className="flex gap-1 p-3">
                            <div>
                                <input type="checkbox" id="S" name="size" value="S" className="hidden peer" />
                                <label htmlFor="S" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('s')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">S</div>
                                    </div>    
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="M" name="size" value="M" className="hidden peer"  />
                                <label htmlFor="M" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('m')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">M</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="L" name="size" value="L" className="hidden peer"  />
                                <label htmlFor="L" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('l')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">L</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="XL" name="size" value="XL" className="hidden peer"  />
                                <label htmlFor="XL" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking('xl')}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            XL
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="XXL" name="size" value="XXL" className="hidden peer"  />
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
                                <input type="checkbox" id="35" name="size" value="35" className="hidden peer" />
                                <label htmlFor="35" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(35)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">35</div>
                                    </div>    
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="36" name="size" value="36" className="hidden peer"  />
                                <label htmlFor="36" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(36)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">36</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="37" name="size" value="37" className="hidden peer"  />
                                <label htmlFor="37" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(37)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">37</div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="38" name="size" value="38" className="hidden peer"  />
                                <label htmlFor="38" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(38)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            38
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="39" name="size" value="39" className="hidden peer"  />
                                <label htmlFor="39" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(39)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            39
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="40" name="size" value="40" className="hidden peer"  />
                                <label htmlFor="40" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(40)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            40
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="41" name="size" value="41" className="hidden peer"  />
                                <label htmlFor="41" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(41)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            41
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="42" name="size" value="42" className="hidden peer"  />
                                <label htmlFor="42" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(42)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            42
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="43" name="size" value="43" className="hidden peer"  />
                                <label htmlFor="43" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(43)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            43
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="44" name="size" value="44" className="hidden peer"  />
                                <label htmlFor="44" className="inline-flex items-center w-8 h-8 justify-center text-black bg-white border border-gray-400 rounded-full cursor-pointer  peer-checked:bg-black peer-checked:text-white hover:text-gray-600 hover:bg-gray-100" onClick={()=>checking(44)}>                           
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">
                                            44
                                        </div>
                                    </div>    
                                </label>
                            </div>

                            <div>
                                <input type="checkbox" id="45" name="size" value="45" className="hidden peer"  />
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
                </div>
                <p>
                    {
                        sizes
                    }
                </p>
                <div className=" form-control mt-3">
                    <label>
                        Image (only one image allowed)
                    </label>

                    <input type="file" id="image"  className=" file-input input-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={change}/>
                </div>
                {
                    isLoading? <button className="btn cursor-not-allowed w-full mt-5 lg:w-2/5 md:w-2/5 m-auto text-white">
                    <span className="loading loading-spinner"></span>
                    loading
                  </button>:
                    <button className="btn text-white bg-black mt-5 w-full lg:w-2/5 md:w-2/5">
                        Submit
                    </button>
                }   
            </form>
        </section>
    </div>
  )
}

export default NewProduct