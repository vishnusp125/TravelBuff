import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer,FLUSH,PAUSE,REHYDRATE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import reducers from './Reducers';


const persistConfig = { key: 'persist-key', storage, version: 1 };
// combine the reducesers
// const reducers = combineReducers({ user: userReducer });

// persist local storage
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});