/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { md3 } from "vuetify/blueprints";
// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    black: "#000000",
    primary: "#6200EE",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    text_white: "#FFFFFF",
  },
};

const light = {
  colors: {
    primary: "#1867C0",
    // primary: '#1266f1',
    secondary: "#5CBBF6",
  },
};
export default createVuetify({
  theme: {
    themes: {
      light,
    },
  },
  blueprint: md3,
});
