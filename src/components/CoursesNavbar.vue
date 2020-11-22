<template>
  <div>
    <nav class="navbar navbar-default"></nav>
    <nav class="navbar navbar-inverse navbar-fixed-top courses-top-nav">
      <div class="container-courses">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand courses-logo">
            <img
              src="https://vueschool.io/img/logo/vueschool_logo_multicolor_negative.svg"
              alt=""
              width="150px"
            />
          </router-link>
        </div>
        <ul class="nav navbar-nav courses-menu">
          <router-link to="/courses" tag="li"><a>Courses</a></router-link>
          <li><a href="#">Plans</a></li>
          <li><a href="#">Contacts</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#"><span class="glyphicon glyphicon-search"></span></a>
          </li>
          <li>
            <a href="#"
              ><span class="glyphicon glyphicon-user"></span> Profile</a
            >
          </li>
          <li @click="logout">
            <a><span class="glyphicon glyphicon-log-out"></span> Logout</a>
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
        this.$router.push("/").catch(() => {});
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  margin: 0;
  border: none;
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

a {
  cursor: pointer;
}
</style>