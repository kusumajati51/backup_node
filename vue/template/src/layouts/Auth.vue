<template>
  <v-container style="position: relative; top: 0; left: 0; 
  background-color: #21D4FD; background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%); 
  height: 100%;" fluid>
    <v-row class="d-flex align-center" style="height: 100vh" fill-height>
      <v-col class="d-none d-xxl-block d-xl-block d-lg-block d-md-block ">
        <v-col class="fill-height " style=" height: 100%;">
          <v-col>
            <v-card-title class="text-white text-center text-h6 text-md-h5 text-lg-h4 font-weight-bold"
              style="white-space: pre-line; margin-bottom: 1cm;">
              <p>
                Welcome
              </p>
            </v-card-title>
            <v-img src="@/assets/image/auth/lady_login.svg" style="
                           top: 0; left: 0; 
                           height: 100%;" />
            <v-container>
              <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                  <v-btn class="text-white justify-center" density="comfortable" :ripple="false" @click="changePage"
                    color="black" align-self="center" size="large" variant="plain">{{
                      $route.meta.link_text }}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-col>
      </v-col>
      <v-col class="d-flex justify-center">
        <v-card class="my-card-form" rounded="xl" elevation="10">
          <v-row class="d-flex">
            <v-col>
              <v-container class="fill-height">
                <v-row justify="center" align="center">
                  <v-col>
                    <router-view v-slot="{ Component }" class="align-center" style="width: 100%;">
                      <transition name="slide-x-reverse-transition" mode="out-in">
                        <component :is="Component" />
                      </transition>
                    </router-view>

                  </v-col>
                </v-row>
                <v-container class="d-lg-none">
                  <v-row align="center" justify="center">
                    <v-col class="text-center" cols="12">
                      <v-btn class="text-black justify-center" density="comfortable" :ripple="false" @click="changePage"
                        color="black" align-self="center" size="large" variant="plain">{{
                          $route.meta.link_text }}</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <slot />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    console.log(this.$vuetify.display)

  },
  data: function () {
    return {

    }
  },
  methods: {
    changePage() {
      var link = this.$route.meta.link as string;
      this.$router.push(link);
    }
  }
})
</script>

<style>
.b {
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
}
</style>
