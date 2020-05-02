import firebase from "firebase";
import {ICertificate, IExperience, ISkill} from "@/interfaces/interfaces";
import Database = firebase.database.Database;

export function saveDataToLocalStorage(response: any): void {
    const now: Date = new Date();
    const expirationDate: Date = new Date(now.getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', String(expirationDate));
    localStorage.setItem('localId', response.data.localId);
}

export function saveFireBaseUserDataToLocalStorage(response: any) {
    localStorage.setItem('token', response.user.refreshToken);
    localStorage.setItem('localId', response.user.uid);
}

export function getAuthUri(): string {
    return process.env.VUE_APP_AUTH_URI + '/accounts:signInWithPassword?key=' + process.env.VUE_APP_API_KEY;
}

export function getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
}

export function getUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('localId');
}

export function isTokenExpired(): boolean {
    const expirationDateInLocalStorage: string | null = localStorage.getItem('expirationDate');
    if (expirationDateInLocalStorage) {
        const expirationDate: Date = new Date(expirationDateInLocalStorage);
        const now: Date = new Date();
        return now >= expirationDate;
    }
    return true;
}

export function clearJWT(): void {
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token')
}


export function getFirebaseDB(): Database {
    return firebase.database();
}


export function retrieveData(fetchedData: any): IExperience[] | ISkill[] | ICertificate[] {
    if (fetchedData) {
        const response: IExperience[] | ISkill[] | ICertificate[] = [];
        for (const key in fetchedData) {
            fetchedData[key].fbID = key;
            response.push(fetchedData[key]);
        }

        return response;
    }
}
