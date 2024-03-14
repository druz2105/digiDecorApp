import axios, {AxiosError, AxiosInstance} from 'axios';
import {cleanEnv} from "../config/env";
import {getSecureStorageData} from "./secureStorage";

export function throwResponseError(errorData: any): never {
    let errorMsg: string = ((errorData as AxiosError).response?.data as any)?.message;
    let errorCode: string | undefined = ((errorData as AxiosError).response?.data as any)?.errorCode;

    if (!errorMsg) errorMsg = 'Something went wrong';
    if (!errorCode) errorCode = 'generalError';

    const error = new Error(errorMsg) as any;
    error.errorCode = errorCode;

    throw error;
}

export const Axios: AxiosInstance = axios.create({
    baseURL: `${cleanEnv.API_URL || 'http://192.168.2.88:3000'}`,
});