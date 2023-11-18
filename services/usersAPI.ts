import {Axios, throwResponseError} from "../utils/axios";
import {UserLoginInterface, UserRegisterInterface} from "./interfaces/userAPIRequest";
import {CreateUserResponseInterface, LoginResponseInterface} from "./interfaces/userAPIResponse";

export const createUser = async (data: UserRegisterInterface):Promise<CreateUserResponseInterface> => {
    try {
        const response = await Axios.post(`/api/v1/user/register`, data);
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}


export const loginUser = async (data: UserLoginInterface):Promise<LoginResponseInterface> => {
    try {
        const response = await Axios.post(`/api/v1/user/login`, data);
        return response.data;

    } catch (err) {
        throwResponseError(err);
    }
}