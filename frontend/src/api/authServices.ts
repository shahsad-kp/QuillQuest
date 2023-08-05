import {axiosInstance} from "./apiConfigurations.ts";
import {AxiosResponse} from "axios";
import {User} from "../types/User.ts";
import {store} from "../redux/store.ts";
import {login as loginUser} from "../redux/authSlice/authSlice.ts";

type loginCredentials = {
    email?: string,
    phone?: string,
    password: string
}

type loginResponse = {
    access: string,
    refresh: string
    user: User
}

const login = async ( password: string, email?: string, phone?: string): Promise<User> => {
    const data: loginCredentials = {
        password,
        email,
        phone
    }
    let res: AxiosResponse<loginResponse>;
    try {
        res = await axiosInstance.post('auth/login/', data);
    }
    catch (e) {
        return Promise.reject(e);
    }
    const {access, refresh, user} = res.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    store.dispatch(loginUser(user));
    return user;
}

const register = async (user: User): Promise<User> => {
    const res: AxiosResponse<loginResponse> = await axiosInstance.post('auth/register/', user);
    const {access, refresh, user: newUser} = res.data;
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    store.dispatch(loginUser(newUser));
    return newUser;
}

export {login, register};