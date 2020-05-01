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
    fbID: string;
    name: string;
    skillValue: number;
}

export interface IPortfolioItem {
    id: number;
    description: string;
    url: string;
}

export interface IWorkExperienceRecord {
    id: string;
    place: string;
    position: string;
    responsibility: string;
    periodStart: Date;
    periodEnd: Date;
}
