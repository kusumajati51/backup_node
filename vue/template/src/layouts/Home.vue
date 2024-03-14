<template>
    <v-layout class="fill-height overflow-y-auto">
        <v-navigation-drawer class="rcorners2 ml-sm-5 mt-sm-5 bg-containerBg" elevation="10" v-model="rail"
            base-color="white" v-navigation-drawer>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider"
                base-color="white" nav>
                <!-- <template v-slot:append>
                    <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                </template> -->
            </v-list-item>

            <v-divider class="border-opacity-50" :thickness="1" color="#ffffff"></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" base-color="white" />
                <v-list-item prepend-icon="mdi-account" title="My Account" value="account" base-color="white" />
                <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" base-color="white" />
            </v-list>
        </v-navigation-drawer>
        <div class="container verticalLayout">
            <v-app-bar>
                <div class="d-flex align-center justify-space-between w-100">
                    <div>
                        <v-btn icon="mdi-bell-outline" color="black" />
                        <v-btn icon="mdi-menu" color="black" @click="rail = !rail" size="small" />
                    </div>
                </div>
                <profile-menu />
            </v-app-bar>
        </div>
        <!-- <div class="container verticalLayout">
            <div class="maxWidth">
                <v-app-bar elevation="0" height="70">
                    <div class="d-flex align-center justify-space-between w-100">
                        <div>
                            <v-btn icon="mdi-bell-outline" color="white"/>
                            <v-btn icon="mdi-menu" color="white" @click="rail = !rail" size="small"/>
                        </div>
                        <div>
                         
                            <profile-menu/>
                        </div>
                    </div>
                </v-app-bar>
            </div>
        </div> -->
        <v-main>
            <v-container>
                <v-sheet :elevation="15" :height="200" :width="200">
                    ksmdlkasmdlkas
                </v-sheet>

            </v-container>
        </v-main>
    </v-layout>
</template>

<script lang="ts">
import ProfileMenu from '@/components/ProfileMenu.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            drawer: true,
            rail: true,
        };
    },
    components: { ProfileMenu }
})
</script>


<!-- 
<style>
.bg-draw-grad {
    position: relative;
    top: 0;
    left: 0;
    background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
    height: 100%;
}</style> -->