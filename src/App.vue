<template>
  <div id="app">
    <div v-if="$store.getters['auth/isAuthenticated']">
      <CoursesNavbar />
    </div>
    <router-view v-show="showPage" :key="$route.path" />
    <div id="spinner" v-show="!showPage"><AppSpinner /></div>
  </div>
</template>

<script>
import CoursesNavbar from "./components/common/CoursesNavbar";
import AppSpinner from "./components/common/AppSpinner";
import NProgress from "nprogress";

export default {
  components: {
    CoursesNavbar,
    AppSpinner,
  },
  computed: {
    showPage() {
      const result = this.$store.state.loading.showPage;
      if (result) {
        NProgress.done();
      }
      return result;
    },
  },
};
</script>

<style>
@import "~nprogress/nprogress.css";
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Rubik", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container-courses {
  padding: 0 90px;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

a {
  text-decoration: none !important;
}

#b-toaster-top-right {
  top: 50px;
}
</style>

<style scoped>
#spinner {
  margin: 100px 0;
}
</style>