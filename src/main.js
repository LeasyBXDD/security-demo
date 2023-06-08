import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(router)

app.use(Antd).mount('#app');