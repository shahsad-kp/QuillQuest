import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../types/user.ts";

const initialState = {
    user: null as User | null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {login, logout, updateUser} = authSlice.actions;
export default authSlice.reducer;