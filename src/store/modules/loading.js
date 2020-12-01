const state = {
  showPage: false
};

const mutations = {
  setShowPage(state, status) {
    state.showPage = status
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};