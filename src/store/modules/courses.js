import axios from 'axios'

const state = {
  courses: [],
};

const getters = {}

const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
}

const actions = {
  getAllCourse({ commit }) {
    axios.get("http://localhost:3300/api/courses").then((res) => {
      commit('setCourses', res.data.data)
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};