import {create} from 'zustand';
import {createUser} from "../../services/usersAPI";
import {UserRegisterInterface} from "../../services/interfaces/userAPIRequest";

interface RegistrationStore {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    gender: string;
    setField: (field: string, value: string) => void;
    handleRegister:  () => void;
}

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    setField: (field, value) => set({ [field]: value }),
    handleRegister: async () => {
        const emailSplit = get().email.split('@')
        const data: UserRegisterInterface = {
            email: get().email,
            username: emailSplit[0],
            firstName: get().firstName,
            lastName: get().lastName,
            password: get().password,
        }
        try{
            await createUser(data)
        } catch (e) {
            console.log(e)
        }
    },
}));