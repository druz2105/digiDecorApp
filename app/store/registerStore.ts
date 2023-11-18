import {create} from 'zustand';
import {createUser} from "../../services/usersAPI";
import {UserRegisterInterface} from "../../services/interfaces/userAPIRequest";
import {CreateUserResponseInterface} from "../../services/interfaces/userAPIResponse";

interface RegistrationStore {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    setField: (field: 'email' | 'firstName' | 'lastName' | 'password' | 'confirmPassword', value: string) => void;
    resetRegistrationStore: () => void;
    registerUser:  () => Promise<CreateUserResponseInterface>;
}

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    resetRegistrationStore: () => set({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        }),
    setField: (field, value) => set({ [field]: value }),
    registerUser: async () => {
        const data: UserRegisterInterface = {
            email: get().email,
            firstName: get().firstName,
            lastName: get().lastName,
            password: get().password,
        }
        try{
            return  await createUser(data)
        } catch (e) {
            throw e
        }
    },
}));