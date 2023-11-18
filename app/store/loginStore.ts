import {create} from 'zustand';

interface LoginStore {
    email: string;
    password: string;
    setField: (field: string, value: string) => void;
    login: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
    email: '',
    password: '',
    setField: (field, value) => set({ [field]: value }),
    login: () => {
        // Implement your login logic here
        // You can access the state using get() if needed

    },
}));