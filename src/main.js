import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuex from 'vuex'

import store from './store';
import VueFileAgent from 'vue-file-agent';

Vue.use(VueFileAgent);


Vue.config.productionTip = false;

if (localStorage.getItem('accessToken') == null) {
  store.commit('setAuthenticated', false);
}


new Vue({
  store,
  computed: {
    ...Vuex.mapState({
      authStore: state => state.authStore,
      lecturerLessonStore: state => state.lecturerLessonStore
    })
  },
  router,
  render: h => h(App)
}).$mount('#app')
