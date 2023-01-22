import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice'
import AdminReducer from './features/adminSlice'


export default combineReducers({
        auth:AuthReducer,
        admin:AdminReducer
});