<template>
  <div>
    <div class="padded-nav"></div>

    <nav class="navbar fixed-top courses-top-nav navbar-expand-lg">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand courses-logo">
          <img
            src="http://apig9.toedu.me/images/logo.svg"
            alt=""
            width="150px"
          />
        </router-link>
      </div>
      <div class="navbar-body">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/courses" class="nav-link">Courses</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link">Plans</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Contacts</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link"><span class="fa fa-search"></span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><span class="fa fa-user"></span> Profile</a>
          </li>
          <li class="nav-item" @click="logout">
            <a class="nav-link"
              ><span class="fa fa-sign-out-alt"></span> Logout</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "CoursesNavbar",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        window.location.href = "http://toedu.me/";
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  margin: 0;
  border: none;
  padding: 0 90px;
}

.navbar-expand-lg .navbar-nav > li > a {
  color: #9d9d9d;
  padding: 15px;
}

.navbar-expand-lg .navbar-nav > li:last-child > a {
  padding-right: 0;
}

.navbar-nav > li > a:hover {
  color: #fff;
}

.navbar-body {
  display: flex;
  flex-grow: 1;
}

.courses-logo {
  display: flex;
  align-items: center;
  padding: 0;
  margin-right: 40px;
}

.courses-top-nav {
  border-radius: 0;
  background-color: #1d185e;
  font-size: 16px;
}

.padded-nav {
  min-height: 54px;
}

a {
  cursor: pointer;
}
</style>