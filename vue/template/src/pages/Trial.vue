<template>
  <div id="app">
      <v-app>
          <v-container fluid pa-0>
              <v-row align="center" justify="center"
                  style="height:100vh" dense>
                  <v-col cols="12" lg="6" md="6" class="grey lighten-2 fill-height d-flex flex-column justify-center align-center">
                      <v-card flat tile>
                          <v-card-text>Card #1</v-card-text>
                      </v-card>
                  </v-col>
              </v-row>
          </v-container>
      </v-app>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

})
</script>
