import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DataSnapshot = firebase.database.DataSnapshot;
import {ISkill} from "@/interfaces/interfaces";

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

export function generateID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function formatDate(date: Date): string {
    if (!date) {
        return null;
    }

    const dateInStringFormat: string = date.toISOString().substr(0, 10);

    const [year, month] = dateInStringFormat.split('-')
    return `${year}-${month}`;
}


export function getFirebaseDB() {
    return firebase.database();
}

export function retrieveSkills(fetchedSkills: any): ISkill[] {
    if (fetchedSkills) {
        const skills: ISkill[] = [];
        for (const key in fetchedSkills) {
            fetchedSkills[key].fbID = key;
            skills.push(fetchedSkills[key]);
        }

        return skills;
    }
}
