<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Rubik", sans-serif;
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
</style>

