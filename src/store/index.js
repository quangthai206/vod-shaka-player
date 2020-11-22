import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import teacherLesson from "./modules/teacherLesson";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    teacherLesson
  }
})

export default store;
