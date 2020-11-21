import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import lecturerLesson from "./modules/lecturerLesson";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    lecturerLesson
  }
})

export default store;
