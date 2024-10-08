export interface CreateUserResponseInterface {
    _id: string;
    active: boolean;
    createdAt: number;
    email: string;
    firstName: string;
    lastName: string
}

export interface LoginResponseInterface extends CreateUserResponseInterface{
    jwtToken: string
}

export interface UserResponseInterface {
    _id?: string;
    active?: boolean;
    createdAt?: number
    email?: string
    firstName?: string
    lastName?: string
}

export interface UpdateUserInterface {
    email: string;
    firstName: string;
    lastName: string
}