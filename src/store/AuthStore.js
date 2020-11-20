import axios from "axios";

const authStore = {
    namespaced: true,
    state: () => ({
        authStatus:
            axios.post(
                "http://localhost:8017/verifyToken", {},
                {
                    headers: {
                        'x-access-token': `${localStorage.getItem('accessToken')}`
                    }
                })
                .then(() => {
                    authStore.commit('setAuthenticated', true);
                })
                .catch((e) => console.log(e)),
        isAuthenticated: false
    }),
    mutations: {
        setAuthenticated(state, status) {
            state.isAuthenticated = status;
        },
    }

}

export default authStore;