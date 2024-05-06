import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";


const initialState = {
    products :[],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}


export const fetchProducts = createAsyncThunk('product/getAll',async(thunkAPI)=>{
    try {
        const docRef = collection(db,'products')

        const docSnap = await getDocs(docRef)

        let products = []

        docSnap.forEach((data)=>{
            products.push({
                id: data.id,
                data: data.data()
            })
        })
        console.log(products);

        return products
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const createProduct = createAsyncThunk('product/create',async(formData,thunkAPI)=>{
    try {
        await addDoc(collection(db,'products'),formData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        reset: (state)=> initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createProduct.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createProduct.fulfilled,(state)=>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(fetchProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchProducts.rejected, (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })
    }
})

export const {reset} = ProductSlice.actions

export default ProductSlice.reducer