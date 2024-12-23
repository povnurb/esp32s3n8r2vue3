import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/css/style.css';
import Toast,{PluginOptions, POSITION} from 'vue-toastification';
import 'vue-toastification/dist/index.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueApexCharts from 'vue3-apexcharts';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
//configuraciones del toastification
const toastOptions: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
}

app.use(Toast, toastOptions);
app.use(VueSweetalert2);
app.use(pinia);
app.use(router).mount('#app');
app.use(VueApexCharts);
