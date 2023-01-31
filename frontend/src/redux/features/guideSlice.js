import { createSlice } from "@reduxjs/toolkit"
import { Guidesignin  } from '../../axios/services/GuideServices'


const guideSlice = createSlice({
    name: "guide",
    initialState: {
        guide: null,
        error: "",
        loading: false
    },  
    reducers:{
        // setGuide:(state, action) => {
        //     state.guide = action.payload;
        // },
        setLogout:(state, action) => {
            localStorage.removeItem("guide");
            state.guide = null;
        },
    },
    extraReducers:{
        [Guidesignin.pending]: (state, action) =>{
            state.loading = true;
        },
        [Guidesignin.fulfilled]: (state,action) =>{
            state.loading = false;
            localStorage.setItem("guide",JSON.stringify({...action.payload}));
            state.guide = action.payload
        },
        [Guidesignin.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});


export const { setGuide, setLogout } = guideSlice.actions;
export default guideSlice.reducer;