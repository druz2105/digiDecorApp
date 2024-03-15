import {Axios, throwResponseError} from "../utils/axios";
import {CategoriesListAPIResponse} from "./interfaces/product-interface";
import {getSecureStorageData} from "../utils/secureStorage";

export const getAllCategories = async ():Promise<Array<CategoriesListAPIResponse>> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.get(`/api/v1/categories`, {headers: headers});
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}

export const getProductByCategory = async (categoryId: string):Promise<Array<Record<string, string>>> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.get(`/api/v1/product/get/all?categoryId=${categoryId}`, {headers: headers});
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}

export const getProductById = async (id: string):Promise<Record<string, string>> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.get(`/api/v1/product/${id}`, {headers: headers});
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}

export const likeProductById = async (productId: string):Promise<Record<string, string>> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.post(`/api/v1/product/like`, {"productId": productId}, {headers: headers});
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}

export const unlikeProductById = async (productId: string):Promise<Record<string, string>> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.post(`/api/v1/product/unlike`, {"productId": productId}, {headers: headers});
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}