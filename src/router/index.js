import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
import Courses from "../views/common/Courses";
import CourseDetail from "../views/common/CourseDetail";
import UploadVideo from "../views/UploadVideo";
import WatchStudent from "../views/student/WatchStudent"
import Home from "../views/common/Home"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    name: 'CourseDetail',
    component: CourseDetail,
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
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})


export default router
