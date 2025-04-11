<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainView from './Main.vue';
import { mapState, mapActions } from 'pinia';
import { useErrorStore } from '@/store/errorStore';
</script>

<template>
    <v-locale-provider>
        <v-app>
            <MainView />
            <v-main>
                <v-container fluid class="page-wrapper bg-background px-sm-5 px-4  pt-12 rounded-xl">
                    <v-alert v-if="errorMessage" type="error" dismissible @input="clearError" class="mb-4">
                        <div>{{ errorMessage }}</div>
                        <ul v-if="errorDetails.length">
                            <li v-for="(detail, index) in errorDetails" :key="index">{{ detail }}</li>
                        </ul>
                    </v-alert>
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<script lang="ts">
export default {
    computed: {
        ...mapState(useErrorStore, ['errorMessage', 'errorDetails']), // Map Pinia state
    },
    methods: {
        ...mapActions(useErrorStore, ['clearError']), // Map Pinia action
    },
    watch: {
        // Clear the error when the route changes
        $route() {
            this.clearError();
        },
    },
}
</script>

