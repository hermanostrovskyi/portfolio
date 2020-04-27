<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="secondary" dark flat>
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-email"
                                    type="text"
                                    v-model="loginData.email"
                            />

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="loginData.password"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="secondary" @click="login(loginData)">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import {ILoginData} from "@/interfaces/interfaces";
    import {namespace} from "vuex-class";
    const auth = namespace('Auth');

    @Component
    export default class Login extends Vue {
        loginData: ILoginData = {
            email: '',
            password: ''
        }

        @auth.Action
        public login!: (loginData: ILoginData) => void


    }
</script>
