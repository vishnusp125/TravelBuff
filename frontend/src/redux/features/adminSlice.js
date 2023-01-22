import { createSlice } from "@reduxjs/toolkit"
import { adminlogin } from '../../axios/services/AdminServices'


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
            localStorage.removeItem("admin");
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
    },
});


export const { setAdmin, setLogout } = adminSlice.actions;
export default adminSlice.reducer;