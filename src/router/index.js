import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import store from '../store/index';
import Courses from "../views/Student/Courses";
import CourseDetails from "../views/Student/CourseDetails";
import UploadVideo from "../views/UploadVideo";
import ACourse from "../views/Lecturer/ACourse";
import WatchStudent from "../views/Student/WatchStudent"

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/courses/:id',
    name: 'CourseDetails',
    component: CourseDetails,
    // meta: {
    //   requiresAuth: true
    // },
  },
  {
    path: '/upload',
    name: 'UploadVideo',
    component: UploadVideo,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/lecturer/course',
    name: 'ACourse',
    component: ACourse,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/lessons/:id',
    name: 'Watch',
    component: WatchStudent
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})


export default router
