export interface User {
    name: string;
    email: string;
    hashed_password: string;
    salt: string;
    _id: string;
    _password: string;
}