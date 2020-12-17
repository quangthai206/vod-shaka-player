import axios from 'axios'

const state = {
  courses: []
};

const getters = {}

const mutations = {
  setCourses(state, courses) {
    state.courses = courses
  },
}

const actions = {
  getAllCourse({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.get("http://apig9.toedu.me/api/courses", {
        headers: {
          'uid': state.auth.user._id
        }
      })
        .then((res) => {
          commit('setCourses', res.data.data)
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};