import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import teacherLesson from "./modules/teacherLesson";
import courses from "./modules/courses"
import loading from './modules/loading'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    teacherLesson,
    courses,
    loading
  }
})

export default store;
