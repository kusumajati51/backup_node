<template>
  <v-col class="overflow-x-auto" style="width: 100%;">
    <v-img class="mb-4" contain height="157"
      src="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle.svg"></v-img>
    <v-form>
      <v-text-field color="blue" prepend-inner-icon="mdi-account-outline" v-model="username" rounded="lg" label="Email"
        variant="outlined" density="comfortable"></v-text-field>
      <v-text-field color="blue" prepend-inner-icon="mdi-email-outline" v-model="email" rounded="lg" label="Name"
        variant="outlined" density="comfortable"></v-text-field>
      <v-text-field color="blue" v-model="password" prepend-inner-icon="mdi-lock-outline"
        :type="visiblePassword ? 'text' : 'password'" rounded="lg" label="Password" variant="outlined"
        density="comfortable">
        <template v-slot:append-inner>
          <v-icon class="transition-icon" @click="visiblePassword = !visiblePassword"
            :class="{ 'icon-rotate': visiblePassword }">{{ visiblePassword
              ? 'mdi-eye-off' : 'mdi-eye'
            }}</v-icon>
        </template>
      </v-text-field>
      <v-text-field color="blue" v-model="username" prepend-inner-icon="mdi-lock-outline"
        :type="visibleConfPassword ? 'text' : 'password'" rounded="lg" label="Confirmation Password" variant="outlined"
        density="comfortable">
        <template v-slot:append-inner>
          <v-icon class="transition-icon" @click="visibleConfPassword = !visibleConfPassword"
            :class="{ 'icon-rotate': visibleConfPassword }">{{ visibleConfPassword
              ? 'mdi-eye-off' : 'mdi-eye'
            }}</v-icon>
        </template>
      </v-text-field>
      <v-text-field color="blue" v-model="username" prepend-inner-icon="mdi-phone-outline" rounded="lg"
        label="Phone Number" variant="outlined" density="comfortable"></v-text-field>

      <v-btn block color="primary" size="large" type="submit" variant="tonal" rounded="lg">
        Sign up
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
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    valid: true,
    email: '',
    username: '',
    password: '',
    visiblePassword: false,
    visibleConfPassword: false,

  }),
})
</script>
