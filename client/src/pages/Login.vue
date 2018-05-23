<template>
  <div class="login">
    <h1>Login</h1>
    <form
      autocomplete="off"
      method="post"
      action="/login"
      @submit.prevent="loginUser"
    >
      <input
        ref="email"
        name="email"
        placeholder="email"
        type="email"
        readonly
        @focus="removeReadOnly"
        v-model="email"
      />
      <input
        ref="password"
        name="password"
        placeholder="password"
        type="password"
        readonly
        @focus="removeReadOnly"
        v-model="password"
      />
      <div>
        Dont have an account?<a class="redirect" @click="navigateToSignIn">Register</a>
      </div>
      <br />
      <button
        :disabled="password.length < 8 || showError"
        type="submit"
        class="btn btn-primary"
      >LOGIN</button>
    </form>
    <div v-if="showError" class="error" v-html="authError" @click="dismissError"/>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  name: 'login',

  data() {
    return {
      email: '',
      password: '',
      showError: false,
    };
  },

  watch: {
    authError() {
      if (this.authError) {
        this.showError = true;
        this.dismissError();
      } else {
        this.showError = false;
      }
    },
  },

  computed: {
    ...Vuex.mapState({
      user: state => state.users.user,
      token: state => state.users.token,
      authError: state => state.users.authError,
    }),
  },

  methods: {
    ...Vuex.mapActions('users', [
      'login',
    ]),

    loginUser() {
      const data = {
        email: this.email,
        password: this.password,
      };

      this.login(data).then(() => {
        this.dismissError();
        localStorage.setItem('token', this.token);
        this.$router.push({ name: 'home' });
      });
    },

    dismissError() {
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    },

    removeReadOnly() {
      this.$refs.email.removeAttribute('readonly');
      this.$refs.password.removeAttribute('readonly');
    },

    navigateToSignIn() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style scoped>
  .login {
    display: flex;
    margin-top: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin-bottom: 30px;
  }

  input {
    min-width: 320px;
  }

  .error {
    position: absolute;
    bottom: 60px;
    padding: 15px;
    background: #e45e77;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
  }

  .redirect {
    color: #42b983;
    cursor: pointer;
    padding: 10px;
    font-weight: 500;
    user-select: none;
  }

  .redirect:hover {
    color: #35a974;
  }
</style>
