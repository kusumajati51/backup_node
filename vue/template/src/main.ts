/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import './styles/text.scss'
import './styles/form.scss'
import './styles/bg_custom.scss'
import './styles/toolbar/bg_top.scss'
// import './styles/settings.scss'
import "@/styles/transition/icon_transition.scss"
const app = createApp(App)

registerPlugins(app)

app.mount('#app')
