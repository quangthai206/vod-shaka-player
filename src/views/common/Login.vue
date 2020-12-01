<template>
  <div class="login-page">
    <div class="login-left">
      <a href="#">
        <img
          src="http://localhost:3300/images/logo-uet.png"
          alt=""
          width="100px"
        />
      </a>

      <div class="login-welcome">
        <h3>Welcome to VSchool</h3>
        <br />
        <h5>The most popular online learning system 2020.</h5>
      </div>

      <div class="login-copyright">© 2020 VSchool</div>
    </div>
    <div class="login-right">
      <form novalidate>
        <center>
          <h1 id="form-title">Login</h1>
        </center>

        <div>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
            v-model="email"
          />
        </div>
        <br />
        <div>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            v-model="password"
            autocomplete="new-password"
          />
        </div>
        <br />
        <div class="error">{{ error }}</div>

        <div class="row-submit">
          <a href="#">Forgot password?</a>
          <input
            type="submit"
            value="Submit"
            id="submit-btn"
            :disabled="disabled"
            :class="{ disabled: disabled }"
            @click.prevent="onLogin"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  computed: {
    disabled() {
      return !this.email.trim() || !this.password;
    },
  },
  watch: {
    email() {
      this.error = "";
    },
    password() {
      this.error = "";
    },
  },
  methods: {
    onLogin() {
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router
            .replace(this.$route.query.redirect || "/")
            .catch(() => {});
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

.login-left {
  width: 40%;
  padding: 39px 45.5px;
  background-image: url("http://localhost:3300/images/background-login.jpg");
  background-position: center;
  background-size: cover;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-welcome h5,
.login-copyright {
  color: rgba(255, 255, 255, 0.7);
}

.login-right {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#email,
#password {
  width: 450px;
  height: 50px;
  background-color: rgba(247, 247, 249, 0.7);
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border: none;
  outline: none;
}

.error {
  color: red;
  margin-bottom: 3rem;
}

#form-title {
  margin-bottom: 3rem;
}

.row-submit {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row-submit a {
  color: #a7abc3;
}

.row-submit a:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
}

#submit-btn {
  width: 120px;
  background-color: #5e6eea;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  border-radius: 5px;
  border: none;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  transition: 0.6s;
}

#submit-btn:hover {
  background-color: #4356e8;
  box-shadow: 0 0 10px rgba(94, 110, 234, 0.62);
}

#submit-btn.disabled {
  background-color: #a6a6a6;
  cursor: not-allowed;
}
</style>