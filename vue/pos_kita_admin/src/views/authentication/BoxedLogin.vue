<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
import api from '@/axios';
import { router } from '@/router';
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <div class="boxed-auth-wrap">
                        <v-card rounded="xl" elevation="10" class="px-sm-1 px-0 mx-auto index-2" max-width="450">
                            <v-card-item class="pa-sm-8">
                                <div class="d-flex justify-center mb-5">
                                    <Logo />
                                </div>
                                <!-- <div class="text-h6 text-medium-emphasis text-center mb-6">Your Social Campaigns</div> -->
                                <LoginForm @login="handleLogin" />
                                <h6 class="text-subtitle-1 text-grey100 d-flex justify-center align-center mt-3">
                                    New to Spike?
                                    <v-btn class="pl-0 text-primary text-body-1 font-weight-medium opacity-1 pl-2"
                                        height="auto" to="/auth/register" variant="plain">Create an account</v-btn>
                                </h6>
                            </v-card-item>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" color="error" multi-line>
            {{ text }}

            <template v-slot:actions>
                <v-btn color="red" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script lang="ts">
import { te } from 'date-fns/locale';
export default {
    data: () => ({
        snackbar: false,
        text: '',
    }),

    methods: {
        handleLogin(loginData: any) {
            api.post('auth/login', loginData)
                .then((response: any) => {
                    // console.log(response.token);
                    localStorage.setItem('token', response.data.token);
                    router.push('/shop');
                })
                .catch((error) => {
                    var responseError = error.response.data;
                    this.text = responseError.message;
                    this.snackbar = true
                });
        }
    }
};
</script>
