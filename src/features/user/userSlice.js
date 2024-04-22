import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

// const auth = getAuth()
// console.log(auth);
const initialState = {
    user: [],
    isLoading: false,
    message:'',
    isSuccess: false,
    isError: false 
}

export const fetchUsers = createAsyncThunk('user/getAll',async(id,thunkAPI)=>{
    try {

        // const auth = getAuth()
        // console.log(auth);
        const userRef = doc(db,'users', id) 

        const querySnap = await getDoc(userRef)
        if(querySnap.data().isAdmin){
            const docRef = collection(db,'users')
            const docSnap = await getDocs(docRef)

            let users = []

            docSnap.forEach((user)=>{
                users.push({
                    id:user.id,
                    data: user.data()
                })
            })
            console.log(users);
            return users
        }else{
            throw new Error ('You are not authorised to view this page')
        }
    } catch (error) {
        const message = error.message

        // console.log(error.message);
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUsers.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchUsers.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchUsers.fulfilled, (state,action)=>{
                state.isLoading = false
                state.user = action.payload
            })
    }
})

export const {reset} = userSlice.actions

export default userSlice.reducer