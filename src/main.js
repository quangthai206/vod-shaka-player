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

function redirectFromMainApp() {
  var url = window.location;
  this.sid = new URLSearchParams(url.search).get("sid");
  if (
    url.pathname === "/redirect" &&
    this.sid !== null &&
    this.sid !== ""
  ) {
    return true;
  }
  return false;
}

if (redirectFromMainApp()) {
  // Clear localStorage
  window.localStorage.clear();

  // Get token based on sid
  axios
    .get(
      `http://api.toedu.me/api/Intergrates/token?sid=${this.sid}`
    )
    .then((result) => {
      if (result.data.code == 401) {
        window.location.href = "http://toedu.me/";
      } else if (result.data.code == 200) {
        window.localStorage.setItem("x-token", result.data.data.token);
      } else {
        window.location.href = "http://toedu.me/";
      }
    })
    .catch((err) => {
      console.log(err);
      window.location.href = "http://toedu.me/";
    });
} else {
  const token = window.localStorage.getItem("x-token");
  if (token !== null && typeof token !== undefined && token !== "") {

    const reqContent = {
      method: "get",
      url: "http://api.toedu.me/api/Intergrates/users/me",
      headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
      },
    };
    axios(reqContent)
      .then((result) => {
        if (result.status == 200) {
          axios.post('http://apig9.toedu.me/api/getInfo', { email: result.data.data.email })
            .then((res) => {
              console.log(res.data);
            })
        } else {
          window.location.href = "http://toedu.me/";
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "http://toedu.me/";
      });
  } else {
    window.location.href = "http://toedu.me/";
  }
}