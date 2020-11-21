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
            axios.post('http://localhost:3300/api/login', { email, password })
                .then(res => {
                    const responseData = res.data;
                    localStorage.setItem('token', responseData.data.token);
                    commit('setUser', responseData.data.user);
                    resolve();
                })
                .catch(err => {
                    console.log(err.response);
                    reject(err.response.data.message)
                })
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