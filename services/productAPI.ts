import {Axios, throwResponseError} from "../utils/axios";
import {CategoriesListAPIResponse} from "./interfaces/product-interface";

export const getAllCategories = async ():Promise<Array<CategoriesListAPIResponse>> => {
    try {
        const response = await Axios.get(`/api/v1/categories`);
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}

export const getProductByCategory = async ():Promise<Array<Record<string, string>>> => {
    try {
        const response = await Axios.get(`/api/v1/product/getby/categoryl̥`);
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}