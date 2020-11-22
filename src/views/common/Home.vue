<template>
  <div>
    <template v-if="!isAuthenticated">
      <Login></Login>
    </template>
    <template v-else>
      <h1 v-if="$store.state.auth.user.role === 'student'">STUDENT HOME</h1>
      <h1 v-else>TEACHER HOME</h1>
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
};
</script>

<style scoped>
</style>