import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios'
import NProgress from 'nprogress'

Vue.config.productionTip = false;

// Configure NProgress
NProgress.configure({
  speed: 200,
  showSpinner: false,
});

/**
 * Initialize Vue application
 */
function init() {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

const localToken = localStorage.getItem('token');

// If token exists in localStorage, validate token with API
// Otherwise, just init Vue app
if (localToken) {
  axios.get(
    "http://apig9.toedu.me/api/token",
    {
      headers: {
        'Authorization': localToken
      }
    })
    .then((res) => {
      axios.defaults.headers.common['Authorization'] = localToken;
      store.commit('auth/setUser', res.data.user);
    })
    .catch((e) => {
      console.log(e);
      localStorage.removeItem('token');
    })
    .finally(() => {
      init();
    })
} else {
  init();
}