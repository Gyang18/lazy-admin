import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// setting
import './setting';

// styles
import './styles';

// plugins
import './plugins';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
