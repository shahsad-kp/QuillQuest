import {AxiosResponse} from "axios";
import {axiosAuthorized, axiosInstance} from "./apiConfigurations.ts";
import {Category} from "../types/Category.ts";

const getCategories = async (): Promise<Category[]> => {
    try {
        const res: AxiosResponse<Category[]> = await axiosInstance.get('articles/categories/');
        return res.data;
    }
    catch (e) {
        return Promise.reject(e);
    }
}

const getInterestedCategories = async (): Promise<Category[]> => {
    try {
        const res: AxiosResponse<Category[]> = await axiosAuthorized.get('user/interests/');
        return res.data;
    }
    catch (e) {
        return Promise.reject(e);
    }
}

const updateInteresetedCategories = async (categories_ids: number[]) => {
    try {
        const data = {
            categories: categories_ids
        }
        await axiosAuthorized.patch('user/interests/update/', data);
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export {getCategories, getInterestedCategories, updateInteresetedCategories};