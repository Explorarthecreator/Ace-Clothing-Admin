import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";


const initialState = {
    products :[],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    updateLoading: false,
    updateError: false,
    updateSuccess: false
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

export const updateProduct = createAsyncThunk('product/update',async(updateData,thunkAPI)=>{
    const {id, formData} = updateData
    try {
        const productRef = doc(db,'products',id)

        await updateDoc(productRef,formData)
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
            // state.isSuccess = true
            state.products = action.payload
        })
        .addCase(updateProduct.pending,(state)=>{
            state.updateLoading = true
        })
        .addCase(updateProduct.rejected,(state, action)=>{
            state.updateLoading = false
            state.updateError = true
            state.message = action.payload
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.updateLoading =  false
            state.updateSuccess = true
        })
    }
})

export const {reset} = ProductSlice.actions

export default ProductSlice.reducer