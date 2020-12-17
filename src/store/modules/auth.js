import axios from 'axios'

const state = {
    user: null
};

const getters = {
    isAuthenticated: state => !!state.user,
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },
}

const actions = {
    login({ commit }, { email, password }) {
        return new Promise((resolve, reject) => {
            axios.post('http://apig9.toedu.me/api/login', { email, password })
                .then(res => {
                    const responseData = res.data;
                    axios.defaults.headers.common['Authorization'] = responseData.data.token;
                    localStorage.setItem('token', responseData.data.token);
                    commit('setUser', responseData.data.user);
                    resolve();
                })
                .catch(err => {
                    console.log(err.response);
                    reject(err.response.data.message)
                })
        })
    },
    logout({ commit }) {
        window.localStorage.clear();
        commit('setUser', null);
        commit('courses/setCourses', [], { root: true });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};