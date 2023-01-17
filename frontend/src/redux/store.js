import { configureStore } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
// import {
//     persistReducer,
//     FLUSH,
//     PAUSE,
//     REHYDRATE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist';
// import reducers from './AdminReducer';
import AuthReducer from './features/authSlice'
import AdminReducer from './features/adminSlice'


// const persistConfig = { key: 'root', storage, version: 1 };
// combine the reducesers
// const reducers = combineReducers({ user: userReducer });

// persist local storage
// const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer:{
        auth:AuthReducer,
        admin:AdminReducer
    },
});