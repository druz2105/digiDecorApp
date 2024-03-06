import {getUserAPI, updateUserAPI} from "../../services/usersAPI";
import {UserResponseInterface, UpdateUserInterface} from "../../services/interfaces/userAPIResponse";
import {create} from "zustand";

interface UserProfileStore {
    user: UserResponseInterface;
    updateUserField: (key: keyof UserResponseInterface, value: string) => void
    getUser: () => Promise<void>
    updateUser: () => Promise<void>
}

export const userProfileStore = create<UserProfileStore>((set, get) => ({
    user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        active: false,
        createdAt: 0
    },
    updateUserField: async (key, value) => {
        return set((prevState) => ({
            user: { ...prevState.user, [key]: value },
        }));
    },
    getUser: async () => {
        const userData = await getUserAPI()
        return set({user: userData})
    },
    updateUser: async () => {
        const userUpdate: UpdateUserInterface = {
            firstName: get().user.firstName || '',
            lastName: get().user.lastName || '',
            email: get().user.email || ''
        }
        const userData = await updateUserAPI(userUpdate)
        set({user: {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                active: userData.active,
                createdAt: userData.createdAt
            }})
    }
}));
