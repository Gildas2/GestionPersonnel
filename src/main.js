// main.js
import { createApp,h } from 'vue';
import router from './router';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap';
import 'popper.js';
import 'jquery';
import $ from "jquery";
window.$ = $;
import axios from './Plugins/axios.js'; 

const app  = createApp({
    render: ()=>h(App)
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.config.globalProperties.$axios = axios; 
app.use(router);
app.use(pinia);
app.mount('#app');
