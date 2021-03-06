import {IAuthData, IAuthState, ILoginData} from "@/interfaces/interfaces";
import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import firebase from "firebase";
import router from "@/router";
import {
    clearJWT,
    getAuthUri,
    getTokenFromLocalStorage,
    getUserIdFromLocalStorage,
    isTokenExpired,
    saveDataToLocalStorage, saveFireBaseUserDataToLocalStorage
} from "@/helper/helperFunctions";
import Store from '../index';

@Module(
    {
        dynamic: true,
        store: Store,
        name: "auth",
        namespaced: true
    }
)
class Auth extends VuexModule {
    public authData: IAuthState = {
        idToken: null,
        userId: null
    }

    get isAuthenticated(): boolean {
        return this.authData.idToken !== null
    }

    get isDemoUser(): boolean {
        return this.authData.userId === '9K1JJLTrYJfRuorMSj4vqpc7YwU2';
    }

    get userData(): IAuthState {
        return this.authData;
    }

    @Mutation
    public authUser(authData: IAuthData) {
        this.authData.idToken = authData.token;
        this.authData.userId = authData.userId;
    }

    @Mutation
    public clearAuthData() {
        this.authData.idToken = this.authData.userId = null;
    }


    @Action
    public login(loginData: ILoginData): void {

        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(response => {
                    console.log(response)
                    saveFireBaseUserDataToLocalStorage(response);
                    this.context.commit('authUser', {token: response.user.refreshToken, userId: response.user.uid});
                    router.push('/admin');
                },
                error => console.log(error)
            )
    }

    @Action
    public tryAutoLogin() {
        const token = getTokenFromLocalStorage();
        if (!token) {
            return;
        }

        const userId = getUserIdFromLocalStorage();
        this.context.commit('authUser', {token, userId});
    }

    @Action
    public logout() {
        clearJWT();
        this.context.commit('clearAuthData');
        router.replace('/');
    }
}


export default Auth;
