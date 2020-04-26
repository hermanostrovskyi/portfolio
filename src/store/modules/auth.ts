import {IAuthData, IAuthState} from "@/interfaces/interfaces";
import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import axios from 'axios';
import router from "@/router";


@Module({namespaced: true, name: 'test'})
class Auth extends VuexModule {
    public authData: IAuthState = {
        idToken: null,
        userId: null
    }

    // @ts-ignore
    private saveDataToLocalStorage(response) {
        const now: Date = new Date();
        const expirationDate: string = new Date(now.getTime() + response.data.expiresIn * 1000).toDateString();
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('localId', response.data.localId);
    }


    // @Mutation
    // public setName(newName: string): void {
    //     this.name = newName
    // }

    @Action
    public login({commit, dispatch}: any, authData: IAuthData) {
        const uri: string = process.env.VUE_APP_AUTH_URI + '/accounts:signInWithPassword?key=' + process.env.VUE_APP_API_KEY;
        axios.post(uri, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(response => {
                this.saveDataToLocalStorage(response);
                // const now = new Date();
                // const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('localId', response.data.localId);
                commit('authUser', {token: response.data.idToken, userId: response.data.localId});
                // dispatch('setLogoutTimer', response.data.expiresIn);
                router.push('/admin');
                console.log(response);
            })
            .catch(error => console.log(error))
    }
}

// const getters = {};
//
// const mutations = {};
//
//
// const actions: any = {
//     [LOGIN]: ({commit, dispatch}: any, authData: IAuthData) => {
//         axios.post('/accounts:signInWithPassword?key=AIzaSyC3BAzI20UHZgzF3sb7sz1Egyu5rG-jkbo', {
//             email: authData.email,
//             password: authData.password,
//             returnSecureToken: true
//         })
//             .then(response => {
//                 // const now = new Date();
//                 // const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
//                 // localStorage.setItem('token', response.data.idToken);
//                 // localStorage.setItem('expirationDate', expirationDate);
//                 // localStorage.setItem('localId', response.data.localId);
//                 commit('authUser', {token: response.data.idToken, userId: response.data.localId});
//                 // dispatch('setLogoutTimer', response.data.expiresIn);
//                 router.push('/dashboard');
//                 console.log(response);
//             })
//             .catch(error => console.log(error))
//     };
//
//     export default {
//         state,
//         getters,
//         mutations,
//         actions
//     }


export default Auth;
