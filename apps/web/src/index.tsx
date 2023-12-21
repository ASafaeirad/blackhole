// eslint-disable-next-line import/no-unresolved
import 'uno.css';
import '@unocss/reset/eric-meyer.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#root');
