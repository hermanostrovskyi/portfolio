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
    fbID: string;
    title: string;
    url: string;
    fullFirebasePath: string;
}

export interface ISkill {
    fbID: string;
    name: string;
    skillValue: number;
}

export interface IPortfolioItem {
    fbID: string;
    title: string;
    description: string;
    url: string;
    fullFirebasePath: string;
}

export interface IExperience {
    fbID: string;
    place: string;
    position: string;
    responsibility: string;
    periodStart: string;
    periodEnd: string;
}


export interface IDialogProps {
    mode: string;
    submit?: Function;
    populateWith?: ISkill | IExperience| ICertificate | IPortfolioItem;
    data?: string | ICertificate | IPortfolioItem;
}


export interface IDialogOptions {
    componentName: string;
    properties: IDialogProps;
}
