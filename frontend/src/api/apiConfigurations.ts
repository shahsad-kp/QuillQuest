import axios from "axios";
import {store} from "../redux/store.ts";
import {logout} from "../redux/authSlice/authSlice.ts";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosAuthorized = axios.create({
    baseURL: baseURL
});

const axiosInstance = axios.create({
    baseURL: baseURL
});

axiosAuthorized.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

axiosAuthorized.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const access = await refreshToken();
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return await axiosAuthorized(originalRequest);
            } catch (error_1) {
                return await Promise.reject(error_1);
            }
        }
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    try{
        const res = await axiosInstance.post(
        'auth/refresh/',
        {
                refresh: localStorage.getItem('refreshToken')
            }
        )
        const {access} = res.data;
        localStorage.setItem('accessToken', access);
        return access
    }
    catch (e) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        store.dispatch(logout())
        return Promise.reject(e);
    }
}
export {axiosAuthorized, axiosInstance, refreshToken};