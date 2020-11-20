import Vue from 'vue'
import Vuex from 'vuex'
import authStore from "./AuthStore";
import lecturerLessonStore from "./LecturerLessonStore";

Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     authStatus:
//         axios.post(
//         "http://localhost:8017/verifyToken",{},
//         {
//           headers: {
//             'x-access-token' : `${localStorage.getItem('accessToken')}`
//           } })
//         .then((res) => {
//             store.commit('setAuthenticated', true);
//         })
//         .catch((e) => console.log(e)),
//     isAuthenticated: false,
//
//
//     chaps: [
//       {
//         id: 1,
//         title: "Introduction",
//         lessons: [
//           {
//             id: 1,
//             title: "Lesson 1",
//             description: "",
//             file: null
//           },
//         ]
//       },
//       {
//         id: 2,
//         title: "ABC",
//         lessons: [
//           {
//             id: 1,
//             title: "Lesson 1",
//             description: "",
//             file: null
//           },
//           {
//             id: 2,
//             title: "Lesson 2",
//             description: "",
//             file: null
//           }
//         ]
//       }
//     ],
//     isAddingChap: false,
//     idAddingChap: -1,
//   },
//   mutations: {
//     setAuthenticated(state, status){
//       state.isAuthenticated = status;
//     },
//
//     addAChap(state, chap) {
//       state.chaps.push(chap);
//     },
//
//     setIsAddingChap(state) {
//       state.isAddingChap = !(state.isAddingChap);
//     },
//
//     setIdAddingChap(state, num) {
//       state.idAddingChap = num;
//     },
//
//     addALesson(state, {idChap, lesson}) {
//       const chaps = state.chaps;
//       const idCurChap = chaps.findIndex(c => c.id === idChap);
//
//       chaps[idCurChap].lessons.push(lesson);
//
//       state.chaps[idCurChap] = chaps[idCurChap];
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

const store = new Vuex.Store({
  modules: {
    authStore,
    lecturerLessonStore
  }
})

export default store;
