export interface UserRegisterInterface {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string
}


export interface UserLoginInterface {
    email: string
    password: string
}