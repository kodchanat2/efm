import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import i18n from '@/locales'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import VueJsonPretty from 'vue-json-pretty';
import 'vue3-toastify/dist/index.css';
import 'vue-json-pretty/lib/styles.css';

const toastifyOptions: ToastContainerOptions = {
  // type: "default",
  // position: "top-right",
  theme: "light",
  pauseOnFocusLoss: false,
  dangerouslyHTMLString: true
};

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(Vue3Toastify, toastifyOptions)
  .use(autoAnimatePlugin)
  .component('VueJsonPretty', VueJsonPretty)
  .mount('#app')
