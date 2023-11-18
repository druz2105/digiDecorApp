import {create} from 'zustand';
import {loginUser} from "../../services/usersAPI";
import {UserLoginInterface} from "../../services/interfaces/userAPIRequest";
import {LoginResponseInterface} from "../../services/interfaces/userAPIResponse";

interface LoginStore {
    email: string;
    password: string;
    setField: (field: string, value: string) => void;
    resetLoginStore: () => void;
    loginRequest: () => Promise<LoginResponseInterface>;
}

export const useLoginStore = create<LoginStore>((set, get) => ({
    email: '',
    password: '',
    resetLoginStore: () => set({email: '', password: ''}),
    setField: (field, value) => set({ [field]: value }),
    loginRequest: async () => {
        const data: UserLoginInterface = {
            email: get().email,
            password: get().password,
        }
        try {
            return await loginUser(data)
        } catch (e) {
            throw e
        }
    },
}));