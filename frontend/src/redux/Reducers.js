import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice'
import AdminReducer from './features/adminSlice'
import GuideReducer from '../redux/features/guideSlice'


export default combineReducers({
        auth:AuthReducer,
        admin:AdminReducer,
        guide:GuideReducer
});



