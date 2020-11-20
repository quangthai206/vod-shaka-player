import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import store from '../store/index';
import Courses from "../views/Student/Courses";
import CourseDetails from "../views/Student/CourseDetails";
import UploadVideo from "../views/UploadVideo";
import ACourse from "../views/Lecturer/ACourse";

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    // meta: {
    //   requiresAuth: false
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    // meta: {
    //   requiresAuth: true
    // },
  },
  {
    path: '/courses/details',
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
    //   requiresAuth: false
    // }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})



router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authStoreState = store.state.authStore;
    authStoreState.authStatus
      .then(() => {

        if (authStoreState.isAuthenticated)
          next();
        else
          next({
            path: '/login',
            query: { nextUrl: to.fullPath }
          })
      })

  }
  /*else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('jwt') == null){
      next()
    }
    else{
      next({ name: 'Home'})
    }
  }*/
  else {
    next()
  }
})


export default router
