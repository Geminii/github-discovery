import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import router from '@/router'
import apolloClient from '@/graphql/config';
import App from './App.vue';
import './style/index.scss';

createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient
    });
  },
  render: () => h(App)
})
.use(router)
.mount('#app');
