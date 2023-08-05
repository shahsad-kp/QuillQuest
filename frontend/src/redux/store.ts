import {configureStore} from '@reduxjs/toolkit'
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userReducer from './authSlice/authSlice.ts';

const persistConfig={
    key:'root',
    storage
}
const persistUserReducer = persistReducer(persistConfig,userReducer)

export const store = configureStore({
    reducer:{
        auth:persistUserReducer,
    }
})
export const persistor = persistStore(store)