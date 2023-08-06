import {AxiosResponse} from "axios";
import {axiosAuthorized, axiosInstance} from "./apiConfigurations.ts";
import {Category, TrendingCategory} from "../types/Category.ts";

const getCategories = async (): Promise<Category[]> => {
    try {
        const res: AxiosResponse<Category[]> = await axiosInstance.get('articles/categories/');
        return res.data;
    }
    catch (e) {
        return Promise.reject(e);
    }
}

const getInterests = async (): Promise<Category[]> => {
    try {
        const res: AxiosResponse<Category[]> = await axiosAuthorized.get('user/interests/');
        return res.data;
    }
    catch (e) {
        return Promise.reject(e);
    }
}

const updateInterestedCategories = async (categories_ids: number[]) => {
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

const getInterestedCategories = async () => {
    try{
        const res: AxiosResponse<TrendingCategory[]> = await axiosAuthorized.get('articles/interested_categories/');
        return res.data;
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export {getCategories, getInterests, updateInterestedCategories, getInterestedCategories};