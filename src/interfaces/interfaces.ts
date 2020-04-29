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

export interface ICertificate {
    id: number;
    title: string;
    url: string;
}

export interface ISkill {
    id: number;
    name: string;
    skillValue: number;
}

export interface IPortfolioItem {
    id: number;
    description: string;
    url: string;
}

export interface IWorkExperienceRecord {
    id: number;
    work: string;
    period: string;
}
