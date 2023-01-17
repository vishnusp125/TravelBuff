import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import * as api from '../api'

export const adminlogin = createAsyncThunk("admin/login", async({ formValue, navigate, toast },{rejectWithValue}) => {
    try {
        const response = await api.adminsignIn(formValue)
        toast.success("Login Successfully");
        navigate('/admindash')
        return response.data;

    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

export const getUsers = createAsyncThunk("admin/getUsers", 
async(_,{rejectWithValue}) => {
    try {
        const response = await api.getUsers()
        return response.data;

    } catch (err) {
        console.log('in errorrr');
        return rejectWithValue(err.response.data)
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        error: "",
        loading: false
    },
    reducers:{
        setAdmin:(state, action) => {
            state.admin = action.payload;
        },
        setLogout:(state, action) => {
            localStorage.clear();
            state.admin = null;
        },
    },
    extraReducers:{
        [adminlogin.pending]: (state, action) =>{
            state.loading = true;
        },
        [adminlogin.fulfilled]: (state,action) =>{
            state.loading = false;
            localStorage.setItem("admin",JSON.stringify({...action.payload}));
            state.admin = action.payload
        },
        [adminlogin.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getUsers.pending]: (state, action) =>{
            state.loading = true;
        },
        [getUsers.fulfilled]: (state,action) =>{
            state.loading = false;
            state.user = action.payload;
        },
        [getUsers.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

    },
});


export const { setAdmin, setLogout } = adminSlice.actions;
export default adminSlice.reducer;