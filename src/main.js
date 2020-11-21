import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueFileAgent from 'vue-file-agent';
import axios from 'axios'

Vue.use(VueFileAgent);

Vue.config.productionTip = false;

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
  console.log('token get');
  axios.get(
    "http://localhost:3300/api/token",
    {
      headers: {
        'Authorization': localToken
      }
    })
    .then((res) => {
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