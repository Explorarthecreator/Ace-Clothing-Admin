import { FaArrowLeft } from "react-icons/fa"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createProduct, reset } from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../components/Spinner";


function NewProduct() {

    const {isLoading, isSuccess, isError, message} = useSelector((state)=> state.product)
    const [imago, setImago] = useState(null)
    // const [url, setUrl] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        price:1,
        tag:'',
        size:'',
        image:''
    })


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
    const {name,description,price,tag,size} = formData
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
                console.log('Upload is ' + progress + '% done');
                toast.info(`Image upload is ${progress}% done`)
                
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
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
                // console.log('File available at', downloadURL);
                resolve(downloadURL)
                // setUrl(downloadURL)
                });
            }
            );
        })
    }
    const change = (e)=>{
        if(e.target.files){
            // console.log("Na picture you change o");
            setImago(e.target.files[0])

        }
        else{
            // console.log("No be picture you change o");
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]:e.target.value
            }))
        }
    }
    const createProductForm = async(e)=>{
        e.preventDefault()
        // console.log(imago);
        if(name === '' || description === '' || tag==='' || size === ''){
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
        // console.log(imago);
        // toast.success('Oba is King')
        // console.log(formData);

        // const imageUrl = await storeImage(imago).catch((error)=>{
        //     toast.error(error)
        //     return
        // })

        // formData.image = imageUrl


        // dispatch(createProduct(formData))
        // console.log(formData);


        // const storage = getStorage();
        // const storageRef = ref(storage, 'images/'+imago.name);

        // const uploadTask = uploadBytesResumable(storageRef, imago);

        // // Register three observers:
        // // 1. 'state_changed' observer, called any time the state changes
        // // 2. Error observer, called on failure
        // // 3. Completion observer, called on successful completion
        // uploadTask.on('state_changed', 
        // (snapshot) => {
        //     // Observe state change events such as progress, pause, and resume
        //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //     case 'paused':
        //         console.log('Upload is paused');
        //         break;
        //     case 'running':
        //         console.log('Upload is running');
        //         break;
        //     }
        // }, 
        // (error) => {
        //     // Handle unsuccessful uploads
        // }, 
        // () => {
        //     // Handle successful uploads on complete
        //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //     console.log('File available at\n', downloadURL);
        //     setUrl(downloadURL)
        //     console.log(url);
        //     });

        //     // console.log(url);
        // }
        // );
    }
    // if(isLoading){
    //     return <Spinner/>
    // }
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

                    <input type="text" id="tag"  value={tag} className=" input input-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={change} />
                </div>

                <div className=" form-control mt-3">
                    <label>
                        Size
                    </label>

                    <input type="text" id="size" value={size} className=" input input-black bg-white mt-1 border-2 border-black focus:outline-none focus:border-black" onChange={change} />
                </div>

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