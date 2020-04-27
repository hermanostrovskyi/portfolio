export interface IAdminMenuItem {
    title: string;
    icon: string;
}

export interface IAuthState {
    idToken: string | null;
    userId: string | null;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IAuthData {
    token: string;
    userId: string;
}

