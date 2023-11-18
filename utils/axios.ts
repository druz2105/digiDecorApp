import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import env from "../config/env";


export function isAxiosResponse(response: any): response is AxiosResponse {
    return response && response.data !== undefined;
}

export function throwResponseError(response: any): never {
    let errorMsg: string = ((response as AxiosError).response?.data as any)?.message;
    let errorCode: string | undefined = ((response as AxiosError).response?.data as any)?.errorCode;

    if (!errorMsg) errorMsg = 'Something went wrong';
    if (!errorCode) errorCode = 'generalError';

    const error = new Error(errorMsg) as any;
    error.errorCode = errorCode;

    throw error;
}

export const Axios: AxiosInstance = axios.create({
    baseURL: `${env.REACT_APP_API_URL || 'http://localhost:3000'}`,
});