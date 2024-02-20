import {create} from "zustand";
import {verifyUserAPI} from "../../services/usersAPI";
import {deleteSecureStorageData, getSecureStorageData} from "../../utils/secureStorage";

type AuthStore = {
    token? : string | null;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    authenticateUser: () => Promise<boolean>;
};

const AuthState = {
    token: '',
    isAuthenticated: false
};

export const authStore = create<AuthStore>()((set)=> {
    return {
        ...AuthState,
        setIsAuthenticated:(value: boolean) => set({isAuthenticated : value }),
        authenticateUser: async () => {
            const token = await getSecureStorageData('userAuthToken');
            if (token) {
                try {
                    await verifyUserAPI(`JWT ${token}`);
                    set({token: token, isAuthenticated: true});
                    return true
                } catch (err) {
                    await deleteSecureStorageData('userAuthToken')
                    set({token: undefined, isAuthenticated: false});
                    return false
                }
            } else {
                set({token: undefined, isAuthenticated: false});
                return false
            }
        },
    };
})