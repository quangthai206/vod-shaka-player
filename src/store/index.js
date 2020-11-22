import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import teacherLesson from "./modules/teacherLesson";
import courses from "./modules/courses"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    teacherLesson,
    courses
  }
})

export default store;
