import {Axios, isAxiosResponse, throwResponseError} from "../utils/axios";
import {UserRegisterInterface} from "./interfaces/userAPIRequest";
import {CreateUserResponseInterface} from "./interfaces/userAPIResponse";

export const createUser = async (data: UserRegisterInterface):Promise<CreateUserResponseInterface> => {
    const response = await Axios.post(`/api/v1/user/register`, data);
    if (isAxiosResponse(response)) return response.data;
    throwResponseError(response);
}