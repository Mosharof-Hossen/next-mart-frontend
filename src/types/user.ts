export interface IUser {
    email: string;
    hasShop: boolean;
    isActive: boolean;
    name: string;
    role: string;
    userId: string;
    iat?: number;
    exp?: number;
}

