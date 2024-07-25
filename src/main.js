import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap';
import 'popper.js';
import 'jquery';
import $ from "jquery";
window.jQuery=$;
window.$=$; 

const app = createApp(App)
app.use(router)
app.mount('#app')
