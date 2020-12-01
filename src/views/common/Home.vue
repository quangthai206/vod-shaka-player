<template>
  <div>
    <template v-if="!isAuthenticated">
      <Login></Login>
    </template>
    <template v-else>
      <div class="container-courses">
        <h1 v-if="$store.state.auth.user.role === 'student'">STUDENT HOME</h1>
        <h1 v-else>TEACHER HOME</h1>
      </div>
    </template>
  </div>
</template>

<script>
import Login from "./Login";
export default {
  components: { Login },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
  },
  created() {
    this.$store.commit("loading/setShowPage", true);
  },
};
</script>

<style scoped>
.container-courses {
  min-height: calc(100vh - 54px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>