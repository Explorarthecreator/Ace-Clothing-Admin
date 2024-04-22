import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getAuth,  signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../firebase.config";
import { serverTimestamp } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

// const gege = true 
const auth = getAuth()
// auth.signOut()

console.log(auth);
// onAuthStateChanged(auth,(user)=>{
//     if(user){
//         lg = true
//         console.log("object");
//     }else{
//         lg= false
//     }
// })
const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
const initialState={
    loggedIn: loggedIn? true:false,
    isLoading: false,
    message:'',
    isSuccess : false,
    isError: false,
}

export const signup = createAsyncThunk('auth/signup',async(formData,thunkAPI)=>{
    const{email,password,name} = formData
    try {
        // const auth = getAuth(app)

        const userCredential = await createUserWithEmailAndPassword(auth,email,password)
        updateProfile(auth.currentUser,{
            displayName: name,
            
        })
        console.log(userCredential);
        const user = {
            id: userCredential.user.uid,
            name: name,
            email:email
        }
    
        const formDataCopy = {
            ...formData,
            isAdmin: false
        }

        delete formDataCopy.password
        delete formDataCopy.password2

        formDataCopy.timestamp = serverTimestamp()

        await setDoc(doc(db,'users',user.id),formDataCopy)

        localStorage.setItem('loggedIn',JSON.stringify(true))
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)||error.message|| error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login',async(formData, thunkAPI)=>{
    const {email,password} = formData
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password)
        if(userCredential.user){
            localStorage.setItem('loggedIn',JSON.stringify(true))
        }
    } catch (error) {
        const message = 'Wrong login details'
        return thunkAPI.rejectWithValue(message)
    }
})
export const logout = createAsyncThunk('auth/logout',async(thunkAPI)=>{
    try {
        auth.signOut()
        localStorage.removeItem('loggedIn')
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)||error.message|| error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.message = ''
            state.isSuccess= false
            state.isError=false
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(signup.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(signup.rejected,(state,action)=>{
                state.isLoading = false
                state.message = action.error.message
                state.isError = true
            })
            .addCase(signup.fulfilled,(state)=>{
                state.isLoading = false
                state.isSuccess = true
                state.loggedIn = true
            })
            .addCase(logout.fulfilled,(state)=>{
                state.loggedIn = false
            })
            .addCase(login.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state)=>{
                state.isLoading = false
                state.isSuccess = true 
                state.loggedIn = true
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const {reset} = authSlice.actions

export default authSlice.reducer