<template>
  <v-col class="overflow-x-auto" style="width: 100%;">
    <v-img contain height="190" style="margin-bottom: 2ch;"
      src="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle.svg"></v-img>
    <v-form>

      <v-text-field color="blue" type="email" v-model="email" prepend-inner-icon="mdi-email-outline" rounded="lg"
        label="Email" variant="outlined" density="comfortable"></v-text-field>
      <div class="d-flex align-center justify-end">
        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a>
      </div>
      <v-text-field color="blue" v-model="password" prepend-inner-icon="mdi-lock-outline"
        :type="visible ? 'text' : 'password'" rounded="lg" label="Password" variant="outlined" density="comfortable">
        <template v-slot:append-inner>
          <v-icon class="transition-icon" @click="visible = !visible" :class="{ 'icon-rotate': visible }">{{ visible
            ? 'mdi-eye-off' : 'mdi-eye'
          }}</v-icon>
        </template>
      </v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
          hours. If you must login now, you can also click "Forgot login password?" below to reset the login
          password.
        </v-card-text>
      </v-card>


      <v-btn block color="primary" size="large" type="submit" variant="tonal" rounded="lg">
        Sign In
      </v-btn>

      <div class="my-6 divider">
        <p class="mx-4  text-center ">
          <v-divider vertical />Or Login With
        </p>
      </div>

      <div class="text-center mt-4">
        <v-btn class="ma-2" color="indigo" icon="mdi-facebook"></v-btn>
        <v-btn class="mx-2" icon="mdi-google" outlined></v-btn>
      </div>
    </v-form>
  </v-col>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';



export default defineComponent({
  data: () => ({
    valid: true,
    email: '',
    password: '',
    visible: false,
  }),
  props: {},
  methods: {
    validate() {
      console.log("ok");
    },
  },
})
</script>
