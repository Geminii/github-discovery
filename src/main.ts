import { createApp, h } from 'vue';
import router from '@/router'
import App from './App.vue';
import './style/index.scss';

createApp({
  render: () => h(App)
})
.use(router)
.mount('#app');
