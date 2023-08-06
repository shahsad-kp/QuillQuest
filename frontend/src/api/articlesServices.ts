import {AxiosResponse} from "axios";
import {axiosAuthorized, axiosInstance} from "./apiConfigurations.ts";
import {Category, TrendingCategory} from "../types/Category.ts";
import {Article} from "../types/Article.ts";

type ArticlesResponse = {
    count: number, next: number | null, previous: number | null, results: Article[]
}

type ActionResponse = {
    liked: boolean
    blocked: boolean
}


const getCategories = async (): Promise<Category[]> => {
    try {
        const res: AxiosResponse<Category[]> = await axiosInstance.get('articles/categories/');
        return res.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

const getInterests = async (): Promise<Category[]> => {
    try {
        const res: AxiosResponse<Category[]> = await axiosAuthorized.get('user/interests/');
        return res.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

const updateInterestedCategories = async (categories_ids: number[]) => {
    try {
        const data = {
            categories: categories_ids
        }
        await axiosAuthorized.patch('user/interests/update/', data);
    } catch (e) {
        return Promise.reject(e);
    }
}

const getInterestedCategories = async () => {
    try {
        const res: AxiosResponse<TrendingCategory[]> = await axiosAuthorized.get('articles/interested_categories/');
        return res.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

const getInterestedArticles = async (category: string | null, page: number | null) => {
    try {
        const res: AxiosResponse<ArticlesResponse> = await axiosAuthorized.get('articles/', {
            params: {
                category: category, page: page
            }
        });
        return res.data;
    } catch (e) {
        return Promise.reject(e);
    }
}


const fetchArticle = async (id: number): Promise<Article> => {
    try {
        const res: AxiosResponse<Article> = await axiosAuthorized.get(`articles/${id}/`);
        return res.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

const likeArticle = async (id: number) => {
    try {
        const response: AxiosResponse<ActionResponse> = await axiosAuthorized.get(`articles/${id}/like/`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

const blockArticle = async (id: number) => {
    try {
        const response: AxiosResponse<ActionResponse> = await axiosAuthorized.get(`articles/${id}/block/`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

const createArticle = async (title: string, content: string, image: File | null, tags: string[], category: number) => {
    try {
        const data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('image', image as Blob);
        data.append('postTags', JSON.stringify(tags));
        data.append('categoryId', category.toString());
        const response: AxiosResponse<Article> = await axiosAuthorized.post('articles/create/', data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export {
    getCategories,
    getInterests,
    updateInterestedCategories,
    getInterestedCategories,
    getInterestedArticles,
    fetchArticle,
    likeArticle,
    blockArticle,
    createArticle
};