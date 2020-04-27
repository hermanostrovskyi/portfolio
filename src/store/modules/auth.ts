import {IAuthData, IAuthState, ILoginData} from "@/interfaces/interfaces";
import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import axios from 'axios';
import router from "@/router";
import {
    clearJWT,
    getAuthUri,
    getTokenFromLocalStorage,
    getUserIdFromLocalStorage,
    isTokenExpired,
    saveDataToLocalStorage
} from "@/helper/loginHelper";

@Module({namespaced: true})
class Auth extends VuexModule {
    public authData: IAuthState = {
        idToken: null,
        userId: null
    }

    get isAuthenticated(): boolean {
        return this.authData.idToken !== null
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
        const uri: string = getAuthUri();
        axios.post(uri, {
            email: loginData.email,
            password: loginData.password,
            returnSecureToken: true
        })
            .then(response => {
                saveDataToLocalStorage(response);
                this.context.commit('authUser', {token: response.data.idToken, userId: response.data.localId});
                // dispatch('setLogoutTimer', response.data.expiresIn);
                router.push('/admin');
                console.log(response);
            })
            .catch(error => console.log(error))
    }

    @Action
    public tryAutoLogin() {
        const token = getTokenFromLocalStorage();
        if (!token) {
            return;
        }
        if (isTokenExpired()) {
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
