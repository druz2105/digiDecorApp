import {Axios, throwResponseError} from "../utils/axios";
import {UserLoginInterface, UserRegisterInterface} from "./interfaces/userAPIRequest";
import {
    CreateUserResponseInterface,
    UserResponseInterface,
    LoginResponseInterface, UpdateUserInterface
} from "./interfaces/userAPIResponse";
import {getSecureStorageData} from "../utils/secureStorage";

export const createUserAPI = async (data: UserRegisterInterface):Promise<CreateUserResponseInterface> => {
    try {
        const response = await Axios.post(`/api/v1/user/register`, data);
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}


export const loginUserAPI = async (data: UserLoginInterface):Promise<LoginResponseInterface> => {
    try {
        const response = await Axios.post(`/api/v1/user/login`, data);
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}

export const getUserAPI = async ():Promise<UserResponseInterface> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.get(`/api/v1/user`, {headers: headers});
        return response.data;
    } catch (err) {
        throwResponseError(err);
    }
}

export const updateUserAPI = async (data: UpdateUserInterface):Promise<UserResponseInterface> => {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.patch(`/api/v1/user`, data,{headers: headers});
        return response.data;
    } catch (err) {
        throwResponseError(err);
    }
}

export const verifyUserAPI = async (token: string)=> {
    try {
        const token = await getSecureStorageData("userAuthToken")
        const headers = {
            "Authorization": `JWT ${token}`,
            'Content-Type': 'application/json',
        }
        const response = await Axios.post(`/api/v1/user/verify`, {headers: headers});
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}